import type { WorkerHost } from '@/lib/findings/mock';
import type { ExerciseLifecycleStage, ExerciseRequestReview, ExerciseRunDetail } from '@/lib/exercises/types';

export const approvalPath: ExerciseLifecycleStage[] = [
  {
    title: 'Submitted',
    tone: 'pending_manual_start',
    note: 'Scope, consent, and guardrails are frozen into the request payload.'
  },
  {
    title: "Founder's review",
    tone: 'approved',
    note: 'Operator verifies authorization, target scope, and risk before queueing.'
  },
  {
    title: 'Queued',
    tone: 'queued',
    note: 'Approved requests wait in the central queue until a worker slot opens.'
  },
  {
    title: 'Assigned',
    tone: 'assigned',
    note: 'A worker host claims the run and prepares the exercise plan.'
  },
  {
    title: 'Waiting for trigger',
    tone: 'waiting_for_trigger',
    note: 'Worker is ready. The founder must press Start Audit before execution begins.'
  },
  {
    title: 'Running',
    tone: 'running',
    note: 'Safe checks, recon, and purple-team phases execute in order.'
  },
  {
    title: 'Reporting',
    tone: 'reporting',
    note: 'Findings, evidence, and the PDF report are assembled.'
  },
  {
    title: 'Completed',
    tone: 'completed',
    note: 'The operator can review a finalized report and actionable fixes.'
  }
];

export const blockedPath: ExerciseLifecycleStage[] = [
  {
    title: 'Blocked',
    tone: 'blocked',
    note: 'The request is stopped because authorization or scope needs correction.'
  },
  {
    title: 'Returned to operator',
    tone: 'pending_manual_start',
    note: 'The request remains visible with the exact reason it was blocked.'
  }
];

export const exerciseRequests: ExerciseRequestReview[] = [
  {
    id: 'RB-001',
    target: 'Acme staging portal',
    type: 'Authenticated web exercise',
    status: 'pending_manual_start',
    requestedAt: '2026-04-13 14:20 CET',
    consent: 'Captured',
    guardrails: 'Read-only, 30 requests / minute, weekday hours',
    reviewer: 'Awaiting founder review',
    reviewDecision: 'needs_changes',
    reviewTone: 'pending_manual_start',
    reviewSummary: 'Missing owner confirmation for one allowed subdomain.',
    nextTransition: 'Return to operator with a scope correction request.',
    worker: 'Not assigned'
  },
  {
    id: 'RB-002',
    target: 'Northwind API',
    type: 'API exercise',
    status: 'queued',
    requestedAt: '2026-04-13 14:48 CET',
    consent: 'Captured',
    guardrails: 'OpenAPI uploaded, no destructive checks',
    reviewer: 'Approved by founder',
    reviewDecision: 'approved',
    reviewTone: 'approved',
    reviewSummary: 'Safe to queue. Worker can claim it as soon as a slot opens.',
    nextTransition: 'Wait for worker claim.',
    worker: 'worker-eu-01'
  },
  {
    id: 'RB-003',
    target: 'Acme staging portal',
    type: 'Quick web exercise',
    status: 'blocked',
    requestedAt: '2026-04-13 15:02 CET',
    consent: 'Captured',
    guardrails: 'Blocked domains still present in the target snapshot',
    reviewer: 'Blocked by founder',
    reviewDecision: 'blocked',
    reviewTone: 'blocked',
    reviewSummary: 'A blocked domain is still in scope and must be removed first.',
    nextTransition: 'Stay blocked until the operator fixes scope.',
    worker: 'Not assigned'
  },
  {
    id: 'RB-004',
    target: 'Fabrikam checkout',
    type: 'Authenticated web exercise',
    status: 'waiting_for_trigger',
    requestedAt: '2026-04-13 15:18 CET',
    consent: 'Captured',
    guardrails: 'Test accounts only, rate limit enforced',
    reviewer: 'Approved and assigned',
    reviewDecision: 'approved',
    reviewTone: 'waiting_for_trigger',
    reviewSummary: 'Worker claimed the run and is holding. Press Start Audit to begin execution.',
    nextTransition: 'Founder presses Start Audit to release the worker.',
    worker: 'worker-us-02'
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

export const exerciseRunDetails: Record<string, ExerciseRunDetail> = {
  'run-acme-001': {
    summary: 'Queued for manual start. Consent captured and guardrails frozen.',
    reportStatus: 'Waiting for approval',
    approvalTrail: [
      {
        title: 'Request submitted',
        tone: 'pending_manual_start',
        actor: 'Customer workspace',
        at: '2026-04-13 14:20 CET',
        note: 'Scope, consent, and guardrails were frozen into the launch payload.'
      },
      {
        title: 'Operator review',
        tone: 'pending_manual_start',
        actor: 'Founder',
        at: '2026-04-13 14:26 CET',
        note: 'One blocked subdomain still needs to be removed before approval.'
      },
      {
        title: 'Blocked for changes',
        tone: 'blocked',
        actor: 'Founder',
        at: '2026-04-13 14:27 CET',
        note: 'The request was held back instead of being queued.'
      }
    ],
    blockedReasons: ['Blocked domain still present in the target snapshot.', 'Owner confirmation missing for the final allowed subdomain.'],
    nextSteps: ['Return the request to the operator.', 'Fix the scope snapshot.', 'Resubmit for manual approval.']
  },
  'run-northwind-014': {
    summary: 'Approved, queued, and currently active on worker-eu-01.',
    reportStatus: 'In progress',
    approvalTrail: [
      {
        title: 'Request submitted',
        tone: 'pending_manual_start',
        actor: 'Customer workspace',
        at: '2026-04-13 14:48 CET',
        note: 'The API exercise was created with consent and guardrails frozen.'
      },
      {
        title: 'Approved and queued',
        tone: 'approved',
        actor: 'Founder',
        at: '2026-04-13 14:50 CET',
        note: 'The operator approved the request and pushed it into the queue.'
      },
      {
        title: 'Worker assigned',
        tone: 'assigned',
        actor: 'worker-eu-01',
        at: '2026-04-13 14:52 CET',
        note: 'The worker claimed the run and started safe checks.'
      },
      {
        title: 'Running',
        tone: 'running',
        actor: 'worker-eu-01',
        at: '2026-04-13 14:56 CET',
        note: 'Recon and authenticated checks are in progress.'
      }
    ],
    blockedReasons: [],
    nextSteps: ['Finish the purple summary.', 'Assemble the PDF report.', 'Surface the top remediation items.']
  },
  'run-fabrikam-008': {
    summary: 'Worker has claimed the run and is holding. Press Start Audit to begin execution.',
    reportStatus: 'Waiting for trigger',
    approvalTrail: [
      {
        title: 'Request submitted',
        tone: 'pending_manual_start',
        actor: 'Customer workspace',
        at: '2026-04-13 15:18 CET',
        note: 'The authenticated web exercise was frozen and reviewed.'
      },
      {
        title: 'Approved and queued',
        tone: 'approved',
        actor: 'Founder',
        at: '2026-04-13 15:22 CET',
        note: 'The operator approved the run after validating consent and guardrails.'
      },
      {
        title: 'Worker assigned',
        tone: 'assigned',
        actor: 'worker-us-02',
        at: '2026-04-13 15:24 CET',
        note: 'worker-us-02 claimed the run from the central queue.'
      },
      {
        title: 'Waiting for trigger',
        tone: 'waiting_for_trigger',
        actor: 'worker-us-02',
        at: '2026-04-13 15:24 CET',
        note: 'Worker is holding. Execution will not begin until the founder presses Start Audit.'
      }
    ],
    blockedReasons: [],
    nextSteps: ['Press Start Audit to release the worker and begin execution.', 'Monitor phase progress in the worker fleet view.', 'Review findings once the run reaches the reporting stage.']
  }
};
