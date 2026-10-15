import type { Metadata } from "next";

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

const products = [
  {
    badge: "الأحدث بتقنية SenseIQ 2.0",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا لوميا 9000 — جهاز IPL منزلي",
    desc: "500,000 نبضة، مستشعر SenseIQ 2.0 و4 ملحقات مخصصة للجسم والوجه والإبط والبكيني.",
    price: "اسأل عن السعر",
    guarantee: "ضمان استبدال سنتين",
  },
  {
    badge: "الأقوى والأحدث",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا دايود برو — ليزر دايود منزلي",
    desc: "أول ليزر دايود منزلي بطول موجة 810 نانومتر — 3 ملايين ضربة مع تبريد Ice Cool.",
    price: "اسأل عن السعر",
    guarantee: "ضمان سنتين",
  },
  {
    badge: "الأعلى طلباً عالمياً",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا إكسبيرت برو 5",
    desc: "400 ألف نبضة تدوم سنوات طويلة، صناعة بمعايير أوروبية بضمان سنة.",
    price: "1,250,000 د.ع",
    guarantee: "ضمان سنة",
  },
  {
    badge: "أول جهاز بالذكاء الاصطناعي",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا سكين آي إكسبيرت — الإصدار السابع",
    desc: "الجيل الأحدث بالذكاء الاصطناعي — 500 ألف نبضة، أول جهاز IPL يتعلم من استخدامك.",
    price: "1,250,000 د.ع (شامل التوصيل)",
    guarantee: "ضمان سنتين",
  },
  {
    badge: "الأكثر مبيعاً",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا لايت IPL",
    desc: "جهاز منزلي بتقنية IPL، 900,000 ومضة و10 مستويات طاقة — بضمان سنة كاملة.",
    price: "550,000 د.ع",
    guarantee: "ضمان سنة",
  },
  {
    badge: "دفء واسترخاء فوري",
    category: "أجهزة المساج والاسترخاء",
    name: "جهاز مساج الركبة الحراري",
    desc: "جهاز مساج لاسلكي بالحرارة والاهتزاز والضوء الأحمر — راحة يومية بضغطة زر.",
    price: "100,000 د.ع",
    guarantee: "ضمان 6 أشهر",
  },
  {
    badge: "أمان أثناء كل جلسة",
    category: "الملحقات والإكسسوارات",
    name: "نظارات الحماية من الليزر",
    desc: "نظارات حماية للعين أثناء جلسات الليزر وIPL، بعدسات داكنة وحقيبة حفظ.",
    price: "45,000 د.ع",
    guarantee: null,
  },
  {
    badge: "لجلسة أكثر راحة",
    category: "الملحقات والإكسسوارات",
    name: "جل التبريد والترطيب",
    desc: "جل تبريد وترطيب يُستخدم قبل جلسات الليزر وIPL لراحة أكبر أثناء الجلسة.",
    price: "25,000 د.ع",
    guarantee: null,
  },
  {
    badge: "تقشير مائي لطيف",
    category: "العناية بالبشرة",
    name: "سكاينوفا ألترا سكين — جهاز الألتراسونيك",
    desc: "تقشير مائي لطيف بشفرة ألتراسونيك 28 كيلو هرتز للتنظيف العميق دون تهيّج.",
    price: "180,000 د.ع",
    guarantee: "ضمان سنة",
  },
];

export default function Products() {
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
            <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/40">
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
              <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
                {product.badge}
              </span>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                {product.category}
              </span>
              <h2 className="mt-1 text-lg font-extrabold leading-7">{product.name}</h2>
              <p className="mt-2 text-sm leading-7 text-ink/60">{product.desc}</p>
              {product.guarantee && (
                <p className="mt-3 inline-block rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                  {product.guarantee}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-blush-100 pt-5">
                <span className="text-lg font-black text-blush-600">{product.price}</span>
                <a
                  href="https://wa.me/9647700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-blush-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blush-600"
                >
                  اطلب الآن
                </a>
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
          href="https://wa.me/9647700000000"
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
