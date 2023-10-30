import { useState } from 'react';

export default function useSubscribe() {
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

  return {
    handleSubscribe,
    subscriptionState,
    emailAddress,
    setEmailAddress,
    emailStatus,
  };
}
