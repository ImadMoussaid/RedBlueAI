import { StatusPill } from '@/components/findings/status-pill';
import { exerciseRunDetails } from '@/lib/exercises/mock';
import { findings, runDetails as findingRunDetails, runs } from '@/lib/findings/mock';

export default function RunDetailPage({ params }: { params: { runId: string } }) {
  const run = runs.find((item) => item.id === params.runId) ?? runs[0];
  const detail = exerciseRunDetails[run.id] ?? exerciseRunDetails['run-acme-001'];
  const findingDetail = findingRunDetails[run.id] ?? findingRunDetails['run-acme-001'];
  const runFindings = findingDetail?.findings ?? findings;

  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Run detail</span>
        <h1>{run.target}</h1>
        <p>
          {detail.summary} This view keeps operator approval history, worker assignment, findings, and report status in one place.
        </p>
      </header>

      <section className="grid two">
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Status snapshot</div>
          <h2 style={{ marginTop: 8 }}>{detail.reportStatus}</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <strong>Lifecycle</strong>
              <StatusPill tone={run.status} label={run.status.replaceAll('_', ' ')} />
            </div>
            <p><strong>Consent:</strong> {run.consent}</p>
            <p><strong>Worker:</strong> {run.worker}</p>
            <p><strong>Guardrails:</strong> {run.guardrails}</p>
            <p><strong>Requested:</strong> {run.requestedAt}</p>
            <p><strong>Review summary:</strong> {detail.summary}</p>
          </div>
        </article>
        <article className="card" style={{ padding: 24 }}>
          <div className="kicker">Summary</div>
          <h2 style={{ marginTop: 8 }}>Actionable output</h2>
          <div className="grid two" style={{ gap: 12, marginTop: 18 }}>
            <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <strong>Detections triggered</strong>
              <h3 style={{ marginTop: 8, fontSize: '2rem' }}>{findingDetail.detectionsTriggered}</h3>
            </div>
            <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <strong>Detections missed</strong>
              <h3 style={{ marginTop: 8, fontSize: '2rem' }}>{findingDetail.detectionsMissed}</h3>
            </div>
          </div>
          <div className="card" style={{ padding: 16, background: 'var(--panel-alt)', boxShadow: 'none', marginTop: 12 }}>
            <strong>Top fixes</strong>
            <ul className="list" style={{ marginTop: 10 }}>
              {findingDetail.topFixes.map((fix) => (
                <li key={fix}>{fix}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <div className="kicker">Approval trail</div>
        <h2 style={{ marginTop: 8 }}>Request review and visible transitions</h2>
        <div className="timeline" style={{ marginTop: 18 }}>
          {detail.approvalTrail.map((step) => (
            <div key={step.title} className="timeline-item">
              <span />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{step.title}</strong>
                  <StatusPill tone={step.tone} label={step.tone.replaceAll('_', ' ')} />
                </div>
                <p style={{ marginTop: 6 }}>
                  {step.actor} · {step.at}
                </p>
                <p>{step.note}</p>
              </div>
            </div>
          ))}
        </div>
        {detail.blockedReasons.length > 0 ? (
          <div className="card" style={{ marginTop: 16, padding: 16, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <strong>Block reasons</strong>
            <ul className="list" style={{ marginTop: 10 }}>
              {detail.blockedReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="card" style={{ padding: 24 }}>
        <div className="kicker">Operator next steps</div>
        <h2 style={{ marginTop: 8 }}>How the request moves forward</h2>
        <ul className="list" style={{ marginTop: 12 }}>
          {detail.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <div className="kicker">Finding detail</div>
        <h2 style={{ marginTop: 8 }}>Operator review summary</h2>
        <div className="grid two" style={{ marginTop: 18 }}>
          {runFindings.map((finding) => (
            <article key={finding.id} className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                <div>
                  <div className="kicker">{finding.category}</div>
                  <h3 style={{ marginTop: 8 }}>{finding.title}</h3>
                </div>
                <StatusPill tone={finding.severity} label={finding.severity} />
              </div>
              <p style={{ marginTop: 8 }}>{finding.summary}</p>
              <p><strong>Evidence:</strong> {finding.evidence}</p>
              <p><strong>Action:</strong> {finding.action}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
