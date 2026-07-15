import "./page.css";
import type { Metadata } from "next";
import ThankYou from "@/components/pages/ThankYou";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("thank-you");
  return {
    title: data?.seo.title || "Thank You Page | District Behavioral Health",
    description: data?.seo.description || "While you wait, explore our facilities, see what your care experience will look like, and learn what happens next.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("thank-you");
  return <ThankYou {...(data?.fields ?? {})} />;
}
