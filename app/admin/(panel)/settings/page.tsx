import SettingsEditor from "@/components/admin/SettingsEditor";
import { SETTINGS_GROUPS } from "@/lib/admin-config";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الإعدادات — لوحة التحكم" };

export default function AdminSettingsPage() {
  return <SettingsEditor groups={SETTINGS_GROUPS} />;
}
