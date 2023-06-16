# openCVhumaneAR-server
 server side of the master thesis application

## Project setup
npm install

Start mongodb in wsl:
sudo mongod --config /etc/mongodb.conf

stop mongodb:
sudo pkill mongod

check process:
ps aux | grep mongod

check if mongodb is running:
sudo lsof -iTCP -sTCP:LISTEN -n -P

node version must be above  v11.0.0, otherwise you will get an error
