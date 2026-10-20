import EntityManager from "@/components/admin/EntityManager";
import { ENTITY_DEFS } from "@/lib/admin-config";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الأسئلة الشائعة — لوحة التحكم" };

export default function AdminFaqsPage() {
  return <EntityManager def={ENTITY_DEFS.faqs} />;
}
