'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/runs', label: 'Runs', icon: '🎯' },
  { href: '/launch', label: 'Launch', icon: '⚡' },
  { href: '/apps/new', label: 'Add App', icon: '📱' },
  { href: '/consent', label: 'Consent', icon: '🤝' },
  { href: '/workers', label: 'Workers', icon: '🖥' },
  { href: '/billing', label: 'Billing', icon: '💳' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
          RedBlueAI
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Control Plane
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/apps/new' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                color: isActive ? 'white' : '#94a3b8',
                background: isActive ? '#1e293b' : 'transparent',
                borderRadius: 8,
                margin: '2px 8px',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Workspace */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b' }}>
        <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>
          Workspace
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>Founder workspace</div>
      </div>
    </aside>
  );
}
