module.exports = {
  apps: [
    {
      name: 'dbh',
      script: 'pnpm',
      args: 'start',
      cwd: '/var/www/dbh',
      interpreter: 'none',
      exec_mode: 'fork',
      instances: 1,
      env: {
        PORT: 3001,
        PATH: '/root/.nvm/versions/node/v20.20.2/bin:' + process.env.PATH,
      },
      out_file: '/var/log/dbh/out.log',
      error_file: '/var/log/dbh/error.log',
      merge_logs: true,
      time: true,
    },
  ],
}
