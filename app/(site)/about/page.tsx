import type { Metadata } from "next";
import { getSettings } from "@/lib/content";

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

export const revalidate = 60;

export default async function About() {
  const about = await getSettings("about_page");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">من نحن</h1>
        <p className="mt-4 leading-8 text-ink/60">{about.intro}</p>
      </div>

      <section className="mt-16 grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black">قصتنا</h2>
          {about.story.map((paragraph, index) => (
            <p key={index} className="mt-4 leading-9 text-ink/70">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="rounded-[3rem] bg-gradient-to-br from-blush-500 to-gold-500 p-10 text-white shadow-soft">
          <p className="text-5xl font-black">{about.highlight.value}</p>
          <p className="mt-2 text-lg font-bold">{about.highlight.label}</p>
          <hr className="my-6 border-white/30" />
          <p className="leading-8 text-white/85">{about.highlight.text}</p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-3xl font-black">قيمنا</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {about.values.map((value) => (
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
          {about.timeline.map((item) => (
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
