import Link from 'next/link';
import { StatusPill } from '@/components/findings/status-pill';
import type { Finding } from '@/lib/findings/mock';

type RealFinding = {
  title?: string;
  summary?: string;
  severity?: string;
  detectionStatus?: string;
  evidence?: string;
  action?: string;
  remediationOwner?: string;
  owasp?: string;
  cwe?: string;
  phase?: string;
};

export function FindingCard({ finding, href }: { finding: Finding | RealFinding; href?: string }) {
  const f = finding as RealFinding & Partial<Finding>;
  const severity = f.severity ?? 'info';
  const detectionStatus = f.detectionStatus ?? '';
  const evidenceItems: Array<{ id: string; label: string; source: string; detail: string }> =
    (f as Finding).evidenceItems ?? [];

  const severityBorderColors: Record<string, string> = {
    Critical: '#dc2626', High: '#c2410c', Medium: '#b45309', Low: '#059669',
  };
  const borderColor = severityBorderColors[severity] ?? 'var(--border)';

  const card = (
    <article
      className="card card-hover"
      style={{ padding: 20, display: 'grid', gap: 12, borderLeft: `4px solid ${borderColor}`, cursor: href ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', flexWrap: 'wrap' }}>
        <div style={{ display: 'grid', gap: 6 }}>
          {(f as Finding).category || f.phase ? (
            <div className="kicker">{(f as Finding).category ?? f.phase}</div>
          ) : null}
          <h3 style={{ margin: 0 }}>{f.title}</h3>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {severity ? <StatusPill tone={severity} label={severity} /> : null}
          {detectionStatus ? <StatusPill tone="neutral" label={detectionStatus} /> : null}
        </div>
      </div>
      {f.summary ? <p>{f.summary}</p> : null}
      <div className="grid two" style={{ gap: 12 }}>
        {(f.evidence || evidenceItems.length > 0) ? (
          <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>Evidence</strong>
            {f.evidence ? <p style={{ marginTop: 8 }}>{f.evidence}</p> : null}
            {evidenceItems.length > 0 ? (
              <ul className="list" style={{ marginTop: 10 }}>
                {evidenceItems.map((item) => (
                  <li key={item.id}>{item.label} · {item.source} · {item.detail}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}
        {(f.action || f.remediationOwner) ? (
          <section className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>Operator action</strong>
            {f.action ? <p style={{ marginTop: 8 }}>{f.action}</p> : null}
            {f.remediationOwner ? <p><strong>Owner:</strong> {f.remediationOwner}</p> : null}
            {(f as Finding).remediationWindow ? <p><strong>Window:</strong> {(f as Finding).remediationWindow}</p> : null}
            {(f as Finding).confidence ? <p><strong>Confidence:</strong> {(f as Finding).confidence}</p> : null}
          </section>
        ) : null}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(f as Finding).status ? <StatusPill tone="neutral" label={(f as Finding).status} /> : null}
        {f.owasp ? <StatusPill tone="neutral" label={f.owasp} /> : null}
        {f.cwe ? <StatusPill tone="neutral" label={f.cwe} /> : null}
      </div>
      {(f as Finding).impact ? <p><strong>Impact:</strong> {(f as Finding).impact}</p> : null}
      {href && (
        <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>
          View full detail →
        </div>
      )}
    </article>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      {card}
    </Link>
  ) : card;
}
