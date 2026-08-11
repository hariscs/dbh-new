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

/* ── Mega menu ────────────────────────────────────────────────────────────── */

/**
 * The primary nav, from `builder/v1/menu`.
 *
 * Core's `/wp/v2/menus` and `/wp/v2/menu-items` are gated behind
 * `edit_theme_options` and 401 anonymously, so the nav cannot be read the way
 * pages are — hence the custom endpoint. It returns a three-level tree whose
 * fields are scoped by depth, mirroring the Mega Menu ACF group:
 *
 *   depth 0  top-level nav item   -> owns the featured-blogs sidebar
 *   depth 1  tab in the left rail -> owns the heading, card style, sidebar toggle
 *   depth 2  card / column link   -> owns the image, excerpt, column heading
 *
 * The depth scoping is load-bearing, not cosmetic: ACF stamps its `"plain"`
 * default onto `mega_card_style` for every item at every depth, so a card
 * reports a `cardStyle` that means nothing. Only a tab's value is real, which
 * is why `cardStyle` exists on MenuTab and nowhere else.
 */

export type MenuCardStyle = "image" | "plain" | "columns";

export type MenuImage = { url: string; alt: string; width: number; height: number };

export type MenuFeaturedBlog = {
  id: number;
  title: string;
  href: string;
  /** Often "" — these are Elementor pages with no excerpt or SEO description. */
  excerpt: string;
  image: {
    url: string;
    /**
     * True when the endpoint fell through to the generic placeholder. Every blog
     * currently hits it, so rendering the thumbnail unconditionally repeats one
     * image down the sidebar — check this and fall back to a text-only card.
     */
    isPlaceholder: boolean;
  };
};

type MenuNodeBase = {
  id: number;
  title: string;
  url: string;
  /** "" or "_blank". */
  target: string;
  parent: number;
  /**
   * Allowlisted menu-item classes. Empty in practice: `wp_get_nav_menu_items()`
   * returns only classes stored in `_menu_item_classes`, and it skips the
   * `nav_menu_css_class` filter that injects them at render time. Do not depend
   * on it to pick the open tab — see MenuTopLevel.children.
   */
  classes: string[];
};

/** depth 2 — one card, or one link inside a column list. */
export type MenuCard = MenuNodeBase & {
  depth: 2;
  /** null when no image is set; most cards under an `image` tab have none. */
  cardImage: MenuImage | null;
  cardExcerpt: string;
  /**
   * Start a new column at this card. Separate from `columnHeading` because
   * editors mark an unlabelled column with a bare `&nbsp;` heading, which
   * decodes to "" — the flag preserves that intent.
   */
  startsColumn: boolean;
  columnHeading: string;
};

/** depth 1 — a tab in the panel's left rail, plus the cards it reveals. */
export type MenuTab = MenuNodeBase & {
  depth: 1;
  sectionHeading: string;
  cardStyle: MenuCardStyle;
  /**
   * Whether the parent's featured blogs show while THIS tab is open. The
   * sidebar belongs to the top-level item but is gated per tab, so a panel can
   * carry blogs that no tab ever reveals.
   */
  showSidebar: boolean;
  children: MenuCard[];
};

/** depth 0 — a top-level nav item. */
export type MenuTopLevel = MenuNodeBase & {
  depth: 0;
  featuredBlogs: MenuFeaturedBlog[];
  /** `children[0]` is the tab that opens first — verified against every panel WordPress renders. */
  children: MenuTab[];
};

type RawNode = Record<string, unknown>;

const asString = (v: unknown) => (typeof v === "string" ? v : "");
const asNumber = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const asNodes = (v: unknown) => (Array.isArray(v) ? (v as RawNode[]) : []);

const CARD_STYLES: readonly MenuCardStyle[] = ["image", "plain", "columns"];

const asCardStyle = (v: unknown): MenuCardStyle =>
  CARD_STYLES.includes(v as MenuCardStyle) ? (v as MenuCardStyle) : "plain";

const menuNodeBase = (n: RawNode): MenuNodeBase => ({
  id: asNumber(n.id),
  title: asString(n.title),
  url: asString(n.url) || "#",
  target: asString(n.target),
  parent: asNumber(n.parent),
  classes: Array.isArray(n.classes) ? n.classes.filter((c): c is string => typeof c === "string") : [],
});

/**
 * Media lives on the WordPress host, so a root-relative path would resolve against
 * this app — which serves no /wp-content — and 404. Links are the opposite case and
 * are deliberately left relative; only image URLs go through here.
 */
const absoluteMedia = (url: string) =>
  url.startsWith("/") ? `${WORDPRESS_URL}${url}` : url;

const menuImage = (v: unknown): MenuImage | null => {
  if (!v || typeof v !== "object") return null;
  const img = v as RawNode;
  const url = asString(img.url);
  if (!url) return null;
  return {
    url: absoluteMedia(url),
    alt: asString(img.alt),
    width: asNumber(img.width),
    height: asNumber(img.height),
  };
};

const menuBlog = (n: RawNode): MenuFeaturedBlog | null => {
  const title = asString(n.title);
  const href = asString(n.href);
  if (!title || !href) return null;
  const image = (n.image ?? {}) as RawNode;
  return {
    id: asNumber(n.id),
    title,
    href,
    excerpt: asString(n.excerpt),
    // Assume placeholder unless told otherwise, so an older payload without the
    // flag degrades to the text-only card rather than a broken thumbnail.
    image: {
      url: absoluteMedia(asString(image.url)),
      isPlaceholder: image.isPlaceholder !== false,
    },
  };
};

// Anything below depth 2 is dropped: the WordPress walker emits nothing for it
// either, so honouring it here would render markup the CMS never shows.
const menuCard = (n: RawNode): MenuCard => ({
  ...menuNodeBase(n),
  depth: 2,
  cardImage: menuImage(n.cardImage),
  cardExcerpt: asString(n.cardExcerpt),
  startsColumn: n.startsColumn === true,
  columnHeading: asString(n.columnHeading),
});

const menuTab = (n: RawNode): MenuTab => ({
  ...menuNodeBase(n),
  depth: 1,
  sectionHeading: asString(n.sectionHeading),
  cardStyle: asCardStyle(n.cardStyle),
  showSidebar: n.showSidebar === true,
  children: asNodes(n.children).map(menuCard),
});

const menuTopLevel = (n: RawNode): MenuTopLevel | null => {
  const base = menuNodeBase(n);
  if (!base.title) return null; // a nameless nav item is unusable
  return {
    ...base,
    depth: 0,
    featuredBlogs: asNodes(n.featuredBlogs)
      .map(menuBlog)
      .filter((b): b is MenuFeaturedBlog => b !== null),
    children: asNodes(n.children).map(menuTab),
  };
};

// The nav renders on every page, including slugs that miss generateStaticParams
// and render on demand inside the visitor's request. Bound it like the
// interlinking fetch so a slow WordPress degrades to the hardcoded nav rather
// than holding the render open.
const MENU_TIMEOUT_MS = Number(process.env.WORDPRESS_MENU_TIMEOUT_MS ?? "5000");

/**
 * Returns `null` — never `[]` — whenever there is nothing usable, so the caller
 * can keep rendering the hardcoded nav instead of shipping an empty header.
 */
export async function fetchMenu(location = "primary"): Promise<MenuTopLevel[] | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/builder/v1/menu?location=${encodeURIComponent(location)}`,
      { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(MENU_TIMEOUT_MS) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    const items = (data as RawNode[])
      .map(menuTopLevel)
      .filter((n): n is MenuTopLevel => n !== null);
    return items.length ? items : null;
  } catch {
    return null;
  }
}
