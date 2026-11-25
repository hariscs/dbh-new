import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  UPDATE "pages" SET "term_ids" = "term_ids"
    - 'elementor_library_type' - 'elementor_font_type' - 'wpcode_tags' - 'wpcode_type' - 'wpcode_location'
    - 'pgscl_user_journey' - 'rank_math_redirection_category' - 'wp_theme' - 'nav_menu'
  WHERE "term_ids" IS NOT NULL;
  DELETE FROM "terms" WHERE "taxonomy" IN (
    'elementor_library_type', 'elementor_font_type', 'wpcode_tags', 'wpcode_type', 'wpcode_location',
    'pgscl_user_journey', 'rank_math_redirection_category', 'wp_theme', 'nav_menu'
  );`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
