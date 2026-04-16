'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function SignInForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: data.get('email') as string,
      password: data.get('password') as string,
      callbackUrl: '/workspace',
      redirect: false
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password.');
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Email
          <input name="email" type="email" placeholder="founder@redblueai.local" required />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="••••••••" required />
        </label>
      </div>
      {error ? (
        <p style={{ marginTop: 12, color: '#9a1f1f', fontSize: 14 }}>{error}</p>
      ) : null}
      <div className="button-row" style={{ marginTop: 18 }}>
        <button type="submit" className="button primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Continue to workspace'}
        </button>
      </div>
    </form>
  );
}
