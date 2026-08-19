# AGENTS.md

Pilot client. pnpm only. Do not run `npm i`.

- Product / theme / ui:sync: `.cursor/skills/client-ui-component/SKILL.md`
- Contract: https://github.com/mithya-team/mithya-ui-libs/blob/main/docs/working-model.md
- Do not edit `apps/*/src/components/ui/**`.

```bash
pnpm install
pnpm ui:sync
pnpm --filter web test:e2e
pnpm --filter native ios
```

UI commits need `UI_SYNC=1` plus trailers `UI-Reason` and `UI-Version`.
