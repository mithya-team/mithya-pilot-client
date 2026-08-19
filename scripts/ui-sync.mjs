#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ITEMS = ["button", "input"];

function sha256(content) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

function loadComponents(appDir) {
  const path = join(appDir, "components.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function pinFromUrl(url) {
  const match = url.match(/\/(v\d+\.\d+\.\d+)\//);
  return match ? match[1] : "v0.1.0";
}

function registryUrl(componentsJson, key) {
  const entry = componentsJson?.registries?.[key];
  if (!entry?.url) {
    throw new Error(`missing registries.${key}.url`);
  }
  return entry.url;
}

function fileTarget(file, itemName) {
  if (file.target) return file.target.replace(/^\//, "");
  const name = basename(file.path ?? `${itemName}.tsx`);
  return `src/components/ui/${name}`;
}

async function fetchItem(urlTemplate, name) {
  const url = urlTemplate.replace("{name}", name);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url} → ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function syncApp(appDir, registryKey) {
  const componentsJson = loadComponents(appDir);
  if (!componentsJson) return null;

  const urlTemplate = registryUrl(componentsJson, registryKey);
  const version = pinFromUrl(urlTemplate);
  const lock = { version, items: {} };

  for (const name of ITEMS) {
    const item = await fetchItem(urlTemplate, name);
    const files = {};
    const itemFiles = item.files ?? [];
    if (itemFiles.length === 0) {
      throw new Error(`${registryKey}/${name}: no files[]`);
    }
    for (const file of itemFiles) {
      if (typeof file.content !== "string") {
        throw new Error(`${registryKey}/${name}: file missing content`);
      }
      const target = fileTarget(file, name);
      const abs = join(appDir, target);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, file.content);
      files[target] = sha256(file.content);
    }
    lock.items[name] = {
      version: item.version ?? version,
      files,
    };
  }

  const lockPath = join(appDir, "ui.lock.json");
  writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  console.log(`wrote ${lockPath}`);
  return version;
}

async function main() {
  const webVersion = await syncApp(join(root, "apps/web"), "@mithya-web");
  if (!webVersion) {
    throw new Error("web sync failed: no apps/web/components.json");
  }

  if (existsSync(join(root, "apps/native/components.json"))) {
    try {
      await syncApp(join(root, "apps/native"), "@mithya-native");
    } catch (err) {
      console.error(`native sync skipped: ${err.message}`);
    }
  }

  console.log("");
  console.log("UI-Reason: first-install");
  console.log(`UI-Version: ${webVersion}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
