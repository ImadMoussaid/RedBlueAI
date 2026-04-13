export const pendingRuns = [
  {
    name: 'Acme staging app',
    type: 'Authenticated web exercise',
    status: 'pending_manual_start',
    consent: 'Captured',
    guardrails: 'Read-only, 30 req/min, weekday hours'
  },
  {
    name: 'Northwind API',
    type: 'API exercise',
    status: 'queued',
    consent: 'Captured',
    guardrails: 'OpenAPI uploaded, no destructive checks'
  }
];

export const findings = [
  {
    title: 'Session cookie missing secure flag',
    severity: 'High',
    impact: 'Session leakage over insecure transport on misconfigured environments.',
    fix: 'Set the secure attribute and enforce HTTPS-only cookie handling.'
  },
  {
    title: 'Rate limiting not enforced on password reset',
    severity: 'Medium',
    impact: 'Attackers can brute force reset requests and increase abuse cost.',
    fix: 'Apply route-based rate limiting and add anomaly detection for repeated attempts.'
  },
  {
    title: 'Admin API route exposed excessive metadata',
    severity: 'Medium',
    impact: 'Overexposed response payloads leak internal identifiers and feature flags.',
    fix: 'Trim response schemas and validate role access before serialization.'
  }
];
