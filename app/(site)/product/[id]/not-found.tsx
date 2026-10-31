import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <div className="rounded-3xl border border-blush-100 bg-white p-10 shadow-sm">
        <p className="text-4xl font-black text-blush-500">؟</p>
        <h1 className="mt-4 text-2xl font-black">المنتج غير موجود</h1>
        <p className="mt-3 leading-8 text-ink/60">
          لم نعثر على منتج يطابق هذا الرقم. ربما تم حذفه أو أن الرابط غير
          صحيح — تصفح تشكيلتنا الحالية من الأجهزة.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600"
        >
          تصفح الأجهزة
        </Link>
      </div>
    </div>
  );
}
