import { StatusPill } from '@/components/findings/status-pill';
import type { Finding } from '@/lib/findings/mock';

export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="card" style={{ padding: 22, display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', flexWrap: 'wrap' }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <div className="kicker">{finding.category}</div>
          <h3 style={{ margin: 0 }}>{finding.title}</h3>
          <p style={{ margin: 0, maxWidth: 720 }}>{finding.summary}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'end' }}>
          <StatusPill tone={finding.severity} label={finding.severity} />
          <StatusPill tone={finding.status} label={finding.status} />
        </div>
      </div>

      <div className="grid two" style={{ gap: 12 }}>
        <section className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Evidence</div>
          <p style={{ marginTop: 10 }}>{finding.evidence}</p>
        </section>
        <section className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Business impact</div>
          <p style={{ marginTop: 10 }}>{finding.impact}</p>
        </section>
      </div>

      <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
        <div className="kicker">Actionable fix</div>
        <p style={{ marginTop: 10 }}>{finding.action}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <StatusPill tone="neutral" label={finding.owasp} />
        <StatusPill tone="neutral" label={finding.cwe} />
      </div>
    </article>
  );
}
