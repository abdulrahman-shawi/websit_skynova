import type { Metadata } from "next";
import Link from "next/link";
import { findProductByCode } from "@/lib/barcode";
import { getContact } from "@/lib/content";
import { getDb } from "@/lib/db";
import SaveDeviceButton from "@/components/customer/SaveDeviceButton";

export const metadata: Metadata = {
  title: "بيانات المنتج | سكاينوفا",
  description:
    "صفحة التحقق من منتجات سكاينوفا: اقرأ بيانات الجهاز، طريقة الاستخدام، وضمان الجودة عبر رقم الباركود.",
};

export const revalidate = 60;

export default async function ProductInfoPage({
  params,
}: {
  params: { code: string };
}) {
  const code = decodeURIComponent(params.code).trim();
  const db = getDb();

  const [found, contact] = await Promise.all([
    db ? findProductByCode(db, code) : null,
    getContact(),
  ]);
  const product = found?.product ?? null;

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-3xl border border-blush-100 bg-white p-10 shadow-sm">
          <p className="text-4xl font-black text-blush-500">؟</p>
          <h1 className="mt-4 text-2xl font-black">المنتج غير مسجل</h1>
          <p className="mt-3 leading-8 text-ink/60">
            لم نعثر على منتج يطابق هذا الرقم ({code}). تأكد من رقم الباركود على
            العبوة، أو تواصل معنا للتحقق من أصالة المنتج.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/check"
              className="rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600"
            >
              امسح الباركود مجدداً
            </Link>
            <Link
              href="/products"
              className="rounded-full border-2 border-blush-500 px-6 py-3 text-sm font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
            >
              تصفح الأجهزة
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-sm">
        <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/40">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <svg
              className="h-24 w-24 text-blush-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="4" y="7" width="16" height="12" rx="3" />
              <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M8 13h8" />
            </svg>
          )}
          {product.badge && (
            <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
              {product.category}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xl font-black text-blush-600">{product.price}</span>
            {product.guarantee && (
              <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                {product.guarantee}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-5 leading-8 text-ink/60">{product.description}</p>
          )}

          {product.usage && (
            <div className="mt-6 rounded-2xl border border-blush-100 bg-blush-50/60 p-6">
              <h2 className="text-lg font-extrabold">طريقة الاستخدام</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-8 text-ink/70">
                {product.usage}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-blush-300 bg-background px-5 py-4">
            <div>
              <p className="text-xs font-bold text-ink/50">
                رقم هذه العبوة (فريد لكل عبوة)
              </p>
              <p className="mt-1 text-lg font-black tracking-widest" dir="ltr">
                {code}
              </p>
            </div>
            <svg
              className="h-10 w-10 text-blush-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 6v12M8 6v12M11 6v12M14 6v12M17 6v12M20 6v12" />
            </svg>
          </div>

          <a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
              `أريد طلب: ${product.name} — رقم العبوة: ${code}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full bg-blush-500 px-8 py-4 text-center text-sm font-bold text-white transition-colors hover:bg-blush-600"
          >
            اطلب الآن عبر الواتساب
          </a>

          <SaveDeviceButton barcode={code} />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink/40">
        منتج أصلي من سكاينوفا — تحقق دائماً من رقم الباركود المطبوع على العبوة.
      </p>
    </div>
  );
}
