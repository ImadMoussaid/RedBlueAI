export const dynamic = 'force-dynamic';

import { StatusPill } from '@/components/findings/status-pill';
import { CreateExerciseForm } from '@/components/launch/create-exercise-form';
import { getBillingSummary } from '@/lib/billing/repository';
import { billingPlan, formatCurrency } from '@/lib/billing/pricing';
import { getTargetApplications, getLatestConsentRecord } from '@/lib/data/repository';
import { consentRecord as mockConsentRecord, targetApplications as mockTargetApplications } from '@/lib/data/control-plane';
import { approvalPath, blockedPath, getExerciseRequests } from '@/lib/exercises/repository';
import { RequestReviewPanel } from '@/components/exercises/request-review-panel';
import Link from 'next/link';

export default async function LaunchPage() {
  const [billingSummary, targetApplicationsData, consentRecordData, exerciseRequests] = await Promise.all([
    getBillingSummary(),
    getTargetApplications(),
    getLatestConsentRecord(),
    getExerciseRequests()
  ]);
  const targetApplications = targetApplicationsData.length ? targetApplicationsData : mockTargetApplications;
  const consentRecord = consentRecordData ?? mockConsentRecord;
  const launchEntitlement = billingSummary.entitlements[0] ?? null;

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Launch Audit</h1>
        <p className="page-subtitle">
          Create a request that freezes scope, consent, and guardrails before founder review.
          A paid entitlement is required before any run can be approved.
        </p>
      </div>

      {/* Main content: form + billing */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Form */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <div className="section-title">Exercise request</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              Choose your target app, exercise type, and scope. These are frozen on submission.
            </div>
          </div>
          <CreateExerciseForm />
        </div>

        {/* Billing gate */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <div className="kicker" style={{ marginBottom: 10 }}>Billing gate</div>
            <div className="section-title" style={{ marginBottom: 8 }}>One payment · One reviewable run</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
              {billingPlan.title} · {formatCurrency(billingPlan.priceCents, billingPlan.currency)}.
              The operator cannot approve a run until a paid entitlement is available.
            </div>

            {launchEntitlement ? (
              <div
                style={{
                  padding: '14px 16px',
                  background: 'var(--panel)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{launchEntitlement.runId}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{launchEntitlement.target}</div>
                  </div>
                  <StatusPill
                    tone={launchEntitlement.paymentStatus === 'paid' ? 'approved' : 'pending_manual_start'}
                    label={launchEntitlement.paymentStatus.replaceAll('_', ' ')}
                  />
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--text)' }}>Approval state:</strong>{' '}
                  {launchEntitlement.approvalState.replaceAll('_', ' ')}
                </div>
                {launchEntitlement.operatorNote && (
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>{launchEntitlement.operatorNote}</div>
                )}
              </div>
            ) : (
              <div
                style={{
                  padding: '14px 16px',
                  background: 'var(--warning-light)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #fde68a',
                  marginBottom: 16,
                  fontSize: 13,
                  color: '#92400e',
                }}
              >
                No entitlements yet. Submit an exercise request to create one.
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/billing" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                💳 Open Billing
              </Link>
              <Link href="/runs" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                🎯 Run Queue
              </Link>
            </div>
          </div>

          {/* Consent status */}
          <div className="card" style={{ padding: 20 }}>
            <div className="kicker" style={{ marginBottom: 8 }}>Consent status</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {consentRecord ? `Captured · ${consentRecord.capturedAt ?? ''}` : 'No consent record found'}
              </div>
              <Link href="/consent" className="btn btn-secondary" style={{ fontSize: 12 }}>
                Manage →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Review panel — Submit request for approval.
          Frozen consent snapshot and Frozen guardrail snapshot are
          captured at request time and locked before the exercise runs. */}
      <RequestReviewPanel requests={exerciseRequests} approvalPath={approvalPath} blockedPath={blockedPath} />
    </div>
  );
}
