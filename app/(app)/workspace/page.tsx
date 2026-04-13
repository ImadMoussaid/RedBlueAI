import { targetApplications, workspaceSummary } from '@/lib/data/control-plane';

export default function WorkspacePage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Workspace foundation</span>
        <h1>Anchor every exercise inside a real customer workspace.</h1>
        <p>
          This workspace view sets the foundation for issue #3 by making ownership, target inventory,
          and operational readiness visible before an exercise request is created.
        </p>
      </header>

      <section className="grid three">
        <article className="card metric">
          <span className="kicker">Workspace</span>
          <h2>{workspaceSummary.name}</h2>
          <p>{workspaceSummary.region}</p>
        </article>
        <article className="card metric">
          <span className="kicker">Owner</span>
          <h2>{workspaceSummary.owner}</h2>
          <p>{workspaceSummary.pendingApprovals} pending approvals across current runs.</p>
        </article>
        <article className="card metric">
          <span className="kicker">Capacity</span>
          <h2>{workspaceSummary.activeWorkers} workers</h2>
          <p>{workspaceSummary.apps} registered target applications ready for controlled testing.</p>
        </article>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <h2>Registered target applications</h2>
        <div className="grid two" style={{ marginTop: 18 }}>
          {targetApplications.map((app) => (
            <article key={app.name} className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
              <h3>{app.name}</h3>
              <p>{app.environment}</p>
              <p>{app.baseUrl}</p>
              <p>Allowed domains: {app.allowedDomains.join(', ')}</p>
              <p>Rate limit: {app.rateLimit}</p>
              <p>Allowed hours: {app.allowedHours}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
