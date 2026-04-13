import { workspacePolicies } from '@/lib/workspace/mock';

export default function WorkspaceSettingsPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Settings</span>
        <h1>Keep the workspace settings small, auditable, and pilot-friendly.</h1>
        <p>
          These settings are still mock-backed, but they outline the policies that the first production workspace
          will need before real auth and persistence land.
        </p>
      </header>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Safety policies</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {workspacePolicies.map((policy) => (
              <div key={policy.title} className="timeline-item">
                <span />
                <div>
                  <strong>{policy.title}</strong>
                  <p>{policy.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Workspace settings preview</h2>
          <ul className="list" style={{ marginTop: 18 }}>
            <li>Default mode: founder-operated</li>
            <li>Scope enforcement: required</li>
            <li>Consent snapshot: versioned</li>
            <li>Worker access: controlled by queue assignment</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
