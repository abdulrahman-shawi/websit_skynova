export type Lang = "ar" | "en";

const dict = {
  ar: {
    "app.name": "سكاينوفا",
    "admin.dashboard": "لوحة التحكم",
    "admin.products": "المنتجات",
    "admin.faqs": "الأسئلة الشائعة",
    "admin.certificates": "الشهادات",
    "admin.events": "المؤتمرات والفعاليات",
    "admin.settings": "الإعدادات",
    "admin.viewSite": "عرض الموقع",
    "admin.logout": "تسجيل الخروج",
    "admin.language": "اللغة",

    "login.title": "دخول لوحة التحكم",
    "login.subtitle": "أدخل كلمة المرور للمتابعة إلى داشبورد سكاينوفا.",
    "login.password": "كلمة المرور",
    "login.button": "دخول",
    "login.signingIn": "جارٍ الدخول...",
    "login.wrongPassword": "كلمة المرور غير صحيحة",
    "login.error": "حدث خطأ أثناء الدخول، حاول مجدداً",

    "dash.title": "مرحباً بك في لوحة التحكم",
    "dash.subtitle": "تحكم بمحتوى الموقع وصفحاته من مكان واحد.",
    "dash.dbStatus": "حالة قاعدة البيانات",
    "dash.dbConnected": "متصلة — البيانات تُحفظ في Neon",
    "dash.dbMissing": "غير متصلة — أضف DATABASE_URL في ملف .env.local",
    "dash.dbCheck": "جارٍ الفحص...",
    "dash.counts": "محتوى الموقع",
    "dash.seed": "تعبئة المحتوى الافتراضي",
    "dash.seedHint":
      "يملأ الجداول الفارغة بالمحتوى الحالي للموقع. أنشئ الجداول أولاً بأمر: npx prisma migrate deploy",
    "dash.seeding": "جارٍ التعبئة...",
    "dash.seedDone": "تمت التعبئة بنجاح",
    "dash.seedFailed": "فشلت التعبئة — تحقق من DATABASE_URL",
    "dash.seedNeedsMigration":
      "الجداول غير موجودة بعد — شغّل أمر الترحيل أولاً (يحتاج DATABASE_URL في ملف .env):",
    "dash.quickLinks": "أقسام الداشبورد",

    "entity.add": "إضافة جديد",
    "entity.edit": "تعديل",
    "entity.delete": "حذف",
    "entity.cancel": "إلغاء",
    "entity.save": "حفظ",
    "entity.saving": "جارٍ الحفظ...",
    "entity.saved": "تم الحفظ بنجاح",
    "entity.confirmDelete": "هل أنت متأكد؟ لا يمكن التراجع عن هذا الحذف.",
    "entity.empty": "لا توجد عناصر بعد — اضغط «إضافة جديد».",
    "entity.loadError": "تعذر تحميل البيانات — تحقق من الاتصال بقاعدة البيانات",
    "entity.moveUp": "تحريك لأعلى",
    "entity.moveDown": "تحريك لأسفل",
    "entity.featured": "يظهر في الرئيسية",

    "settings.saved": "تم حفظ الإعدادات بنجاح",
    "settings.save": "حفظ التغييرات",
    "settings.saving": "جارٍ الحفظ...",
    "settings.loadError": "تعذر تحميل الإعدادات",
    "settings.hint": "عدّل النصوص ثم اضغط حفظ — التغييرات تظهر على الموقع مباشرة.",
  },
  en: {
    "app.name": "SKYNOVA",
    "admin.dashboard": "Dashboard",
    "admin.products": "Products",
    "admin.faqs": "FAQs",
    "admin.certificates": "Certificates",
    "admin.events": "Conferences & Events",
    "admin.settings": "Settings",
    "admin.viewSite": "View site",
    "admin.logout": "Sign out",
    "admin.language": "Language",

    "login.title": "Admin sign in",
    "login.subtitle": "Enter the password to access the Skynova dashboard.",
    "login.password": "Password",
    "login.button": "Sign in",
    "login.signingIn": "Signing in...",
    "login.wrongPassword": "Wrong password",
    "login.error": "Sign-in failed, please try again",

    "dash.title": "Welcome to the dashboard",
    "dash.subtitle": "Manage your website content and pages from one place.",
    "dash.dbStatus": "Database status",
    "dash.dbConnected": "Connected — data is saved in Neon",
    "dash.dbMissing": "Not connected — add DATABASE_URL to .env.local",
    "dash.dbCheck": "Checking...",
    "dash.counts": "Site content",
    "dash.seed": "Load default content",
    "dash.seedHint":
      "Fills empty tables with the current site content. Create the tables first with: npx prisma migrate deploy",
    "dash.seeding": "Loading...",
    "dash.seedDone": "Content loaded successfully",
    "dash.seedFailed": "Seeding failed — check DATABASE_URL",
    "dash.seedNeedsMigration":
      "Tables are not created yet — run the migration command first (needs DATABASE_URL in .env):",
    "dash.quickLinks": "Dashboard sections",

    "entity.add": "Add new",
    "entity.edit": "Edit",
    "entity.delete": "Delete",
    "entity.cancel": "Cancel",
    "entity.save": "Save",
    "entity.saving": "Saving...",
    "entity.saved": "Saved successfully",
    "entity.confirmDelete": "Are you sure? This cannot be undone.",
    "entity.empty": "No items yet — click “Add new”.",
    "entity.loadError": "Failed to load data — check the database connection",
    "entity.moveUp": "Move up",
    "entity.moveDown": "Move down",
    "entity.featured": "Shown on homepage",

    "settings.saved": "Settings saved successfully",
    "settings.save": "Save changes",
    "settings.saving": "Saving...",
    "settings.loadError": "Failed to load settings",
    "settings.hint": "Edit the texts then press save — changes appear on the site immediately.",
  },
} as const;

export type StringKey = keyof (typeof dict)["ar"];

export function translate(lang: Lang, key: StringKey): string {
  return dict[lang][key] ?? dict.en[key] ?? key;
}
