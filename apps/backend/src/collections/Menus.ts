import type { CollectionConfig } from 'payload'

import { allow } from '../access'
import { revalidateLayout } from '../content/revalidate'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    group: 'Settings',
    description: 'Site navigation. Open a menu to add, edit, reorder or delete its items',
    useAsTitle: 'location',
    defaultColumns: ['location', 'updatedAt'],
  },
  access: allow('menus'),
  hooks: {
    afterChange: [revalidateLayout],
  },
  fields: [
    { name: 'location', type: 'text', required: true, unique: true, index: true },
    { name: 'tree', type: 'json', required: true, admin: { components: { Field: '/admin/MenuEditor#MenuEditor' } } },
  ],
}
