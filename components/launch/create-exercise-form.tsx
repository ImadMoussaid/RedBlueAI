'use client';

import { useState, useEffect } from 'react';

interface AppOption {
  id: string;
  name: string;
  environment: string;
}

interface ConsentOption {
  id: string;
  signerName: string;
  version: string;
}

export function CreateExerciseForm() {
  const [apps, setApps] = useState<AppOption[]>([]);
  const [consent, setConsent] = useState<ConsentOption | null>(null);
  const [appId, setAppId] = useState('');
  const [type, setType] = useState('red-team');
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  const [rateLimit, setRateLimit] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    Promise.all([fetch('/api/apps'), fetch('/api/consent')])
      .then(async ([appsRes, consentRes]) => {
        const appsData = await appsRes.json();
        const consentData = await consentRes.json();
        if (Array.isArray(appsData) && appsData.length > 0) {
          setApps(appsData);
          setAppId(appsData[0].id);
        } else {
          setFetchError('No apps found. Please add an app first.');
        }
        if (consentData?.id) {
          setConsent(consentData);
        } else {
          setFetchError((prev) => prev ? prev + ' No consent found. Please complete consent first.' : 'No consent found. Please complete consent first.');
        }
      })
      .catch(() => setFetchError('Failed to load apps or consent.'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setError('No consent record found.'); return; }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          consentId: consent.id,
          type,
          guardrailsSnapshot: { readOnlyMode, rateLimitPerMinute: rateLimit }
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to create exercise.');
        setLoading(false);
        return;
      }

      window.location.href = '/runs';
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  if (fetchError) {
    return (
      <div>
        <p style={{ color: 'var(--danger, red)' }}>{fetchError}</p>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/apps/new" className="button primary">Add an app</a>
          <a href="/consent" className="button secondary">Complete consent</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid two">
        <label>
          Target application
          <select value={appId} onChange={(e) => setAppId(e.target.value)} required>
            {apps.map((app) => (
              <option key={app.id} value={app.id}>{app.name} ({app.environment})</option>
            ))}
          </select>
        </label>
        <label>
          Exercise type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="red-team">Red team</option>
            <option value="blue-review">Blue review</option>
            <option value="full-purple">Full purple</option>
          </select>
        </label>
        <label>
          Rate limit (req/min)
          <input
            type="number"
            min={1}
            max={60}
            value={rateLimit}
            onChange={(e) => setRateLimit(Number(e.target.value))}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={readOnlyMode}
            onChange={(e) => setReadOnlyMode(e.target.checked)}
          />
          <span>Read-only mode</span>
        </label>
      </div>
      {consent && (
        <p style={{ marginTop: 14, opacity: 0.7 }}>
          Consent: {consent.signerName} · version {consent.version}
        </p>
      )}
      {error && <p style={{ color: 'var(--danger, red)', marginTop: 12 }}>{error}</p>}
      <div className="button-row" style={{ marginTop: 18 }}>
        <button type="submit" className="button primary" disabled={loading || apps.length === 0 || !consent}>
          {loading ? 'Submitting…' : 'Submit request for approval'}
        </button>
        <a href="/consent" className="button secondary">Review consent</a>
      </div>
    </form>
  );
}
