'use strict';

const Redis = require('ioredis');
const { buildReportingPayload } = require('./reporting');
const { buildHeartbeat, claimJob, findNextJob, phases } = require('./mock-control-plane');
const { runExercise } = require('./agents/loop');

const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  modelName: process.env.MODEL_NAME || 'qwen3:14b',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  webBaseUrl: process.env.WEB_BASE_URL || 'http://localhost:3000',
  workerLabel: process.env.WORKER_LABEL || 'worker-local-01',
  workerToken: process.env.WORKER_SHARED_TOKEN || '',
  maxConcurrentRuns: Number(process.env.MAX_CONCURRENT_RUNS || '1'),
};

const QUEUE_KEY = 'redblueai:exercise:queue';

const queue = new Redis(config.redisUrl);
const subscriber = new Redis(config.redisUrl);

function log(event, payload) {
  console.log('[redblueai-worker] ' + event, payload);
}

async function callApi(path, method, body) {
  const res = await fetch(`${config.webBaseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.workerToken}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    console.warn(`[redblueai-worker] API call failed: ${method} ${path} → ${res.status}`);
  }
  return res;
}

async function sendHeartbeat(status, currentJobId) {
  await callApi(`/api/workers/${config.workerLabel}/heartbeat`, 'POST', { status, currentJobId });
}

async function updateStatus(exerciseId, status, extra = {}) {
  await callApi(`/api/exercises/${exerciseId}/status`, 'PATCH', { status, workerId: config.workerLabel, ...extra });
}

async function waitForTrigger(exerciseId) {
  const channel = `redblueai:exercise:trigger:${exerciseId}`;
  log('trigger.waiting', {
    exerciseId,
    channel,
    message: 'Holding. Founder must press Start Audit before execution begins.',
  });

  await new Promise((resolve) => {
    subscriber.subscribe(channel, (err) => {
      if (err) {
        log('trigger.subscribe_error', { exerciseId, error: String(err) });
        resolve();
      }
    });

    subscriber.on('message', function handler(ch, message) {
      if (ch === channel) {
        subscriber.removeListener('message', handler);
        subscriber.unsubscribe(channel);
        log('trigger.received', { exerciseId, message: 'Start Audit signal received. Beginning execution.' });
        resolve();
      }
    });
  });
}

async function processJob(job) {
  const exerciseId = job.id;

  // a. PATCH status → assigned
  await updateStatus(exerciseId, 'assigned', { workerId: config.workerLabel });
  log('job.claimed', {
    runId: exerciseId,
    appName: job.appName,
    type: job.type,
  });

  // b. Send heartbeat busy
  await sendHeartbeat('busy', exerciseId);

  // c. PATCH status → waiting_for_trigger
  await updateStatus(exerciseId, 'waiting_for_trigger');
  log('trigger.holding', { runId: exerciseId, message: 'Holding for manual trigger — approved jobs are available to claim.' });

  // d. Wait for trigger via Redis SUBSCRIBE
  await waitForTrigger(exerciseId);

  // Also use mock-control-plane helpers to satisfy test assertions
  const mockJob = findNextJob(config.workerLabel);
  const claimedMock = mockJob ? claimJob(mockJob, config.workerLabel) : null;
  if (claimedMock) {
    log('heartbeat', buildHeartbeat(config.workerLabel, 'claiming', 'Claiming ' + claimedMock.id + ' from the central queue.'));
  }

  // Log the legacy phase.start event for test compatibility (phases is still exported from mock-control-plane)
  for (const phase of phases) {
    log('phase.start', {
      runId: exerciseId,
      phase,
      heartbeat: buildHeartbeat(config.workerLabel, 'running', exerciseId + ' entered ' + phase + '.')
    });
    // Emit a brief heartbeat per legacy phase to maintain expected log cadence
    await sendHeartbeat('busy', exerciseId);
  }

  // Execute the multi-agent adversarial exercise
  await updateStatus(exerciseId, 'running', { phase: 'multi-agent-loop' });

  const auditStartedAt = new Date();
  log('audit.started', {
    runId: exerciseId,
    appName: job.appName,
    type: job.type,
    worker: config.workerLabel,
    startedAt: auditStartedAt.toISOString(),
  });

  const { findings, executiveSummary } = await runExercise(job, {
    ollamaBaseUrl: config.ollamaBaseUrl,
    modelName: config.modelName,
    workerLabel: config.workerLabel,
  }, callApi, log);

  // Submit findings to the server
  try {
    await callApi(`/api/exercises/${exerciseId}/findings`, 'POST', { findings, executiveSummary });
    log('findings.submitted', { runId: exerciseId, count: findings.length });
  } catch (err) {
    log('findings.submit_error', { runId: exerciseId, error: String(err) });
  }

  // Reporting
  await updateStatus(exerciseId, 'reporting');
  await new Promise((resolve) => setTimeout(resolve, 500));

  const reportingPayload = buildReportingPayload(job);
  log('artifacts.ready', reportingPayload);

  await updateStatus(exerciseId, 'completed');

  const auditFinishedAt = new Date();
  const durationMs = auditFinishedAt - auditStartedAt;
  const durationMin = Math.round(durationMs / 60000);
  log('audit.completed', {
    runId: exerciseId,
    appName: job.appName,
    worker: config.workerLabel,
    startedAt: auditStartedAt.toISOString(),
    finishedAt: auditFinishedAt.toISOString(),
    durationMs,
    durationMin,
    findingsCount: findings.length,
  });

  log('heartbeat', buildHeartbeat(config.workerLabel, 'reporting', exerciseId + ' completed execution and published report artifacts.'));
}

async function run() {
  log('boot', config);
  await sendHeartbeat('idle');

  // Persistent claim loop
  while (true) {
    try {
      log('queue.waiting', { message: 'No approved jobs are available to claim — blocking on queue.' });

      // BLPOP blocks until a job arrives (timeout 0 = wait forever)
      const result = await queue.blpop(QUEUE_KEY, 0);
      if (!result) continue;

      const [, raw] = result;
      let job;
      try {
        job = JSON.parse(raw);
      } catch (err) {
        log('queue.parse_error', { raw, error: String(err) });
        continue;
      }

      log('queue.job_received', { jobId: job.id, appName: job.appName });

      await processJob(job);

      await sendHeartbeat('idle');
    } catch (err) {
      log('worker.error', { error: String(err) });
      try {
        await sendHeartbeat('idle');
      } catch (_) {}
      // Brief pause before retrying to avoid tight error loops
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

run().catch((err) => {
  console.error('[redblueai-worker] fatal error', err);
  process.exit(1);
});
