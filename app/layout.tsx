import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config/site';
import { AuthSessionProvider } from '@/components/auth/session-provider';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.productName}`,
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><AuthSessionProvider>{children}</AuthSessionProvider></body>
    </html>
  );
}
