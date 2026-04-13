export default function RegisterPage() {
  return (
    <main className="shell">
      <section className="card" style={{ padding: 28, width: 'min(720px, 100%)', margin: '0 auto' }}>
        <header className="page-header" style={{ marginBottom: 18 }}>
          <span className="badge">Workspace setup</span>
          <h1>Create the first workspace for a customer pilot.</h1>
          <p>This starter flow captures the operator account and the initial workspace shell for issue #3.</p>
        </header>
        <div className="form-grid two">
          <label>
            Full name
            <input placeholder="Imad Moussaid" />
          </label>
          <label>
            Workspace name
            <input placeholder="RedBlueAI Pilot Workspace" />
          </label>
          <label>
            Email
            <input type="email" placeholder="imad@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Choose a strong password" />
          </label>
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          <a href="/workspace" className="button primary">Create workspace shell</a>
          <a href="/sign-in" className="button secondary">Already have an account</a>
        </div>
      </section>
    </main>
  );
}
