'use client';

import { useState } from 'react';

export function CreateAppForm() {
  const [name, setName] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [loginUrl, setLoginUrl] = useState('');
  const [environment, setEnvironment] = useState('staging');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, baseUrl, loginUrl: loginUrl || undefined, environment })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Failed to create app.');
        setLoading(false);
        return;
      }

      window.location.href = '/consent';
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid two">
        <label>
          App name
          <input
            required
            placeholder="Acme staging portal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Base URL
          <input
            required
            placeholder="https://app.example.com"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
        </label>
        <label>
          Login URL (optional)
          <input
            placeholder="https://app.example.com/login"
            value={loginUrl}
            onChange={(e) => setLoginUrl(e.target.value)}
          />
        </label>
        <label>
          Environment
          <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
            <option value="staging">Staging</option>
            <option value="production">Production-safe test env</option>
          </select>
        </label>
      </div>
      {error && <p style={{ color: 'var(--danger, red)', marginTop: 12 }}>{error}</p>}
      <div className="button-row" style={{ marginTop: 18 }}>
        <button type="submit" className="button primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save and continue to consent'}
        </button>
        <a href="/dashboard" className="button secondary">Cancel</a>
      </div>
    </form>
  );
}
