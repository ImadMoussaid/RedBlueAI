import type { WorkspaceActivity, WorkspaceMember, WorkspaceMetric, WorkspacePolicy, WorkspaceTarget } from '@/lib/workspace/types';

export function WorkspaceOverview({
  metrics,
  targets,
  members,
  activity,
  policies
}: {
  metrics: WorkspaceMetric[];
  targets: WorkspaceTarget[];
  members: WorkspaceMember[];
  activity: WorkspaceActivity[];
  policies: WorkspacePolicy[];
}) {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="grid three">
        {metrics.map((metric) => (
          <article key={metric.label} className="card metric">
            <span className="kicker">{metric.label}</span>
            <h2 style={{ marginTop: 8 }}>{metric.value}</h2>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Targets</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {targets.map((target) => (
              <div key={target.name} className="timeline-item">
                <span />
                <div>
                  <strong>{target.name}</strong>
                  <p>{target.environment} · {target.baseUrl}</p>
                  <p>Consent: {target.consentState} · Exercise: {target.exerciseState}</p>
                  <p>Allowed domains: {target.allowedDomains.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Workspace members</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {members.map((member) => (
              <div key={member.name} className="timeline-item">
                <span />
                <div>
                  <strong>{member.name}</strong>
                  <p>{member.role} · {member.access}</p>
                  <p>{member.status} · Last active: {member.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <h2>Recent activity</h2>
          <div className="timeline" style={{ marginTop: 18 }}>
            {activity.map((item) => (
              <div key={item.title} className="timeline-item">
                <span />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <h2>Workspace policies</h2>
          <ul className="list" style={{ marginTop: 18 }}>
            {policies.map((policy) => (
              <li key={policy.title}>
                <strong>{policy.title}</strong>
                <p>{policy.detail}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
