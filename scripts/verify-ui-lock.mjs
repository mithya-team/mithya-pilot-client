#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function sha256(content) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

function pinFromUrl(url) {
  const match = url.match(/\/(v\d+\.\d+\.\d+)\//);
  return match ? match[1] : "v0.1.0";
}

function registryKeyForApp(appName, componentsJson) {
  if (appName === "native" && componentsJson.registries?.["@mithya-native"]) {
    return "@mithya-native";
  }
  if (componentsJson.registries?.["@mithya-web"]) return "@mithya-web";
  const keys = Object.keys(componentsJson.registries ?? {});
  if (keys.length === 0) throw new Error(`${appName}: no registries`);
  return keys[0];
}

function fileTarget(file, itemName) {
  if (file.target) return file.target.replace(/^\//, "");
  const base = (file.path ?? `${itemName}.tsx`).split("/").pop();
  return `src/components/ui/${base}`;
}

async function verifyApp(appDir, appName) {
  const lockPath = join(appDir, "ui.lock.json");
  const componentsPath = join(appDir, "components.json");
  const lock = JSON.parse(readFileSync(lockPath, "utf8"));
  const componentsJson = JSON.parse(readFileSync(componentsPath, "utf8"));
  const key = registryKeyForApp(appName, componentsJson);
  const urlTemplate = componentsJson.registries[key].url;
  const pin = pinFromUrl(urlTemplate);
  let failed = false;

  for (const [itemName, item] of Object.entries(lock.items ?? {})) {
    const url = urlTemplate.replace("{name}", itemName);
    let remote;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`fail ${appName}/${itemName}: refetch ${url} → ${res.status}`);
        failed = true;
        continue;
      }
      remote = await res.json();
    } catch (err) {
      console.error(`fail ${appName}/${itemName}: refetch ${err.message}`);
      failed = true;
      continue;
    }

    const remoteHashes = {};
    for (const file of remote.files ?? []) {
      if (typeof file.content !== "string") continue;
      remoteHashes[fileTarget(file, itemName)] = sha256(file.content);
    }

    for (const [rel, expected] of Object.entries(item.files ?? {})) {
      const abs = join(appDir, rel);
      if (!existsSync(abs)) {
        console.error(`fail ${rel}: missing on disk`);
        failed = true;
        continue;
      }
      const disk = sha256(readFileSync(abs, "utf8"));
      if (disk !== expected) {
        console.error(`fail ${rel}: on-disk ${disk} != lock ${expected}`);
        failed = true;
      }
      const remoteHash = remoteHashes[rel];
      if (!remoteHash) {
        console.error(`fail ${rel}: not in remote item ${url}`);
        failed = true;
      } else if (remoteHash !== expected) {
        console.error(`fail ${rel}: lock ${expected} != remote ${remoteHash} (pin ${pin})`);
        failed = true;
      }
    }
  }

  return !failed;
}

const appsDir = join(root, "apps");
if (!existsSync(appsDir)) {
  console.error("no apps/");
  process.exit(1);
}

const apps = readdirSync(appsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
let locks = 0;
let ok = true;

for (const dir of apps) {
  const appDir = join(appsDir, dir.name);
  if (!existsSync(join(appDir, "ui.lock.json"))) continue;
  locks += 1;
  const pass = await verifyApp(appDir, dir.name);
  if (!pass) ok = false;
}

if (locks === 0) {
  console.error("no ui.lock.json found");
  process.exit(1);
}

if (!ok) process.exit(1);
console.log("ui lock ok");
