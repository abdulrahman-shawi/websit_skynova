import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContact, getProductById } from "@/lib/content";
import ProductReviews from "@/components/ProductReviews";

export const revalidate = 60;

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const id = Number(params.id);
  const found = Number.isInteger(id) && id > 0 ? await getProductById(id) : null;
  return {
    title: found ? `${found.product.name} | سكاينوفا` : "المنتج | سكاينوفا",
    description:
      found?.product.description ??
      "تفاصيل جهاز سكاينوفا الكاملة: المواصفات، طريقة الاستخدام، والضمان.",
    openGraph: found
      ? { title: found.product.name, description: found.product.description }
      : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const id = Number(params.id);
  const [found, contact] = await Promise.all([
    Number.isInteger(id) && id > 0 ? getProductById(id) : null,
    getContact(),
  ]);

  if (!found) notFound();

  const { product, reviews } = found;
  const orderLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `أريد طلب: ${product.name}`
  )}`;

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* القسم الأيمن: صورة المنتج واسمه — يبقى ثابتاً أثناء التمرير */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[2rem] border border-blush-100 bg-white shadow-sm">
            <div className="relative flex h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/40 sm:h-96">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-28 w-28 text-blush-400"
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
            <div className="p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                {product.category}
              </span>
              <h1 className="mt-1 text-2xl font-black leading-9 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-blush-600">
                  {product.price}
                </span>
                {product.guarantee && (
                  <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                    {product.guarantee}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* القسم الأيسر: تفاصيل المنتج وأزرار الطلب — يتحرك مع التمرير */}
        <div className="space-y-6">
          {product.description && (
            <section className="rounded-[2rem] border border-blush-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold">وصف المنتج</h2>
              <p className="mt-3 leading-8 text-ink/60">{product.description}</p>
            </section>
          )}

          {product.usage && (
            <section className="rounded-[2rem] border border-blush-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold">طريقة الاستخدام</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-8 text-ink/70">
                {product.usage}
              </p>
            </section>
          )}

          <section className="rounded-[2rem] border border-blush-100 bg-blush-50/60 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold">اطلب {product.name}</h2>
            <p className="mt-2 text-sm leading-7 text-ink/60">
              اطلب الآن وسيتواصل معك فريقنا لتأكيد الطلب وترتيب التوصيل لباب
              البيت، مع بطاقة ضمان مكتوبة تحمل رقم الجهاز.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600"
              >
                اطلب الآن عبر الواتساب
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                استشرنا مجاناً
              </a>
            </div>
            <p className="mt-4 text-xs text-ink/50">
              دفع عند الاستلام متاح — فحص كامل للجهاز قبل التسليم.
            </p>
          </section>

          {product.barcode && (
            <p className="text-center text-xs text-ink/40">
              اشتريت المنتج؟{" "}
              <Link
                href={`/p/${encodeURIComponent(product.barcode)}`}
                className="font-bold text-blush-600 underline"
              >
                تحقق من أصالة عبوتك برقم الباركود
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* آراء العملاء */}
      <ProductReviews productId={product.id ?? 0} reviews={reviews} />
    </div>
  );
}
