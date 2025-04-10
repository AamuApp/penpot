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
git checkout -b sync-2.6.1
git merge 2.6.1
./manage.sh build
./manage.sh push
git checkout main
git merge sync-2.6.1
git push
```