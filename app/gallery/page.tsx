import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المؤتمرات واللقاءات",
  description:
    "معرض مشاركات سكاينوفا في المؤتمرات والمعارض التجميلية العالمية: دبي ديرما، بيوتي وورلد، لقاءات الأطباء وورش العمل التقنية حول العالم العربي.",
  openGraph: {
    title: "المؤتمرات واللقاءات | سكاينوفا",
    description:
      "تابع مشاركات سكاينوفا في كبرى المؤتمرات والمعارض التجميلية ولقاءات الأطباء حول العالم.",
  },
};

const events = [
  {
    title: "معرض بيوتي وورلد 2024",
    location: "دبي، الإمارات",
    date: "أكتوبر 2024",
    desc: "عرضنا أحدث أجهزة الليزر ديود والهيدرافيشل أمام أكثر من 300 زائر يومياً من أخصائيي التجميل.",
    type: "معرض دولي",
  },
  {
    title: "مؤتمر دبي ديرما",
    location: "دبي، الإمارات",
    date: "مارس 2024",
    desc: "ورشة عمل بعنوان «معايير اختيار أجهزة الليزر للعيادات» قدّمها فريق البحث والتطوير لدينا.",
    type: "ورشة عمل",
  },
  {
    title: "لقاء أطباء التجميل السنوي",
    location: "القاهرة، مصر",
    date: "ديسمبر 2023",
    desc: "استضفنا نخبة من أطباء التجميل لاستعراض تقنيات RF الجديدة وتبادل الخبرات السريرية.",
    type: "لقاء علمي",
  },
  {
    title: "معرض إيجي بيوتي إكسبو",
    location: "القاهرة، مصر",
    date: "يونيو 2023",
    desc: "الكشف عن جهاز الهيدرافيشل «هيدرا برو» لأول مرة في السوق المصري والعربي.",
    type: "معرض إقليمي",
  },
  {
    title: "قمة التجميل العربية",
    location: "الرياض، السعودية",
    date: "فبراير 2023",
    desc: "مشاركة في جلسة نقاشية حول مستقبل تصنيع الأجهزة التجميلية في المنطقة العربية.",
    type: "مؤتمر",
  },
  {
    title: "معرض إستيتيك الشرق الأوسط",
    location: "دبي، الإمارات",
    date: "نوفمبر 2022",
    desc: "توقيع اتفاقيات توزيع مع ثلاث شركات خليجية لتغطية أسواق الخليج والعراق.",
    type: "معرض دولي",
  },
];

export default function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">المؤتمرات واللقاءات</h1>
        <p className="mt-4 leading-8 text-ink/60">
          نواصل حضورنا الفاعل في كبرى المحافل التجميلية العربية والدولية،
          لنبقى على تواصل مباشر مع الأطباء والأخصائيين ونعرض أحدث إصداراتنا.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { value: "+50", label: "مؤتمر ومشاركة" },
          { value: "+20", label: "دولة زرناها" },
          { value: "+1000", label: "لقاء عمل" },
          { value: "+100", label: "شريك جديد" },
        ].map((stat) => (
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.title}
            className="overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-sm transition-shadow hover:shadow-soft"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-ink via-blush-700 to-blush-500 text-center text-white">
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

      <div className="mt-16 rounded-[3rem] bg-blush-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-black">هل ستشارك في معرض قادم؟</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-ink/60">
          نرحّب بزيارتك لجناحنا في المعارض القادمة، أو يمكنك دعوتنا للمشاركة في
          فعاليتك التجميلية القادمة.
        </p>
        <a
          href="mailto:info@skynova-beauty.com"
          className="mt-6 inline-block rounded-full bg-blush-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600"
        >
          تواصل مع فريق الفعاليات
        </a>
      </div>
    </div>
  );
}
