import crypto from "node:crypto";

export const SESSION_COOKIE = "skynova_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "skynova-dev-secret";
}

export function createSessionValue(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const signature = crypto
    .createHmac("sha256", secret())
    .update(String(expires))
    .digest("base64url");
  return `${expires}.${signature}`;
}

export function verifySessionValue(token: string | undefined | null): boolean {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expected = crypto
    .createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function sessionMaxAge(): number {
  return MAX_AGE_SECONDS;
}
