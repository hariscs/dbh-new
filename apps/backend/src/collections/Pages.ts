import type { CollectionConfig } from 'payload'

import { clearInterlinkingCache } from '../builder-api/interlinking'
import { moveChildren } from '../content/cascade'
import { derivePage } from '../content/derive'
import { revalidatePage } from '../content/revalidate'

const POST_TYPES = ['page', 'post', 'authors', 'facility', 'newsroom', 'difference', 'testimonials', 'external_post']

const derived = { readOnly: true, position: 'sidebar', description: 'Set automatically on save' } as const

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'title', 'postType', 'template', 'status', 'updatedAt'],
    listSearchableFields: ['title', 'path', 'slug'],
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
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    {
      name: 'parentWpId',
      label: 'Parent page',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: { components: { Field: { path: '/admin/WpIdSelect#WpIdSelect', clientProps: { collection: 'pages' } } } },
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      defaultValue: 'publish',
      index: true,
      admin: { components: { Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: ['publish', 'draft'] } } } },
    },
    { name: 'fields', type: 'json' },
    { name: 'seo', type: 'json' },
    { name: 'present', type: 'json' },
    {
      name: 'termIds',
      label: 'Terms',
      type: 'json',
      admin: { components: { Field: '/admin/TermsPicker#TermsPicker' } },
    },
    { name: 'childPages', type: 'ui', admin: { components: { Field: '/admin/ChildPages#ChildPages' } } },
    { name: 'wpId', type: 'number', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'postType',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        components: { Field: { path: '/admin/TextSelect#TextSelect', clientProps: { options: POST_TYPES } } },
      },
    },
    { name: 'isFrontPage', type: 'checkbox', defaultValue: false, index: true, admin: { position: 'sidebar' } },
    { name: 'postDate', type: 'text', index: true, admin: { position: 'sidebar' } },
    { name: 'path', type: 'text', required: true, index: true, admin: derived },
    { name: 'reachableByPath', type: 'checkbox', defaultValue: true, index: true, admin: derived },
    { name: 'parentSlug', type: 'text', defaultValue: '', admin: derived },
    { name: 'template', type: 'text', admin: derived },
    { name: 'templates', type: 'json', admin: derived },
    { name: 'meta', type: 'json', admin: derived },
    { name: 'fieldTaxonomies', type: 'json', admin: derived },
    { name: 'interlinking', type: 'json', admin: derived },
  ],
}
