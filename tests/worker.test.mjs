import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readText(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('worker bootstrap advertises distributed orchestration responsibilities', async () => {
  const worker = await readText('worker/index.js');

  for (const snippet of ['REDIS_URL', 'MODEL_NAME', 'OLLAMA_BASE_URL', 'WORKER_LABEL', 'MAX_CONCURRENT_RUNS']) {
    assert.ok(worker.includes(snippet), `missing worker bootstrap snippet ${snippet}`);
  }

  for (const snippet of ['buildReportingPayload', 'findNextJob', 'claimJob', 'phase.start', 'artifacts.ready']) {
    assert.ok(worker.includes(snippet), `missing worker orchestration snippet ${snippet}`);
  }

  assert.match(worker, /approved jobs are available to claim/);
});

test('worker control plane mock covers queue claims and sequential phases', async () => {
  const controlPlane = await readText('worker/mock-control-plane.js');

  for (const snippet of ['phases', 'findNextJob', 'claimJob', 'buildHeartbeat']) {
    assert.ok(controlPlane.includes(snippet), `missing control plane snippet ${snippet}`);
  }

  for (const phase of ['rules-check', 'recon', 'app-mapping', 'red-team-checks', 'blue-review', 'purple-summary', 'report-generation']) {
    assert.ok(controlPlane.includes(phase), `missing control plane phase ${phase}`);
  }

  for (const status of ['queued', 'assigned']) {
    assert.ok(controlPlane.includes(status), `missing control plane status ${status}`);
  }
});

test('exercise mocks cover the approval and blocked lifecycle branches', async () => {
  const exercises = await readText('lib/exercises/mock.ts');

  for (const status of ['pending_manual_start', 'approved', 'queued', 'assigned', 'running', 'reporting', 'completed', 'blocked']) {
    assert.ok(exercises.includes(status), `missing exercise status ${status}`);
  }

  for (const symbol of ['approvalPath', 'blockedPath', 'exerciseRequests', 'exerciseRunDetails', 'workerHosts']) {
    assert.ok(exercises.includes(symbol), `missing exercise lifecycle symbol ${symbol}`);
  }

  assert.match(exercises, /reviewDecision:\s*'blocked'/);
  assert.match(exercises, /reviewDecision:\s*'approved'/);
});

test('consent assets are versioned and linked to approval checks', async () => {
  const consent = await readText('lib/consent/mock.ts');
  const launch = await readText('app/(app)/launch/page.tsx');
  const runs = await readText('app/(app)/runs/page.tsx');
  const consentPage = await readText('app/(app)/consent/page.tsx');
  const workersPage = await readText('app/(app)/workers/page.tsx');

  for (const snippet of ['v1.0', 'v1.1', 'consent-rb-001', 'linkedRuns', 'auditTrail']) {
    assert.ok(consent.includes(snippet), `missing consent snippet ${snippet}`);
  }

  for (const snippet of ['Submit request for approval', 'Frozen consent snapshot', 'Frozen guardrail snapshot', 'RequestReviewPanel']) {
    assert.ok(launch.includes(snippet), `missing launch approval snippet ${snippet}`);
  }

  for (const snippet of ['ApprovalQueue', 'ApprovalChecklist', 'approvalPath', 'blockedPath']) {
    assert.ok(runs.includes(snippet), `missing runs approval snippet ${snippet}`);
  }

  for (const snippet of ['ConsentAuditTrail', 'ConsentSummary', 'ConsentVersionPanel', 'Authorization checklist']) {
    assert.ok(consentPage.includes(snippet), `missing consent page snippet ${snippet}`);
  }

  for (const snippet of ['WorkerFleetOverview', 'WorkerJobLane', 'heartbeats', 'queueAssignments']) {
    assert.ok(workersPage.includes(snippet), `missing workers page snippet ${snippet}`);
  }
});
