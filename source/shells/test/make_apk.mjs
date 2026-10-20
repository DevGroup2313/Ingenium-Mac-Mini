// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// node make_apk.mjs <modules dir> <android-shell.dex> <page.html> <icons dir> <out.apk> [id] [title] [keystore.p12 password]
// FABRICA_VC=<version code> and FABRICA_ALIAS=<launcher name> in the environment, when wanted
// Makes an APK with the page's own code (r136.js), as Fabrica makes it on the device.
import fs from 'node:fs'; import path from 'node:path'; import { loadMaker } from './load.mjs';
const [mods, dex, page, iconDir, out, id = 'com.yannieforest.shelltest', title = 'Shell Test', p12, pass] = process.argv.slice(2);
const { IngApk } = loadMaker(mods);
globalThis.__ingAndroidShell = new Uint8Array(fs.readFileSync(dex));
const icons = {}; for (const [d] of IngApk.core.DENSITIES) icons[d] = new Uint8Array(fs.readFileSync(path.join(iconDir, `android-${d}.png`)));
let keyId;
if (p12) { const k = await IngApk.keys.bring(new Uint8Array(fs.readFileSync(p12)), pass, 'test keystore'); keyId = k.id; console.log('key from keystore:', k.cn, k.fingerprint.slice(0, 16)); }
const t0 = Date.now();
const alias = process.env.FABRICA_ALIAS || '', versionCode = process.env.FABRICA_VC ? parseInt(process.env.FABRICA_VC, 10) : undefined;
const r = await IngApk.make({ html: new Uint8Array(fs.readFileSync(page)), page: path.basename(page), title, id, versionName: '6.0', keyId, alias, versionCode,
  icons, background: '#f5f3f7', bridges: ['CarpeNative'], onStep: s => console.log('  ' + s) });
fs.writeFileSync(out, r.bytes);
console.log(JSON.stringify({ out, size: r.size, sha256: r.sha256, id: r.id, versionCode: r.versionCode, key: r.key, ms: Date.now() - t0 }));
