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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
        />
        <link rel="stylesheet" href="https://use.typekit.net/llb7ehz.css" />
      </head>
      <body>
        <AlertProvider>
          <PageLayout>{children}</PageLayout>
        </AlertProvider>
      </body>
    </html>
  );
}
