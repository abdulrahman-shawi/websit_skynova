import Link from "next/link";
import Faq from "@/components/Faq";
import {
  getCertificates,
  getContact,
  getEvents,
  getFaqs,
  getProducts,
  getSettings,
} from "@/lib/content";

export const revalidate = 60;

const productIcon = (
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
);

function certShortName(name: string): string {
  return name.startsWith("ISO") ? "ISO" : name;
}

export default async function Home() {
  const [hero, homeAbout, warranty, cta, contact, products, certificates, faqs, events] =
    await Promise.all([
      getSettings("home.hero"),
      getSettings("home.about"),
      getSettings("home.warranty"),
      getSettings("home.cta"),
      getContact(),
      getProducts(true),
      getCertificates(),
      getFaqs(),
      getEvents(),
    ]);

  const featuredProducts = products.slice(0, 6);
  const homeCertificates = certificates.slice(0, 4);
  const homeEvents = events.slice(0, 3);
  const whatsappLink = `https://wa.me/${contact.whatsapp}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold-600">
            {hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {hero.titleLine1}
            <br />
            <span className="bg-gradient-to-l from-blush-500 to-gold-500 bg-clip-text text-transparent">
              {hero.titleLine2}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-ink/70">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 rounded-full border border-blush-200 bg-white px-5 py-2.5 text-sm font-bold text-ink/80 shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d63a67" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white shadow-soft transition-colors hover:bg-blush-600"
            >
              تصفّح الأجهزة
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              اطلب عبر الواتساب
            </a>
          </div>
        </div>
      </section>

      {/* من نحن */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">من نحن</h2>
            {homeAbout.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`mt-6 leading-9 ${
                  index === 0 ? "text-lg text-ink/70" : "text-ink/60"
                }`}
              >
                {index === 0 ? (
                  <strong className="text-ink">{paragraph}</strong>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {homeAbout.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-blush-100 bg-white p-8 text-center shadow-sm"
              >
                <p className="bg-gradient-to-l from-blush-500 to-gold-500 bg-clip-text text-4xl font-black text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-bold text-ink/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الشهادات */}
      <section className="border-y border-blush-100 bg-blush-50/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-black sm:text-3xl">شهادات واعتمادات الجودة</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-8 text-ink/60">
            جميع أجهزتنا مطابقة للمعايير الدولية ومعتمدة من جهات تقييم عالمية.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {homeCertificates.map((cert) => (
              <div
                key={cert.name}
                className="rounded-3xl border border-blush-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-black text-white">
                  {certShortName(cert.name)}
                </div>
                <p className="text-lg font-extrabold">{cert.name}</p>
                <p className="mt-1 text-xs leading-6 text-ink/60">{cert.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الأجهزة المميزة */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black sm:text-4xl">الأجهزة التي نوفرها</h2>
            <p className="mt-4 leading-8 text-ink/60">
              اضغط على الجهاز لتفتح صفحته الكاملة — صور الجهاز، فيديو شرح،
              التفاصيل والمواصفات الكاملة، ومدة الضمان على الأعطال.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-3xl border border-blush-100 bg-background shadow-sm transition-shadow hover:shadow-soft"
              >
                <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/40">
                  {productIcon}
                  <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-lg font-extrabold leading-7">{product.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink/60">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-black text-blush-600">{product.price}</span>
                    <Link
                      href="/products"
                      className="rounded-full border-2 border-blush-500 px-5 py-2 text-sm font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-block rounded-full bg-ink px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600"
            >
              عرض جميع الأجهزة
            </Link>
          </div>
        </div>
      </section>

      {/* الضمان */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black sm:text-4xl">الضمان</h2>
            <p className="mt-4 leading-8 text-white/70">{warranty.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="flex items-center gap-2 text-xl font-extrabold text-gold-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                يشمل الضمان
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-white/80">
                {warranty.included.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="flex items-center gap-2 text-xl font-extrabold text-blush-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
                لا يشمل الضمان
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-white/80">
                {warranty.excluded.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-8 text-white/60">
            {warranty.note}
          </p>
        </div>
      </section>

      {/* أسئلة شائعة */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black sm:text-4xl">أسئلة شائعة</h2>
          <p className="mt-4 leading-8 text-ink/60">كل ما تحتاج معرفته قبل الشراء.</p>
        </div>
        <div className="mt-12">
          <Faq items={faqs} />
        </div>
      </section>

      {/* أحدث الفعاليات */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black sm:text-4xl">أحدث المؤتمرات واللقاءات</h2>
            <p className="mt-4 leading-8 text-ink/60">
              نتواجد في كبرى المحافل التجميلية لنعرض أحدث أجهزتنا ونتواصل مباشرة
              مع الأطباء والأخصائيين.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeEvents.map((event) => (
              <article
                key={event.title}
                className="overflow-hidden rounded-3xl border border-blush-100 bg-background shadow-sm transition-shadow hover:shadow-soft"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-ink via-blush-700 to-blush-500 text-center text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-300">
                      {event.type}
                    </p>
                    <p className="mt-2 px-4 text-xl font-extrabold">{event.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-ink/50">
                    <span>{event.date}</span>
                    <span className="h-1 w-1 rounded-full bg-blush-400" />
                    <span>{event.location}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink/60">{event.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-block rounded-full border-2 border-ink px-8 py-4 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
            >
              عرض جميع الفعاليات
            </Link>
          </div>
        </div>
      </section>

      {/* تواصل معنا */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="rounded-[3rem] bg-gradient-to-br from-blush-500 to-gold-500 px-8 py-16 text-center text-white shadow-soft">
          <h2 className="text-3xl font-black sm:text-4xl">{cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/85">{cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blush-600 transition-transform hover:scale-105"
            >
              راسلنا على الواتساب
            </a>
            <Link
              href="/about"
              className="rounded-full border-2 border-white px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white hover:text-blush-600"
            >
              تعرّف علينا أكثر
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
