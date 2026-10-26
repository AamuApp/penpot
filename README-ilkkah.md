This is a fork with some API and other changes. You probably don't want to use this. Use the original instead.

Run production commands from `sync-2.18.5`, `sync-2.18.5-mcp-slim`, or a
later sync branch that includes the deployment overlays described below.

Build production images:

```bash
./manage.sh build
```

Run production images:

```bash
./scripts/compose-aamu up -d
```

Stop production images:

```bash
./scripts/compose-aamu stop
```

Run devenv:

```bash
./manage.sh run-devenv
```

Stop devenv:

```bash
./manage.sh stop-devenv
```


Run pgadmin:

```bash
docker run -p 8888:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=penpot' -d dpage/pgadmin4
```


Sync upstream release, create sync branches, and start devenv

The plain `sync-2.18.5` branch now includes the deployment split. Start the
next release from that branch or a later plain sync branch. The reusable slim
commit replaces the old eight-commit cherry-pick series.

```bash
# Enter the new published upstream release, for example 2.18.6 when available.
read -rp "New upstream release: " VERSION
PREVIOUS_VERSION=2.18.5

git fetch upstream --tags
# If an unrelated old tag would be clobbered, fetch only the release tag:
# git fetch upstream tag "${VERSION}"

# Plain upstream-sync branch. It inherits the local deployment overlay.
git checkout -b "sync-${VERSION}" "sync-${PREVIOUS_VERSION}"
git merge "${VERSION}"
git push -u origin "sync-${VERSION}"

# Slim MCP branch. Apply the consolidated commit once, on the plain branch.
git checkout -b "sync-${VERSION}-mcp-slim" "sync-${VERSION}"
git cherry-pick d136fb43b7

git push -u origin "sync-${VERSION}-mcp-slim"

# Rebuild and start the development containers from the MCP branch.
./manage.sh stop-devenv
./manage.sh build-devenv --local
./manage.sh run-devenv
```

For releases after that, set `PREVIOUS_VERSION` to the preceding plain sync
branch. Do not use a slim branch as the base or reapply the old series. The
consolidated commit includes its resolved MCP changes, the multi-user plugin
build and URL fixes, and the devenv fixes. Source-code changes can still
conflict if upstream changes the same behavior.

The deployment commits are:

- `caeed77263` on `sync-2.18.5`: moves local deployment settings into an Aamu
  Compose overlay and the local nginx path into a server override file.
  Later plain sync branches inherit it; do not cherry-pick it again.
- `17d6c5eb0b` on the existing `sync-2.18.5-mcp-slim`: migrates that branch to
  the same deployment files and adds the slim Compose overlay. The existing
  branch is ready; do not apply the consolidated commit to it.
- `d136fb43b7` on `mcp-slim-overlay-2.18.5`: the reusable slim commit for new
  branches. It replaces `541b8f8d06`, `78807d3e4d`, `568131bf86`,
  `6897c48f24`, `34b9f6d0b1`, `e461335e4`, `1c37083477` and `bd3d2928c`.

Push the updated branches and the reusable commit branch from your shell so
other checkouts can use this workflow:

```bash
git push origin sync-2.18.5 sync-2.18.5-mcp-slim
git push -u origin mcp-slim-overlay-2.18.5
git push origin main
```

Local production deployment settings

Use Docker Compose 2.24.4 or later. The local overlay uses `!override` to
replace port and volume lists instead of adding to them, and `!reset` to
remove inherited settings.

Keep `docker/images/docker-compose.yaml` and
`docker/images/files/nginx.conf.template` aligned with upstream. Put local
settings in these files:

- `docker/images/docker-compose.aamu.yaml`: local images, flags, public URI,
  ports, S3 settings, and the existing PostgreSQL 16 data volume.
- `docker/images/files/nginx-aamu-subpath.conf`: the `/designs/penpot/`
  location. The Aamu overlay mounts it into nginx's existing `server.d`
  override directory; it is no longer baked into the frontend image.
- `docker/images/docker-compose.mcp-slim.yaml`: the slim MCP server and plugin
  services, plus the rule that keeps PostgreSQL's port unpublished. This file
  exists only on slim branches.

Use the wrapper so each deployment loads the right overlays:

```bash
./scripts/compose-aamu config --quiet
./scripts/compose-aamu up -d
./scripts/compose-aamu stop
```

The wrapper keeps the `penpot` Compose project name, loads the Aamu overlay,
and adds the slim overlay when that file exists. `./manage.sh up`, `upfg`,
`down` and `pull` use the same wrapper. Keep the existing environment variables
(`POSTGRES_PASSWORD`, `PENPOT_SECRET_KEY`, `PENPOT_SECRET_KEY2`,
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) available as before.

The data volume remains `penpot_postgres_data_pg16`; no data migration or
volume removal is part of this change. Devenv commands keep using their own
files under `docker/devenv/`.

Existing production deployment at 46.225.171.155

This host uses `/srv/migration/runtime/penpot/docker-compose.yaml`, not the
Compose files in this checkout. Pulling a new image does not update that
file or add the nginx override mount. Since `17d6c5eb0b`, the frontend image
no longer contains the `/designs/penpot/` location. Without the mount, nginx
returns `301 /404` for that path even though `/` still returns `200`.

Keep the production Compose file and add the nginx override to it. Do not
replace it with the repository Compose files as part of this repair.

Connect and back up the current Compose file:

```bash
ssh -p 2222 root@46.225.171.155
cd /srv/migration/runtime/penpot
cp -a docker-compose.yaml "docker-compose.yaml.bak-$(date +%Y%m%d-%H%M%S)"
```

Create `nginx-aamu-subpath.conf` in that directory. Its contents match
`docker/images/files/nginx-aamu-subpath.conf` on the sync branch:

```bash
cat > nginx-aamu-subpath.conf <<'NGINX'
location /designs/penpot/ {
    alias /var/www/app/;
    index index.html;

    try_files $uri $uri/ /index.html;
}
NGINX
chmod 644 nginx-aamu-subpath.conf
```

Add the second mount under the existing `penpot-frontend` service in
`docker-compose.yaml`, keeping its other settings:

```yaml
services:
  penpot-frontend:
    volumes:
      - penpot_assets:/opt/data/assets
      - ./nginx-aamu-subpath.conf:/etc/nginx/overrides/server.d/aamu-subpath.conf:ro
```

Validate Compose, then recreate only the frontend. This briefly interrupts
frontend requests; the database and backend keep running. A container
restart alone does not apply a new mount.

```bash
docker compose -p penpot -f docker-compose.yaml config --quiet
# Continue only if validation succeeds.
docker compose -p penpot -f docker-compose.yaml up -d --no-deps --force-recreate --pull never penpot-frontend
docker compose -p penpot -f docker-compose.yaml exec -T penpot-frontend nginx -t
```

Check both the container port and the public URL. Both must return `200`:

```bash
curl --max-time 15 -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3449/designs/penpot/
curl --max-time 15 -sS -o /dev/null -w '%{http_code}\n' https://ilkkah.aamu.app/designs/penpot/
```

Then open the original `/designs/open/...` link while signed in. If the
browser still uses the old permanent redirect, clear its cached redirect
or test in a fresh browser profile. Keep the override file and mount in
place for later image updates; this repair needs no image rebuild.
