import type { CollectionConfig } from 'payload'

export const GlobalVariables: CollectionConfig = {
  slug: 'global-variables',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'value'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true, index: true },
    { name: 'value', type: 'text' },
  ],
}
