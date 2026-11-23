import type { CollectionConfig } from 'payload'

import { POST_TYPES, STATUSES } from '../admin/labels'
import { clearInterlinkingCache } from '../builder-api/interlinking'
import { moveChildren } from '../content/cascade'
import { derivePage } from '../content/derive'
import { revalidatePage } from '../content/revalidate'

const derived = { readOnly: true } as const

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'All content' },
  defaultSort: '-postDate',
  admin: {
    group: 'Content',
    useAsTitle: 'path',
    defaultColumns: ['title', 'path', 'status', 'postType', 'template', 'postDate'],
    listSearchableFields: ['title', 'path', 'slug'],
    components: { beforeListTable: ['/admin/StatusTabs#StatusTabs'] },
    preview: (doc) => {
      const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, '')
      if (!frontendUrl || doc.status !== 'publish') return null
      return doc.isFrontPage ? `${frontendUrl}/` : `${frontendUrl}${doc.path}/`
    },
  },
  hooks: {
    beforeChange: [derivePage],
    afterChange: [clearInterlinkingCache, revalidatePage, moveChildren],
    afterDelete: [clearInterlinkingCache],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Shown in the admin and used for the browser title when no meta title is set' } },
    { name: 'slug', type: 'text', required: true, index: true, admin: { description: 'Last part of the URL, e.g. "adhd" in /location-served/usa/ca/adhd' } },
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
        description: 'Drafts are never shown on the site',
        components: {
          Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: STATUSES } },
          Cell: { path: '/admin/LabelCell#LabelCell', clientProps: { options: STATUSES } },
        },
      },
    },
    { name: 'fields', type: 'json', admin: { components: { Field: '/admin/PageFieldsForm#PageFieldsForm' } } },
    { name: 'seo', type: 'json', admin: { components: { Field: '/admin/SeoForm#SeoForm' } } },
    {
      name: 'termIds',
      label: 'Categories & tags',
      type: 'json',
      admin: { components: { Field: '/admin/TermsPicker#TermsPicker' } },
    },
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
    { name: 'postDate', label: 'Published date', type: 'text', index: true, admin: { position: 'sidebar' } },
    {
      name: 'wpId',
      label: 'WordPress ID',
      type: 'number',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Original WordPress post ID, kept for links and imports' },
    },
  ],
}
