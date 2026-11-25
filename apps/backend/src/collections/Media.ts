import path from 'node:path'

import type { CollectionConfig } from 'payload'

import { allow, hiddenUnless } from '../access'
import { logChange, logDelete } from '../content/activity'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hidden: hiddenUnless('media'),
    group: 'Content',
    description: 'Images uploaded in the CMS. They are served from /wp-content/uploads/cms/ like WordPress uploads',
  },
  access: { ...allow('media'), read: () => true },
  hooks: { afterChange: [logChange], afterDelete: [logDelete] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.join(process.env.UPLOADS_DIR ?? 'media', 'cms'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
  },
}
