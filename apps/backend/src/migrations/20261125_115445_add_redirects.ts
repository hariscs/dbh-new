import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_redirects_status" AS ENUM('301', '302');
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"status" "enum_redirects_status" DEFAULT '301' NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "redirects_id" integer;
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");`)

  await db.execute(sql`
  INSERT INTO "redirects" ("from", "to", "status", "enabled") VALUES
    ('/location-served/usa/adderall/', '/location-served/usa/adderall/how-long-in-your-system/', '301', true),
    ('/location-served/usa/alcohol/', '/location-served/usa/alcohol/how-long-in-your-system/', '301', true),
    ('/location-served/usa/dxm/', '/location-served/usa/alcohol/how-long-in-your-system/', '301', true),
    ('/location-served/usa/lsd/', '/location-served/usa/lsd/ingredients', '301', true),
    ('/location-served/usa/poppers/', '/location-served/usa/poppers/risks/', '301', true),
    ('/location-served/usa/dopamine/', '/location-served/usa/dopamine/benefits-&-working/', '301', false),
    ('/location-served/usa/ativan-lorazepam/', '/location-served/usa/ativan-lorazepam/how-long-in-your-system/', '301', true),
    ('/location-served/usa/vs/', '/location-served/usa/vs/dextroamphetamine-vs-adderall', '301', true),
    ('/location-served/usa/magic-mushrooms/', '/location-served/usa/magic-mushrooms/chocolate-bar-risks-dangers', '301', true),
    ('/location-served/usa/e-341-round-pill/', '/location-served/usa/e-341-round-pill/risks-&-warnings/', '301', false),
    ('/location-served/usa/mixing/', '/location-served/usa/mixing/risks-of-mixing-seroquel-and-alcohol', '301', true),
    ('/location-served/usa/e-404-orange-pill/', '/location-served/usa/e-404-orange-pill/uses-&-risks', '301', true),
    ('/location-served/usa/zoloft/', '/location-served/usa/zoloft/how-long-in-your-system', '301', true),
    ('/location-served/usa/lisdexamfetamine-vyvanse/', '/location-served/usa/lisdexamfetamine-vyvanse/uses-&-risks', '301', false),
    ('/location-served/usa/diphenhydramine-benadryl/', '/location-served/usa/diphenhydramine-benadryl/how-long-in-your-system', '301', true),
    ('/review-us/', 'https://g.page/r/CVhKyIaqnHCQEBM/review', '301', true);
  UPDATE "roles" SET "permissions" = "permissions" || '{"redirects":["read","create","update","delete"]}'::jsonb
  WHERE "name" = 'Editor';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "redirects" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_redirects_fk";
  
  DROP INDEX "payload_locked_documents_rels_redirects_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "redirects_id";
  DROP TYPE "public"."enum_redirects_status";`)
}
