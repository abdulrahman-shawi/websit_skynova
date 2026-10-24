import type { SiteSettings } from "./defaults";

type L = { ar: string; en: string };

export type FieldDef = {
  name: string;
  type: "text" | "textarea" | "checkbox" | "image";
  label: L;
  required?: boolean;
};

export type EntityKey = "products" | "faqs" | "certificates" | "events";

export type EntityDef = {
  key: EntityKey;
  api: string;
  title: L;
  fields: FieldDef[];
  displayField: string;
  secondaryField?: string;
};

export const ENTITY_DEFS: Record<EntityKey, EntityDef> = {
  products: {
    key: "products",
    api: "/api/admin/products",
    title: { ar: "المنتجات والأجهزة", en: "Products & devices" },
    displayField: "name",
    secondaryField: "category",
    fields: [
      { name: "name", type: "text", label: { ar: "اسم الجهاز", en: "Device name" }, required: true },
      { name: "category", type: "text", label: { ar: "الفئة", en: "Category" } },
      { name: "badge", type: "text", label: { ar: "الشارة (الأحدث/الأكثر مبيعاً...)", en: "Badge" } },
      { name: "price", type: "text", label: { ar: "السعر", en: "Price" } },
      { name: "guarantee", type: "text", label: { ar: "الضمان (اتركه فارغاً بدون ضمان)", en: "Warranty (empty = none)" } },
      { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
      { name: "featured", type: "checkbox", label: { ar: "يظهر في الصفحة الرئيسية", en: "Show on homepage" } },
    ],
  },
  faqs: {
    key: "faqs",
    api: "/api/admin/faqs",
    title: { ar: "الأسئلة الشائعة", en: "FAQs" },
    displayField: "question",
    fields: [
      { name: "question", type: "text", label: { ar: "السؤال", en: "Question" }, required: true },
      { name: "answer", type: "textarea", label: { ar: "الجواب", en: "Answer" } },
    ],
  },
  certificates: {
    key: "certificates",
    api: "/api/admin/certificates",
    title: { ar: "الشهادات والاعتمادات", en: "Certificates" },
    displayField: "name",
    secondaryField: "title",
    fields: [
      { name: "name", type: "text", label: { ar: "اسم الشهادة", en: "Certificate name" }, required: true },
      { name: "title", type: "text", label: { ar: "العنوان الوصفي", en: "Title" } },
      { name: "issuer", type: "text", label: { ar: "الجهة المانحة", en: "Issuer" } },
      { name: "year", type: "text", label: { ar: "سنة الاعتماد", en: "Year" } },
      { name: "scope", type: "text", label: { ar: "النطاق", en: "Scope" } },
      { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
    ],
  },
  events: {
    key: "events",
    api: "/api/admin/events",
    title: { ar: "المؤتمرات والفعاليات", en: "Conferences & events" },
    displayField: "title",
    secondaryField: "location",
    fields: [
      { name: "title", type: "text", label: { ar: "اسم الفعالية", en: "Event title" }, required: true },
      { name: "type", type: "text", label: { ar: "النوع (معرض دولي/ورشة...)", en: "Type" } },
      { name: "date", type: "text", label: { ar: "التاريخ", en: "Date" } },
      { name: "location", type: "text", label: { ar: "الموقع", en: "Location" } },
      { name: "image", type: "image", label: { ar: "صورة الفعالية", en: "Event image" } },
      { name: "description", type: "textarea", label: { ar: "الوصف", en: "Description" } },
    ],
  },
};

export type SettingsField =
  | { kind: "text"; name: string; label: L }
  | { kind: "textarea"; name: string; label: L }
  | { kind: "stringList"; name: string; label: L }
  | { kind: "objectList"; name: string; label: L; fields: { name: string; label: L }[] };

export type SettingsGroup = {
  key: keyof SiteSettings;
  label: L;
  fields: SettingsField[];
};

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    key: "home.hero",
    label: { ar: "الهيرو (الصفحة الرئيسية)", en: "Homepage hero" },
    fields: [
      { kind: "text", name: "eyebrow", label: { ar: "السطر العلوي الصغير", en: "Eyebrow line" } },
      { kind: "text", name: "titleLine1", label: { ar: "العنوان — السطر الأول", en: "Title line 1" } },
      { kind: "text", name: "titleLine2", label: { ar: "العنوان — السطر الثاني", en: "Title line 2" } },
      { kind: "textarea", name: "subtitle", label: { ar: "النص التعريفي", en: "Subtitle" } },
      { kind: "stringList", name: "badges", label: { ar: "الشارات (ضمان/معرض/توصيل)", en: "Badges" } },
    ],
  },
  {
    key: "home.about",
    label: { ar: "قسم من نحن — الرئيسية", en: "Homepage about section" },
    fields: [
      { kind: "stringList", name: "paragraphs", label: { ar: "الفقرات", en: "Paragraphs" } },
      {
        kind: "objectList",
        name: "stats",
        label: { ar: "الإحصائيات", en: "Statistics" },
        fields: [
          { name: "value", label: { ar: "القيمة", en: "Value" } },
          { name: "label", label: { ar: "الوصف", en: "Label" } },
        ],
      },
    ],
  },
  {
    key: "home.warranty",
    label: { ar: "قسم الضمان — الرئيسية", en: "Homepage warranty section" },
    fields: [
      { kind: "textarea", name: "intro", label: { ar: "المقدمة", en: "Intro" } },
      { kind: "stringList", name: "included", label: { ar: "يشمل الضمان", en: "Warranty includes" } },
      { kind: "stringList", name: "excluded", label: { ar: "لا يشمل الضمان", en: "Warranty excludes" } },
      { kind: "textarea", name: "note", label: { ar: "الملاحظة الختامية", en: "Closing note" } },
    ],
  },
  {
    key: "home.cta",
    label: { ar: "قسم التواصل — الرئيسية", en: "Homepage contact CTA" },
    fields: [
      { kind: "text", name: "title", label: { ar: "العنوان", en: "Title" } },
      { kind: "textarea", name: "text", label: { ar: "النص", en: "Text" } },
    ],
  },
  {
    key: "contact",
    label: { ar: "معلومات التواصل", en: "Contact information" },
    fields: [
      { kind: "textarea", name: "intro", label: { ar: "مقدمة صفحة التواصل", en: "Contact page intro" } },
      { kind: "text", name: "address", label: { ar: "العنوان", en: "Address" } },
      { kind: "text", name: "phone", label: { ar: "رقم الهاتف (للعرض)", en: "Phone (display)" } },
      { kind: "text", name: "whatsapp", label: { ar: "رقم الواتساب (بصيغة دولية بدون +)", en: "WhatsApp number (intl, no +)" } },
      { kind: "text", name: "email", label: { ar: "البريد الإلكتروني", en: "Email" } },
      {
        kind: "objectList",
        name: "hours",
        label: { ar: "أوقات الدوام", en: "Working hours" },
        fields: [
          { name: "day", label: { ar: "اليوم", en: "Day" } },
          { name: "time", label: { ar: "الوقت", en: "Time" } },
        ],
      },
    ],
  },
  {
    key: "about_page",
    label: { ar: "صفحة من نحن", en: "About page" },
    fields: [
      { kind: "textarea", name: "intro", label: { ar: "المقدمة", en: "Intro" } },
      { kind: "stringList", name: "story", label: { ar: "فقرات القصة", en: "Story paragraphs" } },
      { kind: "text", name: "highlight.value", label: { ar: "بطاقة الإنجاز — الرقم", en: "Highlight number" } },
      { kind: "text", name: "highlight.label", label: { ar: "بطاقة الإنجاز — العنوان", en: "Highlight label" } },
      { kind: "textarea", name: "highlight.text", label: { ar: "بطاقة الإنجاز — النص", en: "Highlight text" } },
      {
        kind: "objectList",
        name: "values",
        label: { ar: "القيم", en: "Values" },
        fields: [
          { name: "title", label: { ar: "العنوان", en: "Title" } },
          { name: "text", label: { ar: "النص", en: "Text" } },
        ],
      },
      {
        kind: "objectList",
        name: "timeline",
        label: { ar: "الخط الزمني", en: "Timeline" },
        fields: [
          { name: "year", label: { ar: "السنة", en: "Year" } },
          { name: "event", label: { ar: "الحدث", en: "Event" } },
        ],
      },
    ],
  },
  {
    key: "certificates_page",
    label: { ar: "صفحة الشهادات", en: "Certificates page" },
    fields: [
      { kind: "textarea", name: "intro", label: { ar: "المقدمة", en: "Intro" } },
      { kind: "text", name: "ctaTitle", label: { ar: "عنوان قسم الطلب", en: "CTA title" } },
      { kind: "textarea", name: "ctaText", label: { ar: "نص قسم الطلب", en: "CTA text" } },
    ],
  },
  {
    key: "gallery_page",
    label: { ar: "صفحة المؤتمرات والمعرض", en: "Gallery page" },
    fields: [
      { kind: "textarea", name: "intro", label: { ar: "المقدمة", en: "Intro" } },
      {
        kind: "objectList",
        name: "stats",
        label: { ar: "إحصائيات الصفحة", en: "Page statistics" },
        fields: [
          { name: "value", label: { ar: "القيمة", en: "Value" } },
          { name: "label", label: { ar: "الوصف", en: "Label" } },
        ],
      },
      { kind: "text", name: "ctaTitle", label: { ar: "عنوان قسم التواصل", en: "CTA title" } },
      { kind: "textarea", name: "ctaText", label: { ar: "نص قسم التواصل", en: "CTA text" } },
      { kind: "text", name: "ctaEmail", label: { ar: "بريد فريق الفعاليات", en: "Events team email" } },
    ],
  },
  {
    key: "footer",
    label: { ar: "الفوتر", en: "Footer" },
    fields: [
      { kind: "textarea", name: "description", label: { ar: "نبذة الفوتر", en: "Footer blurb" } },
    ],
  },
];
