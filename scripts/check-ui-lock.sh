#!/bin/sh
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

ui_files="$(git diff --cached --name-only -- 'apps/*/src/components/ui/*' 'apps/*/src/components/ui/**' '**/src/components/ui/*' '**/src/components/ui/**' '**/ui.lock.json' || true)"

if [ -z "${ui_files}" ]; then
  exit 0
fi

if [ "${UI_SYNC:-}" != "1" ]; then
  echo "blocked: src/components/ui is registry-owned"
  echo "use: UI_SYNC=1 pnpm ui:sync"
  echo "staged:"
  echo "$ui_files"
  exit 1
fi

node "$ROOT/scripts/verify-ui-lock.mjs"
