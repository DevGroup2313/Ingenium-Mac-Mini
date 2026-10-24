// Ingenium 6.4 / The Forge 646 · Fabrica's find and replace across an app (thoughts/fabrica_parts.html), in Chromium. The owner's
// words (23 October 2026): "be able to make surgical edits to the code of the apps", with AI and without. Checks, in Ingenium and
// (forge=<url>) the Forge:
//   - Code has a key, Find and replace…, beside its search; it opens a sheet with Find, Replace with, Match capitals exactly and
//     Whole words only, and Replace stays off until a look has been taken;
//   - Show what would change lists each file with its count and its lines before and after; pictures are passed over; a
//     word inside a longer one is left alone with Whole words only; capitals are matched only when asked;
//   - a file can be left out, and the count follows; Replace changes the chosen files only, keeps Windows line ends, and
//     each change then waits under Changes; Undo the replacement puts every file back as it was;
//   - axe-core finds nothing in the sheet; no page errors.
//   node rig/t_64_replace.js <url of Ingenium> <out folder> [forge=<url of the Forge>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const args = process.argv.slice(2); const FORGE = (args.find(a => a.startsWith('forge=')) || '').slice(6); const [URL_, OUT] = args.filter(a => !a.startsWith('forge='));
fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/tools/node_modules/axe-core/axe.min.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const FILES = {
  'index.html': '<h1>Tide tables</h1>\n<p>The tide comes in. Tidewater is not the tide.</p>\n<script src="app.js"></script>\n',
  'app.js': 'var tide = 3;\nfunction tideAt(h){ return tide * h; }\nconsole.log("tide", tideAt(2));\n',
  'notes.txt': 'Tide one\r\nnothing here\r\ntide two\r\n',
  'about.txt': 'No match in this one.\n',
  'list.md': '- tide 1\n- tide 2\n- tide 3\n- tide 4\n- tide 5\n',
  'logo.png': 'tide tide tide'
};

async function run(p, label, openFab) {
  const id = await p.evaluate(async F => { const r = await IngRepo.create({ name: 'Moon app' });
    for (const k in F) await IngRepo.put(r.id, k, F[k]); await IngRepo.commit(r.id, 'First version'); return r.id; }, FILES);
  await openFab(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Moon app/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { if (window.fbRooms) fbRooms.choose('now'); const b = document.querySelector('#fbViews button[data-v="code"]'); if (b) b.click(); }); await p.waitForTimeout(1200);
  const key = await p.evaluate(() => { const k = document.querySelector('#fbWorkBody .fr-repk'); return k ? { text: k.textContent.trim(), inBar: !!k.closest('.h-bar') } : null; });
  ok(key && key.text === 'Find and replace…' && key.inBar, label + ': Code has a key, Find and replace…, beside its search', key);
  await p.evaluate(() => document.querySelector('#fbWorkBody .fr-repk').click()); await p.waitForTimeout(500);
  const sh = await p.evaluate(() => { const s = document.querySelector('#fb .f-sheet'); const keys = s ? [...s.querySelectorAll('button')].map(b => ({ t: b.textContent.trim(), off: b.disabled })) : [];
    return { title: s && s.querySelector('h3').textContent, fields: ['fxFind', 'fxWith', 'fxCase', 'fxWords'].every(i => !!document.getElementById(i)), keys, focus: document.activeElement && document.activeElement.id }; });
  ok(sh.title === 'Find and replace' && sh.fields && sh.keys.some(k => k.t === 'Replace in the chosen files' && k.off) && sh.focus === 'fxFind', label + ': a sheet with Find, Replace with and the two choices; Replace stays off until a look has been taken; Find has the focus', sh);
  const look = async (find, wth, cs, words) => { await p.evaluate(([f, w, c, wd]) => { document.getElementById('fxFind').value = f; document.getElementById('fxWith').value = w; document.getElementById('fxCase').checked = c; document.getElementById('fxWords').checked = wd;
      [...document.querySelectorAll('#fb .f-sheet button')].find(b => b.textContent.trim() === 'Show what would change').click(); }, [find, wth, cs, words]); await p.waitForTimeout(1200);
    return p.evaluate(() => ({ sum: document.getElementById('fxSum').textContent, files: [...document.querySelectorAll('#fxList .fx-file')].map(d => ({ path: d.querySelector('label').childNodes[1].textContent.trim(), n: d.querySelector('small').textContent, lines: [...d.querySelectorAll('.fx-line')].map(l => l.textContent) })), go: [...document.querySelectorAll('#fb .f-sheet button')].find(b => b.textContent.trim() === 'Replace in the chosen files').disabled })); };
  let r = await look('tide', 'moon', false, true);
  const paths = r.files.map(f => f.path).sort().join(',');
  const html = r.files.find(f => f.path === 'index.html') || {};
  ok(paths === 'app.js,index.html,list.md,notes.txt' && /^3 changes/.test(html.n || '') && !r.go && /13 changes in 4 files chosen \(of 13 in 4\)/.test(r.sum), label + ': Show what would change lists each file with its count; pictures are passed over; "Tidewater" and "tideAt" are left alone with Whole words only', r);
  ok((html.lines || []).some(l => /1 − <h1>Tide tables/.test(l) && /1 \+ <h1>moon tables/.test(l)) && !(html.lines || []).some(l => /more line/.test(l)) && ((r.files.find(f => f.path === 'list.md') || {}).lines || []).slice(-1)[0] === 'and 2 more lines in this file' && !JSON.stringify(r.files).includes('\\r') && !/\n/.test(((r.files.find(f => f.path === 'notes.txt') || {}).lines || []).join('')), label + ': each file shows its lines before and after (no "more" when every line is shown; a Windows line end is not shown as a break)', r.files);
  await p.screenshot({ path: path.join(OUT, label.replace(/\s/g, '_') + '_look.png') });
  const rc = await look('tide', 'moon', true, true);
  ok(/11 changes in 4 files chosen \(of 11 in 4\)/.test(rc.sum), label + ': with Match capitals exactly, "Tide" is left alone', rc.sum);
  r = await look('tide', 'Moon', false, true);
  await p.evaluate(() => { const c = [...document.querySelectorAll('#fxList input[data-i]')].find(i => i.closest('.fx-file').textContent.includes('app.js')); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(200);
  const sum2 = await p.evaluate(() => document.getElementById('fxSum').textContent);
  ok(/10 changes in 3 files chosen \(of 13 in 4\)/.test(sum2), label + ': a file left out, and the count follows', sum2);
  if (fs.existsSync(AXE)) { await p.addScriptTag({ path: AXE }); const v = await p.evaluate(async () => (await axe.run('#fb .f-sheet', { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => v.id + ':' + v.nodes.length)); ok(v.length === 0, label + ': axe-core finds nothing in the sheet', v); }
  await p.evaluate(() => [...document.querySelectorAll('#fb .f-sheet button')].find(b => b.textContent.trim() === 'Replace in the chosen files').click()); await p.waitForTimeout(1800);
  const after = await p.evaluate(async id => { const o = {}; for (const k of ['index.html', 'app.js', 'notes.txt', 'logo.png', 'list.md']) o[k] = await IngRepo.readText(id, k);
    const st = await IngRepo.status(id); return { o, changed: st.changes.map(c => c.path || c).sort(), view: (document.querySelector('#fbViews button[aria-pressed="true"], #fbViews button.on') || {}).textContent || '', undo: !!document.getElementById('fbReplaceUndo'), sheet: !!document.querySelector('#fb .f-sheet') }; }, id);
  ok(after.o['index.html'] === '<h1>Moon tables</h1>\n<p>The Moon comes in. Tidewater is not the Moon.</p>\n<script src="app.js"></script>\n' && after.o['notes.txt'] === 'Moon one\r\nnothing here\r\nMoon two\r\n' && after.o['app.js'] === FILES['app.js'] && after.o['logo.png'] === FILES['logo.png'] && after.o['list.md'] === '- Moon 1\n- Moon 2\n- Moon 3\n- Moon 4\n- Moon 5\n',
    label + ': Replace changes the chosen files only, word for word, and keeps Windows line ends', after.o);
  ok(after.changed.join(',') === 'index.html,list.md,notes.txt' && after.undo && !after.sheet, label + ': each change then waits under Changes, with Undo the replacement at the top', after);
  await p.screenshot({ path: path.join(OUT, label.replace(/\s/g, '_') + '_changes.png') });
  await p.evaluate(() => document.querySelector('#fbReplaceUndo button').click()); await p.waitForTimeout(1500);
  const back = await p.evaluate(async id => { const st = await IngRepo.status(id); return { clean: st.clean, html: await IngRepo.readText(id, 'index.html'), notes: await IngRepo.readText(id, 'notes.txt') }; }, id);
  ok(back.clean && back.html === FILES['index.html'] && back.notes === FILES['notes.txt'], label + ': Undo the replacement puts every file back as it was', back);
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
