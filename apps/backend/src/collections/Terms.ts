import type { CollectionConfig } from 'payload'

import { allow, hiddenUnless, loggedIn } from '../access'
import { clearInterlinkingCache } from '../builder-api/interlinking'
import { rederiveTermPages } from '../content/cascade'
import { TAXONOMIES } from '../admin/labels'

export const Terms: CollectionConfig = {
  slug: 'terms',
  labels: { singular: 'Category / tag', plural: 'Categories & Tags' },
  admin: {
    hidden: hiddenUnless('terms'),
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'taxonomy', 'slug', 'parent'],
    listSearchableFields: ['name', 'slug'],
  },
  access: { ...allow('terms'), read: loggedIn },
  hooks: {
    afterChange: [clearInterlinkingCache, rederiveTermPages],
    afterDelete: [clearInterlinkingCache],
  },
  fields: [
    { name: 'wpId', label: 'WordPress ID', type: 'number', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
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
      admin: {
        description: 'Renaming or moving a term updates every page that uses it',
        components: { Field: { path: '/admin/WpIdSelect#WpIdSelect', clientProps: { collection: 'terms' } } },
      },
    },
    { name: 'usedBy', type: 'ui', admin: { components: { Field: '/admin/TermPages#TermPages' } } },
  ],
}
