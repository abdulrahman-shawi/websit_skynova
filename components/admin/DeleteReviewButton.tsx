"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteReviewButton({ reviewId }: { reviewId: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void remove()}
      disabled={busy}
      className="rounded-full border-2 border-red-200 px-4 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
    >
      {busy ? "جارٍ الحذف..." : "حذف"}
    </button>
  );
}
