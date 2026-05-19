#!/usr/bin/env sh
set -eu

FRONTEND_URL=${FRONTEND_URL:-http://localhost:3000}
BACKEND_URL=${BACKEND_URL:-http://localhost:8001}
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@freshcart.com}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-admin123}

printf 'Checking frontend: %s\n' "$FRONTEND_URL"
curl -fsS "$FRONTEND_URL" >/dev/null

printf 'Checking backend health: %s/api/health\n' "$BACKEND_URL"
curl -fsS "$BACKEND_URL/api/health" >/dev/null

printf 'Checking admin login API...\n'
LOGIN_RESPONSE=$(curl -fsS \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
  "$BACKEND_URL/api/auth/login")

echo "$LOGIN_RESPONSE" | grep -q '"success":true'
echo "$LOGIN_RESPONSE" | grep -q '"token"'

echo 'All health checks passed.'
