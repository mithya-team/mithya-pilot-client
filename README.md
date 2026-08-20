# mithya-pilot-client

Pilot **client** app repo: web + React Native (`solid` / `ghost`). Second client is https://github.com/aniruddha-mithya/mithya-alt-client.

Use **pnpm**. `npm i` fails Unistyles (`bob: command not found`).

Contract: see `mithya-ui-libs/docs/working-model.md`. Agent process: `.cursor/skills/client-ui-component/SKILL.md`.

## Setup

Registry first (`mithya-ui-libs` `pnpm serve` on `127.0.0.1:3333`).

```bash
pnpm install
pnpm ui:init
pnpm ui:sync
pnpm test:shadcn
pnpm typecheck
pnpm --filter web dev
pnpm --filter web storybook
pnpm --filter web test:e2e
pnpm --filter native storybook
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
| `apps/*/src/components/ui` | registry copy via `pnpm ui:sync` (`shadcn add`), locked |
| `apps/web/src/theme` | client theme values |
| `apps/web/src/theme/variants` | CVA recipes |
| `apps/native/src/theme` | Unistyles values + `StyleSheet.configure` |
| `apps/native/src/theme/variants` | Unistyles variant recipes |
| `apps/*/src/components/product` | client designer |
| `apps/*/src/design-sandbox` | typed mock data + designer preview |
| `apps/*/src/stories` | Storybook stories. Not under `ui/`. |

Do not edit `src/components/ui`. Pin is the registry URL in `components.json`. UI commits need `UI_SYNC=1`.

Designer workflow: read `docs/designer-sandbox.md`. Review theme and product UI in Storybook. The app sandbox stays the smoke-test surface. Developers replace mock data at the feature boundary.
