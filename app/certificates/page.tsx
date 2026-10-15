import type { Metadata } from "next";

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

const certificates = [
  {
    name: "ISO 9001:2015",
    title: "نظام إدارة الجودة",
    issuer: "المنظمة الدولية للمعايير",
    desc: "شهادة اعتماد نظام إدارة الجودة في تصميم وتصنيع أجهزة التجميل، تثبت التزامنا بمعايير الجودة في كل مرحلة من مراحل الإنتاج.",
    scope: "تصميم وتصنيع أجهزة التجميل والعناية بالبشرة",
    year: "2015",
  },
  {
    name: "ISO 13485:2016",
    title: "الأجهزة الطبية",
    issuer: "المنظمة الدولية للمعايير",
    desc: "شهادة متخصصة في جودة تصنيع الأجهزة الطبية وسلامتها، تشمل إدارة المخاطر ومراقبة ما بعد البيع.",
    scope: "تصنيع أجهزة العلاج والعناية بالبشرة",
    year: "2018",
  },
  {
    name: "CE",
    title: "المطابقة الأوروبية",
    issuer: "الاتحاد الأوروبي",
    desc: "علامة المطابقة الأوروبية التي تمنح الجهاز حق التداول في أسواق الاتحاد الأوروبي بعد اجتيازه اختبارات السلامة والأداء.",
    scope: "جميع أجهزة الليزر وIPL",
    year: "2019",
  },
  {
    name: "FDA",
    title: "إدارة الغذاء والدواء الأمريكية",
    issuer: "الولايات المتحدة الأمريكية",
    desc: "تسجيل واعتماد أجهزتنا لدى إدارة الغذاء والدواء الأمريكية بعد استيفاء متطلبات السلامة والفعالية السريرية.",
    scope: "أجهزة إزالة الشعر بالليزر وIPL",
    year: "2020",
  },
  {
    name: "RoHS",
    title: "التقييد بالمواد الخطرة",
    issuer: "الاتحاد الأوروبي",
    desc: "شهادة تؤكد خلو أجهزتنا من المواد الخطرة مثل الرصاص والزئبق والكادميوم، بما يضمن سلامة المستخدم والبيئة.",
    scope: "جميع المنتجات",
    year: "2021",
  },
  {
    name: "GMP",
    title: "ممارسات التصنيع الجيدة",
    issuer: "هيئات الرقابة الدوائية",
    desc: "الامتثال لمعايير ممارسات التصنيع الجيدة في بيئة الإنتاج النظيفة ومراقبة الجودة الداخلية.",
    scope: "منشآت الإنتاج والتجميع",
    year: "2022",
  },
];

export default function Certificates() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">الشهادات والاعتمادات</h1>
        <p className="mt-4 leading-8 text-ink/60">
          الجودة عندنا ليست شعاراً بل شهادات موثّقة من جهات تقييم عالمية
          مستقلة. هذه أهم اعتمادات مصنع سكاينوفا.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <article
            key={cert.name}
            className="flex gap-6 rounded-3xl border border-blush-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-soft"
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-black text-white">
              {cert.name.slice(0, cert.name === "GMP" || cert.name === "CE" || cert.name === "FDA" || cert.name === "RoHS" ? cert.name.length : 3)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-extrabold">{cert.name}</h2>
                <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                  {cert.title}
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-gold-600">{cert.issuer}</p>
              <p className="mt-3 text-sm leading-8 text-ink/60">{cert.desc}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/50">
                <span>النطاق: {cert.scope}</span>
                <span>سنة الاعتماد: {cert.year}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-[3rem] bg-blush-50 px-8 py-12 text-center">
        <h2 className="text-2xl font-black">تريد نسخة من شهادة معينة؟</h2>
        <p className="mx-auto mt-3 max-w-xl leading-8 text-ink/60">
          نوفر نسخاً موثقة من شهادات المطابقة لعملائنا وموزّعينا عند الطلب
          لأغراض التخليص الجمركي أو التقديم الرسمي.
        </p>
        <a
          href="https://wa.me/9647700000000"
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
