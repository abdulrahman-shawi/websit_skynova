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

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows = await db`SELECT * FROM faqs ORDER BY display_order, id`;
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
    const question = asString(body?.question);
    if (!question) return badRequest("question is required");

    const rows = await db`
      INSERT INTO faqs (question, answer, display_order)
      VALUES (
        ${question},
        ${asString(body?.answer)},
        COALESCE((SELECT MAX(display_order) FROM faqs), 0) + 1
      )
      RETURNING id
    `;
    revalidatePath("/");
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch {
    return serverError();
  }
}
