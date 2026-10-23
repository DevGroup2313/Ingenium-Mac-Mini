// Ingenium 6.3 / The Forge 645 · Glossa, Calm and Lima in the code editor (build/codeedit/learn.js, glossa.js), in
// Chromium, on the editor's own page (made by this test from the core). Checks:
//   - Glossa: where the cursor is in the page's structure (an element, a style rule, a function), what its line does, and what
//     the word under it means, in plain words; Ask about this line hands the line to the app;
//   - Calm: on, the lines outside the part worked on are dimmed and the lines have more room; kept on this device;
//   - Lima: it finds the notes for people (a licence note and a marker always stay), the extra empty lines, the spaces at
//     line ends, a style rule nothing names and a function nothing calls; nothing changes until a button is pressed; Remove the
//     notes takes them out whole (no empty line left behind); Remove the ones chosen takes only those chosen; one Undo puts
//     everything back; what is left still runs;
//   - no page errors.
//   node rig/t_63_learn.js <core html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [CORE, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const core = fs.readFileSync(CORE, 'utf8');
const PAGE = `<!doctype html><html><head><meta charset="utf-8"><title>Learn harness</title>
<style>body{font:14px system-ui;margin:20px;background:#fafafa} #a{width:100%;height:520px;font:13px/1.5 monospace;border:1px solid #bbb;border-radius:8px;padding:8px;background:#fff;color:#222}</style></head><body>
<textarea id="a" aria-label="The app's code"></textarea>
${core}<script>window.__asked=null;IngEditor.ask=function(x){window.__asked=x;};IngEditor.auto("#a");window.__ready=true;</script></body></html>`;
const APP = [
  '<!doctype html>',
  '<!-- Copyright (c) 2026 Yannie D. Forest. All rights reserved. -->',
  '<html><head><title>Notes</title>',
  '<style>',
  '/* the colours of the page */',
  '.card { margin: 12px; padding: 8px; }   ',
  '.old-banner { color: red; }',
  '</style></head>',
  '<body>',
  '<div id="main" class="card">',
  '  <!-- the list goes here -->',
  '  <p>Hello</p>',
  '</div>',
  '',
  '',
  '',
  '<script>',
  '// keep the count',
  'var count = 0;',
  'function addOne() { count = count + 1; return count; }',
  'function neverUsed(x) { return x * 2; }',
  'document.getElementById("main").addEventListener("click", addOne);',
  '/*FORGE_BOOT_MAP*/',
  '</script>',
  '</body></html>', ''].join('\n');

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    const HF = path.join(OUT, 'learn.html'); fs.writeFileSync(HF, PAGE); await p.goto('file://' + HF); await p.waitForFunction(() => window.__ready === true);
    await p.evaluate(app => { const a = document.getElementById('a'); a.value = app; }, APP);
    // Glossa
    await p.evaluate(() => document.querySelector('#a + .ic-wrap .ic-gl').click());
    const at = async (needle, off) => p.evaluate(([n, o]) => { const a = document.getElementById('a'); const i = a.value.indexOf(n) + (o || 0); a.focus(); a.setSelectionRange(i, i); }, [needle, off]);
    const read = () => p.waitForTimeout(300).then(() => p.evaluate(() => [...document.querySelectorAll('#a + .ic-wrap .ic-glossa .ic-gr')].map(r => r.querySelector('b').textContent + ': ' + r.querySelector('span').textContent)));
    await at('<p>Hello', 1); const g1 = await read();
    await at('margin', 2); const g2 = await read();
    await at('count + 1', 2); const g3 = await read();
    await at('addEventListener', 3); const g4 = await read();
    ok(g1.some(x => /Where you are: .*<div id="main" class="card">/.test(x)) && g1.some(x => /This word: .p.: A paragraph/.test(x)), 'Glossa: inside <div id="main">, the word p: a paragraph', g1);
    ok(g2.some(x => /Where you are: .*the style \.card/.test(x)) && g2.some(x => /This line: Sets margin: space outside/.test(x)) && g2.some(x => /This word: .margin.: Space outside/.test(x)), 'Glossa: in the style .card, this line sets margin, and margin explained', g2);
    await at('function addOne', 3); const g3b = await read();
    ok(g3.some(x => /Where you are: .*the function addOne\(\)/.test(x)) && g3.some(x => /This line: Gives count a new value/.test(x)) && g3b.some(x => /This line: Starts the function addOne/.test(x)) && g3b.some(x => /This word: .function.: Steps grouped under a name/.test(x)),
      'Glossa: inside the function addOne(), the statement at the cursor gives count a new value; on the word function, the line starts the function', { g3, g3b });
    ok(g4.some(x => /This line: Calls document\.getElementById\("main"\)\.addEventListener/.test(x)) && g4.some(x => /This word: .addEventListener.: Says what to do when something happens/.test(x)), 'Glossa: a call, and addEventListener explained', g4);
    await at('addEventListener', 3); await read();
    await p.evaluate(() => document.querySelector('#a + .ic-wrap .ic-ask').click());
    const asked = await p.evaluate(() => window.__asked);
    ok(asked && /addEventListener/.test(asked.line) && asked.number === 22 && asked.lang === 'HTML', 'Ask about this line hands the line, its number and its language to the app', asked);
    // Calm
    await p.evaluate(() => document.querySelector('#a + .ic-wrap .ic-calm').click()); await at('count + 1', 2); await p.waitForTimeout(300);
    const calm = await p.evaluate(() => { const w = document.querySelector('#a + .ic-wrap'); return { on: w.classList.contains('ic-calm'), dim: w.querySelectorAll('.cm-line.ic-dim').length, lines: w.querySelectorAll('.cm-line').length, lh: getComputedStyle(w.querySelector('.cm-scroller')).lineHeight, kept: JSON.parse(localStorage.getItem('ingEditorPrefs') || '{}').calm }; });
    ok(calm.on && calm.dim > 3 && calm.dim < calm.lines && calm.kept === true, 'Calm: lines outside the part worked on are dimmed, the lines have more room, and the choice is kept', calm);
    await p.evaluate(() => document.querySelector('#a + .ic-wrap .ic-calm').click());
    // Lima
    await p.evaluate(() => document.querySelector('#a + .ic-wrap .ic-em').click()); await p.waitForTimeout(600);
    const em = await p.evaluate(() => [...document.querySelectorAll('#a + .ic-wrap .ic-tidy .ic-tg')].map(g => ({ t: g.querySelector('.ic-tt').textContent, items: [...g.querySelectorAll('li')].map(l => l.textContent.trim()) })));
    const same = await p.evaluate(app => document.getElementById('a').value === app, APP);
    const by = k => em.find(g => g.t.startsWith(k)) || { t: '', items: [] };
    ok(/· 3$/.test(by('Notes').t) && /· 1$/.test(by('Empty').t) && /· 1$/.test(by('Spaces').t) && by('Styles').items.length === 1 && /old-banner/.test(by('Styles').items[0]) && by('Functions').items.length === 1 && /neverUsed/.test(by('Functions').items[0]) && same,
      'Lima finds 3 notes (the copyright and a marker stay), the extra empty lines, a space at a line end, a style nothing names (.old-banner) and a function nothing calls (neverUsed); nothing changed yet', em.map(g => g.t + ' ' + g.items.join('|')));
    const press = (k) => p.evaluate(k => { const g = [...document.querySelectorAll('#a + .ic-wrap .ic-tidy .ic-tg')].find(g => g.querySelector('.ic-tt').textContent.startsWith(k)); g.querySelector('.ic-tbtn').click(); }, k);
    await press('Notes');
    await p.waitForFunction(() => { const gs = [...document.querySelectorAll('#a + .ic-wrap .ic-tidy .ic-tg')]; const n = gs.find(g => g.querySelector('.ic-tt').textContent.startsWith('Notes')), f = gs.find(g => g.querySelector('.ic-tt').textContent.startsWith('Functions'));
      return n && /none$/.test(n.querySelector('.ic-tt').textContent) && f && f.querySelector('input[type=checkbox]'); }, null, { timeout: 10000 });
    await p.evaluate(() => { const g = [...document.querySelectorAll('#a + .ic-wrap .ic-tidy .ic-tg')].find(g => g.querySelector('.ic-tt').textContent.startsWith('Functions')); g.querySelector('input[type=checkbox]').click(); g.querySelector('.ic-tbtn').click(); }); await p.waitForTimeout(1200);
    const after = await p.evaluate(() => document.getElementById('a').value);
    ok(!/the colours of the page|the list goes here|keep the count/.test(after) && /Copyright \(c\) 2026/.test(after) && /\/\*FORGE_BOOT_MAP\*\//.test(after) && !/neverUsed/.test(after) && /function addOne/.test(after) && !/^\s*\n\s*<p>Hello/m.test(after.split('<div id="main" class="card">')[1].slice(0, 3)),
      'the notes are taken out whole, the copyright and the marker stay; only the function chosen is removed', after.slice(0, 400));
    await p.evaluate(() => { const v = document.getElementById('a').__ingCode.view; v.focus(); }); await p.keyboard.press('Control+z'); await p.keyboard.press('Control+z'); await p.waitForTimeout(200);
    const undone = await p.evaluate(app => document.getElementById('a').value === app, APP);
    ok(undone, 'Undo puts everything back, exactly as it was');
    await p.screenshot({ path: path.join(OUT, 'learn.png'), fullPage: true });
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
