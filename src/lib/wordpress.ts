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
  meta: { slug: string; parent: string; updatedAt: string; createdAt: string };
};

export async function fetchPageData(path: string): Promise<BuilderPageData | null> {
  if (!path) return null;
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/builder/v1/page-data?path=${encodeURIComponent(path)}`,
      { next: { revalidate: REVALIDATE } }
    );
    if (!res.ok) return null;
    return (await res.json()) as BuilderPageData;
  } catch {
    return null;
  }
}

export type BlogItem = { id: number; title: string; href: string };

export const BLOGS_PER_PAGE = 6;

const stripTags = (s: string) => s.replace(/<[^>]*>/g, "");

const decodeEntities = (s: string) =>
  s
    .replace(/&#0?39;|&#8217;|&#8216;|&apos;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const toRelative = (link: string) => {
  try {
    const u = new URL(link);
    return `${u.pathname}${u.search}`;
  } catch {
    return link;
  }
};

// Blogs are WordPress pages using the blog templates (12, 13), newest first,
// paginated 6 per page via offset. Returns the cards plus the total page count.
export async function fetchBlogs(
  page: number
): Promise<{ blogs: BlogItem[]; totalPages: number }> {
  const current = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const offset = (current - 1) * BLOGS_PER_PAGE;
  const url =
    `${WORDPRESS_URL}/wp-json/wp/v2/pages` +
    `?template=12,13&orderby=date&order=desc&per_page=${BLOGS_PER_PAGE}&offset=${offset}` +
    `&_fields=id,link,title,acf.h1`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return { blogs: [], totalPages: 1 };
    const total = Number(res.headers.get("X-WP-Total"));
    const totalPages = Number.isFinite(total) && total > 0 ? Math.ceil(total / BLOGS_PER_PAGE) : 1;
    const data = (await res.json()) as Array<{
      id: number;
      link: string;
      title?: { rendered?: string };
      acf?: { h1?: string };
    }>;
    const blogs: BlogItem[] = data.map((p) => ({
      id: p.id,
      title: decodeEntities(stripTags(p.acf?.h1 || p.title?.rendered || "")).trim(),
      href: toRelative(p.link),
    }));
    return { blogs, totalPages };
  } catch {
    return { blogs: [], totalPages: 1 };
  }
}
