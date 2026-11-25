import { randomUUID } from 'node:crypto'

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { allow, hiddenUnless, loggedIn } from '../access'
import { logChange, logDelete } from '../content/activity'

const KEY_LENGTH = 13

const fillKeyAndPosition: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data
  const key = data.key || `group_${randomUUID().replace(/-/g, '').slice(0, KEY_LENGTH)}`
  const position = data.position ?? (await req.payload.count({ collection: 'field-groups', req })).totalDocs
  return { ...data, key, position }
}

export const FieldGroups: CollectionConfig = {
  slug: 'field-groups',
  labels: { singular: 'Custom field group', plural: 'Custom Fields (ACF)' },
  admin: {
    hidden: hiddenUnless('field-groups'),
    group: 'Developer',
    description: 'Field groups like ACF. They decide which fields show on each page',
    useAsTitle: 'title',
    defaultColumns: ['title', 'key', 'position'],
    listSearchableFields: ['title', 'key'],
  },
  access: { ...allow('field-groups'), read: loggedIn },
  hooks: { beforeChange: [fillKeyAndPosition], afterChange: [logChange], afterDelete: [logDelete] },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar', description: 'Set automatically for new groups' },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'appliesTo', type: 'ui', admin: { components: { Field: '/admin/FieldGroupRules#FieldGroupRules' } } },
    { name: 'location', type: 'json', admin: { components: { Field: '/admin/LocationRulesForm#LocationRulesForm' } } },
    {
      name: 'position',
      type: 'number',
      required: true,
      index: true,
      admin: { position: 'sidebar', description: 'Order of the group on pages. Set automatically for new groups' },
    },
    { name: 'fields', type: 'json', admin: { components: { Field: '/admin/FieldBuilder#FieldBuilder' } } },
  ],
}
