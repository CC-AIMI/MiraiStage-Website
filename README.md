# Mirai Stage Website

Next.js website with Traditional Chinese, Simplified Chinese, English and Japanese routes.

## Local development

Use Node.js 22 LTS.

```sh
npm ci
npm run dev
```

## Production

```sh
npm ci
npm run build
npm run start -- -H 127.0.0.1 -p 3000
```

Configure Nginx as the public reverse proxy and preserve Host, X-Forwarded-Host and X-Forwarded-Proto headers.

Copy `.env.production.example` to `.env.production` on the server and configure SMTP for the contact form. Never commit credentials.

GitHub Actions builds and deploys on pushes to main or manual dispatch. See [deployment setup](deploy/README.md) for required Secrets, server configuration and rollback behavior.
