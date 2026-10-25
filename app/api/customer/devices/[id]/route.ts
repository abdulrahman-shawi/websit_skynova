import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyCustomerSessionValue, CUSTOMER_COOKIE } from "@/lib/customer-auth";

type Params = { params: { id: string } };

export async function DELETE(req: NextRequest, { params }: Params) {
  const customerId = verifyCustomerSessionValue(
    req.cookies.get(CUSTOMER_COOKIE)?.value
  );
  const db = getDb();
  if (!customerId || !db) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  try {
    const existing = await db.customerDevice.findFirst({
      where: { id, customerId },
    });
    if (!existing) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    await db.customerDevice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
