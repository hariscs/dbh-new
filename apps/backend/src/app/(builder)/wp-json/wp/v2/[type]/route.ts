import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findWpV2 } from '@/builder-api/wp-v2'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

export const GET = async (request: NextRequest, { params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params
  const payload = await getPayload({ config })
  const { status, total, totalPages, body } = await findWpV2(payload, type, request.nextUrl.searchParams)

  return NextResponse.json(body, {
    status,
    headers: {
      ...NO_CACHE,
      ...(total !== null && { 'X-WP-Total': String(total), 'X-WP-TotalPages': String(totalPages) }),
    },
  })
}
