BACKEND_CONTAINER=inno_backend_app

all: up init message

up:
	cd backend && docker-compose up -d
	cd frontend && docker-compose up -d

init:
	docker exec -t $(BACKEND_CONTAINER) cp .env.example .env
	docker exec -t $(BACKEND_CONTAINER) composer install
	docker exec -t $(BACKEND_CONTAINER) php artisan migrate:fresh
	docker exec -t $(BACKEND_CONTAINER) php artisan app:fetch-articles

message:
	@echo ""
	@echo "Visit http://localhost/ to see the application"

stop:
	cd backend && docker-compose down
	cd frontend && docker-compose down


.PHONY: up migrate_and_fetch message
