'use client';
import RSSIcon from '@/../public/ui/rss_button.svg?svgr';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import s from './Subscribe.module.scss';

type SubscribeProps = {
  email?: boolean;
  rss?: boolean;
};

export default function Subscribe({ email, rss }: SubscribeProps) {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailStatus, setEmailStatus] = useState<
    'empty' | 'invalid' | 'exists' | 'created' | 'error' | undefined
  >();

  const handleSubscribe = () => {
    if (!emailAddress) return;
  };

  return (
    <div className={s.subscribe}>
      {email && (
        <div className={s.type}>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="email"
              placeholder="email@example.com"
              value={emailAddress}
              onChange={e => setEmailAddress(e.target.value)}
            />
            <button className={s.button} onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
          {emailStatus === 'invalid' && (
            <div className={clsx(s.status, s.status_negative)}>
              Please enter a valid email address
            </div>
          )}
          {emailStatus === 'exists' && (
            <div className={s.status}>You are already subscribed!</div>
          )}
          {emailStatus === 'created' && (
            <div className={clsx(s.status, s.status_positive)}>
              Welcome to the list! You are now subscribed. Look out for a
              confirmation email.
            </div>
          )}
          {emailStatus === 'error' && (
            <div className={clsx(s.status, s.status_negative)}>
              There was an issue saving your subscription. Please try again
              later.
            </div>
          )}
          {emailStatus === 'empty' && (
            <div className={s.status}>
              Enter your email address to subscribe
            </div>
          )}
        </div>
      )}
      {rss && (
        <div className={s.type}>
          <Link
            href="/rss"
            target="_blank"
            className={clsx(s.button, s.button_rss)}
          >
            <RSSIcon />
            RSS Feed
          </Link>
        </div>
      )}
    </div>
  );
}
