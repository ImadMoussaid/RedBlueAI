import type { GuardrailSnapshot, ScopeSection, ScopeSnapshot } from '@/lib/scope/types';

export function ScopePanel({
  scopeSections,
  scopeSnapshot,
  guardrailSnapshot
}: {
  scopeSections: ScopeSection[];
  scopeSnapshot: ScopeSnapshot;
  guardrailSnapshot: GuardrailSnapshot;
}) {
  return (
    <div className="grid two">
      <article className="card" style={{ padding: 20 }}>
        <h3>Scope snapshot</h3>
        <div className="timeline" style={{ marginTop: 16 }}>
          {scopeSections.map((section) => (
            <div className="timeline-item" key={section.title}>
              <span />
              <div>
                <strong>{section.title}</strong>
                <ul className="list" style={{ marginTop: 8 }}>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 16, marginTop: 18, background: 'white', boxShadow: 'none' }}>
          <h4 style={{ marginBottom: 8 }}>Allowlist and blocklist</h4>
          <p><strong>Allowed domains:</strong> {scopeSnapshot.allowedDomains.join(', ')}</p>
          <p><strong>Blocked domains:</strong> {scopeSnapshot.blockedDomains.join(', ')}</p>
          <p><strong>Allowlist paths:</strong> {scopeSnapshot.allowlistPaths.join(', ')}</p>
        </div>
      </article>
      <article className="card" style={{ padding: 20 }}>
        <h3>Guardrail snapshot</h3>
        <div className="grid" style={{ marginTop: 16, gap: 14 }}>
          <div>
            <div className="kicker">Read only</div>
            <p>{guardrailSnapshot.readOnlyMode ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div>
            <div className="kicker">No destructive actions</div>
            <p>{guardrailSnapshot.noDestructiveActions ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div>
            <div className="kicker">Rate limit</div>
            <p>{guardrailSnapshot.rateLimitPerMinute} requests / minute</p>
          </div>
          <div>
            <div className="kicker">Allowed hours</div>
            <p>{guardrailSnapshot.allowedHours}</p>
          </div>
          <div>
            <div className="kicker">Legal accepted</div>
            <p>{guardrailSnapshot.legalAccepted ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="card" style={{ padding: 16, marginTop: 18, background: 'white', boxShadow: 'none' }}>
          <h4 style={{ marginBottom: 8 }}>Blocked actions</h4>
          <ul className="list">
            {scopeSnapshot.forbiddenActions.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p style={{ marginTop: 12 }}><strong>Test account notes:</strong> {scopeSnapshot.testAccountNotes}</p>
        </div>
      </article>
    </div>
  );
}
