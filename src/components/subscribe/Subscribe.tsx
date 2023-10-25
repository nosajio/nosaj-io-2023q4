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
  const [subscriptionState, setSubscriptionState] = useState<
    'loading' | 'idle'
  >('idle');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailStatus, setEmailStatus] = useState<
    'empty' | 'invalid' | 'exists' | 'created' | 'error' | undefined
  >();

  const handleSubscribe = () => {
    if (!emailAddress) {
      return setEmailStatus('empty');
    }
    if (!emailAddress.includes('@')) {
      return setEmailStatus('invalid');
    }
    setSubscriptionState('loading');
    fetch('/api/subscribe', {
      body: JSON.stringify({ email: emailAddress }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }).then(async res => {
      setSubscriptionState('idle');
      const json = await res.json();
      if (json.error?.code === 'EXISTS') {
        return setEmailStatus('exists');
      }
      if (json.error?.code === 'ERROR') {
        return setEmailStatus('error');
      }
      if (res.status === 201) {
        return setEmailStatus('created');
      }
    });
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
            <button
              disabled={subscriptionState === 'loading'}
              className={s.button}
              onClick={handleSubscribe}
            >
              {subscriptionState === 'loading' ? 'Sending...' : 'Subscribe'}
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
