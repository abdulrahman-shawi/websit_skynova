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

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  const id = Number(params.id);
  if (!Number.isInteger(id)) return badRequest("invalid id");
  try {
    const body = await req.json();
    const name = asString(body?.name);
    if (!name) return badRequest("name is required");

    await db.certificate.update({
      where: { id },
      data: {
        name,
        title: asString(body?.title),
        issuer: asString(body?.issuer),
        description: asString(body?.description),
        scope: asString(body?.scope),
        year: asString(body?.year),
        image: asString(body?.image),
      },
    });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
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
    await db.certificate.delete({ where: { id } });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
