import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DeviceManager from "@/components/customer/DeviceManager";
import CustomerLogoutButton from "@/components/customer/CustomerLogoutButton";
import { getCurrentCustomer } from "@/lib/customer-auth";

export const metadata: Metadata = {
  title: "حسابي | سكاينوفا",
  description: "داشبورد حسابك في سكاينوفا: بياناتك وأجهزتك المسجلة وطرق استخدامها.",
};

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/login");

  const memberSince = new Intl.DateTimeFormat("ar", {
    month: "long",
    year: "numeric",
  }).format(customer.createdAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-blush-100 bg-gradient-to-br from-blush-50 to-gold-300/20 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-black text-white">
              {customer.name.trim().charAt(0)}
            </span>
            <div>
              <h1 className="text-2xl font-black">{customer.name}</h1>
              <p className="mt-1 text-sm text-ink/60" dir="ltr">
                {customer.phone}
              </p>
              <p className="mt-0.5 text-xs text-ink/40">
                عضو منذ {memberSince}
              </p>
            </div>
          </div>
          <CustomerLogoutButton />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-extrabold">أجهزتي</h2>
      <p className="mt-1 text-sm text-ink/50">
        سجّل أجهزة سكاينوفا التي اشتريتها للاحتفاظ ببياناتها وضمانها وطريقة
        استخدامها هنا.
      </p>
      <div className="mt-4">
        <DeviceManager />
      </div>
    </div>
  );
}
