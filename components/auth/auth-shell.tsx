import type { ReactNode } from 'react';
import type { AuthHighlight, AuthJourneyStep } from '@/lib/auth/types';

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  highlights: AuthHighlight[];
  journey: AuthJourneyStep[];
  children: ReactNode;
  footerNote: string;
};

const toneStyles: Record<AuthJourneyStep['status'], string> = {
  complete: 'var(--success)',
  current: 'var(--accent)',
  pending: 'var(--muted)'
};

export function AuthShell({
  badge,
  title,
  description,
  highlights,
  journey,
  children,
  footerNote
}: AuthShellProps) {
  return (
    <section className="grid two" style={{ alignItems: 'start' }}>
      <aside className="card hero" style={{ padding: 28 }}>
        <span className="badge">{badge}</span>
        <div className="page-header" style={{ marginTop: 18, marginBottom: 0 }}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className="grid" style={{ gap: 14, marginTop: 22 }}>
          {highlights.map((highlight) => (
            <article key={highlight.title} className="card" style={{ padding: 16, background: 'rgba(255,255,255,0.72)' }}>
              <strong>{highlight.title}</strong>
              <p>{highlight.detail}</p>
            </article>
          ))}
        </div>

        <div className="card" style={{ padding: 18, marginTop: 22, background: 'rgba(255,255,255,0.82)' }}>
          <h3>Auth journey</h3>
          <div className="timeline" style={{ marginTop: 12 }}>
            {journey.map((step) => (
              <div key={step.title} className="timeline-item">
                <span style={{ background: toneStyles[step.status] }} />
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: 20, color: 'var(--muted)' }}>{footerNote}</p>
      </aside>

      <div>{children}</div>
    </section>
  );
}
