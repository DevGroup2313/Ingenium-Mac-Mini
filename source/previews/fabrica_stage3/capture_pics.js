// Fabrica, stage 3, part one, as pictures: the running app (a test build that keeps the held modules/r339.js), with invented people and an
// invented app (Ada, Theo, Tide Clock; owners @rain-gauge, @tide-team/keepers, docs@example.invalid); the new part ringed in violet.
//   node source/previews/fabrica_stage3/capture_pics.js <page url> <out folder>
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
  // the part brought into view below Fabrica's sticky heading (which would cover it), and no passing notice over it
  const bring = (sel) => p.evaluate((sel) => { document.querySelectorAll('#fb .f-toast').forEach((x) => x.remove()); const e = document.querySelector(sel.split('|')[0]); if (!e) return -1; for (let f = e; f && f !== document.body; f = f.parentElement) if (getComputedStyle(f).position === 'fixed') return 0;
    let c = e.parentElement; while (c && !(c.scrollHeight > c.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(c).overflowY))) c = c.parentElement;
    if (!c) { e.scrollIntoView({ block: 'center' }); return 0; }
    const cr = c.getBoundingClientRect(); let stick = 0; c.querySelectorAll('*').forEach((x) => { if (getComputedStyle(x).position === 'sticky') { const r = x.getBoundingClientRect(); if (r.top - cr.top < 60 && r.height < cr.height / 2) stick = Math.max(stick, r.bottom - cr.top); } });
    const er = e.getBoundingClientRect(); c.scrollTop += (er.top - cr.top) - stick - 80; return Math.round(stick); }, sel);
  const grab = async (key, sel, pad, frame) => { await sleep(600); const st = await bring(frame || sel); await sleep(500); const n = await ring(sel); await p.evaluate(() => document.querySelectorAll('#fb .f-toast').forEach((x) => x.remove())); await sleep(700);
    const box = await p.evaluate((s) => { let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0; s.split('|').forEach((q) => { const e = document.querySelector(q); if (!e) return; const r = e.getBoundingClientRect(); x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); }); return { x0, y0, x1, y1 }; }, frame || sel);
    const P = pad == null ? 120 : pad; const x = Math.max(0, box.x0 - P), y = Math.max(0, box.y0 - P), w = Math.min(VW - x, box.x1 - box.x0 + 2 * P), h = Math.min(VH - y, box.y1 - box.y0 + 2 * P);
    await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x, y, width: Math.max(320, w), height: Math.max(160, h) } }); console.log(key, n, 'sticky', st); };
  const unring = () => p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')));
  const filesTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find((x) => /^Files changed/.test(x.textContent)); k.click(); }); await sleep(2400); };
  const convTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find((x) => /^Conversation/.test(x.textContent)); k.click(); }); await sleep(1500); };
  const choose = async (sel, label) => { await p.click(sel); await sleep(450); await p.evaluate((l) => [...document.querySelectorAll('.r280-pop .r172-opt')].find((o) => o.textContent === l).click(), label); await sleep(900); };
  const plus = async (line) => { await p.evaluate((n) => document.querySelector('#fb .f-dl[data-side="new"][data-line="' + n + '"] .r282-lc').click(), line); await sleep(450); };
  const suggest = async (line, text, words, keepOpen) => { await plus(line); await p.click('#fb .r282-new .r339-sk'); await sleep(700);
    await p.fill('#fb .r282-new .r339-sugta', text); if (words != null) await p.fill('#fb .r282-new textarea:not(.r339-sugta)', words); if (keepOpen) return;
    await p.evaluate(() => document.querySelector('#fb .r282-new [data-x="go"]').click()); await sleep(1800); };
  const threadOf = (line) => p.evaluate((n) => { let e = document.querySelector('#fb .f-dl[data-side="new"][data-line="' + n + '"]'); e = e && e.nextElementSibling; while (e && e.classList.contains('r282-thread') && !e.querySelector('.r339-sug')) e = e.nextElementSibling; return e && e.querySelector('.r339-sug') ? e.getAttribute('data-c') : null; }, line);
  const press = (id, k) => p.evaluate((a) => document.querySelector('#fb .r282-thread[data-c="' + a[0] + '"] .r339-sug [data-k="' + a[1] + '"]').click(), [id, k]);
  const theme = (t) => p.evaluate((t) => { try { if (typeof setTheme === 'function') setTheme(t); else document.body.setAttribute('data-theme', t); } catch (e) { document.body.setAttribute('data-theme', t); } }, t);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2200);
  const S = await p.evaluate(async () => {
    IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' });
    const r = await IngRepo.create({ name: 'Tide Clock' });
    await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.2;\n}\nfunction half(){\n  return 3.1;\n}\nexport { next, half };\n');
    await IngRepo.put(r.id, 'docs/guide.md', '# Tide Clock\n\nHigh water, twice a day.\n'); await IngRepo.put(r.id, 'README.md', '# Tide Clock\n');
    await IngRepo.put(r.id, '.github/CODEOWNERS', '# Tide Clock: who reviews what\n*        @ada\n/app/    @rain-gauge @tide-team/keepers\ndocs/*   docs@example.invalid\n!*.tmp   @nobody\n');
    await IngRepo.commit(r.id, 'The first version'); await IngRepo.branch(r.id, 'evening-tides'); await IngRepo.switchTo(r.id, 'evening-tides');
    await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.25;\n}\nfunction half(){\n  return 3.125;\n}\nfunction evening(){\n  return 18.5;\n}\nexport { next, half, evening };\n');
    await IngRepo.put(r.id, 'docs/guide.md', '# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n'); await IngRepo.commit(r.id, 'Evening tides'); await IngRepo.switchTo(r.id, 'main');
    fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint();
    const pr = await fbHub.newPull(r.id, { from: 'evening-tides', to: 'main', title: 'Evening tides', body: 'The evening tide, and finer figures.' }); return { id: r.id, n: pr.n }; });
  await sleep(800); await p.evaluate((n) => fbHub.open('pulls', { n }), S.n); await sleep(3500);
  // reviewers: Theo asked by hand and approving; @rain-gauge approving; your model asked (a stand-in that answers as Lector's model would)
  await choose('#r339Rev', 'Someone else…'); await p.fill('.f-sheet input', 'Theo'); await p.evaluate(() => [...document.querySelectorAll('.f-sheet button')].find((x) => x.textContent === 'Ask them for a review').click()); await sleep(1500);
  for (const who of ['Theo', 'rain-gauge']) { await p.evaluate((w) => IngRepo.setAuthor({ name: w, email: w.toLowerCase() + '@example.invalid' }), who); await p.click('#hPrApprove'); await sleep(1400); }
  await p.evaluate(() => { IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' }); IngLector.plan = () => ({ chosen: { id: 'test-model', name: 'Test model' } });
    window.lxAsk = () => new Promise((res) => setTimeout(() => res('1. app/tide.js, line 8: 18.5 is half past six in the evening. Check it against the tide table.\n2. A test for half() would catch a wrong figure.'), 7000)); });
  await convTab(); await sleep(600);
  await bring('#r339Rev'); await sleep(400); await p.click('#r339Rev'); await sleep(500); await grab('2-ask', '.r280-pop|#r339Rev', 90); await p.keyboard.press('Escape'); await sleep(300); await unring();
  await choose('#r339Rev', 'Your model, Test model'); await grab('3-reading', '#r339Revs', 60); await sleep(7000); await convTab();
  await grab('1-reviewers', '#r339Rev|#r339Revs', 70);
  const card = await p.evaluate(() => { const cs = [...document.querySelectorAll('#hPrTl .h-cmt')]; const c = cs.find((x) => /Test model/.test(x.textContent) && /half past six/.test(x.textContent)); if (c) c.id = 'pvModelCard'; return !!c; });
  if (card) await grab('4-model', '#pvModelCard', 50);
  await grab('5-owners', '#r339Own', 60, '#hPrMergeBox');
  // suggested changes
  await filesTab(); await suggest(2, '  return 6.21;', 'A finer figure.', true); await grab('6-suggest', '.r282-new .r339-sk|.r282-new .r339-sugbox', 70, '#fb .r282-new');
  await p.evaluate(() => document.querySelector('#fb .r282-new [data-x="go"]').click()); await sleep(1800); const s1 = await threadOf(2);
  await grab('7-thread', '#fb .r282-thread[data-c="' + s1 + '"] .r339-sug', 50, '#fb .r282-thread[data-c="' + s1 + '"]'); await unring();
  await grab('7b-panel', '#fb .f-diff', 24, '#fb .f-diff .f-diff-h|#fb .r282-thread[data-c="' + s1 + '"]'); await unring();
  await press(s1, 'commit'); await sleep(600); await grab('8-commit', '.f-sheet', 30); await p.click('#r339Commit'); await sleep(3200); await filesTab();
  const s1b = await threadOf(2); if (s1b) await grab('9-committed', '#fb .r282-thread[data-c="' + s1b + '"] .r339-sug', 50, '#fb .r282-thread[data-c="' + s1b + '"]');
  await unring(); await suggest(7, 'function evening(hours){', 'It takes the hours.'); await suggest(8, '  return 18.45;\n  // the evening tide, in hours', 'Finer, and said.');
  const s2 = await threadOf(7), s3 = await threadOf(8); await press(s2, 'batch'); await sleep(500); await press(s3, 'batch'); await sleep(900);
  await grab('10-batch', '#r339Batch', 40); await unring(); await p.click('#r339BatchGo'); await sleep(600); await p.click('#r339Commit'); await sleep(3200);
  await filesTab(); await suggest(11, 'export { next, half, evening, moon };', 'And the moon?'); const s4 = await threadOf(11);
  await p.evaluate(async (id) => { const t = await IngRepo.readText(id, 'app/tide.js', 'refs/heads/evening-tides'); await IngRepo.commitTo(id, 'evening-tides', [{ path: 'app/tide.js', data: t.replace('export { next, half, evening };', 'export { next, half, evening as dusk };') }], 'Dusk'); await fbHubHost.refresh(); fbHubHost.paint(); }, S.id); await sleep(1500);
  await convTab(); await filesTab(); await grab('11-outdated', '#fb .r282-thread[data-c="' + s4 + '"] .r339-sug', 50, '#fb .r282-thread[data-c="' + s4 + '"]');
  // by night
  await unring(); await theme('night'); await sleep(900); const s1n = await threadOf(2); if (s1n) await grab('13-thread-night', '#fb .r282-thread[data-c="' + s1n + '"] .r339-sug', 50, '#fb .r282-thread[data-c="' + s1n + '"]');
  await convTab(); await grab('12-reviewers-night', '#r339Rev|#r339Revs', 70); await theme('day');
  console.log(JSON.stringify(errs)); await b.close();
})();
