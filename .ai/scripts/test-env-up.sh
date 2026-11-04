#!/bin/sh
# om-prepare-test-env: generated entrypoint
# history:
#   2026-10-30 generated: Astro docs site (no backing services), mode=dev, --no-ephemeral.
#   2026-11-04 dropped the note on a pnpm 12 shim failure, since fixed. Still calls
#              node_modules/.bin/astro directly, so the PID file holds the server itself.
#
# Brings up the SDS docs site for QA / integration tests and writes the env
# descriptor consumers attach to. Flags: --force (restart even if healthy).
# No build cache: dev mode serves sources directly, there is nothing to prebuild.
set -eu

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
PORT=${SDS_TEST_PORT:-1234}            # repo convention (CLAUDE.md, playwright.config.ts)
BASE_URL="http://127.0.0.1:$PORT"
HEALTH_PATH=/
QA_DIR="$ROOT/.ai/qa"
DESCRIPTOR="$QA_DIR/test-env.json"
PID_FILE="$QA_DIR/test-env.pid"
LOG_FILE="$QA_DIR/test-env.log"
LOCK_DIR="$QA_DIR/test-env.lock"
FORCE=0
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    --force-rebuild) ;; # no build step in dev mode
    *) echo "unknown flag: $arg" >&2; exit 2 ;;
  esac
done

mkdir -p "$QA_DIR"
START=$(date +%s)

healthy() { [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$BASE_URL$HEALTH_PATH" || true)" = 200 ]; }

write_descriptor() { # $1 = startedByThisRepo (true|false), $2 = reused (true|false)
  cat > "$DESCRIPTOR" <<EOF
{
  "status": "running",
  "baseUrl": "$BASE_URL",
  "mode": "dev",
  "startedByThisRepo": $1,
  "reused": $2,
  "startScript": ".ai/scripts/test-env-up.sh",
  "stopScript": ".ai/scripts/test-env-down.sh",
  "platform": "posix",
  "browser": { "provider": "agent-browser" },
  "credentials": [],
  "notes": "Static docs site, no login or backing services. Port from SDS_TEST_PORT (default 1234)."
}
EOF
}

# Bootstrap lock (PID-checked, stale locks are cleared)
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  OWNER=$(cat "$LOCK_DIR/pid" 2>/dev/null || echo)
  if [ -n "$OWNER" ] && kill -0 "$OWNER" 2>/dev/null; then
    echo "another test-env-up run ($OWNER) holds the lock" >&2; exit 1
  fi
  rm -rf "$LOCK_DIR"; mkdir "$LOCK_DIR"
fi
echo $$ > "$LOCK_DIR/pid"
trap 'rm -rf "$LOCK_DIR"' EXIT INT TERM

# Reuse check
if [ "$FORCE" = 0 ] && healthy; then
  STARTED=false
  [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null && STARTED=true
  write_descriptor "$STARTED" true
  echo "TEST_ENV=ready reused=1 baseUrl=$BASE_URL seconds=$(( $(date +%s) - START ))"
  exit 0
fi
[ "$FORCE" = 1 ] && sh "$ROOT/.ai/scripts/test-env-down.sh" >/dev/null 2>&1 || true

[ -x "$ROOT/node_modules/.bin/astro" ] || { echo "node_modules missing: install dependencies first" >&2; exit 1; }

# App start + health wait
cd "$ROOT"
nohup "$ROOT/node_modules/.bin/astro" dev --host 127.0.0.1 --port "$PORT" > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"
i=0
until healthy; do
  kill -0 "$(cat "$PID_FILE")" 2>/dev/null || { echo "app exited during startup, see $LOG_FILE" >&2; exit 1; }
  i=$((i + 1))
  if [ "$i" -gt 90 ]; then echo "app not healthy after 180s, see $LOG_FILE" >&2; exit 1; fi
  sleep 2
done
write_descriptor true false
echo "TEST_ENV=ready reused=0 baseUrl=$BASE_URL seconds=$(( $(date +%s) - START ))"
