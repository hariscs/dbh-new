import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
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
import { Roles } from './collections/Roles'
import { ActivityLog } from './collections/ActivityLog'
import { Redirects } from './collections/Redirects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SMTP_PORT = 587
const FROM_NAME = 'DBH CMS'

const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.EMAIL_FROM ?? '',
      defaultFromName: FROM_NAME,
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? SMTP_PORT),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  email,
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
  collections: [Pages, Media, Terms, GlobalVariables, Menus, SheetImports, FieldGroups, InterlinkingRules, Redirects, Users, Roles, ActivityLog],
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
