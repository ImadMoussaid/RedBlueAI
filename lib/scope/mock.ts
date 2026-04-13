import type { GuardrailSnapshot, ScopeSection, ScopeSnapshot } from './types';

export const scopeSections: ScopeSection[] = [
  {
    title: 'In scope',
    items: ['staging.acme.app', 'api.staging.acme.app', 'Authenticated UI flows']
  },
  {
    title: 'Out of scope',
    items: ['cdn.acme.app', 'billing.acme.app', 'Any real production data']
  },
  {
    title: 'Review checkpoints',
    items: ['Customer authorization captured', 'Allowed hours confirmed', 'Rate limit set']
  }
];

export const scopeSnapshot: ScopeSnapshot = {
  allowedDomains: ['staging.acme.app', 'api.staging.acme.app'],
  blockedDomains: ['cdn.acme.app', 'billing.acme.app'],
  allowlistPaths: ['/login', '/account', '/api/v1/*'],
  forbiddenActions: ['Deletion', 'Mass updates', 'Real data export'],
  testAccountNotes: 'Use staging test account only. MFA handled by founder during manual review.'
};

export const guardrailSnapshot: GuardrailSnapshot = {
  readOnlyMode: true,
  noDestructiveActions: true,
  rateLimitPerMinute: 30,
  allowedHours: 'Mon-Fri 08:00-18:00 CET',
  legalAccepted: true
};
