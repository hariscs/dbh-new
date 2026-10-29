import "./page.css";
import type { Metadata } from "next";
import Blogs from "@/components/pages/Blogs";
import { fetchPageData, fetchBlogs } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("blogs");
  return {
    title: data?.seo.title || "Blogs | District Behavioral Health",
    description: data?.seo.description || "",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const [data, { blogs, totalPages }] = await Promise.all([
    fetchPageData("blogs"),
    fetchBlogs(currentPage),
  ]);
  return (
    <>
      <Header fields={data?.fields} />
      <Blogs
        fields={data?.fields ?? {}}
        blogs={blogs}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
