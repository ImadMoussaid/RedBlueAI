import { RunStatusBoard } from '@/components/runs/run-status-board';
import { RunTable } from '@/components/runs/run-table';
import { runs } from '@/lib/findings/mock';

export default function RunsPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Run orchestration</span>
        <h1>Queue runs centrally, execute them on distributed workers.</h1>
        <p>
          This page shows the founder-operated queue, the current worker load, and the operator-friendly
          state changes that drive a safe exercise lifecycle.
        </p>
      </header>

      <RunStatusBoard />
      <RunTable runs={runs} />
    </div>
  );
}
