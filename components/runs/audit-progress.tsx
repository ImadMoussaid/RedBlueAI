'use client';

import { useEffect, useState } from 'react';

const STAGES = [
  { key: 'pending_manual_start', label: 'Awaiting approval',     pct: 0  },
  { key: 'approved',             label: 'Approved',              pct: 5  },
  { key: 'queued',               label: 'Queued',                pct: 10 },
  { key: 'assigned',             label: 'Worker assigned',       pct: 15 },
  { key: 'waiting_for_trigger',  label: 'Waiting for trigger',   pct: 20 },
  { key: 'running',              label: 'Agents running',        pct: 25 },
  { key: 'reporting',            label: 'Generating report',     pct: 92 },
  { key: 'completed',            label: 'Completed',             pct: 100 },
  { key: 'failed',               label: 'Failed',                pct: 100 },
];

// Agent phases for the full-purple exercise — used to animate progress during "running"
const AGENT_PHASES = [
  'Safety check',
  'Recon',
  'Vulnerability analysis',
  'Red coordinator',
  'Initial access',
  'Monitoring',
  'Triage',
  'Red coordinator',
  'Privilege escalation',
  'Monitoring',
  'Incident response',
  'Red coordinator',
  'Lateral movement',
  'Triage',
  'Blue coordinator',
  'Red coordinator',
  'Persistence',
  'Monitoring',
  'Blue coordinator',
  'Threat hunting',
  'Forensics',
  'Detection engineering',
  'Recovery & hardening',
  'Purple coordinator',
  'Executive report',
];

export function AuditProgress({ runId, initialStatus }: { runId: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [agentIdx, setAgentIdx] = useState(0);
  const [animPct, setAnimPct] = useState(25);

  // Poll status every 6 seconds while running
  useEffect(() => {
    if (status === 'completed' || status === 'failed') return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/exercises/${runId}/trigger`);
        const data = await res.json();
        if (data.status && data.status !== status) {
          setStatus(data.status);
          if (data.status === 'completed' || data.status === 'failed') {
            window.location.reload();
          }
        }
      } catch {}
    }, 6000);

    return () => clearInterval(poll);
  }, [runId, status]);

  // Animate agent phases during "running"
  useEffect(() => {
    if (status !== 'running') return;

    const tick = setInterval(() => {
      setAgentIdx((i) => (i + 1) % AGENT_PHASES.length);
      setAnimPct((p) => Math.min(p + (67 / AGENT_PHASES.length), 91));
    }, 8000); // ~8s per agent phase on average with qwen3:14b

    return () => clearInterval(tick);
  }, [status]);

  const stage = STAGES.find((s) => s.key === status) ?? STAGES[0];
  const pct = status === 'running' ? animPct : stage.pct;
  const isRunning = status === 'running';
  const isComplete = status === 'completed';
  const isFailed = status === 'failed';

  const barColor = isFailed ? '#dc2626' : isComplete ? '#10b981' : '#6366f1';

  if (status === 'pending_manual_start' || status === 'approved' || status === 'queued' || status === 'waiting_for_trigger') {
    return null; // Don't show progress bar until audit is actually running
  }

  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
            {isComplete ? '✅ Audit complete' : isFailed ? '❌ Audit failed' : '⚡ Audit in progress'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
            {isRunning
              ? `Running: ${AGENT_PHASES[agentIdx]}`
              : stage.label}
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: barColor }}>
          {Math.round(pct)}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 8, background: 'var(--panel-alt)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: barColor,
          borderRadius: 999,
          transition: isRunning ? 'width 6s ease' : 'width 0.4s ease',
        }} />
      </div>

      {/* Stage pills */}
      <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
        {['assigned', 'running', 'reporting', 'completed'].map((s) => {
          const stageIdx = STAGES.findIndex((x) => x.key === s);
          const currentIdx = STAGES.findIndex((x) => x.key === status);
          const done = currentIdx > stageIdx;
          const active = s === status;
          return (
            <div key={s} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 11, fontWeight: 600,
              background: done || active ? (isFailed && active ? '#fef2f2' : active ? 'var(--accent-light)' : '#ecfdf5') : 'var(--panel-alt)',
              color: done ? '#059669' : active ? (isFailed ? '#dc2626' : 'var(--accent)') : 'var(--muted)',
              border: `1px solid ${done ? '#a7f3d0' : active ? 'var(--accent)' : 'var(--border)'}`,
            }}>
              {done ? '✓' : active ? '●' : '○'}
              {s.replace('_', ' ')}
            </div>
          );
        })}
      </div>

      {isRunning && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>
          Progress is approximate — each agent phase takes 1–3 minutes with qwen3:14b. Page will refresh automatically when complete.
        </div>
      )}
    </div>
  );
}
