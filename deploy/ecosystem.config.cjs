module.exports = {
  apps: [{
    name: 'miraistage',
    cwd: '/var/www/miraistage/current',
    script: 'server.js',
    interpreter: '/opt/nodejs/current/bin/node',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    max_memory_restart: '600M',
    env: { NODE_ENV: 'production', HOSTNAME: '127.0.0.1', PORT: '3000' }
  }]
};
