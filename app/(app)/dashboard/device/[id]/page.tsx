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
    <div className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-10">
      <Link
        href="/dashboard"
        className="text-xs font-bold text-ink/50 transition-colors hover:text-blush-600"
      >
        ← عودة إلى أجهزتي
      </Link>

      <DeviceTabs
        deviceId={device.id}
        whatsapp={contact.whatsapp}
        product={
          product
            ? {
                name: product.name,
                image: product.image,
                price: product.price,
                guarantee: product.guarantee,
              }
            : null
        }
        barcode={device.barcode}
      />
    </div>
  );
}
