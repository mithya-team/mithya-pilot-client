# AGENTS.md

Pilot client. pnpm only. Do not run `npm i`.

Parent Cursor workspace: `mithya-design-dev-workflow` (siblings `mithya-ui-libs`, `mithya-alt-client`).

- Product / theme / ui:sync: `.cursor/skills/client-ui-component/SKILL.md`
- Contract: https://github.com/mithya-team/mithya-ui-libs/blob/main/docs/working-model.md
- Do not edit `apps/*/src/components/ui/**`.

```bash
pnpm install
pnpm ui:sync
pnpm --filter web storybook
pnpm --filter web test:e2e
pnpm --filter native storybook
pnpm --filter native ios
```

UI commits need `UI_SYNC=1`. Pin lives in `components.json`. `pnpm ui:sync` wraps `shadcn add`.
