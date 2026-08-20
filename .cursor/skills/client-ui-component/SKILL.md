---
name: client-ui-component
description: Create or update product/theme UI in mithya-pilot-client, or install locked primitives via ui:sync. Use when adding product components, changing theme values, or installing/updating copies from mithya-ui-libs.
---

# Client component create / update

Work in `mithya-pilot-client`. Package manager is **pnpm**. Never `npm i`.

## Designer sandbox

Designers work in the unlocked client paths and use the sandbox entry point:

| Path | Purpose |
|---|---|
| `apps/*/src/design-sandbox/**` | Mock data and designer-owned preview screens |
| `apps/*/src/stories/**` | Storybook stories (theme, product, sandbox). Not in `ui/`. |
| `apps/*/src/components/product/**` | Product components and composition |
| `apps/*/src/theme/**` | Theme values |
| `apps/*/src/theme/variants/**` | Primitive variant recipes |

The sandbox must use typed local mock data. It must not call APIs, mutate a
database, or contain business rules. Keep the mock-data shape close to the
expected product data so developers can replace it with a real adapter later.

Designers may change layout, product components, theme values, content, and
mock scenarios. They must not edit the locked UI copies.

## Paths

| Path | Who | Edit |
|---|---|---|
| `apps/*/src/components/ui/**` | lib via `pnpm ui:sync` (`shadcn add`) | No. Locked. |
| `apps/*/src/theme/**` | client designer | Yes |
| `apps/*/src/theme/variants/**` | client designer | Yes. CVA (web) or Unistyles variants (native). |
| `apps/*/src/components/product/**` | client designer | Yes |
| `apps/*/src/design-sandbox/**` | client designer | Yes |
| `apps/*/src/stories/**` | client designer | Yes. Do not put stories in `ui/`. |
| Feature / page code | client developer | Yes |

## Product component (unlocked)

1. Put it in `apps/web/src/components/product` or `apps/native/src/components/product`.
2. Compose locked primitives. Do not restyle `ui/`.
3. Theme values in `src/theme` at three levels: primitive, semantic, component.
4. Recipes in `src/theme/variants/<name>` may use any of those levels.
   - Web: CVA (`class-variance-authority`) exported as `<name>Variants`
   - Native: Unistyles stylesheet exported as `<name>Styles` with `use<Name>Variants` next to `StyleSheet.create`
5. Keep data and save/load behavior behind typed props or callbacks.
6. For Playwright: `getByRole` / `getByPlaceholder`. For Maestro: `testID` wrappers in page/product code.

## Designer loop

1. Add or update the product component.
2. Add or update CVA / Unistyles recipes in `src/theme/variants`.
3. Add a typed scenario in `apps/*/src/design-sandbox/mock-data.ts`.
4. Add or update stories in `apps/*/src/stories` (tokens, variants, product, sandbox).
5. Review in Storybook: `pnpm --filter web storybook` or `pnpm --filter native storybook`.
6. Keep `DesignerSandbox` as the app smoke-test surface.
7. Run the platform smoke test.
8. Record the accepted design and open questions in the pull request.

Do not add API clients, query hooks, persistence, permissions, or domain
decisions to the designer sandbox.

## Install / refresh locked UI

1. Registry must match `components.json` pin (`pnpm serve` in `mithya-ui-libs`, or the tagged URL).
2. `pnpm ui:sync` (wrapper for `shadcn add --yes --overwrite`).
3. Commit **only** `src/components/ui/**` (and `components.json` if the pin changed):

```
UI_SYNC=1 git commit -m "ui: button@v0.1.0"
```

## Primitive change

Do not patch `src/components/ui`. Open an issue on `mithya-team/mithya-ui-libs`. After a new tag: bump pin in `components.json`, `pnpm ui:sync`, UI-only commit.

## Tests

- Web Storybook: `pnpm --filter web storybook` (`http://127.0.0.1:6006`)
- Native Storybook: `pnpm --filter native storybook` (`STORYBOOK_ENABLED=true`). Rebuild the Expo **dev client** after Storybook native deps.
- Web smoke: `pnpm --filter web test:e2e` (Playwright)
- Native smoke: Maestro `apps/native/maestro/smoke.yaml` on a prebuild dev client (`pnpm --filter native ios`). Not Expo Go.

The smoke tests start from the designer sandbox and prove that mock data,
visible states, and the primary interaction work. They do not prove real API
behavior.

## Developer handoff

After design acceptance, the developer:

1. Keeps the product component and visual contract.
2. Replaces mock data at the screen or feature boundary.
3. Adds real data fetching, mutations, validation, permissions, routing, and business rules in feature code.
4. Keeps API and domain logic out of `src/components/ui` and out of the designer sandbox.
5. Retains the designer smoke scenario as a stable UI regression test.
