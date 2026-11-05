import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import { findInterlinking } from '../builder-api/interlinking'
import { findPageData } from '../builder-api/page-data'
import config from '../payload.config'

const MAX_VALUE_LENGTH = 200
const TOP_GROUPS = 40
const SAMPLES_PER_GROUP = 3

const baselineDir = process.env.PARITY_BASELINE_DIR
if (!baselineDir) throw new Error('PARITY_BASELINE_DIR is not set')
const inputDir = path.join(baselineDir, '..', 'baseline-all')

type Baseline = { kind: string; path: string; capturedAt: string; status: number; body: unknown }
type LinkItem = { link: string; title: string }
type Diff = { group: string; path: string; detail: string }

const canonical = (value: unknown): string =>
  JSON.stringify(value, (_, inner: unknown) =>
    inner && typeof inner === 'object' && !Array.isArray(inner)
      ? Object.fromEntries(Object.entries(inner).sort(([a], [b]) => a.localeCompare(b)))
      : inner,
  ) ?? 'undefined'

const shorten = (value: unknown) => {
  const text = JSON.stringify(value) ?? 'undefined'
  return text.length > MAX_VALUE_LENGTH ? `${text.slice(0, MAX_VALUE_LENGTH)}…` : text
}

const asRecord = (value: unknown) =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {}

const loadBaselines = async (kind: string) => {
  const directory = path.join(inputDir, kind)
  const files = await readdir(directory)
  return Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(directory, file), 'utf8')) as Baseline),
  )
}

const diffPageData = (baseline: Baseline, actual: unknown): Diff[] => {
  const expected = asRecord(baseline.body)
  const got = asRecord(actual)
  const { fields: expectedFields, ...expectedTop } = expected
  const { fields: actualFields, ...actualTop } = got
  const diffs: Diff[] = []

  for (const key of new Set([...Object.keys(expectedTop), ...Object.keys(actualTop)])) {
    if (canonical(expectedTop[key]) === canonical(actualTop[key])) continue
    diffs.push({
      group: `page-data ${key}`,
      path: baseline.path,
      detail: `expected ${shorten(expectedTop[key])} actual ${shorten(actualTop[key])}`,
    })
  }

  const wantFields = asRecord(expectedFields)
  const gotFields = asRecord(actualFields)
  for (const key of new Set([...Object.keys(wantFields), ...Object.keys(gotFields)])) {
    if (canonical(wantFields[key]) === canonical(gotFields[key])) continue
    diffs.push({
      group: `page-data fields.${key}`,
      path: baseline.path,
      detail: `expected ${shorten(wantFields[key])} actual ${shorten(gotFields[key])}`,
    })
  }
  return diffs
}

const diffInterlinking = (baseline: Baseline, actual: unknown): Diff[] => {
  const expected = asRecord(baseline.body)
  const got = asRecord(actual)
  const diffs: Diff[] = []

  for (const list of ['main_pages', 'blog_pages']) {
    const want = (expected[list] ?? []) as LinkItem[]
    const have = (got[list] ?? []) as LinkItem[]
    const wantLinks = want.map((item) => item.link)
    const haveLinks = have.map((item) => item.link)
    const missing = wantLinks.filter((link) => !haveLinks.includes(link))
    const extra = haveLinks.filter((link) => !wantLinks.includes(link))
    const titleDiff = want.find((item) =>
      have.some((other) => other.link === item.link && other.title !== item.title),
    )

    if (missing.length || extra.length) {
      diffs.push({
        group: `rril ${list} membership`,
        path: baseline.path,
        detail: `missing ${shorten(missing)} extra ${shorten(extra)}`,
      })
    } else if (canonical(wantLinks) !== canonical(haveLinks)) {
      const index = wantLinks.findIndex((link, position) => link !== haveLinks[position])
      diffs.push({
        group: `rril ${list} order`,
        path: baseline.path,
        detail: `first difference at [${index}]: expected ${wantLinks[index]} actual ${haveLinks[index]}`,
      })
    }
    if (titleDiff) {
      diffs.push({ group: `rril ${list} title`, path: baseline.path, detail: `expected ${shorten(titleDiff)}` })
    }
  }
  return diffs
}

const statusDiff = (baseline: Baseline, actual: unknown): Diff[] =>
  (baseline.status === 200) === (actual !== undefined)
    ? []
    : [
        {
          group: `${baseline.kind} found vs not found`,
          path: baseline.path,
          detail: `prod status ${baseline.status}, backend ${actual === undefined ? 'not found' : 'found'}`,
        },
      ]

const payload = await getPayload({ config })
const allDiffs: Diff[] = []
const counts = { 'page-data': { clean: 0, total: 0 }, rril: { clean: 0, total: 0 } }

for (const baseline of await loadBaselines('page-data')) {
  const actual = await findPageData(payload, { path: baseline.path, present: true })
  const diffs = statusDiff(baseline, actual)
  if (!diffs.length && baseline.status === 200) diffs.push(...diffPageData(baseline, actual))
  counts['page-data'].total++
  if (!diffs.length) counts['page-data'].clean++
  allDiffs.push(...diffs)
}

for (const baseline of await loadBaselines('rril')) {
  const actual = await findInterlinking(payload, baseline.path, new Date(baseline.capturedAt))
  const diffs = statusDiff(baseline, actual)
  if (!diffs.length && baseline.status === 200) diffs.push(...diffInterlinking(baseline, actual))
  counts.rril.total++
  if (!diffs.length) counts.rril.clean++
  allDiffs.push(...diffs)
}

const groups = new Map<string, Diff[]>()
for (const diff of allDiffs) groups.set(diff.group, [...(groups.get(diff.group) ?? []), diff])
const ranked = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)

console.info(`page-data: ${counts['page-data'].clean}/${counts['page-data'].total} clean`)
console.info(`rril: ${counts.rril.clean}/${counts.rril.total} clean`)
for (const [group, diffs] of ranked.slice(0, TOP_GROUPS)) {
  console.info(`\n${diffs.length}× ${group}`)
  for (const diff of diffs.slice(0, SAMPLES_PER_GROUP)) console.info(`  ${diff.path}: ${diff.detail}`)
}
if (ranked.length > TOP_GROUPS) console.info(`\n…and ${ranked.length - TOP_GROUPS} more groups`)

const reportFile = path.join(inputDir, '_report.json')
await writeFile(reportFile, JSON.stringify({ counts, diffs: allDiffs }, null, 2))
console.info(`\nfull report: ${reportFile}`)
process.exit(allDiffs.length ? 1 : 0)
