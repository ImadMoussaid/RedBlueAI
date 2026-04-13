import { AuthJourney } from '@/components/auth/auth-journey';
import { authActions, signInHighlights, signInJourney } from '@/lib/auth/mock';

export default function SignInPage() {
  return (
    <main className="shell grid" style={{ gap: 24 }}>
      <section className="card" style={{ padding: 28, width: 'min(560px, 100%)', margin: '0 auto' }}>
        <header className="page-header" style={{ marginBottom: 18 }}>
          <span className="badge">Authentication</span>
          <h1>Sign in to your RedBlueAI workspace.</h1>
          <p>Issue #3 will replace this starter screen with a real email/password authentication flow.</p>
        </header>
        <div className="form-grid">
          <label>
            Email
            <input type="email" placeholder="founder@redblueai.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/workspace" className="button primary">Continue to workspace</a>
          <a href="/register" className="button secondary">Create workspace</a>
        </div>
      </section>

      <AuthJourney
        badge="Operator access"
        title="How the auth foundation will flow"
        highlights={signInHighlights}
        journey={signInJourney}
        actions={authActions}
      />
    </main>
  );
}
