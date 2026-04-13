import { StatusPill } from '@/components/findings/status-pill';
import { BillingOverview } from '@/components/billing/billing-overview';
import { billingSummary } from '@/lib/billing/mock';

export default function BillingPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Billing</span>
        <h1>Fixed-price per-run billing for RedBlueAI.</h1>
        <p>
          The MVP uses a simple commercial model: one approved exercise run, one payment, and one polished
          report. This page now shows how payment state maps directly to entitlement, approval, and queue readiness.
        </p>
      </header>
      <BillingOverview />
      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Billing flow</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {[
              'Customer requests a paid exercise run',
              'Payment is recorded against the requested run',
              'Paid entitlement unlocks founder review',
              'Operator reviews consent, scope, and guardrails',
              'Run is approved and queued',
              'Worker executes the exercise and generates the report'
            ].map((step) => (
              <div key={step} className="timeline-item">
                <span />
                <div>
                  <strong>{step}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Current entitlement state</h2>
          <div className="grid" style={{ gap: 12, marginTop: 18 }}>
            {billingSummary.entitlements.map((item) => (
              <div key={item.runId} className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                  <div>
                    <strong>{item.runId}</strong>
                    <p style={{ marginTop: 6 }}>{item.target}</p>
                  </div>
                  <StatusPill
                    tone={item.paymentStatus === 'paid' ? 'approved' : 'pending_manual_start'}
                    label={item.paymentStatus.replaceAll('_', ' ')}
                  />
                </div>
                <p style={{ marginTop: 10 }}>{item.operatorNote}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
