export type ReportSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type ReportArtifact = {
  id: string;
  kind: 'pdf' | 'evidence' | 'screenshot' | 'log';
  name: string;
  path: string;
  sizeLabel: string;
  status: 'ready' | 'pending' | 'blocked';
  summary: string;
};

export type ReportEvidence = {
  id: string;
  label: string;
  source: 'browser' | 'api' | 'worker' | 'report';
  detail: string;
};

export type ReportFix = {
  id: string;
  title: string;
  owner: string;
  priority: 'Immediate' | 'Next sprint' | 'Backlog';
  summary: string;
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
  evidence: ReportEvidence[];
  remediationOwner: string;
  remediationWindow: string;
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
  actionableFixes: ReportFix[];
  executiveSummary: string;
};
