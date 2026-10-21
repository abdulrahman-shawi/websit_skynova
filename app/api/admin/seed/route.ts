import { Prisma } from "@prisma/client";
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

function isMissingTablesError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021"
  );
}

export async function POST() {
  if (!isAdminRequest()) return unauthorized();
  const db = getDb();
  if (!db) return serverError();

  try {
    const filled: string[] = [];

    if ((await db.product.count()) === 0) {
      await db.product.createMany({
        data: DEFAULT_PRODUCTS.map((item, index) => ({
          name: item.name,
          category: item.category,
          badge: item.badge,
          description: item.description,
          price: item.price,
          guarantee: item.guarantee,
          featured: item.featured,
          displayOrder: index + 1,
        })),
      });
      filled.push("products");
    }

    if ((await db.faq.count()) === 0) {
      await db.faq.createMany({
        data: DEFAULT_FAQS.map((item, index) => ({
          question: item.question,
          answer: item.answer,
          displayOrder: index + 1,
        })),
      });
      filled.push("faqs");
    }

    if ((await db.certificate.count()) === 0) {
      await db.certificate.createMany({
        data: DEFAULT_CERTIFICATES.map((item, index) => ({
          name: item.name,
          title: item.title,
          issuer: item.issuer,
          description: item.description,
          scope: item.scope,
          year: item.year,
          displayOrder: index + 1,
        })),
      });
      filled.push("certificates");
    }

    if ((await db.event.count()) === 0) {
      await db.event.createMany({
        data: DEFAULT_EVENTS.map((item, index) => ({
          title: item.title,
          type: item.type,
          location: item.location,
          dateLabel: item.date,
          description: item.description,
          displayOrder: index + 1,
        })),
      });
      filled.push("events");
    }

    if ((await db.siteSetting.count()) === 0) {
      for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
        await db.siteSetting.create({
          data: {
            key,
            value: JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue,
          },
        });
      }
      filled.push("settings");
    }

    ALL_PATHS.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, filled });
  } catch (error) {
    if (isMissingTablesError(error)) {
      return NextResponse.json(
        { error: "tables_missing", hint: "Run: npx prisma migrate deploy" },
        { status: 409 }
      );
    }
    console.error("Seed failed:", error);
    return serverError();
  }
}
