import { AlertProvider } from '@/context/AlertContext';
import PageLayout from '@/layouts/page/PageLayout';
import '@/styles/globals.scss';
import cn from 'classnames';
import { GeistMono, GeistSans } from 'geist/font';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'nosaj.io',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body>
        <AlertProvider>
          <PageLayout>{children}</PageLayout>
        </AlertProvider>
      </body>
    </html>
  );
}
