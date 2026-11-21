// Ingenium 7.50 · Settings, Security, The computer's disk says what the computer app itself reports it seals (modules/r340.js, 7.50),
// with a stand-in computer app whose answer names the kinds it seals (the computer app's own side: rig/t_750_disk_more.py).
//   1. a copy without a computer app names what this release's apps seal, texts for training among them
//   2. a computer app of 7.50 (records and training among its kinds): the room says so, and leaves only the drive for later (7.59: the
//      folder search's index is sealed by the page itself, rag/seal.js, so it is no longer named as to come)
//   3. a computer app of 7.49 (outbox and runs only): the room keeps 7.49's words, texts for training still to come
//   4. an edition without Fabrica (gift, demo; nothing there sends an app to the devices): texts for training only
//     node rig/t_750_disk_page.js <master page url> [<gift page url>]
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2] || 'http://127.0.0.1:8193/ingenium.html', GIFT = process.argv[3] || '';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; }
const STUB = () => { window.__kinds = ['outbox', 'runs', 'records', 'training'];
  const st = () => ({ ok: true, held: true, kid: 'x', lib: true, files: 5, sealed: 5, kinds: window.__kinds.slice() });
  window.pywebview = { api: { disk_key_hold() { return Promise.resolve(st()); }, disk_key_drop() { return Promise.resolve(st()); }, disk_status() { return Promise.resolve(st()); },
    disk_seal_now() { return Promise.resolve(Object.assign(st(), { now: 0 })); }, disk_unseal_all() { return Promise.resolve(st()); } } }; };
async function open(b, url, stub) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); if (stub) await ctx.addInitScript(STUB);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(url, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  return { ctx, p, errs };
}
// the room as she would read it, signed in (the sign-in itself is t_749_disk_page.js's: here only what the room says is checked)
const room = (p, kinds) => p.evaluate(async (kinds) => { if (kinds) window.__kinds = kinds; if (window.IngLock && window.pywebview) { IngLock.active = () => true; IngLock.locked = () => false; }
  if (window.IngDiskSeal) await IngDiskSeal.status();
  try { go('settings'); IngRooms.open('settings', 'security'); } catch (e) {} if (window.IngSecurity) IngSecurity.paint();
  const sv = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'disk'); if (sv) sv.click();
  await new Promise((r) => setTimeout(r, 400)); if (window.IngSecurity) IngSecurity.paint(); if (sv) { const s2 = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'disk'); if (s2) s2.click(); }
  const c = document.getElementById('secCard'); const t = c ? c.textContent.replace(/\s+/g, ' ') : ''; const i = t.indexOf("What the computer apps keep");
  return i >= 0 ? t.slice(i, i + 900) : t.slice(0, 900); }, kinds);
(async () => {
  const b = await pw.chromium.launch();
  // 1. no computer app
  let o = await open(b, URL, false);
  let t = await room(o.p);
  ok(/runs without a computer app/.test(t) && /Fabrica's runs with their records and logs, the apps waiting for your devices, and texts for training are sealed with your password/.test(t),
    'without a computer app: what this release\'s Mac and Windows apps seal, texts for training among them', t);
  ok(/Not sealed yet, the next stage: Fabrica apps kept on a drive\. Kept readable/.test(t) && !/next stage:[^.]*index/.test(t), 'and what is left for the next stage: the drive (7.59: not the index)', t);
  ok(!o.errs.length, 'no error on the page', o.errs); await o.ctx.close();
  // 2. a computer app of 7.50
  o = await open(b, URL, true);
  t = await room(o.p);
  ok(/On\. Fabrica's runs with their records and logs, the apps waiting for your devices, and texts for training: sealed with the same password/.test(t), 'a computer app of 7.50: the room names its records and texts for training as sealed', t);
  ok(/A run or a training still works on plain files while it runs; they are sealed when it ends/.test(t) && /All 5 of its files are sealed/.test(t), 'a run or a training works on plain files while it runs; the count is the app\'s own', t);
  ok(/Not sealed yet, the next stage: Fabrica apps kept on a drive\. Kept readable/.test(t) && !/next stage:[^.]*index/.test(t), 'only the drive is left for later (7.59: not the index)', t);
  // 3. a computer app of 7.49
  t = await room(o.p, ['outbox', 'runs']);
  ok(/On\. Fabrica's runs and their logs, and the apps waiting for your devices: sealed with the same password/.test(t) && /Not sealed yet, the next stage: Fabrica apps kept on a drive and texts for training\./.test(t),
    'a computer app of 7.49: the room keeps 7.49\'s words, never saying it seals more than it does', t);
  ok(!o.errs.length, 'no error on the page', o.errs); await o.ctx.close();
  // 4. an edition without Fabrica
  if (GIFT) {
    o = await open(b, GIFT, true);
    t = await room(o.p);
    ok(/On\. Texts for training: sealed with the same password/.test(t) && /A training still reads its text plain while it trains/.test(t) && !/Fabrica|waiting for your devices|Home Screen/.test(t),
      'an edition without Fabrica (it sends no app to the devices): texts for training only, no runs, no waiting apps, no Home Screen', t);
    ok(!/Not sealed yet/.test(t) && /Kept readable on purpose: your model files\./.test(t), 'nothing left for later (7.59: the index is sealed); only the model files kept readable', t);
    t = await room(o.p, ['outbox', 'runs']);
    ok(/On\. This computer app seals none of its own files yet\./.test(t) && /Not sealed yet, the next stage: texts for training\./.test(t), 'there, with a computer app of 7.49: it seals none of its own files yet, and says so', t);
    ok(!o.errs.length, 'no error on the page', o.errs); await o.ctx.close();
  }
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
