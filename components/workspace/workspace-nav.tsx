const tabs = [
  { href: '/workspace', label: 'Overview' },
  { href: '/workspace/members', label: 'Members' },
  { href: '/workspace/activity', label: 'Activity' },
  { href: '/workspace/settings', label: 'Settings' }
];

export function WorkspaceNav() {
  return (
    <div className="card" style={{ padding: 12 }}>
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {tabs.map((tab, index) => (
          <a
            key={tab.href}
            href={tab.href}
            className={index === 0 ? 'button primary' : 'button secondary'}
            style={{ padding: '10px 14px' }}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
