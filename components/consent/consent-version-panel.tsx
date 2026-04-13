import type { ConsentVersion } from '@/lib/consent/types';
import { StatusPill } from '@/components/findings/status-pill';

export function ConsentVersionPanel({ version }: { version: ConsentVersion }) {
  return (
    <article className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
        <div>
          <div className="kicker">Consent version</div>
          <h2 style={{ marginTop: 8 }}>{version.title}</h2>
        </div>
        <StatusPill tone="approved" label={version.version} />
      </div>
      <dl className="grid two" style={{ gap: 16, marginTop: 18 }}>
        <div>
          <dt className="kicker">Effective date</dt>
          <dd style={{ marginTop: 8, fontWeight: 600 }}>{version.effectiveDate}</dd>
        </div>
        <div>
          <dt className="kicker">Scope of copy</dt>
          <dd style={{ marginTop: 8, fontWeight: 600 }}>Frontend consent, authorization, and audit trail</dd>
        </div>
      </dl>
      <p style={{ marginTop: 18 }}>{version.body}</p>
    </article>
  );
}
