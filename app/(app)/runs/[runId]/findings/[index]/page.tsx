export const dynamic = 'force-dynamic';

import { StatusPill } from '@/components/findings/status-pill';
import { getExerciseRunDetail } from '@/lib/exercises/repository';
import { getRunSummaries } from '@/lib/findings/repository';
import { findings as mockFindings, runs as mockRuns } from '@/lib/findings/mock';
import { exerciseRunDetails as mockRunDetails } from '@/lib/exercises/mock';
import Link from 'next/link';

export default async function FindingDetailPage({
  params,
}: {
  params: Promise<{ runId: string; index: string }>;
}) {
  const { runId, index } = await params;
  const idx = parseInt(index, 10);

  const [runs, realDetail] = await Promise.all([getRunSummaries(), getExerciseRunDetail(runId)]);
  const run = runs.find((r) => r.id === runId) ?? mockRuns[0];
  const detail = realDetail ?? mockRunDetails[run?.id] ?? mockRunDetails['run-acme-001'];

  const allFindings =
    realDetail?.findings && realDetail.findings.length > 0
      ? realDetail.findings
      : detail?.findings ?? mockFindings;

  const f = allFindings[idx] as Record<string, unknown> | undefined;

  if (!f) {
    return (
      <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>
        Finding not found.{' '}
        <Link href={`/runs/${runId}`} style={{ color: 'var(--accent)' }}>Back to run</Link>
      </div>
    );
  }

  const severity = (f.severity as string) ?? 'Info';
  const severityColors: Record<string, { bg: string; color: string; border: string; bar: string }> = {
    Critical: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', bar: '#dc2626' },
    High:     { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa', bar: '#f97316' },
    Medium:   { bg: '#fffbeb', color: '#b45309', border: '#fde68a', bar: '#f59e0b' },
    Low:      { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0', bar: '#10b981' },
    Info:     { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd', bar: '#0ea5e9' },
  };
  const sc = severityColors[severity] ?? severityColors.Info;

  const detectionStatus = (f.detectionStatus as string) ?? '';
  const detectionColor = detectionStatus === 'triggered' ? '#059669' : detectionStatus === 'missed' ? '#dc2626' : '#b45309';
  const detectionBg = detectionStatus === 'triggered' ? '#ecfdf5' : detectionStatus === 'missed' ? '#fef2f2' : '#fffbeb';

  const stepsToReproduce = Array.isArray(f.stepsToReproduce) ? f.stepsToReproduce as string[] : [];
  const references = Array.isArray(f.references) ? f.references as string[] : [];
  const effortToFix = (f.effortToFix as string) ?? null;
  const effortColors: Record<string, string> = { low: '#059669', medium: '#b45309', high: '#dc2626' };

  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 960 }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
        <Link href="/runs" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Runs</Link>
        <span>/</span>
        <Link href={`/runs/${runId}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{run?.target ?? runId}</Link>
        <span>/</span>
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>Finding #{idx + 1}</span>
      </div>

      {/* Hero */}
      <div className="card" style={{ padding: 28, borderLeft: `5px solid ${sc.bar}` }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              {f.agentRole && <div className="kicker">{String(f.agentRole)}</div>}
              {f.attackChainPosition && (
                <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--panel-alt)', padding: '2px 8px', borderRadius: 999, border: '1px solid var(--border)' }}>
                  {String(f.attackChainPosition)}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>
              {String(f.title ?? 'Untitled finding')}
            </h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <StatusPill tone={severity} label={severity} />
              {detectionStatus && (
                <span className="badge" style={{ background: detectionBg, color: detectionColor, border: `1px solid ${sc.border}` }}>
                  {detectionStatus}
                </span>
              )}
              {effortToFix && (
                <span className="badge" style={{ background: 'var(--panel-alt)', color: effortColors[effortToFix] ?? 'var(--muted)', border: '1px solid var(--border)' }}>
                  {effortToFix} effort
                </span>
              )}
              {f.owasp && <StatusPill tone="neutral" label={String(f.owasp)} />}
              {f.cwe && <StatusPill tone="neutral" label={String(f.cwe)} />}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {idx > 0 && <Link href={`/runs/${runId}/findings/${idx - 1}`} className="btn btn-secondary">← Prev</Link>}
            {idx < allFindings.length - 1 && <Link href={`/runs/${runId}/findings/${idx + 1}`} className="btn btn-secondary">Next →</Link>}
            <Link href={`/runs/${runId}`} className="btn btn-secondary">↩ Run</Link>
          </div>
        </div>
      </div>

      {/* Summary + Business Impact */}
      <div className="grid-2">
        <div className="card" style={{ padding: 24 }}>
          <div className="label" style={{ marginBottom: 10 }}>Summary</div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{String(f.summary ?? '—')}</p>
        </div>
        <div className="card" style={{ padding: 24, borderLeft: `4px solid ${sc.bar}` }}>
          <div className="label" style={{ marginBottom: 10 }}>Business impact</div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>
            {String(f.businessImpact ?? 'Impact not assessed.')}
          </p>
        </div>
      </div>

      {/* Detection + Blue Response */}
      <div className="grid-2">
        <div className="card" style={{ padding: 24 }}>
          <div className="label" style={{ marginBottom: 10 }}>Detection status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: detectionColor, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: detectionColor, textTransform: 'capitalize' }}>
              {detectionStatus || 'Unknown'}
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            {detectionStatus === 'triggered'
              ? 'Blue team detected this action. Controls are working for this vector.'
              : detectionStatus === 'missed'
              ? 'Blue team did not detect this. Monitoring gap confirmed — detection rules should be added.'
              : 'Under review — detection effectiveness unclear.'}
          </p>
          {f.detectionRule && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: 12, color: 'var(--text)' }}>
              <div className="label" style={{ marginBottom: 6, fontFamily: 'inherit' }}>Suggested detection rule</div>
              {String(f.detectionRule)}
            </div>
          )}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="label" style={{ marginBottom: 10 }}>Blue team response</div>
          {f.blueTeamResponse ? (
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{String(f.blueTeamResponse)}</p>
          ) : (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#dc2626' }}>
              No blue team response recorded — this action went undetected.
            </div>
          )}
        </div>
      </div>

      {/* Evidence */}
      <div className="card" style={{ padding: 24 }}>
        <div className="label" style={{ marginBottom: 14 }}>Technical evidence</div>
        <div style={{
          background: '#0f172a', color: '#e2e8f0',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 20px',
          fontFamily: 'monospace', fontSize: 13,
          lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {String(f.evidence ?? 'No evidence captured.')}
        </div>
      </div>

      {/* Steps to Reproduce */}
      {stepsToReproduce.length > 0 && (
        <div className="card" style={{ padding: 24 }}>
          <div className="label" style={{ marginBottom: 16 }}>Steps to reproduce</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {stepsToReproduce.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: 'var(--text)', paddingTop: 4, lineHeight: 1.6, fontFamily: 'monospace' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remediation */}
      <div className="card" style={{ padding: 24 }}>
        <div className="label" style={{ marginBottom: 16 }}>Remediation</div>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--accent-light)', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>🛠</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>Required action</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{String(f.action ?? '—')}</p>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div className="grid-3">
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Owner</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                👤 {String(f.remediationOwner ?? 'Unassigned')}
              </div>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Effort</div>
              {effortToFix ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--panel-alt)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, color: effortColors[effortToFix] ?? 'var(--muted)', border: '1px solid var(--border)' }}>
                  {effortToFix === 'low' ? '🟢' : effortToFix === 'medium' ? '🟡' : '🔴'} {effortToFix} effort
                </div>
              ) : <span style={{ color: 'var(--muted)', fontSize: 13 }}>—</span>}
            </div>
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Severity</div>
              <StatusPill tone={severity} label={severity} />
            </div>
          </div>
        </div>
      </div>

      {/* Classification */}
      <div className="card" style={{ padding: 24 }}>
        <div className="label" style={{ marginBottom: 16 }}>Classification</div>
        <div className="grid-3">
          {[
            { label: 'OWASP Category', value: f.owasp, icon: '🔐', href: f.owasp ? `https://owasp.org/Top10/` : undefined, hint: 'owasp.org →' },
            { label: 'CWE Reference', value: f.cwe, icon: '📋', href: f.cwe ? `https://cwe.mitre.org/data/definitions/${String(f.cwe).replace('CWE-', '')}.html` : undefined, hint: 'mitre.org →' },
            { label: 'Kill chain position', value: f.attackChainPosition, icon: '⛓', href: undefined, hint: null },
          ].map((item) => item.value ? (
            <a key={item.label} href={item.href ?? '#'} target={item.href ? '_blank' : undefined} rel={item.href ? 'noopener noreferrer' : undefined}
              style={{ display: 'block', padding: 16, background: 'var(--panel)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'box-shadow 0.15s, transform 0.15s' }}
              className="card-hover">
              <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
              <div className="label" style={{ marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{String(item.value)}</div>
              {item.hint && <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{item.hint}</div>}
            </a>
          ) : null)}
        </div>
      </div>

      {/* References */}
      {references.length > 0 && (
        <div className="card" style={{ padding: 24 }}>
          <div className="label" style={{ marginBottom: 14 }}>References</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {references.map((ref, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>→</span>
                {ref.startsWith('http') ? (
                  <a href={ref} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>{ref}</a>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'monospace' }}>{ref}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 24 }}>
        {idx > 0 ? (
          <Link href={`/runs/${runId}/findings/${idx - 1}`} className="btn btn-secondary">← Previous finding</Link>
        ) : <span />}
        {idx < allFindings.length - 1 ? (
          <Link href={`/runs/${runId}/findings/${idx + 1}`} className="btn btn-secondary">Next finding →</Link>
        ) : <span />}
      </div>

    </div>
  );
}
