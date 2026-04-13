import type { AuthActionLink, AuthHighlight, AuthJourneyStep } from './types';

export const signInHighlights: AuthHighlight[] = [
  {
    title: 'Workspace-aware access',
    detail: 'Every sign-in lands the operator inside a named workspace with clear ownership and context.'
  },
  {
    title: 'Safe pilot posture',
    detail: 'The MVP assumes founder-reviewed runs, explicit consent, and scoped customer targets.'
  },
  {
    title: 'Ready for later auth',
    detail: 'These flows are mock-backed now so we can swap in real session logic without redesigning the shell.'
  }
];

export const signInJourney: AuthJourneyStep[] = [
  {
    title: 'Enter credentials',
    detail: 'Sign in with the operator account connected to the RedBlueAI workspace.',
    status: 'current'
  },
  {
    title: 'Land in workspace',
    detail: 'The app opens with the current workspace summary, targets, and pending approvals.',
    status: 'pending'
  },
  {
    title: 'Launch approved exercise',
    detail: 'From there you can review scope, consent, and run requests before any execution starts.',
    status: 'pending'
  }
];

export const registerHighlights: AuthHighlight[] = [
  {
    title: 'Create the operator account',
    detail: 'Start with one founder or pilot operator account and a named workspace.'
  },
  {
    title: 'Capture workspace purpose',
    detail: 'Record the pilot workspace name so target apps and approvals stay anchored.'
  },
  {
    title: 'Keep the path simple',
    detail: 'This route stays lean until the real auth and onboarding backend lands.'
  }
];

export const registerJourney: AuthJourneyStep[] = [
  {
    title: 'Create account',
    detail: 'Record the operator identity that will manage the initial workspace.',
    status: 'complete'
  },
  {
    title: 'Name workspace',
    detail: 'Use a workspace name that clearly maps to the pilot customer or internal environment.',
    status: 'current'
  },
  {
    title: 'Move into setup',
    detail: 'The next step is the authenticated workspace shell with targets and control-plane data.',
    status: 'pending'
  }
];

export const passwordRecoveryHighlights: AuthHighlight[] = [
  {
    title: 'Short recovery loop',
    detail: 'Password recovery stays simple for the pilot: one email, one reset path.'
  },
  {
    title: 'No hidden state',
    detail: 'Recovery screens are mock-backed so they can be replaced by real auth later.'
  },
  {
    title: 'Keep operators moving',
    detail: 'The point is to unblock access, not to design the final auth system yet.'
  }
];

export const passwordRecoveryJourney: AuthJourneyStep[] = [
  {
    title: 'Request reset',
    detail: 'Enter the workspace email tied to the operator account.',
    status: 'complete'
  },
  {
    title: 'Check inbox',
    detail: 'Open the recovery email and continue with the reset link.',
    status: 'current'
  },
  {
    title: 'Return to workspace',
    detail: 'Once reset, the operator returns to RedBlueAI and resumes review work.',
    status: 'pending'
  }
];

export const authActions: AuthActionLink[] = [
  { label: 'Sign in', href: '/sign-in' },
  { label: 'Create workspace', href: '/register' },
  { label: 'Recover password', href: '/forgot-password' }
];
