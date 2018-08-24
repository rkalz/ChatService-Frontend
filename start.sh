echo "Starting frontend server"
docker run -d -it -p 8080:8080 --name=frontend frontend npm test
echo "Started frontend server"