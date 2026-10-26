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

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows = await db.product.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
      include: { units: { orderBy: { id: "asc" } } },
    });
    const items = rows.map((row) => ({
      ...row,
      codes: row.units.map((unit) => unit.code),
    }));
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
    const name = asString(body?.name);
    if (!name) return badRequest("name is required");
    const codes = asCodes(body?.codes);

    if (codes.length) {
      const conflict = await db.productUnit.findFirst({
        where: { code: { in: codes } },
      });
      if (conflict) {
        return NextResponse.json(
          { error: "duplicate_code", code: conflict.code },
          { status: 409 }
        );
      }
    }

    const max = await db.product.aggregate({ _max: { displayOrder: true } });
    const item = await db.product.create({
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
        displayOrder: (max._max.displayOrder ?? 0) + 1,
        units: { create: codes.map((code) => ({ code })) },
      },
    });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return serverError();
  }
}
