import type { CollectionConfig } from 'payload'

import { allow } from '../access'
import { logChange, logDelete } from '../content/activity'
import { clearInterlinkingCache } from '../builder-api/interlinking'

const PAGE_TYPES = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'national', label: 'National pages' },
  { value: 'state', label: 'State pages' },
  { value: 'county', label: 'County pages' },
  { value: 'city', label: 'City pages' },
  { value: 'blog', label: 'Blog posts' },
]
const RULE_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export const InterlinkingRules: CollectionConfig = {
  slug: 'interlinking-rules',
  admin: {
    group: 'Developer',
    description: 'Rules that pick the related-page links shown at the bottom of pages (RR Interlinking plugin)',
    useAsTitle: 'name',
    defaultColumns: ['name', 'pageType', 'priority', 'status'],
  },
  defaultSort: ['pageType', 'priority'],
  access: allow('interlinking-rules'),
  hooks: {
    afterChange: [clearInterlinkingCache, logChange],
    afterDelete: [clearInterlinkingCache, logDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'pageType',
      label: 'Show links on',
      type: 'text',
      required: true,
      index: true,
      admin: {
        components: {
          Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: PAGE_TYPES } },
          Cell: { path: '/admin/LabelCell#LabelCell', clientProps: { options: PAGE_TYPES } },
        },
      },
    },
    {
      name: 'conditions',
      type: 'json',
      admin: { components: { Field: '/admin/RuleConditionsForm#RuleConditionsForm' } },
    },
    {
      name: 'priority',
      type: 'number',
      required: true,
      index: true,
      admin: { position: 'sidebar', description: 'Rules for the same page type run from lowest to highest' },
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      defaultValue: 'active',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Inactive rules add no links',
        components: {
          Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: RULE_STATUSES } },
          Cell: { path: '/admin/LabelCell#LabelCell', clientProps: { options: RULE_STATUSES } },
        },
      },
    },
    {
      name: 'wpId',
      label: 'WordPress ID',
      type: 'number',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
  ],
}
