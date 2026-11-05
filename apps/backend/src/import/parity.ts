import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import { findDrugIndex } from '../builder-api/drug-index'
import { findInterlinking } from '../builder-api/interlinking'
import { findPageData } from '../builder-api/page-data'
import { listFieldGroups } from '../builder-api/field-groups'
import { findPages } from '../builder-api/pages'
import config from '../payload.config'

const MAX_VALUE_LENGTH = 120

const baselineDir = process.env.PARITY_BASELINE_DIR
if (!baselineDir) throw new Error('PARITY_BASELINE_DIR is not set')

type PageData = Record<string, unknown> & { fields: Record<string, string> }
type InterlinkItems = { link: string; title: string }[]

const shorten = (value: unknown) => {
  const text = JSON.stringify(value) ?? 'undefined'
  return text.length > MAX_VALUE_LENGTH ? `${text.slice(0, MAX_VALUE_LENGTH)}…` : text
}

const canonical = (value: unknown): string =>
  JSON.stringify(value, (_, inner: unknown) =>
    inner && typeof inner === 'object' && !Array.isArray(inner)
      ? Object.fromEntries(Object.entries(inner).sort(([a], [b]) => a.localeCompare(b)))
      : inner,
  )

const fileFor =(pagePath: string) => (pagePath === '/' ? 'home.json' : `${pagePath.replace(/\//g, '_')}.json`)

const DRUG_INDEX_QUERIES = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter) => ({ di: letter, file: letter })).concat({ di: '1', file: 'invalid' })

const RRIL_BASELINE_DATE = new Date('2026-11-05T12:00:00Z')
const RRIL_QUERIES = [
  'home',
  'location-served/usa/ca/adhd',
  'location-served/usa/ca/fountain-valley/adhd',
  'location-served/usa/ca/los-angeles/adhd',
  'location-served/usa/ca/northern/adhd',
  'location-served/usa/mood-disorder-treatment',
  'location-served/usa/prozac-addiction-treatment/addiction',
]

const PAGES_QUERIES = ['', '/location-served/usa/ca', '/quiz', '/location-served/usa/fl/lake-worth', '/does-not-exist']

const paths = (await readFile(path.join(baselineDir, '..', 'paths.txt'), 'utf8')).split('\n').filter(Boolean)
const payload = await getPayload({ config })

const fieldDiffCounts = new Map<string, number>()
let cleanPages = 0

for (const pagePath of paths) {
  const expected = JSON.parse(await readFile(path.join(baselineDir, fileFor(pagePath)), 'utf8')) as PageData
  const actual = (await findPageData(payload, { path: pagePath, present: true })) as PageData | undefined
  const differences: string[] = []

  if (!actual) {
    console.info(`\n✗ ${pagePath}: not found`)
    continue
  }

  for (const key of Object.keys(expected)) {
    if (key === 'fields') continue
    if (canonical(expected[key]) !== canonical(actual[key])) {
      differences.push(`  ${key}: expected ${shorten(expected[key])}\n  ${' '.repeat(key.length)}  actual   ${shorten(actual[key])}`)
    }
  }

  const fieldKeys = new Set([...Object.keys(expected.fields), ...Object.keys(actual.fields ?? {})])
  for (const key of fieldKeys) {
    const expectedValue = expected.fields[key]
    const actualValue = actual.fields?.[key]
    if (expectedValue === actualValue) continue
    fieldDiffCounts.set(key, (fieldDiffCounts.get(key) ?? 0) + 1)
    differences.push(`  fields.${key}: expected ${shorten(expectedValue)}\n    actual ${shorten(actualValue)}`)
  }

  if (!differences.length) {
    cleanPages++
    console.info(`✓ ${pagePath}`)
    continue
  }
  console.info(`\n✗ ${pagePath} (${differences.length} differences)\n${differences.join('\n')}`)
}

const topFields = [...fieldDiffCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)
console.info(`\n${cleanPages}/${paths.length} pages clean`)
if (topFields.length) console.info(`most frequent field differences:\n${topFields.map(([key, count]) => `  ${count}× ${key}`).join('\n')}`)

let endpointFailures = 0
for (const pagesPath of PAGES_QUERIES) {
  const label = pagesPath ? `pages?path=${pagesPath}` : 'pages'
  const baselineFile = path.join(baselineDir, `_pages${pagesPath.replace(/\//g, '_')}.json`)
  const expected = JSON.parse(await readFile(baselineFile, 'utf8')) as unknown[]
  const actual = await findPages(payload, { postType: 'page', path: pagesPath || undefined })
  const firstDifference = expected.findIndex((item, index) => canonical(item) !== canonical(actual[index]))

  if (firstDifference === -1 && expected.length === actual.length) {
    console.info(`✓ ${label}`)
    continue
  }
  endpointFailures++
  const index = firstDifference === -1 ? Math.min(expected.length, actual.length) : firstDifference
  console.info(
    `\n✗ ${label}: expected ${expected.length} items, actual ${actual.length}, first difference at [${index}]\n` +
      `  expected ${shorten(expected[index])}\n  actual   ${shorten(actual[index])}`,
  )
}

const expectedGroups = JSON.parse(await readFile(path.join(baselineDir, '_field-groups.json'), 'utf8')) as {
  groups: { key: string }[]
}
const actualGroups = await listFieldGroups(payload)
const differentGroups = expectedGroups.groups.filter(
  (group, index) => canonical(group) !== canonical(actualGroups.groups[index]),
)
if (!differentGroups.length && expectedGroups.groups.length === actualGroups.groups.length) {
  console.info('✓ field-groups')
} else {
  endpointFailures++
  console.info(
    `\n✗ field-groups: expected ${expectedGroups.groups.length} groups, actual ${actualGroups.groups.length}\n` +
      differentGroups.map((group) => `  differs at ${group.key}`).join('\n'),
  )
}

let drugIndexClean = 0
for (const { di, file } of DRUG_INDEX_QUERIES) {
  const expected = JSON.parse(await readFile(path.join(baselineDir, `_drug-index_${file}.json`), 'utf8')) as unknown
  const actual = await findDrugIndex(payload, di)
  if (canonical(expected) === canonical(actual)) {
    drugIndexClean++
    continue
  }
  endpointFailures++
  console.info(`\n✗ drug-index?di=${di}\n  expected ${JSON.stringify(expected)}\n  actual   ${JSON.stringify(actual)}`)
}
console.info(`${drugIndexClean}/${DRUG_INDEX_QUERIES.length} drug-index queries clean`)

let rrilClean = 0
for (const rrilPath of RRIL_QUERIES) {
  const file = `_rril_${rrilPath.replace(/\//g, '_')}.json`
  const expected = JSON.parse(await readFile(path.join(baselineDir, file), 'utf8')) as Record<string, InterlinkItems>
  const actual = ((await findInterlinking(payload, rrilPath, RRIL_BASELINE_DATE)) ?? {}) as Record<string, InterlinkItems>
  if (canonical(expected) === canonical(actual)) {
    rrilClean++
    console.info(`✓ rril ${rrilPath}`)
    continue
  }
  endpointFailures++
  console.info(`\n✗ rril ${rrilPath}`)
  for (const list of ['main_pages', 'blog_pages']) {
    const want = (expected[list] ?? []).map((item) => item.link)
    const got = (actual[list] ?? []).map((item) => item.link)
    const missing = want.filter((link) => !got.includes(link))
    const extra = got.filter((link) => !want.includes(link))
    const firstDifference = want.findIndex((link, index) => link !== got[index])
    const titles = (expected[list] ?? []).filter(
      (item) => (actual[list] ?? []).some((other) => other.link === item.link && other.title !== item.title),
    )
    console.info(
      `  ${list}: expected ${want.length}, actual ${got.length}, first order difference at [${firstDifference}]\n` +
        `    missing ${JSON.stringify(missing)}\n    extra   ${JSON.stringify(extra)}\n` +
        `    title differs ${shorten(titles)}`,
    )
  }
}
console.info(`${rrilClean}/${RRIL_QUERIES.length} rril queries clean`)

process.exit(cleanPages === paths.length && !endpointFailures ? 0 : 1)
