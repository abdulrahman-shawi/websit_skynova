"use client";

import Link from "next/link";
import { useState } from "react";

export default function SaveDeviceButton({ barcode }: { barcode: string }) {
  const [state, setState] = useState<"idle" | "busy" | "saved" | "duplicate" | "login">("idle");

  const save = async () => {
    if (state === "busy") return;
    setState("busy");
    try {
      const res = await fetch("/api/customer/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode }),
      });
      if (res.status === 401) {
        setState("login");
      } else if (res.status === 409) {
        setState("duplicate");
      } else if (res.ok) {
        setState("saved");
      } else {
        setState("idle");
      }
    } catch {
      setState("idle");
    }
  };

  if (state === "saved") {
    return (
      <div className="mt-3 flex items-center justify-center gap-3">
        <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          ✓ حُفظ الجهاز في حسابك
        </p>
        <Link
          href="/dashboard"
          className="rounded-full border-2 border-blush-500 px-4 py-2 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
        >
          عرض أجهزتي
        </Link>
      </div>
    );
  }

  if (state === "login") {
    return (
      <div className="mt-3 text-center">
        <Link
          href="/login"
          className="inline-block rounded-full border-2 border-ink px-6 py-3 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
        >
          سجّل الدخول لحفظ الجهاز في حسابك
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-3 text-center">
      <button
        type="button"
        onClick={() => void save()}
        disabled={state === "busy"}
        className="rounded-full border-2 border-blush-500 px-6 py-3 text-sm font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white disabled:opacity-50"
      >
        {state === "busy"
          ? "جارٍ الحفظ..."
          : state === "duplicate"
            ? "هذا الجهاز مضاف مسبقاً ✓"
            : "+ أضف هذا الجهاز إلى حسابي"}
      </button>
    </div>
  );
}
