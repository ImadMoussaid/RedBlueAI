import { prisma } from '@/lib/prisma';
import type { RunSummary, RunStatus } from './mock';

export async function getRunSummaries(): Promise<RunSummary[]> {
  const exercises = await prisma.exercise.findMany({
    include: { app: true },
    orderBy: { requestedAt: 'desc' }
  });

  return exercises.map((ex) => ({
    id: ex.id,
    target: ex.app.name,
    type: ex.type,
    status: ex.status as RunStatus,
    consent: 'Captured' as const,
    guardrails: extractGuardrailSummary(ex.guardrailsSnapshot),
    requestedAt: ex.requestedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    worker: ex.assignedWorkerId ?? 'Not assigned',
    actionableFixes: (() => {
      const storedFindings = (ex.findings as Array<{ severity: string }> | null) ?? [];
      return storedFindings.length;
    })(),
    detectionsMissed: (() => {
      const storedFindings = (ex.findings as Array<{ detectionStatus?: string }> | null) ?? [];
      return storedFindings.filter((f) => f.detectionStatus === 'missed').length;
    })()
  }));
}

export async function getDashboardStats() {
  const [pending, workers, exercises] = await Promise.all([
    prisma.exercise.count({ where: { status: 'pending_manual_start' } }),
    prisma.worker.count({ where: { status: 'healthy' } }),
    prisma.exercise.count({ where: { status: 'completed' } })
  ]);

  return [
    { title: 'Pending approvals', value: String(pending).padStart(2, '0'), body: 'Runs waiting for founder review before queueing.' },
    { title: 'Active workers', value: String(workers).padStart(2, '0'), body: 'Hosts ready to claim approved jobs.' },
    { title: 'Completed runs', value: String(exercises).padStart(2, '0'), body: 'Exercises completed with findings and reports.' }
  ];
}

function extractGuardrailSummary(snapshot: unknown): string {
  if (!snapshot || typeof snapshot !== 'object') return 'No guardrails set';
  const g = snapshot as Record<string, unknown>;
  const parts: string[] = [];
  if (g.readOnlyMode) parts.push('Read-only');
  if (g.rateLimitPerMinute) parts.push(`${g.rateLimitPerMinute} req/min`);
  if (g.allowedHours) parts.push(String(g.allowedHours));
  return parts.length ? parts.join(', ') : 'Guardrails configured';
}
