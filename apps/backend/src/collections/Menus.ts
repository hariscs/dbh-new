import type { CollectionConfig } from 'payload'

import { revalidateLayout } from '../content/revalidate'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'location',
  },
  hooks: {
    afterChange: [revalidateLayout],
  },
  fields: [
    { name: 'location', type: 'text', required: true, unique: true, index: true },
    { name: 'tree', type: 'json', required: true },
  ],
}
