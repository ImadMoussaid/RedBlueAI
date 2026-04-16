import { CreateAppForm } from '@/components/apps/create-app-form';
import Link from 'next/link';

export default function AddAppPage() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          <Link href="/dashboard" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Dashboard</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>Add App</span>
        </div>
        <h1 className="page-title">Register a target app</h1>
        <p className="page-subtitle">Add the web app or API you want audited. Scope and guardrails are frozen at launch time.</p>
      </div>

      {/* Form card */}
      <div className="card" style={{ padding: 28, maxWidth: 640 }}>
        <div style={{ marginBottom: 20 }}>
          <div className="section-title">App details</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            Provide the base URL, type, and any relevant notes for this target.
          </div>
        </div>
        <CreateAppForm />
      </div>
    </div>
  );
}
