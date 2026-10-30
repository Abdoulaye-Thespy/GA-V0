#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-full}"
PACKAGE_MANAGER="${PACKAGE_MANAGER:-pnpm}"

run() {
  printf '\n\033[1;36m[quality-hub] %s\033[0m\n' "$*"
  "$@"
}

case "$MODE" in
  quick)
    run "$PACKAGE_MANAGER" lint
    run "$PACKAGE_MANAGER" typecheck
    run "$PACKAGE_MANAGER" test
    ;;
  full)
    run "$PACKAGE_MANAGER" lint
    run "$PACKAGE_MANAGER" typecheck
    run "$PACKAGE_MANAGER" test
    run "$PACKAGE_MANAGER" audit --audit-level=high
    run "$PACKAGE_MANAGER" build
    ;;
  security)
    run "$PACKAGE_MANAGER" audit --audit-level=high
    ;;
  build)
    run "$PACKAGE_MANAGER" build
    ;;
  *)
    printf 'Usage: %s [quick|full|security|build]\n' "$0"
    printf '  quick    lint + typecheck + unit/integration tests\n'
    printf '  full     quick + dependency audit + production build\n'
    printf '  security dependency audit only\n'
    printf '  build    production build only\n'
    exit 2
    ;;
esac

printf '\n\033[1;32m[quality-hub] All selected checks passed.\033[0m\n'
