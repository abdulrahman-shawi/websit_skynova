"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import SeedButton from "./SeedButton";
import type { StringKey } from "@/lib/i18n";

type Counts = {
  products: number;
  faqs: number;
  certificates: number;
  events: number;
};

const COUNT_ITEMS: { key: keyof Counts; labelKey: StringKey; href: string }[] = [
  { key: "products", labelKey: "admin.products", href: "/admin/products" },
  { key: "faqs", labelKey: "admin.faqs", href: "/admin/faqs" },
  { key: "certificates", labelKey: "admin.certificates", href: "/admin/certificates" },
  { key: "events", labelKey: "admin.events", href: "/admin/events" },
];

export default function DashboardClient({
  counts,
  dbHealthy,
}: {
  counts: Counts;
  dbHealthy: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl font-black sm:text-3xl">{t("dash.title")}</h1>
      <p className="mt-2 text-sm text-ink/60">{t("dash.subtitle")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COUNT_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="rounded-3xl border border-blush-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-soft"
          >
            <p className="bg-gradient-to-l from-blush-500 to-gold-500 bg-clip-text text-4xl font-black text-transparent">
              {counts[item.key]}
            </p>
            <p className="mt-2 text-sm font-bold text-ink/60">{t(item.labelKey)}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-blush-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold">{t("dash.dbStatus")}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-bold">
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                dbHealthy ? "bg-green-500" : "bg-red-400"
              }`}
            />
            <span className={dbHealthy ? "text-green-600" : "text-red-500"}>
              {dbHealthy ? t("dash.dbConnected") : t("dash.dbMissing")}
            </span>
          </p>
          {!dbHealthy && (
            <p className="mt-3 text-xs leading-6 text-ink/50" dir="ltr">
              DATABASE_URL=postgresql://...
            </p>
          )}
        </div>

        <SeedButton />
      </div>
    </div>
  );
}
