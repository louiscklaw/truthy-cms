#!/usr/bin/env bash

set -x

# docker compose -f docker-compose.dev.yml kill cms-app-dev
# docker compose -f docker-compose.dev.yml rm -s -v -f cms-app-dev

docker network create traefik-proxy-network

docker compose -f docker-compose.dev.yml up -d postgres pgweb redis

sleep 5
docker compose -f docker-compose.dev.yml up -d api

sleep 5
docker compose -f docker-compose.dev.yml up -d cms-app

sleep 10
docker compose -f docker-compose.dev.yml up -d proxy

# docker compose -f docker-compose.dev.yml logs -f proxy
docker compose -f docker-compose.dev.yml logs -f
