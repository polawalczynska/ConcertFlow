.PHONY: up down build logs restart clean help

# Default target
help:
	@echo "ConcertFlow Docker Commands:"
	@echo "  make up          - Start all services"
	@echo "  make down        - Stop all services"
	@echo "  make build       - Build all containers"
	@echo "  make logs        - View logs from all services"
	@echo "  make restart     - Restart all services"
	@echo "  make clean       - Stop and remove all containers, volumes, and images"
	@echo "  make dev         - Start in development mode"

# Start all services
up:
	docker compose up -d
	@echo "Services started! Web: http://localhost:3000, API: http://localhost:8080"

# Stop all services
down:
	docker compose down

# Build all containers
build:
	docker compose build --no-cache

# View logs
logs:
	docker compose logs -f

# Restart services
restart:
	docker compose restart

# Clean everything
clean:
	docker compose down -v --rmi all

# Development mode
dev:
	docker compose -f docker-compose.dev.yml up -d
	@echo "Development services started! Web: http://localhost:3000, API: http://localhost:8080"

