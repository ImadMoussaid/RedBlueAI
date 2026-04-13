import { StatusPill } from '@/components/findings/status-pill';
import type { WorkerQueueAssignment } from '@/lib/workers/types';

export function WorkerJobLane({ assignments }: { assignments: WorkerQueueAssignment[] }) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap' }}>
        <div>
          <div className="kicker">Queue assignment</div>
          <h2 style={{ marginTop: 8 }}>How approved runs move through worker hosts</h2>
          <p style={{ marginTop: 10 }}>
            Each approved request is visible with its assigned worker, current phase, and artifact state so operators can spot drift early.
          </p>
        </div>
      </div>

      <div className="grid three" style={{ marginTop: 18 }}>
        {assignments.map((assignment) => (
          <article key={assignment.runId} className="card" style={{ padding: 18, background: 'var(--panel-alt)', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
              <div>
                <div className="kicker">{assignment.runId}</div>
                <h3 style={{ marginTop: 8 }}>{assignment.target}</h3>
              </div>
              <StatusPill tone={assignment.status} label={assignment.status} />
            </div>
            <p style={{ marginTop: 10 }}><strong>Worker:</strong> {assignment.assignedWorker}</p>
            <p><strong>Phase:</strong> {assignment.phase}</p>
            <p><strong>Artifacts:</strong> {assignment.artifactState}</p>
            <p>{assignment.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
