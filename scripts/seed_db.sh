#!/usr/bin/env bash

set -x

docker compose -f docker-compose.dev.yml exec -t api yarn seed
