import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"wp_id" numeric NOT NULL,
  	"post_type" varchar NOT NULL,
  	"status" varchar DEFAULT 'publish' NOT NULL,
  	"path" varchar NOT NULL,
  	"reachable_by_path" boolean DEFAULT true,
  	"is_front_page" boolean DEFAULT false,
  	"slug" varchar NOT NULL,
  	"parent_wp_id" numeric DEFAULT 0,
  	"parent_slug" varchar DEFAULT '',
  	"post_date" varchar,
  	"title" varchar NOT NULL,
  	"template" varchar,
  	"templates" jsonb,
  	"fields" jsonb,
  	"seo" jsonb,
  	"meta" jsonb,
  	"present" jsonb,
  	"term_ids" jsonb,
  	"field_taxonomies" jsonb,
  	"interlinking" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "field_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"position" numeric NOT NULL,
  	"fields" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "interlinking_rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"wp_id" numeric NOT NULL,
  	"page_type" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"priority" numeric NOT NULL,
  	"status" varchar DEFAULT 'active' NOT NULL,
  	"conditions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"wp_id" numeric NOT NULL,
  	"taxonomy" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"parent" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"location" varchar NOT NULL,
  	"tree" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "global_variables" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sheet_imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"dry_run" boolean DEFAULT true,
  	"summary" varchar,
  	"report" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"field_groups_id" integer,
  	"interlinking_rules_id" integer,
  	"terms_id" integer,
  	"menus_id" integer,
  	"global_variables_id" integer,
  	"sheet_imports_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_field_groups_fk" FOREIGN KEY ("field_groups_id") REFERENCES "public"."field_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_interlinking_rules_fk" FOREIGN KEY ("interlinking_rules_id") REFERENCES "public"."interlinking_rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terms_fk" FOREIGN KEY ("terms_id") REFERENCES "public"."terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_global_variables_fk" FOREIGN KEY ("global_variables_id") REFERENCES "public"."global_variables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sheet_imports_fk" FOREIGN KEY ("sheet_imports_id") REFERENCES "public"."sheet_imports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "pages_wp_id_idx" ON "pages" USING btree ("wp_id");
  CREATE INDEX "pages_post_type_idx" ON "pages" USING btree ("post_type");
  CREATE INDEX "pages_status_idx" ON "pages" USING btree ("status");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_reachable_by_path_idx" ON "pages" USING btree ("reachable_by_path");
  CREATE INDEX "pages_is_front_page_idx" ON "pages" USING btree ("is_front_page");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_parent_wp_id_idx" ON "pages" USING btree ("parent_wp_id");
  CREATE INDEX "pages_post_date_idx" ON "pages" USING btree ("post_date");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "field_groups_key_idx" ON "field_groups" USING btree ("key");
  CREATE INDEX "field_groups_position_idx" ON "field_groups" USING btree ("position");
  CREATE INDEX "field_groups_updated_at_idx" ON "field_groups" USING btree ("updated_at");
  CREATE INDEX "field_groups_created_at_idx" ON "field_groups" USING btree ("created_at");
  CREATE UNIQUE INDEX "interlinking_rules_wp_id_idx" ON "interlinking_rules" USING btree ("wp_id");
  CREATE INDEX "interlinking_rules_page_type_idx" ON "interlinking_rules" USING btree ("page_type");
  CREATE INDEX "interlinking_rules_priority_idx" ON "interlinking_rules" USING btree ("priority");
  CREATE INDEX "interlinking_rules_status_idx" ON "interlinking_rules" USING btree ("status");
  CREATE INDEX "interlinking_rules_updated_at_idx" ON "interlinking_rules" USING btree ("updated_at");
  CREATE INDEX "interlinking_rules_created_at_idx" ON "interlinking_rules" USING btree ("created_at");
  CREATE UNIQUE INDEX "terms_wp_id_idx" ON "terms" USING btree ("wp_id");
  CREATE INDEX "terms_taxonomy_idx" ON "terms" USING btree ("taxonomy");
  CREATE INDEX "terms_slug_idx" ON "terms" USING btree ("slug");
  CREATE INDEX "terms_parent_idx" ON "terms" USING btree ("parent");
  CREATE INDEX "terms_updated_at_idx" ON "terms" USING btree ("updated_at");
  CREATE INDEX "terms_created_at_idx" ON "terms" USING btree ("created_at");
  CREATE UNIQUE INDEX "menus_location_idx" ON "menus" USING btree ("location");
  CREATE INDEX "menus_updated_at_idx" ON "menus" USING btree ("updated_at");
  CREATE INDEX "menus_created_at_idx" ON "menus" USING btree ("created_at");
  CREATE UNIQUE INDEX "global_variables_name_idx" ON "global_variables" USING btree ("name");
  CREATE INDEX "global_variables_updated_at_idx" ON "global_variables" USING btree ("updated_at");
  CREATE INDEX "global_variables_created_at_idx" ON "global_variables" USING btree ("created_at");
  CREATE INDEX "sheet_imports_updated_at_idx" ON "sheet_imports" USING btree ("updated_at");
  CREATE INDEX "sheet_imports_created_at_idx" ON "sheet_imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "sheet_imports_filename_idx" ON "sheet_imports" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_field_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("field_groups_id");
  CREATE INDEX "payload_locked_documents_rels_interlinking_rules_id_idx" ON "payload_locked_documents_rels" USING btree ("interlinking_rules_id");
  CREATE INDEX "payload_locked_documents_rels_terms_id_idx" ON "payload_locked_documents_rels" USING btree ("terms_id");
  CREATE INDEX "payload_locked_documents_rels_menus_id_idx" ON "payload_locked_documents_rels" USING btree ("menus_id");
  CREATE INDEX "payload_locked_documents_rels_global_variables_id_idx" ON "payload_locked_documents_rels" USING btree ("global_variables_id");
  CREATE INDEX "payload_locked_documents_rels_sheet_imports_id_idx" ON "payload_locked_documents_rels" USING btree ("sheet_imports_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "field_groups" CASCADE;
  DROP TABLE "interlinking_rules" CASCADE;
  DROP TABLE "terms" CASCADE;
  DROP TABLE "menus" CASCADE;
  DROP TABLE "global_variables" CASCADE;
  DROP TABLE "sheet_imports" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;`)
}
