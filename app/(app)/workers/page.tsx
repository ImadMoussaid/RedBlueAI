export const dynamic = 'force-dynamic';

import { WorkerFleetOverview } from '@/components/workers/worker-fleet-overview';
import { WorkerJobLane } from '@/components/workers/worker-job-lane';
import { getWorkerFleet, getQueueAssignments, getHeartbeatEvents } from '@/lib/workers/repository';

export default async function WorkersPage() {
  const [workerFleet, queueAssignments, heartbeatEvents] = await Promise.all([
    getWorkerFleet(),
    getQueueAssignments(),
    getHeartbeatEvents()
  ]);
  return (
    <div className="grid" style={{ gap: 24 }}>
      <header className="page-header">
        <span className="badge">Worker fleet</span>
        <h1>Track heartbeats, queue claims, and artifacts across distributed workers.</h1>
        <p>
          The control plane keeps durable state centralized while worker hosts claim approved runs, enforce guardrails,
          and stream progress back through heartbeats and artifact updates.
        </p>
      </header>

      <WorkerFleetOverview workers={workerFleet} heartbeats={heartbeatEvents} />
      <WorkerJobLane assignments={queueAssignments} />
    </div>
  );
}
