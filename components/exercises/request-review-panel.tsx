import { StatusPill } from '@/components/findings/status-pill';
import type { ExerciseLifecycleStage, ExerciseRequestReview } from '@/lib/exercises/types';

export function RequestReviewPanel({
  requests,
  approvalPath,
  blockedPath
}: {
  requests: ExerciseRequestReview[];
  approvalPath: ExerciseLifecycleStage[];
  blockedPath: ExerciseLifecycleStage[];
}) {
  return (
    <section className="grid two" style={{ gap: 24 }}>
      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Approval flow</div>
        <h2 style={{ marginTop: 8 }}>Approve or block before a request can queue</h2>
        <p style={{ marginTop: 10 }}>
          Every run follows the same operator gate: review the frozen request, approve it into the queue, or block it and send it back with a reason.
        </p>

        <div className="timeline" style={{ marginTop: 18 }}>
          {approvalPath.map((stage) => (
            <div key={stage.title} className="timeline-item">
              <span />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{stage.title}</strong>
                  <StatusPill tone={stage.tone} label={stage.tone.replaceAll('_', ' ')} />
                </div>
                <p>{stage.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16, padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
          <div className="kicker">Blocked branch</div>
          <div className="timeline" style={{ marginTop: 12 }}>
            {blockedPath.map((stage) => (
              <div key={stage.title} className="timeline-item">
                <span />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <strong>{stage.title}</strong>
                    <StatusPill tone={stage.tone} label={stage.tone.replaceAll('_', ' ')} />
                  </div>
                  <p>{stage.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="card" style={{ padding: 24 }}>
        <div className="kicker">Request review queue</div>
        <h2 style={{ marginTop: 8 }}>Visible approval and block transitions</h2>
        <div className="grid" style={{ gap: 12, marginTop: 18 }}>
          {requests.map((request) => (
            <div key={request.id} className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                <div>
                  <div className="kicker">{request.id}</div>
                  <h3 style={{ marginTop: 8 }}>{request.target}</h3>
                </div>
                <StatusPill tone={request.status} label={request.status.replaceAll('_', ' ')} />
              </div>

              <p style={{ marginTop: 10 }}>
                {request.type} · requested {request.requestedAt}
              </p>
              <p><strong>Consent:</strong> {request.consent}</p>
              <p><strong>Guardrails:</strong> {request.guardrails}</p>
              <p><strong>Review outcome:</strong> {request.reviewDecision.replaceAll('_', ' ')}</p>
              <p><strong>Reviewer note:</strong> {request.reviewSummary}</p>
              <p><strong>Next transition:</strong> {request.nextTransition}</p>
              <p><strong>Worker:</strong> {request.worker}</p>
              <div className="button-row" style={{ marginTop: 14 }}>
                <span className="button secondary">{request.reviewer}</span>
                <span className="button primary">
                  {request.reviewTone === 'blocked' ? 'Returned to operator' : 'Approved for the next state'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
