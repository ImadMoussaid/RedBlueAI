import { BillingOverview } from '@/components/billing/billing-overview';

export default function BillingPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Billing</span>
        <h1>Fixed-price per-run billing for RedBlueAI.</h1>
        <p>
          The MVP uses a simple commercial model: one approved exercise run, one payment, and one polished
          report. This page is the billing surface for that model.
        </p>
      </header>
      <BillingOverview />
      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Billing flow</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {[
              'Customer requests a paid exercise run',
              'Operator reviews consent, scope, and guardrails',
              'Payment is recorded for the run',
              'Run is approved and queued',
              'Worker executes the exercise',
              'Report is generated and stored'
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
          <h2>MVP billing rules</h2>
          <ul className="list" style={{ marginTop: 18 }}>
            <li>Fixed amount per run.</li>
            <li>No subscription tiers in the MVP.</li>
            <li>Billing state is tied to the exercise lifecycle.</li>
            <li>Unpaid runs remain blocked from execution.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
