import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق سكاينوفا: معرضنا في بغداد — المنصور، شارع 14 رمضان، أو راسلنا على الواتساب والبريد الإلكتروني. نرد على استفساراتكم خلال ساعات العمل.",
  openGraph: {
    title: "تواصل معنا | سكاينوفا",
    description:
      "زُرنا في معرضنا ببغداد — المنصور، أو راسلنا على الواتساب لأي استفسار عن الأجهزة والأسعار والضمان.",
  },
};

const contactInfo = [
  {
    title: "العنوان",
    value: "بغداد — المنصور، شارع 14 رمضان",
    note: "المعرض مفتوح يومياً",
    icon: (
      <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
    ),
  },
  {
    title: "الهاتف والواتساب",
    value: "+964 770 000 0000",
    note: "متاح من 9 صباحاً حتى 9 مساءً",
    icon: (
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z" />
    ),
  },
  {
    title: "البريد الإلكتروني",
    value: "info@skynova-beauty.com",
    note: "نرد خلال 24 ساعة",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </>
    ),
  },
];

const hours = [
  { day: "السبت — الخميس", time: "9:00 صباحاً — 9:00 مساءً" },
  { day: "الجمعة", time: "4:00 عصراً — 9:00 مساءً" },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black sm:text-5xl">تواصل معنا</h1>
        <p className="mt-4 leading-8 text-ink/60">
          فريقنا جاهز للإجابة على استفساراتك حول الأجهزة والأسعار والضمان
          والتوزيع. اختر الطريقة الأنسب لك.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {/* معلومات التواصل */}
        <div className="space-y-5 lg:col-span-2">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="flex gap-5 rounded-3xl border border-blush-100 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blush-50">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d63a67"
                  strokeWidth="2"
                >
                  {info.icon}
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-ink/50">{info.title}</h2>
                <p className="mt-1 font-extrabold" dir="auto">{info.value}</p>
                <p className="mt-0.5 text-xs text-ink/50">{info.note}</p>
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-ink p-6 text-white shadow-sm">
            <h2 className="text-sm font-bold text-gold-400">أوقات الدوام</h2>
            <ul className="mt-4 space-y-3">
              {hours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/70">{item.day}</span>
                  <span className="font-bold">{item.time}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/9647700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-[#25D366] px-6 py-3.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              محادثة واتساب مباشرة
            </a>
          </div>
        </div>

        {/* النموذج */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
