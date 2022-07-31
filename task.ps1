# cd cms
#   remove-item -Force -Recurse node_modules
# cd ..
# cd nextjs-client
#   remove-item -Force -Recurse node_modules
# cd ..
# cd truthy
#   remove-item -Force -Recurse node_modules
# cd ..
# cd truthy-react-frontend
#   remove-item -Force -Recurse node_modules
# cd ..

yarn docker_dev up -d
yarn docker_dev logs -f
