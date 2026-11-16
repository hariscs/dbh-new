import { parse } from 'csv-parse/sync'
import type { PayloadRequest } from 'payload'
import { unserialize } from 'php-serialize'

import { decodeEntities, formatDate, formatWysiwyg, wpautop, wptexturize } from './wp-text'

const TAXONOMY_COLUMNS: Record<string, string> = {
  template_taxonomy: 'template',
  geo_taxonomy: 'geo',
  topic_1_taxonomy: 'topic',
  topic_2_taxonomy: 'topic-2',
  intent_taxonomy: 'intent',
  marketing_channel_taxonomy: 'marketing-channel',
}
const HIERARCHICAL_TAXONOMY = 'template'
const HIERARCHY_DELIMITER = '>'
const PAGE_COLUMNS = ['id', 'title', 'slug', 'parent']
const SEO_COLUMNS = ['rank_math_title', 'rank_math_description', 'rank_math_robots']
const UNSUPPORTED_FIELD_TYPES = ['gallery', 'repeater', 'relationship', 'post_object', 'link']
const DEFAULT_ROBOTS = 'index, follow'
const DEFAULT_DATE_FORMAT = 'd/m/Y'
const HEADER_LINES = 1

type Field = { name: string; type?: string; returnFormat?: string; newLines?: string; displayFormat?: string }
type Term = { wpId: number; taxonomy: string; slug: string; name: string; parent: number }
type Fields = Record<string, string>
type TermIds = Record<string, number[]>
type SheetPage = {
  id?: number
  wpId: number
  postType: string
  status: string
  path: string
  slug: string
  parentWpId: number
  title: string
  templateIds: number[]
  fields: Fields
  termIds: TermIds
  seo: Fields
  present: string[]
  fieldTaxonomies: string[]
}

export type SheetReport = {
  rows: number
  created: { row: number; id: number; path: string; presentFrom: number | null }[]
  updated: { row: number; id: number; path: string }[]
  skipped: { row: number; reason: string }[]
  unknownColumns: string[]
  unsupportedColumns: string[]
  termsCreated: { taxonomy: string; name: string; slug: string }[]
}

const sanitizeTitle = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]*>/g, '')
    .toLowerCase()
    .replace(/&.+?;/g, '')
    .replace(/\./g, '-')
    .replace(/[^a-z0-9 _-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const escapeTermName = (name: string) => name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const seoTitleOf = (raw: string) =>
  decodeEntities(
    raw
      .replace(/%[a-z_]+(\([^)]*\))?%/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/ {2,}/g, ' '),
  )

const robotsOf = (cell: string) => {
  try {
    const robots = unserialize(cell.trim(), {}, { strict: false })
    return robots && typeof robots === 'object' ? Object.values(robots).join(', ') : DEFAULT_ROBOTS
  } catch {
    return DEFAULT_ROBOTS
  }
}

const formatCell = (field: Field, value: string, globals: Map<string, string>) => {
  switch (field.type) {
    case 'true_false':
      return Number(value) ? 'true' : 'false'
    case 'image':
      return value.trim() || 'false'
    case 'wysiwyg':
      return value ? decodeEntities(formatWysiwyg(value, globals)) : value
    case 'textarea':
      if (!value) return value
      if (field.newLines === 'wpautop') return decodeEntities(wpautop(value))
      return decodeEntities(field.newLines === 'br' ? value.replace(/\r?\n/g, '<br />\n') : value)
    case 'date_picker':
      return value ? formatDate(value, field.displayFormat ?? DEFAULT_DATE_FORMAT) : value
    default:
      return decodeEntities(value)
  }
}

const sameIds = (a: number[], b: number[]) => [...a].sort().join(',') === [...b].sort().join(',')

export const importSheet = async ({ req, csv, dryRun }: { req: PayloadRequest; csv: string; dryRun: boolean }) => {
  const { payload } = req
  const rows = parse(csv, { columns: true, bom: true, skip_empty_lines: true, relax_column_count: true, relax_quotes: true }) as Record<
    string,
    string
  >[]

  const { docs: groups } = await payload.find({
    collection: 'field-groups',
    sort: 'position',
    depth: 0,
    pagination: false,
    req,
  })
  const fieldsByName = new Map<string, Field>()
  for (const group of groups) {
    for (const field of (group.fields ?? []) as Field[]) if (!fieldsByName.has(field.name)) fieldsByName.set(field.name, field)
  }

  const { docs: termDocs } = await payload.find({ collection: 'terms', depth: 0, pagination: false, req })
  const terms: Term[] = termDocs.map(({ wpId, taxonomy, slug, name, parent }) => ({ wpId, taxonomy, slug, name, parent }))

  const { docs: globalDocs } = await payload.find({ collection: 'global-variables', depth: 0, pagination: false, req })
  const globals = new Map(globalDocs.map((variable) => [variable.name, variable.value ?? '']))

  const { docs: pageDocs } = await payload.find({ collection: 'pages', depth: 0, pagination: false, req })
  const pages: SheetPage[] = pageDocs.map((page) => ({
    id: page.id,
    wpId: page.wpId,
    postType: page.postType,
    status: page.status,
    path: page.path,
    slug: page.slug,
    parentWpId: page.parentWpId ?? 0,
    title: page.title,
    templateIds: ((page.templates as { ids?: number[] } | null)?.ids ?? []),
    fields: (page.fields ?? {}) as Fields,
    termIds: (page.termIds ?? {}) as TermIds,
    seo: (page.seo ?? {}) as Fields,
    present: (page.present ?? []) as string[],
    fieldTaxonomies: (page.fieldTaxonomies ?? []) as string[],
  }))

  let nextPageId = Math.max(0, ...pages.map((page) => page.wpId)) + 1
  let nextTermId = Math.max(0, ...terms.map((term) => term.wpId)) + 1

  const columns = Object.keys(rows[0] ?? {}).filter((column) => column.trim())
  const isReserved = (column: string) =>
    PAGE_COLUMNS.includes(column) || SEO_COLUMNS.includes(column) || column in TAXONOMY_COLUMNS
  const isUnsupported = (column: string) => UNSUPPORTED_FIELD_TYPES.includes(fieldsByName.get(column)?.type ?? '')
  const fieldColumns = columns.filter((column) => !isReserved(column) && fieldsByName.has(column) && !isUnsupported(column))

  const report: SheetReport = {
    rows: rows.length,
    created: [],
    updated: [],
    skipped: [],
    unknownColumns: columns.filter((column) => !isReserved(column) && !fieldsByName.has(column)),
    unsupportedColumns: columns.filter((column) => !isReserved(column) && isUnsupported(column)),
    termsCreated: [],
  }

  const pendingTerms: Term[] = []
  const uniqueTermSlug = (taxonomy: string, name: string, parent: number) => {
    const base = sanitizeTitle(name)
    const taken = (slug: string) => terms.some((term) => term.taxonomy === taxonomy && term.slug === slug)
    if (!taken(base)) return base
    const parentSlug = terms.find((term) => term.wpId === parent)?.slug
    if (parentSlug && !taken(`${base}-${parentSlug}`)) return `${base}-${parentSlug}`
    let suffix = 2
    while (taken(`${base}-${suffix}`)) suffix++
    return `${base}-${suffix}`
  }
  const ensureTerm = (taxonomy: string, name: string, parent?: number) => {
    const existing = terms.find(
      (term) =>
        term.taxonomy === taxonomy &&
        decodeEntities(term.name).toLowerCase() === name.toLowerCase() &&
        (parent === undefined || term.parent === parent),
    )
    if (existing) return existing
    const encoded = escapeTermName(name)
    const term = {
      wpId: nextTermId++,
      taxonomy,
      slug: uniqueTermSlug(taxonomy, encoded, parent ?? 0),
      name: encoded,
      parent: parent ?? 0,
    }
    terms.push(term)
    pendingTerms.push(term)
    report.termsCreated.push({ taxonomy, name, slug: term.slug })
    return term
  }
  const termIdsFor = (taxonomy: string, cell: string) => {
    if (taxonomy !== HIERARCHICAL_TAXONOMY) return [ensureTerm(taxonomy, cell).wpId]
    const ids: number[] = []
    let parent = 0
    for (const name of cell.split(HIERARCHY_DELIMITER).map((part) => part.trim()).filter(Boolean)) {
      const term = ensureTerm(taxonomy, name, parent)
      ids.push(term.wpId)
      parent = term.wpId
    }
    return ids
  }

  const uniquePageSlug = (base: string, parentWpId: number, ownWpId?: number) => {
    const taken = (slug: string) =>
      pages.some(
        (page) =>
          page.postType === 'page' && page.parentWpId === parentWpId && page.slug === slug && page.wpId !== ownWpId,
      )
    if (!taken(base)) return base
    let suffix = 2
    while (taken(`${base}-${suffix}`)) suffix++
    return `${base}-${suffix}`
  }

  for (const [index, row] of rows.entries()) {
    const line = index + HEADER_LINES + 1
    const skip = (reason: string) => report.skipped.push({ row: line, reason })
    const idCell = row.id?.trim() ?? ''
    const title = row.title?.trim() ?? ''

    if (!idCell && !title) {
      skip('no id or title')
      continue
    }
    if (idCell && !/^\d+$/.test(idCell)) {
      skip(`id "${idCell}" is not a number`)
      continue
    }
    const existing = idCell ? pages.find((page) => page.wpId === Number(idCell)) : undefined
    if (idCell && !existing) {
      skip(`page ${idCell} not found`)
      continue
    }

    const parentCell = row.parent?.trim() ?? ''
    if (parentCell && !/^\d+$/.test(parentCell)) {
      skip(`parent "${parentCell}" is not a page id`)
      continue
    }
    if (parentCell && parentCell !== '0' && !pages.some((page) => page.wpId === Number(parentCell))) {
      skip(`parent ${parentCell} not found`)
      continue
    }
    const parentWpId = parentCell ? Number(parentCell) : (existing?.parentWpId ?? 0)

    const slugCell = sanitizeTitle(row.slug?.trim() ?? '')
    const baseSlug = slugCell || existing?.slug || sanitizeTitle(title)
    if (!baseSlug) {
      skip('no slug')
      continue
    }
    const moved = !existing || baseSlug !== existing.slug || parentWpId !== existing.parentWpId
    const slug = moved ? uniquePageSlug(baseSlug, parentWpId, existing?.wpId) : baseSlug
    const parentPage = pages.find((page) => page.wpId === parentWpId)
    const path = moved ? `${parentPage ? parentPage.path.replace(/\/$/, '') : ''}/${slug}` : (existing?.path ?? '')
    const pageTitle = title || existing?.title || slug

    const fields: Fields = { ...existing?.fields }
    for (const column of fieldColumns) {
      const value = formatCell(fieldsByName.get(column) as Field, row[column] ?? '', globals)
      if (fieldsByName.get(column)?.type === 'image' && fields[column] !== value) delete fields[`${column}___alt`]
      fields[column] = value
    }

    const termIds: TermIds = { ...existing?.termIds }
    for (const [column, taxonomy] of Object.entries(TAXONOMY_COLUMNS)) {
      const cell = row[column]?.trim()
      if (cell) termIds[taxonomy] = termIdsFor(taxonomy, cell)
    }

    const seo: Fields = { ...existing?.seo }
    if ('rank_math_title' in row || !existing) {
      seo.title = seoTitleOf(row.rank_math_title?.trim() || wptexturize(pageTitle))
    }
    if ('rank_math_description' in row || !existing) seo.description = decodeEntities(row.rank_math_description ?? '')
    if ('rank_math_robots' in row || !existing) seo.robots = robotsOf(row.rank_math_robots ?? '')

    if (!dryRun) {
      for (const term of pendingTerms.splice(0)) {
        await payload.create({ collection: 'terms', data: term, req })
      }
    }

    const data = { title: pageTitle, slug, parentWpId, fields, termIds, seo }

    if (existing) {
      if (!dryRun) {
        await payload.update({
          collection: 'pages',
          id: existing.id as number,
          data,
          depth: 0,
          req,
          context: { sheetImport: true },
        })
      }
      Object.assign(existing, data, { path, templateIds: termIds.template ?? existing.templateIds })
      report.updated.push({ row: line, id: existing.wpId, path })
      continue
    }

    const templateIds = termIds.template ?? []
    const source = pages
      .filter((page) => page.status === 'publish' && page.present.length && sameIds(page.templateIds, templateIds))
      .sort((a, b) => Number(b.parentWpId === parentWpId) - Number(a.parentWpId === parentWpId))[0]
    const fieldTaxonomies =
      source?.fieldTaxonomies ?? pages.find((page) => page.postType === 'page')?.fieldTaxonomies ?? []
    const page: SheetPage = {
      ...data,
      wpId: nextPageId++,
      postType: 'page',
      status: 'publish',
      path,
      templateIds,
      present: source?.present ?? [],
      fieldTaxonomies,
    }
    if (!dryRun) {
      const created = await payload.create({
        collection: 'pages',
        data: {
          ...data,
          wpId: page.wpId,
          postType: page.postType,
          status: page.status,
          path,
          postDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
          present: page.present,
          fieldTaxonomies,
        },
        depth: 0,
        req,
        context: { sheetImport: true },
      })
      page.id = created.id
    }
    pages.push(page)
    report.created.push({ row: line, id: page.wpId, path, presentFrom: source?.wpId ?? null })
  }

  return report
}
