import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionValue } from "./auth";

export function isAdminRequest(): boolean {
  return verifySessionValue(cookies().get(SESSION_COOKIE)?.value);
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(): NextResponse {
  return NextResponse.json({ error: "server error" }, { status: 500 });
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function asNullableString(value: unknown): string | null {
  const str = asString(value);
  return str === "" ? null : str;
}

export function asBoolean(value: unknown): boolean {
  return value === true;
}
