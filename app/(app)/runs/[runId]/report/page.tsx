export const dynamic = 'force-dynamic';

import { getExerciseRunDetail } from '@/lib/exercises/repository';
import { getRunSummaries } from '@/lib/findings/repository';
import { findings as mockFindings, runs as mockRuns } from '@/lib/findings/mock';
import { exerciseRunDetails as mockRunDetails } from '@/lib/exercises/mock';
import Link from 'next/link';
import { PrintButton } from './print-button';

export default async function ReportPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;

  const [runs, realDetail] = await Promise.all([getRunSummaries(), getExerciseRunDetail(runId)]);
  const run = runs.find((r) => r.id === runId) ?? mockRuns[0];
  const detail = realDetail ?? mockRunDetails[run?.id] ?? mockRunDetails['run-acme-001'];

  const allFindings: Record<string, unknown>[] =
    realDetail?.findings && realDetail.findings.length > 0
      ? (realDetail.findings as Record<string, unknown>[])
      : (detail?.findings ?? mockFindings) as Record<string, unknown>[];

  const triggered = allFindings.filter((f) => f.detectionStatus === 'triggered');
  const missed = allFindings.filter((f) => f.detectionStatus === 'missed');
  const critical = allFindings.filter((f) => f.severity === 'Critical');
  const high = allFindings.filter((f) => f.severity === 'High');
  const medium = allFindings.filter((f) => f.severity === 'Medium');
  const low = allFindings.filter((f) => f.severity === 'Low');

  const detectionRate = allFindings.length > 0
    ? Math.round((triggered.length / allFindings.length) * 100)
    : 0;

  const generatedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Brussels',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const severityColors: Record<string, string> = {
    Critical: '#dc2626',
    High: '#f97316',
    Medium: '#f59e0b',
    Low: '#10b981',
    Info: '#0ea5e9',
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .report-page { padding: 0 !important; max-width: 100% !important; }
          .page-break { page-break-before: always; }
          .card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
        }
        @page {
          margin: 20mm 15mm;
          size: A4;
        }
      `}</style>

      {/* Toolbar — no-print */}
      <div className="no-print" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href={`/runs/${runId}`} className="btn btn-secondary" style={{ fontSize: 13 }}>← Back to Run</Link>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>Security Audit Report — {run.target}</span>
        </div>
        <PrintButton />
      </div>

      <div className="report-page" style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 64 }}>

        {/* ── Cover ─────────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
          borderRadius: 16, padding: '56px 56px 48px', marginBottom: 32, color: 'white',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                RedBlueAI · Confidential
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                Security Audit Report
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '8px 16px', fontSize: 12, color: 'rgba(255,255,255,0.7)',
            }}>
              {run.status.toUpperCase().replaceAll('_', ' ')}
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 8 }}>{run.target}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              {run.type} · Worker: {run.worker}
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { label: 'Total Findings', value: allFindings.length, color: '#a5b4fc' },
              { label: 'Critical / High', value: `${critical.length} / ${high.length}`, color: '#fca5a5' },
              { label: 'Detection Rate', value: `${detectionRate}%`, color: '#6ee7b7' },
              { label: 'Missed', value: missed.length, color: '#fcd34d' },
            ].map((kpi) => (
              <div key={kpi.label} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '16px 20px',
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            <span>Requested: {run.requestedAt}</span>
            <span>Generated: {generatedAt}</span>
          </div>
        </div>

        {/* ── Executive Summary ─────────────────────────────────────────────── */}
        {(realDetail?.executiveSummary || detail?.summary) && (
          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 24, background: '#6366f1', borderRadius: 2 }} />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: 0 }}>Executive Summary</h2>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--text)', margin: 0 }}>
              {realDetail?.executiveSummary ?? detail?.summary}
            </p>
          </div>
        )}

        {/* ── Severity breakdown ────────────────────────────────────────────── */}
        <div className="card" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 4, height: 24, background: '#6366f1', borderRadius: 2 }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: 0 }}>Risk Summary</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
            {[
              { label: 'Critical', count: critical.length, color: '#dc2626', bg: '#fef2f2' },
              { label: 'High', count: high.length, color: '#f97316', bg: '#fff7ed' },
              { label: 'Medium', count: medium.length, color: '#f59e0b', bg: '#fffbeb' },
              { label: 'Low', count: low.length, color: '#10b981', bg: '#ecfdf5' },
              { label: 'Info', count: allFindings.filter(f => f.severity === 'Info').length, color: '#0ea5e9', bg: '#f0f9ff' },
            ].map((s) => (
              <div key={s.label} style={{
                background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 10,
                padding: '16px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.count}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Detection bar */}
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
            <span>Detection effectiveness</span>
            <span>{triggered.length} of {allFindings.length} detected ({detectionRate}%)</span>
          </div>
          <div style={{ height: 12, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ height: '100%', width: `${detectionRate}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: 999 }} />
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--muted)' }}>
            <span>✓ {triggered.length} triggered</span>
            <span>✗ {missed.length} missed</span>
            <span>— {allFindings.length - triggered.length - missed.length} unclassified</span>
          </div>
        </div>

        {/* ── Findings ──────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 24, background: '#6366f1', borderRadius: 2 }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: 0 }}>
              Findings ({allFindings.length})
            </h2>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {allFindings.map((f, i) => {
              const severity = (f.severity as string) ?? 'Info';
              const barColor = severityColors[severity] ?? '#6366f1';
              const detStatus = f.detectionStatus as string | undefined;

              return (
                <div key={i} className="card page-break" style={{
                  padding: 0, overflow: 'hidden',
                  borderLeft: `5px solid ${barColor}`,
                }}>
                  {/* Finding header */}
                  <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>#{i + 1}</span>
                          {f.agentRole && (
                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6366f1', background: '#eef2ff', padding: '2px 8px', borderRadius: 999 }}>
                              {String(f.agentRole)}
                            </span>
                          )}
                          {f.attackChainPosition && (
                            <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--panel-alt)', padding: '2px 8px', borderRadius: 999, border: '1px solid var(--border)' }}>
                              {String(f.attackChainPosition)}
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0, marginBottom: 8 }}>
                          {String(f.title ?? 'Untitled finding')}
                        </h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{
                            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                            background: `${barColor}20`, color: barColor, border: `1px solid ${barColor}40`,
                          }}>{severity}</span>
                          {detStatus && (
                            <span style={{
                              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                              background: detStatus === 'triggered' ? '#ecfdf5' : '#fef2f2',
                              color: detStatus === 'triggered' ? '#059669' : '#dc2626',
                              border: `1px solid ${detStatus === 'triggered' ? '#a7f3d0' : '#fecaca'}`,
                            }}>{detStatus}</span>
                          )}
                          {f.owasp && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--panel-alt)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{String(f.owasp)}</span>}
                          {f.cwe && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--panel-alt)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{String(f.cwe)}</span>}
                          {f.effortToFix && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--panel-alt)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{String(f.effortToFix)} effort</span>}
                        </div>
                      </div>
                      {f.remediationOwner && (
                        <div style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--panel-alt)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                          Owner: <strong style={{ color: 'var(--text)' }}>{String(f.remediationOwner)}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Finding body */}
                  <div style={{ padding: '16px 24px', display: 'grid', gap: 16 }}>
                    {/* Summary + Business Impact */}
                    {(f.summary || f.businessImpact) && (
                      <div style={{ display: 'grid', gridTemplateColumns: f.summary && f.businessImpact ? '1fr 1fr' : '1fr', gap: 16 }}>
                        {f.summary && (
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Summary</div>
                            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{String(f.summary)}</p>
                          </div>
                        )}
                        {f.businessImpact && (
                          <div style={{ padding: 14, background: '#fff7ed', borderRadius: 8, border: '1px solid #fed7aa' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c2410c', marginBottom: 6 }}>Business Impact</div>
                            <p style={{ fontSize: 13, color: '#92400e', lineHeight: 1.7, margin: 0 }}>{String(f.businessImpact)}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Evidence */}
                    {f.evidence && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 8 }}>Technical Evidence</div>
                        <div style={{
                          background: '#0f172a', color: '#e2e8f0', borderRadius: 8,
                          padding: '14px 18px', fontFamily: 'monospace', fontSize: 12,
                          lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        }}>
                          {String(f.evidence)}
                        </div>
                      </div>
                    )}

                    {/* Steps to Reproduce */}
                    {Array.isArray(f.stepsToReproduce) && (f.stepsToReproduce as string[]).length > 0 && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 10 }}>Steps to Reproduce</div>
                        <div style={{ display: 'grid', gap: 8 }}>
                          {(f.stepsToReproduce as string[]).map((step, si) => (
                            <div key={si} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                              <div style={{
                                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                                background: `${barColor}15`, color: barColor, border: `1px solid ${barColor}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 11, fontWeight: 800,
                              }}>{si + 1}</div>
                              <div style={{ fontSize: 12, color: 'var(--text)', paddingTop: 3, lineHeight: 1.6, fontFamily: 'monospace' }}>{step}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Remediation + Detection */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {f.action && (
                        <div style={{ padding: 14, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#15803d', marginBottom: 6 }}>Required Action</div>
                          <p style={{ fontSize: 13, color: '#14532d', lineHeight: 1.6, margin: 0 }}>{String(f.action)}</p>
                        </div>
                      )}
                      {f.detectionRule && (
                        <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid var(--border)' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Detection Rule</div>
                          <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, margin: 0, fontFamily: 'monospace' }}>{String(f.detectionRule)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Approval Trail ────────────────────────────────────────────────── */}
        {detail?.approvalTrail && detail.approvalTrail.length > 0 && (
          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: '#6366f1', borderRadius: 2 }} />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: 0 }}>Approval Trail</h2>
            </div>
            <div style={{ display: 'grid', gap: 0 }}>
              {detail.approvalTrail.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', gap: 16, paddingBottom: i < detail.approvalTrail.length - 1 ? 20 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: '#eef2ff', border: '2px solid #6366f1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: '#6366f1', flexShrink: 0,
                    }}>{i + 1}</div>
                    {i < detail.approvalTrail.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 16 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{step.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>{step.actor} · {step.at}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>{step.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div style={{
          borderTop: '2px solid var(--border)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: 'var(--muted)',
        }}>
          <div>
            <strong style={{ color: 'var(--text)' }}>RedBlueAI</strong> · Confidential security audit report
          </div>
          <div>Generated {generatedAt}</div>
        </div>

      </div>
    </>
  );
}
