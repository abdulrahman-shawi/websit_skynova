"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import type { StringKey } from "@/lib/i18n";

const NAV_ITEMS: { href: string; labelKey: StringKey }[] = [
  { href: "/admin", labelKey: "admin.dashboard" },
  { href: "/admin/products", labelKey: "admin.products" },
  { href: "/admin/faqs", labelKey: "admin.faqs" },
  { href: "/admin/certificates", labelKey: "admin.certificates" },
  { href: "/admin/events", labelKey: "admin.events" },
  { href: "/admin/settings", labelKey: "admin.settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const linkClass = (href: string) =>
    `block rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
      pathname === href
        ? "bg-blush-500 text-white"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      {/* الشريط العلوي للجوال */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-ink px-4 py-3 text-white md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-sm font-bold">
            S
          </span>
          <span className="font-extrabold">{t("app.name")}</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-md p-2"
          aria-label="القائمة"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <aside
        className={`bg-ink text-white ${
          open ? "block" : "hidden"
        } md:block md:fixed md:inset-y-0 md:start-0 md:z-40 md:w-64 md:overflow-y-auto`}
      >
        <div className="flex h-full flex-col gap-6 p-5">
          <Link href="/admin" className="hidden items-center gap-2 md:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-lg font-bold text-white">
              S
            </span>
            <span className="text-xl font-extrabold">
              {t("app.name")}{" "}
              <span className="text-xs font-bold text-gold-400">
                {t("admin.dashboard")}
              </span>
            </span>
          </Link>

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={linkClass(item.href)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLang("ar")}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  lang === "ar" ? "bg-gold-500 text-ink" : "bg-white/10 text-white/70"
                }`}
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  lang === "en" ? "bg-gold-500 text-ink" : "bg-white/10 text-white/70"
                }`}
              >
                English
              </button>
            </div>

            <a
              href="/"
              target="_blank"
              className="block rounded-xl bg-white/5 px-4 py-2.5 text-center text-sm font-bold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t("admin.viewSite")} ↗
            </a>
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-xl bg-blush-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blush-500"
            >
              {t("admin.logout")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
