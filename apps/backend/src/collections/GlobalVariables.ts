import type { CollectionConfig } from 'payload'

import { allow } from '../access'

export const GlobalVariables: CollectionConfig = {
  slug: 'global-variables',
  labels: { singular: 'Site variable', plural: 'Site Variables' },
  admin: {
    group: 'Settings',
    description: 'Values used across the site, e.g. [nav_glbl_var] placeholders in page content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'value'],
  },
  access: allow('global-variables'),
  fields: [
    { name: 'name', type: 'text', required: true, unique: true, index: true },
    { name: 'value', type: 'text' },
  ],
}
