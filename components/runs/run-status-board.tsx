import { StatusPill } from '@/components/findings/status-pill';
import { workerHosts } from '@/lib/findings/mock';
import { approvalPath, blockedPath } from '@/lib/exercises/mock';

export function RunStatusBoard() {
  return (
    <section className="grid two">
      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Run lifecycle</div>
        <h2 style={{ marginTop: 8 }}>Operator approval gates and state changes</h2>
        <p style={{ marginTop: 10 }}>
          Requests must be approved before queueing, and blocked requests stay visible with a reason until the operator fixes scope or authorization.
        </p>
        <div className="timeline" style={{ marginTop: 18 }}>
          {approvalPath.map((stage) => (
            <div key={stage.title} className="timeline-item">
              <span />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{stage.title}</strong>
                  <StatusPill tone={stage.tone} label={stage.tone.replaceAll('_', ' ')} />
                </div>
                <p>{stage.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 16, padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Blocked transition</div>
          <div className="timeline" style={{ marginTop: 12 }}>
            {blockedPath.map((stage) => (
              <div key={stage.title} className="timeline-item">
                <span />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <strong>{stage.title}</strong>
                    <StatusPill tone={stage.tone} label={stage.tone.replaceAll('_', ' ')} />
                  </div>
                  <p>{stage.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Worker hosts</div>
        <h2 style={{ marginTop: 8 }}>Distributed execution capacity</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {workerHosts.map((worker) => (
            <div key={worker.name} className="timeline-item">
              <span />
              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{worker.name}</strong>
                  <StatusPill tone={worker.status} label={worker.status} />
                </div>
                <p>Load {worker.load}</p>
                <p>Heartbeat {worker.lastHeartbeat}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
