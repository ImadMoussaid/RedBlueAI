import { DashboardMetrics } from '@/components/app/metrics';
import { findings, pendingRuns } from '@/lib/data/mock';

export default function DashboardPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Operations overview</span>
        <h1>Founder-operated control plane for the MVP.</h1>
        <p>
          Review pending approvals, confirm customer consent, and keep distributed worker hosts aligned with
          the central queue before any run executes.
        </p>
      </header>
      <DashboardMetrics />
      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Pending run queue</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {pendingRuns.map((run) => (
              <div key={run.name} className="timeline-item">
                <span />
                <div>
                  <strong>{run.name}</strong>
                  <p>{run.type}</p>
                  <p>{run.status} · {run.consent}</p>
                  <p>{run.guardrails}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Top actionable fixes</h2>
          <ol className="list" style={{ marginTop: 18 }}>
            {findings.map((finding) => (
              <li key={finding.title}>
                <strong>{finding.title}</strong>
                <p>{finding.fix}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}
