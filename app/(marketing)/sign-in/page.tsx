export default function SignInPage() {
  return (
    <main className="shell">
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
          <a href="/" className="button secondary">Back to landing page</a>
        </div>
      </section>
    </main>
  );
}
