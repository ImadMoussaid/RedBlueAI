export const dynamic = 'force-dynamic';

import { WorkspaceOverview } from '@/components/workspace/workspace-overview';
import { getWorkspaceData } from '@/lib/workspace/repository';
import {
  workspaceActivity,
  workspacePolicies
} from '@/lib/workspace/mock';

export default async function WorkspacePage() {
  const { header: workspaceHeader, targets: workspaceTargets, members: workspaceMembers, metrics: workspaceMetrics } = await getWorkspaceData();
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
