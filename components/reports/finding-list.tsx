import type { ReportFinding } from '@/lib/reports/types';

type Props = {
  findings: ReportFinding[];
};

const severityTone: Record<ReportFinding['severity'], string> = {
  Critical: 'var(--accent)',
  High: '#b23b4f',
  Medium: '#b36a1e',
  Low: '#4e6b8a'
};

export function FindingList({ findings }: Props) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div className="page-header" style={{ marginBottom: 18 }}>
        <span className="badge">Actionable fixes</span>
        <h2>Prioritized findings with explicit remediation guidance</h2>
        <p>
          Each issue is written to be shareable with both technical and business stakeholders, with the fix
          statement kept concrete enough to turn into a ticket immediately.
        </p>
      </div>

      <div className="grid" style={{ gap: 16 }}>
        {findings.map((finding) => (
          <article key={finding.id} className="card" style={{ padding: 18, boxShadow: 'none' }}>
            <div className="button-row" style={{ justifyContent: 'space-between' }}>
              <span className="badge" style={{ color: severityTone[finding.severity] }}>{finding.severity}</span>
              <span className="kicker">{finding.detectionStatus}</span>
            </div>
            <h3 style={{ marginTop: 12 }}>{finding.title}</h3>
            <p>{finding.summary}</p>
            <p style={{ marginTop: 8 }}><strong>Impact:</strong> {finding.impact}</p>
            <p style={{ marginTop: 8 }}><strong>Actionable fix:</strong> {finding.actionableFix}</p>
            <p style={{ marginTop: 8 }}><strong>OWASP:</strong> {finding.owasp} · <strong>CWE:</strong> {finding.cwe}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
