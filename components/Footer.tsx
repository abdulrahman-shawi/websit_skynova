import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-lg font-bold text-white">
              S
            </span>
            <span className="text-xl font-extrabold">سكاينوفا</span>
          </div>
          <p className="text-sm leading-7 text-white/70">
            مصنع متخصص في تصميم وتصنيع أجهزة التجميل والعناية بالبشرة بأعلى
            معايير الجودة العالمية، وخدمة صالونات ومراكز التجميل في العالم العربي.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-400">روابط سريعة</h3>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link href="/products" className="hover:text-white">منتجاتنا</Link></li>
            <li><Link href="/about" className="hover:text-white">من نحن</Link></li>
            <li><Link href="/gallery" className="hover:text-white">المؤتمرات واللقاءات</Link></li>
            <li><Link href="/certificates" className="hover:text-white">الشهادات</Link></li>
            <li><Link href="/contact" className="hover:text-white">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-400">تواصل معنا</h3>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>بغداد — المنصور، شارع 14 رمضان</li>
            <li dir="ltr" className="text-right">+964 770 000 0000</li>
            <li>info@skynova-beauty.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} سكاينوفا لأجهزة التجميل — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
