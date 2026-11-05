import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import mysql, { type RowDataPacket } from 'mysql2/promise'
import { getPayload } from 'payload'
import { unserialize } from 'php-serialize'

import type { Interlinking } from '../builder-api/interlinking'
import config from '../payload.config'
import { formatWysiwyg, renderTitle, wpautop, wptexturize } from './wp-text'

const PRESENT_CACHE = path.resolve(process.cwd(), '.cache/present.json')
const PRESENT_CONCURRENCY = 2
const MENU_CACHE = path.resolve(process.cwd(), '.cache/menu.json')
const MENU_LOCATION = 'primary'
const PRESENT_TIMEOUT_MS = 60_000
const GEO_LEVELS = ['national', 'state', 'county', 'city', 'region']
const GEO_LEVEL_BY_DEPTH = ['national', 'state', 'region', 'county']
const SKIPPED_META_PREFIXES = ['_elementor', '_wp_old', '_edit_', '_wp_page_template']

// DBH Code Snippets #7 (acf/load_value) fills these when empty, so ACF returns a gallery array.
const FALLBACK_VALUES: Record<string, number[]> = {
  facility_image_slider___gallery: [106278, 104695, 107843, 105780, 107677, 105772, 105782, 105800],
}

type PostType = { slug: string; rewrite: string | null; hierarchical: boolean }
type AcfField = {
  name: string
  type: string
  returnFormat?: string
  newLines?: string
  displayFormat?: string
}
type Post = {
  ID: number
  post_type: string
  post_name: string
  post_title: string
  post_parent: number
  post_date: string
  post_modified_gmt: string
  post_status: string
}
type Term = { taxonomy: string; term_id: number; name: string; slug: string }

const databaseUrl = process.env.WP_DATABASE_URL
if (!databaseUrl) throw new Error('WP_DATABASE_URL is not set')

const db = await mysql.createConnection({ uri: databaseUrl, dateStrings: true })
const query = async <T>(sql: string, params: unknown[] = []) => {
  const [rows] = await db.query<RowDataPacket[]>(sql, params)
  return rows as T[]
}

const isSerialized = (value: string) =>
  /^(a:\d+:\{.*\}|s:\d+:".*";|i:-?\d+;|b:[01];|d:[-\d.Ee+]+;|N;)$/s.test(value.trim())

const maybeUnserialize = (value: string | null): unknown => {
  if (value === null || !isSerialized(value)) return value
  try {
    return unserialize(value, {}, { strict: false })
  } catch {
    return value
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', ndash: '–', mdash: '—',
  hellip: '…', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', copy: '©', reg: '®', trade: '™',
  shy: '­', deg: '°',
}

const decodeEntities = (value: string) =>
  value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] !== '#') return NAMED_ENTITIES[entity.toLowerCase()] ?? match
    const codePoint = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1))
    return String.fromCodePoint(codePoint)
  })

const normalizeValue = (value: unknown): string | null => {
  if (typeof value === 'string') return decodeEntities(value)
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (value && typeof value === 'object' && 'url' in value) return String(value.url)
  return null
}

const options = Object.fromEntries(
  (
    await query<{ option_name: string; option_value: string }>(
      `select option_name, option_value from wp_options
       where option_name in ('home', 'page_on_front', 'cptui_post_types', 'cptui_taxonomies')`,
    )
  ).map((row) => [row.option_name, row.option_value]),
)
const home = options.home.replace(/\/+$/, '')

const globalVariables = new Map(
  (
    await query<{ variable_name: string; simple_value: string | null; default_value: string | null }>(
      'select variable_name, simple_value, default_value from wp_nav_global_variables',
    )
  ).map((row) => [row.variable_name, row.simple_value || row.default_value || '']),
)
const frontPageId = Number(options.page_on_front)

const postTypes = new Map<string, PostType>([
  ['page', { slug: 'page', rewrite: null, hierarchical: true }],
  ['post', { slug: 'post', rewrite: '', hierarchical: false }],
])
const objectTaxonomies = new Map<string, Set<string>>([
  ['post', new Set(['category', 'post_tag', 'post_format'])],
])
const attachTaxonomy = (postType: string, taxonomy: string) => {
  const set = objectTaxonomies.get(postType) ?? new Set<string>()
  set.add(taxonomy)
  objectTaxonomies.set(postType, set)
}

type CptUiType = { public: string; rewrite_slug: string; hierarchical: string; taxonomies?: Record<string, string> }
const cptUiTypes = (maybeUnserialize(options.cptui_post_types) ?? {}) as Record<string, CptUiType>
for (const [slug, type] of Object.entries(cptUiTypes)) {
  if (type.public !== 'true') continue
  postTypes.set(slug, { slug, rewrite: type.rewrite_slug || slug, hierarchical: type.hierarchical === 'true' })
  for (const taxonomy of Object.values(type.taxonomies ?? {})) attachTaxonomy(slug, taxonomy)
}

type CptUiTaxonomy = { object_types?: Record<string, string> }
const cptUiTaxonomies = (maybeUnserialize(options.cptui_taxonomies) ?? {}) as Record<string, CptUiTaxonomy>
for (const [taxonomy, definition] of Object.entries(cptUiTaxonomies)) {
  for (const postType of Object.values(definition.object_types ?? {})) attachTaxonomy(postType, taxonomy)
}

type AcfPostType = {
  post_type: string
  public: boolean | string
  hierarchical: boolean | string
  rewrite?: { permalink_rewrite?: string; slug?: string }
  taxonomies?: Record<string, string> | string
}
type AcfTaxonomy = { taxonomy: string; object_type?: Record<string, string> }
for (const row of await query<{ post_type: string; post_content: string }>(
  `select post_type, post_content from wp_posts
   where post_type in ('acf-post-type', 'acf-taxonomy') and post_status = 'publish'`,
)) {
  const definition = maybeUnserialize(row.post_content)
  if (row.post_type === 'acf-taxonomy') {
    const taxonomy = definition as AcfTaxonomy
    for (const postType of Object.values(taxonomy.object_type ?? {})) attachTaxonomy(postType, taxonomy.taxonomy)
    continue
  }
  const type = definition as AcfPostType
  if (!type.public || type.public === '0') continue
  const rewrite =
    type.rewrite?.permalink_rewrite === 'custom_permalink' ? (type.rewrite.slug ?? type.post_type) : type.post_type
  postTypes.set(type.post_type, {
    slug: type.post_type,
    rewrite,
    hierarchical: type.hierarchical === true || type.hierarchical === '1',
  })
  const taxonomies = typeof type.taxonomies === 'object' ? Object.values(type.taxonomies) : []
  for (const taxonomy of taxonomies) attachTaxonomy(type.post_type, taxonomy)
}

const acfFields = new Map<string, AcfField>()
for (const row of await query<{ post_name: string; post_excerpt: string; post_content: string }>(
  `select post_name, post_excerpt, post_content from wp_posts where post_type = 'acf-field'`,
)) {
  const settings = maybeUnserialize(row.post_content) as Record<string, string>
  acfFields.set(row.post_name, {
    name: row.post_excerpt,
    type: settings.type,
    returnFormat: settings.return_format,
    newLines: settings.new_lines,
    displayFormat: settings.return_format ?? settings.display_format,
  })
}

const fieldGroups = await query<{ ID: number; post_name: string; post_title: string }>(
  `select ID, post_name, post_title from wp_posts
   where post_type = 'acf-field-group' and post_status in ('publish', 'acf-disabled')
   order by menu_order, post_title`,
)
const groupFields = await query<{ post_parent: number; post_name: string; post_title: string; post_excerpt: string }>(
  `select post_parent, post_name, post_title, post_excerpt from wp_posts
   where post_type = 'acf-field' and post_parent in (?)
   order by menu_order, ID`,
  [fieldGroups.map((group) => group.ID)],
)

const typeList = [...postTypes.keys()]
const allPosts = await query<Post>(
  `select ID, post_type, post_name, post_title, post_parent, post_date, post_modified_gmt, post_status
   from wp_posts where post_type in (?)`,
  [typeList],
)
const postsById = new Map(allPosts.map((post) => [post.ID, post]))
const published = (
  await query<{ ID: number }>(`select ID from wp_posts where post_status = 'publish' and post_type in (?)`, [typeList])
).map((row) => postsById.get(row.ID) as Post)
const publishedIds = published.map((post) => post.ID)
const draftPages = allPosts.filter((post) => post.post_type === 'page' && post.post_status === 'draft' && post.post_name)

const hierarchicalName = (post: Post) => {
  const names = [post.post_name]
  let parent = postsById.get(post.post_parent)
  while (parent) {
    if (parent.post_name) names.unshift(parent.post_name)
    parent = postsById.get(parent.post_parent)
  }
  return names.join('/')
}

const pathOf = (post: Post) => {
  const type = postTypes.get(post.post_type) as PostType
  const name = type.hierarchical ? hierarchicalName(post) : post.post_name
  return type.rewrite ? `/${type.rewrite}/${name}` : `/${name}`
}

const metaByPost = new Map<number, Map<string, string>>()
for (const row of await query<{ post_id: number; meta_key: string; meta_value: string }>(
  `select post_id, meta_key, meta_value from wp_postmeta where post_id in (?) order by meta_id`,
  [publishedIds],
)) {
  if (SKIPPED_META_PREFIXES.some((prefix) => row.meta_key.startsWith(prefix))) continue
  const meta = metaByPost.get(row.post_id) ?? new Map<string, string>()
  if (!meta.has(row.meta_key)) meta.set(row.meta_key, row.meta_value)
  metaByPost.set(row.post_id, meta)
}

const imageIds = new Set<number>()
for (const meta of metaByPost.values()) {
  for (const [key, reference] of meta) {
    if (!key.startsWith('_')) continue
    const field = acfFields.get(reference)
    if (field?.type !== 'image') continue
    const id = Number(meta.get(key.slice(1)))
    if (id > 0) imageIds.add(id)
  }
}
const attachments = new Map<number, { url: string; alt: string }>()
if (imageIds.size) {
  for (const row of await query<{ post_id: number; meta_key: string; meta_value: string }>(
    `select post_id, meta_key, meta_value from wp_postmeta
     where post_id in (?) and meta_key in ('_wp_attached_file', '_wp_attachment_image_alt')`,
    [[...imageIds]],
  )) {
    const attachment = attachments.get(row.post_id) ?? { url: '', alt: '' }
    if (row.meta_key === '_wp_attached_file') attachment.url = `${home}/wp-content/uploads/${row.meta_value}`
    else attachment.alt = row.meta_value
    attachments.set(row.post_id, attachment)
  }
}

const termsByPost = new Map<number, Term[]>()
for (const row of await query<Term & { object_id: number }>(
  `select tr.object_id, tt.taxonomy, t.term_id, t.name, t.slug
   from wp_term_relationships tr
   join wp_term_taxonomy tt on tt.term_taxonomy_id = tr.term_taxonomy_id
   join wp_terms t on t.term_id = tt.term_id
   where tr.object_id in (?)
   order by t.name`,
  [publishedIds],
)) {
  const terms = termsByPost.get(row.object_id) ?? []
  terms.push(row)
  termsByPost.set(row.object_id, terms)
}

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === '' || value === false ||
  (typeof value === 'object' && Object.keys(value).length === 0)

const formatDate = (stored: string, format: string) => {
  const match = /^(\d{4})(\d{2})(\d{2})$/.exec(stored)
  if (!match) return stored
  const [, year, month, day] = match
  return format.replace('Y', year).replace('m', month).replace('d', day)
}

const formatAcfValue = (field: AcfField, raw: string): unknown => {
  const value = maybeUnserialize(raw)
  switch (field.type) {
    case 'true_false':
      return Boolean(Number(value))
    case 'image': {
      if (isEmpty(value)) return false
      const attachment = attachments.get(Number(value))
      if (!attachment?.url) return false
      if (field.returnFormat === 'id') return Number(value)
      if (field.returnFormat === 'url') return attachment.url
      return attachment
    }
    case 'wysiwyg':
      return typeof value === 'string' && value ? formatWysiwyg(value, globalVariables) : value
    case 'textarea':
      if (typeof value !== 'string' || !value) return value
      if (field.newLines === 'wpautop') return wpautop(value)
      return field.newLines === 'br' ? value.replace(/\r?\n/g, '<br />\n') : value
    case 'gallery':
    case 'repeater':
    case 'relationship':
    case 'post_object':
      if (isEmpty(value)) return false
      return field.type === 'post_object' && typeof value === 'string' ? Number(value) : value
    case 'link':
      return value
    case 'date_picker':
      return typeof value === 'string' && value ? formatDate(value, field.displayFormat ?? 'd/m/Y') : value
    default:
      return value
  }
}

const buildFields = (post: Post) => {
  const fields: Record<string, string> = {}
  const meta = metaByPost.get(post.ID) ?? new Map<string, string>()

  for (const [key, raw] of meta) {
    if (key.startsWith('_')) continue
    const reference = meta.get(`_${key}`)
    if (!reference) continue
    const field = acfFields.get(reference)
    if (!field || field.name !== key) continue

    const fallback = FALLBACK_VALUES[key]
    const value = fallback && isEmpty(maybeUnserialize(raw)) ? fallback : formatAcfValue(field, raw)
    if (value && typeof value === 'object' && 'url' in value) {
      fields[key] = String(value.url)
      if ('alt' in value && value.alt) fields[`${key}___alt`] = String(value.alt)
      continue
    }
    const normalized = normalizeValue(value)
    if (normalized !== null) fields[key] = normalized
  }

  const terms = termsByPost.get(post.ID) ?? []
  for (const taxonomy of objectTaxonomies.get(post.post_type) ?? []) {
    const taxonomyTerms = terms.filter((term) => term.taxonomy === taxonomy)
    if (!taxonomyTerms.length) continue
    fields[taxonomy] = taxonomyTerms.map((term) => term.name).join(', ')
    fields[`${taxonomy}___slugs`] = taxonomyTerms.map((term) => term.slug).join(',')
  }
  return fields
}

const buildTemplates = (post: Post) => {
  const terms = (termsByPost.get(post.ID) ?? [])
    .filter((term) => term.taxonomy === 'template')
    .sort((a, b) => a.slug.localeCompare(b.slug))
  return {
    slugs: terms.map((term) => term.slug),
    ids: terms.map((term) => term.term_id),
    names: terms.map((term) => term.name),
  }
}

const permalinkOf = (post: Post) => (post.ID === frontPageId ? `${home}/` : `${home}${pathOf(post)}/`)

const termParents = await query<{ taxonomy: string; term_id: number; slug: string; parent: number }>(
  `select tt.taxonomy, t.term_id, t.slug, tt.parent
   from wp_term_taxonomy tt
   join wp_terms t on t.term_id = tt.term_id
   where tt.taxonomy in ('geo', 'template')`,
)
const geoTerms = termParents.filter((term) => term.taxonomy === 'geo')
const templateTerms = termParents.filter((term) => term.taxonomy === 'template')

const termAncestors = (terms: typeof termParents, termId: number) => {
  const ancestors: typeof termParents = []
  let parent = terms.find((term) => term.term_id === termId)?.parent
  while (parent) {
    const term = terms.find((candidate) => candidate.term_id === parent)
    if (!term) break
    ancestors.push(term)
    parent = term.parent
  }
  return ancestors
}

const geoDepth = (termId: number) => termAncestors(geoTerms, termId).length

const escHtml = (text: string) =>
  text
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const pageGeoLevel = (post: Post, deepestGeoId: number | null) => {
  const acfValue = (metaByPost.get(post.ID)?.get('geo_type') ?? '').trim().toLowerCase()
  const acfLevel = GEO_LEVELS.includes(acfValue) ? acfValue : GEO_LEVELS.find((level) => acfValue.includes(level))
  if (acfLevel) return acfLevel
  return deepestGeoId ? (GEO_LEVEL_BY_DEPTH[geoDepth(deepestGeoId)] ?? 'city') : null
}

const detectPageType = (lineage: string[], geoLevel: string | null) => {
  if (lineage.includes('blog')) return 'blog'
  if (lineage.includes('national-rehab')) return 'national'
  if (!lineage.includes('geo')) return 'homepage'
  if (geoLevel === 'region') return 'state'
  return geoLevel === 'state' || geoLevel === 'county' || geoLevel === 'city' ? geoLevel : 'homepage'
}

const buildInterlinking = (post: Post): Interlinking => {
  const meta = metaByPost.get(post.ID)
  const terms = termsByPost.get(post.ID) ?? []
  const slugsOf = (taxonomy: string) => terms.filter((term) => term.taxonomy === taxonomy).map((term) => term.slug)
  const geoIds = terms.filter((term) => term.taxonomy === 'geo').map((term) => term.term_id)
  const deepestGeoId = geoIds.reduce<number | null>(
    (deepest, id) => (deepest === null || geoDepth(id) > geoDepth(deepest) ? id : deepest),
    null,
  )
  const templateIds = terms.filter((term) => term.taxonomy === 'template').map((term) => term.term_id)
  const templateLineage = [
    ...new Set([
      ...slugsOf('template'),
      ...templateIds.flatMap((id) => termAncestors(templateTerms, id).map((term) => term.slug)),
    ]),
  ]
  const geoLevel = pageGeoLevel(post, deepestGeoId)
  const h1 = (meta?.get('h1') ?? '').replaceAll('[acf field=geo]', meta?.get('geo') ?? '')

  return {
    link: permalinkOf(post),
    title: escHtml(h1) || escHtml(renderTitle(post.post_title)),
    excluded: /ppc/i.test(post.post_title) || slugsOf('category').includes('redirected'),
    isBlog: slugsOf('template').includes('blog'),
    pageType: detectPageType(templateLineage, geoLevel),
    topics: slugsOf('topic'),
    intents: slugsOf('intent'),
    geoIds,
    deepestGeoId,
    geoLevel,
    templateLineage,
  }
}

const buildSeo = (post: Post) => {
  const meta = metaByPost.get(post.ID) ?? new Map<string, string>()
  const rawTitle = meta.get('rank_math_title') || wptexturize(post.post_title)
  const robots = maybeUnserialize(meta.get('rank_math_robots') ?? null)
  const seo = {
    title: rawTitle.replace(/%[a-z_]+(\([^)]*\))?%/gi, ''),
    description: meta.get('rank_math_description') ?? '',
    canonical: meta.get('rank_math_canonical_url') || permalinkOf(post),
    robots: robots && typeof robots === 'object' ? Object.values(robots).join(', ') : 'index, follow',
  }
  return Object.fromEntries(Object.entries(seo).map(([key, value]) => [key, normalizeValue(value)]))
}

const buildMeta = (post: Post) => ({
  slug: post.post_name,
  parent: postsById.get(post.post_parent)?.post_name ?? '',
  updatedAt: `${post.post_modified_gmt.replace(' ', 'T')}+00:00`,
  createdAt: post.post_date.slice(0, 10),
})

const readPresentCache = async () => {
  try {
    return JSON.parse(await readFile(PRESENT_CACHE, 'utf8')) as Record<string, string[]>
  } catch {
    return {}
  }
}

const present = await readPresentCache()
const missing = publishedIds.filter((id) => !present[id])
console.info(`present: ${missing.length} of ${publishedIds.length} posts to snapshot from ${home}`)
for (let index = 0; index < missing.length; index += PRESENT_CONCURRENCY) {
  await Promise.all(
    missing.slice(index, index + PRESENT_CONCURRENCY).map(async (id) => {
      try {
        const response = await fetch(`${home}/wp-json/builder/v1/page-data?id=${id}&present=1`, {
          signal: AbortSignal.timeout(PRESENT_TIMEOUT_MS),
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        present[id] = ((await response.json()) as { present: string[] }).present
      } catch (error) {
        console.warn(`present: skipped ${id} (${error instanceof Error ? error.message : error}), rerun to retry`)
      }
    }),
  )
  if (index % 50 === 0) {
    await mkdir(path.dirname(PRESENT_CACHE), { recursive: true })
    await writeFile(PRESENT_CACHE, JSON.stringify(present))
  }
}
await mkdir(path.dirname(PRESENT_CACHE), { recursive: true })
await writeFile(PRESENT_CACHE, JSON.stringify(present))

const payload = await getPayload({ config })
let created = 0
let updated = 0

for (const post of [...published, ...draftPages]) {
  const templates = buildTemplates(post)
  const data = {
    wpId: post.ID,
    postType: post.post_type,
    status: post.post_status,
    path: pathOf(post),
    isFrontPage: post.ID === frontPageId,
    slug: post.post_name,
    parentWpId: post.post_parent,
    parentSlug: postsById.get(post.post_parent)?.post_name ?? '',
    postDate: post.post_date,
    title: post.post_title || post.post_name,
    template: templates.slugs[0] ?? '',
    templates,
    fields: buildFields(post),
    seo: buildSeo(post),
    meta: buildMeta(post),
    present: present[post.ID] ?? [],
    interlinking: buildInterlinking(post),
  }

  const { docs } = await payload.find({ collection: 'pages', where: { wpId: { equals: post.ID } }, limit: 1 })
  if (docs[0]) {
    await payload.update({ collection: 'pages', id: docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'pages', data })
    created++
  }
}

console.info(
  `imported ${published.length} posts + ${draftPages.length} draft pages: ${created} created, ${updated} updated`,
)

for (const [position, group] of fieldGroups.entries()) {
  const data = {
    key: group.post_name,
    title: group.post_title,
    position,
    fields: groupFields
      .filter((field) => field.post_parent === group.ID)
      .map((field) => ({
        key: field.post_name,
        name: field.post_excerpt,
        type: acfFields.get(field.post_name)?.type,
        label: field.post_title,
      })),
  }

  const { docs } = await payload.find({ collection: 'field-groups', where: { key: { equals: data.key } }, limit: 1 })
  if (docs[0]) await payload.update({ collection: 'field-groups', id: docs[0].id, data })
  else await payload.create({ collection: 'field-groups', data })
}
console.info(`imported ${fieldGroups.length} field groups`)

for (const term of geoTerms) {
  const data = { wpId: term.term_id, slug: term.slug, parent: term.parent }
  const { docs } = await payload.find({ collection: 'geo-terms', where: { wpId: { equals: term.term_id } }, limit: 1 })
  if (docs[0]) await payload.update({ collection: 'geo-terms', id: docs[0].id, data })
  else await payload.create({ collection: 'geo-terms', data })
}
console.info(`imported ${geoTerms.length} geo terms`)

const interlinkingRules = await query<{
  id: number
  page_type: string
  name: string
  priority: number
  status: string
  conditions: string | null
}>('select id, page_type, name, priority, status, conditions from wp_rril_rules')
for (const rule of interlinkingRules) {
  const data = {
    wpId: rule.id,
    pageType: rule.page_type,
    name: rule.name,
    priority: rule.priority,
    status: rule.status,
    conditions: JSON.parse(rule.conditions ?? '{}'),
  }
  const { docs } = await payload.find({ collection: 'interlinking-rules', where: { wpId: { equals: rule.id } }, limit: 1 })
  if (docs[0]) await payload.update({ collection: 'interlinking-rules', id: docs[0].id, data })
  else await payload.create({ collection: 'interlinking-rules', data })
}
console.info(`imported ${interlinkingRules.length} interlinking rules`)

const loadMenuTree = async () => {
  try {
    return JSON.parse(await readFile(MENU_CACHE, 'utf8')) as unknown[]
  } catch {
    const response = await fetch(`${home}/wp-json/builder/v1/menu?location=${MENU_LOCATION}`, {
      signal: AbortSignal.timeout(PRESENT_TIMEOUT_MS),
    })
    if (!response.ok) throw new Error(`menu snapshot failed: ${response.status}`)
    const tree = (await response.json()) as unknown[]
    await mkdir(path.dirname(MENU_CACHE), { recursive: true })
    await writeFile(MENU_CACHE, JSON.stringify(tree))
    return tree
  }
}
const menuData = { location: MENU_LOCATION, tree: await loadMenuTree() }
const { docs: menuDocs } = await payload.find({ collection: 'menus', where: { location: { equals: MENU_LOCATION } }, limit: 1 })
if (menuDocs[0]) await payload.update({ collection: 'menus', id: menuDocs[0].id, data: menuData })
else await payload.create({ collection: 'menus', data: menuData })
console.info(`imported menu ${MENU_LOCATION}`)
await db.end()
process.exit(0)
