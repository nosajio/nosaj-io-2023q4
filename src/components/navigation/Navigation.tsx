'use client';
import XLogo from '@/../public/ui/x_logo_nav.svg?svgr';
import cn from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import s from './Navigation.module.scss';

const pages = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Posts',
    href: '/r',
  },
  // {
  //   label: 'Feed',
  //   href: '/rss',
  //   blank: true,
  // },
];

export default function Navigation() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className={s.nav}>
      <Hamburger onClick={() => setShowMobileNav(v => !v)} />
      <ul
        className={cn(s.nav_links, { [s.visible]: showMobileNav })}
        onClick={() => setShowMobileNav(false)}
      >
        {pages.map((page, i) => (
          <li className={s.nav_link} key={i}>
            <Link href={page.href}>{page.label}</Link>
          </li>
        ))}
        <li className={s.nav_link}>
          <Link target="_blank" href="https://x.com/nosajio">
            <XLogo className={s.nav_svg} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

type HamburgerProps = {
  onClick?: () => void;
};

function Hamburger({ onClick }: HamburgerProps) {
  return (
    <button className={s.hamburger} onClick={() => onClick?.()}>
      <div className={s.hamburger_border}>
        <div className={s.hamburger_line} />
        <div className={s.hamburger_line} />
        <div className={s.hamburger_line} />
      </div>
    </button>
  );
}
