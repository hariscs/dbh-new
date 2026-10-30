import type { CollectionConfig } from 'payload'

export const FieldGroups: CollectionConfig = {
  slug: 'field-groups',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'key', 'position'],
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'position', type: 'number', required: true, index: true },
    { name: 'fields', type: 'json' },
  ],
}
