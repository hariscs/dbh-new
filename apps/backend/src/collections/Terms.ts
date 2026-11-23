import type { CollectionConfig } from 'payload'

import { clearInterlinkingCache } from '../builder-api/interlinking'
import { rederiveTermPages } from '../content/cascade'

const TAXONOMIES = ['geo', 'template', 'topic', 'topic-2', 'intent', 'marketing-channel', 'category', 'business-unit', 'facility-type', 'newsroom-category']

export const Terms: CollectionConfig = {
  slug: 'terms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'taxonomy', 'slug', 'parent'],
    listSearchableFields: ['name', 'slug'],
  },
  hooks: {
    afterChange: [clearInterlinkingCache, rederiveTermPages],
    afterDelete: [clearInterlinkingCache],
  },
  fields: [
    { name: 'wpId', type: 'number', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'taxonomy',
      type: 'text',
      required: true,
      index: true,
      admin: { components: { Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: TAXONOMIES } } } },
    },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    {
      name: 'parent',
      type: 'number',
      required: true,
      defaultValue: 0,
      index: true,
      admin: { components: { Field: { path: '/admin/WpIdSelect#WpIdSelect', clientProps: { collection: 'terms' } } } },
    },
    { name: 'usedBy', type: 'ui', admin: { components: { Field: '/admin/TermPages#TermPages' } } },
  ],
}
