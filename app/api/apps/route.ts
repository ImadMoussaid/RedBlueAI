import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ensureFounderSeeded } from '@/lib/seed-founder';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apps = await prisma.app.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(apps);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workspaceId } = await ensureFounderSeeded();
  const body = await req.json();
  const { name, baseUrl, loginUrl, environment } = body as {
    name: string;
    baseUrl: string;
    loginUrl?: string;
    environment: string;
  };

  if (!name || !baseUrl || !environment) {
    return NextResponse.json({ error: 'name, baseUrl, and environment are required' }, { status: 400 });
  }

  const app = await prisma.app.create({
    data: {
      workspaceId,
      name,
      baseUrl,
      loginUrl: loginUrl || null,
      environment,
      scopeSnapshot: {},
      guardrails: {}
    }
  });

  return NextResponse.json({ id: app.id, name: app.name }, { status: 201 });
}
