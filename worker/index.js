const { buildReportingPayload } = require('./reporting');
const { buildHeartbeat, claimJob, findNextJob, phases } = require('./mock-control-plane');

const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  modelName: process.env.MODEL_NAME || 'qwen3:14b',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  workerLabel: process.env.WORKER_LABEL || 'worker-local-01',
  maxConcurrentRuns: Number(process.env.MAX_CONCURRENT_RUNS || '1')
};

function log(event, payload) {
  console.log('[redblueai-worker] ' + event, payload);
}

function run() {
  log('boot', config);

  const nextJob = findNextJob(config.workerLabel);

  if (!nextJob) {
    log('heartbeat', buildHeartbeat(config.workerLabel, 'idle', 'No approved jobs are available to claim.'));
    return;
  }

  const claimedJob = claimJob(nextJob, config.workerLabel);

  log('heartbeat', buildHeartbeat(config.workerLabel, 'claiming', 'Claiming ' + claimedJob.id + ' from the central queue.'));
  log('job.claimed', {
    runId: claimedJob.id,
    appName: claimedJob.appName,
    type: claimedJob.type,
    scope: claimedJob.scope,
    guardrails: claimedJob.guardrails
  });

  for (const phase of phases) {
    log('phase.start', {
      runId: claimedJob.id,
      phase,
      heartbeat: buildHeartbeat(config.workerLabel, 'running', claimedJob.id + ' entered ' + phase + '.')
    });
  }

  const reportingPayload = buildReportingPayload(claimedJob);

  log('artifacts.ready', reportingPayload);
  log('heartbeat', buildHeartbeat(config.workerLabel, 'reporting', claimedJob.id + ' completed execution and published report artifacts.'));
}

run();
