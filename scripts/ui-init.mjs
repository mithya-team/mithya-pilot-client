#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const WEB_URL = "http://127.0.0.1:3333/web/v0.1.0/{name}.json";
const NATIVE_URL = "http://127.0.0.1:3333/native/v0.1.0/{name}.json";

const defaultAliases = {
  components: "@/components",
  utils: "@/lib/utils",
  ui: "@/components/ui",
  lib: "@/lib",
  hooks: "@/hooks",
};

function stub(css, registryKey, url) {
  return {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: false,
    tsx: true,
    tailwind: {
      config: "",
      css,
      baseColor: "neutral",
      cssVariables: true,
    },
    aliases: defaultAliases,
    registries: {
      [registryKey]: { url },
    },
  };
}

function merge(filePath, css, registryKey, url) {
  let json;
  if (existsSync(filePath)) {
    json = JSON.parse(readFileSync(filePath, "utf8"));
  } else {
    json = stub(css, registryKey, url);
  }
  json.registries = { ...json.registries, [registryKey]: { url } };
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`wrote ${filePath}`);
}

merge(join(root, "apps/web/components.json"), "src/index.css", "@mithya-web", WEB_URL);
merge(join(root, "apps/native/components.json"), "", "@mithya-native", NATIVE_URL);
