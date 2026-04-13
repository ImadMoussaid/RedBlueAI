import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.productName}`,
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
