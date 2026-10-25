import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyCustomerSessionValue, CUSTOMER_COOKIE } from "@/lib/customer-auth";

function customerIdFrom(req: NextRequest): number | null {
  return verifyCustomerSessionValue(req.cookies.get(CUSTOMER_COOKIE)?.value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(req: NextRequest) {
  const customerId = customerIdFrom(req);
  const db = getDb();
  if (!customerId || !db) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await db.customerDevice.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
    });
    const barcodes = rows.map((row) => row.barcode).filter(Boolean);
    const products = barcodes.length
      ? await db.product.findMany({ where: { barcode: { in: barcodes } } })
      : [];
    const byBarcode = new Map(products.map((p) => [p.barcode, p]));
    const items = rows.map((row) => {
      const product = byBarcode.get(row.barcode);
      return {
        id: row.id,
        barcode: row.barcode,
        addedAt: row.createdAt.toISOString(),
        product: product
          ? {
              name: product.name,
              image: product.image || "",
              price: product.price,
              guarantee: product.guarantee,
              active: product.isActive,
            }
          : null,
      };
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const customerId = customerIdFrom(req);
  const db = getDb();
  if (!customerId || !db) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const barcode = asString(body?.barcode);
    if (!barcode) {
      return NextResponse.json({ error: "barcode is required" }, { status: 400 });
    }

    const product = await db.product.findFirst({
      where: { barcode, isActive: true },
    });

    const count = await db.customerDevice.count({ where: { customerId } });
    if (count >= 50) {
      return NextResponse.json({ error: "limit reached" }, { status: 400 });
    }

    const existing = await db.customerDevice.findFirst({
      where: { customerId, barcode },
    });
    if (existing) {
      return NextResponse.json({ error: "already added" }, { status: 409 });
    }

    const item = await db.customerDevice.create({
      data: { customerId, barcode, productId: product?.id ?? null },
    });
    return NextResponse.json({ ok: true, id: item.id, found: Boolean(product) });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
