import type { ReportRun } from '@/lib/reports/types';

type Highlight = {
  label: string;
  value: string;
  note: string;
};

type Props = {
  highlights: Highlight[];
  run: ReportRun;
};

export function ReportHighlights({ highlights, run }: Props) {
  return (
    <section className="grid two">
      <article className="card hero" style={{ padding: 24 }}>
        <span className="kicker">Latest completed run</span>
        <h2 style={{ marginTop: 12, fontSize: '2rem' }}>{run.appName}</h2>
        <p style={{ marginTop: 8 }}>
          {run.exerciseType} · {run.status} · completed {run.completedAt}
        </p>
        <div className="grid three" style={{ marginTop: 20 }}>
          <div>
            <strong style={{ fontSize: '2rem' }}>{run.score}</strong>
            <p>Security score</p>
          </div>
          <div>
            <strong style={{ fontSize: '2rem' }}>{run.attackPaths}</strong>
            <p>Attack paths</p>
          </div>
          <div>
            <strong style={{ fontSize: '2rem' }}>{run.missedDetections}</strong>
            <p>Missed detections</p>
          </div>
        </div>
      </article>
      <article className="card" style={{ padding: 24 }}>
        <h3>Report outcomes</h3>
        <div className="grid" style={{ marginTop: 16 }}>
          {highlights.map((item) => (
            <div key={item.label} className="card" style={{ padding: 16, boxShadow: 'none' }}>
              <span className="badge" style={{ marginBottom: 10 }}>{item.label}</span>
              <strong style={{ fontSize: '1.75rem' }}>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
