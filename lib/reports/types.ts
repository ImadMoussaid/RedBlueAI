export type ReportSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type ReportArtifact = {
  id: string;
  kind: 'pdf' | 'evidence' | 'screenshot' | 'log';
  name: string;
  path: string;
  sizeLabel: string;
  status: 'ready' | 'pending' | 'blocked';
};

export type ReportFinding = {
  id: string;
  title: string;
  severity: ReportSeverity;
  summary: string;
  impact: string;
  actionableFix: string;
  owasp: string;
  cwe: string;
  detectionStatus: 'missed' | 'triggered' | 'review';
};

export type ReportRun = {
  id: string;
  appName: string;
  exerciseType: string;
  status: 'reporting' | 'completed' | 'queued' | 'running';
  createdAt: string;
  completedAt: string;
  score: number;
  attackPaths: number;
  missedDetections: number;
  findings: ReportFinding[];
  artifacts: ReportArtifact[];
};
