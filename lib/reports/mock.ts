import type { ReportRun } from './types';

export const reportRuns: ReportRun[] = [
  {
    id: 'run_acme_001',
    appName: 'Acme staging portal',
    exerciseType: 'Authenticated web exercise',
    status: 'completed',
    createdAt: 'Apr 12, 2026, 09:12 CET',
    completedAt: 'Apr 12, 2026, 09:42 CET',
    score: 78,
    attackPaths: 4,
    missedDetections: 2,
    executiveSummary:
      'The run confirmed that the target is safely scannable under the frozen guardrails, but session handling and abuse-prevention controls still need immediate follow-up before broader rollout.',
    findings: [
      {
        id: 'finding_1',
        title: 'Session cookie missing secure flag',
        severity: 'High',
        summary: 'Session cookies can be exposed if the browser is allowed to transmit them without HTTPS guarantees.',
        impact: 'A compromised transport path can leak active sessions and widen the blast radius of a single login.',
        actionableFix: 'Set the secure flag, keep the httpOnly flag enabled, and enforce HTTPS-only session handling.',
        owasp: 'OWASP A07: Identification and Authentication Failures',
        cwe: 'CWE-614',
        detectionStatus: 'missed',
        remediationOwner: 'Platform engineering',
        remediationWindow: 'Immediate',
        evidence: [
          {
            id: 'evidence_cookie',
            label: 'Browser session capture',
            source: 'browser',
            detail: 'Cookie observed without Secure during authenticated staging flow.'
          },
          {
            id: 'evidence_worker_log',
            label: 'Worker trace',
            source: 'worker',
            detail: 'Replay confirmed the issue across two authenticated requests.'
          }
        ]
      },
      {
        id: 'finding_2',
        title: 'Password reset endpoint lacked rate limiting',
        severity: 'Medium',
        summary: 'Repeated reset attempts were accepted without a meaningful request throttle.',
        impact: 'Attackers can increase abuse cost and brute-force account recovery flows.',
        actionableFix: 'Apply per-route rate limits and log repeated reset attempts for anomaly review.',
        owasp: 'OWASP A04: Insecure Design',
        cwe: 'CWE-770',
        detectionStatus: 'triggered',
        remediationOwner: 'Application backend team',
        remediationWindow: 'Next sprint',
        evidence: [
          {
            id: 'evidence_rate_limit',
            label: 'Request replay sample',
            source: 'api',
            detail: 'Burst of reset requests completed without backoff or throttling.'
          }
        ]
      },
      {
        id: 'finding_3',
        title: 'API response returned excessive metadata',
        severity: 'Low',
        summary: 'The API exposed fields that are not required by the user-facing workflow.',
        impact: 'Overexposed metadata increases reconnaissance value and can reveal internal implementation details.',
        actionableFix: 'Trim serialization to the minimum response schema and review role-based access before returning data.',
        owasp: 'OWASP A01: Broken Access Control',
        cwe: 'CWE-200',
        detectionStatus: 'review',
        remediationOwner: 'API platform team',
        remediationWindow: 'Backlog',
        evidence: [
          {
            id: 'evidence_metadata',
            label: 'Serialized payload review',
            source: 'report',
            detail: 'Internal IDs and feature flags were included in the response body.'
          }
        ]
      }
    ],
    actionableFixes: [
      {
        id: 'fix-cookie',
        title: 'Enforce secure cookie defaults',
        owner: 'Platform engineering',
        priority: 'Immediate',
        summary: 'Apply Secure and HTTPS-only session settings everywhere the app issues authenticated cookies.'
      },
      {
        id: 'fix-rate-limit',
        title: 'Add reset-route throttling',
        owner: 'Application backend team',
        priority: 'Next sprint',
        summary: 'Protect password-reset and recovery endpoints with route-specific throttles and alerting.'
      },
      {
        id: 'fix-metadata',
        title: 'Trim API response surface',
        owner: 'API platform team',
        priority: 'Backlog',
        summary: 'Remove internal-only identifiers from serialized responses unless explicitly required.'
      }
    ],
    artifacts: [
      {
        id: 'artifact_pdf',
        kind: 'pdf',
        name: 'Executive report',
        path: '/app/data/reports/run_acme_001/report.pdf',
        sizeLabel: '1.8 MB',
        status: 'ready',
        summary: 'Partner-ready PDF with executive summary, findings, and remediation plan.'
      },
      {
        id: 'artifact_evidence',
        kind: 'evidence',
        name: 'Evidence bundle',
        path: '/app/data/evidence/run_acme_001/',
        sizeLabel: '12 files',
        status: 'ready',
        summary: 'Screenshots, request captures, and normalized evidence references for every finding.'
      },
      {
        id: 'artifact_log',
        kind: 'log',
        name: 'Worker log',
        path: '/app/data/evidence/run_acme_001/worker.log',
        sizeLabel: '84 KB',
        status: 'pending',
        summary: 'Structured worker trace from queue claim through report generation.'
      }
    ]
  }
];

export const reportHighlights = [
  {
    label: 'Actionable fixes',
    value: '3',
    note: 'Prioritized remediation items grouped by business impact and owning team.'
  },
  {
    label: 'Missed detections',
    value: '2',
    note: 'Findings the blue review layer did not catch in time.'
  },
  {
    label: 'Artifacts ready',
    value: '2/3',
    note: 'PDF and evidence bundle are ready; worker log is still pending.'
  }
];
