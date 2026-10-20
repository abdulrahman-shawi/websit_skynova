import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://skynova-beauty.com";
const SITE_NAME = "سكاينوفا | SKYNOVA";
const SITE_DESCRIPTION =
  "سكاينوفا — مصنع متخصص في تصنيع أجهزة التجميل والعناية بالبشرة: أجهزة ليزر إزالة الشعر، هيدرافيشل، كافيتيشن وأنظمة شد البشرة. جودة أوروبية وضمان مصنع معتمد.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — مصنع أجهزة التجميل`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "مصنع أجهزة تجميل",
    "أجهزة تجميل",
    "أجهزة ليزر إزالة الشعر",
    "جهاز هيدرافيشل",
    "جهاز كافيتيشن",
    "أجهزة عناية بالبشرة",
    "معدات صالونات تجميل",
    "أجهزة شد البشرة",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Skynova Beauty Devices" }],
  creator: "Skynova Beauty Devices",
  publisher: "Skynova Beauty Devices",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — مصنع أجهزة التجميل`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — مصنع أجهزة التجميل`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#d63a67",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skynova Beauty Devices",
  alternateName: "سكاينوفا لأجهزة التجميل",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "بغداد",
    addressCountry: "IQ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+964-770-000-0000",
    contactType: "sales",
    availableLanguage: ["Arabic", "English"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
