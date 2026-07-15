import "./page.css";
import type { Metadata } from "next";
import Newsroom from "@/components/pages/Newsroom";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("newsroom");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "A curated collection of our latest media features, press releases, and industry insights.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("newsroom");
  return <Newsroom {...(data?.fields ?? {})} />;
}
