import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'title', 'template', 'updatedAt'],
  },
  fields: [
    { name: 'path', type: 'text', required: true, unique: true, index: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'template', type: 'text' },
    { name: 'fields', type: 'json' },
    { name: 'seo', type: 'json' },
  ],
}
