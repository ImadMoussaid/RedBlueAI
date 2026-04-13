import { ConsentAuditTrail } from '@/components/consent/consent-audit-trail';
import { ConsentSummary } from '@/components/consent/consent-summary';
import { ConsentVersionPanel } from '@/components/consent/consent-version-panel';
import { consentAuditSummary, consentSnapshot } from '@/lib/consent/mock';

export default function ConsentPage() {
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
        <div className="form-grid">
          <label>
            Authorized signer
            <input defaultValue={consentSnapshot.signer.fullName} placeholder="Jane Doe, Head of Engineering" />
          </label>
          <label>
            Signer role
            <input defaultValue={consentSnapshot.signer.role} placeholder="Head of Engineering" />
          </label>
          <label>
            Organization
            <input defaultValue={consentSnapshot.signer.organization} placeholder="Acme Security" />
          </label>
          <label>
            Signer email
            <input defaultValue={consentSnapshot.signer.email} placeholder="jane.doe@acme.example" />
          </label>
          <label>
            Authorization statement
            <textarea defaultValue={'I confirm that my organization owns the target assets or is explicitly authorized to have them tested by RedBlueAI under the stated rules of engagement.'} />
          </label>
          <label>
            Rules of engagement acknowledgement
            <textarea defaultValue={'Read-only exercise. No destructive payloads. In-scope assets only. Test accounts only where applicable.'} />
          </label>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/runs" className="button primary">Save consent snapshot</a>
          <a href="/apps/new" className="button secondary">Back to app setup</a>
        </div>
      </section>
    </div>
  );
}
