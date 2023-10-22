import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import XLogo from '../../../public/ui/x_logo_nav.svg?svgr';
import s from './PageLayout.module.scss';

type PageLayoutProps = {
  children: ReactNode;
};

const pages = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Posts',
    href: '/posts',
  },
  {
    label: 'Feed',
    href: '/rss',
    blank: true,
  },
];

console.log(XLogo);

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={s.page}>
      <header className={s.masthead}>
        <h1 className={s.jason_logo}>
          <Link href="/">Jason Howmans</Link>
        </h1>
        <nav className={s.nav}>
          <ul className={s.nav_links}>
            {pages.map((page, i) => (
              <li className={s.nav_link} key={i}>
                <Link href={page.href}>{page.label}</Link>
              </li>
            ))}
            <li className={clsx(s.nav_link, s.nav_svg)}>
              <Link target="_blank" href="https://x.com/nosajio">
                <XLogo />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
