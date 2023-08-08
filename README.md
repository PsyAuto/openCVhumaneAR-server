# openCVhumaneAR-server
 server side of the master thesis application

## Project setup
npm install

Start mongodb in wsl:
sudo mongod --config /etc/mongod.conf

stop mongodb:
sudo pkill mongod

check process:
ps aux | grep mongod

check if mongodb is running:
sudo lsof -iTCP -sTCP:LISTEN -n -P

node version must be above  v11.0.0, otherwise you will get an error

## Networking
- Allow ping and port 3000 on windows defender
    - File and Printer Echo Request (inbound/outbound)
    - Inbound Rule: allow port 3000
- The server sits inside a WSL linux and listens to port 4000. To forward traffic, from within the host windows machine run on an elevated windows terminal:
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=4000 connectaddress=172.24.20.189 