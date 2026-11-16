import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, CollectionConfig } from 'payload'

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
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'summary', 'createdAt'],
  },
  hooks: {
    beforeChange: [runImport],
    afterChange: [refreshSite],
  },
  upload: {
    mimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
  },
  fields: [
    { name: 'dryRun', type: 'checkbox', defaultValue: true },
    { name: 'summary', type: 'text', admin: { readOnly: true } },
    { name: 'report', type: 'json', admin: { readOnly: true } },
  ],
}
