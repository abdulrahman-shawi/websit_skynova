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

export async function getProducts(featuredOnly = false): Promise<Product[]> {
  const db = getDb();
  if (!db) return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
  try {
    const rows = await db.product.findMany({
      where: { isActive: true, ...(featuredOnly ? { featured: true } : {}) },
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
    if (!rows.length) return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      badge: row.badge,
      description: row.description,
      price: row.price,
      guarantee: row.guarantee,
      featured: row.featured,
    }));
  } catch {
    return featuredOnly ? DEFAULT_PRODUCTS.filter((p) => p.featured) : DEFAULT_PRODUCTS;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  const db = getDb();
  if (!db) return DEFAULT_FAQS;
  try {
    const rows = await db.faq.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
    if (!rows.length) return DEFAULT_FAQS;
    return rows.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
    }));
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  const db = getDb();
  if (!db) return DEFAULT_CERTIFICATES;
  try {
    const rows = await db.certificate.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
    if (!rows.length) return DEFAULT_CERTIFICATES;
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      title: row.title,
      issuer: row.issuer,
      description: row.description,
      scope: row.scope,
      year: row.year,
      image: row.image || undefined,
    }));
  } catch {
    return DEFAULT_CERTIFICATES;
  }
}

export async function getEvents(): Promise<EventItem[]> {
  const db = getDb();
  if (!db) return DEFAULT_EVENTS;
  try {
    const rows = await db.event.findMany({
      orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
    });
    if (!rows.length) return DEFAULT_EVENTS;
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      type: row.type,
      location: row.location,
      date: row.dateLabel,
      description: row.description,
      image: row.image || undefined,
    }));
  } catch {
    return DEFAULT_EVENTS;
  }
}

export async function getSettings<K extends keyof SiteSettings>(key: K): Promise<SiteSettings[K]> {
  const fallback = DEFAULT_SETTINGS[key];
  const db = getDb();
  if (!db) return fallback;
  try {
    const row = await db.siteSetting.findUnique({ where: { key } });
    const stored = row?.value;
    if (!stored || typeof stored !== "object") return fallback;
    return { ...(fallback as Record<string, unknown>), ...(stored as Record<string, unknown>) } as SiteSettings[K];
  } catch {
    return fallback;
  }
}

export async function getContact() {
  return getSettings("contact");
}
