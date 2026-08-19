#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const WEB_MARKERS = [
  {
    file: "src/components/ui/button.tsx",
        snippets: ['from "../../theme/variants/button"', "export const Button"],
  },
  {
    file: "src/components/ui/input.tsx",
        snippets: ['from "../../theme/variants/input"', "export const Input"],
  },
  {
    file: "src/components/ui/layout.ts",
    snippets: ["export function layoutToStyle"],
  },
];

const NATIVE_MARKERS = [
  {
    file: "src/components/ui/button.tsx",
      snippets: [
        'from "../../theme/variants/button"',
        "export function Button",
        "react-native-unistyles",
      ],
  },
  {
    file: "src/components/ui/input.tsx",
        snippets: ['from "../../theme/variants/input"', "export function Input"],
  },
  {
    file: "src/components/ui/layout.ts",
    snippets: ["export function layoutToStyle"],
  },
  {
    file: "src/components/ui/native-theme.ts",
    snippets: ["export type NativeTheme"],
  },
];

const APPS = {
  web: WEB_MARKERS,
  native: NATIVE_MARKERS,
};

async function assertRegistry() {
  const res = await fetch("http://127.0.0.1:3333/web/v0.1.0/button.json");
  if (!res.ok) {
    throw new Error(
      `registry down (${res.status}). Start mithya-ui-libs: pnpm serve`,
    );
  }
}

function assertInstall(appName) {
  const appDir = join(root, "apps", appName);
  for (const { file, snippets } of APPS[appName]) {
    const abs = join(appDir, file);
    if (!existsSync(abs)) {
      throw new Error(`${appName}: missing ${file}`);
    }
    const content = readFileSync(abs, "utf8");
    for (const snippet of snippets) {
      if (!content.includes(snippet)) {
        throw new Error(`${appName} ${file}: missing ${snippet}`);
      }
    }
  }
}

async function main() {
  await assertRegistry();

  const result = spawnSync(process.execPath, [join(root, "scripts/ui-sync.mjs")], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`ui:sync failed (exit ${result.status})`);
  }

  for (const appName of Object.keys(APPS)) {
    assertInstall(appName);
    console.log(`ok ${appName}: shadcn CLI wrote locked ui`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
