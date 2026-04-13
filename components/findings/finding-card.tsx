import { StatusPill } from '@/components/findings/status-pill';
import type { Finding } from '@/lib/findings/mock';

export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="card" style={{ padding: 20, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', flexWrap: 'wrap' }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <div className="kicker">{finding.category}</div>
          <h3 style={{ margin: 0 }}>{finding.title}</h3>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <StatusPill tone={finding.severity} label={finding.severity} />
          <StatusPill tone="neutral" label={finding.detectionStatus} />
        </div>
      </div>
      <p>{finding.summary}</p>
      <div className="grid two" style={{ gap: 12 }}>
        <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Evidence</strong>
          <p style={{ marginTop: 8 }}>{finding.evidence}</p>
          <ul className="list" style={{ marginTop: 10 }}>
            {finding.evidenceItems.map((item) => (
              <li key={item.id}>{item.label} · {item.source} · {item.detail}</li>
            ))}
          </ul>
        </section>
        <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Operator action</strong>
          <p style={{ marginTop: 8 }}>{finding.action}</p>
          <p><strong>Owner:</strong> {finding.remediationOwner}</p>
          <p><strong>Window:</strong> {finding.remediationWindow}</p>
          <p><strong>Confidence:</strong> {finding.confidence}</p>
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
