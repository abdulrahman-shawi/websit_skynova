import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }

  const productId = Number(params.id);
  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ error: "invalid product" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const name = asString(body?.name);
    const comment = asString(body?.comment);
    const ratingRaw = Number(body?.rating);
    const rating = Number.isInteger(ratingRaw)
      ? Math.min(5, Math.max(1, ratingRaw))
      : 5;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    if (name.length > 80) {
      return NextResponse.json({ error: "name too long" }, { status: 400 });
    }
    if (!comment) {
      return NextResponse.json({ error: "comment is required" }, { status: 400 });
    }
    if (comment.length > 1000) {
      return NextResponse.json({ error: "comment too long" }, { status: 400 });
    }

    const product = await db.product.findFirst({
      where: { id: productId, isActive: true },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    const review = await db.productReview.create({
      data: { productId, name, rating, comment },
    });

    revalidatePath(`/product/${productId}`);

    return NextResponse.json({ ok: true, id: review.id });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
