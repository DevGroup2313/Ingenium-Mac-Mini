// Ingenium 6.4 / The Forge 646 · Fabrica part by part (thoughts/fabrica_parts.html), in Chromium. The owner's words (23 October
// 2026): "be able to make surgical edits to the code of the apps", with AI and without. Checks, in Ingenium and (forge=<url>) the Forge:
//   - Changes: each part of a changed file (a hunk) has its own key, Put this part back, with a line that says how;
//   - pressing one puts back that part alone: its lines are as in the version kept, the other change in the same file stays;
//   - a new file's only part, put back, takes the file away (nothing left behind); a file all put back has no change left;
//   - a file with Windows line ends (CRLF) keeps them; what is left can be kept as a version;
//   - axe-core finds nothing in Fabrica; no page errors.
//   node rig/t_64_parts.js <url of Ingenium> <out folder> [forge=<url of the Forge>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const args = process.argv.slice(2); const FORGE = (args.find(a => a.startsWith('forge=')) || '').slice(6); const [URL_, OUT] = args.filter(a => !a.startsWith('forge='));
fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/tools/node_modules/axe-core/axe.min.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const LINES = Array.from({ length: 40 }, (_, i) => 'line ' + (i + 1) + ': the tide comes in');

async function run(p, label, openFab) {
  const id = await p.evaluate(async L => { const r = await IngRepo.create({ name: 'Tide app' });
    await IngRepo.put(r.id, 'index.html', L.join('\n') + '\n');
    await IngRepo.put(r.id, 'notes.txt', 'first\r\nsecond\r\nthird\r\nfourth\r\nfifth\r\nsixth\r\nseventh\r\neighth\r\nninth\r\ntenth\r\n');
    await IngRepo.commit(r.id, 'First version');
    const C = L.slice(); C[4] = 'line 5: CHANGED BY THE MODEL'; C[29] = 'line 30: ALSO CHANGED';
    await IngRepo.put(r.id, 'index.html', C.join('\n') + '\n');
    await IngRepo.put(r.id, 'extra.js', 'var extra = 1;\n');
    await IngRepo.put(r.id, 'notes.txt', 'FIRST\r\nsecond\r\nthird\r\nfourth\r\nfifth\r\nsixth\r\nseventh\r\neighth\r\nninth\r\nTENTH\r\n');
    return r.id; }, LINES);
  await openFab(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide app/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { if (window.fbRooms) fbRooms.choose('now'); const b = document.querySelector('#fbViews button[data-v="changes"]'); if (b) b.click(); }); await p.waitForTimeout(900);
  const pick = async name => { await p.evaluate(n => { const row = [...document.querySelectorAll('#fbWorkBody .f-frow')].find(x => x.querySelector('.p') && x.querySelector('.p').textContent.trim().startsWith(n)); if (row) row.click(); }, name); await p.waitForTimeout(800); };
  await pick('index.html');
  const v1 = await p.evaluate(() => ({ hint: (document.getElementById('fbPartsHint') || {}).textContent || '', keys: [...document.querySelectorAll('#fbWorkBody .fp-back')].map(b => b.getAttribute('aria-label')), n: [...document.querySelectorAll('#fbWorkBody .fp-n')].map(x => x.textContent) }));
  ok(v1.keys.length === 2 && /Put back any part/.test(v1.hint) && v1.n.join() === 'part 1 of 2,part 2 of 2', label + ': each part of a changed file has its own key, Put this part back, and a line says how', v1);
  await p.screenshot({ path: path.join(OUT, label + '_parts.png') });
  await p.evaluate(() => document.querySelectorAll('#fbWorkBody .fp-back')[1].click()); await p.waitForTimeout(1500);
  const t1 = await p.evaluate(id => IngRepo.readText(id, 'index.html'), id);
  const L1 = t1.split('\n');
  const keys2 = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .fp-back').length);
  ok(L1[4] === 'line 5: CHANGED BY THE MODEL' && L1[29] === 'line 30: the tide comes in' && L1.length === 41 && t1.endsWith('\n') && keys2 === 1, label + ': Put this part back puts back that part alone; the other change in the file stays, and one part is left to look over', { l5: L1[4], l30: L1[29], keys2 });
  // a new file's only part
  await pick('extra.js');
  await p.evaluate(() => { const b = document.querySelector('#fbWorkBody .fp-back'); if (b) b.click(); }); await p.waitForTimeout(1500);
  const ex = await p.evaluate(async id => ({ text: await IngRepo.readText(id, 'extra.js'), listed: [...document.querySelectorAll('#fbWorkBody .f-frow .p')].map(x => x.textContent.trim()) }), id);
  ok(ex.text === null && !ex.listed.some(x => x.startsWith('extra.js')), label + ': a new file\'s only part, put back, takes the new file away', ex);
  // Windows line ends
  await pick('notes.txt');
  const nk = await p.evaluate(() => document.querySelectorAll('#fbWorkBody .fp-back').length);
  await p.evaluate(() => { const b = document.querySelectorAll('#fbWorkBody .fp-back'); if (b.length) b[b.length - 1].click(); }); await p.waitForTimeout(1500);
  const nt = await p.evaluate(id => IngRepo.readText(id, 'notes.txt'), id);
  ok(nk === 2 && nt === 'FIRST\r\nsecond\r\nthird\r\nfourth\r\nfifth\r\nsixth\r\nseventh\r\neighth\r\nninth\r\ntenth\r\n', label + ': a file with Windows line ends keeps them; only the part put back changes', { parts: nk, text: JSON.stringify(nt) });
  // the last part of index.html: the file is back as kept, no change left
  await pick('index.html');
  await p.evaluate(() => { const b = document.querySelector('#fbWorkBody .fp-back'); if (b) b.click(); }); await p.waitForTimeout(1500);
  const st = await p.evaluate(async id => { const s = await IngRepo.status(id); return s.changes.map(c => c.path || c); }, id);
  ok(st.length === 1 && JSON.stringify(st).includes('notes.txt'), label + ': a file all put back has no change left; only notes.txt\'s kept part remains', st);
  // what is left is kept as a version
  await p.evaluate(() => { const m = document.getElementById('fbMsg'); if (m) { m.value = 'Only the first line of the notes'; m.dispatchEvent(new Event('input')); } const k = document.getElementById('fbKeep'); if (k) k.click(); }); await p.waitForTimeout(1500);
  const kept = await p.evaluate(async id => { const l = await IngRepo.log(id, { max: 1 }); const s = await IngRepo.status(id); return { title: l[0] && l[0].title, clean: s.clean }; }, id);
  ok(kept.title === 'Only the first line of the notes' && kept.clean, label + ': what is left is kept as a version', kept);
  if (fs.existsSync(AXE)) { await p.addScriptTag({ path: AXE }); const v = await p.evaluate(async () => (await axe.run('#fb', { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => v.id + ':' + v.nodes.length)); ok(v.length === 0, label + ': axe-core finds nothing in Fabrica', v); }
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  {
    const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
      await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1000);
      await run(p, 'Ingenium', async () => { await p.evaluate(() => go('home')); await p.waitForTimeout(300); await p.evaluate(() => go('fabrica')); });
      ok(!errs.length, 'Ingenium: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'Ingenium: the run crashed', e.stack); }
    await ctx.close();
  }
  if (FORGE) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(FORGE); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
      await p.evaluate(() => FORGE.openRoom('fabrica')); await p.waitForTimeout(1200);
      await run(p, 'the Forge', async () => { await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(300); await p.evaluate(() => FORGE.openRoom('fabrica')); });
      ok(!errs.length, 'the Forge: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'the Forge: the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
