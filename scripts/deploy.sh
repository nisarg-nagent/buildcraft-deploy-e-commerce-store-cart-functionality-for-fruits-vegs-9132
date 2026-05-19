#!/usr/bin/env sh
set -eu

ENV_FILE=${ENV_FILE:-.env.production}
COMPOSE_FILE=${COMPOSE_FILE:-docker-compose.prod.yml}
PROJECT_NAME=${PROJECT_NAME:-freshcart}

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE. Create it with POSTGRES_PASSWORD, JWT_SECRET, FRONTEND_URL, and optional APP_VERSION." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose v2 is required." >&2
  exit 1
fi

echo "Building and starting FreshCart using $COMPOSE_FILE..."
docker compose --project-name "$PROJECT_NAME" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull || true
docker compose --project-name "$PROJECT_NAME" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build
docker compose --project-name "$PROJECT_NAME" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --remove-orphans

echo "Waiting for backend health..."
for i in $(seq 1 30); do
  if curl -fsS http://localhost:8001/api/health >/dev/null 2>&1; then
    echo "Backend is healthy."
    exit 0
  fi
  sleep 2
done

echo "Deployment started, but backend health check did not pass in time." >&2
docker compose --project-name "$PROJECT_NAME" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps
exit 1
