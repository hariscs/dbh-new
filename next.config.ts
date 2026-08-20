import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Build runs on a CI runner, not on the EC2 box. `standalone` emits
  // .next/standalone with only the traced files it needs (including the slice of
  // node_modules), so the deploy artifact is self-contained and the server never
  // has to run `pnpm install` or `next build`.
  output: 'standalone',

  // WordPress appends a trailing slash by default, so every pre-migration
  // backlink and nearly every hardcoded internal href uses that form. Serving it
  // as canonical keeps those direct hits instead of 308 hops.
  trailingSlash: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    // Source images use content-hashed filenames, so a changed image produces a new
    // URL — the optimized output is safe to cache for a year (like /_next/static),
    // instead of the 4h default (14400s). Cuts revalidations and origin image-optimizer hits.
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
