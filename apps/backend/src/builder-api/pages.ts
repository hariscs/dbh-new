import type { Payload, Where } from 'payload'

type PagesQuery = {
  postType: string
  path?: string
  parent?: number
  template?: string
}

const parentIdForPath = async (payload: Payload, path: string) => {
  const trimmed = path.replace(/^\/+|\/+$/g, '')
  if (!trimmed) return undefined
  const { docs } = await payload.find({
    collection: 'pages',
    where: { path: { equals: `/${trimmed}` }, postType: { equals: 'page' } },
    sort: '-wpId',
    limit: 1,
    depth: 0,
    select: { wpId: true },
  })
  return docs[0]?.wpId
}

export const hasTemplate = (templates: unknown, template: string) =>
  !!templates &&
  typeof templates === 'object' &&
  'slugs' in templates &&
  Array.isArray(templates.slugs) &&
  templates.slugs.includes(template)

export const isKnownPostType = async (payload: Payload, postType: string) =>
  (
    await payload.count({
      collection: 'pages',
      where: { postType: { equals: postType }, status: { equals: 'publish' } },
    })
  ).totalDocs > 0

export const findPages = async (payload: Payload, { postType, path, parent, template }: PagesQuery) => {
  const where: Where = { postType: { equals: postType }, status: { equals: 'publish' } }
  const parentWpId = path ? await parentIdForPath(payload, path) : parent
  if (parentWpId) where.parentWpId = { equals: parentWpId }

  const { docs } = await payload.find({
    collection: 'pages',
    where,
    sort: ['-postDate', '-wpId'],
    depth: 0,
    pagination: false,
    select: { wpId: true, slug: true, path: true, parentSlug: true, templates: true },
  })

  return docs
    .filter((page) => !template || hasTemplate(page.templates, template))
    .map((page) => ({ id: page.wpId, slug: page.slug, path: page.path, parent: page.parentSlug ?? '' }))
}
