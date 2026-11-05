import type { CollectionConfig } from 'payload'

export const GeoTerms: CollectionConfig = {
  slug: 'geo-terms',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'wpId', 'parent'],
  },
  fields: [
    { name: 'wpId', type: 'number', required: true, unique: true, index: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'parent', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}
