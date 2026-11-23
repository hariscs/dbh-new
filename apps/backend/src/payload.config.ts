import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Terms } from './collections/Terms'
import { FieldGroups } from './collections/FieldGroups'
import { InterlinkingRules } from './collections/InterlinkingRules'
import { Menus } from './collections/Menus'
import { GlobalVariables } from './collections/GlobalVariables'
import { SheetImports } from './collections/SheetImports'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: { titleSuffix: ' - DBH CMS' },
    components: {
      graphics: { Logo: '/admin/Branding#Logo', Icon: '/admin/Branding#Icon' },
      beforeNavLinks: ['/admin/PostTypeLinks#PostTypeLinks'],
      beforeDashboard: ['/admin/Dashboard#Dashboard'],
    },
  },
  collections: [Pages, Media, Terms, GlobalVariables, Menus, SheetImports, FieldGroups, InterlinkingRules, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
  }),
  sharp,
  plugins: [],
})
