"use client";

import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  new: "جديدة",
  in_progress: "قيد المعالجة",
  done: "مكتملة",
};

export default function RequestStatusSelect({
  requestId,
  initialStatus,
}: {
  requestId: number;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [busy, setBusy] = useState(false);

  const update = async (next: string) => {
    if (busy || next === status) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/device-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      setStatus(next);
    } catch {
      // keep previous status
    } finally {
      setBusy(false);
    }
  };

  return (
    <select
      value={status}
      disabled={busy}
      onChange={(e) => void update(e.target.value)}
      className={`rounded-full border px-3 py-1.5 text-xs font-bold outline-none disabled:opacity-50 ${
        status === "done"
          ? "border-green-200 bg-green-50 text-green-700"
          : status === "in_progress"
            ? "border-gold-300 bg-gold-300/20 text-gold-600"
            : "border-blush-200 bg-blush-50 text-blush-700"
      }`}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
