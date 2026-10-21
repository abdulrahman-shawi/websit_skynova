import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

let prisma: PrismaClient | null = null;

export function getDb(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!prisma) {
    const adapter = new PrismaNeon({
      connectionString: process.env.DATABASE_URL,
    });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

export async function dbHealth(): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
