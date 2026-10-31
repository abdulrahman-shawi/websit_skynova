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
    const data: { status?: string; reply?: string; repliedAt?: Date | null } =
      {};

    if (typeof body?.status === "string") {
      if (!STATUSES.has(body.status)) return badRequest("invalid status");
      data.status = body.status;
    }

    if (typeof body?.reply === "string") {
      const reply = body.reply.trim();
      if (reply.length > 2000) return badRequest("reply too long");
      data.reply = reply;
      data.repliedAt = reply ? new Date() : null;
    }

    if (data.status === undefined && data.reply === undefined) {
      return badRequest("nothing to update");
    }

    await db.deviceRequest.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
