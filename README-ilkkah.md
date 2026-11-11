This is a fork with Aamu API and deployment changes.

Run the development environment:

```bash
./manage.sh run-devenv
```

Stop it with:

```bash
./manage.sh stop-devenv
```

## Sync a new Penpot release

Create the plain sync branch from the preceding plain sync branch. Do not use
an MCP branch as the base for the next release.

```bash
read -rp "New upstream release: " VERSION
PREVIOUS_VERSION=2.19.1

git fetch upstream --tags
git checkout -b "sync-${VERSION}" "sync-${PREVIOUS_VERSION}"
git merge "${VERSION}"
git push -u origin "sync-${VERSION}"
```

Create the MCP branch from the new plain sync branch and cherry-pick the most
recent resolved slim MCP commit:

```bash
git checkout -b "sync-${VERSION}-mcp-slim" "sync-${VERSION}"
git cherry-pick 5c6eac465a
git push -u origin "sync-${VERSION}-mcp-slim"
```

The commit `5c6eac465a` is the resolved slim MCP implementation for the
2.19.1 sync. It contains the MCP plugin bundle, the slim Docker overlay, the
multi-user plugin changes, and the resolved `manage.sh` and MCP server
changes. Do not cherry-pick the older MCP commit series or
`d136fb43b7` again.

If upstream changes the same functions in `manage.sh` or
`mcp/packages/server/src/PenpotMcpServer.ts`, a conflict can still occur.
Resolve it by keeping both build targets in `manage.sh` and the new
Streamable HTTP session handling in the MCP server.

After creating the branch, rebuild the local development image if needed:

```bash
./manage.sh stop-devenv
./manage.sh build-devenv --local
./manage.sh run-devenv
```

## Local deployment

Use the wrapper for the Aamu deployment:

```bash
./scripts/compose-aamu config --quiet
./scripts/compose-aamu up -d
./scripts/compose-aamu stop
```

Keep the local deployment settings in:

- `docker/images/docker-compose.aamu.yaml`
- `docker/images/docker-compose.mcp-slim.yaml`
- `docker/images/files/nginx-aamu-subpath.conf`

Keep these environment variables available to the deployment:

```text
POSTGRES_PASSWORD
PENPOT_SECRET_KEY
PENPOT_SECRET_KEY2
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

The local Aamu integration secret for the devenv belongs in the ignored
`backend/scripts/_env.local` file. Keep the real file outside the branch
history, for example under `.git/local-secrets/`, and symlink it into
`backend/scripts/_env.local`.

Do not remove the existing PostgreSQL data volume as part of a release sync.
