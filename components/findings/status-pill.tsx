import type { FindingSeverity, RunPhaseStatus, RunStatus } from '@/lib/findings/mock';
import type { WorkerStatus } from '@/lib/workers/types';

type FindingStatus = 'open' | 'fixed' | 'accepted';

type PillTone = FindingSeverity | FindingStatus | RunPhaseStatus | RunStatus | WorkerStatus | 'healthy' | 'busy' | 'degraded' | 'idle' | 'neutral';

const toneStyles: Record<PillTone, { background: string; color: string; border: string }> = {
  Critical: { background: '#fdecec', color: '#9a1f1f', border: '#f2c3c3' },
  High: { background: '#fff1e8', color: '#9b4c12', border: '#f3d0b8' },
  Medium: { background: '#fff9e8', color: '#8a6a00', border: '#f1e0a8' },
  Low: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  open: { background: '#f6f8fc', color: '#4d5d7d', border: '#d8e0ec' },
  fixed: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  accepted: { background: '#eef3fb', color: '#35558f', border: '#cad7eb' },
  complete: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  current: { background: '#e8f2ff', color: '#2557a7', border: '#c8d9f2' },
  pending: { background: '#f6f8fc', color: '#4d5d7d', border: '#d8e0ec' },
  pending_manual_start: { background: '#f6f8fc', color: '#4d5d7d', border: '#d8e0ec' },
  approved: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  queued: { background: '#eef3fb', color: '#35558f', border: '#cad7eb' },
  assigned: { background: '#f7eefd', color: '#7b3ca6', border: '#e0c9ef' },
  running: { background: '#e8f2ff', color: '#2557a7', border: '#c8d9f2' },
  reporting: { background: '#f0efff', color: '#5146b7', border: '#d6d2f5' },
  completed: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  failed: { background: '#fdecec', color: '#9a1f1f', border: '#f2c3c3' },
  blocked: { background: '#f6f8fc', color: '#7f4d1d', border: '#e5d4c0' },
  healthy: { background: '#eef7ee', color: '#1d7f5f', border: '#cde3d4' },
  busy: { background: '#eef3fb', color: '#35558f', border: '#cad7eb' },
  degraded: { background: '#fff1e8', color: '#9b4c12', border: '#f3d0b8' },
  idle: { background: '#f6f8fc', color: '#4d5d7d', border: '#d8e0ec' },
  neutral: { background: '#f6f8fc', color: '#4d5d7d', border: '#d8e0ec' }
};

export function StatusPill({ tone, label }: { tone: PillTone; label: string }) {
  const styles = toneStyles[tone];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '6px 10px',
        background: styles.background,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.02em',
        textTransform: 'capitalize'
      }}
    >
      {label}
    </span>
  );
}
