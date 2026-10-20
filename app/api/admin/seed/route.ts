import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminRequest, serverError, unauthorized } from "@/lib/api-helpers";
import {
  DEFAULT_CERTIFICATES,
  DEFAULT_EVENTS,
  DEFAULT_FAQS,
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
} from "@/lib/defaults";
import { getDb } from "@/lib/db";

const ALL_PATHS = ["/", "/products", "/about", "/gallery", "/certificates", "/contact"];

async function createTables(db: NonNullable<ReturnType<typeof getDb>>) {
  await db`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT '',
      badge TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      price TEXT NOT NULL DEFAULT '',
      guarantee TEXT,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      display_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL DEFAULT '',
      display_order INT NOT NULL DEFAULT 0
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS certificates (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      issuer TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      scope TEXT NOT NULL DEFAULT '',
      year TEXT NOT NULL DEFAULT '',
      display_order INT NOT NULL DEFAULT 0
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      date_label TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      display_order INT NOT NULL DEFAULT 0
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function POST() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();

  try {
    await createTables(db);
    const filled: string[] = [];

    const productCount = await db`SELECT COUNT(*)::int AS count FROM products`;
    if (Number(productCount[0]?.count ?? 0) === 0) {
      for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
        const p = DEFAULT_PRODUCTS[i];
        await db`
          INSERT INTO products (name, category, badge, description, price, guarantee, featured, display_order)
          VALUES (${p.name}, ${p.category}, ${p.badge}, ${p.description}, ${p.price}, ${p.guarantee}, ${p.featured}, ${i + 1})
        `;
      }
      filled.push("products");
    }

    const faqCount = await db`SELECT COUNT(*)::int AS count FROM faqs`;
    if (Number(faqCount[0]?.count ?? 0) === 0) {
      for (let i = 0; i < DEFAULT_FAQS.length; i++) {
        const f = DEFAULT_FAQS[i];
        await db`
          INSERT INTO faqs (question, answer, display_order)
          VALUES (${f.question}, ${f.answer}, ${i + 1})
        `;
      }
      filled.push("faqs");
    }

    const certCount = await db`SELECT COUNT(*)::int AS count FROM certificates`;
    if (Number(certCount[0]?.count ?? 0) === 0) {
      for (let i = 0; i < DEFAULT_CERTIFICATES.length; i++) {
        const c = DEFAULT_CERTIFICATES[i];
        await db`
          INSERT INTO certificates (name, title, issuer, description, scope, year, display_order)
          VALUES (${c.name}, ${c.title}, ${c.issuer}, ${c.description}, ${c.scope}, ${c.year}, ${i + 1})
        `;
      }
      filled.push("certificates");
    }

    const eventCount = await db`SELECT COUNT(*)::int AS count FROM events`;
    if (Number(eventCount[0]?.count ?? 0) === 0) {
      for (let i = 0; i < DEFAULT_EVENTS.length; i++) {
        const e = DEFAULT_EVENTS[i];
        await db`
          INSERT INTO events (title, type, location, date_label, description, display_order)
          VALUES (${e.title}, ${e.type}, ${e.location}, ${e.date}, ${e.description}, ${i + 1})
        `;
      }
      filled.push("events");
    }

    const settingCount =
      await db`SELECT COUNT(*)::int AS count FROM site_settings`;
    if (Number(settingCount[0]?.count ?? 0) === 0) {
      for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
        await db`
          INSERT INTO site_settings (key, value, updated_at)
          VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
          ON CONFLICT (key) DO NOTHING
        `;
      }
      filled.push("settings");
    }

    ALL_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, filled });
  } catch (error) {
    console.error("Seed failed:", error);
    return serverError();
  }
}
