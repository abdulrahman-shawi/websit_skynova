"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductReviewItem } from "@/lib/content";

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinejoin="round"
        d="M11.48 3.5c.16-.4.88-.4 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44c.44.04.62.58.28.87l-4.2 3.6a.56.56 0 0 0-.18.55l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.9a.56.56 0 0 0-.59 0l-4.73 2.9a.56.56 0 0 1-.84-.6l1.28-5.39a.56.56 0 0 0-.19-.55l-4.2-3.6a.56.56 0 0 1 .29-.87l5.52-.44a.56.56 0 0 0 .47-.35L11.48 3.5Z"
      />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className ?? ""}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          filled={i <= rating}
          className="h-4 w-4 text-gold-500"
        />
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Baghdad",
  }).format(new Date(iso));
}

export default function ProductReviews({
  productId,
  reviews,
}: {
  productId: number;
  reviews: ProductReviewItem[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "تعذر إرسال رأيك، حاول مجدداً.");
        return;
      }
      setName("");
      setRating(5);
      setComment("");
      setJustAdded(true);
      router.refresh();
    } catch {
      setError("تعذر إرسال رأيك، تحقق من اتصالك وحاول مجدداً.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-blush-200 bg-background px-5 py-3.5 text-sm outline-none transition-colors focus:border-blush-500";

  return (
    <section className="mt-16">
      <div className="rounded-[2rem] border border-blush-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">آراء العملاء</h2>
            {reviews.length > 0 ? (
              <div className="mt-2 flex items-center gap-3">
                <Stars rating={Math.round(average)} />
                <span className="text-sm text-ink/60">
                  {average.toFixed(1)} من 5 — بناءً على {reviews.length}{" "}
                  {reviews.length === 1 ? "رأي" : "آراء"}
                </span>
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink/60">
                كن أول من يشارك رأيه في هذا المنتج.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* نموذج إضافة رأي */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-blush-100 bg-blush-50/60 p-6 sm:p-8"
          >
            <h3 className="text-lg font-extrabold">أضف رأيك</h3>
            <div className="mt-5">
              <label htmlFor="review-name" className="mb-2 block text-sm font-bold">
                الاسم
              </label>
              <input
                id="review-name"
                required
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب اسمك"
                className={inputClass}
              />
            </div>
            <div className="mt-5">
              <span className="mb-2 block text-sm font-bold">تقييمك</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${i} من 5`}
                    className="p-0.5 text-gold-500 transition-transform hover:scale-110"
                  >
                    <StarIcon
                      filled={i <= (hoverRating || rating)}
                      className="h-8 w-8"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="review-comment" className="mb-2 block text-sm font-bold">
                رأيك بالمنتج
              </label>
              <textarea
                id="review-comment"
                required
                rows={4}
                maxLength={1000}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="حدثنا عن تجربتك مع المنتج..."
                className={`${inputClass} resize-none`}
              />
            </div>
            {error && (
              <p className="mt-3 text-sm font-bold text-red-600">{error}</p>
            )}
            {justAdded && !error && (
              <p className="mt-3 text-sm font-bold text-green-700">
                شكراً لك! تم نشر رأيك بنجاح.
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-60"
            >
              {submitting ? "جارٍ النشر..." : "نشر رأي"}
            </button>
          </form>

          {/* قائمة الآراء */}
          <div>
            {reviews.length === 0 ? (
              <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-blush-300 p-8 text-center">
                <Stars rating={0} />
                <p className="mt-4 text-sm leading-7 text-ink/50">
                  لا توجد آراء بعد — شاركنا تجربتك مع هذا المنتج من النموذج
                  المجاور.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="rounded-3xl border border-blush-100 bg-background p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-sm font-black text-blush-600">
                          {review.name.trim().charAt(0) || "؟"}
                        </span>
                        <div>
                          <p className="text-sm font-extrabold">{review.name}</p>
                          <p className="text-xs text-ink/40">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="mt-4 text-sm leading-8 text-ink/70">
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
