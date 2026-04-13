import { FindingCard } from '@/components/findings/finding-card';
import { actionableSummary, findings } from '@/lib/findings/mock';

export function FindingSummary() {
  const openFindings = findings.filter((finding) => finding.status === 'open').length;
  const fixedFindings = findings.filter((finding) => finding.status === 'fixed' || finding.status === 'accepted').length;
  const severeFindings = findings.filter((finding) => finding.severity === 'Critical' || finding.severity === 'High').length;
  const leadFinding = findings[0];

  return (
    <section className="card" style={{ padding: 24, display: 'grid', gap: 18 }}>
      <div>
        <div className="kicker">Actionable fix list</div>
        <h2 style={{ marginTop: 8 }}>Every issue ends in one clear next step.</h2>
        <p style={{ marginTop: 8, maxWidth: 760 }}>
          Findings are presented as operator-ready cards so the evidence, business impact, and fix guidance stay together.
        </p>
      </div>

      <div className="grid three">
        <article className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Open findings</div>
          <h3 style={{ marginTop: 8, fontSize: '2rem' }}>{openFindings}</h3>
          <p>Issues still waiting on remediation or re-review.</p>
        </article>
        <article className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Severe issues</div>
          <h3 style={{ marginTop: 8, fontSize: '2rem' }}>{severeFindings}</h3>
          <p>Critical and high-severity items that need immediate attention.</p>
        </article>
        <article className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Closed or accepted</div>
          <h3 style={{ marginTop: 8, fontSize: '2rem' }}>{fixedFindings}</h3>
          <p>Items already fixed or explicitly accepted by the operator.</p>
        </article>
      </div>

      <div className="grid two" style={{ gap: 16 }}>
        <article className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Lead evidence</div>
          <h3 style={{ marginTop: 8 }}>{leadFinding.title}</h3>
          <p style={{ marginTop: 10 }}>{leadFinding.evidence}</p>
          <p style={{ marginTop: 10 }}><strong>Impact:</strong> {leadFinding.impact}</p>
          <p style={{ marginTop: 10 }}><strong>Actionable fix:</strong> {leadFinding.action}</p>
        </article>

        <article className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Operator guidance</div>
          <h3 style={{ marginTop: 8 }}>What the founder should do next</h3>
          <ul className="list" style={{ marginTop: 12 }}>
            <li>Prioritize the highest-severity finding first.</li>
            <li>Share the evidence string with the implementation owner.</li>
            <li>Track the fix as a ticket before the next exercise run.</li>
          </ul>
        </article>
      </div>

      <div className="grid three">
        {actionableSummary.map((item) => (
          <article key={item.title} className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="grid two">
        {findings.map((finding) => (
          <FindingCard key={finding.id} finding={finding} />
        ))}
      </div>
    </section>
  );
}
