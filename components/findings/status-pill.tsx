import type { FindingSeverity, RunPhaseStatus, RunStatus } from '@/lib/findings/mock';
import type { WorkerStatus } from '@/lib/workers/types';

type FindingStatus = 'open' | 'fixed' | 'accepted';

type PillTone = FindingSeverity | FindingStatus | RunPhaseStatus | RunStatus | WorkerStatus | 'healthy' | 'busy' | 'degraded' | 'idle' | 'neutral';

const toneStyles: Record<PillTone, { background: string; color: string; border: string }> = {
  Critical: { background: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  High: { background: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  Medium: { background: '#fffbeb', color: '#b45309', border: '#fde68a' },
  Low: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  open: { background: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  fixed: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  accepted: { background: '#ede9fe', color: '#6d28d9', border: '#c4b5fd' },
  complete: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  current: { background: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  pending: { background: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  pending_manual_start: { background: '#fffbeb', color: '#b45309', border: '#fde68a' },
  approved: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  queued: { background: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  assigned: { background: '#faf5ff', color: '#7c3aed', border: '#e9d5ff' },
  waiting_for_trigger: { background: '#fffbeb', color: '#b45309', border: '#fde68a' },
  running: { background: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  reporting: { background: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
  completed: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  failed: { background: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  blocked: { background: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  healthy: { background: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  busy: { background: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  degraded: { background: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  idle: { background: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  neutral: { background: '#f8fafc', color: '#475569', border: '#e2e8f0' },
};

export function StatusPill({ tone, label }: { tone: string; label: string }) {
  const styles = toneStyles[tone as PillTone]
    ?? toneStyles[(tone?.charAt(0).toUpperCase() + tone?.slice(1).toLowerCase()) as PillTone]
    ?? toneStyles.neutral;

  return (
    <span
      className="badge"
      style={{
        background: styles.background,
        color: styles.color,
        border: `1px solid ${styles.border}`,
      }}
    >
      {label}
    </span>
  );
}
