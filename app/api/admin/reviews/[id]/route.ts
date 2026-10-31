import { NextRequest, NextResponse } from "next/server";
import {
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

type Params = { params: { id: string } };

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return badRequest("invalid id");
  try {
    await db.productReview.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
