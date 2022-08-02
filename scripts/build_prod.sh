#!/usr/bin/env bash

docker compose -f docker-compose.prod.yml kill cms-app-prod
# docker compose -f docker-compose.prod.yml rm -s -v -f cms-app-prod

docker compose -f docker-compose.prod.yml up -d --build

docker compose -f docker-compose.prod.yml logs -f cms-app-prod
# docker compose -f docker-compose.prod.yml run -it cms-app-prod bash