const WORDPRESS_URL = process.env.WORDPRESS_URL;
if (!WORDPRESS_URL) throw new Error("WORDPRESS_URL is not set");

const REVALIDATE = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? "60");

type BuilderPageData = {
  apiVersion: string;
  template: string;
  templateVersion: number | null;
  slug: string;
  fields: Record<string, string>;
  seo: { title: string; description: string; canonical: string; robots: string };
  meta: { slug: string; parent: string; updatedAt: string };
};

export async function fetchPageData(slug: string): Promise<BuilderPageData | null> {
  if (!slug) return null;
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/builder/v1/page-data?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDATE } }
    );
    if (!res.ok) return null;
    return (await res.json()) as BuilderPageData;
  } catch {
    return null;
  }
}
