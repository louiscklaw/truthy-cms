
# docker compose -f docker-compose.dev.yml kill cms-app-dev
# docker compose -f docker-compose.dev.yml rm -s -v -f cms-app-dev

docker compose -f docker-compose.dev.yml up -d postgres pgweb redis

timeout /T 5
docker compose -f docker-compose.dev.yml up -d api

timeout /T 5
docker compose -f docker-compose.dev.yml up -d cms-app

timeout /T 10
docker compose -f docker-compose.dev.yml up -d proxy

# docker compose -f docker-compose.dev.yml logs -f proxy
docker compose -f docker-compose.dev.yml logs -f
