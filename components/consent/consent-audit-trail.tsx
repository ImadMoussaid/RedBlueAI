import type { ConsentAuditEvent } from '@/lib/consent/types';
import { StatusPill } from '@/components/findings/status-pill';

export function ConsentAuditTrail({ events }: { events: ConsentAuditEvent[] }) {
  return (
    <article className="card" style={{ padding: 24 }}>
      <div className="kicker">Audit trail</div>
      <h2 style={{ marginTop: 8 }}>Visible consent history</h2>
      <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
        {events.map((event) => (
          <div
            key={event.id}
            className="card"
            style={{
              padding: 16,
              background: 'var(--panel-alt)',
              boxShadow: 'none',
              borderColor: 'rgba(18, 35, 64, 0.08)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
              <div>
                <strong>{event.action}</strong>
                <p style={{ marginTop: 6 }}>{event.note}</p>
              </div>
              <StatusPill tone="neutral" label={event.timestamp} />
            </div>
            <p style={{ marginTop: 12, color: 'var(--muted)' }}>
              Actor: {event.actor} • Run: {event.runId}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
