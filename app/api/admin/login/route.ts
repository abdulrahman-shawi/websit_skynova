import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionValue,
  sessionMaxAge,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured" },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const expected = Buffer.from(adminPassword);
  const given = Buffer.from(password);
  const valid =
    expected.length === given.length &&
    crypto.timingSafeEqual(expected, given);

  if (!valid) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge(),
    path: "/",
  });
  return res;
}
