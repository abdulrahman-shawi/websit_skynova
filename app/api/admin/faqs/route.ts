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
    const items = await db.faq.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
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
    const question = asString(body?.question);
    if (!question) return badRequest("question is required");

    const max = await db.faq.aggregate({ _max: { displayOrder: true } });
    const item = await db.faq.create({
      data: {
        question,
        answer: asString(body?.answer),
        displayOrder: (max._max.displayOrder ?? 0) + 1,
      },
    });
    revalidatePath("/");
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return serverError();
  }
}
