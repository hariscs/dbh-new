import "./page.css";
import type { Metadata } from "next";
import Elementor656 from "@/components/pages/Elementor656";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("elementor-656");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "DBH in the Community & National Media",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("elementor-656");
  return <Elementor656 {...(data?.fields ?? {})} />;
}
