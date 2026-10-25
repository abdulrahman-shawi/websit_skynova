import type { Metadata } from "next";
import BarcodeScanner from "@/components/BarcodeScanner";

export const metadata: Metadata = {
  title: "التحقق من المنتج | سكاينوفا",
  description:
    "تحقق من أصالة منتجات سكاينوفا: امسح باركود العبوة بكاميرا هاتفك لعرض بيانات المنتج وطريقة الاستخدام والضمان.",
};

export default function CheckProductPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-black sm:text-5xl">تحقق من منتجك</h1>
        <p className="mt-4 leading-8 text-ink/60">
          وجّه كاميرا هاتفك نحو الباركود المطبوع على عبوة المنتج لعرض بياناته
          وطريقة استخدامه والتحقق من أصالته.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-blush-100 bg-white p-6 shadow-sm sm:p-8">
        <BarcodeScanner />
      </div>

      <p className="mt-6 text-center text-xs leading-6 text-ink/40">
        يعمل المسح على الهواتف عبر متصفح يدعم الكاميرا (Chrome / Safari) باتصال
        آمن HTTPS. إذا واجهت مشكلة، اكتب رقم الباركود المطبوع أسفل العبوة يدوياً.
      </p>
    </div>
  );
}
