import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن — قصة مصنع سكاينوفا",
  description:
    "تعرّف على سكاينوفا: مصنع عربي متخصص في تصنيع أجهزة التجميل منذ أكثر من 15 عاماً. رؤيتنا، قيمنا، ورحلتنا في خدمة صالونات ومراكز التجميل حول العالم.",
  openGraph: {
    title: "من نحن — سكاينوفا",
    description:
      "مصنع عربي متخصص في تصنيع أجهزة التجميل بأعلى معايير الجودة العالمية منذ أكثر من 15 عاماً.",
  },
};

const values = [
  {
    title: "الجودة أولاً",
    text: "لا يغادر مصنعنا أي جهاز دون اجتيازه اختبارات سلامة وأداء وفق معايير CE وISO.",
  },
  {
    title: "الابتكار المستمر",
    text: "فريق بحث وتطوير يتابع أحدث تقنيات الليزر والعناية بالبشرة عالمياً ويحوّلها إلى منتجات عملية.",
  },
  {
    title: "شراكة طويلة الأمد",
    text: "علاقتنا بعملائنا لا تنتهي بالبيع — بل تبدأ مع الدعم الفني والتدريب والصيانة.",
  },
];

const timeline = [
  { year: "2009", event: "تأسيس المصنع بخط إنتاج أولي لأجهزة العناية بالبشرة." },
  { year: "2013", event: "إطلاق أول جهاز ليزر ديود عربي الصنع بشهادات مطابقة دولية." },
  { year: "2017", event: "بدء التصدير الرسمي لدول الخليج وشمال أفريقيا." },
  { year: "2021", event: "افتتاح مركز البحث والتطوير وخط إنتاج الهيدرافيشل." },
  { year: "2024", event: "تجاوزنا حاجز 12,000 جهاز مُسلّم في أكثر من 40 دولة." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">من نحن</h1>
        <p className="mt-4 leading-8 text-ink/60">
          سكاينوفا ليست مجرد مصنع — بل حلم بدأ بفكرة بسيطة: أن تكون للعالم العربي
          صناعة تجميلية بمواصفات عالمية.
        </p>
      </div>

      <section className="mt-16 grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black">قصتنا</h2>
          <p className="mt-4 leading-9 text-ink/70">
            انطلقنا عام 2009 من قلب المنطقة الصناعية برؤية واضحة: تصنيع أجهزة
            تجميل تجمع بين التقنية المتقدمة والمتانة وسهولة الاستخدام. اليوم،
            وبعد أكثر من 15 عاماً، أصبحت أجهزتنا تُستخدم في آلاف الصالونات
            والمراكز الطبية في أكثر من 40 دولة.
          </p>
          <p className="mt-4 leading-9 text-ink/70">
            نؤمن أن نجاح عملائنا هو نجاحنا، لذلك نرافق كل عميل من لحظة اختيار
            الجهاز وحتى التشغيل والتدريب والصيانة الدورية.
          </p>
        </div>
        <div className="rounded-[3rem] bg-gradient-to-br from-blush-500 to-gold-500 p-10 text-white shadow-soft">
          <p className="text-5xl font-black">+12,000</p>
          <p className="mt-2 text-lg font-bold">جهاز تجميل مُصنّع ومُسلّم</p>
          <hr className="my-6 border-white/30" />
          <p className="leading-8 text-white/85">
            فخورون بثقة آلاف الأطباء والأخصائيين الذين اختاروا أجهزتنا لخدمة
            عملائهم يومياً.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-3xl font-black">قيمنا</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-blush-100 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-l from-blush-500 to-gold-500" />
              <h3 className="text-lg font-extrabold">{value.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/60">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-3xl font-black">رحلتنا عبر السنوات</h2>
        <ol className="mx-auto mt-10 max-w-3xl space-y-0 border-r-2 border-blush-200 pr-8">
          {timeline.map((item) => (
            <li key={item.year} className="relative pb-10 last:pb-0">
              <span className="absolute -right-[45px] top-1 h-4 w-4 rounded-full border-4 border-background bg-blush-500" />
              <p className="text-lg font-black text-blush-600">{item.year}</p>
              <p className="mt-1 leading-8 text-ink/70">{item.event}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
