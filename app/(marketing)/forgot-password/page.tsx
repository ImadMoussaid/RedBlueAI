import { AuthShell } from '@/components/auth/auth-shell';
import { passwordRecoveryHighlights, passwordRecoveryJourney } from '@/lib/auth/mock';

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      badge="Account recovery"
      title="Recover access without breaking the pilot workflow."
      description="The MVP keeps password recovery lightweight so operators can get back into the workspace quickly."
      highlights={passwordRecoveryHighlights}
      journey={passwordRecoveryJourney}
      footerNote="This screen is mock-backed for now and will be replaced by the real auth flow later."
    >
      <section className="card" style={{ padding: 28 }}>
        <header className="page-header" style={{ marginBottom: 18 }}>
          <span className="badge">Password reset</span>
          <h1>Request a recovery link.</h1>
          <p>Enter the workspace email tied to the operator account.</p>
        </header>

        <div className="form-grid">
          <label>
            Email
            <input type="email" placeholder="founder@redblueai.com" />
          </label>
        </div>

        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/verify-email" className="button primary">Send recovery link</a>
          <a href="/sign-in" className="button secondary">Back to sign in</a>
        </div>
      </section>
    </AuthShell>
  );
}
