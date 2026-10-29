import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Build runs on a CI runner, not on the EC2 box. `standalone` emits
  // .next/standalone with only the traced files it needs (including the slice of
  // node_modules), so the deploy artifact is self-contained and the server never
  // has to run `pnpm install` or `next build`.
  output: 'standalone',
  // Keeps server.js at the root of .next/standalone, where pm2 on EC2 expects it.
  outputFileTracingRoot: __dirname,

  // WordPress appends a trailing slash by default, so every pre-migration
  // backlink and nearly every hardcoded internal href uses that form. Serving it
  // as canonical keeps those direct hits instead of 308 hops.
  trailingSlash: true,

  // Rank Math redirects exported from WordPress (districtbehavioralhealth_rank-math-redirections
  // CSV, 2026-10-06). WordPress owns these rules too, but this app serves the apex domain
  // directly, so requests never reach WordPress to pick them up.
  async redirects() {
    return [
      {
        source: '/location-served/usa/adderall/',
        destination: '/location-served/usa/adderall/how-long-in-your-system/',
        permanent: true,
      },
      {
        source: '/location-served/usa/alcohol/',
        destination: '/location-served/usa/alcohol/how-long-in-your-system/',
        permanent: true,
      },
      {
        source: '/location-served/usa/dxm/',
        destination: '/location-served/usa/alcohol/how-long-in-your-system/',
        permanent: true,
      },
      {
        source: '/location-served/usa/lsd/',
        destination: '/location-served/usa/lsd/ingredients',
        permanent: true,
      },
      {
        source: '/location-served/usa/poppers/',
        destination: '/location-served/usa/poppers/risks/',
        permanent: true,
      },
      /*{
        source: '/location-served/usa/dopamine/',
        destination: '/location-served/usa/dopamine/benefits-&-working/',
        permanent: true,
      },*/
      {
        source: '/location-served/usa/ativan-lorazepam/',
        destination: '/location-served/usa/ativan-lorazepam/how-long-in-your-system/',
        permanent: true,
      },
      {
        source: '/location-served/usa/vs/',
        destination: '/location-served/usa/vs/dextroamphetamine-vs-adderall',
        permanent: true,
      },
      {
        source: '/location-served/usa/magic-mushrooms/',
        destination: '/location-served/usa/magic-mushrooms/chocolate-bar-risks-dangers',
        permanent: true,
      },
      /*{
        source: '/location-served/usa/e-341-round-pill/',
        destination: '/location-served/usa/e-341-round-pill/risks-&-warnings/',
        permanent: true,
      },*/
      {
        source: '/location-served/usa/mixing/',
        destination: '/location-served/usa/mixing/risks-of-mixing-seroquel-and-alcohol',
        permanent: true,
      },
      {
        source: '/location-served/usa/e-404-orange-pill/',
        destination: '/location-served/usa/e-404-orange-pill/uses-&-risks',
        permanent: true,
      },
      {
        source: '/location-served/usa/zoloft/',
        destination: '/location-served/usa/zoloft/how-long-in-your-system',
        permanent: true,
      },
      /*{
        source: '/location-served/usa/lisdexamfetamine-vyvanse/',
        destination: '/location-served/usa/lisdexamfetamine-vyvanse/uses-&-risks',
        permanent: true,
      },*/
      {
        source: '/location-served/usa/diphenhydramine-benadryl/',
        destination: '/location-served/usa/diphenhydramine-benadryl/how-long-in-your-system',
        permanent: true,
      },
      {
        source: '/review-us/',
        destination: 'https://g.page/r/CVhKyIaqnHCQEBM/review',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ]
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
