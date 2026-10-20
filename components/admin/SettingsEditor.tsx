"use client";

import { useCallback, useEffect, useState } from "react";
import type { SettingsField, SettingsGroup } from "@/lib/admin-config";
import { useLanguage } from "./LanguageProvider";

type SettingsData = Record<string, Record<string, unknown>>;

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-blush-500";

function getPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function setPath(target: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let current: Record<string, unknown> = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const next = current[keys[i]];
    if (!next || typeof next !== "object") return;
    current = next as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

function cleanValue(field: SettingsField, value: unknown): unknown {
  if (field.kind === "stringList" && Array.isArray(value)) {
    return value.filter((item) => String(item).trim() !== "");
  }
  return value;
}

function FieldEditor({
  field,
  group,
  settings,
  onChange,
}: {
  field: SettingsField;
  group: SettingsGroup;
  settings: SettingsData;
  onChange: (name: string, value: unknown) => void;
}) {
  const { lang } = useLanguage();
  const value = getPath(settings[group.key], field.name);

  if (field.kind === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        <label className="mb-1.5 block text-sm font-bold">{field.label[lang]}</label>
        <textarea
          rows={Math.min(10, Math.max(3, list.length + 1))}
          value={list.join("\n")}
          onChange={(e) => onChange(field.name, e.target.value.split("\n"))}
          className={`${inputClass} resize-none`}
        />
        <p className="mt-1 text-xs text-ink/40">سطر لكل عنصر / One item per line</p>
      </div>
    );
  }

  if (field.kind === "objectList") {
    const list = Array.isArray(value) ? (value as Record<string, string>[]) : [];
    return (
      <div className="rounded-2xl border border-blush-100 bg-blush-50/40 p-4">
        <p className="mb-3 text-sm font-bold">{field.label[lang]}</p>
        <div className="space-y-3">
          {list.map((item, index) => (
            <div key={index} className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-3 shadow-sm">
              {field.fields.map((sub) => (
                <div key={sub.name} className="min-w-40 flex-1">
                  <label className="mb-1 block text-xs font-bold text-ink/50">
                    {sub.label[lang]}
                  </label>
                  <input
                    type="text"
                    value={item[sub.name] ?? ""}
                    onChange={(e) => {
                      const next = [...list];
                      next[index] = { ...item, [sub.name]: e.target.value };
                      onChange(field.name, next);
                    }}
                    className={inputClass}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => onChange(field.name, list.filter((_, i) => i !== index))}
                className="rounded-full border-2 border-red-200 px-3 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const empty: Record<string, string> = {};
            for (const sub of field.fields) empty[sub.name] = "";
            onChange(field.name, [...list, empty]);
          }}
          className="mt-3 rounded-full border-2 border-ink px-4 py-1.5 text-xs font-bold transition-colors hover:bg-ink hover:text-white"
        >
          + {lang === "ar" ? "إضافة عنصر" : "Add item"}
        </button>
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-bold">{field.label[lang]}</label>
        <textarea
          rows={3}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold">{field.label[lang]}</label>
      <input
        type="text"
        value={String(value ?? "")}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export default function SettingsEditor({ groups }: { groups: SettingsGroup[] }) {
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [active, setActive] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<"saved" | "error" | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { settings: SettingsData };
      setSettings(data.settings);
    } catch {
      setNotice("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const group = groups[active];

  const onChange = (name: string, value: unknown) => {
    if (!settings) return;
    const groupCopy = JSON.parse(JSON.stringify(settings[group.key])) as Record<string, unknown>;
    setPath(groupCopy, name, value);
    setSettings({ ...settings, [group.key]: groupCopy });
  };

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    setNotice(null);
    const cleaned = JSON.parse(JSON.stringify(settings[group.key])) as Record<string, unknown>;
    for (const field of group.fields) {
      setPath(cleaned, field.name, cleanValue(field, getPath(cleaned, field.name)));
    }
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: group.key, value: cleaned }),
      });
      if (!res.ok) throw new Error();
      setNotice("saved");
      setSettings({ ...settings, [group.key]: cleaned });
    } catch {
      setNotice("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-black sm:text-3xl">{t("admin.settings")}</h1>
      <p className="mt-1 text-sm text-ink/50">{t("settings.hint")}</p>

      {notice === "saved" && (
        <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          ✓ {t("settings.saved")}
        </p>
      )}
      {notice === "error" && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {t("settings.loadError")}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {groups.map((item, index) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              index === active
                ? "bg-blush-500 text-white"
                : "border border-blush-200 bg-white text-ink/60 hover:border-blush-500 hover:text-blush-600"
            }`}
          >
            {item.label[lang]}
          </button>
        ))}
      </div>

      {settings && (
        <div className="mt-6 rounded-3xl border border-blush-100 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            {group.fields.map((field) => (
              <FieldEditor
                key={field.name}
                field={field}
                group={group}
                settings={settings}
                onChange={onChange}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="mt-6 rounded-full bg-blush-500 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
          >
            {saving ? t("settings.saving") : t("settings.save")}
          </button>
        </div>
      )}
    </div>
  );
}
