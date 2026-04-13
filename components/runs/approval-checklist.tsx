import { StatusPill } from '@/components/findings/status-pill';

export type ApprovalChecklistStatus = 'captured' | 'pending' | 'needs-review' | 'blocked';

export type ApprovalChecklistItem = {
  id: string;
  label: string;
  detail: string;
  status: ApprovalChecklistStatus;
};

export type ApprovalChecklistProps = {
  consentStatus: string;
  decisionReason: string;
  items: ApprovalChecklistItem[];
  title?: string;
  subtitle?: string;
};

const statusTone: Record<ApprovalChecklistStatus, 'complete' | 'current' | 'pending' | 'blocked'> = {
  captured: 'complete',
  pending: 'pending',
  'needs-review': 'current',
  blocked: 'blocked'
};

export function ApprovalChecklist({
  consentStatus,
  decisionReason,
  items,
  title = 'Approval checklist',
  subtitle = 'Consent, scope, and guardrails are frozen before queueing.'
}: ApprovalChecklistProps) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
        <div>
          <div className="kicker">Operator review</div>
          <h2 style={{ marginTop: 8 }}>{title}</h2>
          <p style={{ marginTop: 10, maxWidth: 720 }}>{subtitle}</p>
        </div>
        <div style={{ display: 'grid', gap: 10, minWidth: 220 }}>
          <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>Consent status</strong>
            <div style={{ marginTop: 10 }}>
              <StatusPill tone={consentStatus === 'Captured' ? 'approved' : 'pending_manual_start'} label={consentStatus} />
            </div>
          </div>
          <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>Decision reason</strong>
            <p style={{ marginTop: 8 }}>{decisionReason}</p>
          </div>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: 20 }}>
        {items.map((item) => (
          <article key={item.id} className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
              <div>
                <div className="kicker">{item.id}</div>
                <h3 style={{ marginTop: 8 }}>{item.label}</h3>
              </div>
              <StatusPill tone={statusTone[item.status]} label={item.status} />
            </div>
            <p style={{ marginTop: 10 }}>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
