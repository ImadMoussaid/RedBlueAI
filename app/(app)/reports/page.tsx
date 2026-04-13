import { ReportArtifacts } from '@/components/reports/report-artifacts';
import { FindingList } from '@/components/reports/finding-list';
import { ReportHighlights } from '@/components/reports/report-highlights';
import { reportHighlights, reportRuns } from '@/lib/reports/mock';

export default function ReportsPage() {
  const latestRun = reportRuns[0];

  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Reports</span>
        <h1>Partner-ready reporting and artifact delivery for every completed run.</h1>
        <p>
          The reporting area now ties the executive summary, actionable fixes, evidence references, and downloadable artifacts into one shareable output flow.
        </p>
      </header>

      <ReportHighlights highlights={reportHighlights} run={latestRun} />

      <section className="card" style={{ padding: 24 }}>
        <div className="kicker">Remediation plan</div>
        <h2 style={{ marginTop: 8 }}>Fixes grouped by owner and urgency</h2>
        <div className="grid three" style={{ marginTop: 18 }}>
          {latestRun.actionableFixes.map((fix) => (
            <article key={fix.id} className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <div className="button-row" style={{ justifyContent: 'space-between' }}>
                <strong>{fix.owner}</strong>
                <span className="badge">{fix.priority}</span>
              </div>
              <h3 style={{ marginTop: 12 }}>{fix.title}</h3>
              <p>{fix.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <FindingList findings={latestRun.findings} />
      <ReportArtifacts artifacts={latestRun.artifacts} />
    </div>
  );
}
