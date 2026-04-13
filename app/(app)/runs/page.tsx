import { pendingRuns } from '@/lib/data/mock';

export default function RunsPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Run orchestration</span>
        <h1>Queue runs centrally, execute them on distributed workers.</h1>
        <p>
          This page sketches the founder-operated queue: operator review first, worker assignment second,
          evidence and report capture last.
        </p>
      </header>
      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Run lifecycle</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {['pending_manual_start', 'approved', 'queued', 'assigned', 'running', 'reporting', 'completed'].map((step) => (
              <div key={step} className="timeline-item">
                <span />
                <div>
                  <strong>{step}</strong>
                  <p>Placeholder lifecycle state for the MVP control plane.</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Worker-ready queue snapshot</h2>
          <ul className="list" style={{ marginTop: 18 }}>
            {pendingRuns.map((run) => (
              <li key={run.name}>
                <strong>{run.name}</strong>
                <p>{run.type} · {run.status}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
