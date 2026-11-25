import { draftMode } from "next/headers";

export default async function PreviewBanner() {
  if (!(await draftMode()).isEnabled) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 99999,
        padding: "8px 14px",
        borderRadius: 6,
        background: "#111",
        color: "#fff",
        font: "14px/1.4 sans-serif",
      }}
    >
      Preview mode: showing drafts. <a href="/api/exit-preview" style={{ color: "#9cf" }}>Exit preview</a>
    </div>
  );
}
