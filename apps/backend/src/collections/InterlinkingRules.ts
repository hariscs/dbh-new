import type { CollectionConfig } from 'payload'

export const InterlinkingRules: CollectionConfig = {
  slug: 'interlinking-rules',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'pageType', 'priority', 'status'],
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
