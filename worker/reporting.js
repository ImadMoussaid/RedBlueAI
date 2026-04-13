const path = require('node:path');

function resolveReportPath(runId) {
  return path.posix.join('/app/data/reports', runId, 'report.pdf');
}

function resolveEvidencePath(runId) {
  return path.posix.join('/app/data/evidence', runId);
}

function buildReportingPayload(run) {
  return {
    runId: run.id,
    reportPath: resolveReportPath(run.id),
    evidencePath: resolveEvidencePath(run.id),
    title: `${run.appName} exercise report`,
    sections: ['cover', 'executive-summary', 'findings', 'detections', 'remediation']
  };
}

module.exports = {
  resolveReportPath,
  resolveEvidencePath,
  buildReportingPayload
};
