// The Forge 645 · the code editor in the Forge's own boxes (blocks/forge_code_editor.html with the shared
// build/thoughts/code_editor_core.html), in Chromium. Checks:
//   - Files, Edit as text: a file opens in an editor coloured by its name (app.js: JavaScript); typing and Keep the change keep
//     the file's text;
//   - a file of 20 MB opens whole in the editor (part by part began at 2.5 MB), and is kept whole; a file of 48 MB still opens
//     part by part, each part in an editor;
//   - the Studio's code is an editor (HTML), its own Find still finds a word and chooses it, and an edit runs on the stage;
//   - no page errors.
//   node tests/t_645_code_editor.js <url of the Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const SMALL = '<!doctype html><html><head><meta charset="utf-8"><title>Small app</title><style>h1{color:#335}</style></head><body><header><h1>Small app</h1></header><main id="m"><p class="lead">Words to find</p></main><script>document.getElementById("m").dataset.ready="1";</script></body></html>';

async function bring(p, name, buffer) {
  await p.setInputFiles('#filesIn', { name, mimeType: 'text/plain', buffer });
  await p.waitForFunction(n => [...document.querySelectorAll('#filesList .dw-row')].some(r => r.textContent.includes(n)), name, { timeout: 120000 });
}
async function editAsText(p, name) {
  await p.evaluate(n => { const r = [...document.querySelectorAll('#filesList .dw-row')].find(r => r.textContent.includes(n)); [...r.querySelectorAll('button')].find(b => b.textContent === 'Edit as text').click(); }, name);
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
    await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(800);
    ok(await p.evaluate(() => !!window.IngEditor), 'the shared editor is in the Forge');
    // a small file
    await bring(p, 'app.js', Buffer.from('const answer = 42;\nfunction twice(x) { return x * 2; }\n'));
    await editAsText(p, 'app.js');
    await p.waitForFunction(() => { const t = document.getElementById('fileEditText'); return t && t.__ingCode && /answer/.test(t.value); }, null, { timeout: 20000 });
    const f1 = await p.evaluate(() => { const t = document.getElementById('fileEditText'), w = t.nextElementSibling; return { lang: t.__ingCode.langKey, toks: w.querySelectorAll('.tok-keyword').length, shown: !!w.offsetParent }; });
    ok(f1.lang === 'js' && f1.toks >= 2 && f1.shown, 'Files, Edit as text: the file opens in an editor, coloured by its name (app.js: JavaScript)', f1);
    await p.evaluate(() => { const t = document.getElementById('fileEditText'); t.focus(); t.setSelectionRange(t.value.length, t.value.length); });
    await p.keyboard.type('console.log(twice(answer));');
    await p.click('#fileEditSave'); await p.waitForTimeout(1200);
    await editAsText(p, 'app.js'); await p.waitForTimeout(1200);
    const kept1 = await p.evaluate(() => document.getElementById('fileEditText').value);
    ok(/console\.log\(twice\(answer\)\);$/.test(kept1.trimEnd()) && /^const answer = 42;/.test(kept1), 'typing, then Keep the change, keeps the file\'s text', kept1.slice(-40));
    // 20 MB: whole, in the editor
    const big20 = '/* twenty */\n' + 'let v = 0;\n'.repeat(Math.ceil(20 * 1048576 / 11));
    await bring(p, 'big20.js', Buffer.from(big20)); await editAsText(p, 'big20.js');
    const whole = await p.waitForFunction(n => { const t = document.getElementById('fileEditText'); return t && t.__ingCode && t.value.length === n; }, big20.length, { timeout: 60000 }).then(() => true, () => false);
    const f2 = await p.evaluate(() => ({ parts: !!(document.getElementById('feParts') && document.getElementById('feParts').classList.contains('on')), shown: !!document.getElementById('fileEditText').nextElementSibling.offsetParent }));
    await p.evaluate(() => { const t = document.getElementById('fileEditText'); t.focus(); t.setSelectionRange(0, 0); }); await p.keyboard.type('// edited\n');
    await p.click('#fileEditSave'); await p.waitForTimeout(3000);
    await editAsText(p, 'app.js'); await p.waitForTimeout(800); await editAsText(p, 'big20.js');
    await p.waitForFunction(n => { const t = document.getElementById('fileEditText'); return t && t.value.length === n; }, big20.length + 10, { timeout: 60000 }).catch(() => { });
    const kept2 = await p.evaluate(() => { const t = document.getElementById('fileEditText').value; return { len: t.length, head: t.slice(0, 22) }; });
    ok(whole && !f2.parts && f2.shown && kept2.len === big20.length + 10 && kept2.head === '// edited\n/* twenty */', 'a file of 20 MB opens whole in the editor (part by part began at 2.5 MB), and is kept whole with the edit', { f2, kept2 });
    // 48 MB: still part by part, each part in an editor
    const big48 = '<!doctype html><html><head><title>Big</title></head><body>\n' + Array.from({ length: 12 }, (_, i) => '<script id="p' + i + '">\n' + ('var a' + i + ' = 1;\n').repeat(Math.ceil(4 * 1048576 / 12)) + '</script>\n').join('') + '</body></html>';
    await bring(p, 'big48.html', Buffer.from(big48)); await editAsText(p, 'big48.html');
    const parted = await p.waitForFunction(() => { const b = document.getElementById('feParts'); return b && b.classList.contains('on') && b.querySelectorAll('.fe-part').length > 3; }, null, { timeout: 120000 }).then(() => true, () => false);
    await p.evaluate(() => { const x = document.querySelectorAll('#feParts .fe-part')[1]; if (x) x.click(); }); await p.waitForTimeout(800);
    const f3 = await p.evaluate(() => { const t = document.getElementById('feText'); return { ed: !!(t && t.__ingCode), shown: !!(t && t.nextElementSibling && t.nextElementSibling.offsetParent) }; });
    ok(parted && f3.ed && f3.shown, 'a file of ' + (big48.length / 1048576).toFixed(0) + ' MB still opens part by part, each part in an editor', f3);
    // the Studio's code
    await p.evaluate(() => FORGE.openRoom('editor')); await p.waitForTimeout(600);
    await p.setInputFiles('#edShell', { name: 'small_app.html', mimeType: 'text/html', buffer: Buffer.from(SMALL) }); await p.waitForTimeout(2500);
    await p.evaluate(() => { document.getElementById('fold-studio').open = true; document.getElementById('fsOpenCode').click(); }); await p.waitForTimeout(800);
    const s1 = await p.evaluate(() => { const t = document.getElementById('fsCode'); return { ed: !!(t && t.__ingCode), lang: t && t.__ingCode && t.__ingCode.langKey, has: t && /Small app/.test(t.value), shown: !!(t && t.nextElementSibling.offsetParent) }; });
    ok(s1.ed && s1.lang === 'html' && s1.has && s1.shown, 'the Studio\'s code is an editor (HTML)', s1);
    await p.fill('#fsFind', 'Words to find'); await p.evaluate(() => { const b = [...document.querySelectorAll('#fold-studio button')].find(x => /^Find$|Find next|^Chercher/.test(x.textContent.trim())); if (b) b.click(); else document.getElementById('fsFind').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); });
    await p.waitForTimeout(400);
    const picked = await p.evaluate(() => { const t = document.getElementById('fsCode'); return t.value.slice(t.selectionStart, t.selectionEnd); });
    ok(picked === 'Words to find', 'the Studio\'s own Find still finds a word in the code and chooses it', picked);
    await p.evaluate(() => { const t = document.getElementById('fsCode'); t.focus(); t.setSelectionRange(t.selectionEnd, t.selectionEnd); });
    await p.keyboard.type(' and more');
    await p.evaluate(() => document.getElementById('fsRun').click()); await p.waitForTimeout(2500);
    const ran = await p.evaluate(() => { try { return document.getElementById('frame').contentDocument.body.innerText; } catch (e) { return ''; } });
    ok(/Words to find and more/.test(ran), 'an edit typed in the editor runs on the stage', ran.slice(0, 120));
    await p.screenshot({ path: path.join(OUT, 'studio.png') });
    // the preview's Code view: the whole file, in a read-only editor (it showed the first 400,000 characters)
    const cv = await p.evaluate(async () => { const body = '<!doctype html><title>Long</title>\n<script>\n' + 'var line = "a line of the long app";\n'.repeat(60000) + '</script>\n<p id="last">The very end</p>';
      FORGE.showDoc(body, 'long.html', body, 'html'); document.getElementById('viewCode').click(); await new Promise(r => setTimeout(r, 1500));
      const t = document.getElementById('codeViewText'), w = document.getElementById('codeViewWrap');
      return { len: body.length, got: t ? t.value.length : -1, ro: t && t.__ingCode ? t.__ingCode.view.state.readOnly : null, shown: !!(w && w.offsetParent && w.getBoundingClientRect().height > 200), pre: getComputedStyle(document.getElementById('codeView')).display, lang: t && t.__ingCode && t.__ingCode.langKey }; });
    ok(cv.got === cv.len && cv.len > 400000 && cv.ro === true && cv.shown && cv.pre === 'none' && cv.lang === 'html', 'the preview\'s Code view shows the whole file (' + (cv.len / 1048576).toFixed(1) + ' MB) in a read-only editor, where the first 400,000 characters stood', cv);
    await p.evaluate(() => document.getElementById('viewPrev').click());
    const fab = await p.evaluate(() => window.ingFabMB);
    ok(fab && fab.compare === 64 && fab.history === 48 && fab.blame === 32 && fab.search === 64 && fab.files === 20000 && fab.inline === 128, 'Fabrica\'s limits as Ingenium\'s: 64 MB compared line by line, 48 MB in a history, 32 MB in Blame, 64 MB and 20,000 files searched, 128 MB written into a page', fab);
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
