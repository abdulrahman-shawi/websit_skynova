import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized, serverError } from "@/lib/api-helpers";
import { getDb } from "@/lib/db";

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const rows = await db.deviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { device: { include: { customer: true } } },
    });
    const productIds = rows
      .map((row) => row.device.productId)
      .filter((id): id is number => typeof id === "number");
    const products = productIds.length
      ? await db.product.findMany({ where: { id: { in: productIds } } })
      : [];
    const productById = new Map(products.map((p) => [p.id, p.name]));
    const items = rows.map((row) => ({
      id: row.id,
      kind: row.kind,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
      customerName: row.device.customer.name,
      customerPhone: row.device.customer.phone,
      barcode: row.device.barcode,
      productName: row.device.productId
        ? (productById.get(row.device.productId) ?? null)
        : null,
    }));
    return NextResponse.json({ items });
  } catch {
    return serverError();
  }
}
