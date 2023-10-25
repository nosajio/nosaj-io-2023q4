import client from '@/db/client';

export async function newEvent(type: string, metadata?: Record<string, any>) {
  try {
    const event = await client.event.create({
      data: {
        event: type,
        data: metadata || {},
      },
    });
    return event;
  } catch (err) {
    // Swallow errors when writing events. No exceptions should occur based on
    // this operation since it's a side-effect of other operations.
    console.error(err);
    return undefined;
  }
}
