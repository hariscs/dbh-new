import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, PayloadRequest } from 'payload'

const IGNORED_KEYS = [
  'id',
  'createdAt',
  'updatedAt',
  'lastEditedBy',
  'sessions',
  'loginAttempts',
  'lockUntil',
  'meta',
  'interlinking',
  'templates',
  'template',
  'fieldTaxonomies',
  'present',
  'reachableByPath',
  'parentSlug',
]

const titleOf = (collection: CollectionConfig, doc: Record<string, unknown>) =>
  String(doc[collection.admin?.useAsTitle ?? 'id'] ?? doc.title ?? doc.name ?? doc.id ?? '')

type Action = 'created' | 'updated' | 'deleted'

const record = (
  req: PayloadRequest,
  collection: CollectionConfig,
  doc: Record<string, unknown>,
  action: Action,
  changes: string[],
) =>
  req.payload.create({
    collection: 'activity-log',
    data: {
      user: req.user?.email ?? '',
      action,
      section: collection.slug,
      recordId: String(doc.id ?? ''),
      title: titleOf(collection, doc),
      changes,
    },
    req,
  })

export const logChange: CollectionAfterChangeHook = async ({ collection, doc, previousDoc, operation, req, context }) => {
  if (!req.user || context.import || context.sheetImport) return doc
  const changes =
    operation === 'update'
      ? Object.keys(doc).filter(
          (key) => !IGNORED_KEYS.includes(key) && JSON.stringify(doc[key]) !== JSON.stringify(previousDoc?.[key]),
        )
      : []
  if (operation === 'update' && !changes.length) return doc
  await record(req, collection, doc, operation === 'create' ? 'created' : 'updated', changes)
  return doc
}

export const logDelete: CollectionAfterDeleteHook = async ({ collection, doc, req, context }) => {
  if (!req.user || context.import) return doc
  await record(req, collection, doc, 'deleted', [])
  return doc
}
