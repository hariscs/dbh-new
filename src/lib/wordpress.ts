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

export type InterlinkItem = { href: string; title: string };

// WordPress leaves the raw Yoast/SEO `%sitename%` token in some interlinking titles
// (e.g. "%sitename% | Borderline Personality Disorder Treatment ..."), so substitute
// the real site name rather than shipping the placeholder to the page.
const SITE_NAME = process.env.WORDPRESS_SITE_NAME ?? "District Behavioral Health";

// Prerendered pages fetch this at build/revalidation time, but `dynamicParams` means a
// slug missing from generateStaticParams renders on demand — and there the request sits
// in the visitor's response. Bound it so a slow WordPress degrades to the hardcoded
// cards instead of holding the render open. Deliberately not applied to fetchPageData:
// that one returning null triggers notFound(), so a timeout there would serve a 404.
const INTERLINKING_TIMEOUT_MS = Number(process.env.WORDPRESS_INTERLINKING_TIMEOUT_MS ?? "5000");

/**
 * Interlinking cards for a page, from the RRIL plugin.
 *
 * The endpoint takes the page's full WordPress path — including the slug, so
 * `location-served/usa/ca` 404s where `location-served/usa/ca/drug-rehab` resolves —
 * and returns a flat `[{ link, title }]` array with absolute URLs and encoded entities.
 *
 * Returns `null` (not `[]`) whenever there is nothing usable, so callers can fall
 * back to their hardcoded cards instead of rendering an empty section.
 */
export async function fetchInterlinking(path: string): Promise<InterlinkItem[] | null> {
  if (!path) return null;
  const encoded = path.split("/").filter(Boolean).map(encodeURIComponent).join("/");
  if (!encoded) return null;
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/rril/v1/interlinking/${encoded}`, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(INTERLINKING_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    const seen = new Set<string>();
    const items: InterlinkItem[] = [];
    for (const entry of data as Array<{ link?: string; title?: string }>) {
      if (!entry?.link || !entry?.title) continue;
      const href = toRelative(entry.link);
      if (seen.has(href)) continue; // the feed repeats a link on some pages
      const title = decodeEntities(stripTags(entry.title))
        .replace(/%sitename%/gi, SITE_NAME)
        .trim();
      if (!title) continue;
      seen.add(href);
      items.push({ href, title });
    }
    return items.length ? items : null;
  } catch {
    return null;
  }
}

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
