echo "Starting frontend server"
docker run -d -it --network=datacenter -p 8080:80 --name=frontend frontend npm test
echo "Started frontend server"