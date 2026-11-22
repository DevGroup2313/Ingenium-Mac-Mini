// Every app opens in the preview (modules/r358.js) and Clear the preview (modules/r359.js), with three light designs for the preview's
// More: the pictures she sees before anything is released, from the running app (a test build) and, for "before", the released 7.68.
// Lakay as the page carries it (its practice store, with sample goods only); nothing of hers. The new parts are ringed in Ingenium's
// violet (her rule: no gold), and no edge of a picture cuts through a line of words.
//   node capture_stage.js <test page url> <released page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const zlib = require('zlib');
const [URL_, OLD, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1500, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const LAKAY = zlib.gunzipSync(fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'apps', 'builtin', 'lakay.html.gz'))).toString('utf8');
// three light designs for the More menu (only the look of its rows changes; what each does stays)
const DESIGNS = {
  a: `#csMenu{padding:8px!important;border-radius:16px!important}
#csMenu .menu-btn{margin-top:2px!important;border:0!important;background:transparent!important;box-shadow:none!important;border-radius:10px!important;padding:9px 12px!important;font-weight:600!important}
#csMenu .menu-btn:hover{background:linear-gradient(180deg,var(--card-hi),var(--card-lo))!important;box-shadow:0 1px 1px rgba(40,20,70,.08),0 4px 10px rgba(40,20,70,.10)!important;transform:translateY(-1px)!important;color:var(--accent-deep)!important}
body[data-theme="night"] #csMenu .menu-btn:hover{box-shadow:0 1px 1px rgba(0,0,0,.4),0 4px 10px rgba(0,0,0,.3)!important;color:var(--accent-bright)!important}
#csMenu .ctx-sep{margin:6px 10px!important}`,
  b: `#csMenu{padding:8px!important;border-radius:16px!important}
#csMenu .menu-btn{margin-top:4px!important;border:0!important;border-radius:10px!important;padding:9px 12px!important;font-weight:600!important;background:linear-gradient(180deg,rgba(106,63,181,.05),rgba(106,63,181,.025))!important;box-shadow:inset 0 1px 2px rgba(40,20,70,.10),inset 0 -1px 0 rgba(255,255,255,.7)!important}
body[data-theme="night"] #csMenu .menu-btn{background:rgba(255,255,255,.04)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.45),inset 0 -1px 0 rgba(255,255,255,.04)!important}
#csMenu .menu-btn:hover{background:linear-gradient(180deg,var(--card-hi),var(--card-lo))!important;box-shadow:0 1px 1px rgba(40,20,70,.08),0 4px 10px rgba(40,20,70,.10)!important;transform:translateY(-1px)!important;color:var(--accent-deep)!important}
#csMenu .ctx-sep{margin:7px 10px!important}`,
  c: `#csMenu{padding:8px!important;border-radius:16px!important}
#csMenu .menu-btn{margin-top:4px!important;border:0!important;border-radius:10px!important;padding:8px 12px!important;font-weight:600!important;background:linear-gradient(180deg,var(--card-hi),var(--card-lo))!important;box-shadow:0 1px 2px rgba(40,20,70,.10),0 0 0 1px rgba(106,63,181,.07)!important}
body[data-theme="night"] #csMenu .menu-btn{box-shadow:0 1px 2px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.05)!important}
#csMenu .menu-btn:hover{box-shadow:0 2px 6px rgba(40,20,70,.14),0 0 0 1px rgba(106,63,181,.12)!important;transform:translateY(-1px)!important;color:var(--accent-deep)!important}
#csMenu .ctx-sep{margin:6px 10px!important}`
};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  const errs = [];
  const quiet = (pg, keepToast) => pg.evaluate((k) => { let st = document.getElementById('pvQuiet'); if (!st) { st = document.createElement('style'); st.id = 'pvQuiet'; document.head.appendChild(st); }
    st.textContent = k ? '' : '#ingToast{display:none!important}'; try { const a = document.activeElement; if (a && a.blur && a.tagName !== 'INPUT') a.blur(); } catch (e) {} }, !!keepToast);
  const ring = (pg, sel) => pg.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.head.appendChild(st); }
    if (!sel) return 0; const els = []; sel.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { if (e.getClientRects().length) els.push(e); })); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  // the edges of a picture are kept clear of every line of words (in the page and in the preview's own frame)
  const grab = async (pg, key, ringSel, frameSel, o) => { o = o || {}; await quiet(pg, o.keepToast); await sleep(500); const n = await ring(pg, ringSel); await sleep(700);
    const inner = [];
    for (const fr of pg.frames()) { if (fr === pg.mainFrame()) continue; try { const el = await fr.frameElement(); const box = await el.boundingBox(); if (!box) continue;
      const ls = await fr.evaluate(() => { const out = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let t = tw.nextNode(); t; t = tw.nextNode()) { if (!t.nodeValue.trim()) continue; const rr = document.createRange(); rr.selectNodeContents(t);
          for (const q of rr.getClientRects()) if (q.width && q.height) out.push({ left: q.left, right: q.right, top: q.top, bottom: q.bottom }); } return out; });
      ls.forEach((q) => inner.push({ left: q.left + box.x, right: q.right + box.x, top: q.top + box.y, bottom: q.bottom + box.y })); } catch (e) {} }
    const r = await pg.evaluate(([frameSel, PX, PY, VW, VH, inner]) => {
      const boxOf = (s) => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; s.split('|').forEach((q) => document.querySelectorAll(q).forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width) return;
        x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); })); return { x0, y0, x1, y1 }; };
      const f = boxOf(frameSel); if (!(f.x1 > f.x0)) return null; const rg = document.querySelector('.pv-ring') ? boxOf('.pv-ring') : f;
      const must = { x0: Math.min(f.x0, rg.x0 - 8), y0: Math.min(f.y0, rg.y0 - 8), x1: Math.max(f.x1, rg.x1 + 8), y1: Math.max(f.y1, rg.y1 + 8) };
      let L = Math.max(0, f.x0 - PX), R = Math.min(VW, f.x1 + PX), T = Math.max(0, f.y0 - PY), B = Math.min(VH, f.y1 + PY);
      const lines = inner.slice(); const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let t = tw.nextNode(); t; t = tw.nextNode()) { if (!t.nodeValue.trim()) continue; const rr = document.createRange(); rr.selectNodeContents(t);
        for (const q of rr.getClientRects()) if (q.width && q.height) lines.push(q); }
      let moved = 0;
      for (let i = 0; i < 8; i++) { let ch = false; const inY = (q) => q.bottom > T + 1 && q.top < B - 1, inX = (q) => q.right > L + 1 && q.left < R - 1;
        for (const q of lines) {
          if (inX(q) && q.top < T && q.bottom > T) { const v = Math.min(Math.ceil(q.bottom) + 3, must.y0); if (v > T) { T = v; ch = true; } }
          if (inX(q) && q.top < B && q.bottom > B) { const v = Math.max(Math.floor(q.top) - 3, must.y1); if (v < B) { B = v; ch = true; } }
          if (inY(q) && q.left < L && q.right > L) { const v = Math.min(Math.ceil(q.right) + 3, must.x0); if (v > L) { L = v; ch = true; } }
          if (inY(q) && q.left < R && q.right > R) { const v = Math.max(Math.floor(q.left) - 3, must.x1); if (v < R) { R = v; ch = true; } } }
        if (!ch) break; moved++; }
      return { x: L, y: T, width: R - L, height: B - T, moved }; }, [frameSel, o.padX != null ? o.padX : (o.pad != null ? o.pad : 30), o.padY != null ? o.padY : (o.pad != null ? o.pad : 30), VW, VH, inner]);
    if (!r) { console.log(key, 'NOT TAKEN: nothing of', frameSel, 'is on screen'); return; }
    await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: r.x, y: r.y, width: r.width, height: r.height } }); console.log(key, 'ringed', n, r.moved ? '(edges moved clear of text)' : ''); };
  const open = async (url) => { const p = await ctx.newPage(); p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); });
    await p.evaluate(() => { state.theme = 'day'; applyTheme(); try { saveState(); } catch (e) {} }); await sleep(600); return p; };
  const stage = async (p) => (await p.$('#csFrame')).contentFrame();
  const waitIn = async (p, re, ms) => { const end = Date.now() + (ms || 30000); while (Date.now() < end) { const fr = await stage(p); const t = fr ? await fr.evaluate(() => document.body ? document.body.innerText : '').catch(() => '') : ''; if (re.test(t)) return true; await sleep(300); } return false; };
  const showLakay = async (p) => { await p.evaluate((h) => { go('chat'); try { newChat(); } catch (e) {} csShow({ kind: 'file', html: h, name: 'Lakay.html', storeKey: 'pictures:lakay' }, { user: true }); }, LAKAY); await sleep(800); };

  // 1. before: the released 7.68
  const p0 = await open(OLD); await showLakay(p0); await waitIn(p0, /cannot keep its books/, 30000); await sleep(1200);
  await grab(p0, '1-before', '', '#csPane', { pad: 0 }); await p0.close();
  // 2. now: Lakay's door, in the same place
  const p = await open(URL_); await showLakay(p); await waitIn(p, /Enter/, 30000); await sleep(1500);
  await grab(p, '2-door', '#csFrameWrap', '#csPane', { pad: 0 });
  // 3. Enter: the practice store, every room
  await (await stage(p)).click('text=Enter'); await waitIn(p, /Welcome to the practice store/, 30000); await sleep(2000);
  await grab(p, '3-practice', '#csFrameWrap', '#csPane', { pad: 0 });
  // 4. the page run again (as after an edit): the same books
  await p.evaluate(() => { csCur._ran = null; csRender(); }); await waitIn(p, /Enter/, 30000); await (await stage(p)).click('text=Enter'); await waitIn(p, /Welcome to the practice store/, 30000); await sleep(1500);
  // 5. More, with Clear the preview
  await p.click('#csMore'); await sleep(900);
  await grab(p, '4-more-clear', '#csClear', '#csMenu|#csBar', { pad: 16 });
  // 6. the current look of More's rows, and the three designs
  await p.evaluate(() => { const k = document.getElementById('csClear'); if (k) k.classList.remove('pv-ring'); });
  await grab(p, '6-more-now', '', '#csMenu|#csBar', { pad: 16 });
  for (const k of ['a', 'b', 'c']) {
    await p.evaluate(([css]) => { let st = document.getElementById('pvDesign'); if (!st) { st = document.createElement('style'); st.id = 'pvDesign'; document.head.appendChild(st); } st.textContent = css; }, [DESIGNS[k]]);
    await sleep(500); await p.hover('#csFold'); await sleep(500);
    await grab(p, '7-design-' + k, '', '#csMenu|#csBar', { pad: 16 });
    await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(900); await p.hover('#csFold'); await sleep(400);
    await grab(p, '8-design-' + k + '-night', '', '#csMenu|#csBar', { pad: 16 });
    await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await sleep(700); }
  await p.evaluate(() => { const st = document.getElementById('pvDesign'); if (st) st.textContent = ''; });
  // 7. cleared
  await p.click('#csClear'); await p.mouse.move(4, 4); await sleep(1400);
  await grab(p, '5-cleared', '#csEmpty', '#csPane', { pad: 0 });
  fs.writeFileSync(path.join(OUT, 'errors.txt'), errs.join('\n'));
  console.log('page errors:', errs.length); await b.close();
})().catch((e) => { console.log('FAILED', e && e.stack || e); process.exit(1); });
