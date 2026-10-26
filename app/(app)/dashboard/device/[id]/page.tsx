import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeviceTabs from "@/components/customer/DeviceTabs";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { getContact } from "@/lib/content";
import { getDb } from "@/lib/db";

export const metadata: Metadata = {
  title: "جهازي | سكاينوفا",
};

export const dynamic = "force-dynamic";

export default async function DevicePage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/login");

  const deviceId = Number(params.id);
  if (!Number.isInteger(deviceId)) redirect("/dashboard");

  const db = getDb();
  if (!db) redirect("/dashboard");

  const device = await db.customerDevice.findFirst({
    where: { id: deviceId, customerId: customer.id },
  });
  if (!device) redirect("/dashboard");

  const [product, contact] = await Promise.all([
    device.productId
      ? db.product.findUnique({ where: { id: device.productId } })
      : null,
    getContact(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href="/dashboard"
        className="text-xs font-bold text-ink/50 transition-colors hover:text-blush-600"
      >
        ← عودة إلى أجهزتي
      </Link>

      <div className="mt-4 flex items-center gap-4 rounded-3xl border border-blush-100 bg-white p-5 shadow-sm">
        {product?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt=""
            className="h-16 w-16 shrink-0 rounded-2xl border border-blush-100 object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-100 to-gold-300/40 text-xl font-black text-blush-400">
            {(product?.name ?? "؟").charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-black">
            {product?.name ?? "جهاز غير مسجل لدينا"}
          </h1>
          <p className="mt-0.5 text-xs text-ink/50" dir="ltr">
            {device.barcode}
          </p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            {product?.price && (
              <span className="font-bold text-blush-600">{product.price}</span>
            )}
            {product?.guarantee && (
              <span className="rounded-full bg-blush-50 px-2 py-0.5 font-bold text-blush-700">
                {product.guarantee}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <DeviceTabs
          deviceId={device.id}
          whatsapp={contact.whatsapp}
          productName={product?.name ?? null}
          barcode={device.barcode}
        />
      </div>
    </div>
  );
}
