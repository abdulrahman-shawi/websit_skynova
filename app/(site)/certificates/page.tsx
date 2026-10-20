import type { Metadata } from "next";
import { getCertificates, getContact, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "الشهادات والاعتمادات",
  description:
    "شهادات واعتمادات مصنع سكاينوفا: ISO 9001 لإدارة الجودة، ISO 13485 للأجهزة الطبية، المطابقة الأوروبية CE، واعتماد FDA الأمريكي — جودة موثّقة بمعايير عالمية.",
  openGraph: {
    title: "الشهادات والاعتمادات | سكاينوفا",
    description:
      "جميع أجهزتنا مطابقة للمعايير الدولية ومعتمدة من جهات تقييم عالمية: ISO 9001، ISO 13485، CE، FDA وRoHS.",
  },
};

export const revalidate = 60;

function certShortName(name: string): string {
  return name.startsWith("ISO") ? "ISO" : name;
}

export default async function Certificates() {
  const [certificates, page, contact] = await Promise.all([
    getCertificates(),
    getSettings("certificates_page"),
    getContact(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">الشهادات والاعتمادات</h1>
        <p className="mt-4 leading-8 text-ink/60">{page.intro}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <article
            key={cert.name}
            className="flex gap-6 rounded-3xl border border-blush-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-soft"
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-black text-white">
              {certShortName(cert.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-extrabold">{cert.name}</h2>
                <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                  {cert.title}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-gold-600">{cert.issuer}</p>
              <p className="mt-3 text-sm leading-8 text-ink/60">{cert.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/50">
                <span>النطاق: {cert.scope}</span>
                <span>سنة الاعتماد: {cert.year}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-[3rem] bg-blush-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-black">{page.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-ink/60">{page.ctaText}</p>
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600"
        >
          اطلب نسخة موثقة عبر الواتساب
        </a>
      </div>
    </div>
  );
}
