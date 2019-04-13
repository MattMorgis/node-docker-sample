build:
	docker build --rm -t node-docker-sample .

run:
	docker run -p 3000:3000 -d node-docker-sample:latest
