const queue = [
  {
    id: 'RB-002',
    appName: 'Northwind API',
    type: 'API exercise',
    status: 'queued',
    worker: 'worker-eu-01',
    scope: ['api.northwind.test'],
    guardrails: ['read-only', '20 requests / minute', 'operator-approved window']
  },
  {
    id: 'RB-004',
    appName: 'Fabrikam checkout',
    type: 'Authenticated web exercise',
    status: 'assigned',
    worker: 'worker-us-02',
    scope: ['checkout.fabrikam.test'],
    guardrails: ['read-only', 'test accounts only', 'browser evidence capture']
  }
];

const phases = [
  'rules-check',
  'recon',
  'app-mapping',
  'red-team-checks',
  'blue-review',
  'purple-summary',
  'report-generation'
];

function findNextJob(workerLabel) {
  return queue.find((job) => job.status === 'queued' || job.worker === workerLabel) || null;
}

function claimJob(job, workerLabel) {
  return {
    ...job,
    status: 'waiting_for_trigger',
    worker: workerLabel,
    claimedAt: new Date().toISOString()
  };
}

function buildHeartbeat(workerLabel, state, message) {
  return {
    workerLabel,
    state,
    at: new Date().toISOString(),
    message
  };
}

module.exports = {
  phases,
  findNextJob,
  claimJob,
  buildHeartbeat
};
