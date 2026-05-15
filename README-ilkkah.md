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


Sync repo, build images

```bash
git fetch upstream --tags
git merge 2.6.2
git push

git checkout -b sync-2.6.2
git tag -f 2.6.2 HEAD
./manage.sh build
./manage.sh push
```

## Sync upstream release with MCP commits

Use this when Penpot upstream publishes a new release tag and we need matching
plain and MCP branches in this fork. Replace the versions in the commands as
needed. The base branch should be the previous local sync branch; for example,
`sync-2.15.2` starts from `sync-2.15.1`.

```bash
git fetch upstream --tags

# If fetching all tags fails because an old local tag would be clobbered, fetch
# the wanted release tag directly:
git fetch upstream tag 2.15.2

git checkout -b sync-2.15.2 sync-2.15.1
git merge 2.15.2
git push -u origin sync-2.15.2

git checkout -b sync-2.15.2-mcp sync-2.15.2
git cherry-pick \
  2eddb5351d \
  3bb9fa6eba \
  d8f95778fa \
  02959d5d32 \
  270dea1ad2 \
  1e44009376 \
  ff4136ab95 \
  31e32830ea
git push -u origin sync-2.15.2-mcp
```

During the MCP cherry-pick, prefer preserving the MCP commit series in order.
If a later commit is already present in the upstream base and becomes empty,
commit it with `git commit --allow-empty -C <commit>` when keeping the sync
history explicit is useful.

## sync-2.15.x MCP slim commits

Use this slim MCP series instead of the older full MCP cherry-pick series when
continuing the current 2.15.x deployment flow. These commits were applied on top
of `sync-2.15.3` to create `sync-2.15.3.1-mcp-slim`, and should be preserved in
order when syncing later upstream tags with the same slim MCP setup.

- `c8690458c7` - Adds the slim MCP deployment overlay:
  docker compose wiring, MCP server/plugin image support, and the related
  manage/build/push commands used by the slim deployment.
- `d302934a62` - Avoids publishing Postgres from the slim compose setup.
- `5ac6d3f297` - Fixes the Penpot MCP Manage link when Penpot is served under
  the `/designs/penpot` path prefix.
- `c2a55f6c43` - Builds the frontend-bundled MCP plugin in multi-user mode.
  Without this, Penpot's workspace loads `/plugins/mcp/plugin.js` with
  `multiUser=false`, the plugin popup does not create an MCP session token, and
  the MCP websocket disconnects with `Missing MCP session token`.
- `3386d82b2a` - Reads MCP plugin UI parameters from hash-route query strings.
  Without this, Penpot can open `/mcp-plugin/#/?multiUser=true`, but the plugin
  UI still starts with `multiUser=false` and cannot create a session token.

## sync-2.14.3-mcp commits

These are the MCP-specific commits that were cherry-picked on top of
`sync-2.14.3` to create `sync-2.14.3-mcp`.

- `2eddb5351d` - Adds the main MCP integration layer:
  backend RPC entrypoints, MCP server pieces, plugin bridge, plugin build
  support, docker image wiring, and plugin runtime assets.
- `3bb9fa6eba` - Updates the frontend workspace plugin UI and styles so the
  MCP-backed plugin flow is available in the editor.
- `d8f95778fa` - Refines plugin bootstrapping between the frontend plugin app
  and `PenpotMcpServer`, improving how the plugin and MCP server talk to each
  other.
- `02959d5d32` - Adjusts `mcp/packages/plugin/index.html` for the MCP plugin
  runtime.
- `270dea1ad2` - Updates `docker/images/docker-compose.yaml` with follow-up MCP
  container configuration changes.
- `1e44009376` - Changes frontend postinstall to use the `plugins` workspace,
  so MCP/plugin-related dependencies are installed from the correct workspace.
- `ff4136ab95` - Updates docker compose and generated MCP API type data to
  match the current API surface used by the MCP server.
- `31e32830ea` - Adds `webp` to the generated MCP API type data for export
  formats, keeping the documented export surface aligned with the current API.

## sync-2.14.4 export fix commits

These commits fix Penpot export for the `/designs/penpot` deployment and should
be preserved when continuing release syncs from `sync-2.14.4`.

On `sync-2.14.4`:

- `9d49f56036` - Fixes render-page API routing so exporter-rendered pages use
  the frontend container's internal `/api/rpc/command/...` routes instead of the
  external `/designs/penpot/api/...` base path.
- `3c79ef2280` - Aligns `penpot-exporter` with backend `PENPOT_SECRET_KEY`
  configuration and publishes exporter port `6061`, fixing resource upload
  authorization and nginx upstream access.

On `sync-2.14.4-mcp`:

- `125d21e4ba` - Same render-page API routing fix on top of the MCP branch.
- `701ec056f6` - Same exporter secret/port compose fix on top of the MCP
  branch.
