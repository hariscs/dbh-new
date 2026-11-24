import { type Access, APIError, type CollectionBeforeChangeHook, type Where } from 'payload'

import type { Role, User } from './payload-types'

export type Action = 'read' | 'create' | 'update' | 'delete'
type Permissions = Record<string, Action[]>

const FORBIDDEN = 403

type RoleHolder = Pick<User, 'roles'> | null | undefined

const rolesOf = (user: RoleHolder) =>
  (user?.roles ?? []).filter((role): role is Role => typeof role === 'object')

const grants = (role: Role, collection: string, action: Action) =>
  Boolean(role.fullAccess) || ((role.permissions as Permissions | null)?.[collection] ?? []).includes(action)

export const can = (user: RoleHolder, collection: string, action: Action) =>
  rolesOf(user).some((role) => grants(role, collection, action))

const check =
  (collection: string, action: Action): Access =>
  ({ req }) =>
    can(req.user, collection, action)

export const loggedIn: Access = ({ req }) => Boolean(req.user)

export const hiddenUnless =
  (collection: string) =>
  ({ user }: { user: unknown }) =>
    !can(user as RoleHolder, collection, 'read')

export const allow = (collection: string) => ({
  read: check(collection, 'read'),
  create: check(collection, 'create'),
  update: check(collection, 'update'),
  delete: check(collection, 'delete'),
})

const pageScope = (role: Role, userId: number): Where | null => {
  if (role.fullAccess) return null
  const conditions: Where[] = [
    ...(role.ownPagesOnly ? [{ createdBy: { equals: userId } }] : []),
    ...(role.postTypes?.length ? [{ postType: { in: role.postTypes } }] : []),
  ]
  return conditions.length ? { and: conditions } : null
}

const scopedPages =
  (action: Action): Access =>
  ({ req }) => {
    const user = req.user
    if (!user) return false
    const scopes = rolesOf(user)
      .filter((role) => grants(role, 'pages', action))
      .map((role) => pageScope(role, user.id))
    if (!scopes.length) return false
    if (scopes.some((scope) => !scope)) return true
    return { or: scopes.filter((scope): scope is Where => Boolean(scope)) }
  }

export const pageAccess = {
  read: scopedPages('read'),
  create: check('pages', 'create'),
  update: scopedPages('update'),
  delete: scopedPages('delete'),
}

export const canPublish = (user: RoleHolder) =>
  rolesOf(user).some((role) => role.fullAccess || role.canPublish)

export const guardPage: CollectionBeforeChangeHook = ({ data, operation, originalDoc, req, context }) => {
  if (!req.user || context.import) return data
  const roles = rolesOf(req.user).filter((role) => grants(role, 'pages', operation === 'create' ? 'create' : 'update'))
  const anyType = roles.some((role) => role.fullAccess || !role.postTypes?.length)
  if (!anyType && !roles.some((role) => role.postTypes?.includes(data.postType))) {
    throw new APIError(`Your role can't edit this post type`, FORBIDDEN, null, true)
  }
  if (data.status === 'publish' && originalDoc?.status !== 'publish' && !canPublish(req.user)) {
    throw new APIError(`Your role can't publish. Use Save draft and ask an editor to publish`, FORBIDDEN, null, true)
  }
  return data
}
