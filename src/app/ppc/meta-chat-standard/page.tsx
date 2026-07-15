import "./page.css";
import type { Metadata } from "next";
import PpcMetaChatStandard from "@/components/pages/PpcMetaChatStandard";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("meta-chat-standard");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "Personalized Treatment",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("meta-chat-standard");
  return <PpcMetaChatStandard {...(data?.fields ?? {})} />;
}
