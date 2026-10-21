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
    const items = await db.certificate.findMany({
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

    const max = await db.certificate.aggregate({ _max: { displayOrder: true } });
    const item = await db.certificate.create({
      data: {
        name,
        title: asString(body?.title),
        issuer: asString(body?.issuer),
        description: asString(body?.description),
        scope: asString(body?.scope),
        year: asString(body?.year),
        displayOrder: (max._max.displayOrder ?? 0) + 1,
      },
    });
    REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, id: item.id });
  } catch {
    return serverError();
  }
}
