import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  INSERT INTO "roles" ("name", "full_access", "permissions", "can_publish", "own_pages_only") VALUES
    ('Contributor', false, '{"pages":["read","create","update"],"media":["read","create"]}', false, true),
    ('SEO Manager', false, '{"pages":["read","update"],"media":["read"],"terms":["read"],"redirects":["read","create","update","delete"],"interlinking-rules":["read","update"]}', false, false),
    ('Viewer', false, '{"pages":["read"],"media":["read"],"terms":["read"],"menus":["read"],"global-variables":["read"],"redirects":["read"],"field-groups":["read"],"interlinking-rules":["read"]}', false, false)
  ON CONFLICT ("name") DO NOTHING;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DELETE FROM "roles" WHERE "name" IN ('Contributor', 'SEO Manager', 'Viewer');`)
}
