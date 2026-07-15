import "./page.css";
import type { Metadata } from "next";
import ClientOutcomesPageDev from "@/components/pages/ClientOutcomesPageDev";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("client-outcomes-page-dev");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "Our outcomes report reflects the real progress made by the individuals we serve — not just in numbers, but in their lives. Through evidence-based care and",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("client-outcomes-page-dev");
  return <ClientOutcomesPageDev {...(data?.fields ?? {})} />;
}
