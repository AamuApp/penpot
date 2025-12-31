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

Docker cleanup

StepsStop and Remove Penpot-Related Containers
Identify and stop Penpot-specific containers (e.g., penpotdev-postgres-1, penpot-devenv-redis, penpotdev-mailer-1) without affecting unrelated containers. Check running containers with:bash

```bash
docker ps
```

Stop and remove Penpot containers (replace <container_id> with actual IDs, e.g., 9d34766adfef):bash

```bash
docker stop <container_id1> <container_id2> <container_id3>
docker rm <container_id1> <container_id2> <container_id3>
```

Example:bash

```bash
docker stop 9d34766adfef 2957ba881152 e2ea6fc20c72
docker rm 9d34766adfef 2957ba881152 e2ea6fc20c72
```

Handle BuildKit Container (if needed)
If an untagged image is used by a BuildKit container (e.g., buildx_buildkit_kamal-local-docker-container0), stop and remove it if it’s not needed for other builds:bash

```bash
docker stop <buildkit_container_id>
docker rm <buildkit_container_id>
```

Example:bash

```bash
docker stop f046e431d79a
docker rm f046e431d79a
```

Remove Penpot-Related Images
Remove all Penpot images (aamuapp/penpot_*, penpotdev-main) and the development image:bash

```bash
docker images | grep -E 'aamuapp/penpot|penpotdev-main' | awk '{print $1":"$2}' | xargs --no-run-if-empty docker rmi -f
docker rmi -f penpotapp/devenv:latest
```

Remove Untagged Images
Remove untagged (<none>) images, skipping any in use (e.g., by BuildKit):bash

```bash
docker images | grep '<none>' | awk '{print $3}' | grep -v '<in_use_image_id>' | xargs --no-run-if-empty docker rmi -f
```

Example:bash

```bash
docker images | grep '<none>' | awk '{print $3}' | grep -v f210b5f94e18 | xargs --no-run-if-empty docker rmi -f
```
