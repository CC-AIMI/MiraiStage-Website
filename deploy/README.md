# GitHub Actions deployment

Target: Alibaba Cloud Linux x86_64; Node 22 and PM2 installed in `/opt/nodejs/current/bin`.
The runner builds a Linux standalone Next.js server. No source install or build is needed on ECS.

Repository Actions Secrets:
- DEPLOY_HOST: server IP
- DEPLOY_USER: SSH user (currently root)
- DEPLOY_PORT: 22
- DEPLOY_SSH_KEY: dedicated authorized SSH private key
- DEPLOY_KNOWN_HOSTS: trusted SSH host public key line

For this server on port 22, run in the existing trusted server terminal:

```sh
awk '{print "43.103.51.60 " $1 " " $2}' /etc/ssh/ssh_host_ed25519_key.pub
```

Save the output in DEPLOY_KNOWN_HOSTS. This is a public host key, not the deployment private key.
For another SSH port, the host field must be `[43.103.51.60]:PORT`.

Allow SSH from the Actions runner through ECS security groups and the local firewall.
GitHub-hosted runner IPs vary; a narrowly restricted SSH rule may require a self-hosted runner or another controlled access mechanism.

Put SMTP configuration in `/var/www/miraistage/shared/.env.production` (chmod 600).
Without it the site runs, but contact mail returns 503. Do not commit SMTP credentials.

Run Actions > Deploy Mirai Stage > Run workflow for the first deployment.
Every subsequent push to main also deploys. A missing secret stops deployment.
The single PM2 instance briefly stops during activation; this is not zero-downtime deployment.
Failed health checks restore the previous release when one exists. Old releases are retained.

After the first success, run `pm2 startup`, follow the generated command, then `pm2 save` on ECS for reboot persistence.
Nginx should proxy to 127.0.0.1:3000 and overwrite Host, X-Forwarded-Host and X-Forwarded-Proto.
DNS/TLS setup is separate from this workflow; do not switch DNS until the new server is verified.
