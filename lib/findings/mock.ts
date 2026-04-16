export type RunStatus =
  | 'pending_manual_start'
  | 'approved'
  | 'queued'
  | 'assigned'
  | 'waiting_for_trigger'
  | 'running'
  | 'reporting'
  | 'completed'
  | 'failed'
  | 'blocked';

export type FindingSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface FindingEvidence {
  id: string;
  label: string;
  detail: string;
  source: 'browser' | 'api' | 'worker' | 'report';
}

export interface Finding {
  id: string;
  title: string;
  severity: FindingSeverity;
  summary: string;
  evidence: string;
  impact: string;
  action: string;
  status: 'open' | 'fixed' | 'accepted';
  category: string;
  owasp: string;
  cwe: string;
  confidence: 'High' | 'Medium' | 'Low';
  remediationOwner: string;
  remediationWindow: string;
  detectionStatus: 'missed' | 'triggered' | 'review';
  evidenceItems: FindingEvidence[];
}

export type RunPhaseStatus = 'complete' | 'current' | 'pending';

export interface RunPhase {
  name: string;
  status: RunPhaseStatus;
  note: string;
}

export interface WorkerHost {
  name: string;
  status: 'healthy' | 'degraded' | 'busy';
  load: string;
  lastHeartbeat: string;
}

export interface RunSummary {
  id: string;
  target: string;
  type: string;
  status: RunStatus;
  consent: 'Captured' | 'Missing';
  guardrails: string;
  requestedAt: string;
  worker: string;
  actionableFixes: number;
  detectionsMissed: number;
}

export const dashboardStats = [
  {
    title: 'Pending approvals',
    value: '03',
    body: 'Runs waiting for founder review before queueing.'
  },
  {
    title: 'Active workers',
    value: '02',
    body: 'Hosts ready to claim approved jobs.'
  },
  {
    title: 'Actionable fixes',
    value: '12',
    body: 'Prioritized remediation items from recent exercises.'
  }
];

export const workerHosts: WorkerHost[] = [
  {
    name: 'worker-eu-01',
    status: 'healthy',
    load: '42%',
    lastHeartbeat: '2 min ago'
  },
  {
    name: 'worker-us-02',
    status: 'busy',
    load: '81%',
    lastHeartbeat: '30 sec ago'
  },
  {
    name: 'worker-lab-03',
    status: 'degraded',
    load: '65%',
    lastHeartbeat: '11 min ago'
  }
];

export const runs: RunSummary[] = [
  {
    id: 'run-acme-001',
    target: 'Acme staging app',
    type: 'Authenticated web exercise',
    status: 'pending_manual_start',
    consent: 'Captured',
    guardrails: 'Read-only, 30 req/min, weekday hours',
    requestedAt: 'Today, 09:40',
    worker: 'Not assigned',
    actionableFixes: 4,
    detectionsMissed: 2
  },
  {
    id: 'run-northwind-014',
    target: 'Northwind API',
    type: 'API exercise',
    status: 'running',
    consent: 'Captured',
    guardrails: 'OpenAPI uploaded, no destructive checks',
    requestedAt: 'Today, 08:15',
    worker: 'worker-us-02',
    actionableFixes: 7,
    detectionsMissed: 1
  },
  {
    id: 'run-fabrikam-008',
    target: 'Fabrikam checkout',
    type: 'Authenticated web exercise',
    status: 'waiting_for_trigger',
    consent: 'Captured',
    guardrails: 'Test accounts only, rate limit enforced',
    requestedAt: 'Today, 15:18',
    worker: 'worker-us-02',
    actionableFixes: 0,
    detectionsMissed: 0
  }
];

export const runPhases: RunPhase[] = [
  {
    name: 'Rules of engagement check',
    status: 'complete',
    note: 'Consent, scope, and guardrails are frozen.'
  },
  {
    name: 'Recon and app mapping',
    status: 'complete',
    note: 'Entry points, forms, and key flows discovered.'
  },
  {
    name: 'Red team checks',
    status: 'current',
    note: 'Session handling and input validation under review.'
  },
  {
    name: 'Blue team validation',
    status: 'pending',
    note: 'Alerting and event evidence will be reviewed next.'
  },
  {
    name: 'Purple summary',
    status: 'pending',
    note: 'Actionable fixes and executive summary queued.'
  }
];

export const findings: Finding[] = [
  {
    id: 'f-001',
    title: 'Session cookie missing secure flag',
    severity: 'High',
    summary: 'Session cookies can leak over insecure transport if the runtime is misconfigured.',
    evidence: 'Cookie observed without Secure during staging test flow.',
    impact: 'Session leakage can lead to account takeover on exposed environments.',
    action: 'Set the Secure attribute and enforce HTTPS-only cookie handling everywhere.',
    status: 'open',
    category: 'Session Management',
    owasp: 'A07:2021',
    cwe: 'CWE-614',
    confidence: 'High',
    remediationOwner: 'Platform engineering',
    remediationWindow: 'Immediate',
    detectionStatus: 'missed',
    evidenceItems: [
      {
        id: 'e-001',
        label: 'Cookie capture',
        detail: 'Browser evidence showed the session cookie issued without the Secure attribute.',
        source: 'browser'
      },
      {
        id: 'e-002',
        label: 'Worker replay',
        detail: 'Worker replay confirmed the session behavior across two authenticated requests.',
        source: 'worker'
      }
    ]
  },
  {
    id: 'f-002',
    title: 'Password reset route lacks rate limiting',
    severity: 'Medium',
    summary: 'The reset endpoint can be hit repeatedly without obvious throttling.',
    evidence: 'Multiple reset submissions accepted in rapid succession.',
    impact: 'Attackers can brute force or abuse reset requests.',
    action: 'Apply route-based rate limiting and add anomaly detection on repeated attempts.',
    status: 'open',
    category: 'Abuse Prevention',
    owasp: 'A01:2021',
    cwe: 'CWE-770',
    confidence: 'Medium',
    remediationOwner: 'Application backend team',
    remediationWindow: 'Next sprint',
    detectionStatus: 'triggered',
    evidenceItems: [
      {
        id: 'e-003',
        label: 'API replay sample',
        detail: 'Burst of reset requests succeeded without backoff or route throttling.',
        source: 'api'
      }
    ]
  },
  {
    id: 'f-003',
    title: 'Admin API returns excess metadata',
    severity: 'Medium',
    summary: 'The API exposes more internal identifiers than the UI needs.',
    evidence: 'Response payload includes feature flags and internal IDs.',
    impact: 'Overexposed metadata increases reconnaissance value for attackers.',
    action: 'Trim response payloads and validate role access before serialization.',
    status: 'accepted',
    category: 'Information Disclosure',
    owasp: 'A01:2021',
    cwe: 'CWE-200',
    confidence: 'Medium',
    remediationOwner: 'API platform team',
    remediationWindow: 'Backlog',
    detectionStatus: 'review',
    evidenceItems: [
      {
        id: 'e-004',
        label: 'Response body review',
        detail: 'Internal flags and identifiers were present in a user-facing response.',
        source: 'report'
      }
    ]
  },
  {
    id: 'f-004',
    title: 'Login form reveals invalid user timing signal',
    severity: 'Low',
    summary: 'Response timing differs slightly between invalid and valid usernames.',
    evidence: 'Repeated comparison across two test accounts showed a measurable gap.',
    impact: 'User enumeration becomes easier during targeted attacks.',
    action: 'Normalize timing and return consistent auth responses.',
    status: 'open',
    category: 'Authentication',
    owasp: 'A07:2021',
    cwe: 'CWE-204',
    confidence: 'Low',
    remediationOwner: 'Identity team',
    remediationWindow: 'Backlog',
    detectionStatus: 'review',
    evidenceItems: [
      {
        id: 'e-005',
        label: 'Response timing comparison',
        detail: 'Latency differed across valid and invalid identities during repeated login attempts.',
        source: 'worker'
      }
    ]
  }
];

export const runDetails: Record<
  string,
  {
    summary: string;
    reportStatus: string;
    detectionsTriggered: number;
    detectionsMissed: number;
    topFixes: string[];
    findings: Finding[];
    remediationPlan: { owner: string; action: string; window: string }[];
  }
> = {
  'run-acme-001': {
    summary: 'Queued for manual start. Consent captured and guardrails frozen.',
    reportStatus: 'Waiting for approval',
    detectionsTriggered: 1,
    detectionsMissed: 2,
    topFixes: [
      'Enable secure cookies and HTTPS-only transport.',
      'Add rate limits to auth-related endpoints.',
      'Reduce metadata in admin API responses.'
    ],
    findings: findings.slice(0, 3),
    remediationPlan: [
      {
        owner: 'Platform engineering',
        action: 'Enforce secure cookie defaults across every authenticated route.',
        window: 'Immediate'
      },
      {
        owner: 'Application backend team',
        action: 'Add throttling and detection coverage to password-reset endpoints.',
        window: 'Next sprint'
      }
    ]
  },
  'run-northwind-014': {
    summary: 'Currently running from worker-us-02 and moving through red team checks.',
    reportStatus: 'In progress',
    detectionsTriggered: 2,
    detectionsMissed: 1,
    topFixes: [
      'Harden session management defaults.',
      'Add alerting coverage for reset abuse.',
      'Improve API response filtering.'
    ],
    findings: findings.slice(0, 4),
    remediationPlan: [
      {
        owner: 'Platform engineering',
        action: 'Confirm secure cookie defaults before production promotion.',
        window: 'Immediate'
      },
      {
        owner: 'API platform team',
        action: 'Review the serialized response schema for internal-only fields.',
        window: 'Backlog'
      }
    ]
  },
  'run-fabrikam-008': {
    summary: 'Worker has claimed the run and is holding. Press Start Audit to begin execution.',
    reportStatus: 'Waiting for trigger',
    detectionsTriggered: 0,
    detectionsMissed: 0,
    topFixes: [],
    findings: [],
    remediationPlan: []
  }
};

export const actionableSummary = [
  {
    title: 'Prioritized fixes',
    text: 'Every finding should end in one concrete change the app owner can make next.'
  },
  {
    title: 'Detection gaps',
    text: 'Show which issues were triggered, missed, or only partially observed.'
  },
  {
    title: 'Operator clarity',
    text: 'Keep queue state, worker assignment, and report status visible in one place.'
  }
];
