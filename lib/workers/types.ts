export type WorkerStatus = 'healthy' | 'busy' | 'degraded' | 'idle';

export type WorkerAssignmentStatus = 'queued' | 'assigned' | 'waiting_for_trigger' | 'running' | 'reporting' | 'completed' | 'blocked';

export interface WorkerFleetNode {
  id: string;
  hostLabel: string;
  region: string;
  status: WorkerStatus;
  model: string;
  load: string;
  currentJob: string;
  lastHeartbeat: string;
  capabilities: string[];
}

export interface WorkerQueueAssignment {
  runId: string;
  target: string;
  status: WorkerAssignmentStatus;
  assignedWorker: string;
  phase: string;
  artifactState: string;
  note: string;
}

export interface WorkerHeartbeatEvent {
  id: string;
  worker: string;
  at: string;
  status: WorkerStatus;
  message: string;
}
