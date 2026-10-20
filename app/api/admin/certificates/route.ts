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

const REVALIDATE_PATHS = ["/", "/certificates"];

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows =
      await db`SELECT * FROM certificates ORDER BY display_order, id`;
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
    const name = asString(body?.name);
    if (!name) return badRequest("name is required");

    const rows = await db`
      INSERT INTO certificates (name, title, issuer, description, scope, year, display_order)
      VALUES (
        ${name},
        ${asString(body?.title)},
        ${asString(body?.issuer)},
        ${asString(body?.description)},
        ${asString(body?.scope)},
        ${asString(body?.year)},
        COALESCE((SELECT MAX(display_order) FROM certificates), 0) + 1
      )
      RETURNING id
    `;
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch {
    return serverError();
  }
}
