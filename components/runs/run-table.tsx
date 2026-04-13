import { StatusPill } from '@/components/findings/status-pill';
import type { ExerciseRequestReview } from '@/lib/exercises/types';

export function RunTable({ runs }: { runs: ExerciseRequestReview[] }) {
  const manualStarts = runs.filter((run) => run.status === 'pending_manual_start').length;
  const approved = runs.filter((run) => run.reviewDecision === 'approved').length;
  const blocked = runs.filter((run) => run.reviewDecision === 'blocked').length;

  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', marginBottom: 18, flexWrap: 'wrap' }}>
        <div>
          <div className="kicker">Queue snapshot</div>
          <h2 style={{ marginTop: 8 }}>Request review, approval, and block status</h2>
          <p style={{ marginTop: 8, maxWidth: 760 }}>
            The queue keeps consent, scope, and operator decisions visible so the next move is always obvious.
          </p>
        </div>
        <div className="button-row">
          <span className="button secondary">Pending: {manualStarts}</span>
          <span className="button secondary">Approved: {approved}</span>
          <span className="button secondary">Blocked: {blocked}</span>
          <a className="button primary" href="/runs/run-acme-001">Open a run</a>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
              <th style={{ padding: '12px 10px' }}>Target</th>
              <th style={{ padding: '12px 10px' }}>Type</th>
              <th style={{ padding: '12px 10px' }}>Status</th>
              <th style={{ padding: '12px 10px' }}>Decision note</th>
              <th style={{ padding: '12px 10px' }}>Operator action</th>
              <th style={{ padding: '12px 10px' }}>Worker</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '14px 10px' }}>
                  <div style={{ display: 'grid', gap: 4 }}>
                    <strong>{run.target}</strong>
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{run.requestedAt}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 10px', color: 'var(--muted)' }}>{run.type}</td>
                <td style={{ padding: '14px 10px' }}><StatusPill tone={run.status} label={run.status.replaceAll('_', ' ')} /></td>
                <td style={{ padding: '14px 10px' }}>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <StatusPill tone={run.reviewTone} label={run.reviewDecision.replaceAll('_', ' ')} />
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{run.reviewSummary}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 10px' }}>{run.nextTransition}</td>
                <td style={{ padding: '14px 10px', color: 'var(--muted)' }}>{run.worker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
