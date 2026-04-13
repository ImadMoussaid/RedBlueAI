export const artifactRoot = '/app/data';

export function reportPdfPath(runId: string) {
  return `${artifactRoot}/reports/${runId}/report.pdf`;
}

export function evidenceDirPath(runId: string) {
  return `${artifactRoot}/evidence/${runId}`;
}

export function artifactStatusLabel(status: 'ready' | 'pending' | 'blocked') {
  if (status === 'ready') return 'Ready';
  if (status === 'pending') return 'Pending';
  return 'Blocked';
}
