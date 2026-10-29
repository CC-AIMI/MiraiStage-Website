#!/usr/bin/env bash
set -euo pipefail
export PATH="/opt/nodejs/current/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
release="${1:?release ID required}"
[[ "$release" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]] || exit 1
base=/var/www/miraistage
incoming="$base/incoming/$release"
destination="$base/releases/$release"
command -v node >/dev/null
command -v pm2 >/dev/null
command -v curl >/dev/null
mkdir -p "$base/releases" "$base/shared"
if [[ -e "$base/current" && ! -L "$base/current" ]]; then
  echo 'current exists and is not a symlink; refusing to overwrite it'
  exit 1
fi
previous="$(readlink -f "$base/current" || true)"
mkdir "$destination"
tar -xzf "$incoming/release.tar.gz" -C "$destination"
test -f "$destination/server.js"
if [[ -f "$base/shared/.env.production" ]]; then
  ln -s "$base/shared/.env.production" "$destination/.env.production"
fi
cp "$incoming/ecosystem.config.cjs" "$base/ecosystem.config.cjs"
ln -s "$destination" "$base/current-$release"
mv -Tf "$base/current-$release" "$base/current"

start_site() {
  # Recreate the process so PM2 resolves the new release cwd.
  if pm2 describe miraistage >/dev/null 2>&1; then pm2 delete miraistage; fi
  pm2 start "$base/ecosystem.config.cjs" --only miraistage
}

healthy() {
  for attempt in {1..20}; do
    if curl --fail --silent --max-time 5 http://127.0.0.1:3000/zh-hant >/dev/null; then return 0; fi
    sleep 2
  done
  return 1
}

if start_site && healthy; then
  pm2 save
  echo "Deployed $release"
else
  echo 'Release failed; restoring previous release when available'
  if [[ -n "$previous" && -d "$previous" && "$previous" != "$destination" ]]; then
    ln -s "$previous" "$base/rollback-$release"
    mv -Tf "$base/rollback-$release" "$base/current"
    start_site
    healthy
    pm2 save
  fi
  exit 1
fi
