import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سكاينوفا — مصنع أجهزة التجميل",
    short_name: "سكاينوفا",
    description:
      "مصنع متخصص في تصنيع أجهزة التجميل والعناية بالبشرة بأعلى معايير الجودة العالمية.",
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfcfb",
    theme_color: "#d63a67",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
