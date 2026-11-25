import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  INSERT INTO "menus" ("location", "tree") VALUES (
    'footer',
    '[{"id":1,"title":"Privacy Policy","url":"/privacy-policy/","target":"","parent":0,"depth":0,"classes":[],"children":[]},{"id":2,"title":"Terms of Service","url":"/terms-of-service/","target":"","parent":0,"depth":0,"classes":[],"children":[]}]'
  )
  ON CONFLICT ("location") DO NOTHING;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DELETE FROM "menus" WHERE "location" = 'footer';`)
}
