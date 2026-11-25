import type { CollectionConfig } from 'payload'

import { can, hiddenUnless } from '../access'

const ACTIONS = ['created', 'updated', 'deleted']

export const ActivityLog: CollectionConfig = {
  slug: 'activity-log',
  labels: { singular: 'Activity', plural: 'Activity log' },
  defaultSort: '-createdAt',
  admin: {
    hidden: hiddenUnless('activity-log'),
    group: 'Users',
    description: 'Who created, changed or deleted what, and when. Written automatically, read only',
    useAsTitle: 'title',
    defaultColumns: ['createdAt', 'user', 'action', 'section', 'title', 'changes'],
    listSearchableFields: ['title', 'user', 'section'],
  },
  access: {
    read: ({ req }) => can(req.user, 'activity-log', 'read'),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'user', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'action', type: 'select', options: ACTIONS, index: true, admin: { readOnly: true } },
    { name: 'section', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'recordId', label: 'Record ID', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'title', type: 'text', admin: { readOnly: true } },
    { name: 'changes', label: 'Changed fields', type: 'json', admin: { readOnly: true } },
  ],
}
