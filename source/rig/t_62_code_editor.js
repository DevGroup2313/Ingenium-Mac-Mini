// Ingenium 6.2 · the code editor alone (build/thoughts/code_editor_core.html, from build/codeedit), in Chromium, on a page with
// three plain boxes of code (rig/code_editor_harness: made by this test from the core). Checks:
//   - each box is taken over: an editor in its place, the box itself hidden, its name kept for a screen reader;
//   - the box still answers as a box: value read and written (no input event when written, as a box), selection read and set,
//     focus; typing in the editor fires input, then change when it loses focus; hidden and disabled are mirrored;
//   - colours for code, by language from the file's name or its first words, the day set or the night set by the box's
//     background; the language can be changed from the bar;
//   - find and replace (Ctrl+F), undo, a second cursor;
//   - a large app (107 MB, its data encoded in script blocks): put in within seconds, its data shown as short marks the
//     cursor steps over, typing stays quick, and the text read back is the app exactly, with the edit;
//   - a file with Windows line ends comes back with them;
//   - no page errors.
//   node rig/t_62_code_editor.js <core html> <out folder> [<large app.html>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [CORE, OUT, BIG] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const core = fs.readFileSync(CORE, 'utf8');
const PAGE = `<!doctype html><html><head><meta charset="utf-8"><title>Editor harness</title>
<style>body{font:14px system-ui;margin:20px;background:#fafafa} #a{width:100%;height:300px;font:13px/1.5 monospace;border:1px solid #bbb;border-radius:8px;padding:8px;background:#fff;color:#222}
#b{height:200px;width:100%;background:#1e232a;color:#ddd;border-radius:8px;font:12px/1.6 monospace} .boxdark{background:#1e232a;padding:10px}</style></head><body>
<h1>Harness</h1><textarea id="a" spellcheck="false" aria-label="The app's code"></textarea>
<div class="boxdark"><textarea id="b" rows="10"></textarea></div>
<textarea id="c" rows="6" data-file="main.py"></textarea>
${core}<script>window.__log=[];var a=document.getElementById("a");a.addEventListener("input",function(){__log.push("input:"+this.value.length);});
a.addEventListener("change",function(){__log.push("change");});IngEditor.auto("#a,#b,#c");window.__ready=true;</script></body></html>`;
const HFILE = path.join(OUT, 'harness.html'); fs.writeFileSync(HFILE, PAGE);

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto('file://' + HFILE); await p.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
    const t1 = await p.evaluate(() => ['a', 'b', 'c'].map(id => { const t = document.getElementById(id), w = t.nextElementSibling;
      return { ed: !!(w && w.classList.contains('ic-wrap') && w.querySelector('.cm-editor')), boxHidden: getComputedStyle(t).display === 'none',
        label: (w.querySelector('.cm-content') || {}).getAttribute && w.querySelector('.cm-content').getAttribute('aria-label'), dark: w.classList.contains('ic-dark'), h: w.getBoundingClientRect().height }; }));
    ok(t1.every(x => x.ed && x.boxHidden && x.h > 100) && t1[0].label === "The app's code" && !t1[0].dark && t1[1].dark, 'each box is taken over: an editor in its place, the box hidden, its name kept; the night colours on a dark box', t1);
    // the box still answers as a box
    const t2 = await p.evaluate(() => { const a = document.getElementById('a'); __log = [];
      a.value = '<!doctype html>\n<title>T</title>\n<script>\nfunction hello(){ return 42; }\n</script>\n';
      const v1 = a.value; a.setSelectionRange(16, 21); const s = [a.selectionStart, a.selectionEnd]; a.focus();
      return { same: v1 === '<!doctype html>\n<title>T</title>\n<script>\nfunction hello(){ return 42; }\n</script>\n', sel: s, log: __log.slice(), focused: !!document.activeElement.closest('.cm-editor'),
        lang: a.__ingCode.langKey, toks: [...a.nextElementSibling.querySelectorAll('[class*="tok-"]')].length }; });
    ok(t2.same && t2.sel[0] === 16 && t2.sel[1] === 21 && t2.log.length === 0 && t2.focused, 'the box answers as a box: value written and read back, no input event for a value written, selection set and read, focus', t2);
    ok(t2.lang === 'html' && t2.toks > 3, 'colours for code: HTML known by its first words, its parts coloured', t2);
    await p.keyboard.type('X'); await p.waitForTimeout(100);
    const t3 = await p.evaluate(() => { const a = document.getElementById('a'); return { v: a.value.slice(14, 24), log: __log.slice() }; });
    ok(/^\n<titlX/.test(t3.v) === false && /X/.test(t3.v) && t3.log.some(x => /^input:/.test(x)), 'typing in the editor replaces the chosen words and fires input, as the box did', t3);
    await p.click('h1'); await p.waitForTimeout(100);
    ok(await p.evaluate(() => __log.includes('change')), 'change, when the editor loses focus after an edit');
    const t4 = await p.evaluate(async () => { const a = document.getElementById('a'), w = a.nextElementSibling; a.style.display = 'none'; await new Promise(r => setTimeout(r, 50));
      const hid = getComputedStyle(w).display === 'none'; a.style.display = ''; a.disabled = true; await new Promise(r => setTimeout(r, 50));
      const ro = a.__ingCode.view.state.readOnly; a.disabled = false; await new Promise(r => setTimeout(r, 50));
      return { hid, shownAgain: getComputedStyle(w).display !== 'none', ro, rw: !a.__ingCode.view.state.readOnly }; });
    ok(t4.hid && t4.shownAgain && t4.ro && t4.rw, 'hidden and disabled are mirrored', t4);
    const t5 = await p.evaluate(() => { const c = document.getElementById('c'); c.value = 'def f(x):\n    return x * 2\n'; return { lang: c.__ingCode.langKey, toks: c.nextElementSibling.querySelectorAll('.tok-keyword').length }; });
    ok(t5.lang === 'py' && t5.toks >= 2, 'the language from the file\'s name (main.py): Python keywords coloured', t5);
    await p.evaluate(() => { const w = document.getElementById('c').nextElementSibling, s = w.querySelector('.ic-lang'); s.value = 'js'; s.dispatchEvent(new Event('change')); });
    ok(await p.evaluate(() => document.getElementById('c').__ingCode.langKey === 'js'), 'the language can be changed from the bar');
    // find and replace, undo, a second cursor
    await p.evaluate(() => { const a = document.getElementById('a'); a.value = 'alpha beta alpha gamma alpha'; a.focus(); });
    await p.keyboard.press('Control+f'); await p.waitForTimeout(200);
    const panel = await p.evaluate(() => !!document.querySelector('#a + .ic-wrap .cm-search'));
    await p.fill('#a + .ic-wrap .cm-search input[name=search]', 'alpha'); await p.fill('#a + .ic-wrap .cm-search input[name=replace]', 'omega');
    await p.click('#a + .ic-wrap .cm-search button[name=replaceAll]'); await p.waitForTimeout(100);
    const rep = await p.evaluate(() => document.getElementById('a').value);
    await p.evaluate(() => document.getElementById('a').__ingCode.view.focus()); await p.keyboard.press('Escape'); await p.keyboard.press('Control+z'); await p.waitForTimeout(100);
    const und = await p.evaluate(() => document.getElementById('a').value);
    ok(panel && rep === 'omega beta omega gamma omega' && und === 'alpha beta alpha gamma alpha', 'find and replace all, then undo', { panel, rep, und });
    const multi = await p.evaluate(() => { const v = document.getElementById('a').__ingCode.view, E = IngEditor.cm.EditorSelection;
      v.dispatch({ selection: E.create([E.cursor(0), E.cursor(11)]) }); v.dispatch(v.state.replaceSelection('>')); return document.getElementById('a').value; });
    ok(multi === '>alpha beta >alpha gamma alpha', 'two cursors type at once', multi);
    // Windows line ends come back as they were
    const crlf = await p.evaluate(() => { const c = document.getElementById('c'); c.value = 'one\r\ntwo\r\nthree\r\n'; c.setSelectionRange(5, 8); const s = [c.selectionStart, c.selectionEnd]; return { back: c.value === 'one\r\ntwo\r\nthree\r\n', s, picked: c.__ingCode.view.state.sliceDoc(c.__ingCode.view.state.selection.main.from, c.__ingCode.view.state.selection.main.to) }; });
    ok(crlf.back && crlf.picked === 'two' && crlf.s[0] === 5 && crlf.s[1] === 8, 'a file with Windows line ends comes back with them, and its positions count as the box counted', crlf);
    // a large app
    if (BIG) {
      const big = fs.readFileSync(BIG, 'utf8'); const p2 = await ctx.newPage(); p2.on('pageerror', e => errs.push('big: ' + e.message));
      await p2.goto('file://' + HFILE); await p2.waitForFunction(() => window.__ready === true);
      await p2.evaluate(() => { window.__big = ''; });
      // the text goes in by pieces (the test's own channel), then into the box at once, as an app does
      for (let i = 0; i < big.length; i += 8 << 20) await p2.evaluate(s => { window.__big += s; }, big.slice(i, i + (8 << 20)));
      const put = await p2.evaluate(() => { const t0 = performance.now(); const a = document.getElementById('a'); a.value = window.__big; const ms = performance.now() - t0;
        const w = a.nextElementSibling; return { ms: Math.round(ms), len: a.value.length, marks: w.querySelectorAll('.ic-mark').length, lines: a.__ingCode.view.state.doc.lines }; });
      ok(put.len === big.length && put.ms < 15000 && put.marks >= 1, 'a ' + (big.length / 1048576).toFixed(0) + ' MB app is put in within seconds, its data shown as short marks', put);
      // typing near the start: each key answered quickly
      await p2.evaluate(() => { const a = document.getElementById('a'); a.focus(); a.setSelectionRange(0, 0); });
      const t0 = Date.now(); for (let i = 0; i < 20; i++) await p2.keyboard.type('z'); const perKey = (Date.now() - t0) / 20;
      const back = await p2.evaluate(() => { const v = document.getElementById('a').value; return { len: v.length, head: v.slice(0, 20) }; });
      ok(perKey < 120 && back.len === big.length + 20 && back.head === 'z'.repeat(20), 'typing in it stays quick (' + perKey.toFixed(0) + ' ms a key), and the text read back is the app with the edit', { perKey, back });
      const exact = await p2.evaluate(() => { const v = document.getElementById('a').value; return v.slice(20) === window.__big; });
      ok(exact, 'everything else in it is exactly as it was, the data under the marks included');
      await p2.screenshot({ path: path.join(OUT, 'big.png') }); await p2.close();
    }
    await p.screenshot({ path: path.join(OUT, 'harness.png'), fullPage: true });
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
