import type { RunStatus, Finding } from '@/lib/findings/mock';

export type ExerciseReviewDecision = 'approved' | 'blocked' | 'needs_changes';

export interface ExerciseLifecycleStage {
  title: string;
  tone: RunStatus;
  note: string;
}

export interface ExerciseRequestReview {
  id: string;
  target: string;
  type: string;
  status: RunStatus;
  requestedAt: string;
  consent: string;
  guardrails: string;
  reviewer: string;
  reviewDecision: ExerciseReviewDecision;
  reviewTone: RunStatus | 'blocked';
  reviewSummary: string;
  nextTransition: string;
  worker: string;
}

export interface ExerciseApprovalTrailItem {
  title: string;
  tone: RunStatus | 'blocked';
  actor: string;
  at: string;
  note: string;
}

export interface ExerciseRunDetail {
  summary: string;
  reportStatus: string;
  approvalTrail: ExerciseApprovalTrailItem[];
  blockedReasons: string[];
  nextSteps: string[];
  findings?: Finding[];
  executiveSummary?: string;
}
