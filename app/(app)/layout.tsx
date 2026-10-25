import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCurrentCustomer();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-blush-100 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/check" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-sm font-bold text-white">
              S
            </span>
            <span className="text-base font-extrabold">
              سكاينوفا <span className="text-blush-500">SKYNOVA</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={customer ? "/dashboard" : "/login"}
              className="text-xs font-bold text-ink/50 transition-colors hover:text-blush-600"
            >
              {customer ? "حسابي" : "دخول"}
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-ink/50 transition-colors hover:text-blush-600"
            >
              الموقع الكامل ←
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
