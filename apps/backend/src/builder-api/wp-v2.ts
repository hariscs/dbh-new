import type { Payload, Where } from 'payload'

import { renderTitle } from '../import/wp-text'
import type { Interlinking } from './interlinking'

const POST_TYPE_BY_REST_BASE: Record<string, string> = {
  pages: 'page',
  facility: 'facility',
  authors: 'authors',
  our_locations: 'our_locations',
  difference: 'difference',
}
const DEFAULT_PER_PAGE = 10

const errorResponse = (status: number, code: string, message: string) => ({
  status,
  total: null,
  totalPages: null,
  body: { code, message, data: { status } },
})

const hasAnyTemplate = (templates: unknown, ids: number[]) =>
  !!templates &&
  typeof templates === 'object' &&
  'ids' in templates &&
  Array.isArray(templates.ids) &&
  templates.ids.some((id) => ids.includes(id))

export const findWpV2 = async (payload: Payload, restBase: string, params: URLSearchParams) => {
  const postType = POST_TYPE_BY_REST_BASE[restBase]
  if (!postType) return errorResponse(404, 'rest_no_route', 'No route was found matching the URL and request method.')

  const perPage = Number(params.get('per_page')) || DEFAULT_PER_PAGE
  const page = Number(params.get('page')) || 1
  const start = Number(params.get('offset')) || (page - 1) * perPage
  const wanted = (params.get('_fields') ?? '').split(',')
  const templateIds = (params.get('template') ?? '').split(',').filter(Boolean).map(Number)

  const { docs } = await payload.find({
    collection: 'pages',
    where: { postType: { equals: postType }, status: { equals: 'publish' } },
    sort: ['-postDate', '-wpId'],
    depth: 0,
    pagination: false,
    select: { wpId: true, title: true, templates: true, meta: true, interlinking: true },
  })

  const matching = docs.filter((doc) => !templateIds.length || hasAnyTemplate(doc.templates, templateIds))
  const total = matching.length
  const totalPages = Math.ceil(total / perPage)

  if (total > 0 && page > totalPages) {
    return errorResponse(
      400,
      'rest_post_invalid_page_number',
      'The page number requested is larger than the number of pages available.',
    )
  }

  const slice = matching.slice(start, start + perPage)
  const h1ByWpId = new Map<number, string>()

  if (wanted.includes('acf.h1') && slice.length) {
    const { docs: withFields } = await payload.find({
      collection: 'pages',
      where: { wpId: { in: slice.map((doc) => doc.wpId) } },
      depth: 0,
      pagination: false,
      select: { wpId: true, fields: true },
    })
    for (const doc of withFields) h1ByWpId.set(doc.wpId, (doc.fields as Record<string, string>).h1 ?? '')
  }

  const body = slice.map((doc) => ({
    ...(wanted.includes('id') && { id: doc.wpId }),
    ...(wanted.includes('link') && { link: (doc.interlinking as Interlinking).link }),
    ...(wanted.includes('modified_gmt') && {
      modified_gmt: String((doc.meta as Record<string, string>).updatedAt).slice(0, 19),
    }),
    ...(wanted.includes('title') && { title: { rendered: renderTitle(doc.title) } }),
    ...(wanted.includes('acf.h1') && { acf: { h1: h1ByWpId.get(doc.wpId) ?? '' } }),
  }))

  return { status: 200, total, totalPages, body }
}
