docker compose -f docker-compose.prod.yml up -d --build

docker compose -f docker-compose.prod.yml logs -f next-prod
# docker compose -f docker-compose.prod.yml run -it next-prod bash