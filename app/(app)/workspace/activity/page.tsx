import { workspaceActivity } from '@/lib/workspace/mock';

export default function WorkspaceActivityPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Activity</span>
        <h1>Track the control plane events that matter for the pilot.</h1>
        <p>
          Activity here is intentionally narrow: consent events, approval events, and target updates that matter
          to the exercise flow.
        </p>
      </header>

      <section className="card" style={{ padding: 24 }}>
        <div className="timeline">
          {workspaceActivity.map((event) => (
            <div key={event.title} className="timeline-item">
              <span />
              <div>
                <strong>{event.title}</strong>
                <p>{event.detail}</p>
                <p>{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
