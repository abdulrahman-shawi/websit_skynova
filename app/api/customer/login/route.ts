import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  createCustomerSessionValue,
  customerSessionMaxAge,
  CUSTOMER_COOKIE,
  normalizePhone,
  verifyPassword,
} from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const phone = normalizePhone(body?.phone);
    const password = typeof body?.password === "string" ? body.password : "";
    if (!phone || !password) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const customer = await db.customer.findUnique({ where: { phone } });
    if (!customer || !verifyPassword(password, customer.passwordHash)) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 }
      );
    }

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
