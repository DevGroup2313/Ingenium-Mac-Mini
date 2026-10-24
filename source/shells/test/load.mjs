// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// Loads the page's own package makers into Node, exactly as the page runs them: the APK and IPA maker (modules/r136.js)
// and, from 6.5, the Mac and Windows app maker (modules/r170.js), which uses the first one's zip and signing parts.
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
export function loadMaker(modulesDir) {
  for (const f of ['r136.js', 'r170.js']) {
    const p = path.join(modulesDir, f); if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8').replace(/^<script>/, '').replace(/<\/script>\s*$/, '');
    vm.runInThisContext(src, { filename: f });
  }
  return { IngApk: globalThis.IngApk, IngIpa: globalThis.IngIpa, IngMac: globalThis.IngMac, IngWin: globalThis.IngWin };
}
