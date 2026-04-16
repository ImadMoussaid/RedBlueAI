import { prisma } from '@/lib/prisma';
import { billingPlan } from './pricing';
import type { BillingSummary } from './types';

export async function getBillingSummary(): Promise<BillingSummary> {
  const exercises = await prisma.exercise.findMany({
    include: { app: true },
    orderBy: { requestedAt: 'desc' }
  });

  const entitlements = exercises.map((ex) => ({
    runId: ex.id,
    target: ex.app.name,
    approvalState: getApprovalState(ex.status),
    paymentStatus: 'paid' as const,
    operatorNote: getOperatorNote(ex.status)
  }));

  return {
    plan: billingPlan,
    latestPayment: null as unknown as BillingSummary['latestPayment'],
    payments: [],
    entitlements,
    lineItems: []
  };
}

function getApprovalState(status: string): string {
  const map: Record<string, string> = {
    pending_manual_start: 'awaiting_approval',
    approved: 'approved',
    queued: 'queued',
    assigned: 'assigned',
    waiting_for_trigger: 'waiting_for_trigger',
    running: 'running',
    reporting: 'reporting',
    completed: 'consumed',
    failed: 'failed',
    blocked: 'blocked'
  };
  return map[status] ?? status;
}

function getOperatorNote(status: string): string {
  const map: Record<string, string> = {
    pending_manual_start: 'Awaiting founder review before the run can be queued.',
    approved: 'Approved and queued for execution.',
    queued: 'Queued and waiting for a worker.',
    waiting_for_trigger: 'Worker is holding. Press Start Audit to begin.',
    running: 'Exercise is actively running.',
    completed: 'The paid entitlement has been consumed by a completed run.',
    blocked: 'Blocked. Correct scope before resubmitting.'
  };
  return map[status] ?? 'Run in progress.';
}
