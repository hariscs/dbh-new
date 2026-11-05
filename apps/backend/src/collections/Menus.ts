import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'location',
  },
  fields: [
    { name: 'location', type: 'text', required: true, unique: true, index: true },
    { name: 'tree', type: 'json', required: true },
  ],
}
