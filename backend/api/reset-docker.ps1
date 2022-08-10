docker-compose kill
docker-compose down --remove-orphans
docker-compose rm -v -f

timeout /T 1
docker system prune -f
docker container prune -f

timeout /T 1
docker-compose up -d postgres

timeout /T 3
docker-compose up -d pgweb

docker-compose logs -f
