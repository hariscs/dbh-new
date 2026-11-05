import type { Payload } from 'payload'

export type Interlinking = {
  link: string
  title: string
  excluded: boolean
  isBlog: boolean
  pageType: string
  topics: string[]
  intents: string[]
  geoIds: number[]
  deepestGeoId: number | null
  geoLevel: string | null
  templateLineage: string[]
}

type Conditions = {
  limit?: number
  sort_by?: string
  source_template?: string | string[]
  topic_filter?: string
  topic_slug?: string
  intent_filter?: string
  older_than_months?: number
  geo_filter?: string
  geo_type?: string
  only_if_blog_has_geo?: boolean | number
  unique_topics?: number
  unique_geo?: number
  exclude_topic1_slugs?: string[]
}

type Candidate = Interlinking & { wpId: number; postDate: string }
type InterlinkItem = { link: string; title: string }

const COUNTY_DEPTH = 3
const DEFAULT_LIMIT = 10
const UNRANKED_TOPIC = 999
const UNRANKED_INTENT = 3
const INTENT_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 }
const POST_FILTERED_GEO = ['same', 'other', 'other_outside_same', 'sibling_cities', 'children_of_same']

const TOPIC_PRIORITY: Record<string, number> = {
  drug: 1,
  outpatient: 2,
  'pet-friendly': 3,
  fentanyl: 4,
  iop: 5,
  couples: 6,
  meth: 7,
  'long-term': 8,
  'short-term': 9,
  mat: 10,
  veterans: 11,
  'virtual-iop': 12,
  '12-step': 13,
  php: 14,
  marijuana: 15,
  'dual-diagnosis': 16,
  'cbt-therapy': 17,
  cocaine: 18,
  dbt: 19,
  emdr: 20,
  'group-addiction': 21,
  'holistic-addiction': 22,
  intervention: 23,
  'sober-living': 24,
  kratom: 25,
  benzo: 26,
  xanax: 27,
  ketamine: 28,
  nitazene: 29,
  lgbtq: 30,
  'device-friendly': 31,
  executive: 32,
  'faith-based': 33,
  teen: 34,
  'yoga-assisted': 35,
  'meditation-mindfulness-assisted': 36,
  'medication-management': 37,
}

const topicRank = (page: Candidate) => TOPIC_PRIORITY[page.topics[0]] ?? UNRANKED_TOPIC
const intentRank = (page: Candidate) => INTENT_RANK[page.intents[0]] ?? UNRANKED_INTENT

const buildGeoTree = (terms: { wpId: number; parent: number }[]) => {
  const parentOf = new Map(terms.map((term) => [term.wpId, term.parent]))
  const childrenOf = (id: number) => terms.filter((term) => term.parent === id).map((term) => term.wpId)

  const ancestorsOf = (id: number) => {
    const ancestors: number[] = []
    for (let parent = parentOf.get(id); parent; parent = parentOf.get(parent)) ancestors.push(parent)
    return ancestors
  }

  const withDescendants = (ids: number[]): number[] =>
    ids.flatMap((id) => [id, ...withDescendants(childrenOf(id))])

  return { childrenOf, ancestorsOf, withDescendants }
}

type GeoTree = ReturnType<typeof buildGeoTree>

const countyAncestor = (geoId: number, tree: GeoTree) =>
  tree.ancestorsOf(geoId).find((id) => tree.ancestorsOf(id).length === COUNTY_DEPTH)

const resolveGeoIds = (geoFilter: string, currentGeo: number | null, tree: GeoTree) => {
  if (!currentGeo) return null
  if (geoFilter === 'same') return [currentGeo]
  const parent = geoFilter === 'children_of_same' ? currentGeo : geoFilter === 'sibling_cities' ? countyAncestor(currentGeo, tree) : null
  if (!parent) return null
  const children = tree.childrenOf(parent)
  return children.length ? children : null
}

const matchesGeoRelationship = (page: Candidate, geoFilter: string, currentGeo: number, tree: GeoTree) => {
  const deepest = page.deepestGeoId
  if (!deepest) return false
  if (geoFilter === 'same') return deepest === currentGeo
  if (geoFilter === 'other') return deepest !== currentGeo
  if (geoFilter === 'other_outside_same') {
    return deepest !== currentGeo && !tree.ancestorsOf(deepest).includes(currentGeo)
  }
  if (geoFilter === 'sibling_cities') {
    if (deepest === currentGeo) return false
    const county = countyAncestor(currentGeo, tree)
    return !!county && tree.ancestorsOf(deepest).includes(county)
  }
  return true
}

const matchesGeoType = (page: Candidate, geoType: string) =>
  geoType === 'city_or_county' ? page.geoLevel === 'city' || page.geoLevel === 'county' : page.geoLevel === geoType

const monthsBefore = (now: Date, months: number) => {
  const cutoff = new Date(now)
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months)
  return cutoff.toISOString().slice(0, 10)
}

const sortCandidates = (pages: Candidate[], sortBy: string) => {
  if (sortBy === 'topic_priority') return [...pages].sort((a, b) => topicRank(a) - topicRank(b))
  if (sortBy === 'intent_then_date') {
    return [...pages].sort((a, b) => intentRank(a) - intentRank(b) || b.postDate.localeCompare(a.postDate))
  }
  return pages
}

const geoKey = (page: Candidate) => page.deepestGeoId ?? `no_geo_${page.wpId}`
const topicKey = (page: Candidate) => page.topics[0] ?? '__none__'

const keepUnique = (pages: Candidate[], limit: number, topics: boolean, geos: boolean) => {
  if (!topics && !geos) return pages
  const usedTopics = new Set<string>()
  const usedGeos = new Set<number | string>()
  const kept: Candidate[] = []

  for (const page of pages) {
    const seenTopic = usedTopics.has(topicKey(page))
    const seenGeo = usedGeos.has(geoKey(page))
    const skip = topics && geos ? seenTopic && seenGeo : topics ? seenTopic : seenGeo
    if (skip) continue
    kept.push(page)
    usedTopics.add(topicKey(page))
    usedGeos.add(geoKey(page))
    if (kept.length >= limit) break
  }
  return kept
}

const runRule = (cond: Conditions, current: Candidate, pages: Candidate[], tree: GeoTree, now: Date) => {
  const limit = Number(cond.limit ?? DEFAULT_LIMIT)
  const geoFilter = cond.geo_filter ?? 'any'
  const topicFilter = cond.topic_filter ?? 'any'
  const currentTopic = current.topics[0]
  const currentGeo = current.deepestGeoId

  if (geoFilter === 'custom_slugs') return []
  if (topicFilter === 'specific' && !cond.topic_slug) return []
  if (cond.only_if_blog_has_geo && !currentGeo) return []

  const templates = [cond.source_template ?? []].flat()
  const geoIds = resolveGeoIds(geoFilter, currentGeo, tree)
  const expandedGeoIds = geoIds && tree.withDescendants(geoIds)
  const olderThan = Number(cond.older_than_months ?? 0)
  const cutoff = olderThan > 0 ? monthsBefore(now, olderThan) : null
  const geoType = cond.geo_type && cond.geo_type !== 'any' ? cond.geo_type : null
  const intent = cond.intent_filter && cond.intent_filter !== 'any' ? cond.intent_filter : null
  const excludedTopics = (cond.exclude_topic1_slugs ?? []).map((slug) => slug.trim()).filter(Boolean)

  const matched = pages.filter((page) => {
    if (page.wpId === current.wpId || page.excluded) return false
    if (templates.length && !templates.some((slug) => page.templateLineage.includes(slug))) return false
    if (topicFilter === 'same' && currentTopic && !page.topics.includes(currentTopic)) return false
    if (topicFilter === 'different' && currentTopic && page.topics.includes(currentTopic)) return false
    if (topicFilter === 'specific' && !page.topics.includes(cond.topic_slug ?? '')) return false
    if (intent && !page.intents.includes(intent)) return false
    if (cutoff && page.postDate >= cutoff) return false
    if (expandedGeoIds && !page.geoIds.some((id) => expandedGeoIds.includes(id))) return false
    if (geoType && !matchesGeoType(page, geoType)) return false
    if (currentGeo && POST_FILTERED_GEO.includes(geoFilter)) {
      return matchesGeoRelationship(page, geoFilter, currentGeo, tree)
    }
    return true
  })

  const sorted = sortCandidates(matched, cond.sort_by ?? 'date')
  const unique = keepUnique(sorted, limit, Number(cond.unique_topics ?? 0) === 1, Number(cond.unique_geo ?? 0) === 1)
  return unique.filter((page) => !page.topics.some((slug) => excludedTopics.includes(slug))).slice(0, limit)
}

export const findInterlinking = async (payload: Payload, rawPath: string, now = new Date()) => {
  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    where: { postType: { equals: 'page' }, status: { equals: 'publish' } },
    sort: ['-postDate', '-wpId'],
    depth: 0,
    pagination: false,
    select: { wpId: true, path: true, reachableByPath: true, postDate: true, interlinking: true },
  })
  const pages = pageDocs.map((page) => ({
    ...(page.interlinking as Interlinking),
    wpId: page.wpId,
    postDate: page.postDate ?? '',
    path: page.path,
    reachableByPath: page.reachableByPath,
  }))

  const current = pages.find(
    (page) => page.reachableByPath && page.path === `/${rawPath.replace(/^\/+|\/+$/g, '')}`,
  )
  if (!current) return undefined

  const [{ docs: rules }, { docs: geoTerms }] = await Promise.all([
    payload.find({
      collection: 'interlinking-rules',
      where: { pageType: { equals: current.pageType }, status: { equals: 'active' } },
      sort: ['priority', 'wpId'],
      depth: 0,
      pagination: false,
    }),
    payload.find({ collection: 'geo-terms', depth: 0, pagination: false }),
  ])
  const tree = buildGeoTree(geoTerms)

  const seen = new Set<number>()
  const related = rules
    .flatMap((rule) => runRule(rule.conditions as Conditions, current, pages, tree, now))
    .filter((page) => !seen.has(page.wpId) && !!seen.add(page.wpId))

  const toItem = ({ link, title }: Candidate): InterlinkItem => ({ link, title })
  const mainPages = related.filter((page) => !page.isBlog).map(toItem)
  const blogPages = related.filter((page) => page.isBlog).map(toItem)
  if (!mainPages.length && !blogPages.length) return []

  return {
    ...(mainPages.length && { main_pages: mainPages }),
    ...(blogPages.length && { blog_pages: blogPages }),
  }
}
