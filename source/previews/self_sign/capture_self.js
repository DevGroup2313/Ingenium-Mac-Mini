// Ingenium itself, signed and checked (modules/r348.js and build/desktop/app_self_758.py, 7.58), the pictures she sees before it is released:
// the running app (a test build) with the computer app's own back-end (rig/t_758_run_self.py), and a test owner key made by the page's own
// PermitCore (never hers); the new parts ringed in Ingenium's violet (her rule: no gold); one picture for each step, each sent on its own
// at full size (her rule).
//   node capture_self.js <api port> <the app's folder> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [API, APP, OUT] = [+process.argv[2], process.argv[3], process.argv[4]]; fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the pictures only';
(async () => {
  const info = await (await fetch('http://127.0.0.1:' + API + '/')).json();
  const test = (what, v) => fetch('http://127.0.0.1:' + API + '/test/' + what, { method: 'POST', body: JSON.stringify(v) }).then((r) => r.json());
  const PAGE = path.join(APP, 'ingenium.html'); const ORIG = fs.readFileSync(PAGE);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  await ctx.addInitScript(({ names, API }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const URL_ = 'http://127.0.0.1:' + info.port + '/ingenium.html';
  const quiet = () => p.evaluate(() => { if (!document.getElementById('pvQuiet')) { const st = document.createElement('style'); st.id = 'pvQuiet'; st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); }
    try { document.activeElement && document.activeElement.blur && document.activeElement.blur(); } catch (e) {} });
  const ring = (sel) => p.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.offsetParent || e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  const grab = async (key, ringSel, frameSel, pad) => { await quiet(); await sleep(500); const n = await ring(ringSel); await sleep(700);
    const box = await p.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    const w = Math.min(VW - x, box.x1 - box.x0 + 2 * P), h = Math.min(VH - y, box.y1 - box.y0 + 2 * P);
    console.log(key, 'ringed', n, 'clip', Math.round(x), Math.round(y), Math.round(w), Math.round(h)); await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: w, height: h } }); };
  const open = async () => { await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(1500); };
  const room = async () => { await p.evaluate(async () => { await IngSelfSign._key(); await IngSelfSign.check(true); go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(1600);
    await p.evaluate(() => { const t = document.querySelector('#secCard .sc-subs'); if (t) t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -16); }); await sleep(700); };
  const FRAME = '#secCard .sc-subs|#secCard .sc-p[data-k="self"]';
  await open();
  const sealed = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); return s; }, PW);
  await test('keys', [{ kid: sealed.kid, x: sealed.pub.x, y: sealed.pub.y }]); await test('release', await p.evaluate(() => ING_VERSION));
  // 1. not signed yet: Sign this release
  await room();
  await grab('1-not-signed', '#secCard [data-ss="sign"]', FRAME, 24);
  // 2. the owner key's password, in a card of its own
  await p.click('#secCard [data-ss="sign"]'); await sleep(900); await p.fill('#r348Pw', PW);
  await grab('2-sign-card', '#r348Ask .sa-card', '#r348Ask .sa-card', 60);
  await ring('none'); await p.click('#r348Yes'); await p.waitForFunction(() => !document.getElementById('r348Ask'), null, { timeout: 90000 }); await sleep(1500);
  // 3. signed and checked: Save the signature
  await room();
  await grab('3-signed', '#secCard .sc-p[data-k="self"] .sc-well .sc-chip.ok|#secCard [data-ss="save"]', FRAME, 24);
  // 4 and 5. the page changed on the disk: the computer app's own page says which file, by day and by night
  fs.writeFileSync(PAGE, Buffer.concat([ORIG, Buffer.from('\n<!-- changed by someone else -->\n')])); await sleep(2300);
  await p.goto(URL_, { waitUntil: 'domcontentloaded' }); await sleep(1600);
  await grab('4-refused', '.well', '.card', 44);
  await p.emulateMedia({ colorScheme: 'dark' }); await p.goto(URL_, { waitUntil: 'domcontentloaded' }); await sleep(1600);
  await grab('5-refused-night', '.well', '.card', 44);
  await p.emulateMedia({ colorScheme: 'light' });
  // 6. put back, by night: signed, and the refusal on record
  fs.writeFileSync(PAGE, ORIG); await sleep(2300);
  await open(); await p.evaluate(() => { try { setTheme('night'); } catch (e) { document.body.setAttribute('data-theme', 'night'); } }); await sleep(1200);
  await room();
  await grab('6-signed-night', '#secCard .sc-p[data-k="self"] .sc-well:nth-of-type(2)', FRAME, 24);
  console.log(JSON.stringify(errs)); fs.writeFileSync(PAGE, ORIG); await b.close();
})();
