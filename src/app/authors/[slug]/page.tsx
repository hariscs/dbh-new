import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorDetail from "@/components/templates/AuthorDetail";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_PATH = "authors";

const clean = (v?: string) => (v ?? "").trim();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPageData(`${BASE_PATH}/${slug}`);
  if (!data) return {};
  return {
    title: data.seo.title || undefined,
    description: data.seo.description || undefined,
    ...(data.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchPageData(`${BASE_PATH}/${slug}`);
  if (!data) notFound();

  const f = data.fields;
  const firstName = clean(f.first_name_);
  const lastName = clean(f.last_name);
  const featuredImage = clean(f.featured_image);
  const linkedin = clean(f.linkedin_url);

  return (
    <AuthorDetail
      firstName={firstName || undefined}
      lastName={lastName || undefined}
      role={clean(f.titlelicense) || undefined}
      headshot={featuredImage || undefined}
      headshotWidth={featuredImage ? 280 : undefined}
      headshotHeight={featuredImage ? 340 : undefined}
      linkedin={linkedin || null}
      bio={clean(f.bio) || undefined}
    />
  );
}
