import { ApprovalChecklist, type ApprovalChecklistItem } from '@/components/runs/approval-checklist';
import { StatusPill } from '@/components/findings/status-pill';

export type ApprovalQueueItem = {
  id: string;
  target: string;
  exerciseType: string;
  requestedAt: string;
  consentStatus: string;
  decisionReason: string;
  operator: string;
  worker: string;
  scopeSummary: string;
  guardrailSummary: string;
  status: 'pending_manual_start' | 'approved' | 'queued' | 'blocked';
  checks: ApprovalChecklistItem[];
};

export type ApprovalQueueProps = {
  items: ApprovalQueueItem[];
  title?: string;
  subtitle?: string;
};

const statusTone: Record<ApprovalQueueItem['status'], 'pending_manual_start' | 'approved' | 'queued' | 'blocked'> = {
  pending_manual_start: 'pending_manual_start',
  approved: 'approved',
  queued: 'queued',
  blocked: 'blocked'
};

export function ApprovalQueue({
  items,
  title = 'Approval queue',
  subtitle = 'Queued requests stay visible until the operator confirms consent, scope, and guardrails.'
}: ApprovalQueueProps) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap' }}>
        <div>
          <div className="kicker">Request lifecycle</div>
          <h2 style={{ marginTop: 8 }}>{title}</h2>
          <p style={{ marginTop: 10, maxWidth: 780 }}>{subtitle}</p>
        </div>
        <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none', minWidth: 220 }}>
          <strong>Pending approvals</strong>
          <p style={{ marginTop: 8 }}>{items.filter((item) => item.status === 'pending_manual_start').length} requests waiting for review.</p>
        </div>
      </div>

      <div className="grid" style={{ gap: 18, marginTop: 20 }}>
        {items.map((item) => (
          <article key={item.id} className="card" style={{ padding: 20, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
              <div>
                <div className="kicker">{item.id}</div>
                <h3 style={{ marginTop: 8 }}>{item.target}</h3>
                <p style={{ marginTop: 8 }}>{item.exerciseType}</p>
              </div>
              <StatusPill tone={statusTone[item.status]} label={item.status.replaceAll('_', ' ')} />
            </div>

            <div className="grid two" style={{ marginTop: 18 }}>
              <div className="card" style={{ padding: 16, background: '#fff', boxShadow: 'none' }}>
                <strong>Scope summary</strong>
                <p style={{ marginTop: 8 }}>{item.scopeSummary}</p>
              </div>
              <div className="card" style={{ padding: 16, background: '#fff', boxShadow: 'none' }}>
                <strong>Guardrails</strong>
                <p style={{ marginTop: 8 }}>{item.guardrailSummary}</p>
              </div>
            </div>

            <div className="grid two" style={{ marginTop: 18 }}>
              <div className="card" style={{ padding: 16, background: '#fff', boxShadow: 'none' }}>
                <strong>Operator context</strong>
                <p style={{ marginTop: 8 }}><strong>Reviewer:</strong> {item.operator}</p>
                <p><strong>Requested:</strong> {item.requestedAt}</p>
                <p><strong>Worker:</strong> {item.worker}</p>
              </div>
              <div className="card" style={{ padding: 16, background: '#fff', boxShadow: 'none' }}>
                <strong>Decision reason</strong>
                <p style={{ marginTop: 8 }}>{item.decisionReason}</p>
                <p style={{ marginTop: 10, color: 'var(--muted)' }}>Consent status: {item.consentStatus}</p>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <ApprovalChecklist
                consentStatus={item.consentStatus}
                decisionReason={item.decisionReason}
                items={item.checks}
                title="Review checklist"
                subtitle="Each item is a frozen approval input that the operator can inspect before the run is released."
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
