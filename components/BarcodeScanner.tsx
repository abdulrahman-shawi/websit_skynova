"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const REGION_ID = "barcode-scanner-region";

export default function BarcodeScanner() {
  const router = useRouter();
  const scannerRef = useRef<{ stop: () => Promise<void>; clear: () => void } | null>(null);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState("");

  const stopScanner = async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.stop();
    } catch {
      // already stopped
    }
    try {
      scannerRef.current.clear();
    } catch {
      // nothing to clear
    }
    scannerRef.current = null;
    setRunning(false);
  };

  const start = async () => {
    if (running || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode(REGION_ID);
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 300, height: 120 } },
        (decodedText) => {
          void (async () => {
            await stopScanner();
            router.push(`/p/${encodeURIComponent(decodedText.trim())}`);
          })();
        },
        () => {
          // frames without a barcode — ignored
        }
      );
      scannerRef.current = scanner;
      setRunning(true);
    } catch {
      setError(
        "تعذر تشغيل الكاميرا. تأكد من منح إذن الوصول للكاميرا، أو أدخل رقم الباركود يدوياً بالأسفل."
      );
    } finally {
      setBusy(false);
    }
  };

  const stop = () => {
    void stopScanner();
  };

  useEffect(() => {
    return () => {
      void stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lookup = (code: string) => {
    const value = code.trim();
    if (!value) return;
    router.push(`/p/${encodeURIComponent(value)}`);
  };

  return (
    <div>
      <div
        id={REGION_ID}
        className={`overflow-hidden rounded-3xl border-2 border-dashed ${
          running ? "border-blush-500" : "border-blush-200"
        } bg-white`}
      />

      {!running && (
        <button
          type="button"
          onClick={start}
          disabled={busy}
          className="mt-4 w-full rounded-full bg-blush-500 px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
        >
          {busy ? "جارٍ تشغيل الكاميرا..." : "تشغيل الكاميرا لمسح الباركود"}
        </button>
      )}
      {running && (
        <button
          type="button"
          onClick={stop}
          className="mt-4 w-full rounded-full border-2 border-ink px-6 py-4 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
        >
          إيقاف الكاميرا
        </button>
      )}

      {error && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      <div className="my-6 flex items-center gap-4 text-xs font-bold text-ink/40">
        <span className="h-px flex-1 bg-blush-100" />
        أو أدخل الرقم يدوياً
        <span className="h-px flex-1 bg-blush-100" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(manual);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          inputMode="numeric"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="مثال: 6291234567890"
          dir="ltr"
          className="w-full flex-1 rounded-2xl border border-blush-200 bg-background px-4 py-3 text-sm text-left outline-none transition-colors focus:border-blush-500"
        />
        <button
          type="submit"
          disabled={!manual.trim()}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-40"
        >
          بحث
        </button>
      </form>
    </div>
  );
}
