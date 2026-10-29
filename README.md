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

GitHub automatic deployment is not yet configured. Server SSH credentials and release configuration must be set up before enabling it.
