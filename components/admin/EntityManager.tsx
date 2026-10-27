"use client";

import { useCallback, useEffect, useState } from "react";
import type { EntityDef } from "@/lib/admin-config";
import { useLanguage } from "./LanguageProvider";
import ImageField from "./ImageField";

type Item = Record<string, unknown> & { id: number };

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-blush-500";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseCodes(value: unknown): string[] {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toDateInputValue(value: unknown): string {
  const str = typeof value === "string" ? value.trim() : "";
  return ISO_DATE.test(str) ? str : "";
}

export default function EntityManager({ def }: { def: EntityDef }) {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState<Record<string, unknown> | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<"saved" | "error" | "duplicateCode" | null>(null);
  const [duplicateCode, setDuplicateCode] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(def.api, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { items: Item[] };
      setItems(data.items);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [def.api]);

  useEffect(() => {
    load();
  }, [load]);

  const emptyValue = (field: (typeof def.fields)[number]) => {
    if (field.type === "checkbox") return false;
    return "";
  };

  const openNew = () => {
    const empty: Record<string, unknown> = {};
    for (const field of def.fields) {
      empty[field.name] = emptyValue(field);
    }
    setForm(empty);
    setEditId(null);
    setNotice(null);
  };

  const openEdit = (item: Item) => {
    const values: Record<string, unknown> = {};
    for (const field of def.fields) {
      const value = item[field.name] ?? emptyValue(field);
      values[field.name] =
        field.type === "codes" && Array.isArray(value)
          ? (value as string[]).join("\n")
          : value;
    }
    setForm(values);
    setEditId(item.id);
    setNotice(null);
  };

  const closeForm = () => {
    setForm(null);
    setEditId(null);
  };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setNotice(null);
    try {
      const payload: Record<string, unknown> = { ...form };
      for (const field of def.fields) {
        if (field.type === "codes") payload[field.name] = parseCodes(payload[field.name]);
      }
      const res = await fetch(editId === null ? def.api : `${def.api}/${editId}`, {
        method: editId === null ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
          code?: string;
        } | null;
        if (data?.error === "duplicate_code") {
          setDuplicateCode(data.code ?? "");
          setNotice("duplicateCode");
          setSaving(false);
          return;
        }
        throw new Error();
      }
      if (!res.ok) throw new Error();
      setNotice("saved");
      closeForm();
      await load();
    } catch {
      setNotice("error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: Item) => {
    if (!window.confirm(t("entity.confirmDelete"))) return;
    try {
      const res = await fetch(`${def.api}/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setNotice("error");
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setItems(next);
    try {
      await fetch(`${def.api}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((item) => item.id) }),
      });
    } catch {
      await load();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">{def.title[lang]}</h1>
          <p className="mt-1 text-sm text-ink/50">{def.title[lang === "ar" ? "en" : "ar"]}</p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-full bg-blush-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600"
        >
          + {t("entity.add")}
        </button>
      </div>

      {notice === "saved" && (
        <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          ✓ {t("entity.saved")}
        </p>
      )}
      {notice === "duplicateCode" && (
        <p className="mt-4 rounded-2xl bg-gold-300/20 px-4 py-3 text-sm font-bold text-gold-600">
          {t("entity.duplicateCode")}{" "}
          <span dir="ltr" className="font-black">
            {duplicateCode}
          </span>
        </p>
      )}
      {notice === "error" && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {t("entity.loadError")}
        </p>
      )}

      {form !== null && (
        <div className="mt-6 rounded-3xl border border-blush-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold">
            {editId === null ? t("entity.add") : t("entity.edit")}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {def.fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.type === "textarea" ||
                  field.type === "image" ||
                  field.type === "codes"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                {field.type === "checkbox" ? (
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-blush-200 bg-background px-4 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })}
                      className="h-4 w-4 accent-blush-500"
                    />
                    <span className="text-sm font-bold">{field.label[lang]}</span>
                  </label>
                ) : field.type === "image" ? (
                  <>
                    <label className="mb-1.5 block text-sm font-bold">
                      {field.label[lang]}
                    </label>
                    <ImageField
                      value={String(form[field.name] ?? "")}
                      folder={def.key}
                      onChange={(url) => setForm({ ...form, [field.name]: url })}
                    />
                  </>
                ) : field.type === "codes" ? (
                  <>
                    <label className="mb-1.5 block text-sm font-bold">
                      {field.label[lang]}
                    </label>
                    <textarea
                      rows={5}
                      dir="ltr"
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      placeholder={"6291000000001\n6291000000002\n6291000000003"}
                      className={`${inputClass} resize-none text-left`}
                    />
                    <p className="mt-1.5 text-xs text-ink/50">
                      {t("entity.codesCount")}: {parseCodes(form[field.name]).length}
                    </p>
                  </>
                ) : (
                  <>
                    <label className="mb-1.5 block text-sm font-bold">
                      {field.label[lang]}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={String(form[field.name] ?? "")}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        className={`${inputClass} resize-none`}
                      />
                    ) : field.type === "date" ? (
                      <input
                        type="date"
                        value={toDateInputValue(form[field.name])}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(form[field.name] ?? "")}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        className={inputClass}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-blush-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
            >
              {saving ? t("entity.saving") : t("entity.save")}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-full border-2 border-ink px-8 py-3 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
            >
              {t("entity.cancel")}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-sm text-ink/50">…</p>
        ) : loadError ? (
          <p className="p-8 text-center text-sm font-bold text-red-500">
            {t("entity.loadError")}
          </p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink/50">{t("entity.empty")}</p>
        ) : (
          <ul className="divide-y divide-blush-100">
            {items.map((item, index) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={t("entity.moveUp")}
                    className="text-ink/30 transition-colors hover:text-blush-600 disabled:opacity-20"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M6 15l6-6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label={t("entity.moveDown")}
                    className="text-ink/30 transition-colors hover:text-blush-600 disabled:opacity-20"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">
                    {String(item[def.displayField] ?? "")}
                  </p>
                  {def.secondaryField && item[def.secondaryField] ? (
                    <p className="truncate text-xs text-ink/50">
                      {String(item[def.secondaryField])}
                    </p>
                  ) : null}
                </div>
                {typeof item.image === "string" && item.image !== "" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="hidden h-10 w-16 shrink-0 rounded-xl border border-blush-100 object-cover sm:block"
                  />
                )}
                {item.featured === true && (
                  <span className="hidden shrink-0 rounded-full bg-gold-300/40 px-3 py-1 text-xs font-bold text-gold-600 sm:inline">
                    ★ {t("entity.featured")}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="shrink-0 rounded-full border-2 border-blush-500 px-4 py-1.5 text-xs font-bold text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
                >
                  {t("entity.edit")}
                </button>
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="shrink-0 rounded-full border-2 border-red-200 px-4 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                >
                  {t("entity.delete")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
