import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { allow } from '../access'
import { revalidateSite } from '../content/revalidate'
import { importSheet, type SheetReport } from '../import/sheet'

const summaryOf = (report: SheetReport, dryRun: boolean) =>
  `${dryRun ? 'Dry run: ' : ''}${report.created.length} created, ${report.updated.length} updated, ` +
  `${report.skipped.length} skipped, ${report.termsCreated.length} terms created`

const runImport: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data
  if (!req.file) throw new Error('Upload a CSV file')
  const dryRun = data.dryRun !== false
  const report = await importSheet({ req, csv: req.file.data.toString('utf8'), dryRun })
  return { ...data, dryRun, summary: summaryOf(report, dryRun), report }
}

const refreshSite: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create' && !doc.dryRun) await revalidateSite(req)
  return doc
}

export const SheetImports: CollectionConfig = {
  slug: 'sheet-imports',
  labels: { singular: 'Sheet import', plural: 'Import from Sheet' },
  admin: {
    group: 'Settings',
    description: 'Upload a Google Sheet CSV to create or update pages, like WP All Import. Rows match pages by WordPress ID',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'summary', 'createdAt'],
  },
  access: allow('sheet-imports'),
  hooks: {
    beforeChange: [runImport],
    afterChange: [refreshSite],
  },
  upload: {
    mimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
  },
  fields: [
    {
      name: 'dryRun',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Ticked: only shows what would change. Untick to apply the changes' },
    },
    { name: 'summary', type: 'text', admin: { readOnly: true } },
    { name: 'report', type: 'json', admin: { readOnly: true } },
  ],
}
