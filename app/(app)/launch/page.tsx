import { consentRecord, exerciseRequests, targetApplications } from '@/lib/data/control-plane';

export default function LaunchPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Exercise request</span>
        <h1>Create a request that freezes scope, consent, and guardrails.</h1>
        <p>
          This route scaffolds issue #6 by showing the request payload an operator should review before the
          exercise enters the queue.
        </p>
      </header>

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
        <h2>Recent request payloads</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {exerciseRequests.map((request) => (
            <div key={request.id} className="timeline-item">
              <span />
              <div>
                <strong>{request.id} · {request.target}</strong>
                <p>{request.type} · {request.status}</p>
                <p>{request.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
