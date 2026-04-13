import { StatusPill } from '@/components/findings/status-pill';
import type { RunSummary } from '@/lib/findings/mock';

export function RunTable({ runs }: { runs: RunSummary[] }) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', marginBottom: 18 }}>
        <div>
          <div className="kicker">Queue snapshot</div>
          <h2 style={{ marginTop: 8 }}>Request lifecycle and run readiness</h2>
        </div>
        <a className="button secondary" href="/runs/run-acme-001">Open a run</a>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
              <th style={{ padding: '12px 10px' }}>Target</th>
              <th style={{ padding: '12px 10px' }}>Type</th>
              <th style={{ padding: '12px 10px' }}>Status</th>
              <th style={{ padding: '12px 10px' }}>Consent</th>
              <th style={{ padding: '12px 10px' }}>Worker</th>
              <th style={{ padding: '12px 10px' }}>Actionable fixes</th>
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
                <td style={{ padding: '14px 10px' }}><StatusPill tone={run.status} label={run.status} /></td>
                <td style={{ padding: '14px 10px' }}>{run.consent}</td>
                <td style={{ padding: '14px 10px', color: 'var(--muted)' }}>{run.worker}</td>
                <td style={{ padding: '14px 10px' }}>{run.actionableFixes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
