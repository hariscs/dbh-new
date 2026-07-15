import "./page.css";
import type { Metadata } from "next";
import BuReviewCounts from "@/components/pages/BuReviewCounts";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("bu-review-counts");
  return {
    title: data?.seo.title || "BU Review Counts | District Behavioral Health",
    description: data?.seo.description || "Gratitude Lodge LB - Chatwin (4-5 Star Reviews) LB - Chatwin (1-3 Star Reviews) LB - Belmont (4-5 Star Reviews) LB - Belmont (4-5 Star Reviews) NP - Redlands",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("bu-review-counts");
  return <BuReviewCounts {...(data?.fields ?? {})} />;
}
