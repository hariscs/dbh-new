import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findMenu } from '@/builder-api/menu'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }
const DEFAULT_LOCATION = 'primary'

export const GET = async (request: NextRequest) => {
  const payload = await getPayload({ config })
  const { status, body } = await findMenu(payload, request.nextUrl.searchParams.get('location') ?? DEFAULT_LOCATION)
  return NextResponse.json(body, { status, headers: NO_CACHE })
}
