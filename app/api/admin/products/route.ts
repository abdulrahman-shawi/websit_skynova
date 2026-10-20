import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  asBoolean,
  asNullableString,
  asString,
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

const REVALIDATE_PATHS = ["/", "/products"];

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows =
      await db`SELECT * FROM products ORDER BY display_order, id`;
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
      INSERT INTO products (name, category, badge, description, price, guarantee, featured, display_order)
      VALUES (
        ${name},
        ${asString(body?.category)},
        ${asString(body?.badge)},
        ${asString(body?.description)},
        ${asString(body?.price)},
        ${asNullableString(body?.guarantee)},
        ${asBoolean(body?.featured)},
        COALESCE((SELECT MAX(display_order) FROM products), 0) + 1
      )
      RETURNING id
    `;
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch {
    return serverError();
  }
}
