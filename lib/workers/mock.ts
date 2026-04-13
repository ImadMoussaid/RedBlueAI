import type { WorkerFleetNode, WorkerHeartbeatEvent, WorkerQueueAssignment } from './types';

export const workerFleet: WorkerFleetNode[] = [
  {
    id: 'worker-eu-01',
    hostLabel: 'worker-eu-01',
    region: 'eu-central founder host',
    status: 'busy',
    model: 'qwen3:14b',
    load: '81%',
    currentJob: 'RB-002',
    lastHeartbeat: '30 sec ago',
    capabilities: ['authenticated web', 'api replay', 'pdf packaging']
  },
  {
    id: 'worker-us-02',
    hostLabel: 'worker-us-02',
    region: 'us-east burst host',
    status: 'healthy',
    model: 'qwen3:14b',
    load: '42%',
    currentJob: 'RB-004',
    lastHeartbeat: '2 min ago',
    capabilities: ['authenticated web', 'browser evidence', 'report generation']
  },
  {
    id: 'worker-lab-03',
    hostLabel: 'worker-lab-03',
    region: 'lab overflow host',
    status: 'idle',
    model: 'qwen3:14b',
    load: '0%',
    currentJob: 'Unassigned',
    lastHeartbeat: 'just now',
    capabilities: ['api replay', 'safe checks', 'artifact sync']
  }
];

export const queueAssignments: WorkerQueueAssignment[] = [
  {
    runId: 'RB-002',
    target: 'Northwind API',
    status: 'running',
    assignedWorker: 'worker-eu-01',
    phase: 'Red team checks',
    artifactState: 'Evidence syncing, report pending',
    note: 'Worker heartbeat is healthy and the queue lease is active.'
  },
  {
    runId: 'RB-004',
    target: 'Fabrikam checkout',
    status: 'assigned',
    assignedWorker: 'worker-us-02',
    phase: 'Recon and app mapping',
    artifactState: 'Artifact directories created',
    note: 'Claim accepted after founder approval and credential preflight.'
  },
  {
    runId: 'RB-001',
    target: 'Acme staging portal',
    status: 'blocked',
    assignedWorker: 'Unassigned',
    phase: 'Awaiting manual review',
    artifactState: 'No worker artifacts created',
    note: 'Blocked requests never leave the control plane until scope is corrected.'
  }
];

export const heartbeatEvents: WorkerHeartbeatEvent[] = [
  {
    id: 'hb-001',
    worker: 'worker-eu-01',
    at: '2026-04-13 16:07 CET',
    status: 'busy',
    message: 'Run RB-002 is still active and progressing through safe checks.'
  },
  {
    id: 'hb-002',
    worker: 'worker-us-02',
    at: '2026-04-13 16:06 CET',
    status: 'healthy',
    message: 'Run RB-004 claimed successfully; browser inventory phase started.'
  },
  {
    id: 'hb-003',
    worker: 'worker-lab-03',
    at: '2026-04-13 16:05 CET',
    status: 'idle',
    message: 'Worker is registered, healthy, and waiting for the next approved queue item.'
  }
];
