import type { Metadata } from "next";
import { getEvents, getSettings } from "@/lib/content";

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

export const revalidate = 60;

export default async function Gallery() {
  const [events, page] = await Promise.all([
    getEvents(),
    getSettings("gallery_page"),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">المؤتمرات واللقاءات</h1>
        <p className="mt-4 leading-8 text-ink/60">{page.intro}</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {page.stats.map((stat) => (
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
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-ink via-blush-700 to-blush-500 text-center text-white">
              {event.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10 text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-300">
                      {event.type}
                    </p>
                    <p className="mt-1 text-lg font-extrabold">{event.title}</p>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-300">
                    {event.type}
                  </p>
                  <p className="mt-2 px-4 text-xl font-extrabold">{event.title}</p>
                </div>
              )}
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

      <div className="mt-16 rounded-[3rem] bg-blush-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-black">{page.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-ink/60">{page.ctaText}</p>
        <a
          href={`mailto:${page.ctaEmail}`}
          className="mt-6 inline-block rounded-full bg-blush-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600"
        >
          تواصل مع فريق الفعاليات
        </a>
      </div>
    </div>
  );
}
