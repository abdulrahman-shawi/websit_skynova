"use client";

import { useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const buttonClass =
  "rounded-full border-2 border-blush-500 px-4 py-1.5 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50";

export default function ImageField({
  value,
  folder,
  onChange,
}: {
  value: string;
  folder: string;
  onChange: (url: string) => void;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [failed, setFailed] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    setFailed(false);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error();
      onChange(data.url);
    } catch {
      setFailed(true);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-20 w-32 rounded-2xl border border-blush-200 object-cover"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className={buttonClass}
            >
              {uploading ? t("image.uploading") : t("image.choose")}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border-2 border-red-200 px-4 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              {t("image.remove")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`${buttonClass} w-full px-4 py-6 text-sm`}
        >
          {uploading ? t("image.uploading") : `+ ${t("image.choose")}`}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      {failed && (
        <p className="mt-2 text-xs font-bold text-red-500">{t("image.uploadFailed")}</p>
      )}
      <p className="mt-1.5 text-xs text-ink/40">{t("image.hint")}</p>
    </div>
  );
}
