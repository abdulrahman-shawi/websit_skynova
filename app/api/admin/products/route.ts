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
    const items = await db.product.findMany({
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
    const name = asString(body?.name);
    if (!name) return badRequest("name is required");

    const max = await db.product.aggregate({ _max: { displayOrder: true } });
    const item = await db.product.create({
      data: {
        name,
        category: asString(body?.category),
        badge: asString(body?.badge),
        description: asString(body?.description),
        price: asString(body?.price),
        image: asString(body?.image),
        guarantee: asNullableString(body?.guarantee),
        featured: asBoolean(body?.featured),
        displayOrder: (max._max.displayOrder ?? 0) + 1,
      },
    });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return serverError();
  }
}
