import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;

  const body = await req.json().catch(() => ({}));
  const reason: string =
    typeof body.reason === 'string' && body.reason.trim()
      ? body.reason.trim()
      : 'Blocked by founder.';

  try {
    const exercise = await prisma.exercise.findUnique({ where: { id } });

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    await prisma.exercise.update({
      where: { id },
      data: { status: 'blocked' }
    });

    // TODO: persist block reason once a BlockReason model is added.

    return NextResponse.json({ exerciseId: id, status: 'blocked', reason });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
