import { AppTargetCard } from '@/components/apps/app-target-card';
import { appTargets } from '@/lib/apps/mock';

export default function AppsPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Apps</span>
        <h1>Track customer apps before they become controlled exercises.</h1>
        <p>
          This overview exists so onboarding feels like a real product surface rather than a one-off form.
        </p>
      </header>

      <section className="grid two">
        {appTargets.map((target) => (
          <AppTargetCard key={target.name} target={target} />
        ))}
      </section>

      <section className="card" style={{ padding: 24 }}>
        <h2>Onboarding checkpoints</h2>
        <ul className="list" style={{ marginTop: 16 }}>
          <li>Target identity is captured and owned by a workspace.</li>
          <li>Allowed domains and blocked domains are explicit.</li>
          <li>Guardrails are frozen before an exercise request is created.</li>
          <li>API spec and login flow details are optional but supported.</li>
        </ul>
      </section>
    </div>
  );
}
