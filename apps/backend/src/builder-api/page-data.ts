import type { Payload, Where } from 'payload'

import type { Page } from '@/payload-types'

type PageDataQuery = {
  id?: number
  path?: string
  slug?: string
  present?: boolean
  draft?: boolean
}

const findOne = async (payload: Payload, where: Where, draft = false) => {
  const { docs } = await payload.find({
    collection: 'pages',
    where: draft ? where : { and: [where, { status: { equals: 'publish' } }] },
    sort: '-wpId',
    limit: 1,
    depth: 0,
    pagination: false,
  })
  return docs[0]
}

const resolvePage = async (payload: Payload, { id, path, slug, draft }: PageDataQuery) => {
  if (id && id > 0) {
    const page = await findOne(payload, { wpId: { equals: id } }, draft)
    if (page) return page
  }

  if (path !== undefined && path !== '') {
    const trimmed = path.replace(/^\/+|\/+$/g, '')
    const page = trimmed
      ? ((await findOne(payload, {
          path: { equals: `/${trimmed}` },
          postType: { equals: 'page' },
          reachableByPath: { equals: true },
        }, draft)) ?? (await findOne(payload, { path: { equals: `/${trimmed}` }, reachableByPath: { equals: true } }, draft)))
      : await findOne(payload, { isFrontPage: { equals: true } }, draft)
    if (page) return page
  }

  if (!slug) return undefined
  return (
    (await findOne(payload, { slug: { equals: slug }, postType: { equals: 'page' } }, draft)) ??
    (await findOne(payload, { slug: { equals: slug } }, draft))
  )
}

export const findPageData = async (payload: Payload, query: PageDataQuery) => {
  const page: Page | undefined = await resolvePage(payload, query)
  if (!page) return undefined

  return {
    apiVersion: '1',
    id: page.wpId,
    template: page.template ?? '',
    templates: page.templates,
    templateVersion: null,
    slug: page.slug,
    fields: page.fields,
    present: query.present ? page.present : [],
    seo: page.seo,
    meta: page.meta,
  }
}
