export type WorkspaceSummary = {
  name: string;
  owner: string;
  region: string;
  apps: number;
  pendingApprovals: number;
  activeWorkers: number;
};

export type TargetApplication = {
  name: string;
  environment: string;
  baseUrl: string;
  loginUrl?: string;
  allowedDomains: string[];
  blockedDomains: string[];
  rateLimit: string;
  allowedHours: string;
};

export type ConsentRecord = {
  version: string;
  signerName: string;
  signerRole: string;
  acceptedAt: string;
  affirmations: string[];
};

export type ExerciseRequest = {
  id: string;
  target: string;
  type: string;
  status: string;
  worker?: string;
  requestedAt: string;
  summary: string;
};

export type WorkerNode = {
  hostLabel: string;
  status: string;
  currentJob: string;
  model: string;
  capacity: string;
};

export const workspaceSummary: WorkspaceSummary = {
  name: 'RedBlueAI Pilot Workspace',
  owner: 'Imad Moussaid',
  region: 'EU founder-operated control plane',
  apps: 2,
  pendingApprovals: 3,
  activeWorkers: 2
};

export const targetApplications: TargetApplication[] = [
  {
    name: 'Acme staging portal',
    environment: 'Staging',
    baseUrl: 'https://staging.acme.app',
    loginUrl: 'https://staging.acme.app/login',
    allowedDomains: ['staging.acme.app', 'api.staging.acme.app'],
    blockedDomains: ['cdn.acme.app'],
    rateLimit: '30 requests / minute',
    allowedHours: 'Mon-Fri 08:00-18:00 CET'
  },
  {
    name: 'Northwind API',
    environment: 'Production-safe test env',
    baseUrl: 'https://api.northwind.test',
    allowedDomains: ['api.northwind.test'],
    blockedDomains: [],
    rateLimit: '20 requests / minute',
    allowedHours: 'Operator-approved windows only'
  }
];

export const consentRecord: ConsentRecord = {
  version: 'v1.0',
  signerName: 'Jane Doe',
  signerRole: 'Head of Engineering',
  acceptedAt: '2026-04-13 15:10 CET',
  affirmations: [
    'Target ownership or explicit customer authorization has been confirmed.',
    'Only declared in-scope assets may be exercised.',
    'Read-only mode and no destructive actions apply to all MVP runs.',
    'Operator approval is still required before queue submission.'
  ]
};

export const exerciseRequests: ExerciseRequest[] = [
  {
    id: 'RB-001',
    target: 'Acme staging portal',
    type: 'Authenticated web exercise',
    status: 'pending_manual_start',
    requestedAt: '2026-04-13 14:20 CET',
    summary: 'Consent captured, test account provided, awaiting founder review.'
  },
  {
    id: 'RB-002',
    target: 'Northwind API',
    type: 'API exercise',
    status: 'queued',
    worker: 'worker-eu-01',
    requestedAt: '2026-04-13 14:48 CET',
    summary: 'OpenAPI imported, queue accepted, waiting for worker claim.'
  },
  {
    id: 'RB-003',
    target: 'Acme staging portal',
    type: 'Quick web exercise',
    status: 'assigned',
    worker: 'worker-eu-02',
    requestedAt: '2026-04-13 15:02 CET',
    summary: 'Assigned to worker host, recon phase ready to begin.'
  }
];

export const workerNodes: WorkerNode[] = [
  {
    hostLabel: 'worker-eu-01',
    status: 'Healthy',
    currentJob: 'RB-002',
    model: 'qwen3:14b',
    capacity: '1 active run / 1 slot used'
  },
  {
    hostLabel: 'worker-eu-02',
    status: 'Healthy',
    currentJob: 'RB-003',
    model: 'qwen3:14b',
    capacity: '1 active run / 1 slot used'
  },
  {
    hostLabel: 'worker-eu-03',
    status: 'Idle',
    currentJob: 'None',
    model: 'qwen3:14b',
    capacity: '0 active runs / 1 slot free'
  }
];
