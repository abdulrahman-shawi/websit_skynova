"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

export default function LoginForm() {
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<"wrong" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      setError(res.status === 401 ? "wrong" : "error");
    } catch {
      setError("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blush-50 to-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-gold-500 text-xl font-bold text-white">
              S
            </span>
            <span className="text-2xl font-extrabold text-ink">
              {t("app.name")}
            </span>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[2rem] border border-blush-100 bg-white p-8 shadow-soft"
        >
          <h1 className="text-2xl font-black text-ink">{t("login.title")}</h1>
          <p className="mt-2 text-sm leading-7 text-ink/60">{t("login.subtitle")}</p>

          <label htmlFor="password" className="mb-2 mt-6 block text-sm font-bold text-ink">
            {t("login.password")}
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-blush-200 bg-background px-5 py-3.5 text-sm outline-none transition-colors focus:border-blush-500"
          />

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error === "wrong" ? t("login.wrongPassword") : t("login.error")}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-blush-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
          >
            {loading ? t("login.signingIn") : t("login.button")}
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-colors ${
              lang === "ar" ? "bg-ink text-white" : "border border-blush-200 bg-white text-ink/60"
            }`}
          >
            عربي
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-colors ${
              lang === "en" ? "bg-ink text-white" : "border border-blush-200 bg-white text-ink/60"
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
