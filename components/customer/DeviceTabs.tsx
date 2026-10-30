"use client";

import { useCallback, useEffect, useState } from "react";

const KINDS = [
  { value: "followup", label: "متابعة نتائج" },
  { value: "maintenance", label: "صيانة" },
  { value: "consult", label: "استشارة" },
] as const;

const KIND_LABELS: Record<string, string> = {
  followup: "متابعة نتائج",
  maintenance: "صيانة",
  consult: "استشارة",
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  new: { label: "جديدة", className: "bg-blush-50 text-blush-700" },
  in_progress: { label: "قيد المعالجة", className: "bg-gold-300/20 text-gold-600" },
  done: { label: "مكتملة", className: "bg-green-50 text-green-700" },
};

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-blush-500";

type RequestItem = {
  id: number;
  kind: string;
  message: string;
  status: string;
  createdAt: string;
};

type NoteItem = {
  id: number;
  text: string;
  createdAt: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function DeviceTabs({
  deviceId,
  whatsapp,
  product,
  barcode,
}: {
  deviceId: number;
  whatsapp: string;
  product: {
    name: string;
    image: string;
    price: string;
    guarantee: string | null;
  } | null;
  barcode: string;
}) {
  const [tab, setTab] = useState<"followup" | "notes" | "chat">("followup");
  const productName = product?.name ?? null;

  const [requests, setRequests] = useState<RequestItem[] | null>(null);
  const [kind, setKind] = useState<string>("followup");
  const [message, setMessage] = useState("");
  const [requestBusy, setRequestBusy] = useState(false);
  const [requestNotice, setRequestNotice] = useState<"sent" | "error" | null>(null);

  const [notes, setNotes] = useState<NoteItem[] | null>(null);
  const [noteText, setNoteText] = useState("");
  const [noteBusy, setNoteBusy] = useState(false);

  const loadRequests = useCallback(async () => {
    try {
      const res = await fetch(`/api/customer/devices/${deviceId}/requests`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { items: RequestItem[] };
      setRequests(data.items);
    } catch {
      setRequests([]);
    }
  }, [deviceId]);

  const loadNotes = useCallback(async () => {
    try {
      const res = await fetch(`/api/customer/devices/${deviceId}/notes`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { items: NoteItem[] };
      setNotes(data.items);
    } catch {
      setNotes([]);
    }
  }, [deviceId]);

  useEffect(() => {
    loadRequests();
    loadNotes();
  }, [loadRequests, loadNotes]);

  const sendRequest = async () => {
    if (requestBusy || !message.trim()) return;
    setRequestBusy(true);
    setRequestNotice(null);
    try {
      const res = await fetch(`/api/customer/devices/${deviceId}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, message }),
      });
      if (!res.ok) throw new Error();
      setMessage("");
      setRequestNotice("sent");
      await loadRequests();
    } catch {
      setRequestNotice("error");
    } finally {
      setRequestBusy(false);
    }
  };

  const addNote = async () => {
    if (noteBusy || !noteText.trim()) return;
    setNoteBusy(true);
    try {
      const res = await fetch(`/api/customer/devices/${deviceId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noteText }),
      });
      if (!res.ok) throw new Error();
      setNoteText("");
      await loadNotes();
    } catch {
      // keep text for retry
    } finally {
      setNoteBusy(false);
    }
  };

  const removeNote = async (noteId: number) => {
    try {
      const res = await fetch(`/api/customer/devices/${deviceId}/notes/${noteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await loadNotes();
    } catch {
      // ignore
    }
  };

  const chatText = encodeURIComponent(
    `مرحباً، لدي استفسار عن جهازي:\nالمنتج: ${productName ?? "غير مسجل"}\nالباركود: ${barcode}`
  );

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
      <div>
        <div className="rounded-3xl border border-blush-100 bg-white p-5 text-center shadow-sm">
          {product?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt=""
              className="mx-auto h-36 w-36 rounded-3xl border border-blush-100 object-cover"
            />
          ) : (
            <span className="mx-auto flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-blush-100 to-gold-300/40 text-4xl font-black text-blush-400">
              {(product?.name ?? "؟").charAt(0)}
            </span>
          )}
          <h1 className="mt-4 text-lg font-black leading-7">
            {product?.name ?? "جهاز غير مسجل لدينا"}
          </h1>
          <p className="mt-1 text-xs text-ink/50" dir="ltr">
            {barcode}
          </p>
          {(product?.price || product?.guarantee) && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              {product?.price && (
                <span className="font-bold text-blush-600">{product.price}</span>
              )}
              {product?.guarantee && (
                <span className="rounded-full bg-blush-50 px-3 py-1 font-bold text-blush-700">
                  {product.guarantee}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1 rounded-3xl border border-blush-100 bg-white p-2 shadow-sm">
          {(
            [
              { key: "followup", label: "متابعة" },
              { key: "notes", label: "ملاحظات" },
              { key: "chat", label: "دردش معنا" },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`flex w-full items-center rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                tab === item.key
                  ? "bg-blush-50 text-blush-600"
                  : "text-ink/50 hover:bg-blush-50/50 hover:text-ink"
              }`}
            >
              {item.label}
              {tab === item.key && <span className="ms-auto">←</span>}
            </button>
          ))}
        </div>
      </div>

      <div>

      {tab === "followup" && (
        <div className="mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendRequest();
            }}
            className="rounded-2xl border border-blush-100 bg-white p-4"
          >
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k.value}
                  type="button"
                  onClick={() => setKind(k.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                    kind === k.value
                      ? "bg-blush-500 text-white"
                      : "bg-blush-50 text-blush-700"
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب تفاصيل طلبك — مثال: استخدم الجهاز أسبوعاً وأريد متابعة النتائج..."
              className={`${inputClass} mt-3 resize-none`}
            />
            <button
              type="submit"
              disabled={requestBusy || !message.trim()}
              className="mt-3 w-full rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
            >
              {requestBusy ? "جارٍ الإرسال..." : "إرسال الطلب"}
            </button>
            {requestNotice === "sent" && (
              <p className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                ✓ أُرسل طلبك — سيتواصل معك فريقنا وسيظهر التحديث هنا
              </p>
            )}
            {requestNotice === "error" && (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                حدث خطأ — حاول مجدداً
              </p>
            )}
          </form>

          <div className="mt-5 space-y-3">
            {requests === null ? (
              <p className="py-6 text-center text-sm text-ink/40">جارٍ التحميل...</p>
            ) : requests.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-blush-200 p-6 text-center text-sm text-ink/40">
                لا توجد طلبات متابعة لهذا الجهاز بعد
              </p>
            ) : (
              requests.map((item) => {
                const status = STATUS_LABELS[item.status] ?? STATUS_LABELS.new;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-blush-100 bg-white p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-ink/50">
                        {KIND_LABELS[item.kind] ?? item.kind}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}>
                        {status.label}
                      </span>
                      <span className="ms-auto text-xs text-ink/40">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-ink/70">
                      {item.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {tab === "notes" && (
        <div className="mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void addNote();
            }}
          >
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="اكتب ملاحظة خاصة — إعدادات الجلسة، ملاحظات على البشرة، تاريخ آخر استخدام..."
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={noteBusy || !noteText.trim()}
              className="mt-3 w-full rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
            >
              {noteBusy ? "جارٍ الحفظ..." : "+ حفظ الملاحظة"}
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {notes === null ? (
              <p className="py-6 text-center text-sm text-ink/40">جارٍ التحميل...</p>
            ) : notes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-blush-200 p-6 text-center text-sm text-ink/40">
                لا توجد ملاحظات بعد — ملاحظاتك خاصة بك ولا يراها أحد غيرك
              </p>
            ) : (
              notes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl border border-blush-100 bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="whitespace-pre-line text-sm leading-7 text-ink/70">
                      {item.text}
                    </p>
                    <p className="mt-1 text-xs text-ink/40">{formatDate(item.createdAt)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void removeNote(item.id)}
                    className="shrink-0 rounded-full border-2 border-red-200 px-3 py-1 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                  >
                    حذف
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "chat" && (
        <div className="mt-5 rounded-2xl border border-blush-100 bg-white p-6 text-center">
          <p className="text-sm leading-7 text-ink/60">
            تحدث مباشرة مع فريق سكاينوفا عبر الواتساب بخصوص هذا الجهاز — ستفتح
            المحادثة برسالة جاهزة تتضمن اسم المنتج ورقم الباركود.
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=${chatText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            دردش معنا على الواتساب
          </a>
          <p className="mt-3 text-xs text-ink/40" dir="ltr">
            {productName ?? "غير مسجل"} — {barcode}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
