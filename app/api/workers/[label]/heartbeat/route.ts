import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function workerAuth(req: NextRequest): boolean {
  const token = process.env.WORKER_SHARED_TOKEN;
  if (!token) return false;
  const header = req.headers.get('authorization') ?? '';
  return header === `Bearer ${token}`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ label: string }> }
) {
  if (!workerAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { label } = await params;

  let body: { status?: string; currentJobId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { status, currentJobId } = body;

  if (!status) {
    return NextResponse.json({ error: 'Missing required field: status' }, { status: 422 });
  }

  try {
    await prisma.worker.upsert({
      where: { hostLabel: label },
      update: { status, currentJobId: currentJobId ?? null, lastHeartbeatAt: new Date() },
      create: {
        hostLabel: label,
        status,
        currentJobId: currentJobId ?? null,
        sharedTokenHash: '',
        lastHeartbeatAt: new Date(),
      },
    });

    return NextResponse.json({ hostLabel: label, status, ok: true });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
