import { copyFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

import mysql, { type RowDataPacket } from 'mysql2/promise'
import { unserialize } from 'php-serialize'

import { UPLOAD_TYPES } from '../content/uploads'

const databaseUrl = process.env.WP_DATABASE_URL
const sourceDir = process.env.WP_UPLOADS_DIR
const targetDir = process.env.UPLOADS_DIR
if (!databaseUrl) throw new Error('WP_DATABASE_URL is not set')
if (!sourceDir) throw new Error('WP_UPLOADS_DIR is not set')
if (!targetDir) throw new Error('UPLOADS_DIR is not set')

const db = await mysql.createConnection({ uri: databaseUrl })
const [rows] = await db.query<RowDataPacket[]>(
  `select p.ID, f.meta_value file, m.meta_value metadata
   from wp_posts p
   join wp_postmeta f on f.post_id = p.ID and f.meta_key = '_wp_attached_file'
   left join wp_postmeta m on m.post_id = p.ID and m.meta_key = '_wp_attachment_metadata'
   where p.post_type = 'attachment'`,
)
await db.end()

const sizeFilesOf = (metadata: string | null) => {
  if (!metadata) return []
  try {
    const parsed = unserialize(metadata, {}, { strict: false }) as { sizes?: Record<string, { file?: string }> }
    return Object.values(parsed?.sizes ?? {}).flatMap((size) => (size.file ? [size.file] : []))
  } catch {
    return []
  }
}

const OPTIMIZER_SUFFIXES = ['-300', '-600', '-1200', '-1920', '-150x150']
const withoutExtension = (file: string) => file.slice(0, file.length - path.posix.extname(file).length)

const files = new Set<string>()
const optimizerVariants = new Set<string>()
for (const { file, metadata } of rows as { file: string; metadata: string | null }[]) {
  const sizeFiles = sizeFilesOf(metadata).map((sizeFile) => path.posix.join(path.posix.dirname(file), sizeFile))
  files.add(file)
  for (const sizeFile of sizeFiles) files.add(sizeFile)
  for (const each of [file, ...sizeFiles]) optimizerVariants.add(`${withoutExtension(each)}.webp`)
  for (const suffix of OPTIMIZER_SUFFIXES) optimizerVariants.add(`${withoutExtension(file)}${suffix}.webp`)
}
for (const file of files) optimizerVariants.delete(file)

const skippedTypes: string[] = []
const missing: string[] = []
let copied = 0
let variantsCopied = 0
for (const file of [...files, ...optimizerVariants]) {
  const isVariant = optimizerVariants.has(file)
  const normalized = path.posix.normalize(file)
  if (normalized.startsWith('..') || path.posix.isAbsolute(normalized) || !(path.extname(normalized).toLowerCase() in UPLOAD_TYPES)) {
    skippedTypes.push(file)
    continue
  }
  const source = path.join(sourceDir, normalized)
  if (!(await stat(source).catch(() => null))?.isFile()) {
    if (!isVariant) missing.push(file)
    continue
  }
  await mkdir(path.dirname(path.join(targetDir, normalized)), { recursive: true })
  await copyFile(source, path.join(targetDir, normalized))
  if (isVariant) variantsCopied++
  else copied++
}

console.info(`uploads: ${rows.length} attachments, ${files.size} files, ${copied} copied to ${targetDir}`)
console.info(`uploads: ${variantsCopied} image optimizer webp variants copied`)
console.info(`uploads: ${skippedTypes.length} skipped (type not served)${skippedTypes.length ? `: ${skippedTypes.join(', ')}` : ''}`)
console.info(`uploads: ${missing.length} missing on disk${missing.length ? `: ${missing.join(', ')}` : ''}`)
process.exit(0)
