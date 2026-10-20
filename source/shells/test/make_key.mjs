// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// node make_key.mjs <out.p12> <password>: a signing key made by the page's own code (r136.js), saved as Fabrica saves one
import fs from 'node:fs'; import { loadMaker } from './load.mjs';
const [out, pass] = process.argv.slice(2);
const { IngApk } = loadMaker(new URL('../../build/modules', import.meta.url).pathname);
fs.writeFileSync(out, await IngApk.keys.save('device', pass));
const d = await IngApk.keys.describe('device'); console.log('key', d.cn, d.fingerprint.slice(0, 16));
