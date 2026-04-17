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
