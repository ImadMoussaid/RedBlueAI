import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { triggerChannel } from '@/lib/queue';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const exercise = await prisma.exercise.findUnique({ where: { id } });

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    if (exercise.status !== 'waiting_for_trigger') {
      return NextResponse.json(
        { error: `Cannot trigger exercise in status: ${exercise.status}` },
        { status: 409 }
      );
    }

    await prisma.exercise.update({
      where: { id },
      data: { status: 'running' }
    });

    try {
      await redis.publish(triggerChannel(id), 'trigger');
    } catch (redisErr) {
      console.warn('[trigger] Redis PUBLISH failed (best-effort):', redisErr);
    }

    return NextResponse.json({ exerciseId: id, status: 'running' });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      select: { status: true }
    });

    if (!exercise) return NextResponse.json({ exerciseId: id, status: 'not_found' });

    return NextResponse.json({ exerciseId: id, status: exercise.status });
  } catch {
    // DB not available — worker will retry on next poll.
    return NextResponse.json({ exerciseId: id, status: 'waiting_for_trigger' });
  }
}
