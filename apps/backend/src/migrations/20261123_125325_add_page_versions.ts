import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_parent_wp_id" numeric DEFAULT 0,
  	"version_status" varchar DEFAULT 'publish' NOT NULL,
  	"version_fields" jsonb,
  	"version_seo" jsonb,
  	"version_term_ids" jsonb,
  	"version_reachable_by_path" boolean DEFAULT true,
  	"version_parent_slug" varchar DEFAULT '',
  	"version_template" varchar,
  	"version_templates" jsonb,
  	"version_meta" jsonb,
  	"version_field_taxonomies" jsonb,
  	"version_interlinking" jsonb,
  	"version_present" jsonb,
  	"version_path" varchar NOT NULL,
  	"version_post_type" varchar NOT NULL,
  	"version_is_front_page" boolean DEFAULT false,
  	"version_post_date" varchar,
  	"version_last_edited_by" varchar,
  	"version_wp_id" numeric NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "last_edited_by" varchar;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_parent_wp_id_idx" ON "_pages_v" USING btree ("version_parent_wp_id");
  CREATE INDEX "_pages_v_version_version_status_idx" ON "_pages_v" USING btree ("version_status");
  CREATE INDEX "_pages_v_version_version_reachable_by_path_idx" ON "_pages_v" USING btree ("version_reachable_by_path");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_post_type_idx" ON "_pages_v" USING btree ("version_post_type");
  CREATE INDEX "_pages_v_version_version_is_front_page_idx" ON "_pages_v" USING btree ("version_is_front_page");
  CREATE INDEX "_pages_v_version_version_post_date_idx" ON "_pages_v" USING btree ("version_post_date");
  CREATE INDEX "_pages_v_version_version_wp_id_idx" ON "_pages_v" USING btree ("version_wp_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "_pages_v" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "last_edited_by";`)
}
