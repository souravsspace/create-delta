DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

.PHONY: run-postgres
run-postgres:
	docker run --name delta-postgres \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=postgres \
		-e POSTGRES_DB=postgres \
		-v postgres-delta-data:/var/lib/postgresql/data \
		-p 5432:5432 \
		-d postgres:17-alpine
	make create-postgres-volume
	make wait-for-postgres
	DATABASE_URL=$(DATABASE_URL) bun run db:migrate

.PHONY: create-postgres-volume
create-postgres-volume:
	docker volume create postgres-delta-data

.PHONY: wait-for-postgres
wait-for-postgres:
	@until docker exec delta-postgres pg_isready; do \
		echo "Waiting for postgres..."; \
		sleep 2; \
	done

.PHONY: stop-postgres
stop-postgres:
	docker stop delta-postgres
	docker rm -f delta-postgres
	docker volume rm postgres-delta-data



