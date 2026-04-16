export const dynamic = 'force-dynamic';

import { FindingCard } from '@/components/findings/finding-card';
import { StatusPill } from '@/components/findings/status-pill';
import { StartAuditButton } from '@/components/runs/start-audit-button';
import { AuditProgress } from '@/components/runs/audit-progress';
import { getExerciseRunDetail } from '@/lib/exercises/repository';
import { getRunSummaries } from '@/lib/findings/repository';
import { findings, runDetails as findingRunDetails, runs as mockRuns } from '@/lib/findings/mock';
import { exerciseRunDetails as mockRunDetails } from '@/lib/exercises/mock';
import Link from 'next/link';

export default async function RunDetailPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const [runs, realDetail] = await Promise.all([getRunSummaries(), getExerciseRunDetail(runId)]);
  const run = runs.find((item) => item.id === runId) ?? mockRuns.find((item) => item.id === runId) ?? mockRuns[0];
  const detail = realDetail ?? mockRunDetails[run.id] ?? mockRunDetails['run-acme-001'];
  const findingDetail = findingRunDetails[run.id] ?? { detectionsTriggered: 0, detectionsMissed: 0, topFixes: [], remediationPlan: [] };
  const isCompleted = run.status === 'completed' || run.status === 'reporting';
  const runFindings = (realDetail?.findings && realDetail.findings.length > 0)
    ? realDetail.findings
    : isCompleted ? (findingDetail?.findings ?? []) : [];

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
          <Link href="/runs" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Runs</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{run.target}</span>
        </div>
        {isCompleted && (
          <Link href={`/runs/${runId}/report`} className="btn btn-primary" style={{ fontSize: 13 }}>
            ⬇ Download Report
          </Link>
        )}
      </div>

      {/* Hero section */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>{run.target}</h1>
              <StatusPill tone={run.status} label={run.status.replaceAll('_', ' ')} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
              {[
                { label: 'Type', value: run.type },
                { label: 'Worker', value: run.worker },
                { label: 'Consent', value: run.consent },
                { label: 'Requested', value: run.requestedAt },
              ].map((meta) => (
                <div key={meta.label}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
                    {meta.label}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2 }}>{meta.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 360 }}>
            {realDetail?.executiveSummary ?? detail.summary}
          </div>
        </div>
      </div>

      {/* Start audit CTA */}
      {run.status === 'waiting_for_trigger' && (
        <div
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 'var(--radius)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>Ready to execute</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
              Consent and scope are locked. Start the audit run on the assigned worker.
            </div>
          </div>
          <StartAuditButton runId={run.id} />
        </div>
      )}

      {/* Progress bar */}
      <AuditProgress runId={runId} initialStatus={run.status} />

      {/* Stats row */}
      <div className="grid-3">
        <div className="metric-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="metric-label">Findings</div>
          <div className="metric-value">{runFindings.length}</div>
          <div className="metric-desc">
            {isCompleted
              ? `${runFindings.filter((f: Record<string, unknown>) => f.detectionStatus === 'triggered').length} triggered · ${runFindings.filter((f: Record<string, unknown>) => f.detectionStatus === 'missed').length} missed`
              : 'audit not yet complete'}
          </div>
        </div>
        <div className="metric-card" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div className="metric-label">Phase</div>
          <div className="metric-value" style={{ fontSize: '1.1rem', paddingTop: 6 }}>{detail.reportStatus}</div>
        </div>
        <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div className="metric-label">Worker</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>{run.worker}</div>
          <div className="metric-desc">{run.guardrails}</div>
        </div>
      </div>

      {/* Findings grid */}
      <div>
        <div className="flex-between" style={{ marginBottom: 14 }}>
          <div className="section-title">Findings</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{runFindings.length} total</div>
        </div>
        {runFindings.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
              <div style={{ fontWeight: 600 }}>No findings</div>
            </div>
          </div>
        ) : (
          <div className="grid-2">
            {runFindings.map((finding, i) => (
              <FindingCard key={i} finding={finding} href={`/runs/${runId}/findings/${i}`} />
            ))}
          </div>
        )}
      </div>

      {/* Top fixes */}
      {findingDetail.topFixes.length > 0 && (
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>Top Fixes</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {findingDetail.topFixes.map((fix, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--success-light)',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text)', paddingTop: 3 }}>{fix}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval trail */}
      <div className="card" style={{ padding: 24 }}>
        <div className="section-title" style={{ marginBottom: 18 }}>Approval Trail</div>
        <div style={{ display: 'grid', gap: 0 }}>
          {detail.approvalTrail.map((step, i) => (
            <div key={step.title} style={{ display: 'flex', gap: 16, paddingBottom: i < detail.approvalTrail.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent-light)',
                    border: '2px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                {i < detail.approvalTrail.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 20 }} />
                )}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{step.title}</span>
                  <StatusPill tone={step.tone} label={step.tone.replaceAll('_', ' ')} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                  {step.actor} · {step.at}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{step.note}</div>
              </div>
            </div>
          ))}
        </div>

        {detail.blockedReasons.length > 0 && (
          <div
            style={{
              marginTop: 20,
              padding: '14px 16px',
              background: 'var(--danger-light)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #fecaca',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--danger)', marginBottom: 8 }}>Block Reasons</div>
            <ul style={{ paddingLeft: 18, display: 'grid', gap: 6 }}>
              {detail.blockedReasons.map((reason) => (
                <li key={reason} style={{ fontSize: 13, color: 'var(--danger)' }}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Next steps + Remediation */}
      <div className="grid-2">
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>Next Steps</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {detail.nextSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 6, flexShrink: 0 }} />
                <div style={{ fontSize: 14, color: 'var(--text)' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>Remediation Plan</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {findingDetail.remediationPlan.map((item) => (
              <div
                key={item.owner + item.action}
                style={{
                  padding: '12px 16px',
                  background: 'var(--panel)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{item.owner}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{item.action}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  <strong style={{ color: 'var(--text)' }}>Window:</strong> {item.window}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
