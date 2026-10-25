import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  createCustomerSessionValue,
  customerSessionMaxAge,
  CUSTOMER_COOKIE,
  hashPassword,
  normalizePhone,
} from "@/lib/customer-auth";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const name = asString(body?.name);
    const phone = normalizePhone(body?.phone);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    if (!/^\d{6,15}$/.test(phone)) {
      return NextResponse.json({ error: "invalid phone" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "password too short" }, { status: 400 });
    }

    const existing = await db.customer.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json(
        { error: "phone already registered" },
        { status: 409 }
      );
    }

    const customer = await db.customer.create({
      data: { name, phone, passwordHash: hashPassword(password) },
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(CUSTOMER_COOKIE, createCustomerSessionValue(customer.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: customerSessionMaxAge(),
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
