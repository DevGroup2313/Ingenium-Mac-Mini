// Your apps signed when shipped, part two (modules/r352.js and the shells' check, 7.62): the pictures she sees before anything is built
// into a release, from the running app (a test build) with invented apps (Tide Clock, made by git; Harbour Notes, a page) and a test owner
// key made by the page's own PermitCore (never hers). The new parts are ringed in Ingenium's violet (her rule: no gold). The device
// pictures show the shells' own page (source/shells/common/refused.html, filled as each shell fills it) in a window drawn for the picture.
//   node capture_app_sign2.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the pictures only';
const REFUSED = fs.readFileSync(path.join(__dirname, '..', '..', 'shells', 'common', 'refused.html'), 'utf8');
const escH = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fill = (name, file, why) => REFUSED.split('{{NAME}}').join(escH(name)).split('{{FILE}}').join(escH(file)).split('{{WHY}}').join(escH(why));
(async () => {
  const W = path.join(OUT, 'tide'); fs.mkdirSync(W, { recursive: true });
  const git = (a) => cp.execFileSync('git', a, { cwd: W, encoding: 'utf8', env: Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Example', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Example', GIT_COMMITTER_EMAIL: 'ada@example.invalid' }) });
  fs.writeFileSync(path.join(W, 'index.html'), '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n<style>body{font:16px/1.5 Georgia,serif;margin:40px;color:#123}h1{color:#235}</style>\n</head>\n<body>\n<h1 id="h">Tide Clock</h1>\n<p>Next high water at the harbour: 18:42.</p>\n</body>\n</html>\n');
  git(['init', '-q', '-b', 'main']); git(['add', '-A']); git(['commit', '-qm', 'Tide Clock, the first version']); git(['bundle', 'create', '-q', path.join(OUT, 'tide.bundle'), '--all']);
  fs.writeFileSync(path.join(OUT, 'Harbour Notes.html'), '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Harbour Notes</title>\n</head>\n<body>\n<h1>Harbour Notes</h1>\n<p>Moorings, tides and the day\'s notes.</p>\n</body>\n</html>\n');
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const quiet = (pg) => pg.evaluate(() => { if (!document.getElementById('pvQuiet')) { const st = document.createElement('style'); st.id = 'pvQuiet'; st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); }
    try { const a = document.activeElement; if (a && a.blur && !/^(r349Pw|r352Leave)$/.test(a.id)) a.blur(); } catch (e) {} });
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  const grab = async (pg, key, ringSel, frameSel, pad, vw, vh) => { await quiet(pg); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const box = await pg.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; }, frameSel);
    if (!(box.x1 > box.x0)) { console.log(key, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    const P = pad == null ? 30 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    const w = Math.min((vw || VW) - x, box.x1 - box.x0 + 2 * P), h = Math.min((vh || VH) - y, box.y1 - box.y0 + 2 * P);
    // her rule from the pictures she sent back: no edge cuts through a line of words. An edge that would is moved just clear of it,
    // inwards (the top down, the bottom up), so a picture never shows half a label
    const cut = await pg.evaluate(([x, y, w, h]) => { const lines = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.nodeValue.trim()) continue; const r = document.createRange(); r.selectNodeContents(n);
        for (const q of r.getClientRects()) if (q.width && q.right > x && q.left < x + w && q.bottom > y - 1 && q.top < y + h + 1) lines.push([q.top, q.bottom]); }
      let top = y, bot = y + h;
      for (const [t, b] of lines) if (t < top && b > top) top = Math.max(top, Math.ceil(b) + 4);
      for (const [t, b] of lines) if (t < bot && b > bot) bot = Math.min(bot, Math.floor(t) - 4);
      return { top, bot }; }, [x, y, w, h]);
    const y2 = cut.top, h2 = Math.max(40, cut.bot - cut.top);
    console.log(key, 'ringed', n, y2 !== y || h2 !== h ? '(edges moved clear of text: ' + Math.round(y2 - y) + ' px at the top, ' + Math.round((y + h) - (y2 + h2)) + ' at the foot)' : '');
    await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y: y2, width: w, height: h2 } }); };
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2000);
  await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); IngPermit.keys.push({ kid: s.kid, jwk: { kty: 'EC', crv: 'P-256', x: s.pub.x, y: s.pub.y } }); }, PW);
  // 1. the Security room: Signed with your key, its new words (once the room has read the test key, so it says On)
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('code'); }); await sleep(3000);
  await p.waitForFunction(() => { try { return IngAppSign.state() === 'on'; } catch (e) { return false; } }, null, { timeout: 60000, polling: 1000 }).catch(() => console.log('room: the key was not read'));
  for (let tries = 0; tries < 3; tries++) {
    await p.evaluate(() => { IngSecurity.view('code'); }); await sleep(2500);
    await p.evaluate(() => { const t = document.querySelector('#secCard .sc-subs'); if (t) t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -110);
      const w = [...document.querySelectorAll('#secCard .sc-well')].find((x) => /Signed with your key/.test(x.textContent)); if (w) w.classList.add('pv-signwell'); }); await sleep(600);
    if (await p.evaluate(() => { const w = document.querySelector('.pv-signwell'); return !!(w && w.getBoundingClientRect().width); })) break;
  }
  await grab(p, '1-room', '.pv-signwell', '#secCard .sc-subs|.pv-signwell', 24);
  // 2. Package details: Signed with your owner key, its new words
  await p.evaluate(() => go('fabrica')); await sleep(1200);
  const b64 = fs.readFileSync(path.join(OUT, 'tide.bundle')).toString('base64');
  const id = await p.evaluate(async (b64) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const r = await IngRepo.fromBundle(u8, { name: 'Tide Clock' }); fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.setPanel('ship'); fbHubHost.paint(); return r.id; }, b64);
  await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbPkg button')].find((x) => x.textContent.trim() === 'Package details'); k.click(); }); await sleep(900);
  await p.evaluate(() => { const r = document.querySelector('.r349-row'); if (r) r.scrollIntoView({ block: 'center' }); }); await sleep(600);
  await grab(p, '2-package-details', '.r349-row', '.r349-row', 150);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Keep these' && x.offsetParent); k.click(); }); await sleep(700);
  // the page, signed with the test key, as Ship makes it; and a copy of it with one word changed
  const made = p.evaluate((id) => IngShip.onePage(id, { target: 'page' }).then((x) => x.html), id);
  await p.waitForSelector('#r349Ask'); await sleep(400); await p.fill('#r349Pw', PW); await p.click('#r349Yes'); const html = await made;
  fs.writeFileSync(path.join(OUT, 'Tide Clock.html'), html);
  fs.writeFileSync(path.join(OUT, 'Tide Clock, changed.html'), html.replace('Next high water', 'Next low water'));
  // 3 to 6. each device's app, given the changed copy: the shell's own page, by day and by night
  const devices = [
    ['3-mac', 'light', 'mac', 'changed since it was signed'],
    ['4-windows-night', 'dark', 'win', 'changed since it was signed'],
    ['5-fire', 'light', 'fire', 'changed since it was signed'],
    ['6-iphone-night', 'dark', 'phone', 'has lost its signature'],
  ];
  for (const [key, scheme, kind, why] of devices) {
    const c = await b.newContext({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2, colorScheme: scheme }); const q = await c.newPage();
    const doc = fill('Tide Clock', 'index.html', why);
    const frames = {
      mac: `<div class="dev mac"><div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><b>Tide Clock</b></div><iframe srcdoc="${escH(doc)}" style="width:980px;height:660px"></iframe></div>`,
      win: `<div class="dev win"><div class="bar"><span class="ic">T</span><b>Tide Clock</b><span class="cap">&#x2014;</span><span class="cap">&#x2610;</span><span class="cap x">&#x2715;</span></div><iframe srcdoc="${escH(doc)}" style="width:980px;height:660px"></iframe></div>`,
      fire: `<div class="dev fire"><div class="scr"><div class="sb"><span>18:42</span><span>&#x25AE;&#x25AE;&#x25AE; 82%</span></div><iframe srcdoc="${escH(doc)}" style="width:1080px;height:640px"></iframe></div></div>`,
      phone: `<div class="dev phone"><div class="scr"><div class="isl"></div><div class="sb"><span>18:42</span><span>82%</span></div><iframe srcdoc="${escH(doc)}" style="width:390px;height:790px"></iframe></div></div>`,
    };
    const css = `body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:${scheme === 'dark' ? '#16121d' : '#f1eef6'};font:13px -apple-system,"Segoe UI",system-ui,sans-serif}
      iframe{display:block;border:0;background:transparent}
      .mac{border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.18),0 22px 60px rgba(30,20,50,.35),0 4px 12px rgba(30,20,50,.2)}
      .mac .bar{height:38px;display:flex;align-items:center;gap:8px;padding:0 14px;background:linear-gradient(#ececec,#dedede);border-bottom:1px solid #c9c9c9;position:relative}
      .mac .bar i{width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 .5px rgba(0,0,0,.25)} .mac .bar b{position:absolute;left:0;right:0;text-align:center;font-weight:600;color:#3c3c3c;pointer-events:none}
      .win{border-radius:8px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 24px 60px rgba(0,0,0,.6)}
      .win .bar{height:34px;display:flex;align-items:center;gap:10px;padding-left:12px;background:#202020;color:#f1f1f1}
      .win .bar .ic{width:16px;height:16px;border-radius:4px;background:linear-gradient(135deg,#7348be,#3a2070);color:#fff;font:700 10px/16px Georgia,serif;text-align:center}
      .win .bar b{flex:1;font-weight:400;font-size:12px} .win .cap{width:46px;height:34px;display:grid;place-items:center;color:#e6e6e6;font-size:12px} .win .cap.x{font-size:13px}
      .fire{padding:26px 34px;border-radius:34px;background:#1b1b1d;box-shadow:0 0 0 2px #333,0 26px 60px rgba(30,20,50,.4)} .fire .scr{border-radius:6px;overflow:hidden;background:#fff}
      .fire .sb,.phone .sb{height:24px;display:flex;justify-content:space-between;align-items:center;padding:0 14px;font-size:12px;font-weight:600}
      .fire .sb{background:#2b2b2e;color:#f1f1f1}
      .phone{padding:14px;border-radius:62px;background:#111;box-shadow:0 0 0 2px #3a3a3e,0 26px 60px rgba(0,0,0,.6)} .phone .scr{border-radius:48px;overflow:hidden;position:relative;background:#1b1326}
      .phone .sb{height:54px;padding:0 34px;color:#f1ecf8;font-size:15px;background:#1b1326} .phone .isl{position:absolute;top:11px;left:50%;width:120px;height:34px;margin-left:-60px;border-radius:20px;background:#000;z-index:2}`;
    await q.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${frames[kind]}</body></html>`); await sleep(1800);
    await q.screenshot({ path: path.join(OUT, key + '.png'), clip: await q.evaluate(() => { const r = document.querySelector('.dev').getBoundingClientRect(); const P = 36; return { x: Math.max(0, r.left - P), y: Math.max(0, r.top - P), width: r.width + 2 * P, height: r.height + 2 * P }; }) });
    console.log(key, 'taken'); await c.close();
  }
  // 7. Lector's tiles of her apps: the two apps added, each with its mark under its name (a taller window, so every tile is in view)
  await p.setViewportSize({ width: VW, height: 2000 }); await p.evaluate(() => { go('lector'); }); await sleep(2500);
  const add = (files) => p.evaluate(async (files) => { const list = files.map(([n, b64]) => { const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); return new File([u8], n, { type: 'text/html' }); });
    await libAddFiles(list); }, files.map((n) => [n, fs.readFileSync(path.join(OUT, n)).toString('base64')]));
  const mine = () => p.evaluate(() => { document.querySelectorAll('.pv-mine').forEach((x) => x.classList.remove('pv-mine')); const s = [...document.querySelectorAll('#l7Bf .l-sec')].find((x) => /Your apps/.test((x.querySelector('h3') || {}).textContent || ''));
    if (s) { s.classList.add('pv-mine'); const sc = s.closest('.l-pn-b'); if (sc) sc.scrollTop += s.getBoundingClientRect().top - sc.getBoundingClientRect().top - 6; } return !!s; });
  await add(['Tide Clock.html', 'Harbour Notes.html']); await sleep(3000);
  console.log('tiles', await mine(), await p.evaluate(() => [...document.querySelectorAll('#l7Bf .l-app')].map((x) => x.textContent.replace(/\s+/g, ' ').trim()).join(' | ')));
  console.log('library note', await p.evaluate(() => (document.getElementById('libNote') || {}).textContent));
  await grab(p, '7-library', '#l7Bf .l-app .r352-sig', '.pv-mine', 18, VW, 2000);
  // 8. the changed copy, added: the card that asks, open on Leave it out
  const adding = add(['Tide Clock, changed.html']);
  await p.waitForSelector('#r349Ask #r352Leave', { timeout: 60000 }); await sleep(900);
  await grab(p, '8-changed', '#r349Ask .r349-state', '#r349Ask .sa-card', 60, VW, 2000);
  await ring(p, 'none'); await p.click('#r352Leave'); await adding; await sleep(2000);
  // 9. what the brief says after: left out, as she chose
  await mine(); await sleep(600);
  console.log('library note after', await p.evaluate(() => (document.getElementById('libNote') || {}).textContent));
  await p.evaluate(() => { const n = document.getElementById('libNote'), sc = n && n.closest('.l-pn-b'); if (sc) sc.scrollTop += n.getBoundingClientRect().bottom - sc.getBoundingClientRect().bottom + 40; }); await sleep(500);
  await grab(p, '9-left-out', '#libNote', '.pv-mine', 18, VW, 2000);
  // 10. by night: the tiles' marks
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); saveState(); try { IngLector.render(); } catch (e) {} }); await sleep(1800);
  await mine(); await sleep(600);
  await grab(p, '10-library-night', '#l7Bf .l-app .r352-sig', '.pv-mine', 18, VW, 2000);
  console.log(JSON.stringify(errs)); await b.close();
})();
