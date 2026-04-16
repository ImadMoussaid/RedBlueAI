import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { QUEUE_KEY } from '@/lib/queue';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: { app: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    if (exercise.status !== 'pending_manual_start') {
      return NextResponse.json(
        { error: `Cannot approve exercise in status: ${exercise.status}` },
        { status: 409 }
      );
    }

    await prisma.exercise.update({
      where: { id },
      data: { status: 'queued', approvedAt: new Date() }
    });

    const payload = JSON.stringify({
      id: exercise.id,
      appId: exercise.appId,
      appName: exercise.app.name,
      type: exercise.type,
      scopeSnapshot: exercise.scopeSnapshot,
      guardrailsSnapshot: exercise.guardrailsSnapshot,
      consentId: exercise.consentId,
    });

    try {
      await redis.rpush(QUEUE_KEY, payload);
    } catch (redisErr) {
      console.warn('[approve] Redis RPUSH failed (best-effort):', redisErr);
    }

    return NextResponse.json({ exerciseId: id, status: 'queued' });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
