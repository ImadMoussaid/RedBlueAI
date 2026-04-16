import { prisma } from '@/lib/prisma';
import { ensureFounderSeeded } from '@/lib/seed-founder';

export async function getWorkspaceData() {
  await ensureFounderSeeded();
  const [workspace, apps, pendingCount, workers] = await Promise.all([
    prisma.workspace.findFirst({ include: { owner: true } }),
    prisma.app.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.exercise.count({ where: { status: 'pending_manual_start' } }),
    prisma.worker.findMany({ orderBy: { createdAt: 'asc' } })
  ]);

  const header = {
    title: workspace?.name ?? 'RedBlueAI Workspace',
    subtitle: 'Founder-operated control plane.',
    owner: workspace?.owner.email ?? 'Founder',
    region: 'EU founder-operated',
    totalApps: apps.length,
    pendingApprovals: pendingCount,
    activeWorkers: workers.filter((w) => w.status === 'healthy' || w.status === 'busy').length
  };

  const targets = apps.map((app) => ({
    name: app.name,
    environment: app.environment,
    baseUrl: app.baseUrl,
    consentState: 'Captured' as const,
    exerciseState: 'Ready' as const,
    allowedDomains: (app.scopeSnapshot as Record<string, string[]> | null)?.allowedDomains ?? []
  }));

  const members = workspace
    ? [{ name: workspace.owner.email, role: 'Founder / operator', access: 'Owner' as const, status: 'Active' as const, lastActive: 'Today' }]
    : [];

  const metrics = [
    { label: 'Targets registered', value: String(apps.length).padStart(2, '0'), note: 'Apps onboarded to this workspace.', tone: 'accent' as const },
    { label: 'Pending approvals', value: String(pendingCount).padStart(2, '0'), note: 'Exercise requests awaiting founder review.', tone: 'neutral' as const },
    { label: 'Workers registered', value: String(workers.length).padStart(2, '0'), note: 'Worker hosts registered to this workspace.', tone: 'success' as const }
  ];

  return { header, targets, members, metrics };
}
