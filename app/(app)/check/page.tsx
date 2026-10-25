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

      <div className="mt-6 rounded-3xl border border-blush-100 bg-white p-6 text-sm leading-7 text-ink/60 shadow-sm">
        <h2 className="font-extrabold text-ink">ثبّت التطبيق على هاتفك</h2>
        <ul className="mt-3 list-disc space-y-2 pr-5">
          <li>
            <span className="font-bold text-ink">أندرويد (Chrome):</span> افتح قائمة
            المتصفح (⋮) ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».
          </li>
          <li>
            <span className="font-bold text-ink">آيفون (Safari):</span> اضغط زر
            المشاركة ثم «إضافة إلى الشاشة الرئيسية».
          </li>
        </ul>
        <p className="mt-3 text-xs text-ink/40">
          سيُفتح التطبيق بأيقونة سكاينوفا على شاشة هاتفك ويعمل حتى دون اتصال
          بالإنترنت.
        </p>
      </div>

      <p className="mt-6 text-center text-xs leading-6 text-ink/40">
        يعمل المسح على الهواتف عبر متصفح يدعم الكاميرا (Chrome / Safari) باتصال
        آمن HTTPS. إذا واجهت مشكلة، اكتب رقم الباركود المطبوع أسفل العبوة يدوياً.
      </p>
    </div>
  );
}
