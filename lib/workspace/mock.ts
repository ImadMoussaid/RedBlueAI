import type { WorkspaceActivity, WorkspaceMember, WorkspaceMetric, WorkspacePolicy, WorkspaceTarget } from './types';

export const workspaceHeader = {
  title: 'RedBlueAI Pilot Workspace',
  subtitle: 'Founder-operated control plane for the first customer exercises.',
  owner: 'Imad Moussaid',
  region: 'EU pilot workspace',
  totalApps: 2,
  pendingApprovals: 3,
  activeWorkers: 2
};

export const workspaceMetrics: WorkspaceMetric[] = [
  {
    label: 'Targets registered',
    value: '02',
    note: 'One staging portal and one API target are already represented in the workspace.',
    tone: 'accent'
  },
  {
    label: 'Consent records',
    value: '01',
    note: 'The pilot flow keeps a frozen consent snapshot with each exercise request.',
    tone: 'success'
  },
  {
    label: 'Pending approvals',
    value: '03',
    note: 'Exercise requests wait for founder review before any worker claim occurs.',
    tone: 'neutral'
  }
];

export const workspaceTargets: WorkspaceTarget[] = [
  {
    name: 'Acme staging portal',
    environment: 'Staging',
    baseUrl: 'https://staging.acme.app',
    consentState: 'Captured',
    exerciseState: 'Ready',
    allowedDomains: ['staging.acme.app', 'api.staging.acme.app']
  },
  {
    name: 'Northwind API',
    environment: 'Production-safe test env',
    baseUrl: 'https://api.northwind.test',
    consentState: 'Captured',
    exerciseState: 'Queued',
    allowedDomains: ['api.northwind.test']
  }
];

export const workspaceMembers: WorkspaceMember[] = [
  {
    name: 'Imad Moussaid',
    role: 'Founder / operator',
    access: 'Owner',
    status: 'Active',
    lastActive: 'Today'
  },
  {
    name: 'Jane Doe',
    role: 'Customer signer',
    access: 'Consent only',
    status: 'Invite sent',
    lastActive: 'Pending onboarding'
  },
  {
    name: 'Security lead',
    role: 'Pilot reviewer',
    access: 'Read-only',
    status: 'Pending review',
    lastActive: 'Awaiting approval'
  }
];

export const workspaceActivity: WorkspaceActivity[] = [
  {
    title: 'Consent snapshot captured',
    detail: 'Authorization text, signer identity, and rules of engagement were frozen for RB-001.',
    time: '15 minutes ago',
    kind: 'consent'
  },
  {
    title: 'Northwind API queued',
    detail: 'The API exercise passed guardrail checks and is waiting for a worker claim.',
    time: '34 minutes ago',
    kind: 'approval'
  },
  {
    title: 'Acme target updated',
    detail: 'Allowed domains and allowed hours were refreshed for the staging portal target.',
    time: '1 hour ago',
    kind: 'target'
  }
];

export const workspacePolicies: WorkspacePolicy[] = [
  {
    title: 'Read-only default',
    detail: 'No destructive actions are allowed unless a future issue expands the policy.'
  },
  {
    title: 'Explicit scope',
    detail: 'The operator must define allowed and blocked domains before any exercise is launched.'
  },
  {
    title: 'Manual approval',
    detail: 'Every run starts as pending and must be approved before it can be assigned to a worker.'
  }
];
