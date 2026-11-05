import type { CollectionConfig } from 'payload'

export const Terms: CollectionConfig = {
  slug: 'terms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'taxonomy', 'slug', 'parent'],
  },
  fields: [
    { name: 'wpId', type: 'number', required: true, unique: true, index: true },
    { name: 'taxonomy', type: 'text', required: true, index: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'parent', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}
