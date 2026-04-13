import { Sidebar } from '@/components/layout/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="shell split-shell">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
