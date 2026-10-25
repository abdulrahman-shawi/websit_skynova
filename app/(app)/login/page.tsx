import type { Metadata } from "next";
import CustomerAuthForm from "@/components/customer/CustomerAuthForm";

export const metadata: Metadata = {
  title: "حسابي | سكاينوفا",
  description:
    "سجّل الدخول إلى حسابك في سكاينوفا لإدارة أجهزتك وعرض بيانات منتجاتك وطرق استخدامها.",
};

export default function CustomerLoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-black sm:text-4xl">حسابي</h1>
        <p className="mt-3 leading-7 text-ink/60">
          سجّل الدخول أو أنشئ حساباً مجانياً لتسجيل أجهزتك والاحتفاظ ببياناتها
          وطرق استخدامها في مكان واحد.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-blush-100 bg-white p-6 shadow-sm sm:p-8">
        <CustomerAuthForm />
      </div>
    </div>
  );
}
