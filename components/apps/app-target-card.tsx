import type { AppTarget } from '@/lib/apps/types';

export function AppTargetCard({ target }: { target: AppTarget }) {
  return (
    <article className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
      <div className="kicker">{target.customerName}</div>
      <h3 style={{ marginTop: 8 }}>{target.name}</h3>
      <p>{target.description}</p>
      <p><strong>Environment:</strong> {target.environment}</p>
      <p><strong>Base URL:</strong> {target.baseUrl}</p>
      {target.loginUrl ? <p><strong>Login URL:</strong> {target.loginUrl}</p> : null}
      <p><strong>API spec:</strong> {target.apiSpecSource ?? 'Not uploaded yet'}</p>
    </article>
  );
}
