import { prisma } from '@/lib/prisma';
import type { TargetApplication, ConsentRecord } from './control-plane';

export async function getTargetApplications(): Promise<TargetApplication[]> {
  const apps = await prisma.app.findMany({ orderBy: { createdAt: 'asc' } });

  return apps.map((app) => {
    const scope = app.scopeSnapshot as Record<string, unknown> | null;
    const guardrails = app.guardrails as Record<string, unknown> | null;

    return {
      name: app.name,
      environment: app.environment,
      baseUrl: app.baseUrl,
      loginUrl: app.loginUrl ?? undefined,
      allowedDomains: (scope?.allowedDomains as string[]) ?? [],
      blockedDomains: (scope?.blockedDomains as string[]) ?? [],
      rateLimit: guardrails?.rateLimitPerMinute ? `${guardrails.rateLimitPerMinute} req/min` : 'Not set',
      allowedHours: (guardrails?.allowedHours as string) ?? 'Not set'
    };
  });
}

export async function getLatestConsentRecord(): Promise<ConsentRecord | null> {
  const consent = await prisma.consent.findFirst({ orderBy: { acceptedAt: 'desc' } });
  if (!consent) return null;

  return {
    version: consent.version,
    signerName: consent.signerName,
    signerRole: consent.signerRole ?? '',
    acceptedAt: consent.acceptedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    affirmations: [consent.rulesAcknowledged]
  };
}
