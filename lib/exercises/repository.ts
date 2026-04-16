import { prisma } from '@/lib/prisma';
import type { ExerciseRequestReview, ExerciseRunDetail, ExerciseApprovalTrailItem } from './types';
import type { RunStatus, Finding } from '@/lib/findings/mock';
import { approvalPath, blockedPath } from './mock';

export { approvalPath, blockedPath };

function mapStatus(s: string): RunStatus {
  return s as RunStatus;
}

export async function getExerciseRequests(): Promise<ExerciseRequestReview[]> {
  const exercises = await prisma.exercise.findMany({
    include: { app: true },
    orderBy: { requestedAt: 'desc' }
  });

  return exercises.map((ex) => ({
    id: ex.id,
    target: ex.app.name,
    type: ex.type,
    status: mapStatus(ex.status),
    requestedAt: ex.requestedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    consent: 'Captured',
    guardrails: JSON.stringify(ex.guardrailsSnapshot ?? {}),
    reviewer: ex.approvedAt ? 'Approved by founder' : 'Awaiting founder review',
    reviewDecision: ex.status === 'blocked' ? 'blocked' : ex.approvedAt ? 'approved' : 'needs_changes',
    reviewTone: mapStatus(ex.status),
    reviewSummary: getReviewSummary(ex.status),
    nextTransition: getNextTransition(ex.status),
    worker: ex.assignedWorkerId ?? 'Not assigned'
  }));
}

export async function getExerciseRunDetail(runId: string): Promise<ExerciseRunDetail | null> {
  const ex = await prisma.exercise.findUnique({
    where: { id: runId },
    include: { app: true }
  });

  if (!ex) return null;

  const trail: ExerciseApprovalTrailItem[] = [
    {
      title: 'Request submitted',
      tone: 'pending_manual_start',
      actor: 'Customer workspace',
      at: ex.requestedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
      note: 'Scope, consent, and guardrails were frozen into the launch payload.'
    }
  ];

  if (ex.approvedAt) {
    trail.push({
      title: 'Approved and queued',
      tone: 'approved',
      actor: 'Founder',
      at: ex.approvedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
      note: 'The operator approved the request and pushed it into the queue.'
    });
  }

  if (ex.assignedWorkerId) {
    trail.push({
      title: 'Worker assigned',
      tone: 'assigned',
      actor: ex.assignedWorkerId,
      at: ex.approvedAt?.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }) ?? '',
      note: `${ex.assignedWorkerId} claimed the run from the central queue.`
    });
  }

  if (ex.status === 'waiting_for_trigger') {
    trail.push({
      title: 'Waiting for trigger',
      tone: 'waiting_for_trigger',
      actor: ex.assignedWorkerId ?? 'worker',
      at: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
      note: 'Worker is holding. Execution will not begin until the founder presses Start Audit.'
    });
  }

  const realFindings: Finding[] = ex.findings
    ? (ex.findings as Finding[])
    : [];

  return {
    summary: getReviewSummary(ex.status),
    reportStatus: getReportStatus(ex.status),
    approvalTrail: trail,
    blockedReasons: ex.status === 'blocked' ? ['Blocked by founder.'] : [],
    nextSteps: getNextSteps(ex.status),
    findings: realFindings,
    executiveSummary: ex.executiveSummary ?? undefined
  };
}

function getReviewSummary(status: string): string {
  const map: Record<string, string> = {
    pending_manual_start: 'Awaiting founder review.',
    approved: 'Approved by founder and queued.',
    queued: 'Queued and waiting for a worker.',
    assigned: 'Worker has claimed the run.',
    waiting_for_trigger: 'Worker is holding. Press Start Audit to begin execution.',
    running: 'Exercise is running.',
    reporting: 'Generating findings and report.',
    completed: 'Run completed successfully.',
    failed: 'Run failed.',
    blocked: 'Blocked by founder.'
  };
  return map[status] ?? status;
}

function getReportStatus(status: string): string {
  const map: Record<string, string> = {
    pending_manual_start: 'Waiting for approval',
    approved: 'Queued',
    queued: 'Queued',
    assigned: 'Assigned',
    waiting_for_trigger: 'Waiting for trigger',
    running: 'In progress',
    reporting: 'Reporting',
    completed: 'Completed',
    failed: 'Failed',
    blocked: 'Blocked'
  };
  return map[status] ?? status;
}

function getNextTransition(status: string): string {
  const map: Record<string, string> = {
    pending_manual_start: 'Approve or block the request.',
    approved: 'Wait for worker claim.',
    queued: 'Wait for worker claim.',
    assigned: 'Worker is preparing.',
    waiting_for_trigger: 'Founder presses Start Audit to release the worker.',
    running: 'Monitor phase progress.',
    reporting: 'Await report assembly.',
    completed: 'Review the report.',
    failed: 'Investigate and retry.',
    blocked: 'Stay blocked until scope is corrected.'
  };
  return map[status] ?? status;
}

function getNextSteps(status: string): string[] {
  const map: Record<string, string[]> = {
    pending_manual_start: ['Review scope and consent.', 'Approve or block the request.'],
    waiting_for_trigger: ['Press Start Audit to release the worker and begin execution.', 'Monitor phase progress in the worker fleet view.'],
    running: ['Monitor phase progress.', 'Review findings once reporting begins.'],
    reporting: ['Await report assembly.', 'Review findings and actionable fixes.'],
    completed: ['Review the report.', 'Send actionable fixes to the customer.'],
    blocked: ['Return the request to the operator.', 'Fix the scope snapshot.', 'Resubmit for manual approval.']
  };
  return map[status] ?? [];
}
