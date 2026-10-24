import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import {
  asString,
  badRequest,
  isAdminRequest,
  serverError,
  unauthorized,
} from "@/lib/api-helpers";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"],
]);
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) return unauthorized();
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return badRequest("file is required");

    const ext = ALLOWED_TYPES.get(file.type);
    if (!ext) return badRequest("unsupported file type");
    if (file.size > MAX_SIZE) return badRequest("file exceeds 5MB limit");

    const folder = asString(formData.get("folder")) || "uploads";
    const safeFolder = folder.replace(/[^a-z0-9-_]/gi, "").toLowerCase() || "uploads";
    const pathname = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const blob = await put(pathname, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch {
    return serverError();
  }
}
