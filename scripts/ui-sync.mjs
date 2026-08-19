#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_ITEMS = ["button", "input"];

function loadComponents(appDir) {
  const path = join(appDir, "components.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function registryKey(componentsJson) {
  if (componentsJson?.registries?.["@mithya-native"]) return "@mithya-native";
  if (componentsJson?.registries?.["@mithya-web"]) return "@mithya-web";
  const keys = Object.keys(componentsJson?.registries ?? {});
  if (keys.length === 0) throw new Error("no registries in components.json");
  return keys[0];
}

function appDirs() {
  const cwd = process.cwd();
  if (existsSync(join(cwd, "components.json"))) return [cwd];
  return readdirSync(join(root, "apps"))
    .map((name) => join(root, "apps", name))
    .filter((dir) => existsSync(join(dir, "components.json")));
}

function shadcnAdd(appDir, names) {
  console.log(`shadcn add ${names.join(" ")}  (${appDir})`);
  const result = spawnSync(
    "pnpm",
    ["dlx", "shadcn@latest", "add", ...names, "--yes", "--overwrite"],
    { cwd: appDir, stdio: "inherit", env: process.env },
  );
  if (result.status !== 0) {
    throw new Error(`shadcn add failed in ${appDir} (exit ${result.status})`);
  }
}

const items = process.argv.slice(2);
const names = items.length > 0 ? items : DEFAULT_ITEMS;

for (const appDir of appDirs()) {
  const componentsJson = loadComponents(appDir);
  if (!componentsJson) continue;
  const key = registryKey(componentsJson);
  const prefixed = names.map((name) =>
    name.startsWith("@") ? name : `${key}/${name}`,
  );
  shadcnAdd(appDir, prefixed);
}
