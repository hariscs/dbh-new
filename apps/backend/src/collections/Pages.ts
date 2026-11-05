import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'title', 'postType', 'template', 'updatedAt'],
  },
  fields: [
    { name: 'wpId', type: 'number', required: true, unique: true, index: true },
    { name: 'postType', type: 'text', required: true, index: true },
    { name: 'status', type: 'text', required: true, defaultValue: 'publish', index: true },
    { name: 'path', type: 'text', required: true, index: true },
    { name: 'isFrontPage', type: 'checkbox', defaultValue: false, index: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'parentWpId', type: 'number', defaultValue: 0, index: true },
    { name: 'parentSlug', type: 'text', defaultValue: '' },
    { name: 'postDate', type: 'text', index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'template', type: 'text' },
    { name: 'templates', type: 'json' },
    { name: 'fields', type: 'json' },
    { name: 'seo', type: 'json' },
    { name: 'meta', type: 'json' },
    { name: 'present', type: 'json' },
    { name: 'interlinking', type: 'json' },
  ],
}
