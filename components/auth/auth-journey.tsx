import type { AuthActionLink, AuthHighlight, AuthJourneyStep } from '@/lib/auth/types';

export function AuthJourney({
  badge,
  title,
  highlights,
  journey,
  actions
}: {
  badge: string;
  title: string;
  highlights: AuthHighlight[];
  journey: AuthJourneyStep[];
  actions: AuthActionLink[];
}) {
  return (
    <section className="grid" style={{ gap: 18 }}>
      <div className="badge">{badge}</div>
      <div className="grid three">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="card metric">
            <h3>{highlight.title}</h3>
            <p>{highlight.detail}</p>
          </article>
        ))}
      </div>
      <section className="card" style={{ padding: 24 }}>
        <h2>{title}</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {journey.map((step) => (
            <div key={step.title} className="timeline-item">
              <span />
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
                <p style={{ textTransform: 'capitalize' }}>{step.status}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="button-row" style={{ marginTop: 18 }}>
          {actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={action.href === '/sign-in' ? 'button primary' : 'button secondary'}
            >
              {action.label}
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
