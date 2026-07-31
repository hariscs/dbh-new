import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FacilityDetail, { type GalleryImage } from "@/components/templates/FacilityDetail";
import { fetchPageData } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_PATH = "facility";

const clean = (v?: string) => (v ?? "").trim();
const asGallery = (v: unknown): GalleryImage[] =>
  Array.isArray(v) ? (v as GalleryImage[]) : [];

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

  const f = data.fields as Record<string, unknown>;
  return (
    <>
      <Header fields={data.fields} />
      (
      <FacilityDetail
        facilityName={clean(f.facility_name as string) || undefined}
        facilityLocation={clean(f.facility_location as string) || undefined}
        interiorsGallery={asGallery(f.facility_interiors_gallery)}
        exteriorsGallery={asGallery(f.facility_exteriors_gallery)}
        highlightsGallery={asGallery(f.location_highlights_gallery)}
      />
    )
    </>
  );
}
