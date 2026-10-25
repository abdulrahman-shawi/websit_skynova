import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "سكاينوفا — تحقق من منتجك",
    short_name: "سكاينوفا",
    description:
      "تحقق من أصالة أجهزة سكاينوفا واقرأ بيانات المنتج وطريقة الاستخدام عبر مسح الباركود.",
    lang: "ar",
    dir: "rtl",
    start_url: "/check",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fdfcfb",
    theme_color: "#d63a67",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
