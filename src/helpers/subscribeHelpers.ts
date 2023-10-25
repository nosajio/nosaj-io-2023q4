import { ROOT_URL, getUnsubscribeLink } from '@/config/constants';
import client from '@/db/client';
import short from 'short-uuid';
import { sendEmail } from './emailHelpers';

const getConfirmLink = (token: string) => `${ROOT_URL}?token=${token}`;

export async function saveConfirmationWithToken(token: string) {
  const subscriber = await client.subscriber.findFirst({
    where: { confirmToken: token },
  });
  if (!subscriber) {
    return false;
  }
  await client.subscriber.update({
    where: { id: subscriber.id },
    data: {
      confirmDate: new Date(),
    },
  });
  return true;
}

async function sendConfirmationEmail(email: string, confirmToken: string) {
  // Get subscriber from db, ensure they're not yet confirmed
  const subscriber = await client.subscriber.findFirst({
    where: { email },
  });
  if (subscriber?.confirmDate) {
    return false;
  }

  // Generate email body
  const confirmLink = getConfirmLink(confirmToken);
  const unsubscribeLink = getUnsubscribeLink(confirmToken, 'confirm');
  const emailHTML = `
    <p>
      Please click the link below to confirm your email:
    </p>
    <p> 
      <a href="${confirmLink}">Confirm.</a>
    </p>
    <p>
      Thanks,<br/>Jason
    </p>
    <p>PS - changed your mind? <a href="${unsubscribeLink}">Unsubscribe</a></p>
    `;
  const emailPlain = `Please follow this link to confirm your email: ${confirmLink}`;

  // Send the confirmation email
  return await sendEmail(
    email,
    'Thanks for subscribing! Please confirm your email address',
    emailHTML,
    emailPlain,
  );
}

export async function createNewSubscriber(email: string) {
  const confirmToken = short.generate();
  const result = await saveSubscriber(email, confirmToken);
  if (result === 'created') {
    await sendConfirmationEmail(email, confirmToken);
  }
  return result;
}

export async function saveSubscriber(
  email: string,
  confirmToken: string,
): Promise<'exists' | 'created' | 'error'> {
  const exists = await client.subscriber.findFirst({ where: { email } });
  if (exists) return 'exists';
  try {
    await client.subscriber.create({ data: { email, confirmToken } });
    return 'created';
  } catch (error) {
    console.error(error);
    return 'error';
  }
}
