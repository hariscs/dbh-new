import type { CollectionConfig } from 'payload'

export const FieldGroups: CollectionConfig = {
  slug: 'field-groups',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'key', 'position'],
    listSearchableFields: ['title', 'key'],
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true, index: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    { name: 'appliesTo', type: 'ui', admin: { components: { Field: '/admin/FieldGroupRules#FieldGroupRules' } } },
    { name: 'position', type: 'number', required: true, index: true, admin: { position: 'sidebar' } },
    { name: 'fields', type: 'json' },
    { name: 'location', type: 'json', admin: { hidden: true } },
  ],
}
