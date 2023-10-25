export const ROOT_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3003`
    : 'https://nosaj.io';

export const getUnsubscribeLink = (token: string, emailId?: string) =>
  `${ROOT_URL}/unsubscribe?token=${token}&eid=${emailId ?? 'na'}`;

export const NOREPLY_EMAIL = 'Jason<noreply@email.nosaj.io>';
export const REPLYTO_EMAIL = 'newsletter@nosaj.io';
