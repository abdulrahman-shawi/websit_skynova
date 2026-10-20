import { LanguageProvider } from "@/components/admin/LanguageProvider";
import Sidebar from "@/components/admin/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="bg-background text-ink">
        <Sidebar />
        <div className="md:ms-64">
          <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10">
            {children}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}
