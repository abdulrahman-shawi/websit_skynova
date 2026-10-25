import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";

export const CUSTOMER_COOKIE = "skynova_customer";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  return process.env.SESSION_SECRET || "skynova-dev-secret";
}

export function createCustomerSessionValue(customerId: number): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${customerId}.${expires}`;
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyCustomerSessionValue(
  token: string | undefined | null
): number | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [customerId, expires, signature] = parts;
  const expected = crypto
    .createHmac("sha256", secret())
    .update(`${customerId}.${expires}`)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (!Number.isFinite(Number(expires)) || Number(expires) < Date.now()) return null;
  const id = Number(customerId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function customerSessionMaxAge(): number {
  return MAX_AGE_SECONDS;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return test.length === expected.length && crypto.timingSafeEqual(test, expected);
}

export function normalizePhone(phone: unknown): string {
  return typeof phone === "string" ? phone.replace(/[^\d+]/g, "").replace(/^\+/, "") : "";
}

export async function getCurrentCustomer() {
  const id = verifyCustomerSessionValue(cookies().get(CUSTOMER_COOKIE)?.value);
  if (!id) return null;
  const db = getDb();
  if (!db) return null;
  try {
    return await db.customer.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
