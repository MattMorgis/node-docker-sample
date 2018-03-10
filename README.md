# Motivation

Sandbox to mess around with Docker and a TypeScript codebase.

Simply just prints `process.pid` and `process.uptime`

To run

```bash
# build docker image via Dockerfile
docker build --tag node-docker-sample:latest .

# Run one instance of the image in a container
docker run -p 3000:3000 -d node-docker-sample:latest

# Run a second instance of the image in a second container
docker run -p 3001:3000 -d node-docker-sample:latest
```

Visit [localhost:3000](http://localhost:3000) and [localhost:3001](http://localhost:3001) in a web browser.
