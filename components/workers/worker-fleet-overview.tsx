import { StatusPill } from '@/components/findings/status-pill';
import type { WorkerFleetNode, WorkerHeartbeatEvent } from '@/lib/workers/types';

export function WorkerFleetOverview({
  workers,
  heartbeats
}: {
  workers: WorkerFleetNode[];
  heartbeats: WorkerHeartbeatEvent[];
}) {
  return (
    <section className="grid two">
      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Registered workers</div>
        <h2 style={{ marginTop: 8 }}>Fleet capacity by host</h2>
        <div className="grid" style={{ gap: 14, marginTop: 18 }}>
          {workers.map((worker) => (
            <div key={worker.id} className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                <div>
                  <div className="kicker">{worker.region}</div>
                  <h3 style={{ marginTop: 8 }}>{worker.hostLabel}</h3>
                </div>
                <StatusPill tone={worker.status} label={worker.status} />
              </div>
              <div className="grid two" style={{ gap: 12, marginTop: 14 }}>
                <div>
                  <strong>Current job</strong>
                  <p style={{ marginTop: 6 }}>{worker.currentJob}</p>
                </div>
                <div>
                  <strong>Last heartbeat</strong>
                  <p style={{ marginTop: 6 }}>{worker.lastHeartbeat}</p>
                </div>
                <div>
                  <strong>Model</strong>
                  <p style={{ marginTop: 6 }}>{worker.model}</p>
                </div>
                <div>
                  <strong>Load</strong>
                  <p style={{ marginTop: 6 }}>{worker.load}</p>
                </div>
              </div>
              <ul className="list" style={{ marginTop: 12 }}>
                {worker.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Heartbeat trail</div>
        <h2 style={{ marginTop: 8 }}>Latest worker health updates</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {heartbeats.map((event) => (
            <div key={event.id} className="timeline-item">
              <span />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{event.worker}</strong>
                  <StatusPill tone={event.status} label={event.status} />
                </div>
                <p>{event.at}</p>
                <p>{event.message}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
