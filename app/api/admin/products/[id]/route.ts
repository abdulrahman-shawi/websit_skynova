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

    await db.product.update({
      where: { id },
      data: {
        name,
        category: asString(body?.category),
        badge: asString(body?.badge),
        description: asString(body?.description),
        price: asString(body?.price),
        image: asString(body?.image),
        guarantee: asNullableString(body?.guarantee),
        featured: asBoolean(body?.featured),
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
    await db.product.delete({ where: { id } });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
