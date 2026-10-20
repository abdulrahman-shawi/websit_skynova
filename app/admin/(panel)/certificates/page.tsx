import EntityManager from "@/components/admin/EntityManager";
import { ENTITY_DEFS } from "@/lib/admin-config";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الشهادات — لوحة التحكم" };

export default function AdminCertificatesPage() {
  return <EntityManager def={ENTITY_DEFS.certificates} />;
}
