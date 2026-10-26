import type { PrismaClient, Product } from "@prisma/client";

/**
 * يبحث عن منتج برقم عبوة (ProductUnit) أولاً، ثم يرجع للباركود
 * القديم المخزن على المنتج نفسه لضمان استمرار عمل العبوات المطبوعة سابقاً.
 */
export async function findProductByCode(
  db: PrismaClient,
  code: string
): Promise<{ product: Product; code: string } | null> {
  const unit = await db.productUnit.findFirst({
    where: { code },
    include: { product: true },
  });
  if (unit) {
    return unit.product.isActive
      ? { product: unit.product, code: unit.code }
      : null;
  }
  const product = await db.product.findFirst({
    where: { barcode: code, isActive: true },
  });
  return product ? { product, code } : null;
}

/**
 * يطابق مجموعة أرقام (مثلاً أرقام أجهزة العميل) مع منتجاتها عبر جدول
 * العبوات أولاً ثم الباركود القديم، ويعيد خريطة رقم → منتج.
 */
export async function findProductsByCodes(
  db: PrismaClient,
  codes: string[]
): Promise<Map<string, Product>> {
  const map = new Map<string, Product>();
  if (!codes.length) return map;

  const units = await db.productUnit.findMany({
    where: { code: { in: codes } },
    include: { product: true },
  });
  const covered = new Set<string>();
  for (const unit of units) {
    map.set(unit.code, unit.product);
    covered.add(unit.code);
  }

  const remaining = codes.filter((code) => !covered.has(code));
  if (remaining.length) {
    const products = await db.product.findMany({
      where: { barcode: { in: remaining } },
    });
    for (const product of products) {
      if (!map.has(product.barcode)) map.set(product.barcode, product);
    }
  }

  return map;
}
