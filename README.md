# سكاينوفا — SKYNOVA

موقع شركة سكاينوفا لأجهزة التجميل والليزر — مبني بـ Next.js 14 (App Router) و Tailwind CSS، مع **داشبورد تحكم كامل** بمحتوى الموقع مخزّن في قاعدة بيانات [Neon Postgres](https://neon.tech).

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## إعداد الداشبورد

1. أنشئ ملف `.env` في جذر المشروع (مستثنى من Git تلقائياً) وضع فيه:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
ADMIN_PASSWORD="كلمة-مرور-قوية"
SESSION_SECRET="مفتاح-عشوائي-طويل"
```

- `DATABASE_URL`: من لوحة Neon → Connection Details.
- `SESSION_SECRET`: ولّده بأمر `openssl rand -base64 32`.
- ملف `.env.example` قالب جاهز، ويمكنك أيضاً وضع `ADMIN_PASSWORD` و `SESSION_SECRET` في `.env.local` — كلاهما يعمل.

2. أنشئ الجداول في Neon بأمر الترحيل:

```bash
npm run db:migrate
# أو مباشرة: npx prisma migrate deploy
```

3. شغّل الموقع (`npm run dev`) وادخل على [http://localhost:3000/admin](http://localhost:3000/admin) — سيطلب منك كلمة المرور.

4. من لوحة التحكم اضغط **«تعبئة المحتوى الافتراضي»** — يملأ الجداول الفارغة بالمحتوى الحالي للموقع.

5. عدّل المنتجات أو الأسئلة الشائعة أو الشهادات أو الفعاليات أو النصوص العامة من الأقسام — كل تغيير يظهر على الموقع مباشرة.

## ما الذي يتحكم به الداشبورد؟

| القسم | الموقع المتأثر |
|---|---|
| المنتجات والأجهزة | `/products` + الأجهزة المميزة في الرئيسية |
| الأسئلة الشائعة | قسم FAQ في الرئيسية (بما فيها بيانات SEO المنظمة) |
| الشهادات | `/certificates` + شريط الشهادات في الرئيسية |
| المؤتمرات والفعاليات | `/gallery` + قسم الفعاليات في الرئيسية |
| الإعدادات | نصوص الهيرو، «من نحن»، الضمان، معلومات التواصل ورقم الواتساب، صفحة من نحن، صفحات الشهادات والمعرض، الفوتر |

> **ملاحظة:** إذا لم تُضبط `DATABASE_URL` يعمل الموقع بمحتواه الافتراضي المدمج ولا ينكسر — لكن التعديلات من الداشبورد تتطلب قاعدة البيانات.

## النشر على Vercel

1. ارفع المشروع إلى GitHub واربطه بمشروع Vercel.
2. في Vercel → **Settings → Environment Variables** أضف نفس المتغيرات الثلاثة (`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`).
3. Deploy — ثم ادخل على `https://your-domain.com/admin`.

## بنية المشروع

```
app/
  (site)/            # صفحات الموقع العامة (تقرأ من DB مع تراجع للافتراضي)
  admin/             # الداشبورد
    login/           # صفحة الدخول
    (panel)/         # الأقسام المحمية (لوحة التحكم، المنتجات، الإعدادات...)
  api/admin/         # مسارات CRUD + login/logout + seed
components/
  admin/             # مكونات الداشبورد (ثنائية اللغة AR/EN)
lib/
  defaults.ts        # المحتوى الافتراضي (مصدر البذر والتراجع)
  content.ts         # دوال القراءة العامة من DB
  db.ts              # عميل Prisma + محوّل Neon
  auth.ts            # توقيع الجلسات (HMAC)
prisma/
  schema.prisma      # نماذج الجداول (مصدر الحقيقة)
  migrations/        # ترحيلات SQL الجاهزة (0001_init)
middleware.ts        # حماية مسارات /admin
```
