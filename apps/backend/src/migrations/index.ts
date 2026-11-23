import * as migration_20261116_170253_initial from './20261116_170253_initial';
import * as migration_20261123_122520_add_field_group_location from './20261123_122520_add_field_group_location';

export const migrations = [
  {
    up: migration_20261116_170253_initial.up,
    down: migration_20261116_170253_initial.down,
    name: '20261116_170253_initial',
  },
  {
    up: migration_20261123_122520_add_field_group_location.up,
    down: migration_20261123_122520_add_field_group_location.down,
    name: '20261123_122520_add_field_group_location'
  },
];
