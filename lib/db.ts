import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> | null {
  if (!process.env.DATABASE_URL) return null;
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

export async function dbHealth(): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
