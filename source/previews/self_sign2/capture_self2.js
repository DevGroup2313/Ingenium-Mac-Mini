// Ingenium itself, signed and checked, part two (modules/r355.js, with its hooks in r348), the pictures she sees before anything is
// released: the running app (a test build), a test owner key made by the page's own PermitCore (never hers), and, standing in for the
// computer app and for the iPhone and Fire apps (whose own sides come after her word), small stand-ins that answer the page's calls as
// they will. The page is Ingenium's own; the phone's and tablet's frames are drawn for the pictures. The new parts are ringed in
// Ingenium's violet (her rule: no gold). One picture for each step, each sent on its own at full size (her rule).
//   node capture_self2.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Ingenium owner key, for the pictures only';
const REFUSED = fs.readFileSync(path.join(__dirname, 'refused_mobile.html'), 'utf8');
const crypto = require('crypto');
const H = (n) => 'a3f1c2d4e5b6978877665544332211009988776655443322110f0e0d0c0b0a09'.slice(0, 64 - String(n).length) + n;
// the computer app as it will answer (desktop/app_self_758.py and part two's additions), held in the page for the pictures
const HOST = () => {
  const st = { ok: true, state: 'unsigned', version: '7.64', edition: 'master', build: '', release: '7.64', platform: 'Mac', own: false, keys: [], refused: [], can: true,
    files: { 'ingenium.html': window.__pvPage } };
  let desk = null, mob = null;
  const api = {
    self_check: () => Promise.resolve(JSON.parse(JSON.stringify(st))),
    self_signature_put: (t) => { const j = JSON.parse(t); if (j.kind === 'ingenium-release-signature' && j.release.app === 'ingenium') { desk = t; st.state = 'signed'; st.signed = { made: j.release.made, kid: j.kid }; }
      return Promise.resolve(Object.assign({}, JSON.parse(JSON.stringify(st)), { ok: true })); },
    self_signature_get: () => Promise.resolve(desk ? { ok: true, name: 'ingenium-master-7.64-' + window.__pvPage.sha256.slice(0, 12) + '.ingsig', text: mob ? JSON.stringify({ kind: 'ingenium-release-signatures', v: 1, signatures: [JSON.parse(desk), JSON.parse(mob)] }) : desk } : { ok: false, error: 'This copy is not signed yet.' }),
    self_mobile_fields: () => Promise.resolve({ ok: true, version: '7.64', edition: 'master', files: { 'ingenium.html': { sha256: '9c1e44b07a2d5f6e8b3a4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091', size: 61224310 }, 'carried-ing-apps.txt': { sha256: '5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80919c1e44b07a2d5f6e8b3a4c', size: 21410332 } } }),
    self_mobile_signature_put: (t) => { mob = t; st.mobile_signed = true; return Promise.resolve(Object.assign({}, JSON.parse(JSON.stringify(st)), { ok: true })); },
    self_give_pick: () => Promise.resolve({ ok: true, name: 'ingenium_gift.html', version: '7.64', edition: 'gift',
      files: { 'ingenium.html': window.__pvGift },
      mobile_files: { 'ingenium.html': { sha256: '61b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f6071829304a5b6c7d8e9f', size: 30112004 } } }),
  };
  return { api, st };
};
(async () => {
  // the page under test, read as served: its own fingerprint and size stand for this copy (never 7.63's or another release's)
  const raw = Buffer.from(await (await fetch(URL_)).arrayBuffer()); const PAGE = { sha256: crypto.createHash('sha256').update(raw).digest('hex'), size: raw.length };
  // the gift page's values are invented, and say so in their making: no real release has them
  const GIFT = { sha256: crypto.createHash('sha256').update('an invented gift page, for the pictures only').digest('hex'), size: 41814908 };
  const b = await pw.chromium.launch(); const errs = [];
  const quiet = (pg) => pg.evaluate(() => { if (!document.getElementById('pvQuiet')) { const st = document.createElement('style'); st.id = 'pvQuiet'; st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); }
    try { const a = document.activeElement; if (a && a.blur && a.id !== 'r348Pw') a.blur(); } catch (e) {} });
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; if (sel) sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  const grab = async (pg, file, ringSel, frameSel, pad, vw, vh) => { await quiet(pg); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const box = await pg.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    if (!(box.x1 > box.x0)) { console.log(file, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    const w = Math.min(vw - x, box.x1 - box.x0 + 2 * P), h = Math.min(vh - y, box.y1 - box.y0 + 2 * P);
    // her rule ("There is something wrong with this screenshot": a label cut by an edge): no edge cuts a line of words. A side that would
    // moves out to take the whole line; the top and the foot move in, just clear of it (7.62's rule, previews/app_sign2)
    const e = await pg.evaluate(([x, y, w, h, vw]) => { const rs = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.nodeValue.trim()) continue; const r = document.createRange(); r.selectNodeContents(n);
        for (const q of r.getClientRects()) if (q.width && q.height) rs.push([q.left, q.top, q.right, q.bottom]); }
      // keys, tabs and pills count as words: no edge shows half a key
      document.querySelectorAll('button,[role=tab],[role=button],.sc-chip,.chip,input,select').forEach((k) => { const q = k.getBoundingClientRect(); if (q.width && q.height) rs.push([q.left, q.top, q.right, q.bottom]); });
      // and the top and the foot take a paragraph whole or leave it out: no sentence is shown in part
      const bs = []; document.querySelectorAll('p,li,dd,dt,h1,h2,h3,h4,.sc-fine').forEach((k) => { if (!k.textContent.trim()) return; const q = k.getBoundingClientRect(); if (q.width && q.height) bs.push([q.left, q.top, q.right, q.bottom]); });
      let L = x, T = y, R = x + w, B = y + h;
      for (let pass = 0; pass < 6; pass++) { let moved = false;
        for (const [l, t, r, b] of rs) { if (b <= T || t >= B) continue; if (l < L && r > L) { L = Math.max(0, Math.floor(l) - 20); moved = true; } if (l < R && r > R) { R = Math.min(vw, Math.ceil(r) + 20); moved = true; } }
        for (const [l, t, r, b] of rs.concat(bs)) { if (r <= L || l >= R) continue; if (t < T && b > T) { T = Math.ceil(b) + 4; moved = true; } if (t < B && b > B) { B = Math.floor(t) - 4; moved = true; } }
        if (!moved) break; }
      return { L, T, R, B }; }, [x, y, w, h, vw]);
    const moved = e.L !== x || e.T !== y || e.R !== x + w || e.B !== y + h;
    await pg.screenshot({ path: path.join(OUT, file), clip: { x: e.L, y: e.T, width: e.R - e.L, height: Math.max(40, e.B - e.T) } });
    console.log(file, 'ringed', n, moved ? '(edges moved clear of text: left ' + Math.round(x - e.L) + ', top ' + Math.round(e.T - y) + ', right ' + Math.round(e.R - x - w) + ', foot ' + Math.round(y + h - e.B) + ')' : ''); };
  const boot = async (pg) => { await pg.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await sleep(800); await pg.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); }); };
  const room = async (pg) => { await pg.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(2500);
    for (let i = 0; i < 3; i++) { await pg.evaluate(() => { IngSecurity.view('self'); const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /This copy/.test(x.textContent)); if (w) w.scrollIntoView({ block: 'center' }); }); await sleep(1500);
      if (await pg.evaluate(() => !!document.querySelector('#secCard [data-ss="check"]'))) break; } };

  // ---------- her master copy, on her computer (a Mac window's size) ----------
  const ctx = await b.newContext({ viewport: { width: 1360, height: 1000 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); });
  await ctx.exposeBinding('__pvNoop', () => null);
  const p = await ctx.newPage(); p.on('pageerror', (e) => errs.push('computer: ' + e.message.slice(0, 200)));
  await p.addInitScript(`window.__pvPage=${JSON.stringify(PAGE)};window.__pvGift=${JSON.stringify(GIFT)};window.__pvHost=(${HOST.toString()})();window.pywebview={api:new Proxy(window.__pvHost.api,{get:(t,k)=>k in t?t[k]:(typeof k==='string'?()=>Promise.resolve(null):undefined)})};`);
  await boot(p);
  // a test owner key on this device, as Settings, Licence and permissions keeps hers
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); window.__pvHost.st.keys = [s.kid]; await IngSelfSign._key(); await IngSelfSign.check(true); }, PW);
  await room(p);
  // 1. Sign this release: the card says it signs the copy her phones and tablets carry too
  await p.evaluate(() => { const k = document.querySelector('#secCard [data-ss="sign"]'); k.click(); }); await p.waitForSelector('#r348Ask #r348Pw'); await p.fill('#r348Pw', PW); await sleep(600);
  await p.evaluate(() => { const ps = [...document.querySelectorAll('#r348Ask p')].find((x) => /iPhone, iPad and Fire tablet/.test(x.textContent)); if (ps) ps.classList.add('pv-new'); });
  await grab(p, '1-sign-card.png', '.pv-new', '#r348Ask .sa-card', 40, 1360, 1000);
  await p.click('#r348Yes'); await p.waitForFunction(() => !document.getElementById('r348Ask'), null, { timeout: 60000 }); await sleep(1500); await room(p);
  // 2. signed: one file for every device of hers, and Sign a copy you give
  await p.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /This copy/.test(x.textContent)); w.classList.add('pv-frame'); w.scrollIntoView({ block: 'center' }); window.scrollBy(0, 0);
    const hd = [...document.querySelectorAll('#secCard *')].filter((x) => x.children.length === 0 && x.textContent.trim() === 'Ingenium itself, signed and checked').pop(); if (hd) { hd.parentElement.classList.add('pv-frame'); hd.parentElement.classList.add('pv-head'); }
    const f = [...document.querySelectorAll('#secCard .sc-fine')].find((x) => /phones and tablets/.test(x.textContent)); if (f) f.classList.add('pv-frame'); });
  await grab(p, '2-signed-computer.png', '#secCard [data-ss="give"]|#secCard .sc-fine.pv-frame', '#secCard .pv-frame', 40, 1360, 1000);
  // the phone, the tablet and their refusal page speak of this same signature: its own day, and a build of that day
  const MADE = await p.evaluate(() => (window.__pvHost.st.signed || {}).made || new Date().toISOString());
  const DAY = new Date(MADE).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const BUILD = '7.64.' + String(MADE).slice(0, 10).replace(/-/g, '') + '.1';
  // 7. Sign a copy you give: the gift edition's page, read by the computer app, signed with her key
  await p.evaluate(() => { document.querySelector('#secCard [data-ss="give"]').click(); }); await p.waitForSelector('#r348Ask #r348Pw'); await p.fill('#r348Pw', PW); await sleep(600);
  await grab(p, '7-give-card.png', '#r348Ask p:has(.r355-ed)', '#r348Ask .sa-card', 40, 1360, 1000);
  await p.evaluate(() => { window.saveFileNative = () => Promise.resolve(true); }); await p.click('#r348Yes'); await p.waitForFunction(() => !document.getElementById('r348Ask'), null, { timeout: 60000 }); await sleep(1200);
  await p.evaluate(() => { const s = document.querySelector('#secCard .r348-say'); if (s) s.scrollIntoView({ block: 'center' }); const w = s && s.closest('.sc-well'); if (w) w.classList.add('pv-frame2'); const hd = document.querySelector('#secCard .pv-head'); if (hd) hd.classList.add('pv-frame2'); });
  await grab(p, '8-give-saved.png', '#secCard .r348-say', '#secCard .pv-frame2', 40, 1360, 1000);

  // on the phone: the scroll stops where neither the top bar's lower edge nor the screen's foot cuts a line of words (her rule on edges)
  const clear = (q) => q.evaluate(() => { const vh = innerHeight, y0 = scrollY; let barB = 0;
    for (const el of document.elementsFromPoint(innerWidth / 2, 4)) { const cs = getComputedStyle(el); if (cs.position === 'fixed' || cs.position === 'sticky') barB = Math.max(barB, el.getBoundingClientRect().bottom); }
    const lines = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.nodeValue.trim()) continue; const r = document.createRange(); r.selectNodeContents(n);
      const qs = [...r.getClientRects()].filter((q) => q.width && q.height && q.bottom > -300 && q.top < vh + 300); if (!qs.length) continue;
      let fixed = false; for (let a = n.parentElement; a; a = a.parentElement) { const ps = getComputedStyle(a).position; if (ps === 'fixed' || ps === 'sticky') { fixed = true; break; } }
      if (!fixed) qs.forEach((q) => lines.push([q.top + y0, q.bottom + y0])); }
    const ok = (s) => lines.every(([t, b]) => !((t < s + barB && b > s + barB) || (t < s + vh && b > s + vh)));
    for (let d = 0; d <= 200; d++) for (const s of [y0 + d, y0 - d]) if (s >= 0 && ok(s)) { scrollTo(0, s); return { from: y0, to: s, barB }; }
    return { from: y0, to: y0, barB, none: true }; });
  // ---------- the iPhone (by day) and the Fire tablet (by night): Ingenium's page with the app's own side standing in ----------
  const phone = async (scheme, vw, vh, state, shots) => {
    const c = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, colorScheme: scheme, isMobile: vw < 600, hasTouch: true }); const q = await c.newPage();
    q.on('pageerror', (e) => errs.push('device: ' + e.message.slice(0, 200)));
    await boot(q);
    await q.evaluate(({ state, dev, made, build }) => { const st = Object.assign({ ok: true, version: '7.64', edition: 'master', build, release: '7.64', platform: dev, own: false, keys: ['k'], refused: [], can: true, mobile: true,
        files: { 'ingenium.html': { sha256: '9c1e44b07a2d5f6e8b3a4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091', size: 61224310 } } }, state);
      window.__pvDev = st; window.INB = { platform: 'apple', on: () => () => {}, call: (m, a) => {
        if (m === 'selfCheck') return Promise.resolve(JSON.parse(JSON.stringify(window.__pvDev)));
        if (m === 'selfSignaturePut') { window.__pvDev.state = 'signed'; window.__pvDev.signed = { made }; return Promise.resolve(Object.assign({ ok: true }, JSON.parse(JSON.stringify(window.__pvDev)))); }
        if (m === 'selfSignatureGet') return Promise.resolve({ ok: false });
        return Promise.reject(new Error('Unknown request: ' + m)); } };
      }, { state, dev: vw < 600 ? 'iPhone' : 'Fire tablet', made: MADE, build: BUILD });
    await q.evaluate(() => IngSelfSign.check(true)); await room(q);
    for (const [file, fn] of shots) { await fn(q); await sleep(900); await quiet(q); await q.screenshot({ path: path.join(OUT, 'raw-' + file) }); console.log(file, 'taken'); }
    await c.close(); };
  await phone('light', 390, 844, { state: 'unsigned' }, [
    ['3-phone-unsigned.png', async (q) => { await q.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /This copy/.test(x.textContent)); w.scrollIntoView({ block: 'start' }); window.scrollBy(0, -60); }); console.log('3 scroll', JSON.stringify(await clear(q))); await ring(q, '#secCard [data-ss="bring"]'); }],
    ['4-phone-signed.png', async (q) => { await q.evaluate(() => IngSelfSign.put(JSON.stringify({ kind: 'ingenium-release-signatures', v: 1, signatures: [] }))); await sleep(1500); await room(q);
      await q.evaluate(() => { const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /This copy/.test(x.textContent)); w.scrollIntoView({ block: 'start' }); window.scrollBy(0, -60); }); console.log('4 scroll', JSON.stringify(await clear(q))); await ring(q, '#secCard .sc-chip.ok'); }],
  ]);
  // 5 and 6: a copy that is not the one signed, refused at start: the app's own page in Ingenium's place
  const refused = async (scheme, vw, vh, file, dev) => {
    const c = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, colorScheme: scheme }); const q = await c.newPage();
    const rows = '<p class="nm">ingenium.html</p><dl><dt>You signed</dt><dd><code>9c1e44b0 7a2d5f6e … 6e7f8091</code> · 61,224,310 bytes</dd><dt>It is now</dt><dd><code>e07b13aa 41c9d02f … 1f3c9a77</code> · 61,230,118 bytes</dd></dl>';
    await q.setContent(REFUSED.replace('{{LEAD}}', 'This copy of Ingenium is not the one you signed on ' + DAY + ': a file in it changed since. Nothing of the changed file ran.').replace('{{ROWS}}', rows).split('{{DEVICE}}').join(dev));
    await sleep(1200); await q.screenshot({ path: path.join(OUT, 'raw-' + file) }); console.log(file, 'taken'); await c.close(); };
  await refused('light', 390, 844, '5-phone-refused.png', 'iPhone');
  await refused('dark', 1024, 640, '6-tablet-refused.png', 'Fire tablet');
  // each device picture in the frame drawn for it
  for (const f of fs.readdirSync(OUT).filter((x) => x.startsWith('raw-'))) {
    const key = f.slice(4), tablet = /tablet/.test(key), dark = tablet, img = 'data:image/png;base64,' + fs.readFileSync(path.join(OUT, f)).toString('base64');
    const c = await b.newContext({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 2 }); const q = await c.newPage();
    const frame = tablet ? `<div class="dev tab"><div class="scr"><img src="${img}" style="width:1024px;height:640px"></div></div>`
      : `<div class="dev phone"><div class="scr"><img src="${img}" style="width:390px;height:844px"></div></div>`;
    const css = `body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:${dark ? '#16121d' : '#f1eef6'}}img{display:block}
      .phone{padding:14px;border-radius:62px;background:#111;box-shadow:0 0 0 2px #3a3a3e,0 26px 60px rgba(0,0,0,.45)} .phone .scr{border-radius:48px;overflow:hidden;position:relative}
      .phone .isl{position:absolute;top:11px;left:50%;width:120px;height:34px;margin-left:-60px;border-radius:20px;background:#000;z-index:2}
      .tab{padding:22px;border-radius:30px;background:#1b1b1f;box-shadow:0 0 0 2px #3a3a3e,0 26px 60px rgba(0,0,0,.6)} .tab .scr{border-radius:10px;overflow:hidden}`;
    await q.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${frame}</body></html>`); await sleep(500);
    await q.screenshot({ path: path.join(OUT, key), clip: await q.evaluate(() => { const r = document.querySelector('.dev').getBoundingClientRect(); const P = 36; return { x: Math.max(0, r.left - P), y: Math.max(0, r.top - P), width: r.width + 2 * P, height: r.height + 2 * P }; }) });
    await c.close(); fs.rmSync(path.join(OUT, f)); }
  console.log(JSON.stringify(errs)); await b.close();
})();
