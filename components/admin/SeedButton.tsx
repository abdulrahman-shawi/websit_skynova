"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

type Status = "idle" | "loading" | "done" | "error";

export default function SeedButton() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [filled, setFilled] = useState<string[]>([]);

  const run = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { filled?: string[] };
      setFilled(data.filled ?? []);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl border border-blush-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-extrabold">{t("dash.seed")}</h3>
      <p className="mt-2 text-sm leading-7 text-ink/60">{t("dash.seedHint")}</p>
      <button
        type="button"
        onClick={run}
        disabled={status === "loading"}
        className="mt-4 rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
      >
        {status === "loading" ? t("dash.seeding") : t("dash.seed")}
      </button>
      {status === "done" && (
        <p className="mt-3 text-sm font-bold text-green-600">
          {t("dash.seedDone")}
          {filled.length > 0 ? ` (${filled.join(", ")})` : ""}
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm font-bold text-red-500">{t("dash.seedFailed")}</p>
      )}
    </div>
  );
}
