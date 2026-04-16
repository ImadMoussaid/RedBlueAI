export const dynamic = 'force-dynamic';

import { ConsentAuditTrail } from '@/components/consent/consent-audit-trail';
import { ConsentSummary } from '@/components/consent/consent-summary';
import { ConsentVersionPanel } from '@/components/consent/consent-version-panel';
import { CreateConsentForm } from '@/components/consent/create-consent-form';
import { getLatestConsent } from '@/lib/consent/repository';
import { consentSnapshot as mockSnapshot, consentAuditSummary as mockAuditSummary } from '@/lib/consent/mock';

export default async function ConsentPage() {
  const fetched = await getLatestConsent();
  const consentSnapshot = fetched ?? mockSnapshot;
  const consentAuditSummary = fetched
    ? { capturedAt: fetched.acceptedAt, version: fetched.currentVersion.version, signer: fetched.signer.fullName, organization: fetched.signer.organization, linkedRuns: fetched.linkedRuns.length, affirmationsChecked: fetched.affirmations.filter(a => a.checked).length }
    : mockAuditSummary;
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Consent capture</span>
        <h1>Collect customer authorization before a run can be queued.</h1>
        <p>
          The MVP treats consent as a first-class product artifact. This page now shows the persisted consent shape,
          the signer record, and a visible audit trail summary that travels with each run.
        </p>
      </header>

      <ConsentSummary snapshot={consentSnapshot} />

      <section className="grid two">
        <ConsentVersionPanel version={consentSnapshot.currentVersion} />
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Required affirmations</div>
          <h2 style={{ marginTop: 8 }}>Authorization checklist</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            {consentSnapshot.affirmations.map((affirmation) => (
              <div
                key={affirmation.id}
                className="card"
                style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}
              >
                <strong>{affirmation.label}</strong>
                <p style={{ marginTop: 8 }}>{affirmation.detail}</p>
                <p style={{ marginTop: 10, color: 'var(--accent)' }}>
                  {affirmation.checked ? 'Captured in the persisted consent snapshot.' : 'Awaiting customer confirmation.'}
                </p>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none', marginTop: 16 }}>
            <strong>Consent audit summary</strong>
            <p style={{ marginTop: 8 }}>
              {consentAuditSummary.signer} at {consentAuditSummary.organization} accepted version {consentAuditSummary.version} on{' '}
              {consentAuditSummary.capturedAt}. This record is linked to {consentAuditSummary.linkedRuns} run artifacts.
            </p>
          </div>
        </article>
      </section>

      <ConsentAuditTrail events={consentSnapshot.auditTrail} />

      <section className="card" style={{ padding: 24 }}>
        <CreateConsentForm />
      </section>
    </div>
  );
}
