import type { Metadata } from "next";
import Link from "next/link";
import { getContact, getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "الأجهزة — أجهزة الليزر و IPL المنزلية",
  description:
    "تصفح تشكيلة سكاينوفا من أجهزة إزالة الشعر بالليزر وIPL المنزلية ومنتجات العناية بالبشرة — أجهزة أصلية بضمان مكتوب وتوصيل لكل المحافظات.",
  openGraph: {
    title: "الأجهزة — سكاينوفا",
    description:
      "أجهزة ليزر وIPL منزلية أصلية بضمان مكتوب، مع توصيل لكل المحافظات ودفع عند الاستلام.",
  },
};

export const revalidate = 60;

export default async function Products() {
  const [products, contact] = await Promise.all([getProducts(), getContact()]);
  const whatsappLink = `https://wa.me/${contact.whatsapp}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">الأجهزة التي نوفرها</h1>
        <p className="mt-4 leading-8 text-ink/60">
          كل جهاز يخرج من معرضنا مع بطاقة ضمان مكتوبة تحمل رقم الجهاز وتاريخ
          البيع، وفحص كامل قبل التسليم.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="group overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-sm transition-shadow hover:shadow-soft"
          >
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/40">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-20 w-20 text-blush-400 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="7" width="16" height="12" rx="3" />
                  <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M8 13h8" />
                </svg>
              )}
              <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
                {product.badge}
              </span>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                {product.category}
              </span>
              <h2 className="mt-1 text-lg font-extrabold leading-7">{product.name}</h2>
              <p className="mt-2 text-sm leading-7 text-ink/60">{product.description}</p>
              {product.guarantee && (
                <p className="mt-3 inline-block rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                  {product.guarantee}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-blush-100 pt-5">
                <span className="text-lg font-black text-blush-600">{product.price}</span>
                <div className="flex items-center gap-2">
                  {typeof product.id === "number" && (
                    <Link
                      href={`/product/${product.id}`}
                      className="rounded-full border-2 border-blush-500 px-4 py-2 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
                    >
                      التفاصيل
                    </Link>
                  )}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-blush-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blush-600"
                  >
                    اطلب الآن
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-[3rem] bg-blush-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-black">محتار أي جهاز يناسبك؟</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-ink/60">
          راسلنا على الواتساب واذكر نوع بشرتك وشعرك، وسيرشح لك فريقنا الجهاز
          الأنسب مع شرح المميزات والفرق بين الطرازات.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          استشرنا مجاناً على الواتساب
        </a>
      </div>
    </div>
  );
}
