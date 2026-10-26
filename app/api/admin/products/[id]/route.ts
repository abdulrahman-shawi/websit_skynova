import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  asBoolean,
  asCodes,
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
    const codes = asCodes(body?.codes);

    const existing = await db.productUnit.findMany({ where: { productId: id } });
    const existingCodes = new Set(existing.map((unit) => unit.code));
    const wanted = new Set(codes);
    const toAdd = codes.filter((code) => !existingCodes.has(code));
    const toRemove = existing.filter((unit) => !wanted.has(unit.code));

    if (toAdd.length) {
      const conflict = await db.productUnit.findFirst({
        where: { code: { in: toAdd }, productId: { not: id } },
      });
      if (conflict) {
        return NextResponse.json(
          { error: "duplicate_code", code: conflict.code },
          { status: 409 }
        );
      }
    }

    await db.product.update({
      where: { id },
      data: {
        name,
        barcode: asString(body?.barcode),
        category: asString(body?.category),
        badge: asString(body?.badge),
        description: asString(body?.description),
        price: asString(body?.price),
        image: asString(body?.image),
        usage: asString(body?.usage),
        guarantee: asNullableString(body?.guarantee),
        featured: asBoolean(body?.featured),
      },
    });
    await db.$transaction([
      db.productUnit.deleteMany({ where: { id: { in: toRemove.map((unit) => unit.id) } } }),
      db.productUnit.createMany({
        data: toAdd.map((code) => ({ productId: id, code })),
      }),
    ]);
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
