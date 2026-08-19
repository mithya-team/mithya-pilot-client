# Client designer sandbox

The client repo is the design workspace for product UI. It is also the handoff
surface between a designer and a developer.

## Ownership

Designers may change:

- `apps/*/src/components/product/**`
- `apps/*/src/theme/**`
- `apps/*/src/theme/variants/**`
- `apps/*/src/design-sandbox/**`

Pilot (`web`, `native`): `solid` / `ghost`. Second client is the sibling repo `mithya-alt-client` (`filled` / `outline` / `soft`).

The following paths are locked:

- `apps/*/src/components/ui/**`

If a product screen needs a change to a locked primitive, open an issue in
`mithya-ui-libs`. Do not patch the copied file.

## Designer workflow

1. Decide whether the work is product UI or a reusable primitive.
2. Put product UI in `src/components/product`.
3. Put client theme values in `src/theme`.
4. Put primitive variant recipes in `src/theme/variants` (CVA on web, Unistyles variants on native).
5. Add a typed scenario to `src/design-sandbox/mock-data.ts`.
6. Render it from `src/design-sandbox/DesignerSandbox.tsx`.
7. Review the web and native screens with all important states.
8. Run the platform smoke test.
9. Record accepted states, open questions, and test hooks in the pull request.

The current sandbox uses the same mock client shape on web and native:

```ts
type MockClient = {
  name: string
  plan: string
  status: "active" | "invited"
}
```

Use scenarios for empty, loading, error, disabled, long-content, and success
states when those states are part of the design. Keep scenarios local and
deterministic.

## Theme and variants

Theme values live in the client at three levels. Recipes may use any level.

| Level | Change this to | Web | Native |
|---|---|---|---|
| Primitive | retint the palette | `--primitive-*` | `primitive` |
| Semantic | retint a meaning | `--semantic-*` | `colors` / `space` |
| Component | retint one component | `--button-*`, `--input-*` | `component.button` / `component.input` |

| Platform | Theme | Variants |
|---|---|---|
| Web | `src/theme/theme.css` | CVA in `src/theme/variants/<name>.ts` |
| Native | `src/theme/tokens.ts` | Unistyles `variants` in `src/theme/variants/<name>.ts` |

Solid / ghost (pilot) and filled / outline / soft (alt) use component tokens. Padding and shared type still use semantic tokens. Primitive utilities (`bg-primitive-blue-600`, `theme.primitive.blue600`) are available when a recipe should skip semantic aliases.

Locked primitives import `../../theme/variants/<name>` after `shadcn add`. Do not patch `src/components/ui`.

## Rules for mock data

Mock data is for visual and interaction design only. It must not:

- call an API
- write to storage
- contain permissions or business rules
- decide routing
- hide loading or error states

Product components receive data and callbacks through typed props. This keeps
the visual contract stable when a developer adds real data.

## Developer handoff

The developer uses the accepted product component and sandbox scenario as the
UI contract. The developer then:

1. Replaces mock data at the screen or feature boundary.
2. Adds queries, mutations, validation, permissions, routing, and business logic
   in feature code.
3. Keeps generic UI copies unchanged.
4. Keeps the designer smoke scenario as a UI regression test.
5. Adds integration and data tests for the real flow.

The designer owns the visual result. The developer owns production behavior and
data management.

## Verification

From `mithya-pilot-client`:

```bash
pnpm --filter web test:e2e
pnpm --filter native ios
maestro test apps/native/maestro/smoke.yaml
```

The web smoke checks the mock client, form interaction, and saved state. The
native smoke checks the same contract with `testID` wrappers.
