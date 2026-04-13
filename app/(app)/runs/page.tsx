import { RequestReviewPanel } from '@/components/exercises/request-review-panel';
import { ApprovalChecklist } from '@/components/runs/approval-checklist';
import { ApprovalQueue } from '@/components/runs/approval-queue';
import { RunStatusBoard } from '@/components/runs/run-status-board';
import { RunTable } from '@/components/runs/run-table';
import { approvalPath, blockedPath, exerciseRequests } from '@/lib/exercises/mock';

export default function RunsPage() {
  const approvalItems = exerciseRequests.map((request) => ({
    id: request.id,
    target: request.target,
    exerciseType: request.type,
    requestedAt: request.requestedAt,
    consentStatus: request.consent,
    decisionReason: request.reviewSummary,
    operator: request.reviewer,
    worker: request.worker,
    scopeSummary:
      request.reviewDecision === 'blocked'
        ? 'Scope correction required before this request can re-enter the queue.'
        : 'Scope snapshot is frozen with the request and ready for operator review.',
    guardrailSummary: request.guardrails,
    status: request.status === 'assigned' ? 'queued' : request.status,
    checks: [
      {
        id: 'consent',
        label: 'Consent snapshot',
        detail: `${request.consent} and available to the founder during review.`,
        status: request.consent === 'Captured' ? 'captured' : 'pending'
      },
      {
        id: 'decision',
        label: 'Review decision',
        detail: request.reviewSummary,
        status:
          request.reviewDecision === 'approved'
            ? 'captured'
            : request.reviewDecision === 'blocked'
              ? 'blocked'
              : 'needs-review'
      },
      {
        id: 'transition',
        label: 'Next transition',
        detail: request.nextTransition,
        status:
          request.status === 'blocked'
            ? 'blocked'
            : request.status === 'pending_manual_start'
              ? 'pending'
              : 'captured'
      }
    ]
  }));

  const focusItem =
    approvalItems.find((item) => item.status === 'pending_manual_start') ??
    approvalItems.find((item) => item.status === 'blocked') ??
    approvalItems[0];

  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Run orchestration</span>
        <h1>Review requests centrally, approve them explicitly, then execute on distributed workers.</h1>
        <p>
          This page makes the approval path, block path, queue snapshot, and worker assignment visible in one place.
        </p>
      </header>

      <RequestReviewPanel requests={exerciseRequests} approvalPath={approvalPath} blockedPath={blockedPath} />
      <ApprovalQueue items={approvalItems} />
      {focusItem ? (
        <ApprovalChecklist
          consentStatus={focusItem.consentStatus}
          decisionReason={focusItem.decisionReason}
          items={focusItem.checks}
          title={`${focusItem.id} founder checklist`}
          subtitle="This is the current decision packet the operator works through before queueing or blocking the run."
        />
      ) : null}
      <RunStatusBoard />
      <RunTable runs={exerciseRequests} />
    </div>
  );
}
