# mithya-pilot native

Expo SDK 57 TypeScript app. Theme values live in `src/theme`. Registry copies go in `src/components/ui` (locked).

## Run

From `mithya-pilot-client`:

```bash
pnpm install
pnpm --filter native start
```

Unistyles 3 needs New Architecture + Nitro. **Expo Go is not supported.** Use a dev client or `pnpm --filter native exec expo prebuild`, then `ios` / `android`.

`StyleSheet.configure` runs in `src/theme/unistyles.ts`. `index.ts` imports that file first.

Light/dark follows the OS (`adaptiveThemes: true`, `userInterfaceStyle: automatic`).

## Sync UI

Registry must serve `http://127.0.0.1:3333`. Then from the client root:

```bash
pnpm ui:sync
```

Do not hand-edit `src/components/ui`.
