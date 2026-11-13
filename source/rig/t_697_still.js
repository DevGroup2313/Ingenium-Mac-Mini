// Ingenium 6.97: the heads' keys and objects act where they stand and never move the page. Her word (6.95): "please remove the
// scrolling down the page effect from it and everywhere else. I dislike it." On 6.96 these still moved it: on Folders, "A folder for
// another app" (252 px), "Bring in your work" (980 px) and a folder pressed in the drawer; on Blend, a wheel pressed; on Models, "Get one
// of Ingenium's models" (605 px); on Fabrica, a version pressed on the tree (619 px; rig/t_696_fabrica_head.js checks that one).
// Checks: each of these leaves the page where it was and still does its work; when what it opened is out of the window, a line says
// where (Bring in your work); and every key in the heads of eight pages leaves the page where it was. Invented folders and models only.
// usage: node rig/t_697_still.js <page url> <out folder>
const pw = require('playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_697_still.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await sleep(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme();
    ['Lantern', 'Ingenium', 'Quill'].forEach(n => IngFolders.make(n));
    state.folders = state.folders || { how: '', ui: {} }; state.folders.ui = state.folders.ui || {}; state.folders.ui.open = null;
    state.models = (state.models || []).filter(m => !/^t697-/.test(m.id));
    state.models.push({ id: 't697-a', name: 'Magister 9B', type: 'GGUF', paramB: 9, color: '#a65', ctx: 8192 }, { id: 't697-b', name: 'Scriba 4B', type: 'GGUF', paramB: 4, color: '#5a6', ctx: 8192 });
    const bl = blState(); bl.ids = ['t697-a', 't697-b']; bl.cx = []; bl.strategy = 'synth'; bl.writer = 'auto'; saveState();
    window.__said = []; const t = window.ingToast; window.ingToast = function (m) { window.__said.push(String(m)); try { return t && t.apply(this, arguments); } catch (e) {} }; });
  const top = () => p.evaluate(() => document.scrollingElement.scrollTop);
  const open = async pg => { await p.evaluate(pg => { go(pg); document.scrollingElement.scrollTop = 0; window.__said = []; }, pg); await sleep(1400); await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(200); };

  // Folders: a folder for another app
  await open('folders');
  await p.evaluate(() => document.getElementById('fdNewKey').click()); await sleep(1300);
  const f1 = await p.evaluate(() => ({ top: document.scrollingElement.scrollTop, focus: (document.activeElement || {}).id || (document.activeElement || {}).className, adding: !!(state.folders.ui || {}).adding }));
  ok(f1.top === 0 && f1.adding && /fldAddName|fld-more/.test(f1.focus), 'Folders: "A folder for another app" opens its name below and the page stays', f1);
  // Folders: bring in your work (its card is out of the window: a line says where)
  await open('folders');
  await p.evaluate(() => document.getElementById('fdBringKey').click()); await sleep(1300);
  const f2 = await p.evaluate(() => { const w = document.querySelector('#page-folders .fd-bwrap'), sh = w && w.querySelector('.fd-bsheet'), r = sh && sh.getBoundingClientRect();
    return { top: document.scrollingElement.scrollTop, panel: !!w, fixed: w ? getComputedStyle(w).position : null, inWindow: r ? (r.top >= 0 && r.bottom <= innerHeight + 1) : null,
      ways: w ? w.querySelectorAll('.fd-bway').length : 0, keys: w ? w.querySelectorAll('.fd-bacts .btn').length : 0, title: sh ? (sh.querySelector('h3') || {}).textContent : null }; });
  ok(f2.top === 0, 'Folders: "Bring in your work" leaves the page where it was', f2);
  // 7.00, her words: "please you should make the "Bring in your work" on Folders open in a panel over the page, the way Fabrica's "New app" does"
  ok(f2.panel && f2.fixed === 'fixed' && f2.inWindow && f2.ways >= 3 && f2.keys >= f2.ways && f2.title === 'Bring in your work', 'it opens in a panel over the page, in the window, with every way and its keys (7.00)', f2);
  await p.keyboard.press('Escape'); await sleep(300);
  const f2b = await p.evaluate(() => ({ panel: !!document.querySelector('#page-folders .fd-bwrap'), top: document.scrollingElement.scrollTop }));
  ok(!f2b.panel && f2b.top === 0, 'Escape closes the panel, and the page is where it was', f2b);
  // Folders: a folder pressed in the drawer
  await open('folders');
  const f3 = await p.evaluate(() => { const f = document.querySelector('#page-folders .fd-file'); if (!f) return null; f.click(); return true; }); await sleep(1300);
  const f3b = await p.evaluate(() => ({ top: document.scrollingElement.scrollTop, open: (state.folders.ui || {}).open || null }));
  ok(f3 && f3b.top === 0 && !!f3b.open, 'Folders: a folder pressed in the drawer opens below and the page stays', f3b);
  await p.evaluate(() => { state.folders.ui.open = null; saveState(); });

  // Blend: a wheel pressed opens step I at its row
  await p.evaluate(() => { go('blend'); try { IngRooms.open('blend', 'new'); } catch (e) {} renderBlend(); }); await sleep(2200);
  await p.evaluate(() => { document.scrollingElement.scrollTop = 0; document.querySelector('.rm-step[data-step="2"]').click(); }); await sleep(500);
  await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(200);
  const hb = await (await p.$('#page-blend .bx-w:not(.bx-cw):not(.bx-ghostw) .bx-hit')).boundingBox();
  await p.mouse.click(hb.x + hb.width / 2, hb.y + hb.height / 2); await sleep(700);
  const bl = await p.evaluate(() => ({ top: document.scrollingElement.scrollTop, step: document.getElementById('page-blend').getAttribute('data-rm-step'), seen: !!document.querySelector('#blendPick .bl-model.bx-seen') }));
  ok(bl.top === 0 && bl.step === '1' && bl.seen, 'Blend: a wheel pressed opens step I at its row, and the page stays', bl);

  // Models: get one of Ingenium's models
  await open('models');
  const mk = await p.evaluate(() => { const k = [...document.querySelectorAll('#page-models button')].find(x => /^Get one of Ingenium/.test(x.textContent.trim())); if (!k) return null; k.click(); return k.textContent.trim(); }); await sleep(1200);
  const md = await p.evaluate(() => { const t = document.getElementById('rmT-models-get'); return { top: document.scrollingElement.scrollTop, get: t ? t.getAttribute('aria-selected') : null }; });
  ok(!!mk && md.top === 0 && md.get === 'true', 'Models: "Get one of Ingenium\'s models" opens the Get room below, and the page stays', { mk, md });

  // every key in the heads of eight pages
  const moved = [];
  for (const pg of ['home', 'folders', 'blend', 'models', 'career', 'lector', 'fabrica', 'build']) {
    await open(pg);
    const n = await p.evaluate(pg => { const e = document.getElementById('page-' + pg), h = e && e.querySelector('.skh,.fd-head,.tu-head,.bx-head,.hm-head,[class*="-head"]'); return h ? [...h.querySelectorAll('button')].filter(x => x.offsetParent).length : 0; }, pg);
    for (let i = 0; i < Math.min(n, 10); i++) {
      await open(pg);
      const t = await p.evaluate(([pg, i]) => { const e = document.getElementById('page-' + pg), h = e.querySelector('.skh,.fd-head,.tu-head,.bx-head,.hm-head,[class*="-head"]'), x = [...h.querySelectorAll('button')].filter(x => x.offsetParent)[i]; if (!x) return null; const w = (x.textContent || x.getAttribute('aria-label') || '').trim().slice(0, 40); x.click(); return w; }, [pg, i]);
      await sleep(900); const y = await top();
      if (y !== 0) moved.push({ pg, key: t, y });
      await p.keyboard.press('Escape'); await sleep(250);
      await p.evaluate(() => { document.querySelectorAll('#fb .f-sheet-wrap').forEach(w => w.remove()); try { if (state.folders && state.folders.ui) { state.folders.ui.open = null; state.folders.ui.adding = false; } } catch (e) {} });
    }
  }
  ok(moved.length === 0, 'every key in the heads of Home, Folders, Blend, Models, Vocatio, Lector, Fabrica and Build leaves the page where it was', moved);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
