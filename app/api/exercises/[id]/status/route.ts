import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ALLOWED_TRANSITIONS = new Set([
  'assigned',
  'waiting_for_trigger',
  'running',
  'reporting',
  'completed',
  'failed',
]);

function workerAuth(req: NextRequest): boolean {
  const token = process.env.WORKER_SHARED_TOKEN;
  if (!token) return false;
  const header = req.headers.get('authorization') ?? '';
  return header === `Bearer ${token}`;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!workerAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: { status?: string; workerId?: string; phase?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { status, workerId, phase } = body;

  if (!status || !ALLOWED_TRANSITIONS.has(status)) {
    return NextResponse.json(
      { error: `Invalid or disallowed status: ${status}` },
      { status: 422 }
    );
  }

  try {
    const exercise = await prisma.exercise.findUnique({ where: { id } });

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { status };

    if ((status === 'assigned' || status === 'waiting_for_trigger') && workerId) {
      updateData.assignedWorkerId = workerId;
    }

    await prisma.exercise.update({ where: { id }, data: updateData });

    return NextResponse.json({ exerciseId: id, status, phase: phase ?? null });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
