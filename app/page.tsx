import { DashboardMetrics } from '@/components/app/metrics';
import { MarketingHero } from '@/components/marketing/hero';

export default function HomePage() {
  return (
    <main className="shell">
      <MarketingHero />
      <section className="page-header" style={{ marginTop: 28 }}>
        <span className="badge">MVP foundation</span>
        <h1>Scaffolded for consent, queueing, and multi-host workers.</h1>
        <p>
          This starter includes the product shell, onboarding routes, Docker baseline, worker placeholder,
          and starter data model files so we can move directly into implementation.
        </p>
      </section>
      <DashboardMetrics />
    </main>
  );
}
