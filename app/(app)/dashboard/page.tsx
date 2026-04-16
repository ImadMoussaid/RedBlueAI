export const dynamic = 'force-dynamic';

import { StatusPill } from '@/components/findings/status-pill';
import { getDashboardStats, getRunSummaries } from '@/lib/findings/repository';
import Link from 'next/link';

export default async function DashboardPage() {
  const [dashboardStats, runs] = await Promise.all([getDashboardStats(), getRunSummaries()]);
  const recentRuns = runs.slice(0, 5);

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      {/* Page header */}
      <div className="flex-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Operations overview for your AI security audit platform.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/launch" className="btn btn-primary">⚡ New Audit</Link>
          <Link href="/runs" className="btn btn-secondary">View All Runs →</Link>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid-4">
        {dashboardStats.map((stat) => (
          <div key={stat.title} className="metric-card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <div className="metric-label">{stat.title}</div>
            <div className="metric-value">{stat.value}</div>
            <div className="metric-desc">{stat.body}</div>
          </div>
        ))}
      </div>

      {/* Recent runs */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="flex-between" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div className="section-title">Recent Runs</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Latest 5 audit runs</div>
          </div>
          <Link href="/runs" className="btn btn-secondary" style={{ fontSize: 12 }}>View all →</Link>
        </div>

        {recentRuns.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
            <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>No runs yet</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Launch your first audit to see runs here.</div>
          </div>
        ) : (
          <div style={{ display: 'grid' }}>
            {recentRuns.map((run, i) => (
              <Link
                key={run.id}
                href={`/runs/${run.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: i < recentRuns.length - 1 ? '1px solid var(--border)' : 'none',
                  textDecoration: 'none',
                  transition: 'background 0.1s',
                  gap: 12,
                }}
                className="dashboard-run-row"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    🎯
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {run.target}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {run.type} · {run.requestedAt}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <StatusPill tone={run.status} label={run.status.replaceAll('_', ' ')} />
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid-2">
        <div className="card" style={{ padding: 24 }}>
          <div className="kicker" style={{ marginBottom: 10 }}>Quick actions</div>
          <div style={{ display: 'grid', gap: 10 }}>
            <Link href="/launch" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              ⚡ Launch New Audit
            </Link>
            <Link href="/apps/new" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
              📱 Register an App
            </Link>
            <Link href="/consent" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
              🤝 Manage Consent
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div className="kicker" style={{ marginBottom: 10 }}>Operator focus</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { title: 'Secure session cookie handling', desc: 'Enable HTTPS-only cookie transport and remove insecure defaults.' },
              { title: 'Add throttling to auth routes', desc: 'Reduce brute-force and abuse risk on reset and login flows.' },
              { title: 'Trim admin API responses', desc: 'Expose only the metadata the UI needs to complete the exercise review.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
