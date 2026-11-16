import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { type NextRequest, NextResponse } from 'next/server'

import { UPLOAD_TYPES } from '@/content/uploads'

const CACHE_SECONDS = 30 * 24 * 60 * 60

const notFound = () => new NextResponse('Not found', { status: 404 })

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => {
  const uploadsDir = process.env.UPLOADS_DIR
  if (!uploadsDir) return notFound()

  const root = path.resolve(uploadsDir)
  const file = path.resolve(root, ...(await params).path)
  const type = UPLOAD_TYPES[path.extname(file).toLowerCase()]
  if (!type || !file.startsWith(`${root}${path.sep}`)) return notFound()

  const body = await readFile(file).catch(() => null)
  if (!body) return notFound()

  return new NextResponse(new Uint8Array(body), {
    headers: {
      'Content-Type': type,
      'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  })
}
