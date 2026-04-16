import { prisma } from '@/lib/prisma';
import type { ConsentSnapshot } from './types';

export async function getLatestConsent(): Promise<ConsentSnapshot | null> {
  const consent = await prisma.consent.findFirst({
    include: { user: true },
    orderBy: { acceptedAt: 'desc' }
  });

  if (!consent) return null;

  const snapshot = consent.snapshot as Record<string, unknown>;
  const affirmations = (snapshot?.affirmations as { id: string; label: string; detail: string; checked: boolean }[]) ?? [];

  return {
    consentId: consent.id,
    currentVersion: {
      version: consent.version,
      title: 'RedBlueAI customer authorization and rules of engagement',
      effectiveDate: consent.acceptedAt.toISOString().split('T')[0],
      body: consent.authorizedStatement
    },
    signer: {
      fullName: consent.signerName,
      role: consent.signerRole ?? '',
      organization: '',
      email: consent.user.email,
      signedAt: consent.acceptedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
      signedBy: consent.signerName
    },
    affirmations,
    acceptedAt: consent.acceptedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    linkedRuns: [],
    auditTrail: [
      {
        id: `event-${consent.id}`,
        action: 'Consent captured',
        actor: consent.signerName,
        runId: '',
        timestamp: consent.acceptedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
        note: 'Authorization and rules-of-engagement form submitted.'
      }
    ]
  };
}
