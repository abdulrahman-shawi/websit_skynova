import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

const REVALIDATE_PATHS = ["/", "/gallery"];

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const body = await req.json();
    const ids: unknown = body?.ids;
    if (!Array.isArray(ids) || ids.some((id) => !Number.isInteger(id))) {
      return badRequest("ids must be an array of integers");
    }
    for (let index = 0; index < ids.length; index++) {
      await db`UPDATE events SET display_order = ${index + 1} WHERE id = ${ids[index] as number}`;
    }
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
