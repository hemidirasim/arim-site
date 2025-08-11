module.exports = {
  apps: [
    {
      name: 'arim-website',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'postgresql://arimgh_1:aiYjFDtNxRrVdXN2@j2he.your-database.de:5432/arimgh_db1',
        NEXTAUTH_SECRET: 'arim-production-secret-key-2025',
        NEXTAUTH_URL: 'https://your-domain.com'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'postgresql://arimgh_1:aiYjFDtNxRrVdXN2@j2he.your-database.de:5432/arimgh_db1',
        NEXTAUTH_SECRET: 'arim-production-secret-key-2025',
        NEXTAUTH_URL: 'https://your-domain.com'
      }
    }
  ]
}
