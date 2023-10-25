import { NOREPLY_EMAIL, REPLYTO_EMAIL } from '@/config/constants';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { newEvent } from './eventHelpers';

const ses = new SESClient({ region: 'us-east-1' });

/**
 * Send any email using AWS SES
 */
export const sendEmail = async (
  email: string,
  subject: string,
  html: string,
  plain: string,
) => {
  try {
    const cmd = new SendEmailCommand({
      ReplyToAddresses: [REPLYTO_EMAIL],
      Destination: {
        ToAddresses: [email],
      },
      Source: NOREPLY_EMAIL,
      Message: {
        Body: {
          Html: {
            Data: html,
          },
          Text: {
            Data: plain,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    });
    const receipt = await ses.send(cmd);
    if (!receipt.MessageId) {
      throw new Error(
        `Failed to send email to ${email}. Details: ${JSON.stringify(receipt)}`,
      );
    } else {
      console.log('Send email to %s, MessageId: %s', email, receipt.MessageId);
      return true;
    }
  } catch (err) {
    console.error(err);

    await newEvent('failed_operation', {
      operation: 'send_email',
      error: err instanceof Error ? err.message : '',
    });

    return false;
  }
};
