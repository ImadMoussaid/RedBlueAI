export type WorkspaceMetricTone = 'accent' | 'neutral' | 'success';

export type WorkspaceMetric = {
  label: string;
  value: string;
  note: string;
  tone: WorkspaceMetricTone;
};

export type WorkspaceMember = {
  name: string;
  role: string;
  access: string;
  status: 'Active' | 'Invite sent' | 'Pending review';
  lastActive: string;
};

export type WorkspaceActivity = {
  title: string;
  detail: string;
  time: string;
  kind: 'approval' | 'target' | 'consent' | 'security';
};

export type WorkspaceTarget = {
  name: string;
  environment: string;
  baseUrl: string;
  consentState: 'Captured' | 'Pending';
  exerciseState: 'Ready' | 'Queued';
  allowedDomains: string[];
};

export type WorkspacePolicy = {
  title: string;
  detail: string;
};
