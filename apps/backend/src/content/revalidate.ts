import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'

const TIMEOUT_MS = 10_000

const requestRevalidation = async (req: PayloadRequest, slug?: string) => {
  const frontendUrl = process.env.FRONTEND_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!frontendUrl || !secret) {
    req.payload.logger.warn('revalidate: FRONTEND_URL or REVALIDATE_SECRET not set, skipped')
    return
  }
  try {
    const response = await fetch(`${frontendUrl.replace(/\/+$/, '')}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, ...(slug && { slug }) }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) req.payload.logger.warn(`revalidate: ${slug ?? 'layout'} failed with ${response.status}`)
  } catch (error) {
    req.payload.logger.warn(`revalidate: ${slug ?? 'layout'} failed (${error instanceof Error ? error.message : error})`)
  }
}

const slugOf = (doc: { path?: string; isFrontPage?: boolean | null }) =>
  doc.isFrontPage ? undefined : doc.path?.replace(/^\/+|\/+$/g, '')

export const revalidatePage: CollectionAfterChangeHook = async ({ doc, previousDoc, req, context }) => {
  if (context.import) return doc
  await requestRevalidation(req, slugOf(doc))
  if (previousDoc?.path && previousDoc.path !== doc.path) await requestRevalidation(req, slugOf(previousDoc))
  return doc
}

export const revalidateLayout: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if (context.import) return doc
  await requestRevalidation(req)
  return doc
}
