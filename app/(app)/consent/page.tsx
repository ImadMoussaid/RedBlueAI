export default function ConsentPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Consent capture</span>
        <h1>Collect customer authorization before a run can be queued.</h1>
        <p>
          The MVP treats consent as a first-class product artifact. This page becomes the frozen source for the
          run consent snapshot stored alongside scope and guardrails.
        </p>
      </header>
      <section className="card" style={{ padding: 24 }}>
        <div className="form-grid">
          <label>
            Authorized signer
            <input placeholder="Jane Doe, Head of Engineering" />
          </label>
          <label>
            Authorization statement
            <textarea defaultValue={'I confirm that my organization owns the target assets or is explicitly authorized to have them tested by RedBlueAI under the stated rules of engagement.'} />
          </label>
          <label>
            Rules of engagement acknowledgement
            <textarea defaultValue={'Read-only exercise. No destructive payloads. In-scope assets only. Test accounts only where applicable.'} />
          </label>
        </div>
        <div className="card" style={{ padding: 18, marginTop: 18, background: 'var(--panel-alt)' }}>
          <strong>Required affirmations</strong>
          <ul className="list" style={{ marginTop: 10 }}>
            <li>Target ownership or written authorization has been confirmed.</li>
            <li>Only declared in-scope assets may be exercised.</li>
            <li>Read-only and no-destructive-actions rules apply to this request.</li>
            <li>The operator must still approve the run before queue submission.</li>
          </ul>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/runs" className="button primary">Save consent snapshot</a>
          <a href="/apps/new" className="button secondary">Back to app setup</a>
        </div>
      </section>
    </div>
  );
}
