import type { CollectionBeforeChangeHook, CollectionConfig, JSONFieldValidation } from 'payload'

import { guardPage, pageAccess } from '../access'
import { logChange, logDelete } from '../content/activity'
import { type FieldDefinition, POST_TYPES, STATUSES } from '../admin/labels'
import { clearInterlinkingCache } from '../builder-api/interlinking'
import { moveChildren } from '../content/cascade'
import { derivePage } from '../content/derive'
import { previewUrl } from '../content/preview'
import { revalidatePage } from '../content/revalidate'

const derived = { readOnly: true } as const
const IMPORT_EDITOR = 'WordPress import'
const SYSTEM_EDITOR = 'System'

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_FORMAT = /^(https?:\/\/|\/|#|mailto:|tel:)/
const EMPTY_VALUE = 'false'

type Rule = { param: string; operator: string; value: string }

const appliesTo = (location: unknown, postType: string) =>
  ((location ?? []) as Rule[][]).some((rules) =>
    rules.some((rule) => rule.param === 'post_type' && (rule.operator === '==') === (rule.value === postType)),
  )

const problemOf = (field: FieldDefinition, value: string | undefined) => {
  const empty = !value || value === EMPTY_VALUE
  if (empty) return field.required ? `${field.label} is required` : null
  if (field.type === 'email' && !EMAIL_FORMAT.test(value)) return `${field.label} must be an email address`
  if (field.type === 'url' && !URL_FORMAT.test(value)) return `${field.label} must start with https://, / or #`
  return null
}

const validateFields: JSONFieldValidation = async (value, { req, data }) => {
  if (req.payloadAPI !== 'REST') return true
  const values = (value ?? {}) as Record<string, string>
  const { docs } = await req.payload.find({
    collection: 'field-groups',
    depth: 0,
    pagination: false,
    select: { fields: true, location: true },
    req,
  })
  const problems = docs
    .filter((group) => appliesTo(group.location, String(data?.postType ?? '')))
    .flatMap((group) => ((group.fields ?? []) as FieldDefinition[]).map((field) => problemOf(field, values[field.name])))
    .filter(Boolean)
  return problems.length ? problems.join('. ') : true
}

const stampEditor: CollectionBeforeChangeHook = ({ data, req, context, operation }) => ({
  ...data,
  ...(operation === 'create' && req.user ? { createdBy: req.user.id } : {}),
  lastEditedBy: context.import ? IMPORT_EDITOR : (req.user?.email ?? SYSTEM_EDITOR),
})

const fillPostDate: CollectionBeforeChangeHook = ({ data, originalDoc }) => ({
  ...data,
  postDate: data.postDate || originalDoc?.postDate || new Date().toISOString().slice(0, 19).replace('T', ' '),
})

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'All content' },
  defaultSort: '-postDate',
  versions: { maxPerDoc: 10 },
  admin: {
    group: 'Content',
    useAsTitle: 'path',
    defaultColumns: ['title', 'path', 'status', 'postType', 'template', 'postDate'],
    listSearchableFields: ['title', 'path', 'slug'],
    components: {
      beforeListTable: ['/admin/StatusTabs#StatusTabs'],
      edit: { SaveButton: '/admin/PublishButtons#PublishButtons' },
    },
    preview: (doc) => {
      const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, '')
      const path = doc.isFrontPage ? '/' : `${doc.path}/`
      if (!frontendUrl) return null
      if (doc.status === 'publish') return `${frontendUrl}${path}`
      const secret = process.env.PREVIEW_SECRET
      return secret ? previewUrl(frontendUrl, path, secret) : null
    },
  },
  access: pageAccess,
  hooks: {
    beforeChange: [guardPage, stampEditor, fillPostDate, derivePage],
    afterChange: [clearInterlinkingCache, revalidatePage, moveChildren, logChange],
    afterDelete: [clearInterlinkingCache, logDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Shown in the admin and used for the browser title when no meta title is set' } },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Last part of the URL, e.g. "adhd" in /location-served/usa/ca/adhd. Filled from the title on new pages',
        components: { Field: '/admin/SlugInput#SlugInput' },
      },
    },
    {
      name: 'parentWpId',
      label: 'Parent page',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        description: 'The URL is built from the parent path plus the slug. Child pages move with their parent',
        components: { Field: { path: '/admin/WpIdSelect#WpIdSelect', clientProps: { collection: 'pages' } } },
      },
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      defaultValue: 'publish',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Drafts are never shown on the site',
        components: {
          Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: STATUSES } },
          Cell: { path: '/admin/LabelCell#LabelCell', clientProps: { options: STATUSES } },
        },
      },
    },
    { name: 'fields', label: 'Page fields', type: 'json', validate: validateFields, admin: { components: { Field: '/admin/PageFieldsForm#PageFieldsForm' } } },
    { name: 'seo', type: 'json', admin: { components: { Field: '/admin/SeoForm#SeoForm' } } },
    { name: 'childPages', type: 'ui', admin: { components: { Field: '/admin/ChildPages#ChildPages' } } },
    {
      type: 'collapsible',
      label: 'Technical details (read only)',
      admin: { initCollapsed: true, description: 'Worked out automatically when you save. No need to edit' },
      fields: [
        { name: 'reachableByPath', type: 'checkbox', defaultValue: true, index: true, admin: derived },
        { name: 'parentSlug', type: 'text', defaultValue: '', admin: derived },
        { name: 'template', type: 'text', admin: derived },
        { name: 'templates', type: 'json', admin: derived },
        { name: 'meta', type: 'json', admin: derived },
        { name: 'fieldTaxonomies', type: 'json', admin: derived },
        { name: 'interlinking', type: 'json', admin: derived },
        { name: 'present', label: 'Visible sections', type: 'json', admin: derived },
      ],
    },
    {
      name: 'path',
      label: 'URL path',
      type: 'text',
      required: true,
      index: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Built from parent and slug on save' },
    },
    {
      name: 'postType',
      label: 'Post type',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: POST_TYPES } },
          Cell: { path: '/admin/LabelCell#LabelCell', clientProps: { options: POST_TYPES } },
        },
      },
    },
    { name: 'isFrontPage', label: 'Homepage', type: 'checkbox', defaultValue: false, index: true, admin: { position: 'sidebar' } },
    {
      name: 'postDate',
      label: 'Published date',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Set to now on first save when left empty',
        components: { Field: '/admin/PostDateInput#PostDateInput' },
      },
    },
    {
      name: 'createdBy',
      label: 'Created by',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true, description: 'Roles limited to their own pages only see pages they created' },
    },
    {
      name: 'lastEditedBy',
      label: 'Last edited by',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'See every saved version in the Versions tab' },
    },
    {
      name: 'wpId',
      label: 'WordPress ID',
      type: 'number',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Original WordPress post ID, kept for links and imports' },
    },
    {
      name: 'termIds',
      label: 'Categories & tags',
      type: 'json',
      admin: { position: 'sidebar', components: { Field: '/admin/TermsPicker#TermsPicker' } },
    },
  ],
}
