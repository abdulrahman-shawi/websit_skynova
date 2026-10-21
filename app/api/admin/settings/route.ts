import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/defaults";
import { getDb } from "@/lib/db";

const SETTINGS_PATHS: Record<keyof SiteSettings, string[]> = {
  "home.hero": ["/"],
  "home.about": ["/"],
  "home.warranty": ["/"],
  "home.cta": ["/"],
  contact: ["/", "/products", "/contact"],
  about_page: ["/about"],
  certificates_page: ["/certificates"],
  gallery_page: ["/gallery"],
  footer: ["/", "/products", "/about", "/gallery", "/certificates", "/contact"],
};

export async function GET() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return NextResponse.json({ settings: DEFAULT_SETTINGS });

  const settings = { ...DEFAULT_SETTINGS } as Record<string, unknown>;
  try {
    const rows = await db.siteSetting.findMany();
    for (const row of rows) {
      const key = row.key;
      const base = DEFAULT_SETTINGS[key as keyof SiteSettings];
      const stored = row.value;
      if (base && stored && typeof stored === "object") {
        settings[key] = {
          ...(base as Record<string, unknown>),
          ...(stored as Record<string, unknown>),
        };
      }
    }
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();
  try {
    const body = await req.json();
    const key = String(body?.key ?? "") as keyof SiteSettings;
    const value: unknown = body?.value;
    if (!(key in DEFAULT_SETTINGS) || !value || typeof value !== "object") {
      return badRequest("invalid settings key or value");
    }

    await db.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });

    SETTINGS_PATHS[key].forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true });
  } catch {
    return serverError();
  }
}
