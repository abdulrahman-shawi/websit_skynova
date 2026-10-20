import { getDb } from "./db";
import {
  DEFAULT_CERTIFICATES,
  DEFAULT_EVENTS,
  DEFAULT_FAQS,
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
  type Certificate,
  type EventItem,
  type Faq,
  type Product,
  type SiteSettings,
} from "./defaults";

type DbRow = Record<string, unknown>;

function mapProduct(row: DbRow): Product {
  return {
    id: Number(row.id),
    name: String(row.name),
    category: String(row.category ?? ""),
    badge: String(row.badge ?? ""),
    description: String(row.description ?? ""),
    price: String(row.price ?? ""),
    guarantee: row.guarantee == null ? null : String(row.guarantee),
    featured: Boolean(row.featured),
  };
}

export async function getProducts(featuredOnly = false): Promise<Product[]> {
  const db = getDb();
  if (!db) return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
  try {
    const rows = featuredOnly
      ? await db`SELECT * FROM products WHERE is_active AND featured ORDER BY display_order, id`
      : await db`SELECT * FROM products WHERE is_active ORDER BY display_order, id`;
    if (!rows.length) return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
    return rows.map(mapProduct);
  } catch {
    return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  const db = getDb();
  if (!db) return DEFAULT_FAQS;
  try {
    const rows = await db`SELECT * FROM faqs ORDER BY display_order, id`;
    if (!rows.length) return DEFAULT_FAQS;
    return rows.map((row) => ({
      id: Number(row.id),
      question: String(row.question),
      answer: String(row.answer ?? ""),
    }));
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  const db = getDb();
  if (!db) return DEFAULT_CERTIFICATES;
  try {
    const rows = await db`SELECT * FROM certificates ORDER BY display_order, id`;
    if (!rows.length) return DEFAULT_CERTIFICATES;
    return rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
      title: String(row.title ?? ""),
      issuer: String(row.issuer ?? ""),
      description: String(row.description ?? ""),
      scope: String(row.scope ?? ""),
      year: String(row.year ?? ""),
    }));
  } catch {
    return DEFAULT_CERTIFICATES;
  }
}

export async function getEvents(): Promise<EventItem[]> {
  const db = getDb();
  if (!db) return DEFAULT_EVENTS;
  try {
    const rows = await db`SELECT * FROM events ORDER BY display_order, id`;
    if (!rows.length) return DEFAULT_EVENTS;
    return rows.map((row) => ({
      id: Number(row.id),
      title: String(row.title),
      type: String(row.type ?? ""),
      location: String(row.location ?? ""),
      date: String(row.date_label ?? ""),
      description: String(row.description ?? ""),
    }));
  } catch {
    return DEFAULT_EVENTS;
  }
}

function parseJson(value: unknown): unknown {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  return value;
}

export async function getSettings<K extends keyof SiteSettings>(key: K): Promise<SiteSettings[K]> {
  const fallback = DEFAULT_SETTINGS[key];
  const db = getDb();
  if (!db) return fallback;
  try {
    const rows = await db`SELECT value FROM site_settings WHERE key = ${key}`;
    const stored = rows.length ? parseJson(rows[0].value) : undefined;
    if (!stored || typeof stored !== "object") return fallback;
    return { ...(fallback as Record<string, unknown>), ...(stored as Record<string, unknown>) } as SiteSettings[K];
  } catch {
    return fallback;
  }
}

export async function getContact() {
  return getSettings("contact");
}
