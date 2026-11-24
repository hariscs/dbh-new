import type { CollectionConfig } from 'payload'

import { allow } from '../access'
import { revalidateLayout } from '../content/revalidate'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    group: 'Settings',
    description: 'Snapshot of the WordPress menu. Edit the menu JSON only if you know the structure',
    useAsTitle: 'location',
  },
  access: allow('menus'),
  hooks: {
    afterChange: [revalidateLayout],
  },
  fields: [
    { name: 'location', type: 'text', required: true, unique: true, index: true },
    { name: 'tree', type: 'json', required: true },
  ],
}
