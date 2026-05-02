.PHONY: help build up down test lint migrate run-checks schedule-checks analyze-results

help:
	@echo "Synthetic Monitoring Grid - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build             : Build all service containers"
	@echo "up                : Start all services in the background"
	@echo "down              : Stop all services"
	@echo "test              : Run all tests (Unit + Integration)"
	@echo "lint              : Run linting checks"
	@echo "migrate           : Run database migrations"
	@echo "run-checks        : Trigger manual execution of all synthetic checks"
	@echo "schedule-checks   : Start the distributed check scheduler"
	@echo "analyze-results   : Run incident correlation and result analysis"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

run-checks:
	docker-compose exec api python scripts/run/execute.py

schedule-checks:
	docker-compose exec api python scripts/schedule/run.py

analyze-results:
	docker-compose exec api python scripts/analyze/correlation.py
