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
    const rows = await db.event.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
    const items = rows.map((row) => ({ ...row, date: row.dateLabel }));
    return NextResponse.json({ items });
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

    const max = await db.event.aggregate({ _max: { displayOrder: true } });
    const item = await db.event.create({
      data: {
        title,
        type: asString(body?.type),
        location: asString(body?.location),
        dateLabel: asString(body?.date),
        description: asString(body?.description),
        displayOrder: (max._max.displayOrder ?? 0) + 1,
      },
    });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return serverError();
  }
}
