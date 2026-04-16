import { prisma } from '@/lib/prisma';
import type { WorkerFleetNode, WorkerHeartbeatEvent, WorkerQueueAssignment } from './types';

export async function getWorkerFleet(): Promise<WorkerFleetNode[]> {
  const workers = await prisma.worker.findMany({ orderBy: { createdAt: 'asc' } });

  return workers.map((w) => ({
    id: w.id,
    hostLabel: w.hostLabel,
    region: 'founder host',
    status: w.status as WorkerFleetNode['status'],
    model: 'qwen3:14b',
    load: '0%',
    currentJob: w.currentJobId ?? 'Unassigned',
    lastHeartbeat: w.lastHeartbeatAt
      ? `${Math.round((Date.now() - w.lastHeartbeatAt.getTime()) / 60000)} min ago`
      : 'Never',
    capabilities: ['authenticated web', 'api replay', 'report generation']
  }));
}

export async function getQueueAssignments(): Promise<WorkerQueueAssignment[]> {
  const exercises = await prisma.exercise.findMany({
    where: { assignedWorkerId: { not: null } },
    include: { app: true },
    orderBy: { requestedAt: 'desc' }
  });

  return exercises.map((ex) => ({
    runId: ex.id,
    target: ex.app.name,
    status: ex.status as WorkerQueueAssignment['status'],
    assignedWorker: ex.assignedWorkerId ?? 'Unassigned',
    phase: getPhaseLabel(ex.status),
    artifactState: ex.reportPath ? 'Report available' : 'No artifacts yet',
    note: getStatusNote(ex.status)
  }));
}

export async function getHeartbeatEvents(): Promise<WorkerHeartbeatEvent[]> {
  const workers = await prisma.worker.findMany({
    where: { lastHeartbeatAt: { not: null } },
    orderBy: { lastHeartbeatAt: 'desc' },
    take: 10
  });

  return workers.map((w, i) => ({
    id: `hb-${w.id}-${i}`,
    worker: w.hostLabel,
    at: w.lastHeartbeatAt?.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }) ?? '',
    status: w.status as WorkerHeartbeatEvent['status'],
    message: `${w.hostLabel} is ${w.status}.${w.currentJobId ? ` Running ${w.currentJobId}.` : ''}`
  }));
}

function getPhaseLabel(status: string): string {
  const map: Record<string, string> = {
    waiting_for_trigger: 'Holding — awaiting manual trigger',
    running: 'Red team checks',
    reporting: 'Report generation',
    completed: 'Completed'
  };
  return map[status] ?? 'Awaiting';
}

function getStatusNote(status: string): string {
  const map: Record<string, string> = {
    waiting_for_trigger: 'Worker has claimed the run and is holding for the founder trigger.',
    running: 'Worker heartbeat is healthy and the queue lease is active.',
    reporting: 'Findings captured; report is being assembled.',
    completed: 'Run closed. Artifacts are available.'
  };
  return map[status] ?? 'Status unknown.';
}
