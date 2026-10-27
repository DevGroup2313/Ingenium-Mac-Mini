// node rig/t_681_own_store.js <master page url> <demo (or gift, or full) page url> <out dir>
// 6.8.1: a copy that is not the owner's never sees what the owner's copy keeps at the same address (storage_shim.py). The
// owner's copy is given a signature, a mark, a letterhead, a Tabula document and a name; then the other edition is opened
// in the same browser, at the same address: neither the page nor Tabula's frame finds any of them, what the demo keeps goes
// under its own name, and the owner's are as she left them.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [MASTER, OTHER, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
const OWN = { cd_signatures_v1: '[{"id":"s1","name":"Owner Hand","png":"data:image/png;base64,iVBORw0KGgo="}]', cd_marks_v1: '[{"id":"m1","name":"Owner Mark","png":"data:image/png;base64,iVBORw0KGgo="}]',
  cd_letterheads_v1: '[{"id":"l1","name":"Owner Letterhead"}]', tabula_docs: '[{"id":"d1","title":"Owner private draft","html":"<p>private</p>"}]', ing_t681_private: 'owner' };
async function enter(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(800); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  const m = await ctx.newPage(); await m.goto(MASTER); await enter(m);
  await m.evaluate(o => { for (const k in o) localStorage.setItem(k, o[k]); return new Promise(r => { const q = indexedDB.open('t681-owner', 1); q.onupgradeneeded = () => q.result.createObjectStore('s'); q.onsuccess = () => { q.result.close(); r(); }; }); }, OWN);
  const mShim = await m.evaluate(() => !!document.getElementById('ing-own-store'));
  ok(!mShim, "the owner's copy stores as before (no prefix of its own)");
  const d = await ctx.newPage(); const errs = []; d.on('pageerror', e => errs.push(e.message)); await d.goto(OTHER); await enter(d);
  const r = await d.evaluate(o => ({ shim: !!document.getElementById('ing-own-store'), seen: Object.keys(o).filter(k => localStorage.getItem(k) !== null), len: localStorage.length,
    keys: Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)) }), OWN);
  ok(r.shim, 'the other edition carries its own store, first of its scripts');
  ok(r.seen.length === 0, "the page finds none of the owner's signatures, marks, letterheads, documents or keys", JSON.stringify(r.seen));
  const dbs = await d.evaluate(() => indexedDB.databases ? indexedDB.databases().then(l => l.map(x => x.name)) : []);
  ok(!dbs.includes('t681-owner'), "nor the owner's databases", JSON.stringify(dbs));
  await d.evaluate(() => go('tabula'));
  await d.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return !!f.contentWindow.document.getElementById('cd-seal-group'); } catch (e) { return false; } }, null, { timeout: 60000 });
  const t = await d.evaluate(o => { const w = document.querySelector('#ing-desk iframe[data-app="tabula"]').contentWindow; return { shim: !!w.document.getElementById('ing-own-store'), seen: Object.keys(o).filter(k => w.localStorage.getItem(k) !== null),
    marks: [...w.document.querySelectorAll('#cd-seal-group [data-cdsl="own"],#cd-seal-group [data-cdsl="lh"]')].map(e => e.title) }; }, OWN);
  ok(t.shim, "Tabula's frame carries the same store");
  ok(t.seen.length === 0 && t.marks.length === 0, "Tabula finds none of the owner's signatures, marks, letterheads or documents, and its ribbon shows none", JSON.stringify(t));
  await d.screenshot({ path: path.join(OUT, 'demo-tabula.png') });
  await d.evaluate(() => { localStorage.setItem('ing_t681_demo', 'demo'); });
  const after = await m.evaluate(o => ({ same: Object.keys(o).every(k => localStorage.getItem(k) === o[k]), demoPlain: localStorage.getItem('ing_t681_demo'),
    prefixed: Object.keys(localStorage).filter(k => /^ing-(demo|gift|full):/.test(k)).length }), OWN);
  ok(after.same, "the owner's own are as she left them");
  ok(after.demoPlain === null && after.prefixed > 0, 'what the other edition keeps goes under its own name', JSON.stringify(after));
  ok(errs.length === 0, 'no errors on the other edition', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
