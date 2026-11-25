import type { CollectionConfig, TextFieldSingleValidation } from 'payload'

import { allow, hiddenUnless } from '../access'
import { logChange, logDelete } from '../content/activity'

const STATUSES = [
  { value: '301', label: '301 Permanent' },
  { value: '302', label: '302 Temporary' },
]

const startsWithSlash: TextFieldSingleValidation = (value) =>
  value?.startsWith('/') ? true : 'Start with / (a path on this site), e.g. /old-page/'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    hidden: hiddenUnless('redirects'),
    group: 'Settings',
    description: 'Send visitors from an old URL to a new one, like Rank Math redirections. Changes apply within a minute',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'status', 'enabled'],
    listSearchableFields: ['from', 'to'],
  },
  access: allow('redirects'),
  hooks: { afterChange: [logChange], afterDelete: [logDelete] },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: startsWithSlash,
      admin: { description: 'Old path on this site, e.g. /location-served/usa/adderall/' },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: { description: 'New path (/new-page/) or a full URL (https://…)' },
    },
    { name: 'status', label: 'Type', type: 'select', options: STATUSES, defaultValue: '301', required: true },
    { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Untick to pause the redirect without deleting it' } },
  ],
}
