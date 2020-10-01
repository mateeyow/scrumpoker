start-server:
	air -c air.conf

ss:
	make start-server

start-client:
	pushd client && yarn start

sc:
	make start-client

build:
	go build server.go

server:
	go mod vendor
	make build
	sudo service scrum restart