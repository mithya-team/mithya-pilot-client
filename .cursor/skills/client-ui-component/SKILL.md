---
name: client-ui-component
description: Create or update product/theme UI in mithya-pilot-client, or install locked primitives via ui:sync. Use when adding product components, changing theme values, or installing/updating copies from mithya-ui-libs.
---

# Client component create / update

Work in `mithya-pilot-client`. Package manager is **pnpm**. Never `npm i`.

## Paths

| Path | Who | Edit |
|---|---|---|
| `apps/*/src/components/ui/**` | lib via CLI | No. Locked. |
| `apps/*/ui.lock.json` | `pnpm ui:sync` | No by hand. |
| `apps/*/src/theme/**` | client designer | Yes |
| `apps/*/src/components/product/**` | client designer | Yes |
| Feature / page code | client developer | Yes |

## Product component (unlocked)

1. Put it in `apps/web/src/components/product` or `apps/native/src/components/product`.
2. Compose locked primitives. Do not restyle `ui/`.
3. Theme values only in `src/theme`.
4. For Playwright: `getByRole` / `getByPlaceholder`. For Maestro: `testID` wrappers in page/product code.

## Install / refresh locked UI

1. Registry must match `components.json` pin (`pnpm serve` in `mithya-ui-libs`, or the tagged URL).
2. `pnpm ui:sync`
3. Commit **only** `src/components/ui/**` + `ui.lock.json`:

```
UI_SYNC=1 git commit -m "$(cat <<'EOF'
ui(web): button@v0.1.0

UI-Reason: first-install
UI-Version: v0.1.0
EOF
)"
```

`UI-Reason` is `first-install` or `refresh` only.

## Primitive change

Do not patch `src/components/ui`. Open an issue on `mithya-team/mithya-ui-libs`. After a new tag: bump pin, `pnpm ui:sync`, UI-only commit.

## Tests

- Web: `pnpm --filter web test:e2e` (Playwright)
- Native: Maestro `apps/native/maestro/smoke.yaml` on a prebuild dev client (`pnpm --filter native ios`). Not Expo Go.
