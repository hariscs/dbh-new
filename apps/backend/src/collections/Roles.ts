import type { CollectionConfig } from 'payload'

import { allow, hiddenUnless, loggedIn } from '../access'
import { logChange, logDelete } from '../content/activity'
import { POST_TYPES } from '../admin/labels'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    hidden: hiddenUnless('roles'),
    group: 'Users',
    description: 'What each role can see and change. A user with several roles gets everything their roles allow',
    useAsTitle: 'name',
    defaultColumns: ['name', 'fullAccess', 'canPublish', 'ownPagesOnly'],
  },
  access: { ...allow('roles'), read: loggedIn },
  hooks: { afterChange: [logChange], afterDelete: [logDelete] },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    {
      name: 'fullAccess',
      label: 'Full access (administrator)',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Can do everything. The settings below are ignored' },
    },
    { name: 'permissions', type: 'json', admin: { components: { Field: '/admin/PermissionsGrid#PermissionsGrid' } } },
    {
      name: 'canPublish',
      label: 'Can publish pages',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Without this, new pages can only be saved as drafts' },
    },
    {
      name: 'ownPagesOnly',
      label: 'Only their own pages',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'See and edit only the pages they created' },
    },
    {
      name: 'postTypes',
      label: 'Post types allowed',
      type: 'select',
      hasMany: true,
      options: POST_TYPES.map(({ value, label }) => ({ value, label })),
      admin: { description: 'Leave empty for all post types' },
    },
  ],
}
