import { FindingSummary } from '@/components/findings/finding-summary';
import { StatusPill } from '@/components/findings/status-pill';
import { dashboardStats, runs } from '@/lib/findings/mock';

export default function DashboardPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Operations overview</span>
        <h1>Founder-operated control plane for the MVP.</h1>
        <p>
          Review pending approvals, confirm customer consent, and keep distributed worker hosts aligned with
          the central queue before any run executes.
        </p>
      </header>

      <div className="grid three">
        {dashboardStats.map((stat) => (
          <section key={stat.title} className="card metric">
            <span className="kicker">{stat.title}</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: 8 }}>{stat.value}</h2>
            <p>{stat.body}</p>
          </section>
        ))}
      </div>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Pending approvals</div>
          <h2 style={{ marginTop: 8 }}>Runs waiting for operator review</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {runs.slice(0, 2).map((run) => (
              <div key={run.id} className="timeline-item">
                <span />
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <strong>{run.target}</strong>
                    <StatusPill tone={run.status} label={run.status} />
                  </div>
                  <p>{run.type}</p>
                  <p>{run.guardrails}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Operator focus</div>
          <h2 style={{ marginTop: 8 }}>Immediate actionable fixes</h2>
          <ol className="list" style={{ marginTop: 18 }}>
            <li>
              <strong>Secure the session cookie handling.</strong>
              <p>Enable HTTPS-only cookie transport and remove insecure defaults.</p>
            </li>
            <li>
              <strong>Add throttling to auth-related routes.</strong>
              <p>Reduce brute-force and abuse risk on reset and login flows.</p>
            </li>
            <li>
              <strong>Trim admin API responses.</strong>
              <p>Expose only the metadata the UI needs to complete the exercise review.</p>
            </li>
          </ol>
        </article>
      </section>

      <FindingSummary />
    </div>
  );
}
