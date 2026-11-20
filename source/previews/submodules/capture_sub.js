// Submodules in Fabrica's Files (modules/r347.js, 7.57), the pictures she saw before it was released: the running app (a test build), an
// invented app (Tide Clock) with a submodule (lib, its address an invented one at example.org) made by git; the new rows ringed in Ingenium's
// violet (her rule: no gold); one picture for each step, each sent on its own at full size (her rule).
//   node capture_sub.js <page url> <bundle file> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, BUNDLE, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const ring = (sel) => p.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.body.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.offsetParent) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  // the part brought into view inside its own scrolling panel, as the earlier pictures' scripts do
  const bring = (sel) => p.evaluate((sel) => { const e = [...document.querySelectorAll(sel.split('|')[0])].find((x) => x.offsetParent); if (!e) return -1;
    let c = e.parentElement; while (c && !(c.scrollHeight > c.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(c).overflowY))) c = c.parentElement;
    if (!c) { e.scrollIntoView({ block: 'center' }); return 0; } const cr = c.getBoundingClientRect(), er = e.getBoundingClientRect(); c.scrollTop += (er.top - cr.top) - 60;
    const r2 = e.getBoundingClientRect(); if (r2.top < 0 || r2.bottom > innerHeight) e.scrollIntoView({ block: 'center' }); return 1; }, sel);
  const grab = async (key, ringSel, frameSel, pad) => { await sleep(500); await bring(frameSel); await sleep(500); const n = await ring(ringSel); await sleep(600);
    const box = await p.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (!e.offsetParent) return; const r = e.getBoundingClientRect(); x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.min(Math.max(0, box.y0 - P), VH - 200);
    const w = Math.min(VW - x, Math.max(420, box.x1 - box.x0 + 2 * P)), h = Math.min(VH - y, Math.max(200, box.y1 - box.y0 + 2 * P));
    console.log(key, 'ringed', n); await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: w, height: h } }); };
  const theme = (t) => p.evaluate((t) => { try { setTheme(t); } catch (e) { document.body.setAttribute('data-theme', t); } }, t);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2200);
  const b64 = fs.readFileSync(BUNDLE).toString('base64');
  await p.evaluate(async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const r = await IngRepo.fromBundle(u8, { name: 'Tide Clock' }); fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.S.view = 'files'; fbHubHost.paint(); }, b64);
  await sleep(2500);
  // 1. the row, among the files
  await grab('1-files-row', '#fbWorkBody .f-node.r347-sub', '#fbWorkBody .f-tree|#fbWorkBody .f-sec', 30);
  // 2. pressed: what it is
  await p.evaluate(() => document.querySelector('#fbWorkBody .f-node.r347-sub').click()); await sleep(800);
  await grab('2-files-said', '#fbWorkBody .f-node.r347-sub|#fbWorkBody .f-sec .r347-say', '#fbWorkBody .f-tree|#fbWorkBody .f-sec', 30);
  // 3 and 4. by night
  await theme('night'); await sleep(900); await p.evaluate(() => { fbHubHost.S.view = 'files'; fbHubHost.paint(); }); await sleep(1800);
  await grab('3-files-row-night', '#fbWorkBody .f-node.r347-sub', '#fbWorkBody .f-tree|#fbWorkBody .f-sec', 30);
  await p.evaluate(() => document.querySelector('#fbWorkBody .f-node.r347-sub').click()); await sleep(800);
  await grab('4-files-said-night', '#fbWorkBody .f-node.r347-sub|#fbWorkBody .f-sec .r347-say', '#fbWorkBody .f-tree|#fbWorkBody .f-sec', 30);
  console.log(JSON.stringify(errs)); await b.close();
})();
