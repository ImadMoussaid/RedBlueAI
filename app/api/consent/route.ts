import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ensureFounderSeeded } from '@/lib/seed-founder';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const consent = await prisma.consent.findFirst({ orderBy: { acceptedAt: 'desc' } });
  if (!consent) return NextResponse.json(null);
  return NextResponse.json({ id: consent.id, signerName: consent.signerName, signerRole: consent.signerRole, version: consent.version, acceptedAt: consent.acceptedAt });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await ensureFounderSeeded();

  const body = await req.json();
  const { signerName, signerRole, authorizedStatement, rulesAcknowledged, version } = body as {
    signerName: string;
    signerRole?: string;
    authorizedStatement: string;
    rulesAcknowledged: string;
    version?: string;
  };

  if (!signerName || !authorizedStatement || !rulesAcknowledged) {
    return NextResponse.json({ error: 'signerName, authorizedStatement, and rulesAcknowledged are required' }, { status: 400 });
  }

  const consent = await prisma.consent.create({
    data: {
      userId: 'founder',
      version: version ?? '1.0',
      signerName,
      signerRole: signerRole || null,
      authorizedStatement,
      rulesAcknowledged,
      snapshot: body
    }
  });

  return NextResponse.json({ id: consent.id }, { status: 201 });
}
