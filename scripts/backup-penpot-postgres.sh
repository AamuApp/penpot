#!/usr/bin/env bash

set -euo pipefail

# Local backup destination.
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups/penpot}"

# Remote host and container details.
REMOTE_HOST="${REMOTE_HOST:-root@YOUR_SERVER}"
REMOTE_CONTAINER="${REMOTE_CONTAINER:-penpot-penpot-postgres-1}"

# PostgreSQL connection details inside the container.
REMOTE_DB_NAME="${REMOTE_DB_NAME:-penpot}"
REMOTE_DB_USER="${REMOTE_DB_USER:-postgres}"
REMOTE_DB_PASSWORD="${REMOTE_DB_PASSWORD:-CHANGE_ME}"

# How many newest backups to keep locally.
KEEP_COUNT="${KEEP_COUNT:-10}"

timestamp="$(date +%F_%H-%M-%S)"
mkdir -p "$BACKUP_DIR"

tmp_file="$(mktemp "$BACKUP_DIR/.penpot-${timestamp}.XXXXXX.dump.gz")"
final_file="$BACKUP_DIR/penpot-${timestamp}.dump.gz"

quote() {
  printf '%q' "$1"
}

cleanup_tmp() {
  rm -f "$tmp_file"
}

trap cleanup_tmp EXIT

remote_cmd="$(
  printf 'docker exec -e PGPASSWORD=%s %s pg_dump -U %s -d %s -Fc' \
    "$(quote "$REMOTE_DB_PASSWORD")" \
    "$(quote "$REMOTE_CONTAINER")" \
    "$(quote "$REMOTE_DB_USER")" \
    "$(quote "$REMOTE_DB_NAME")"
)"

ssh "$REMOTE_HOST" "$remote_cmd" | gzip > "$tmp_file"
mv "$tmp_file" "$final_file"
trap - EXIT

mapfile -t old_backups < <(
  find "$BACKUP_DIR" -maxdepth 1 -type f -name 'penpot-*.dump.gz' -printf '%T@ %p\n' \
    | sort -nr \
    | awk -v keep="$KEEP_COUNT" 'NR > keep { sub(/^[^ ]+ /, ""); print }'
)

if ((${#old_backups[@]} > 0)); then
  rm -f "${old_backups[@]}"
fi

printf 'Backup created: %s\n' "$final_file"
