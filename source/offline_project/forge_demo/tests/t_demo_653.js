// The Forge's demonstration, made from 653 (forge_demo_653.py), in Chromium:
//   - it says it is the demonstration, carries Carpe Diem's demonstration and Inkwell (not Ingenium, not itself), and a
//     control that would make an app answers with its card instead;
//   - at the same address as the owner's own Forge, it never sees what hers keeps (the owner's words, 27 October 2026:
//     "Please make sure that all of my handdrawn signatures samples and personal informations are also removed from the
//     apps ribbons of Ingenium and the Forge's demos"): her signatures, marks, letterheads, documents, names and databases
//     are given to her Forge first; then neither the demonstration's page nor its Tabula finds any of them, what the
//     demonstration keeps goes under its own name, and hers are as she left them;
//   - Tabula, Abacus and Imago in the demonstration wear no seal and offer Your own; in her Forge they wear the Forge's seal;
//   - no page errors.
//   node tests/t_demo_653.js <the owner's Forge url> <the demonstration url, at the same address> <out dir>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [MASTER, DEMO, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 600))); c ? pass++ : fail++; };
const OWN = { cd_signatures_v1: '[{"id":"s1","name":"Owner Hand","png":"data:image/png;base64,iVBORw0KGgo="}]', cd_marks_v1: '[{"id":"m1","name":"Owner Mark","png":"data:image/png;base64,iVBORw0KGgo="}]',
  cd_letterheads_v1: '[{"id":"l1","name":"Owner Letterhead"}]', tabula_docs: '[{"id":"d1","title":"Owner private draft","html":"<p>private</p>"}]', forge_t653_private: 'owner' };
async function ready(p) {
  await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 300000 });
  await p.waitForTimeout(1500); await p.evaluate(() => { try { if (typeof cdCloseDoor === 'function') cdCloseDoor(); } catch (e) {} }); await p.waitForTimeout(500);
}
async function tabula(p) {
  await p.evaluate(() => { const k = [...document.querySelectorAll('button.rail-stone')].find(x => x.textContent.trim() === 'Tabula'); k.click(); });
  await p.waitForFunction(() => { const f = document.getElementById('frame-tabula'); try { return !!(f && f.contentWindow.document.getElementById('cd-seal-group')); } catch (e) { return false; } }, null, { timeout: 120000 });
  await p.waitForTimeout(1500);
}
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  // her own Forge, given her signature, mark, letterhead, document, a name and a database
  const m = await ctx.newPage(); await m.goto(MASTER); await ready(m);
  await m.evaluate(o => { for (const k in o) localStorage.setItem(k, o[k]); return new Promise(r => { const q = indexedDB.open('t653-owner', 1); q.onupgradeneeded = () => q.result.createObjectStore('s'); q.onsuccess = () => { q.result.close(); r(); }; }); }, OWN);
  ok(await m.evaluate(() => !document.getElementById('forge-own-store')), "her Forge stores as before (no name of its own)");
  await tabula(m);
  const mh = await m.evaluate(() => { const w = document.getElementById('frame-tabula').contentWindow; return { png: !!(w.__ingHouse && /^data:image\/png/.test(w.__ingHouse.png || '')), name: w.__ingHouse && w.__ingHouse.name }; });
  ok(mh.png && mh.name === 'The Forge', "in her Forge, Tabula wears the Forge's seal", JSON.stringify(mh));

  // the demonstration, at the same address
  const d = await ctx.newPage(); const errs = []; d.on('pageerror', e => errs.push(e.message)); await d.goto(DEMO); await ready(d);
  const info = await d.evaluate(() => ({ build: window.CD_BUILD, demo: window.FORGE_DEMO === true, key: !!document.getElementById('fg-demo-key'), title: document.title,
    apps: (() => { const n = document.getElementById('forge-bi-meta'); return n ? JSON.parse(n.textContent).apps.map(a => a.key + ' ' + a.version) : null; })() }));
  ok(info.demo && info.key && info.build && info.build.edition === 'Demo' && /Demo/.test(info.title), 'it says it is the demonstration: on its build line, its tab, its DEMO key', JSON.stringify(info));
  ok(info.apps && info.apps.some(a => /^cd /.test(a)) && info.apps.some(a => /^inkwell /.test(a)) && !info.apps.some(a => /^(ingenium|forge) /.test(a)), 'it carries Carpe Diem and Inkwell, not Ingenium and not itself', JSON.stringify(info.apps));
  const locked = await d.evaluate(() => { const el = document.getElementById('shipHtml'); if (!el) return 'no shipHtml'; el.click(); const back = document.getElementById('fg-demo-back'); return back && back.getAttribute('data-open'); });
  ok(locked === '1', 'a control that would make an app answers with the demonstration card', locked);
  await d.evaluate(() => { const back = document.getElementById('fg-demo-back'); if (back) back.setAttribute('data-open', '0'); });
  const r = await d.evaluate(o => ({ shim: !!document.getElementById('forge-own-store'), seen: Object.keys(o).filter(k => localStorage.getItem(k) !== null) }), OWN);
  ok(r.shim, 'the demonstration keeps its own store, first of its scripts');
  ok(r.seen.length === 0, "its page finds none of her signatures, marks, letterheads, documents or names", JSON.stringify(r.seen));
  const dbs = await d.evaluate(() => indexedDB.databases ? indexedDB.databases().then(l => l.map(x => x.name)) : []);
  ok(!dbs.includes('t653-owner'), "nor her databases", JSON.stringify(dbs));
  await tabula(d);
  const t = await d.evaluate(o => { const w = document.getElementById('frame-tabula').contentWindow;
    return { shim: !!w.document.getElementById('forge-own-store'), seen: Object.keys(o).filter(k => w.localStorage.getItem(k) !== null), house: w.__ingHouse,
      marks: [...w.document.querySelectorAll('#cd-seal-group [data-cdsl="own"],#cd-seal-group [data-cdsl="lh"]')].map(e => e.title) }; }, OWN);
  ok(t.shim, "Tabula's frame keeps the same store");
  ok(t.seen.length === 0 && t.marks.length === 0, "Tabula finds none of her signatures, marks, letterheads or documents, and its ribbon shows none", JSON.stringify({ seen: t.seen, marks: t.marks }));
  ok(t.house && t.house.png === null && t.house.word === '' && t.house.name === 'The Forge', "Tabula wears no seal and no wordmark: its seal group offers Your own", JSON.stringify(t.house));
  await d.screenshot({ path: path.join(OUT, 'demo-tabula.png') });
  for (const app of ['abacus', 'slides']) {
    const h = await d.evaluate(a => new Promise(res => { const f = document.getElementById('frame-' + a); if (!f) return res('no frame');
      const n = document.getElementById('cd-src-' + a); if (!n) return res('no source');
      const html = decodeURIComponent(escape(atob(n.textContent.trim()))); const m = /window\.__ingHouse=(\{.*?\});<\/script>/.exec(html);
      res({ house: m ? JSON.parse(m[1]) : null, store: html.indexOf('id="forge-own-store"') >= 0 && html.indexOf('id="forge-own-store"') < html.indexOf('<script', html.indexOf('<head>') + 6) + 1 }); }), app);
    ok(h.house && h.house.png === null && h.house.word === '' && h.store, (app === 'slides' ? 'Imago' : 'Abacus') + ' wears no seal either, and keeps the same store, first', JSON.stringify(h));
  }
  // hers, as she left them; the demonstration's, under its own name
  await d.evaluate(() => { localStorage.setItem('forge_t653_demo', 'demo'); });
  const after = await m.evaluate(o => ({ same: Object.keys(o).every(k => localStorage.getItem(k) === o[k]), demoPlain: localStorage.getItem('forge_t653_demo'),
    prefixed: Object.keys(localStorage).filter(k => /^forge-demo:/.test(k)).length }), OWN);
  ok(after.same, "hers are as she left them");
  ok(after.demoPlain === null && after.prefixed > 0, 'what the demonstration keeps goes under its own name', JSON.stringify(after));
  ok(errs.length === 0, 'no errors on the demonstration', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
