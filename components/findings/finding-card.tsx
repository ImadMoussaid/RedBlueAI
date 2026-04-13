import { StatusPill } from '@/components/findings/status-pill';
import type { Finding } from '@/lib/findings/mock';

export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="card" style={{ padding: 20, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <div className="kicker">{finding.category}</div>
          <h3 style={{ margin: 0 }}>{finding.title}</h3>
        </div>
        <StatusPill tone={finding.severity} label={finding.severity} />
      </div>
      <p>{finding.summary}</p>
      <div className="grid two" style={{ gap: 12 }}>
        <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Evidence</strong>
          <p>{finding.evidence}</p>
        </section>
        <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Operator action</strong>
          <p>{finding.action}</p>
        </section>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <StatusPill tone="neutral" label={finding.status} />
        <StatusPill tone="neutral" label={finding.owasp} />
        <StatusPill tone="neutral" label={finding.cwe} />
      </div>
      <p><strong>Impact:</strong> {finding.impact}</p>
    </article>
  );
}
