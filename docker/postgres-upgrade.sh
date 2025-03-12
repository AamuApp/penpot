#!/usr/bin/env bash

# 
# How to upgrade PostgreSQL version in docker container
# 
# https://community.penpot.app/t/how-to-upgrade-postgresql-version-in-docker-container/2104
# 
# So let’s proceed with the upgrade using a temporal container:
# 
# docker run -ti --rm \
#    -v "$(pwd)/docker/postgres-upgrade.sh:/bin/postgres-upgrade.sh" \
#    -v "penpotdev_postgres_data:/var/lib/postgresql/13/data" \
#    -v "penpotdev_postgres_data_pg15:/var/lib/postgresql/15/data" \
#    postgres:15 postgres-upgrade.sh 13
#
# For example:
#
# docker run -ti --rm   -v "$(pwd)/docker/postgres-upgrade.sh:/bin/postgres-upgrade.sh"   -v "/var/pgdata:/var/lib/postgresql/15/data"   -v "penpot_penpot_postgres_data_pg16:/var/lib/postgresql/16/data"   postgres:16 postgres-upgrade.sh 15
#
#

set -x

export OLDVER=${1:-13}
export NEWVER=$(pg_ctl --version | sed -nE 's/^.+ .+ ([0-9]+).*$/\1/p');

export PGBINOLD=/usr/lib/postgresql/${OLDVER}/bin
export PGBINNEW=/usr/lib/postgresql/${NEWVER}/bin
export PGDATAOLD=/var/lib/postgresql/${OLDVER}/data
export PGDATANEW=/var/lib/postgresql/${NEWVER}/data

sed -i "s/$/ ${OLDVER}/" /etc/apt/sources.list.d/pgdg.list

apt-get update \
  && apt-get install -y --no-install-recommends postgresql-${OLDVER} \
  && rm -rf /var/lib/apt/lists/*

mkdir -p "$PGDATAOLD" "$PGDATANEW" \
  && chown -R postgres:postgres /var/lib/postgresql

pushd /var/lib/postgresql

PGDATA=$PGDATANEW gosu postgres initdb -U penpot --data-checksums
gosu postgres pg_upgrade -U penpot

cp $PGDATAOLD/pg_hba.conf $PGDATANEW/pg_hba.conf

popd
