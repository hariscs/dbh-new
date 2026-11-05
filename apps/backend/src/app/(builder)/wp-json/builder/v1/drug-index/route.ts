import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { findDrugIndex } from '@/builder-api/drug-index'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

export const GET = async (request: NextRequest) => {
  const letter = request.nextUrl.searchParams.get('di')

  if (letter === null) {
    return NextResponse.json(
      {
        code: 'rest_missing_callback_param',
        message: 'Missing parameter(s): di',
        data: { status: 400, params: ['di'] },
      },
      { status: 400, headers: NO_CACHE },
    )
  }

  const payload = await getPayload({ config })
  return NextResponse.json(await findDrugIndex(payload, letter), { headers: NO_CACHE })
}
