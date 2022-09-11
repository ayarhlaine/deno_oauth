run-prod:
	docker-compose -f docker/docker-compose.yml up -d --build --remove-orphans
run-dev:
	docker-compose -f docker/docker-compose.dev.yml up -d --build --remove-orphans

run-local:
	denon run --allow-net --allow-env --allow-read src/main.ts