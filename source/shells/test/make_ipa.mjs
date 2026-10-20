// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// node make_ipa.mjs <modules dir> <shell zip> <page.html> <icons dir> <out.ipa> [id] [title] [bridges, comma separated]
// Fills the iPhone and iPad shell with the page's own code (r136.js), as Fabrica does on the device.
import fs from 'node:fs'; import path from 'node:path'; import { loadMaker } from './load.mjs';
const [mods, shell, page, iconDir, out, id = 'com.yannieforest.shelltest', title = 'Shell Test', bridges = 'CarpeNative'] = process.argv.slice(2);
const { IngIpa } = loadMaker(mods);
const icons = {}; for (const [, z] of IngIpa.icons) icons[z] = new Uint8Array(fs.readFileSync(path.join(iconDir, `ios-${z}.png`)));
const t0 = Date.now();
const r = await IngIpa.make({ shell: new Uint8Array(fs.readFileSync(shell)), html: new Uint8Array(fs.readFileSync(page)), page: path.basename(page),
  title, id, versionName: '6.0', build: '600', icons, bridges: bridges.split(','), onStep: s => console.log('  ' + s) });
fs.writeFileSync(out, r.bytes);
console.log(JSON.stringify({ out, size: r.size, sha256: r.sha256, id: r.id, folder: r.folder, ms: Date.now() - t0 }));
