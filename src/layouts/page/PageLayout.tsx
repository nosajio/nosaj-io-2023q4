import Navigation from '@/components/navigation/Navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import s from './PageLayout.module.scss';

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={s.page}>
      <header className={s.masthead}>
        <h1 className={s.jason_logo}>
          <Link href="/">nosaj.io</Link>
        </h1>
        <Navigation />
      </header>
      <div className={s.content}>{children}</div>
    </div>
  );
}
