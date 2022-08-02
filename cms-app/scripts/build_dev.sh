#!/usr/bin/env bash

docker compose -f docker-compose.dev.yml up -d --build

docker compose -f docker-compose.dev.yml logs -f next-dev
