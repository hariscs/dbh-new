import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_roles_post_types" AS ENUM('page', 'authors', 'facility', 'newsroom', 'difference', 'testimonials', 'external_post', 'post');
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"roles_id" integer
  );
  
  CREATE TABLE "roles_post_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roles_post_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"full_access" boolean DEFAULT false,
  	"permissions" jsonb,
  	"can_publish" boolean DEFAULT false,
  	"own_pages_only" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_created_by_id" integer;
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "users" ADD COLUMN "bio" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roles_post_types" ADD CONSTRAINT "roles_post_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_roles_id_idx" ON "users_rels" USING btree ("roles_id");
  CREATE INDEX "roles_post_types_order_idx" ON "roles_post_types" USING btree ("order");
  CREATE INDEX "roles_post_types_parent_idx" ON "roles_post_types" USING btree ("parent_id");
  CREATE UNIQUE INDEX "roles_name_idx" ON "roles" USING btree ("name");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");`)

  await db.execute(sql`
  INSERT INTO "roles" ("name", "full_access", "permissions", "can_publish", "own_pages_only") VALUES
    ('Administrator', true, '{}', true, false),
    ('Editor', false, '{"pages":["read","create","update","delete"],"media":["read","create","update","delete"],"terms":["read","create","update","delete"],"menus":["read","create","update","delete"],"global-variables":["read","update"],"sheet-imports":["read","create"]}', true, false),
    ('Author', false, '{"pages":["read","create","update","delete"],"media":["read","create"]}', false, true);
  INSERT INTO "users_rels" ("order", "parent_id", "path", "roles_id")
    SELECT 1, "users"."id", 'roles', "roles"."id" FROM "users", "roles" WHERE "roles"."name" = 'Administrator';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles_post_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "roles_post_types" CASCADE;
  DROP TABLE "roles" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_created_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_created_by_id_users_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roles_fk";
  
  DROP INDEX "pages_created_by_idx";
  DROP INDEX "_pages_v_version_version_created_by_idx";
  DROP INDEX "payload_locked_documents_rels_roles_id_idx";
  ALTER TABLE "pages" DROP COLUMN "created_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_created_by_id";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "users" DROP COLUMN "bio";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "roles_id";
  DROP TYPE "public"."enum_roles_post_types";`)
}
