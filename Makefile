start-server:
	air -c air.conf

ss:
	make start-server

start-client:
	pushd client && yarn start

sc:
	make start-client