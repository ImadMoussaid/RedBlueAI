const links = [
  { href: '/workspace', label: 'Workspace' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/apps/new', label: 'Add app' },
  { href: '/consent', label: 'Consent' },
  { href: '/launch', label: 'Launch' },
  { href: '/runs', label: 'Runs' },
  { href: '/workers', label: 'Workers' },
  { href: '/billing', label: 'Billing' }
];

export function Sidebar() {
  return (
    <aside className="sidebar card">
      <div style={{ display: 'grid', gap: 6, marginBottom: 18 }}>
        <span className="kicker">RedBlueAI</span>
        <strong style={{ fontSize: '1.15rem' }}>RedBlueAI Control</strong>
      </div>
      <nav>
        {links.map((link, index) => (
          <a key={link.href} href={link.href} className={index === 0 ? 'active' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
