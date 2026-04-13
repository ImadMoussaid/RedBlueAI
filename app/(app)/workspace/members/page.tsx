import { workspaceMembers } from '@/lib/workspace/mock';

export default function WorkspaceMembersPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Members</span>
        <h1>Workspace access stays small and explicit in the MVP.</h1>
        <p>
          This slice sets up the operator, signer, and reviewer roles that will later map to real permissions
          once the auth backend is in place.
        </p>
      </header>

      <section className="card" style={{ padding: 24 }}>
        <div className="grid two">
          {workspaceMembers.map((member) => (
            <article key={member.name} className="card" style={{ padding: 18, background: 'var(--panel-alt)' }}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>Access: {member.access}</p>
              <p>Status: {member.status}</p>
              <p>Last active: {member.lastActive}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
