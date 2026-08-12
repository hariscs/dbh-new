// The hero reuses the /blogs hero widgets, whose rules are scoped to `.elementor-1021`
// in that page's stylesheet — import it rather than duplicating 30 KB of CSS.
import "../blogs/page.css";
import type { Metadata } from "next";
import Reviews from "@/components/pages/Reviews";
import { fetchPageData } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;

/**
 * Before this route existed, /reviews fell through to the root [...slug] catch-all and
 * rendered via the LocationServedUsa fallback, because the WordPress page carries no
 * `template` term. A static segment beats the catch-all, so this now owns the route.
 */

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData("reviews");
  return {
    title: data?.seo.title || "Reviews | District Behavioral Health",
    description: data?.seo.description || "",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("reviews");
  return (
    <>
      <Header fields={data?.fields} />
      <Reviews fields={data?.fields ?? {}} />
    </>
  );
}
