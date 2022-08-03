#!/usr/bin/env bash

set -ex

docker compose -f docker-compose.prod.yml exec -it cms-app bash
