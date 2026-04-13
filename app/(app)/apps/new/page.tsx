export default function AddAppPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">App onboarding</span>
        <h1>Add a customer app and freeze its first exercise scope.</h1>
        <p>
          This starter form captures the app target, access details, and initial guardrails that will later be
          snapshotted onto an exercise request.
        </p>
      </header>
      <section className="card" style={{ padding: 24 }}>
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
        <div className="form-grid two" style={{ marginTop: 16 }}>
          <label>
            Allowed domains
            <textarea defaultValue={'staging.acme.app\napi.staging.acme.app'} />
          </label>
          <label>
            Guardrails
            <textarea defaultValue={'Read-only mode\nNo destructive actions\nAllowed hours: Mon-Fri 08:00-18:00 CET'} />
          </label>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/consent" className="button primary">Continue to consent</a>
          <a href="/dashboard" className="button secondary">Save draft</a>
        </div>
      </section>
    </div>
  );
}
