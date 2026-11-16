import * as migration_20261116_170253_initial from './20261116_170253_initial';

export const migrations = [
  {
    up: migration_20261116_170253_initial.up,
    down: migration_20261116_170253_initial.down,
    name: '20261116_170253_initial'
  },
];
