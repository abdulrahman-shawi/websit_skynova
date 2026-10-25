"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-blush-500";

export default function CustomerAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/customer/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(
          res.status === 409
            ? "هذا الرقم مسجل مسبقاً — سجّل الدخول بدلاً من ذلك"
            : res.status === 401
              ? "رقم الهاتف أو كلمة المرور غير صحيحة"
              : data?.error === "password too short"
                ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
                : data?.error === "invalid phone"
                  ? "أدخل رقم هاتف صحيح (أرقام فقط)"
                  : "حدث خطأ — حاول مجدداً"
        );
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("تعذر الاتصال — تحقق من الإنترنت وحاول مجدداً");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 rounded-2xl bg-blush-50 p-1">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${
              mode === m ? "bg-white text-blush-600 shadow-sm" : "text-ink/50"
            }`}
          >
            {m === "login" ? "تسجيل الدخول" : "حساب جديد"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="mb-1.5 block text-sm font-bold">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="مثال: أحمد محمد"
            />
          </div>
        )}
        <div>
          <label className="mb-1.5 block text-sm font-bold">رقم الهاتف</label>
          <input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputClass} text-left`}
            placeholder="7700000000"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold">كلمة المرور</label>
          <input
            type="password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} text-left`}
            placeholder="••••••••"
          />
          {mode === "register" && (
            <p className="mt-1.5 text-xs text-ink/40">6 أحرف على الأقل</p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={busy || !phone.trim() || !password || (mode === "register" && !name.trim())}
        className="mt-6 w-full rounded-full bg-blush-500 px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
      >
        {busy
          ? "جارٍ التنفيذ..."
          : mode === "login"
            ? "دخول"
            : "إنشاء الحساب"}
      </button>
    </div>
  );
}
