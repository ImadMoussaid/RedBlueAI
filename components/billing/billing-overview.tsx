import { billingPlan, formatCurrency } from '@/lib/billing/pricing';
import { billingSummary } from '@/lib/billing/mock';

export function BillingOverview() {
  const { latestPayment, lineItems } = billingSummary;

  return (
    <section className="card" style={{ padding: 24 }}>
      <div className="grid two" style={{ alignItems: 'start' }}>
        <div>
          <span className="badge">Run-based billing</span>
          <h2 style={{ marginTop: 14 }}>{billingPlan.title}</h2>
          <p>{billingPlan.description}</p>
          <div className="button-row" style={{ marginTop: 18 }}>
            <a className="button primary" href="/consent">Request a paid run</a>
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
    </section>
  );
}
