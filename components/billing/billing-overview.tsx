import { StatusPill } from '@/components/findings/status-pill';
import { billingPlan, formatCurrency } from '@/lib/billing/pricing';
import { billingSummary } from '@/lib/billing/mock';

const entitlementTone = {
  awaiting_payment: 'pending_manual_start',
  ready_for_review: 'approved',
  queued: 'queued',
  consumed: 'completed'
} as const;

export function BillingOverview() {
  const { entitlements, latestPayment, lineItems, payments } = billingSummary;

  return (
    <section className="card" style={{ padding: 24 }}>
      <div className="grid two" style={{ alignItems: 'start' }}>
        <div>
          <span className="badge">Run-based billing</span>
          <h2 style={{ marginTop: 14 }}>{billingPlan.title}</h2>
          <p>{billingPlan.description}</p>
          <div className="button-row" style={{ marginTop: 18 }}>
            <a className="button primary" href="/launch">Pay and unlock a run</a>
            <a className="button secondary" href="/runs">Review run queue</a>
          </div>
        </div>
        <div className="card" style={{ padding: 20, background: 'var(--panel-alt)' }}>
          <span className="kicker">Price</span>
          <h2 style={{ marginTop: 8, fontSize: '2.8rem' }}>{formatCurrency(billingPlan.priceCents, billingPlan.currency)}</h2>
          <p>One exercise run. One payment. No subscription in the MVP.</p>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: 22 }}>
        <div className="card" style={{ padding: 18, background: 'rgba(255,255,255,0.7)' }}>
          <h3>What is included</h3>
          <ul className="list">
            {billingPlan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ padding: 18, background: 'rgba(255,255,255,0.7)' }}>
          <h3>Billing rules</h3>
          <ul className="list">
            {billingPlan.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: 22 }}>
        <div className="card" style={{ padding: 18 }}>
          <h3>Latest payment snapshot</h3>
          <dl style={{ display: 'grid', gap: 10, margin: 0 }}>
            <div>
              <dt className="kicker">Payment ID</dt>
              <dd>{latestPayment.id}</dd>
            </div>
            <div>
              <dt className="kicker">Run ID</dt>
              <dd>{latestPayment.runId}</dd>
            </div>
            <div>
              <dt className="kicker">Status</dt>
              <dd>{latestPayment.status}</dd>
            </div>
            <div>
              <dt className="kicker">Entitlement</dt>
              <dd>{latestPayment.entitlementState}</dd>
            </div>
          </dl>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <h3>Line items</h3>
          <div className="timeline" style={{ marginTop: 14 }}>
            {lineItems.map((item) => (
              <div key={item.label} className="timeline-item">
                <span />
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                  <p>
                    {item.quantity} x {formatCurrency(item.amountCents, billingPlan.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: 22 }}>
        <article className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <h3>Run entitlements</h3>
          <div className="grid" style={{ gap: 12, marginTop: 14 }}>
            {entitlements.map((entitlement) => (
              <div key={entitlement.runId} className="card" style={{ padding: 14, boxShadow: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                  <div>
                    <strong>{entitlement.runId}</strong>
                    <p style={{ marginTop: 6 }}>{entitlement.target}</p>
                  </div>
                  <StatusPill tone={entitlementTone[entitlement.approvalState]} label={entitlement.approvalState.replaceAll('_', ' ')} />
                </div>
                <p style={{ marginTop: 10 }}><strong>Payment:</strong> {entitlement.paymentStatus}</p>
                <p>{entitlement.operatorNote}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <h3>Payment history</h3>
          <div className="timeline" style={{ marginTop: 14 }}>
            {payments.map((payment) => (
              <div key={payment.id} className="timeline-item">
                <span />
                <div>
                  <strong>{payment.target}</strong>
                  <p>{payment.description}</p>
                  <p>{formatCurrency(payment.amountCents, payment.currency)} · {payment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
