import DashboardClient from "@/components/admin/DashboardClient";
import { getCertificates, getEvents, getFaqs, getProducts } from "@/lib/content";
import { dbHealth } from "@/lib/db";

export default async function AdminDashboard() {
  const [healthy, products, faqs, certificates, events] = await Promise.all([
    dbHealth(),
    getProducts(),
    getFaqs(),
    getCertificates(),
    getEvents(),
  ]);

  return (
    <DashboardClient
      dbHealthy={healthy}
      counts={{
        products: products.length,
        faqs: faqs.length,
        certificates: certificates.length,
        events: events.length,
      }}
    />
  );
}
