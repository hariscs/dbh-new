import Header from "@/components/Header";

// The header is rendered per page rather than by the root layout (see src/lib/phone.ts),
// so Next's built-in 404 would otherwise render without one. There is no page data for a
// missing page, so the header falls back to the default number.
export default function NotFound() {
  return (
    <>
      <Header />
      <div style={{ padding: "120px 20px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "12px" }}>404</h1>
        <p>This page could not be found.</p>
      </div>
    </>
  );
}
