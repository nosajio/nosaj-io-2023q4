import { PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV !== 'production';

const prismaSingleton = () => {
  return new PrismaClient(isDev ? { log: ['query'] } : undefined);
};
type PrismaClientSingleton = ReturnType<typeof prismaSingleton>;

const globalThisWithPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton;
};

if (!globalThisWithPrisma.prisma) {
  globalThisWithPrisma.prisma = prismaSingleton();
}

const client = globalThisWithPrisma.prisma ?? prismaSingleton();

export default client;

if (isDev) {
  globalThisWithPrisma.prisma = client;
}
