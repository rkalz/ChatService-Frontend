echo "Starting frontend server"
docker run -d -it 8082:8082 --name=frontend frontend npm test
echo "Started frontend server"