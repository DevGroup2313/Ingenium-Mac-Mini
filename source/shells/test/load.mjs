// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// Loads the page's own APK and IPA maker (modules/r136.js) into Node, exactly as the page runs it.
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
export function loadMaker(modulesDir) {
  const src = fs.readFileSync(path.join(modulesDir, 'r136.js'), 'utf8').replace(/^<script>/, '').replace(/<\/script>\s*$/, '');
  vm.runInThisContext(src, { filename: 'r136.js' });
  return { IngApk: globalThis.IngApk, IngIpa: globalThis.IngIpa };
}
