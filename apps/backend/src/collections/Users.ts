import type { Access, CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { can } from '../access'

const selfOr =
  (action: 'read' | 'update'): Access =>
  ({ req }) => {
    if (!req.user) return false
    return can(req.user, 'users', action) || { id: { equals: req.user.id } }
  }

const guardRoles: CollectionBeforeChangeHook = async ({ data, operation, originalDoc, req }) => {
  if (req.user && !can(req.user, 'users', operation === 'create' ? 'create' : 'update')) {
    return { ...data, roles: originalDoc?.roles ?? [] }
  }
  if (operation !== 'create' || data.roles?.length) return data
  const { totalDocs } = await req.payload.count({ collection: 'users', req })
  if (totalDocs) return data
  const { docs } = await req.payload.find({ collection: 'roles', where: { fullAccess: { equals: true } }, limit: 1, req })
  return { ...data, roles: docs.map((role) => role.id) }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Users',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
  },
  auth: { depth: 1 },
  access: {
    read: selfOr('read'),
    create: ({ req }) => can(req.user, 'users', 'create'),
    update: selfOr('update'),
    delete: ({ req }) => can(req.user, 'users', 'delete'),
  },
  hooks: { beforeChange: [guardRoles] },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'bio', type: 'textarea' },
    {
      name: 'roles',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      admin: { position: 'sidebar', description: 'Permissions add up across roles. Only users who can manage users can change this' },
    },
  ],
}
