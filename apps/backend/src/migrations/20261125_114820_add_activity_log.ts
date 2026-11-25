import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_activity_log_action" AS ENUM('created', 'updated', 'deleted');
  CREATE TABLE "activity_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user" varchar,
  	"action" "enum_activity_log_action",
  	"section" varchar,
  	"record_id" varchar,
  	"title" varchar,
  	"changes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "activity_log_id" integer;
  CREATE INDEX "activity_log_user_idx" ON "activity_log" USING btree ("user");
  CREATE INDEX "activity_log_action_idx" ON "activity_log" USING btree ("action");
  CREATE INDEX "activity_log_section_idx" ON "activity_log" USING btree ("section");
  CREATE INDEX "activity_log_record_id_idx" ON "activity_log" USING btree ("record_id");
  CREATE INDEX "activity_log_updated_at_idx" ON "activity_log" USING btree ("updated_at");
  CREATE INDEX "activity_log_created_at_idx" ON "activity_log" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_log_fk" FOREIGN KEY ("activity_log_id") REFERENCES "public"."activity_log"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_activity_log_id_idx" ON "payload_locked_documents_rels" USING btree ("activity_log_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "activity_log" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "activity_log" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_activity_log_fk";
  
  DROP INDEX "payload_locked_documents_rels_activity_log_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "activity_log_id";
  DROP TYPE "public"."enum_activity_log_action";`)
}
