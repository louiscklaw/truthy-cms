#!/usr/bin/env bash

docker compose -f docker-compose.dev.yml kill cms-app-dev
docker compose -f docker-compose.dev.yml rm -s -v -f cms-app-dev

docker compose -f docker-compose.dev.yml up -d --build

docker compose -f docker-compose.dev.yml logs -f cms-app-dev
