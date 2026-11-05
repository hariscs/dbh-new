import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findInterlinking } from '@/builder-api/interlinking'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => {
  const { path } = await params
  const payload = await getPayload({ config })
  const result = await findInterlinking(payload, path.join('/'))

  if (!result) {
    return NextResponse.json(
      { code: 'rril_invalid_page', message: 'Page not found or not published.', data: { status: 404 } },
      { status: 404, headers: NO_CACHE },
    )
  }
  return NextResponse.json(result, { headers: NO_CACHE })
}
