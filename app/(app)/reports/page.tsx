import { ReportArtifacts } from '@/components/reports/report-artifacts';
import { FindingList } from '@/components/reports/finding-list';
import { ReportHighlights } from '@/components/reports/report-highlights';
import { reportHighlights, reportRuns } from '@/lib/reports/mock';

export default function ReportsPage() {
  const latestRun = reportRuns[0];

  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Reports</span>
        <h1>Polished reporting and artifact delivery for every run.</h1>
        <p>
          The reporting area is a clean placeholder for the RedBlueAI artifact flow: one PDF report, one
          evidence bundle, and one readable set of actionable fixes.
        </p>
      </header>

      <ReportHighlights highlights={reportHighlights} run={latestRun} />
      <FindingList findings={latestRun.findings} />

      <ReportArtifacts artifacts={latestRun.artifacts} />
    </div>
  );
}
