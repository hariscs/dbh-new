import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  UPDATE "pages" SET "seo" = jsonb_set("seo", '{title}', to_jsonb(
    regexp_replace(regexp_replace("seo"->>'title', '\\|\\s*$', '| District Behavioral Health'), '^\\s*\\|\\s*', 'District Behavioral Health | ')
  ))
  WHERE "seo"->>'title' ~ '(^\\s*\\|)|(\\|\\s*$)';`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
