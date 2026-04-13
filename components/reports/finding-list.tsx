import { StatusPill } from '@/components/findings/status-pill';
import type { ReportFinding } from '@/lib/reports/types';

type Props = {
  findings: ReportFinding[];
};

export function FindingList({ findings }: Props) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div className="page-header" style={{ marginBottom: 18 }}>
        <span className="badge">Actionable fixes</span>
        <h2>Prioritized findings with evidence and ownership</h2>
        <p>
          Each issue includes the business impact, the concrete remediation step, the owning team, and the evidence references that support the report.
        </p>
      </div>

      <div className="grid" style={{ gap: 16 }}>
        {findings.map((finding) => (
          <article key={finding.id} className="card" style={{ padding: 18, boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ margin: 0 }}>{finding.title}</h3>
                <p style={{ marginTop: 8 }}>{finding.summary}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <StatusPill tone={finding.severity} label={finding.severity} />
                <StatusPill tone="neutral" label={finding.detectionStatus} />
              </div>
            </div>

            <div className="grid two" style={{ gap: 12, marginTop: 16 }}>
              <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
                <strong>Impact</strong>
                <p style={{ marginTop: 8 }}>{finding.impact}</p>
              </div>
              <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none' }}>
                <strong>Actionable fix</strong>
                <p style={{ marginTop: 8 }}>{finding.actionableFix}</p>
              </div>
            </div>

            <div className="grid two" style={{ gap: 12, marginTop: 12 }}>
              <div>
                <strong>Remediation owner</strong>
                <p style={{ marginTop: 6 }}>{finding.remediationOwner}</p>
              </div>
              <div>
                <strong>Remediation window</strong>
                <p style={{ marginTop: 6 }}>{finding.remediationWindow}</p>
              </div>
              <div>
                <strong>OWASP</strong>
                <p style={{ marginTop: 6 }}>{finding.owasp}</p>
              </div>
              <div>
                <strong>CWE</strong>
                <p style={{ marginTop: 6 }}>{finding.cwe}</p>
              </div>
            </div>

            <div className="card" style={{ padding: 14, background: 'var(--panel-alt)', boxShadow: 'none', marginTop: 16 }}>
              <strong>Evidence references</strong>
              <ul className="list" style={{ marginTop: 10 }}>
                {finding.evidence.map((item) => (
                  <li key={item.id}>
                    {item.label} · {item.source} · {item.detail}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
