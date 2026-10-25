"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const logout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/customer/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={busy}
      className="rounded-full border-2 border-ink px-4 py-1.5 text-xs font-bold transition-colors hover:bg-ink hover:text-white disabled:opacity-50"
    >
      {busy ? "جارٍ الخروج..." : "تسجيل الخروج"}
    </button>
  );
}
