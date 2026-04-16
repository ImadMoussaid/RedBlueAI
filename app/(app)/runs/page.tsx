export const dynamic = 'force-dynamic';

// ApprovalQueue — pending items routed to approvalPath or blockedPath
// ApprovalChecklist — steps verified before a run transitions to queued

import { StatusPill } from '@/components/findings/status-pill';
import { RunActions } from '@/components/runs/run-actions';
import { getExerciseRequests } from '@/lib/exercises/repository';
import { approvalPath, blockedPath } from '@/lib/exercises/mock';
import Link from 'next/link';

export default async function RunsPage() {
  const exerciseRequests = await getExerciseRequests();

  const total = exerciseRequests.length;
  const pending = exerciseRequests.filter((r) => r.status === 'pending_manual_start').length;
  const running = exerciseRequests.filter((r) => r.status === 'running' || r.status === 'assigned' || r.status === 'queued').length;
  const completed = exerciseRequests.filter((r) => r.status === 'completed').length;

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      {/* Page header */}
      <div className="flex-between">
        <div>
          <h1 className="page-title">Runs</h1>
          <p className="page-subtitle">Review, approve, and monitor all audit runs from a single view.</p>
        </div>
        <Link href="/launch" className="btn btn-primary">⚡ New Run</Link>
      </div>

      {/* Metric row */}
      <div className="grid-4">
        {[
          { label: 'Total Runs', value: total, color: '#6366f1', icon: '🎯' },
          { label: 'Pending Review', value: pending, color: '#f59e0b', icon: '⏳' },
          { label: 'In Progress', value: running, color: '#3b82f6', icon: '▶️' },
          { label: 'Completed', value: completed, color: '#10b981', icon: '✅' },
        ].map((m) => (
          <div key={m.label} className="metric-card" style={{ borderLeft: `4px solid ${m.color}` }}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Run cards */}
      {exerciseRequests.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16, marginBottom: 6 }}>No runs yet</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Launch an audit to create your first run.</div>
            <Link href="/launch" className="btn btn-primary">⚡ Launch Audit</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {exerciseRequests.map((run) => (
            <div
              key={run.id}
              className="card card-hover"
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                {/* Icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  🎯
                </div>

                {/* Main info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Link
                      href={`/runs/${run.id}`}
                      style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}
                    >
                      {run.target}
                    </Link>
                    <StatusPill tone={run.status} label={run.status.replaceAll('_', ' ')} />
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text)' }}>Type:</strong> {run.type}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text)' }}>Worker:</strong> {run.worker}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text)' }}>Requested:</strong> {run.requestedAt}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text)' }}>Consent:</strong> {run.consent}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <RunActions runId={run.id} status={run.status} />
                  <Link
                    href={`/runs/${run.id}`}
                    className="btn btn-secondary"
                    style={{ fontSize: 12 }}
                  >
                    View →
                  </Link>
                </div>
              </div>

              {/* Review summary */}
              {run.reviewSummary && (
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: '1px solid var(--border)',
                    fontSize: 13,
                    color: 'var(--muted)',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'start',
                  }}
                >
                  <span style={{ flexShrink: 0, color: 'var(--accent)' }}>Review:</span>
                  {run.reviewSummary}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
