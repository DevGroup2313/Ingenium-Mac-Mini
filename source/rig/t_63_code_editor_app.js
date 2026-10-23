// Ingenium 6.3 · the code editor in Ingenium's own boxes (modules/r164.js with the shared thoughts/code_editor_core.html), in
// Chromium. Checks:
//   - Build: the page's box is an editor (HTML colours); a page written in runs in the preview; typing in the editor runs it
//     again, as the box did;
//   - Build, a large page part by part: a part opens in an editor; typing marks the part changed; Ctrl+S in the editor keeps it
//     (the shortcut still reaches the part's own keys); Tab indents in the editor; picking parts over and over leaves no
//     editor behind;
//   - Fabrica: a file of the app opens in an editor coloured by its name (app.js: JavaScript; a second file, style.css: CSS);
//     a change saved is the file's text; a file of 20 MB, refused before 6.3 (6 MB was the limit), is edited in place;
//   - no page errors.
//   node rig/t_63_code_editor_app.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const wait = (p, fn, arg, ms) => p.waitForFunction(fn, arg, { timeout: ms || 15000 }).then(() => true, () => false);

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    // Build
    await p.evaluate(() => go('build')); await p.waitForTimeout(600);
    const b1 = await p.evaluate(() => { const t = document.getElementById('codeEditor'), w = t.nextElementSibling; return { ed: !!(t.__ingCode && w && w.querySelector('.cm-editor')), shown: !!(w && w.offsetParent), h: w && Math.round(w.getBoundingClientRect().height), lang: t.__ingCode && t.__ingCode.langKey, auto: !!(document.getElementById('autoRun') || {}).checked }; });
    ok(b1.ed && b1.shown && b1.h > 200 && b1.lang === 'html', 'Build: the page\'s box is an editor, with HTML colours, in the box\'s place', b1);
    const frameText = () => p.evaluate(() => (document.getElementById('previewFrame') || {}).srcdoc || '');
    await p.evaluate(() => { const a = document.getElementById('autoRun'); if (a && !a.checked) a.click(); const t = document.getElementById('codeEditor'); t.value = '<!doctype html><title>Ed</title><h1 id="eh">First</h1>\n'; t.dispatchEvent(new Event('input', { bubbles: true })); });
    await wait(p, () => /First/.test((document.getElementById('previewFrame') || {}).srcdoc || ''));
    await p.evaluate(() => { const t = document.getElementById('codeEditor'); t.focus(); t.setSelectionRange(t.value.length, t.value.length); });
    await p.keyboard.type('<p id="typed">Typed in the editor</p>');
    const ran = await wait(p, () => /Typed in the editor/.test((document.getElementById('previewFrame') || {}).srcdoc || ''), null, 8000);
    ok(ran && /First/.test(await frameText()), 'Build: a page written in runs; typing in the editor runs it again, as the box did', (await frameText()).slice(0, 160));
    // Build, a large page part by part
    const big = await p.evaluate(() => {
      const js = '<script id="logic">\n' + Array.from({ length: 90000 }, (_, i) => 'function f' + i + '(x){ return x + ' + i + '; }').join('\n') + '\n</script>\n';
      const css = '<style id="look">\n' + Array.from({ length: 4000 }, (_, i) => '.c' + i + '{color:#' + (i % 900 + 100) + '}').join('\n') + '\n</style>\n';
      const page = '<!doctype html><html><head><title>Big</title>' + css + '</head><body><h1>Big</h1>' + js + '</body></html>';
      IngBuild.open({ name: 'big.html', text: page }); return page.length; });
    await p.waitForTimeout(1200);
    const parts = await p.evaluate(() => [...document.querySelectorAll('#bdParts > *')].map(x => x.textContent.trim().slice(0, 30)));
    const iLogic = parts.findIndex(t => /#logic/.test(t));
    await p.evaluate(i => document.querySelectorAll('#bdParts > *')[i].click(), iLogic); await p.waitForTimeout(500);
    const b2 = await p.evaluate(() => { const t = document.getElementById('bdText'); return { ed: !!(t && t.__ingCode && t.nextElementSibling.querySelector('.cm-editor')), lang: t && t.__ingCode.langKey, toks: t ? t.nextElementSibling.querySelectorAll('.tok-keyword').length : 0 }; });
    ok(big > 2500000 && iLogic >= 0 && b2.ed && b2.toks > 3, 'Build, a large page (' + (big / 1048576).toFixed(1) + ' MB) part by part: the part opens in an editor, its code coloured', { parts: parts.length, b2 });
    await p.evaluate(() => { const t = document.getElementById('bdText'); t.focus(); t.setSelectionRange(0, 0); });
    await p.keyboard.press('End'); await p.keyboard.press('Enter'); await p.keyboard.type('var added = 1;');
    const changed = await p.evaluate(i => { const t = document.getElementById('bdText'); return { mark: document.querySelectorAll('#bdParts > *')[i].classList.contains('changed'), has: /var added = 1;/.test(t.value) }; }, iLogic);
    await p.evaluate(() => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (m) { window.__toasts.push(String(m)); try { return o.apply(this, arguments); } catch (e) { } }; });
    await p.keyboard.press('Control+s'); await p.waitForTimeout(1200);
    const kept = await p.evaluate(() => window.__toasts.slice());
    await p.keyboard.press('Tab'); const tab = await p.evaluate(() => { const t = document.getElementById('bdText'); const v = t.value, at = t.selectionStart; return v.slice(at - 2, at); });
    ok(changed.mark && changed.has && kept.some(m => /Kept on this device/.test(m)) && tab === '  ', 'typing marks the part changed; Ctrl+S in the editor keeps it (the part\'s own key); Tab puts two spaces where the cursor is', { changed, kept, tab });
    for (let k = 0; k < 6; k++) { await p.evaluate(i => document.querySelectorAll('#bdParts > *')[i].click(), k % 2 ? iLogic : Math.max(0, iLogic - 1)); await p.waitForTimeout(120); }
    const left = await p.evaluate(() => ({ editors: IngEditor.count(), wraps: document.querySelectorAll('#bdEdit .ic-wrap').length }));
    ok(left.wraps <= 1 && left.editors <= 4, 'picking parts over and over leaves no editor behind', left);
    // Fabrica
    const fab = await p.evaluate(async () => {
      const r = await IngRepo.create({ name: 'Editor test' });
      await IngRepo.put(r.id, 'app.js', 'const answer = 42;\nfunction twice(x) { return x * 2; }\n');
      await IngRepo.put(r.id, 'style.css', 'body { color: red; }\n');
      const big = '/* big */\n' + 'let v = 0;\n'.repeat(Math.ceil(20 * 1048576 / 11));
      await IngRepo.put(r.id, 'big.js', big);
      return { id: r.id, bigLen: big.length }; });
    await p.evaluate(() => go('fabrica')); await p.waitForTimeout(800);
    await p.evaluate(id => { fbHubHost.openEditor({ id }, 'app.js'); }, fab.id);
    await wait(p, () => { const t = document.getElementById('fbEdText'); return t && t.__ingCode && /answer/.test(t.value) && !t.disabled; }, null, 15000);
    const f1 = await p.evaluate(() => { const t = document.getElementById('fbEdText'); return { lang: t.__ingCode.langKey, toks: t.nextElementSibling.querySelectorAll('.tok-keyword').length, shown: !!t.nextElementSibling.offsetParent }; });
    ok(f1.lang === 'js' && f1.toks >= 2 && f1.shown, 'Fabrica: a file opens in an editor, coloured by its name (app.js: JavaScript)', f1);
    await p.evaluate(() => { const t = document.getElementById('fbEdText'); t.focus(); t.setSelectionRange(t.value.length, t.value.length); });
    await p.keyboard.type('console.log(twice(answer));');
    await p.click('#fbEdSave'); await p.waitForTimeout(1200);
    const saved = await p.evaluate(id => IngRepo.readText(id, 'app.js'), fab.id);
    ok(/console\.log\(twice\(answer\)\);$/.test(saved.trimEnd()) && /^const answer = 42;/.test(saved), 'a change saved is the file\'s text', saved.slice(-40));
    const closeEd = () => p.evaluate(() => { const c = [...document.querySelectorAll('#fbEdit .f-btn, #fbEdit button')].find(x => /^Close/.test(x.textContent.trim())); if (c) c.click(); });
    await closeEd(); await p.waitForTimeout(300);
    await p.evaluate(id => { fbHubHost.openEditor({ id }, 'style.css'); }, fab.id);
    await wait(p, () => { const t = document.getElementById('fbEdText'); return t && t.__ingCode && /color: red/.test(t.value); }, null, 15000);
    const f2 = await p.evaluate(() => document.getElementById('fbEdText').__ingCode.langKey);
    await closeEd(); await p.waitForTimeout(300);
    await p.evaluate(id => { fbHubHost.openEditor({ id }, 'big.js'); }, fab.id);
    const opened = await wait(p, n => { const t = document.getElementById('fbEdText'); return t && t.__ingCode && !t.disabled && t.value.length === n; }, fab.bigLen, 30000);
    const f3 = await p.evaluate(() => { const t = document.getElementById('fbEdText'); return { len: t.value.length, disabled: t.disabled, hint: (t.parentNode.querySelector('.f-hint') || {}).textContent }; });
    ok(f2 === 'css' && opened && !f3.disabled, 'a second file (style.css: CSS); and a file of 20 MB, refused before (the limit was 6 MB), is open to edit in place', { f2, f3 });
    await p.screenshot({ path: path.join(OUT, 'fabrica-editor.png') });
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
