import type { Metadata } from "next";
import { LanguageProvider } from "@/components/admin/LanguageProvider";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول — لوحة التحكم",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <LanguageProvider>
      <LoginForm />
    </LanguageProvider>
  );
}
