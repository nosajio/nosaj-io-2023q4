import { createNewSubscriber } from '@/helpers/subscribeHelpers';
import { NextResponse } from 'next/server';

const error = (code: string, message: string, status: number = 400) =>
  NextResponse.json(
    {
      error: {
        code,
        message,
      },
      success: false,
    },
    { status },
  );

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return error('MISSING', 'Email required');
  }
  const subscriber = await createNewSubscriber(email);
  if (subscriber === 'exists') {
    return error('EXISTS', 'Existing subscriber');
  }
  if (subscriber === 'error') {
    return error('ERROR', 'Error creating subscriber', 500);
  }
  return NextResponse.json({ success: true, error: null }, { status: 201 });
}
