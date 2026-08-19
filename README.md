# mithya-pilot-client

Pilot **client** app repo: web + React Native. Theme and product UI live here. Generic primitives come from `mithya-ui-libs` via `pnpm ui:sync`.

Use **pnpm**. `npm i` fails Unistyles (`bob: command not found`).

Contract: see `mithya-ui-libs/docs/working-model.md`. Agent process: `.cursor/skills/client-ui-component/SKILL.md`.

## Setup

Registry first (`mithya-ui-libs` `pnpm serve` on `127.0.0.1:3333`).

```bash
pnpm install
pnpm ui:init
pnpm ui:sync
pnpm --filter web dev
pnpm --filter web test:e2e
pnpm --filter native ios
```

Native Unistyles needs a **dev client / prebuild**. Expo Go is not supported. Maestro: `maestro test apps/native/maestro/smoke.yaml` after the iOS app is installed.

Clone this repo to a path **without spaces**. Expo iOS scripts fail if a parent folder name contains a space.

```bash
git config core.hooksPath .githooks
```

## Layout

| Path | Owner |
|---|---|
| `apps/*/src/components/ui` | registry copy, locked |
| `apps/*/ui.lock.json` | hashes |
| `apps/web/src/theme` | client theme values |
| `apps/native/src/theme` | Unistyles values + `StyleSheet.configure` |
| `apps/*/src/components/product` | client designer |

Do not edit `src/components/ui`. UI commits need `UI-Reason: first-install|refresh` and `UI-Version:`.
