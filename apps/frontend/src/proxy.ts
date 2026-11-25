import { type NextRequest, NextResponse } from "next/server";

type Redirect = { from: string; to: string; status: number };

const REDIRECTS_URL = `${process.env.WORDPRESS_URL}/wp-json/builder/v1/redirects`;
const CACHE_MS = 60_000;
const FETCH_TIMEOUT_MS = 2_000;

let cached: { at: number; byPath: Map<string, Redirect> } | null = null;

const withoutTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

async function redirectsByPath() {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.byPath;
  try {
    const res = await fetch(REDIRECTS_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS), cache: "no-store" });
    if (!res.ok) throw new Error(`redirects ${res.status}`);
    const list = (await res.json()) as Redirect[];
    cached = { at: Date.now(), byPath: new Map(list.map((item) => [withoutTrailingSlash(item.from), item])) };
  } catch {
    cached = { at: Date.now(), byPath: cached?.byPath ?? new Map() };
  }
  return cached.byPath;
}

export async function proxy(request: NextRequest) {
  const match = (await redirectsByPath()).get(withoutTrailingSlash(request.nextUrl.pathname));
  if (!match) return NextResponse.next();
  const target = new URL(match.to, request.url);
  if (!target.search) target.search = request.nextUrl.search;
  return NextResponse.redirect(target, match.status);
}

export const config = {
  matcher: ["/((?!_next/|api/|wp-content/|favicon|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|txt|xml|woff2?)$).*)"],
};
