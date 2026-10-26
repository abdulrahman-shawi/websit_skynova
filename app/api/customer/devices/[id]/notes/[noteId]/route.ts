import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { findOwnedDevice } from "@/lib/customer-device";
import { CUSTOMER_COOKIE } from "@/lib/customer-auth";

type Params = { params: { id: string; noteId: string } };

export async function DELETE(req: NextRequest, { params }: Params) {
  const deviceId = Number(params.id);
  const noteId = Number(params.noteId);
  if (!Number.isInteger(deviceId) || !Number.isInteger(noteId)) {
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
    const note = await db.deviceNote.findFirst({ where: { id: noteId, deviceId } });
    if (!note) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    await db.deviceNote.delete({ where: { id: noteId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
