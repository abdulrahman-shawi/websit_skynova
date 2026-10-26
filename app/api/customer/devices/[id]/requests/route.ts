import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { findOwnedDevice } from "@/lib/customer-device";
import { CUSTOMER_COOKIE } from "@/lib/customer-auth";

const KINDS = new Set(["followup", "maintenance", "consult"]);

type Params = { params: { id: string } };

function deviceIdFrom(params: { id: string }): number | null {
  const id = Number(params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(req: NextRequest, { params }: Params) {
  const deviceId = deviceIdFrom(params);
  if (!deviceId) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const device = await findOwnedDevice(
    deviceId,
    req.cookies.get(CUSTOMER_COOKIE)?.value
  );
  if (!device) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ error: "server error" }, { status: 500 });
  try {
    const items = await db.deviceRequest.findMany({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const deviceId = deviceIdFrom(params);
  if (!deviceId) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const device = await findOwnedDevice(
    deviceId,
    req.cookies.get(CUSTOMER_COOKIE)?.value
  );
  if (!device) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ error: "server error" }, { status: 500 });
  try {
    const body = await req.json();
    const kind = typeof body?.kind === "string" ? body.kind : "followup";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!KINDS.has(kind)) {
      return NextResponse.json({ error: "invalid kind" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }
    const item = await db.deviceRequest.create({
      data: { deviceId, kind, message },
    });
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
