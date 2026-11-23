import * as migration_20261116_170253_initial from './20261116_170253_initial';
import * as migration_20261123_122520_add_field_group_location from './20261123_122520_add_field_group_location';
import * as migration_20261123_125325_add_page_versions from './20261123_125325_add_page_versions';

export const migrations = [
  {
    up: migration_20261116_170253_initial.up,
    down: migration_20261116_170253_initial.down,
    name: '20261116_170253_initial',
  },
  {
    up: migration_20261123_122520_add_field_group_location.up,
    down: migration_20261123_122520_add_field_group_location.down,
    name: '20261123_122520_add_field_group_location',
  },
  {
    up: migration_20261123_125325_add_page_versions.up,
    down: migration_20261123_125325_add_page_versions.down,
    name: '20261123_125325_add_page_versions'
  },
];
