import type { AppOnboardingSnapshot, AppTarget } from './types';

export const appTargets: AppTarget[] = [
  {
    name: 'Acme staging portal',
    customerName: 'Acme',
    environment: 'staging',
    baseUrl: 'https://staging.acme.app',
    loginUrl: 'https://staging.acme.app/login',
    description: 'Customer-facing portal with authenticated workflows and staging-only test accounts.',
    apiSpecSource: 'OpenAPI upload pending'
  },
  {
    name: 'Northwind API',
    customerName: 'Northwind',
    environment: 'production-safe',
    baseUrl: 'https://api.northwind.test',
    description: 'API-first service with a documented surface and strict read-only evaluation.',
    apiSpecSource: 'OpenAPI 3.1 import'
  }
];

export const onboardingSnapshot: AppOnboardingSnapshot = {
  target: appTargets[0],
  scope: {
    allowedDomains: ['staging.acme.app', 'api.staging.acme.app'],
    blockedDomains: ['cdn.acme.app', 'billing.acme.app'],
    publicPaths: ['/', '/pricing', '/status'],
    authPaths: ['/login', '/reset-password', '/account'],
    apiBaseUrls: ['https://api.staging.acme.app/v1']
  },
  guardrails: {
    readOnlyMode: true,
    noDestructiveActions: true,
    rateLimitPerMinute: 30,
    allowedHours: 'Mon-Fri 08:00-18:00 CET',
    legalAccepted: true
  }
};
