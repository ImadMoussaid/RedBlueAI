import { AuthJourney } from '@/components/auth/auth-journey';
import { SignInForm } from '@/components/auth/sign-in-form';
import { authActions, signInHighlights, signInJourney } from '@/lib/auth/mock';

export default function SignInPage() {
  return (
    <main className="shell grid" style={{ gap: 24 }}>
      <section className="card" style={{ padding: 28, width: 'min(560px, 100%)', margin: '0 auto' }}>
        <header className="page-header" style={{ marginBottom: 18 }}>
          <span className="badge">Authentication</span>
          <h1>Sign in to your RedBlueAI workspace.</h1>
          <p>Enter your founder credentials to access the control plane.</p>
        </header>
        <SignInForm />
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
