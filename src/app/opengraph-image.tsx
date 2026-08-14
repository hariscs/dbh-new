import { ImageResponse } from "next/og";

export const alt = "District Behavioral Health - Mental Health & Addiction Treatment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#273F52",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#B2C4D7",
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        Mental Health &amp; Addiction Treatment
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          color: "#FFFFFF",
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        District Behavioral Health
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", width: 64, height: 6, background: "#2E6AA1" }} />
        <div style={{ display: "flex", color: "#B2C4D7", fontSize: 30 }}>
          districtbehavioralhealth.com
        </div>
      </div>
    </div>,
    size
  );
}
