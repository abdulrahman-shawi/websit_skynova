import type { Metadata } from "next";
import { isAdminRequest } from "@/lib/api-helpers";
import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";

export const metadata: Metadata = {
  title: "تعليقات العملاء — لوحة التحكم",
};

export const dynamic = "force-dynamic";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${
            i <= rating ? "text-gold-500" : "text-blush-200"
          }`}
          fill={i <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinejoin="round"
            d="M11.48 3.5c.16-.4.88-.4 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44c.44.04.62.58.28.87l-4.2 3.6a.56.56 0 0 0-.18.55l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.9a.56.56 0 0 0-.59 0l-4.73 2.9a.56.56 0 0 1-.84-.6l1.28-5.39a.56.56 0 0 0-.19-.55l-4.2-3.6a.56.56 0 0 1 .29-.87l5.52-.44a.56.56 0 0 0 .47-.35L11.48 3.5Z"
          />
        </svg>
      ))}
    </span>
  );
}

export default async function AdminReviewsPage() {
  if (!isAdminRequest()) redirect("/admin/login");
  const db = getDb();

  let rows: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
    productName: string;
  }[] = [];

  if (db) {
    const found = await db.productReview.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
      include: { product: { select: { name: true } } },
    });
    rows = found.map((row) => ({
      id: row.id,
      name: row.name,
      rating: row.rating,
      comment: row.comment,
      createdAt: row.createdAt,
      productName: row.product.name,
    }));
  }

  const average =
    rows.length > 0
      ? rows.reduce((sum, r) => sum + r.rating, 0) / rows.length
      : 0;

  return (
    <div>
      <h1 className="text-2xl font-black sm:text-3xl">تعليقات العملاء</h1>
      <p className="mt-1 text-sm text-ink/50">
        الآراء التي أضافها العملاء على صفحات المنتجات — يمكنك حذف أي تعليق
        غير لائق.
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-blush-100 bg-white p-10 text-center text-sm text-ink/50">
          لا توجد تعليقات بعد.
        </p>
      ) : (
        <>
          <p className="mt-4 inline-block rounded-full bg-blush-50 px-4 py-2 text-xs font-bold text-blush-700">
            {rows.length} {rows.length === 1 ? "تعليق" : "تعليقات"} — متوسط
            التقييم {average.toFixed(1)} من 5
          </p>
          <ul className="mt-4 space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-3xl border border-blush-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-100 text-sm font-black text-blush-600">
                    {row.name.trim().charAt(0) || "؟"}
                  </span>
                  <span className="text-sm font-extrabold">{row.name}</span>
                  <Stars rating={row.rating} />
                  <span className="rounded-full bg-gold-300/20 px-3 py-1 text-xs font-bold text-gold-600">
                    {row.productName}
                  </span>
                  <span className="text-xs text-ink/40">
                    {new Intl.DateTimeFormat("ar", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(row.createdAt)}
                  </span>
                  <span className="ms-auto">
                    <DeleteReviewButton reviewId={row.id} />
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink/70">
                  {row.comment}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
