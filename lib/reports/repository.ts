import { prisma } from '@/lib/prisma';
import type { ReportRun } from './types';

export async function getReportRuns(): Promise<ReportRun[]> {
  const exercises = await prisma.exercise.findMany({
    where: { status: 'completed', reportPath: { not: null } },
    include: { app: true },
    orderBy: { requestedAt: 'desc' }
  });

  return exercises.map((ex) => ({
    id: ex.id,
    appName: ex.app.name,
    exerciseType: ex.type,
    status: 'completed' as const,
    createdAt: ex.requestedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    completedAt: ex.requestedAt.toLocaleString('en-GB', { timeZone: 'Europe/Brussels' }),
    score: 0,
    attackPaths: 0,
    missedDetections: 0,
    executiveSummary: 'Exercise completed. Review findings for detailed output.',
    findings: [],
    actionableFixes: [],
    artifacts: ex.reportPath
      ? [
          {
            id: `artifact-pdf-${ex.id}`,
            kind: 'pdf' as const,
            name: 'Executive report',
            path: ex.reportPath!,
            sizeLabel: 'Pending',
            status: 'pending' as const,
            summary: 'PDF report from this exercise run.'
          }
        ]
      : []
  }));
}

export const reportHighlights = [
  { label: 'Actionable fixes', value: '0', note: 'No completed runs yet.' },
  { label: 'Missed detections', value: '0', note: 'No completed runs yet.' },
  { label: 'Artifacts ready', value: '0', note: 'Reports will appear here after exercise completion.' }
];
