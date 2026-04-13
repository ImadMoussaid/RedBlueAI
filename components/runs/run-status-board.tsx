import { StatusPill } from '@/components/findings/status-pill';
import { runPhases, workerHosts } from '@/lib/findings/mock';

export function RunStatusBoard() {
  return (
    <section className="grid two">
      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Run lifecycle</div>
        <h2 style={{ marginTop: 8 }}>Operator-friendly state view</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {runPhases.map((phase) => (
            <div key={phase.name} className="timeline-item">
              <span />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{phase.name}</strong>
                  <StatusPill tone={phase.status} label={phase.status} />
                </div>
                <p>{phase.note}</p>
              </div>
            </div>
          ))}
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
