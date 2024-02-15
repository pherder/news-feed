# How to run the project
## Do you have linux and make?
1. Clone repository.
2. Go to the project directory type `make`.
3. Visit `localhost` in your browser.

## Do you want to run this manually?
1. Clone repository.
2. Go to project directory and run one by one:
    ```bash
    docker-compose -f backend/docker-compose.yml up -d
    docker-compose -f frontend/docker-compose.yml up -d 
    docker exec -t inno_backend_app cp .env.example .env
    docker exec -t inno_backend_app composer install
    docker exec -t inno_backend_app php artisan migrate:fresh
    docker exec -t inno_backend_app php artisan app:fetch-articles
    ```
3. Visit `localhost` in your browser.
