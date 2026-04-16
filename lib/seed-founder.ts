import { prisma } from '@/lib/prisma';

export async function ensureFounderSeeded(): Promise<{ userId: string; workspaceId: string }> {
  const email = process.env.FOUNDER_EMAIL ?? 'founder@redblueai.com';

  await prisma.user.upsert({
    where: { id: 'founder' },
    update: {},
    create: { id: 'founder', email }
  });

  await prisma.workspace.upsert({
    where: { id: 'workspace-default' },
    update: {},
    create: { id: 'workspace-default', name: 'RedBlueAI Workspace', ownerId: 'founder' }
  });

  return { userId: 'founder', workspaceId: 'workspace-default' };
}
