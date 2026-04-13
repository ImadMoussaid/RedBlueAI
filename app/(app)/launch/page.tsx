import { RequestReviewPanel } from '@/components/exercises/request-review-panel';
import { StatusPill } from '@/components/findings/status-pill';
import { billingSummary } from '@/lib/billing/mock';
import { billingPlan, formatCurrency } from '@/lib/billing/pricing';
import { consentRecord, targetApplications } from '@/lib/data/control-plane';
import { approvalPath, blockedPath, exerciseRequests } from '@/lib/exercises/mock';

export default function LaunchPage() {
  const launchEntitlement = billingSummary.entitlements[0];

  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Exercise request</span>
        <h1>Create a request that freezes scope, consent, and guardrails before review.</h1>
        <p>
          This route shows the exact request payload an operator reviews before approving a run or blocking it for changes.
          A paid entitlement is now required before the request can move into founder review.
        </p>
      </header>

      <section className="grid two">
        <section className="card" style={{ padding: 24 }}>
          <div className="form-grid two">
            <label>
              Target application
              <select defaultValue={targetApplications[0].name}>
                {targetApplications.map((app) => (
                  <option key={app.name} value={app.name}>{app.name}</option>
                ))}
              </select>
            </label>
            <label>
              Exercise mode
              <select defaultValue="Authenticated web exercise">
                <option>Quick web exercise</option>
                <option>Authenticated web exercise</option>
                <option>API exercise</option>
              </select>
            </label>
          </div>

          <div className="grid two" style={{ marginTop: 18 }}>
            <article className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
              <h3>Frozen guardrail snapshot</h3>
              <ul className="list">
                <li>Read-only mode enabled</li>
                <li>No destructive actions</li>
                <li>Rate limit: {targetApplications[0].rateLimit}</li>
                <li>Allowed hours: {targetApplications[0].allowedHours}</li>
              </ul>
            </article>
            <article className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
              <h3>Frozen consent snapshot</h3>
              <p>{consentRecord.signerName} · {consentRecord.signerRole}</p>
              <p>{consentRecord.version} · accepted {consentRecord.acceptedAt}</p>
              <ul className="list" style={{ marginTop: 10 }}>
                {consentRecord.affirmations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="button-row" style={{ marginTop: 18 }}>
            <a className="button primary" href="/runs">Submit request for approval</a>
            <a className="button secondary" href="/consent">Review consent</a>
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <div className="kicker">Billing gate</div>
          <h2 style={{ marginTop: 8 }}>One payment unlocks one reviewable run</h2>
          <p>
            {billingPlan.title} · {formatCurrency(billingPlan.priceCents, billingPlan.currency)}. The operator cannot approve a run until its paid entitlement is available.
          </p>
          <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none', marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
              <div>
                <strong>{launchEntitlement.runId}</strong>
                <p style={{ marginTop: 6 }}>{launchEntitlement.target}</p>
              </div>
              <StatusPill
                tone={launchEntitlement.paymentStatus === 'paid' ? 'approved' : 'pending_manual_start'}
                label={launchEntitlement.paymentStatus.replaceAll('_', ' ')}
              />
            </div>
            <p style={{ marginTop: 10 }}><strong>Approval state:</strong> {launchEntitlement.approvalState.replaceAll('_', ' ')}</p>
            <p>{launchEntitlement.operatorNote}</p>
          </div>
          <div className="button-row" style={{ marginTop: 18 }}>
            <a className="button primary" href="/billing">Open billing</a>
            <a className="button secondary" href="/runs">Open run queue</a>
          </div>
        </section>
      </section>

      <RequestReviewPanel requests={exerciseRequests} approvalPath={approvalPath} blockedPath={blockedPath} />
    </div>
  );
}
