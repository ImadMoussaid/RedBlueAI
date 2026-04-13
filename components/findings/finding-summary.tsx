import { FindingCard } from '@/components/findings/finding-card';
import { actionableSummary, findings } from '@/lib/findings/mock';

export function FindingSummary() {
  return (
    <section className="card" style={{ padding: 24, display: 'grid', gap: 18 }}>
      <div>
        <div className="kicker">Actionable fix list</div>
        <h2 style={{ marginTop: 8 }}>Every issue ends in one clear next step.</h2>
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
        {findings.slice(0, 2).map((finding) => (
          <FindingCard key={finding.id} finding={finding} />
        ))}
      </div>
      <div className="grid two">
        <article className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Recent evidence</strong>
          <ul className="list" style={{ marginTop: 10 }}>
            {findings.slice(0, 3).flatMap((finding) =>
              finding.evidenceItems.map((item) => (
                <li key={item.id}>{finding.title} · {item.label} · {item.detail}</li>
              ))
            )}
          </ul>
        </article>
        <article className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Queue guidance</strong>
          <ul className="list" style={{ marginTop: 10 }}>
            <li>Prioritize runs that already captured consent.</li>
            <li>Review worker assignment before launching the next job.</li>
            <li>Export the PDF report after purple summary is complete.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
