import { WorkspaceNav } from '@/components/workspace/workspace-nav';
import { workspaceHeader } from '@/lib/workspace/mock';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid" style={{ gap: 22 }}>
      <header className="page-header">
        <span className="badge">Workspace shell</span>
        <h1>{workspaceHeader.title}</h1>
        <p>
          {workspaceHeader.subtitle} This route family is the foundation for issue #3 and will eventually
          anchor real auth, workspace switching, and target ownership.
        </p>
      </header>
      <WorkspaceNav />
      {children}
    </div>
  );
}
