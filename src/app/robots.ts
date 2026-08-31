import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/wordpress";

// Fails open: only an explicit ROBOTS_ALLOW=false blocks indexing. A missing env
// var on production would otherwise deindex the whole site, and staging is
// already unreachable behind basic auth.
const INDEXABLE = process.env.ROBOTS_ALLOW !== "false";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
