import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findPages, isKnownPostType } from '@/builder-api/pages'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const payload = await getPayload({ config })
  const postType = params.get('post_type') || 'page'

  if (!(await isKnownPostType(payload, postType))) {
    return NextResponse.json({ error: 'invalid_post_type' }, { status: 400, headers: NO_CACHE })
  }

  const pages = await findPages(payload, {
    postType,
    path: params.get('path') || undefined,
    parent: Number(params.get('parent')) || undefined,
    template: params.get('template') || undefined,
  })
  return NextResponse.json(pages, { headers: NO_CACHE })
}
