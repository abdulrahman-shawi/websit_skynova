import type { Metadata } from "next";
import { isAdminRequest } from "@/lib/api-helpers";
import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import RequestStatusSelect from "@/components/admin/RequestStatusSelect";
import RequestReplyBox from "@/components/admin/RequestReplyBox";

export const metadata: Metadata = {
  title: "طلبات المتابعة — لوحة التحكم",
};

export const dynamic = "force-dynamic";

const KIND_LABELS: Record<string, string> = {
  followup: "متابعة نتائج",
  maintenance: "صيانة",
  consult: "استشارة",
};

export default async function AdminRequestsPage() {
  if (!isAdminRequest()) redirect("/admin/login");
  const db = getDb();

  let rows: {
    id: number;
    kind: string;
    message: string;
    status: string;
    reply: string;
    repliedAt: Date | null;
    createdAt: Date;
    customerName: string;
    customerPhone: string;
    barcode: string;
    productName: string | null;
  }[] = [];

  if (db) {
    const found = await db.deviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { device: { include: { customer: true } } },
    });
    const productIds = found
      .map((row) => row.device.productId)
      .filter((id): id is number => typeof id === "number");
    const products = productIds.length
      ? await db.product.findMany({ where: { id: { in: productIds } } })
      : [];
    const productById = new Map(products.map((p) => [p.id, p.name]));
    rows = found.map((row) => ({
      id: row.id,
      kind: row.kind,
      message: row.message,
      status: row.status,
      reply: row.reply,
      repliedAt: row.repliedAt,
      createdAt: row.createdAt,
      customerName: row.device.customer.name,
      customerPhone: row.device.customer.phone,
      barcode: row.device.barcode,
      productName: row.device.productId
        ? (productById.get(row.device.productId) ?? null)
        : null,
    }));
  }

  return (
    <div>
      <h1 className="text-2xl font-black sm:text-3xl">طلبات المتابعة</h1>
      <p className="mt-1 text-sm text-ink/50">
        طلبات العملاء على أجهزتهم المسجلة — حدّث حالة كل طلب ليرى العميل التحديث
        في داشبورده.
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-blush-100 bg-white p-10 text-center text-sm text-ink/50">
          لا توجد طلبات متابعة بعد.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-3xl border border-blush-100 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-bold text-blush-700">
                  {KIND_LABELS[row.kind] ?? row.kind}
                </span>
                <span className="text-sm font-extrabold">{row.customerName}</span>
                <span className="text-xs text-ink/50" dir="ltr">
                  {row.customerPhone}
                </span>
                <span className="text-xs text-ink/40">
                  {new Intl.DateTimeFormat("ar", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(row.createdAt)}
                </span>
                <span className="ms-auto">
                  <RequestStatusSelect
                    requestId={row.id}
                    initialStatus={row.status}
                  />
                </span>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink/70">
                {row.message}
              </p>
              <p className="mt-2 text-xs text-ink/40">
                الجهاز: {row.productName ?? "غير مسجل"} — باركود:{" "}
                <span dir="ltr">{row.barcode}</span>
              </p>
              <RequestReplyBox
                requestId={row.id}
                initialReply={row.reply}
                repliedAt={row.repliedAt}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
