import type { Payload, Where } from 'payload'

import type { Page } from '@/payload-types'

type PageDataQuery = {
  id?: number
  path?: string
  slug?: string
  present?: boolean
}

const findOne = async (payload: Payload, where: Where) => {
  const { docs } = await payload.find({
    collection: 'pages',
    where,
    sort: '-wpId',
    limit: 1,
    depth: 0,
    pagination: false,
  })
  return docs[0]
}

const resolvePage = async (payload: Payload, { id, path, slug }: PageDataQuery) => {
  if (id && id > 0) {
    const page = await findOne(payload, { wpId: { equals: id } })
    if (page) return page
  }

  if (path !== undefined && path !== '') {
    const trimmed = path.replace(/^\/+|\/+$/g, '')
    const page = trimmed
      ? ((await findOne(payload, { path: { equals: `/${trimmed}` }, postType: { equals: 'page' } })) ??
        (await findOne(payload, { path: { equals: `/${trimmed}` } })))
      : await findOne(payload, { isFrontPage: { equals: true } })
    if (page) return page
  }

  if (!slug) return undefined
  return (
    (await findOne(payload, { slug: { equals: slug }, postType: { equals: 'page' } })) ??
    (await findOne(payload, { slug: { equals: slug } }))
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
