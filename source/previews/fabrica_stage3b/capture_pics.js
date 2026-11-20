// Fabrica, stage 3, part two (cherry-pick and changes put aside), as pictures: the running app (a test build that keeps the held
// modules/r342.js), with an invented app (Tide Clock) and invented people (Ada, Theo); the new part ringed in Ingenium's violet (her rule:
// no gold).   node source/previews/fabrica_stage3b/capture_pics.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1100; // a common desktop window; Fabrica's panels take the window's height
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const ring = (sel) => p.evaluate((sel) => { document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring'));
    if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:4px!important;border-radius:12px}'; document.body.appendChild(st); }
    const els = sel.split('|').map((q) => document.querySelector(q)).filter(Boolean); els.forEach((e) => e.classList.add('pv-ring')); return els.length; }, sel);
  // the part brought into view inside its own scrolling panel (fixed parts, as a sheet, stay where they are), and no passing notice over it
  const bring = (sel) => p.evaluate((sel) => { document.querySelectorAll('#fb .f-toast').forEach((x) => x.remove()); const e = document.querySelector(sel.split('|')[0]); if (!e) return -1;
    for (let f = e; f && f !== document.body; f = f.parentElement) if (getComputedStyle(f).position === 'fixed') return 0;
    let c = e.parentElement; while (c && !(c.scrollHeight > c.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(c).overflowY))) c = c.parentElement;
    if (!c) { e.scrollIntoView({ block: 'center' }); return 0; } const cr = c.getBoundingClientRect(), er = e.getBoundingClientRect(); c.scrollTop += (er.top - cr.top) - 80; return 1; }, sel);
  const grab = async (key, sel, pad, frame) => { await sleep(600); await bring(frame || sel); await sleep(500);
    await p.evaluate((s) => { const e = document.querySelector(s.split('|')[0]); if (!e) return; const r = e.getBoundingClientRect(); if (r.top < 0 || r.bottom > innerHeight) e.scrollIntoView({ block: 'center' }); }, frame || sel); await sleep(300); const n = await ring(sel); await p.evaluate(() => document.querySelectorAll('#fb .f-toast').forEach((x) => x.remove())); await sleep(700);
    const box = await p.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => { const e = document.querySelector(q); if (!e) return; const r = e.getBoundingClientRect(); x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); }); return { x0, y0, x1, y1 }; }, frame || sel);
    const P = pad == null ? 100 : pad; let x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P);
    if (!isFinite(x) || x > VW - 320) x = Math.max(0, VW - 320); if (!isFinite(y) || y > VH - 160) y = Math.max(0, VH - 160);
    const w = Math.max(320, Math.min(VW - x, box.x1 - box.x0 + 2 * P)), h = Math.max(160, Math.min(VH - y, box.y1 - box.y0 + 2 * P));
    console.log(key, n, JSON.stringify({ x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h), box: [Math.round(box.y0), Math.round(box.y1)] }));
    await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: Math.min(w, VW - x), height: Math.min(h, VH - y) } }); };
  const unring = () => p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')));
  const show = async (v) => { await p.evaluate((v) => { fbHubHost.S.view = v; fbHubHost.paint(); }, v); await sleep(1600); };
  const theme = (t) => p.evaluate((t) => { try { if (typeof setTheme === 'function') setTheme(t); else document.body.setAttribute('data-theme', t); } catch (e) { document.body.setAttribute('data-theme', t); } }, t);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2200);
  const id = await p.evaluate(async () => {
    IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' });
    const r = await IngRepo.create({ name: 'Tide Clock' });
    await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.2;\n}\nexport { next };\n'); await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day.\n');
    await IngRepo.commit(r.id, 'The first version'); await IngRepo.branch(r.id, 'evening'); await IngRepo.switchTo(r.id, 'evening');
    await IngRepo.put(r.id, 'app/evening.js', 'export function evening(){\n  return 18.5;\n}\n'); await IngRepo.commit(r.id, 'Evening tides');
    await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.25;\n}\nexport { next };\n'); await IngRepo.commit(r.id, 'Finer figures\n\nThe next tide to the quarter hour.');
    await IngRepo.put(r.id, 'app/moon.js', 'export const moon = "waxing";\n'); await IngRepo.commit(r.id, 'Moon phases');
    await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n'); await IngRepo.commit(r.id, 'The evening, said');
    await IngRepo.switchTo(r.id, 'main'); await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour.\n'); await IngRepo.commit(r.id, 'The harbour');
    IngRepo.setAuthor({ name: 'Theo', email: 'theo@example.invalid' });
    fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return r.id; });
  await sleep(900);
  // cherry-pick
  await show('ideas'); await grab('1-ideas', '#fbWorkBody .f-idea:not(.on) [data-r342="pick"]', 120, '#fbWorkBody .f-ideas');
  await unring(); await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].find((e) => /^evening/.test(e.textContent)).querySelector('[data-r342="pick"]').click()); await sleep(1600);
  await grab('2-sheet', '.f-sheet', 24);
  await unring(); const finer = await p.evaluate(() => { const r = [...document.querySelectorAll('.f-sheet .r342-v')].find((x) => /Finer figures/.test(x.textContent)); return r && r.getAttribute('data-oid'); });
  await p.evaluate((oid) => document.querySelector('.f-sheet .r342-v[data-oid="' + oid + '"] [data-r342="bring"]').click(), finer); await sleep(2600);
  await grab('3-brought', '.f-sheet .r342-v.r342-done', 30, '.f-sheet');
  await p.evaluate(() => { try { document.querySelector('.f-sheet-wrap').remove(); } catch (e) {} });
  await show('history'); await p.waitForSelector('#fbWorkBody .f-hist > .f-cm', { timeout: 20000 }); await sleep(2500);
  await p.evaluate(() => document.querySelector('#fbWorkBody .f-hist > .f-cm').click());
  await p.waitForSelector('#fbWorkBody .f-cm[aria-expanded="true"] .msg', { timeout: 20000 }); await sleep(400);
  await ring('#fbWorkBody .f-cm[aria-expanded="true"]'); await p.evaluate(() => document.querySelectorAll('#fb .f-toast').forEach((x) => x.remove()));
  await p.locator('#fbWorkBody .f-hist').screenshot({ path: path.join(OUT, '4-history.png') }); console.log('4-history (the list, the opened row ringed)');
  // both versions
  await unring(); const said = await p.evaluate(async (id) => (await IngRepo.log(id, { ref: 'refs/heads/evening', max: 1 }))[0].oid, id);
  await p.evaluate(async (a) => { await IngRepo.cherryPick(a[0], a[1]); await fbHubHost.refresh(); fbHubHost.S.view = 'changes'; fbHubHost.paint(); }, [id, said]); await sleep(1800);
  await p.evaluate(() => { const n = [...document.querySelectorAll('#fbWorkBody .f-note')].find((x) => /^Bringing in/.test(x.textContent)); if (n) n.id = 'pvBoth'; });
  await grab('5-both', '#pvBoth', 40, '#pvBoth');
  await unring(); await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n'); await IngRepo.commit(id, 'The evening, said'); await fbHubHost.refresh(); fbHubHost.paint(); }, id); await sleep(800);
  // changes put aside
  await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n\nThe moon, too.\n'); await IngRepo.put(id, 'app/moon.js', 'export const moon = "full";\n'); await fbHubHost.refresh(); }, id);
  await show('changes'); await p.fill('#fbMsg', 'Halfway through the moon');
  await grab('6-aside-key', '[data-r342="aside"]', 60, '#fbWorkFoot .f-keep');
  await unring(); await p.evaluate(() => document.querySelector('[data-r342="aside"]').click()); await sleep(2400);
  await grab('7-aside-list', '#r342Aside', 30);
  await unring(); await p.evaluate(() => document.querySelector('#r342Aside [data-r342="drop"]').click()); await sleep(900);
  await p.evaluate(() => { const d = [...document.querySelectorAll('div,section,dialog')].filter((x) => x.offsetParent && /Drop these changes\?/.test(x.textContent) && x.querySelectorAll('button').length >= 2 && x.getBoundingClientRect().width < 700); const e = d[d.length - 1]; if (e) e.id = 'pvAsk'; });
  await grab('8-drop-ask', '#pvAsk', 30);
  await unring(); await p.keyboard.press('Escape'); await sleep(600);
  // by night
  await theme('night'); await sleep(900); await show('changes'); await grab('10-aside-night', '#r342Aside', 30);
  await unring(); await show('ideas'); await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].find((e) => /^evening/.test(e.textContent)).querySelector('[data-r342="pick"]').click()); await sleep(1600);
  await grab('9-sheet-night', '.f-sheet', 24); await theme('day');
  console.log(JSON.stringify(errs)); await b.close();
})();
