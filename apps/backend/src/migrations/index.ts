import * as migration_20261116_170253_initial from './20261116_170253_initial';
import * as migration_20261123_122520_add_field_group_location from './20261123_122520_add_field_group_location';
import * as migration_20261123_125325_add_page_versions from './20261123_125325_add_page_versions';
import * as migration_20261124_201156_add_roles from './20261124_201156_add_roles';
import * as migration_20261125_114820_add_activity_log from './20261125_114820_add_activity_log';
import * as migration_20261125_115445_add_redirects from './20261125_115445_add_redirects';
import * as migration_20261125_120000_remove_internal_terms from './20261125_120000_remove_internal_terms';

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
    name: '20261123_125325_add_page_versions',
  },
  {
    up: migration_20261124_201156_add_roles.up,
    down: migration_20261124_201156_add_roles.down,
    name: '20261124_201156_add_roles',
  },
  {
    up: migration_20261125_114820_add_activity_log.up,
    down: migration_20261125_114820_add_activity_log.down,
    name: '20261125_114820_add_activity_log',
  },
  {
    up: migration_20261125_115445_add_redirects.up,
    down: migration_20261125_115445_add_redirects.down,
    name: '20261125_115445_add_redirects',
  },
  {
    up: migration_20261125_120000_remove_internal_terms.up,
    down: migration_20261125_120000_remove_internal_terms.down,
    name: '20261125_120000_remove_internal_terms'
  },
];
