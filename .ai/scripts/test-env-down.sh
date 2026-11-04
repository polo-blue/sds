#!/bin/sh
# om-prepare-test-env: generated entrypoint
# history:
#   2026-10-30 generated: stops only the dev server test-env-up.sh started (PID file).
# Safe to run twice; never touches a dev server this script did not start.
set -u

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
QA_DIR="$ROOT/.ai/qa"
PID_FILE="$QA_DIR/test-env.pid"
DESCRIPTOR="$QA_DIR/test-env.json"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    # Windows (Git Bash): kill the whole tree — astro spawns node children
    if command -v taskkill >/dev/null 2>&1; then
      WINPID=$(ps -p "$PID" -o winpid= 2>/dev/null | tr -d ' ')
      [ -n "$WINPID" ] && taskkill //PID "$WINPID" //T //F >/dev/null 2>&1
    fi
    kill "$PID" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
fi
[ -f "$DESCRIPTOR" ] && sed -i 's/"status": "running"/"status": "stopped"/' "$DESCRIPTOR"
echo "TEST_ENV=stopped"
