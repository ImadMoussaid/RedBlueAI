'use client';

import { useState } from 'react';

export function StartAuditButton({ runId }: { runId: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleStart() {
    setState('loading');
    try {
      const res = await fetch(`/api/exercises/${runId}/trigger`, { method: 'POST' });
      if (!res.ok) throw new Error('Request failed');
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="card" style={{ padding: 20, background: '#eef7ee', border: '1px solid #cde3d4' }}>
        <strong style={{ color: '#1d7f5f' }}>Audit started</strong>
        <p style={{ marginTop: 6, color: '#1d7f5f' }}>
          The trigger signal was sent. The worker is now executing the exercise phases.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 20, background: 'var(--panel-alt)', border: '1px solid var(--border)' }}>
      <strong>Manual trigger required</strong>
      <p style={{ marginTop: 6, marginBottom: 16 }}>
        The worker has claimed this run and is holding. Press Start Audit to release it and begin execution.
      </p>
      <button
        onClick={handleStart}
        disabled={state === 'loading'}
        style={{
          padding: '10px 20px',
          background: state === 'loading' ? 'var(--border)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: 14,
          cursor: state === 'loading' ? 'not-allowed' : 'pointer'
        }}
      >
        {state === 'loading' ? 'Sending trigger...' : 'Start Audit'}
      </button>
      {state === 'error' ? (
        <p style={{ marginTop: 10, color: '#9a1f1f', fontSize: 13 }}>
          Failed to send trigger. Check that the web server is running and try again.
        </p>
      ) : null}
    </div>
  );
}
