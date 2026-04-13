import { WorkspaceOverview } from '@/components/workspace/workspace-overview';
import {
  workspaceActivity,
  workspaceHeader,
  workspaceMembers,
  workspaceMetrics,
  workspacePolicies,
  workspaceTargets
} from '@/lib/workspace/mock';

export default function WorkspacePage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Workspace foundation</span>
        <h1>{workspaceHeader.title}</h1>
        <p>{workspaceHeader.subtitle}</p>
        <p>
          Owner: {workspaceHeader.owner} · Region: {workspaceHeader.region} · {workspaceHeader.totalApps} targets ·{' '}
          {workspaceHeader.activeWorkers} active workers
        </p>
      </header>

      <WorkspaceOverview
        metrics={workspaceMetrics}
        targets={workspaceTargets}
        members={workspaceMembers}
        activity={workspaceActivity}
        policies={workspacePolicies}
      />
    </div>
  );
}
