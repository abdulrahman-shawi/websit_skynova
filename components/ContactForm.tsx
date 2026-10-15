"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `استفسار من موقع سكاينوفا:%0a%0aالاسم: ${form.name}%0aالهاتف: ${form.phone}%0aالموضوع: ${form.subject}%0aالرسالة: ${form.message}`;
    window.open(`https://wa.me/9647700000000?text=${text}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-blush-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blush-50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d63a67" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold">تم تجهيز رسالتك</h3>
        <p className="mx-auto mt-3 max-w-sm leading-8 text-ink/60">
          فتحنا لك محادثة الواتساب برسالتك جاهزة — اضغط إرسال هناك وسنرد عليك
          في أقرب وقت.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border-2 border-ink px-6 py-2.5 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
        >
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-blush-200 bg-background px-5 py-3.5 text-sm outline-none transition-colors focus:border-blush-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-blush-100 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold">
            الاسم الكامل
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="اكتب اسمك"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-bold">
            رقم الهاتف
          </label>
          <input
            id="phone"
            required
            type="tel"
            dir="ltr"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="07xx xxx xxxx"
            className={`${inputClass} text-right`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm font-bold">
          الموضوع
        </label>
        <select
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
        >
          <option value="">اختر موضوع الرسالة</option>
          <option value="استفسار عن جهاز">استفسار عن جهاز</option>
          <option value="طلب عرض سعر">طلب عرض سعر</option>
          <option value="الصيانة والضمان">الصيانة والضمان</option>
          <option value="التوزيع والشراكة">التوزيع والشراكة</option>
          <option value="أخرى">أخرى</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-bold">
          رسالتك
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="اكتب تفاصيل استفسارك..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600"
      >
        إرسال عبر الواتساب
      </button>
      <p className="mt-3 text-center text-xs text-ink/50">
        سيتم فتح محادثة واتساب برسالتك جاهزة للإرسال.
      </p>
    </form>
  );
}
