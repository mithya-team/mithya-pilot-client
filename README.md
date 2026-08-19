# mithya-pilot-client

Pilot **client** app repo: web + React Native. Theme and product UI live here. Generic primitives come from `mithya-ui-libs` via `pnpm ui:sync`.

## Setup

Registry first (`mithya-ui-libs` `pnpm serve` on `127.0.0.1:3333`).

```bash
pnpm install
pnpm ui:init
pnpm ui:sync
pnpm --filter web dev
pnpm --filter native typecheck
```

Native Unistyles needs a **dev client / prebuild**. Expo Go is not supported.

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
