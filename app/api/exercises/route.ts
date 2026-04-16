import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ensureFounderSeeded } from '@/lib/seed-founder';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await ensureFounderSeeded();

  const body = await req.json();
  const { appId, consentId, type, guardrailsSnapshot } = body as {
    appId: string;
    consentId: string;
    type: string;
    guardrailsSnapshot?: Record<string, unknown>;
  };

  if (!appId || !consentId || !type) {
    return NextResponse.json({ error: 'appId, consentId, and type are required' }, { status: 400 });
  }

  const [app, consent] = await Promise.all([
    prisma.app.findUnique({ where: { id: appId } }),
    prisma.consent.findUnique({ where: { id: consentId } })
  ]);

  if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 });
  if (!consent) return NextResponse.json({ error: 'Consent not found' }, { status: 404 });

  const exercise = await prisma.exercise.create({
    data: {
      appId,
      consentId,
      createdByUserId: 'founder',
      type,
      status: 'pending_manual_start',
      scopeSnapshot: (app.scopeSnapshot as object) ?? {},
      guardrailsSnapshot: guardrailsSnapshot ?? (app.guardrails as object) ?? {},
      consentSnapshot: consent.snapshot as object,
      manualTriggerRequired: true
    }
  });

  return NextResponse.json({ id: exercise.id }, { status: 201 });
}
