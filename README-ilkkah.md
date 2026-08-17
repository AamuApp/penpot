This is a fork with some API and other changes. You probably don't want to use this. Use the original instead.

Build production images:

```bash
./manage.sh build
```

Run production images:

```bash
docker compose -f docker/images/docker-compose-db.yml up
docker compose -f docker/images/docker-compose-penpot.yml up
```

Stop production images:

```bash
docker compose -f docker/images/docker-compose-db.yml down
docker compose -f docker/images/docker-compose-penpot.yml down
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

```bash
# Set these to the upstream release and the previous local sync branch.
VERSION=2.17.1
PREVIOUS_VERSION=2.17.0

git fetch upstream --tags

# Plain upstream-sync branch.
git checkout -b sync-${VERSION} sync-${PREVIOUS_VERSION}
git merge ${VERSION}
git push -u origin sync-${VERSION}

# Slim MCP branch.
git checkout -b sync-${VERSION}-mcp-slin sync-${VERSION}
git cherry-pick \
  541b8f8d06 \
  78807d3e4d \
  568131bf86 \
  6897c48f24 \
  34b9f6d0b1
git push -u origin sync-${VERSION}-mcp-slin

# Rebuild and start the development containers from the MCP branch.
./manage.sh stop-devenv
./manage.sh build-devenv --local
./manage.sh run-devenv
```

If the release tag is not available locally, fetch it directly with
`git fetch upstream tag ${VERSION}`. Resolve the expected MCP cherry-pick
conflicts according to the notes below. `drop-devenv` may be used instead of
`stop-devenv` when the containers themselves need to be recreated; devenv data
volumes are preserved.

## Sync upstream release with slim MCP branch

Use this when Penpot upstream publishes a new release tag and we need matching
plain and slim MCP branches in this fork. Replace the versions in the commands
as needed. The base branch should be the previous local sync branch; for
example, `sync-2.16.1` starts from `sync-2.16.0`.

```bash
git fetch upstream --tags

# If fetching all tags fails because an old local tag would be clobbered, fetch
# the wanted release tag directly:
git fetch upstream tag 2.16.1

git checkout -b sync-2.16.1 sync-2.16.0
git merge 2.16.1
git push -u origin sync-2.16.1

git checkout -b sync-2.16.1-mcp-slim sync-2.16.1
git cherry-pick \
  541b8f8d06 \
  78807d3e4d \
  568131bf86 \
  6897c48f24 \
  34b9f6d0b1
git push -u origin sync-2.16.1-mcp-slim
```

The 2.16.1 merge has two expected conflicts:

- `541b8f8d06` conflicts in `docker/images/docker-compose.yaml`. Keep the slim
  overlay's `aamuapp/penpot_mcp` and `aamuapp/penpot_mcp_plugin` services, and
  drop the upstream `penpotapp/mcp` service from that location.
- `568131bf86` conflicts in
  `frontend/src/app/main/ui/workspace/main_menu.cljs`. Keep both imports:
  `potok.v2.core :as ptk` from upstream and `lambdaisland.uri :as u` from the
  slim path-prefix fix.

## sync-2.16.1 MCP slim commits

Use this slim MCP series instead of the older full MCP cherry-pick series.
Upstream 2.16.1 already contains the general MCP integration; this fork only
needs the slim deployment overlay and path-prefix/multi-user fixes.

- `541b8f8d06` - Adds the slim MCP deployment overlay:
  docker compose wiring, MCP server/plugin image support, backend session RPCs,
  token verification, and manage/build/push commands for the slim deployment.
- `78807d3e4d` - Avoids publishing Postgres from the slim compose setup.
- `568131bf86` - Fixes the Penpot MCP Manage link when Penpot is served under
  the `/designs/penpot` path prefix.
- `6897c48f24` - Builds the frontend-bundled MCP plugin in multi-user mode.
  Without this, Penpot's workspace loads `/plugins/mcp/plugin.js` with
  `multiUser=false`, the plugin popup does not create an MCP session token, and
  the MCP websocket disconnects with `Missing MCP session token`.
- `34b9f6d0b1` - Reads MCP plugin UI parameters from both normal query strings
  and hash-route query strings. Without this, Penpot can open
  `/mcp-plugin/#/?multiUser=true`, but the plugin UI may still start with
  `multiUser=false` and fail to create a session token.

Do not cherry-pick `7f9c8ea848` for 2.16.1. Its exporter non-interactive
install change is already present in `sync-2.16.1`.
