#!/bin/bash
set -e

# Define paths
SOURCE_DIR_1="/home/app/aamuapp/data/ssl"
TARGET_DIR="/etc/postgresql/ssl"

# Ensure the directory for SSL certificates exists
mkdir -p "$TARGET_DIR"

# Copy files from the first source directory if they exist
if [ -d "$SOURCE_DIR_1" ]; then
    echo "Using SSL files from $SOURCE_DIR_1"
    cp "$SOURCE_DIR_1/fullchain.crt" "$TARGET_DIR/server.crt" || echo "fullchain.crt not found in $SOURCE_DIR_1"
    cp "$SOURCE_DIR_1/server.key" "$TARGET_DIR/server.key" || echo "server.key not found in $SOURCE_DIR_1"
else
    echo "No SSL files found. Exiting."
    exit 1
fi

# Change the ownership and permissions of the key file
chown postgres:postgres "$TARGET_DIR/server.key"
chmod 600 "$TARGET_DIR/server.key"

# Start PostgreSQL with the default entrypoint script
exec docker-entrypoint.sh postgres "$@"
