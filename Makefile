build:
	docker build --rm -t node-docker-sample .

run:
	docker run -p 3000:3000 -d --rm node-docker-sample:latest
