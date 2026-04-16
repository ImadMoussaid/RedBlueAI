import { prisma } from '@/lib/prisma';
import type { AppTarget } from './types';

export async function getAppTargets(): Promise<AppTarget[]> {
  const apps = await prisma.app.findMany({ orderBy: { createdAt: 'asc' } });

  return apps.map((app) => ({
    name: app.name,
    customerName: app.name.split(' ')[0],
    environment: app.environment,
    baseUrl: app.baseUrl,
    loginUrl: app.loginUrl ?? undefined,
    description: `${app.environment} target registered in this workspace.`,
    apiSpecSource: 'Not uploaded'
  }));
}
