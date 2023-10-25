import { AlertProvider } from '@/context/AlertContext';
import PageLayout from '@/layouts/page/PageLayout';
import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'nosaj.io',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>
          <PageLayout>{children}</PageLayout>
        </AlertProvider>
      </body>
    </html>
  );
}
