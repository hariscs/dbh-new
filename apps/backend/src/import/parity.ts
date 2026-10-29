import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import { findPageData } from '../builder-api/page-data'
import config from '../payload.config'

const MAX_VALUE_LENGTH = 120

const baselineDir = process.env.PARITY_BASELINE_DIR
if (!baselineDir) throw new Error('PARITY_BASELINE_DIR is not set')

type PageData = Record<string, unknown> & { fields: Record<string, string> }

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
process.exit(cleanPages === paths.length ? 0 : 1)
