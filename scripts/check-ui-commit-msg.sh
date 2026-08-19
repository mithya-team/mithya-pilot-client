#!/bin/sh
set -euo pipefail

MSG_FILE="${1:-}"
if [ -z "$MSG_FILE" ] || [ ! -f "$MSG_FILE" ]; then
  echo "blocked: commit-msg hook needs message file"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

ui_files="$(git diff --cached --name-only -- \
  'apps/*/src/components/ui/*' \
  'apps/*/src/components/ui/**' \
  '**/src/components/ui/*' \
  '**/src/components/ui/**' || true)"

if [ -z "${ui_files}" ]; then
  exit 0
fi

other_files="$(git diff --cached --name-only | grep -v -E 'src/components/ui/|components\.json$' || true)"

if [ -n "${other_files}" ]; then
  echo "blocked: UI commit may include src/components/ui and components.json only"
  echo "other staged:"
  echo "$other_files"
  exit 1
fi
