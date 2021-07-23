# IOT-ON
Peque;o mini bot de discord para consultar sistema de riego IOT y miniservidor para probar las consultas.

# Endpoint
docker build -t endpoint .

docker run --name endpoint --rm -d -p 3000:3000 endpoint

# IOTON
docker build -t ioton .

docker run --name ioton --rm -d -p 4000:3000 ioton 

# Modo interactivo
docker run -it -p 4000:3000 <im>

# Limpiar Docker
sudo docker rm $(docker ps -a -q)

sudo docker rmi $(docker images -q)