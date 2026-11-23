import type { CollectionConfig } from 'payload'

import { clearInterlinkingCache } from '../builder-api/interlinking'

export const InterlinkingRules: CollectionConfig = {
  slug: 'interlinking-rules',
  admin: {
    group: 'Developer',
    description: 'Rules that pick the related-page links shown at the bottom of pages (RR Interlinking plugin)',
    useAsTitle: 'name',
    defaultColumns: ['name', 'pageType', 'priority', 'status'],
  },
  hooks: {
    afterChange: [clearInterlinkingCache],
    afterDelete: [clearInterlinkingCache],
  },
  fields: [
    { name: 'wpId', type: 'number', required: true, unique: true, index: true },
    { name: 'pageType', type: 'text', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'priority', type: 'number', required: true, index: true },
    { name: 'status', type: 'text', required: true, defaultValue: 'active', index: true },
    { name: 'conditions', type: 'json' },
  ],
}
