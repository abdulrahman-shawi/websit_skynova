import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  asString,
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

const REVALIDATE_PATHS = ["/", "/gallery"];

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows =
      await db`SELECT id, title, type, location, date_label AS date, description, display_order FROM events ORDER BY display_order, id`;
    return NextResponse.json({ items: rows });
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const body = await req.json();
    const title = asString(body?.title);
    if (!title) return badRequest("title is required");

    const rows = await db`
      INSERT INTO events (title, type, location, date_label, description, display_order)
      VALUES (
        ${title},
        ${asString(body?.type)},
        ${asString(body?.location)},
        ${asString(body?.date)},
        ${asString(body?.description)},
        COALESCE((SELECT MAX(display_order) FROM events), 0) + 1
      )
      RETURNING id
    `;
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch {
    return serverError();
  }
}
