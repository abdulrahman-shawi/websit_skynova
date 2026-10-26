"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type DeviceItem = {
  id: number;
  barcode: string;
  addedAt: string;
  product: {
    name: string;
    image: string;
    price: string;
    guarantee: string | null;
    active: boolean;
  } | null;
};

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-blush-500";

export default function DeviceManager() {
  const [items, setItems] = useState<DeviceItem[] | null>(null);
  const [barcode, setBarcode] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<"added" | "notFound" | "duplicate" | "error" | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/customer/devices", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { items: DeviceItem[] };
      setItems(data.items);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async () => {
    const code = barcode.trim();
    if (!code || busy) return;
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch("/api/customer/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: code }),
      });
      if (res.status === 409) {
        setNotice("duplicate");
      } else if (!res.ok) {
        setNotice("error");
      } else {
        const data = (await res.json()) as { found?: boolean };
        setNotice(data.found ? "added" : "notFound");
        setBarcode("");
        await load();
      }
    } catch {
      setNotice("error");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    try {
      const res = await fetch(`/api/customer/devices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setNotice("error");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void add();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          inputMode="numeric"
          dir="ltr"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="أدخل باركود الجهاز — مثال: 6291234567890"
          className={`${inputClass} flex-1 text-left`}
        />
        <button
          type="submit"
          disabled={busy || !barcode.trim()}
          className="rounded-full bg-blush-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
        >
          {busy ? "جارٍ الإضافة..." : "+ إضافة جهاز"}
        </button>
      </form>

      {notice === "added" && (
        <p className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          ✓ تمت إضافة الجهاز إلى حسابك
        </p>
      )}
      {notice === "notFound" && (
        <p className="mt-3 rounded-2xl bg-gold-300/20 px-4 py-3 text-sm font-bold text-gold-600">
          أُضيف الرقم، لكنه لا يطابق أي منتج مسجل لدينا — تحقق منه أو تواصل معنا
        </p>
      )}
      {notice === "duplicate" && (
        <p className="mt-3 rounded-2xl bg-blush-50 px-4 py-3 text-sm font-bold text-blush-700">
          هذا الجهاز مضاف مسبقاً إلى حسابك
        </p>
      )}
      {notice === "error" && (
        <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          حدث خطأ — حاول مجدداً
        </p>
      )}

      <div className="mt-6">
        {items === null ? (
          <p className="py-8 text-center text-sm text-ink/40">جارٍ التحميل...</p>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-blush-200 p-8 text-center">
            <p className="text-sm font-bold text-ink/60">لا توجد أجهزة مسجلة بعد</p>
            <p className="mt-2 text-xs leading-6 text-ink/40">
              أدخل رقم الباركود المطبوع على عبوة جهازك أعلاه، أو امسحه من صفحة
              التحقق وسيُحفظ تلقائياً في حسابك.
            </p>
            <Link
              href="/check"
              className="mt-4 inline-block rounded-full border-2 border-blush-500 px-6 py-2.5 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
            >
              امسح باركود جهازك
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-blush-100 bg-white p-4 shadow-sm"
              >
                {item.product?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.product.image}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-xl border border-blush-100 object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-gold-300/40 text-lg font-black text-blush-400">
                    {item.product?.name?.charAt(0) ?? "؟"}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  {item.product ? (
                    <>
                      <Link
                        href={`/dashboard/device/${item.id}`}
                        className="block truncate text-sm font-extrabold transition-colors hover:text-blush-600"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-ink/50" dir="ltr">
                        {item.barcode}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        {item.product.price && (
                          <span className="font-bold text-blush-600">
                            {item.product.price}
                          </span>
                        )}
                        {item.product.guarantee && (
                          <span className="rounded-full bg-blush-50 px-2 py-0.5 font-bold text-blush-700">
                            {item.product.guarantee}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/dashboard/device/${item.id}`}
                        className="block text-sm font-extrabold text-ink/60 transition-colors hover:text-blush-600"
                      >
                        جهاز غير مسجل لدينا
                      </Link>
                      <p className="mt-0.5 text-xs text-ink/50" dir="ltr">
                        {item.barcode}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <Link
                    href={`/p/${encodeURIComponent(item.barcode)}`}
                    className="rounded-full border-2 border-blush-500 px-4 py-1.5 text-center text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
                  >
                    المنتج
                  </Link>
                  <button
                    type="button"
                    onClick={() => void remove(item.id)}
                    className="rounded-full border-2 border-red-200 px-4 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
