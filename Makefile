APP_NAME=node-docker-sample

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build:  ## Build the container
	docker build --rm -t ${APP_NAME} .

run:  ## Run the container on port 3000
	docker run --rm --env-file=./local.env -p 3000:3000 ${APP_NAME}


