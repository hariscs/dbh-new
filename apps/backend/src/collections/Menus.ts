import type { CollectionConfig } from 'payload'

import { revalidateLayout } from '../content/revalidate'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    group: 'Settings',
    description: 'Snapshot of the WordPress menu. Edit the menu JSON only if you know the structure',
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
