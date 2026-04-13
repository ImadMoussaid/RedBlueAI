import { AuthShell } from '@/components/auth/auth-shell';
import { passwordRecoveryHighlights, passwordRecoveryJourney } from '@/lib/auth/mock';

export default function VerifyEmailPage() {
  return (
    <AuthShell
      badge="Email verification"
      title="Confirm your workspace email and continue."
      description="Verification is a temporary mock step that preserves the future shape of the auth flow."
      highlights={passwordRecoveryHighlights}
      journey={passwordRecoveryJourney}
      footerNote="Once the real session stack lands, this route can become the email verification checkpoint."
    >
      <section className="card" style={{ padding: 28 }}>
        <header className="page-header" style={{ marginBottom: 18 }}>
          <span className="badge">Verification</span>
          <h1>Check your inbox.</h1>
          <p>We would normally send a sign-in or reset link here. For now this keeps the structure in place.</p>
        </header>

        <div className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
          <strong>Next step</strong>
          <p style={{ marginTop: 8 }}>
            Once backend auth is implemented, this page becomes the landing point for email verification and
            recovery completion.
          </p>
        </div>

        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/sign-in" className="button primary">Return to sign in</a>
          <a href="/register" className="button secondary">Create workspace</a>
        </div>
      </section>
    </AuthShell>
  );
}
