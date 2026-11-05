import type { CollectionBeforeChangeHook } from 'payload'

import type { Interlinking } from '../builder-api/interlinking'
import { renderTitle } from '../import/wp-text'

const LINK_ORIGIN = 'https://cms.districtbehavioralhealth.com'
const GEO_LEVELS = ['national', 'state', 'county', 'city', 'region']
const GEO_LEVEL_BY_DEPTH = ['national', 'state', 'region', 'county']

type Term = { wpId: number; taxonomy: string; slug: string; name: string; parent: number }
type TermIds = Record<string, number[]>
type Fields = Record<string, string>

const escHtml = (text: string) =>
  text
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const ancestorsOf = (terms: Term[], term: Term) => {
  const ancestors: Term[] = []
  for (let parent = terms.find((candidate) => candidate.wpId === term.parent); parent; ) {
    ancestors.push(parent)
    const next = parent.parent
    parent = terms.find((candidate) => candidate.wpId === next)
  }
  return ancestors
}

const geoLevelOf = (geoType: string, deepest: Term | undefined, allTerms: Term[]) => {
  const value = geoType.trim().toLowerCase()
  const level = GEO_LEVELS.includes(value) ? value : GEO_LEVELS.find((candidate) => value.includes(candidate))
  if (level) return level
  return deepest ? (GEO_LEVEL_BY_DEPTH[ancestorsOf(allTerms, deepest).length] ?? 'city') : null
}

const pageTypeOf = (lineage: string[], geoLevel: string | null) => {
  if (lineage.includes('blog')) return 'blog'
  if (lineage.includes('national-rehab')) return 'national'
  if (!lineage.includes('geo')) return 'homepage'
  if (geoLevel === 'region') return 'state'
  return geoLevel === 'state' || geoLevel === 'county' || geoLevel === 'city' ? geoLevel : 'homepage'
}

export const derivePage: CollectionBeforeChangeHook = async ({ data, originalDoc, operation, req, context }) => {
  const page = { ...originalDoc, ...data }
  const { docs: termDocs } = await req.payload.find({ collection: 'terms', depth: 0, pagination: false, req })
  const allTerms: Term[] = termDocs.map(({ wpId, taxonomy, slug, name, parent }) => ({
    wpId,
    taxonomy,
    slug,
    name,
    parent,
  }))
  const termIds = (page.termIds ?? {}) as TermIds
  const previousTermIds = (originalDoc?.termIds ?? {}) as TermIds
  const termsOf = (taxonomy: string) =>
    (termIds[taxonomy] ?? [])
      .map((id) => allTerms.find((term) => term.wpId === id))
      .filter((term): term is Term => !!term)

  const fields: Fields = { ...((page.fields ?? {}) as Fields) }
  for (const taxonomy of (page.fieldTaxonomies ?? []) as string[]) {
    const terms = termsOf(taxonomy)
    if (terms.length) {
      fields[taxonomy] = terms.map((term) => term.name).join(', ')
      fields[`${taxonomy}___slugs`] = terms.map((term) => term.slug).join(',')
    } else if (previousTermIds[taxonomy]?.length) {
      delete fields[taxonomy]
      delete fields[`${taxonomy}___slugs`]
    }
  }

  const templateTerms = termsOf('template').sort((a, b) => a.slug.localeCompare(b.slug))
  const templates = {
    slugs: templateTerms.map((term) => term.slug),
    ids: templateTerms.map((term) => term.wpId),
    names: templateTerms.map((term) => term.name),
  }

  let { path, reachableByPath, parentSlug, meta } = page
  const isEdit = operation === 'update' && !context.import
  const parentChanged = data.parentWpId !== undefined && data.parentWpId !== originalDoc?.parentWpId
  const slugChanged = data.slug !== undefined && data.slug !== originalDoc?.slug

  if (isEdit && (parentChanged || slugChanged)) {
    const { docs: parents } = await req.payload.find({
      collection: 'pages',
      where: { wpId: { equals: page.parentWpId ?? 0 } },
      depth: 0,
      limit: 1,
      req,
    })
    const parent = parents[0]
    path =
      page.postType === 'page'
        ? `${parent ? parent.path.replace(/\/$/, '') : ''}/${page.slug}`
        : path.replace(/[^/]+$/, page.slug)
    reachableByPath = parent ? !!parent.reachableByPath && !!parent.slug : true
    parentSlug = parent?.slug ?? ''
  }
  if (isEdit) {
    meta = {
      ...(meta as Record<string, string>),
      slug: page.slug,
      parent: parentSlug,
      updatedAt: `${new Date().toISOString().slice(0, 19)}+00:00`,
    }
  }

  const slugsOf = (taxonomy: string) => termsOf(taxonomy).map((term) => term.slug)
  const geoTerms = termsOf('geo')
  const deepestGeo = geoTerms.reduce<Term | undefined>(
    (deepest, term) =>
      !deepest || ancestorsOf(allTerms, term).length > ancestorsOf(allTerms, deepest).length ? term : deepest,
    undefined,
  )
  const templateLineage = [
    ...new Set([
      ...templateTerms.map((term) => term.slug),
      ...templateTerms.flatMap((term) => ancestorsOf(allTerms, term).map((ancestor) => ancestor.slug)),
    ]),
  ]
  const geoLevel = geoLevelOf(fields.geo_type ?? '', deepestGeo, allTerms)
  const h1 = (fields.h1 ?? '').replaceAll('[acf field=geo]', fields.geo ?? '')
  const title = String(page.title ?? '')

  const interlinking: Interlinking = {
    link: page.isFrontPage ? `${LINK_ORIGIN}/` : `${LINK_ORIGIN}${path}/`,
    title: escHtml(h1) || escHtml(renderTitle(title)),
    excluded: /ppc/i.test(title) || slugsOf('category').includes('redirected'),
    isBlog: templates.slugs.includes('blog'),
    pageType: pageTypeOf(templateLineage, geoLevel),
    topics: slugsOf('topic'),
    intents: slugsOf('intent'),
    geoIds: geoTerms.map((term) => term.wpId),
    deepestGeoId: deepestGeo?.wpId ?? null,
    geoLevel,
    templateLineage,
  }

  return {
    ...data,
    fields,
    templates,
    template: templates.slugs[0] ?? '',
    path,
    reachableByPath,
    parentSlug,
    meta,
    interlinking,
  }
}
