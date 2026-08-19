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

files="$(git diff --cached --name-only -- \
  'apps/*/src/components/ui/*' \
  'apps/*/src/components/ui/**' \
  '**/src/components/ui/*' \
  '**/src/components/ui/**' \
  '**/ui.lock.json' || true)"

if [ -z "${files}" ]; then
  exit 0
fi

MSG="$(cat "$MSG_FILE")"

if ! printf '%s\n' "$MSG" | grep -Eq 'UI-Reason: (first-install|refresh)'; then
  echo "blocked: UI commit needs UI-Reason: first-install or UI-Reason: refresh"
  echo "touched:"
  echo "$files"
  exit 1
fi

if ! printf '%s\n' "$MSG" | grep -q 'UI-Version:'; then
  echo "blocked: UI commit needs UI-Version:"
  echo "touched:"
  echo "$files"
  exit 1
fi
