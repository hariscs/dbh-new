import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  WITH v AS (SELECT
    (SELECT "value" FROM "global_variables" WHERE "name" = 'years_in_business') AS years,
    (SELECT "value" FROM "global_variables" WHERE "name" = 'patients_helped') AS patients,
    (SELECT "value" FROM "global_variables" WHERE "name" = 'licenses_certifications') AS licenses,
    (SELECT "value" FROM "global_variables" WHERE "name" = 'review_rating') AS rating,
    (SELECT "value" FROM "global_variables" WHERE "name" = 'review_count') AS reviews)
  UPDATE "pages" SET "seo" = jsonb_set("seo", '{description}', to_jsonb(regexp_replace(
    "seo"->>'description',
    '^10\\+ years 14000\\+ Patients Treated / 50\\+ Licenses & Accreditations / 4\\.85 ⭐ Rating \\(750\\+\\)',
    v.years || ' Years / ' || v.patients || ' Patients Treated / ' || v.licenses || ' Licenses & Accreditations / ' || v.rating || ' ⭐ Rating (' || v.reviews || ')'
  )))
  FROM v
  WHERE "seo"->>'description' ~ '^10\\+ years 14000\\+ Patients Treated';`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
