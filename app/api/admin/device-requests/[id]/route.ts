import { NextRequest, NextResponse } from "next/server";
import {
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

const STATUSES = new Set(["new", "in_progress", "done"]);

type Params = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  const id = Number(params.id);
  if (!Number.isInteger(id)) return badRequest("invalid id");
  try {
    const body = await req.json();
    const status = typeof body?.status === "string" ? body.status : "";
    if (!STATUSES.has(status)) return badRequest("invalid status");
    await db.deviceRequest.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
