import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../payload.config'

const PROD_ORIGIN = 'https://cms.districtbehavioralhealth.com'
const CONCURRENCY = 2
const TIMEOUT_MS = 120_000
const MAX_CONSECUTIVE_FAILURES = 10
const PROGRESS_EVERY = 50

const baselineDir = process.env.PARITY_BASELINE_DIR
if (!baselineDir) throw new Error('PARITY_BASELINE_DIR is not set')
const outputDir = path.join(baselineDir, '..', 'baseline-all')

type Job = { kind: 'page-data' | 'rril'; pagePath: string; url: string; file: string }

const fileExists = (file: string) =>
  access(file).then(
    () => true,
    () => false,
  )

const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'pages',
  where: { status: { equals: 'publish' } },
  depth: 0,
  pagination: false,
  select: { path: true, postType: true },
})

const bareOf = (stored: string) => stored.replace(/^\/+|\/+$/g, '')
const nameOf = (bare: string) => `${bare.replace(/\//g, '_')}.json`
const allPaths = [...new Set(docs.map((doc) => bareOf(doc.path)))]
const pagePaths = [...new Set(docs.filter((doc) => doc.postType === 'page').map((doc) => bareOf(doc.path)))]

const allJobs: Job[] = [
  ...allPaths.map((pagePath) => ({
    kind: 'page-data' as const,
    pagePath,
    url: `${PROD_ORIGIN}/wp-json/builder/v1/page-data?path=${encodeURIComponent(pagePath)}&present=1`,
    file: path.join(outputDir, 'page-data', nameOf(pagePath)),
  })),
  ...pagePaths.map((pagePath) => ({
    kind: 'rril' as const,
    pagePath,
    url: `${PROD_ORIGIN}/wp-json/rril/v1/interlinking/${pagePath.split('/').map(encodeURIComponent).join('/')}`,
    file: path.join(outputDir, 'rril', nameOf(pagePath)),
  })),
]

await mkdir(path.join(outputDir, 'page-data'), { recursive: true })
await mkdir(path.join(outputDir, 'rril'), { recursive: true })

const exists = await Promise.all(allJobs.map((job) => fileExists(job.file)))
const jobs = allJobs.filter((_, index) => !exists[index])
console.info(`${allJobs.length} requests total, ${jobs.length} still to capture into ${outputDir}`)

const startedAt = Date.now()
let nextIndex = 0
let done = 0
let saved = 0
let failed = 0
let consecutiveFailures = 0
let aborted = false

const capture = async (job: Job) => {
  const response = await fetch(job.url, {
    headers: { 'User-Agent': 'dbh-parity-capture' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (response.status >= 500) throw new Error(`status ${response.status}`)
  const body: unknown = JSON.parse(await response.text())
  await writeFile(
    job.file,
    JSON.stringify({
      kind: job.kind,
      path: job.pagePath,
      capturedAt: new Date().toISOString(),
      status: response.status,
      body,
    }),
  )
}

const worker = async () => {
  while (nextIndex < jobs.length && !aborted) {
    const job = jobs[nextIndex++]
    try {
      await capture(job)
      saved++
      consecutiveFailures = 0
    } catch (error) {
      failed++
      consecutiveFailures++
      console.warn(`failed ${job.kind} ${job.pagePath}: ${error instanceof Error ? error.message : error}`)
      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) aborted = true
    }
    done++
    if (done % PROGRESS_EVERY === 0) {
      const perMinute = done / ((Date.now() - startedAt) / 60_000)
      const minutesLeft = Math.round((jobs.length - done) / perMinute)
      console.info(`${done}/${jobs.length}, ${perMinute.toFixed(1)} per min, about ${minutesLeft} min left, ${failed} failed`)
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))

if (aborted) console.error(`stopped after ${MAX_CONSECUTIVE_FAILURES} consecutive failures, rerun to resume`)
console.info(`saved ${saved}, failed ${failed}${failed ? ', rerun to retry the failed ones' : ''}`)
process.exit(aborted || failed ? 1 : 0)
