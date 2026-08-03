// Lives at /var/www/dbh/shared/ecosystem.config.cjs on the server.
// Copied there once during setup — the deploy workflow reads it, never rewrites it.
module.exports = {
  apps: [
    {
      name: 'dbh',
      // Always the symlink, never a release path: the workflow repoints `current`
      // and restarts, so pm2 picks up the new release without config edits.
      script: '/var/www/dbh/current/server.js',
      cwd: '/var/www/dbh/current',
      // Pinned, NOT bare 'node'. pm2 here runs as root under pm2-root.service,
      // and root's default node is 18.19.1 — too old for Next 16. This must
      // stay in lockstep with `node-version` in the deploy workflow, because
      // sharp's prebuilt binary is tied to the Node ABI it was installed for.
      interpreter: '/root/.nvm/versions/node/v20.20.2/bin/node',
      // Fork, not cluster. Next's ISR cache is per-process on local disk, so
      // multiple workers would serve inconsistent revalidated pages.
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // Bind to loopback only — nginx is the only thing that should reach it.
        HOSTNAME: '127.0.0.1',
      },
      max_memory_restart: '1G',
      // Give in-flight requests and any `after()` callbacks time to drain.
      kill_timeout: 10000,
      out_file: '/var/log/dbh/out.log',
      error_file: '/var/log/dbh/error.log',
      merge_logs: true,
      time: true,
    },
  ],
}
