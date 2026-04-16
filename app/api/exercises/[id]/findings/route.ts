import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function workerAuth(req: NextRequest): boolean {
  const token = process.env.WORKER_SHARED_TOKEN;
  if (!token) return false;
  const header = req.headers.get('authorization') ?? '';
  return header === `Bearer ${token}`;
}

interface FindingRecord {
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  summary: string;
  phase: string;
  evidence?: string;
  owasp?: string;
  cwe?: string;
  action?: string;
  remediationOwner?: string;
  detectionStatus?: 'triggered' | 'missed' | 'review';
}

interface RequestBody {
  findings: FindingRecord[];
  executiveSummary?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!workerAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!Array.isArray(body.findings)) {
    return NextResponse.json({ error: 'findings must be an array' }, { status: 422 });
  }

  try {
    const exercise = await prisma.exercise.findUnique({ where: { id } });

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    await prisma.exercise.update({
      where: { id },
      data: {
        findings: body.findings,
        executiveSummary: body.executiveSummary
      }
    });

    return NextResponse.json({ exerciseId: id, findingsCount: body.findings.length });
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
