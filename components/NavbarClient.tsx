"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "منتجاتنا" },
  { href: "/check", label: "تحقق من منتجك" },
  { href: "/about", label: "من نحن" },
  { href: "/gallery", label: "المؤتمرات واللقاءات" },
  { href: "/certificates", label: "الشهادات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function NavbarClient({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blush-100 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="سكاينوفا - الرئيسية">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-lg font-bold text-white">
            S
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            سكاينوفا <span className="text-blush-500">SKYNOVA</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-blush-600 ${
                  pathname === link.href ? "text-blush-600" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blush-600 md:block"
        >
          اطلب عبر الواتساب
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-ink md:hidden"
          aria-label="فتح القائمة"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-blush-100 bg-background px-4 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-semibold ${
                  pathname === link.href ? "text-blush-600" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
