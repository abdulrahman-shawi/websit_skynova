import EntityManager from "@/components/admin/EntityManager";
import { ENTITY_DEFS } from "@/lib/admin-config";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الفعاليات — لوحة التحكم" };

export default function AdminEventsPage() {
  return <EntityManager def={ENTITY_DEFS.events} />;
}
