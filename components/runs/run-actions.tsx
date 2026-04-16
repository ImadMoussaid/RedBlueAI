'use client';

import { useState } from 'react';

export function RunActions({ runId, status }: { runId: string; status: string }) {
  const [loading, setLoading] = useState<'approve' | 'block' | null>(null);
  const [done, setDone] = useState(false);

  if (done || !['pending_manual_start'].includes(status)) return null;

  async function approve() {
    setLoading('approve');
    await fetch(`/api/exercises/${runId}/approve`, { method: 'POST' });
    setLoading(null);
    setDone(true);
    window.location.reload();
  }

  async function block() {
    setLoading('block');
    await fetch(`/api/exercises/${runId}/block`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason: 'Blocked by founder.' }) });
    setLoading(null);
    setDone(true);
    window.location.reload();
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button className="button primary" onClick={approve} disabled={!!loading} style={{ fontSize: 13, padding: '6px 14px' }}>
        {loading === 'approve' ? '…' : 'Approve'}
      </button>
      <button className="button secondary" onClick={block} disabled={!!loading} style={{ fontSize: 13, padding: '6px 14px' }}>
        {loading === 'block' ? '…' : 'Block'}
      </button>
    </div>
  );
}
