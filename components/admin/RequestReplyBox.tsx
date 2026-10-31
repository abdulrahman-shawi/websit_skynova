"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestReplyBox({
  requestId,
  initialReply,
  repliedAt,
}: {
  requestId: number;
  initialReply: string;
  repliedAt: Date | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [reply, setReply] = useState(initialReply);
  const [savedReply, setSavedReply] = useState(initialReply);
  const [savedAt, setSavedAt] = useState(repliedAt);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const save = async () => {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const res = await fetch(`/api/admin/device-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      if (!res.ok) throw new Error();
      setSavedReply(reply);
      setSavedAt(reply ? new Date() : null);
      setEditing(false);
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 rounded-2xl border border-dashed border-blush-200 bg-background p-4">
      {savedReply && !editing ? (
        <>
          <p className="text-xs font-bold text-blush-600">
            رد الإدارة
            {savedAt && (
              <span className="ms-2 font-normal text-ink/40">
                {new Intl.DateTimeFormat("ar", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(savedAt)}
              </span>
            )}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-ink/70">
            {savedReply}
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-3 rounded-full border-2 border-blush-500 px-4 py-1.5 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
          >
            تعديل الرد
          </button>
        </>
      ) : (
        <>
          <label className="mb-2 block text-xs font-bold text-ink/50">
            {savedReply ? "تعديل رد الإدارة" : "اكتب رداً يظهر للعميل في داشبورده"}
          </label>
          <textarea
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="اكتب الرد على رسالة العميل..."
            className="w-full resize-none rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blush-500"
          />
          {error && (
            <p className="mt-2 text-xs font-bold text-red-600">
              حدث خطأ — حاول مجدداً
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => void save()}
              disabled={busy}
              className="rounded-full bg-blush-500 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
            >
              {busy ? "جارٍ الحفظ..." : savedReply ? "حفظ التعديل" : "إرسال الرد"}
            </button>
            {savedReply && (
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setReply(savedReply);
                }}
                className="rounded-full border-2 border-blush-200 px-5 py-2 text-xs font-bold text-ink/50 transition-colors hover:border-blush-500 hover:text-blush-600"
              >
                إلغاء
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
