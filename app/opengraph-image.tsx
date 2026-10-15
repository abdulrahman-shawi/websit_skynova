import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "سكاينوفا — مصنع أجهزة التجميل";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1620 0%, #d63a67 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #d63a67, #c8923e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            fontWeight: 800,
            marginBottom: 32,
          }}
        >
          S
        </div>
        <div style={{ fontSize: 72, fontWeight: 900 }}>سكاينوفا</div>
        <div style={{ fontSize: 34, marginTop: 16, color: "#e8c98a", fontWeight: 700 }}>
          مصنع أجهزة التجميل والعناية بالبشرة
        </div>
      </div>
    ),
    { ...size }
  );
}
