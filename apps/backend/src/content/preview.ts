import { createHmac } from 'node:crypto'

const PREVIEW_TTL_MS = 60 * 60 * 1000

export const signPreview = (path: string, expires: number, secret: string) =>
  createHmac('sha256', secret).update(`${path}:${expires}`).digest('hex')

export const previewUrl = (frontendUrl: string, path: string, secret: string) => {
  const expires = Date.now() + PREVIEW_TTL_MS
  const query = new URLSearchParams({ path, expires: String(expires), token: signPreview(path, expires, secret) })
  return `${frontendUrl}/api/preview?${query}`
}
