import type { ConsentSnapshot } from './types';

export const consentVersions = [
  {
    version: 'v1.0',
    title: 'RedBlueAI customer authorization and rules of engagement',
    effectiveDate: '2026-04-13',
    body:
      'Version 1.0 establishes the MVP consent record for founder-reviewed application security exercises. It captures customer authorization, target scope, and the operator review requirement before any run can be queued.'
  },
  {
    version: 'v1.1',
    title: 'RedBlueAI customer authorization and rules of engagement',
    effectiveDate: '2026-04-20',
    body:
      'Version 1.1 adds clearer target ownership language, preserves the read-only default, and records the linked run history directly in the audit trail summary.'
  }
];

export const consentSnapshot: ConsentSnapshot = {
  consentId: 'consent-rb-001',
  currentVersion: consentVersions[1],
  signer: {
    fullName: 'Jane Doe',
    role: 'Head of Engineering',
    organization: 'Acme Security',
    email: 'jane.doe@acme.example',
    signedAt: '2026-04-13 15:10 CET',
    signedBy: 'Jane Doe'
  },
  affirmations: [
    {
      id: 'ownership',
      label: 'Target ownership or authorization',
      detail: 'The signer confirms the organization owns the target or is explicitly authorized to test it.',
      checked: true
    },
    {
      id: 'scope',
      label: 'Scope enforcement',
      detail: 'Only the declared in-scope domains, hosts, and APIs may be exercised.',
      checked: true
    },
    {
      id: 'read-only',
      label: 'Read-only execution',
      detail: 'The run must remain read-only and avoid destructive actions, data modification, or persistence.',
      checked: true
    },
    {
      id: 'approval',
      label: 'Operator approval',
      detail: 'A founder or operator must approve the request before the queue receives it.',
      checked: true
    }
  ],
  acceptedAt: '2026-04-13 15:10 CET',
  linkedRuns: ['RB-001', 'RB-002', 'RB-003'],
  auditTrail: [
    {
      id: 'event-001',
      action: 'Consent drafted',
      actor: 'RedBlueAI system',
      runId: 'RB-001',
      timestamp: '2026-04-13 14:52 CET',
      note: 'Initial consent copy prepared from the versioned MVP template.'
    },
    {
      id: 'event-002',
      action: 'Signer captured',
      actor: 'Jane Doe',
      runId: 'RB-001',
      timestamp: '2026-04-13 15:10 CET',
      note: 'Authorization and rules-of-engagement form submitted from the frontend consent flow.'
    },
    {
      id: 'event-003',
      action: 'Operator review required',
      actor: 'Founder operator',
      runId: 'RB-002',
      timestamp: '2026-04-13 15:18 CET',
      note: 'The consent record is linked to queued runs and remains visible before manual start.'
    }
  ]
};

export const consentAuditSummary = {
  capturedAt: consentSnapshot.acceptedAt,
  version: consentSnapshot.currentVersion.version,
  signer: consentSnapshot.signer.fullName,
  organization: consentSnapshot.signer.organization,
  linkedRuns: consentSnapshot.linkedRuns.length,
  affirmationsChecked: consentSnapshot.affirmations.filter((item) => item.checked).length
};
