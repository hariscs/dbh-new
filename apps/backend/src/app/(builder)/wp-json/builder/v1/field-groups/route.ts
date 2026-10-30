import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { listFieldGroups } from '@/builder-api/field-groups'

const NO_CACHE = { 'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store, private' }

export const GET = async () => {
  const payload = await getPayload({ config })
  return NextResponse.json(await listFieldGroups(payload), { headers: NO_CACHE })
}
