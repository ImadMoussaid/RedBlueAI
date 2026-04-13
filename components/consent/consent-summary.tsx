import type { ConsentSnapshot } from '@/lib/consent/types';
import { StatusPill } from '@/components/findings/status-pill';

export function ConsentSummary({ snapshot }: { snapshot: ConsentSnapshot }) {
  const checkedAffirmations = snapshot.affirmations.filter((affirmation) => affirmation.checked).length;

  return (
    <article className="card" style={{ padding: 24 }}>
      <div className="kicker">Consent snapshot</div>
      <h2 style={{ marginTop: 8 }}>Signer metadata and linked runs</h2>
      <div className="grid two" style={{ gap: 16, marginTop: 18 }}>
        <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Signer</strong>
          <p style={{ marginTop: 8 }}>{snapshot.signer.fullName}</p>
          <p>{snapshot.signer.role}</p>
          <p>{snapshot.signer.organization}</p>
          <p>{snapshot.signer.email}</p>
          <p style={{ marginTop: 12 }}>
            <strong>Signed by:</strong> {snapshot.signer.signedBy}
          </p>
          <p>
            <strong>Accepted at:</strong> {snapshot.acceptedAt}
          </p>
        </div>
        <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <strong>Audit summary</strong>
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            <StatusPill tone="approved" label={`${checkedAffirmations} affirmations checked`} />
            <StatusPill tone="queued" label={`${snapshot.linkedRuns.length} linked runs`} />
            <StatusPill tone="current" label={`Consent ${snapshot.consentId}`} />
          </div>
          <div style={{ marginTop: 12 }}>
            <p><strong>Version:</strong> {snapshot.currentVersion.version}</p>
            <p><strong>Current focus:</strong> {snapshot.currentVersion.title}</p>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none', marginTop: 16 }}>
        <strong>Linked runs</strong>
        <p style={{ marginTop: 8 }}>The consent record is surfaced on every MVP run that inherits this authorization.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {snapshot.linkedRuns.map((runId) => (
            <StatusPill key={runId} tone="neutral" label={runId} />
          ))}
        </div>
      </div>
    </article>
  );
}
