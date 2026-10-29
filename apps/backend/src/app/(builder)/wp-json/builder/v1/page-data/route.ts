import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findPageData } from '@/builder-api/page-data'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

const isTruthy = (value: string | null) => value === '1' || value === 'true'

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const payload = await getPayload({ config })

  const page = await findPageData(payload, {
    id: Number(params.get('id')) || undefined,
    path: params.get('path') ?? undefined,
    slug: params.get('slug') ?? undefined,
    present: isTruthy(params.get('present')),
  })

  if (!page) return NextResponse.json({ error: 'not_found' }, { status: 404, headers: NO_CACHE })
  return NextResponse.json(page, { headers: NO_CACHE })
}
