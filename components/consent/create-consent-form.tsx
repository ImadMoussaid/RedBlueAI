'use client';

import { useState } from 'react';

const DEFAULT_AUTHORIZED =
  'I confirm that my organization owns the target assets or is explicitly authorized to have them tested by RedBlueAI under the stated rules of engagement.';

const DEFAULT_RULES =
  'Read-only exercise. No destructive payloads. In-scope assets only. Test accounts only where applicable.';

export function CreateConsentForm() {
  const [signerName, setSignerName] = useState('');
  const [signerRole, setSignerRole] = useState('');
  const [authorizedChecked, setAuthorizedChecked] = useState(false);
  const [rulesChecked, setRulesChecked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!authorizedChecked || !rulesChecked) {
      setError('Both affirmations must be checked before saving consent.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerName,
          signerRole: signerRole || undefined,
          authorizedStatement: DEFAULT_AUTHORIZED,
          rulesAcknowledged: DEFAULT_RULES
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to save consent.');
        setLoading(false);
        return;
      }

      window.location.href = '/launch';
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Authorized signer
          <input
            required
            placeholder="Jane Doe, Head of Engineering"
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
          />
        </label>
        <label>
          Signer role (optional)
          <input
            placeholder="Head of Engineering"
            value={signerRole}
            onChange={(e) => setSignerRole(e.target.value)}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={authorizedChecked}
            onChange={(e) => setAuthorizedChecked(e.target.checked)}
            style={{ marginTop: 3, flexShrink: 0 }}
          />
          <span>{DEFAULT_AUTHORIZED}</span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={rulesChecked}
            onChange={(e) => setRulesChecked(e.target.checked)}
            style={{ marginTop: 3, flexShrink: 0 }}
          />
          <span>{DEFAULT_RULES}</span>
        </label>
      </div>
      {error && <p style={{ color: 'var(--danger, red)', marginTop: 12 }}>{error}</p>}
      <div className="button-row" style={{ marginTop: 18 }}>
        <button type="submit" className="button primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save consent snapshot'}
        </button>
        <a href="/apps/new" className="button secondary">Back to app setup</a>
      </div>
    </form>
  );
}
