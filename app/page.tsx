import Link from "next/link";
import Faq from "@/components/Faq";

const featuredProducts = [
  {
    badge: "الأحدث بتقنية SenseIQ 2.0",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا لوميا 9000 — جهاز IPL منزلي",
    desc: "500,000 نبضة، مستشعر SenseIQ 2.0 و4 ملحقات مخصصة للجسم والوجه والإبط والبكيني.",
    price: "اسأل عن السعر",
  },
  {
    badge: "الأقوى والأحدث",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا دايود برو — ليزر دايود منزلي",
    desc: "أول ليزر دايود منزلي بطول موجة 810 نانومتر — 3 ملايين ضربة مع تبريد Ice Cool.",
    price: "اسأل عن السعر",
  },
  {
    badge: "ضمان استبدال سنتين",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا سمارت 9900",
    desc: "تقنية SenseIQ الذكية — 450 ألف نبضة وضمان استبدال كامل لسنتين.",
    price: "1,250,000 د.ع",
  },
  {
    badge: "الأكثر مبيعاً",
    category: "إزالة الشعر المنزلية",
    name: "سكاينوفا لايت IPL",
    desc: "جهاز منزلي بتقنية IPL، 900,000 ومضة و10 مستويات طاقة — بضمان سنة كاملة.",
    price: "550,000 د.ع",
  },
  {
    badge: "دفء واسترخاء فوري",
    category: "أجهزة المساج",
    name: "جهاز مساج الركبة الحراري",
    desc: "جهاز مساج لاسلكي بالحرارة والاهتزاز والضوء الأحمر — راحة يومية بضغطة زر.",
    price: "100,000 د.ع",
  },
  {
    badge: "أمان أثناء كل جلسة",
    category: "الملحقات والإكسسوارات",
    name: "نظارات الحماية من الليزر",
    desc: "نظارات حماية للعين أثناء جلسات الليزر وIPL، بعدسات داكنة وحقيبة حفظ.",
    price: "45,000 د.ع",
  },
];

const stats = [
  { value: "+15", label: "دولة نعمل بها" },
  { value: "+50", label: "جهاز متطور" },
  { value: "+500", label: "عميل حول العالم" },
  { value: "+10", label: "سنوات خبرة" },
];

const warrantyIncluded = [
  "أعطال اللوحة الإلكترونية والدوائر الداخلية",
  "عطل مصباح الوميض أو رأس المعالجة خلال المدة",
  "عيوب المحول الكهربائي الأصلي",
  "أعطال الشاشة والأزرار الناتجة عن التصنيع",
  "الفحص والصيانة مجاناً داخل المدة",
];

const warrantyExcluded = [
  "الكسر أو السقوط أو دخول الماء",
  "التشغيل على فولتية غير مطابقة أو محول غير أصلي",
  "الفتح أو التصليح خارج مركزنا",
  "الاستهلاك الطبيعي وانتهاء عدد الومضات",
  "فقدان بطاقة الضمان أو الفاتورة",
];

const faqItems = [
  {
    question: "ما أفضل جهاز ليزر منزلي لإزالة الشعر؟",
    answer:
      "يختلف الأفضل حسب نوع بشرتك وميزانيتك. أجهزتنا بتقنيات IPL وليزر دايود تغطي جميع درجات البشرة. راسلنا على الواتساب ونساعدك تختار الأنسب لك.",
  },
  {
    question: "وين أقدر أشتري جهاز ليزر منزلي أصلي؟",
    answer:
      "لدينا معرض فعلي في بغداد — المنصور، شارع 14 رمضان، يمكنك زيارته لتجربة الجهاز قبل الشراء. نوصل الطلبات لكل المحافظات مع فاتورة وضمان رسمي.",
  },
  {
    question: "شنو الفرق بين تقنية IPL وليزر الدايود؟",
    answer:
      "تقنية IPL تستخدم نبضات ضوء واسعة الطيف مناسبة للاستخدام المنزلي العام، بينما ليزر الدايود بطول موجة 810 نانومتر أقوى عمقاً وأدق استهدافاً للبصيلات ويناسب الشعر الكثيف الداكن.",
  },
  {
    question: "هل جهاز الليزر المنزلي آمن على البشرة؟",
    answer:
      "نعم، كل أجهزتنا مطابقة لمعايير السلامة العالمية (CE) وتأتي بمستويات طاقة متدرجة تناسب مختلف درجات البشرة. ننصح بقراءة دليل الاستخدام وتجربة الجهاز على منطقة صغيرة أولاً.",
  },
  {
    question: "كم المدة حتى تظهر نتائج جهاز إزالة الشعر؟",
    answer:
      "تبدأ أغلب النتائج المرئية خلال 3 إلى 4 أسابيع من الاستخدام المنتظم، وتصل لأفضل نتيجة بعد 8 إلى 12 جلسة حسب نوع الجهاز وكثافة الشعر.",
  },
  {
    question: "كيف يتم الصيانة والاستبدال؟",
    answer:
      "راسلنا على الواتساب مع صورة بطاقة الضمان ووصف العطل، وسنحدد لك موعد الاستلام أو الإرسال. الصيانة والفحص مجاناً داخل فترة الضمان.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold-600">
            SKYNOVA · Since 2009
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            أجهزة إزالة الشعر
            <br />
            <span className="bg-gradient-to-l from-blush-500 to-gold-500 bg-clip-text text-transparent">
              بنبضة ضوء واحدة.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-ink/70">
            وكيل وموزّع أجهزة الليزر و IPL ومنتجات العناية بالبشرة — أجهزة
            أصلية بضمان، سعر مباشر وتوصيل لكل المحافظات.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["ضمان يصل إلى سنتين", "معرض في بغداد", "توصيل لكل العراق"].map(
              (badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 rounded-full border border-blush-200 bg-white px-5 py-2.5 text-sm font-bold text-ink/80 shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d63a67" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              )
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white shadow-soft transition-colors hover:bg-blush-600"
            >
              تصفّح الأجهزة
            </Link>
            <a
              href="https://wa.me/9647700000000"
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
            <p className="mt-6 text-lg leading-9 text-ink/70">
              نحن <strong className="text-ink">سكاينوفا لمنتجات التجميل والليزر</strong>،
              تأسست شركتنا عام 2009، ومختصة بأجهزة الليزر المنزلية لإنهاء
              وتخفيض نمو الشعر، ومنتجات التجميل والعناية بالبشرة والشعر.
            </p>
            <p className="mt-4 leading-9 text-ink/60">
              نعمل بمعايير عالمية في توفير أفضل أنواع الأجهزة والمنتجات
              الأصلية، ونوفّر ضماناً رصيناً فريداً من نوعه في المصداقية والثقة
              المطلقة. لدينا معرض في بغداد يمكنك زيارته لتجربة الجهاز قبل
              الشراء، ونوصل لكل المحافظات مع إمكانية الدفع عند الاستلام، وكذلك
              الدفع الإلكتروني ونظام الأقساط المريحة على مدى 10 أشهر.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
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
            {[
              { name: "ISO 9001", desc: "نظام إدارة الجودة" },
              { name: "CE", desc: "المطابقة الأوروبية" },
              { name: "FDA", desc: "اعتماد الغذاء والدواء الأمريكي" },
              { name: "RoHS", desc: "خالية من المواد الخطرة" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="rounded-3xl border border-blush-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-black text-white">
                  {cert.name.slice(0, cert.name === "ISO 9001" ? 3 : 2)}
                </div>
                <p className="text-lg font-extrabold">{cert.name}</p>
                <p className="mt-1 text-xs leading-6 text-ink/60">{cert.desc}</p>
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
                  <h3 className="mt-1 text-lg font-extrabold leading-7">{product.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink/60">{product.desc}</p>
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
            <p className="mt-4 leading-8 text-white/70">
              ضمان مكتوب على الأعطال المصنعية — كل جهاز يخرج من معرضنا مع بطاقة
              ضمان تحمل رقم الجهاز وتاريخ البيع.
            </p>
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
                {warrantyIncluded.map((item) => (
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
                {warrantyExcluded.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-8 text-white/60">
            للصيانة: راسلنا على الواتساب مع صورة بطاقة الضمان ووصف العطل، وسنحدد
            لك موعد الاستلام أو الإرسال.
          </p>
        </div>
      </section>

      {/* أسئلة شائعة */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black sm:text-4xl">أسئلة شائعة</h2>
          <p className="mt-4 leading-8 text-ink/60">
            كل ما تحتاج معرفته قبل الشراء.
          </p>
        </div>
        <div className="mt-12">
          <Faq items={faqItems} />
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
            {[
              {
                type: "معرض دولي",
                title: "معرض بيوتي وورلد 2024",
                date: "أكتوبر 2024",
                location: "دبي، الإمارات",
                desc: "عرضنا أحدث أجهزة الليزر ديود والهيدرافيشل أمام مئات الزوار من أخصائيي التجميل.",
              },
              {
                type: "ورشة عمل",
                title: "مؤتمر دبي ديرما",
                date: "مارس 2024",
                location: "دبي، الإمارات",
                desc: "ورشة عمل بعنوان «معايير اختيار أجهزة الليزر للعيادات» قدّمها فريق البحث والتطوير.",
              },
              {
                type: "لقاء علمي",
                title: "لقاء أطباء التجميل السنوي",
                date: "ديسمبر 2023",
                location: "القاهرة، مصر",
                desc: "استضفنا نخبة من أطباء التجميل لاستعراض تقنيات RF الجديدة وتبادل الخبرات.",
              },
            ].map((event) => (
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
                  <p className="mt-3 text-sm leading-7 text-ink/60">{event.desc}</p>
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
          <h2 className="text-3xl font-black sm:text-4xl">موقعنا وتواصلك معنا</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/85">
            زُرنا في المعرض — بغداد، المنصور، شارع 14 رمضان، أو راسلنا مباشرة
            على الواتساب لأي استفسار.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/9647700000000"
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
