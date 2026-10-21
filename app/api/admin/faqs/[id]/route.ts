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

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  const id = Number(params.id);
  if (!Number.isInteger(id)) return badRequest("invalid id");
  try {
    const body = await req.json();
    const question = asString(body?.question);
    if (!question) return badRequest("question is required");

    await db.faq.update({
      where: { id },
      data: { question, answer: asString(body?.answer) },
    });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  const id = Number(params.id);
  if (!Number.isInteger(id)) return badRequest("invalid id");
  try {
    await db.faq.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
