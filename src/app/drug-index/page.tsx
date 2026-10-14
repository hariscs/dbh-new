import "./page.css";
import type { Metadata } from "next";
import DrugIndex from "@/components/pages/DrugIndex";
import { fetchPageData } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData("drug-index");
  return {
    title: data?.seo.title || "Drug Index | District Behavioral Health",
    description:
      data?.seo.description ||
      "Browse the District Behavioral Health drug index for addiction and treatment information from A to Z.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("drug-index");
  return (
    <>
      <Header fields={data?.fields} />
      <DrugIndex />
    </>
  );
}
