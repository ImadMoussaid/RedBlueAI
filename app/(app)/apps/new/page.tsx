import { AppTargetCard } from '@/components/apps/app-target-card';
import { ScopePanel } from '@/components/scope/scope-panel';
import { appTargets, onboardingSnapshot } from '@/lib/apps/mock';
import { guardrailSnapshot, scopeSections, scopeSnapshot } from '@/lib/scope/mock';

export default function AddAppPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">App onboarding</span>
        <h1>Add a customer app, scope it, and freeze the guardrails.</h1>
        <p>
          This onboarding slice now models the persisted shape for app targets, blocked domains, rate limits,
          and consent-aware guardrails before an exercise ever exists.
        </p>
      </header>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Draft target</div>
          <h2 style={{ marginTop: 8 }}>{onboardingSnapshot.target.name}</h2>
          <p>{onboardingSnapshot.target.description}</p>
          <div className="grid" style={{ marginTop: 18, gap: 12 }}>
            <p><strong>Customer:</strong> {onboardingSnapshot.target.customerName}</p>
            <p><strong>Environment:</strong> {onboardingSnapshot.target.environment}</p>
            <p><strong>Base URL:</strong> {onboardingSnapshot.target.baseUrl}</p>
            <p><strong>Login URL:</strong> {onboardingSnapshot.target.loginUrl ?? 'Not set'}</p>
            <p><strong>API spec:</strong> {onboardingSnapshot.target.apiSpecSource ?? 'Not uploaded yet'}</p>
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Available targets</div>
          <div className="grid" style={{ marginTop: 14 }}>
            {appTargets.map((target) => (
              <AppTargetCard key={target.name} target={target} />
            ))}
          </div>
        </article>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <h2>Setup form</h2>
        <div className="form-grid two">
          <label>
            App name
            <input placeholder="Acme staging portal" />
          </label>
          <label>
            Base URL
            <input placeholder="https://staging.acme.app" />
          </label>
          <label>
            Login URL
            <input placeholder="https://staging.acme.app/login" />
          </label>
          <label>
            Environment
            <select defaultValue="staging">
              <option value="staging">Staging</option>
              <option value="test">Production-safe test env</option>
            </select>
          </label>
        </div>
        <div className="grid two" style={{ marginTop: 18 }}>
          <article className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
            <h3>App setup preview</h3>
            <p style={{ marginTop: 8 }}>This snapshot is the shape that will later be frozen on an exercise request.</p>
            <div className="timeline" style={{ marginTop: 14 }}>
              <div className="timeline-item">
                <span />
                <div>
                  <strong>Target identity</strong>
                  <p>{onboardingSnapshot.target.customerName} · {onboardingSnapshot.target.environment}</p>
                </div>
              </div>
              <div className="timeline-item">
                <span />
                <div>
                  <strong>Scope lock</strong>
                  <p>{onboardingSnapshot.scope.allowedDomains.length} allowed domains and {onboardingSnapshot.scope.blockedDomains.length} blocked domains.</p>
                </div>
              </div>
              <div className="timeline-item">
                <span />
                <div>
                  <strong>Guardrail lock</strong>
                  <p>Read-only, no destructive actions, rate limited, and legal accepted.</p>
                </div>
              </div>
            </div>
          </article>
          <article className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
            <h3>Scope and guardrails</h3>
            <p style={{ marginTop: 8 }}>These values are the persisted-shape scaffold for issue #4.</p>
            <ul className="list" style={{ marginTop: 10 }}>
              <li>Allowed domains are explicit allowlist entries.</li>
              <li>Blocked domains stay out of scope across all exercises.</li>
              <li>Rate limit and allowed hours are frozen before launch.</li>
              <li>Guardrail choices are captured as a snapshot, not a live form.</li>
            </ul>
          </article>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/consent" className="button primary">Continue to consent</a>
          <a href="/dashboard" className="button secondary">Save draft</a>
        </div>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <h2>Scope review</h2>
        <p style={{ marginTop: 8 }}>The layout below matches the eventual persisted data model for an onboarding snapshot.</p>
        <div style={{ marginTop: 18 }}>
          <ScopePanel
            scopeSections={scopeSections}
            scopeSnapshot={scopeSnapshot}
            guardrailSnapshot={guardrailSnapshot}
          />
        </div>
      </section>
    </div>
  );
}
