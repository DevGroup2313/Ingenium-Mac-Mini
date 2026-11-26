// node rig/t_797_panels.js <page url> <modules/r400.js> [inject]
// Ingenium 7.97 (modules/r400.js): Adamas's Show the preview and Show the code keys appear when their panel is away and bring it back; a page
// opened part by part says so and its Close key names it; closed, your own page comes back; Display, Bring back every panel.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const src = fs.readFileSync(process.argv[3], 'utf8'); const css = src.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1]; const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  if (process.argv[4] === 'inject') await p.evaluate(([css, js]) => { if (!document.getElementById('r400-css')) { const s = document.createElement('style'); s.id = 'r400-css'; s.textContent = css; document.head.appendChild(s); (0, eval)(js); } }, [css, js]);
  await p.evaluate(() => go('build')); await sleep(1800);
  const vis = (sel) => p.evaluate((sel) => { const e = document.querySelector(sel); return !!(e && e.offsetParent && e.getBoundingClientRect().width > 20); }, sel);
  await p.click('#closePreview'); await sleep(600);
  ok(!(await vis('#previewPane')) && await vis('#showPreview'), 'Close the preview: the preview goes, and Show the preview stands in its place');
  ok((await p.textContent('#showPreview')).trim() === 'Show the preview', 'the key says what it does');
  await p.evaluate(() => document.getElementById('showPreview').scrollIntoView({ block: 'center' })); await sleep(300);
  await p.screenshot({ path: 'r400_show_preview.png' });
  await p.click('#showPreview'); await sleep(600);
  ok(await vis('#previewPane') && await vis('#editorPane'), 'Show the preview brings it back beside the code');
  await p.click('#hideEditor'); await sleep(600);
  ok(!(await vis('#editorPane')) && await vis('#showEditor'), 'Hide the code: the code goes, and Show the code stands in the preview bar');
  await p.screenshot({ path: 'r400_show_code.png' });
  await p.click('#showEditor'); await sleep(600);
  ok(await vis('#editorPane'), 'Show the code brings it back');
  await p.click('#hideEditor'); await sleep(300); await p.click('#closePreview'); await sleep(600);
  ok(await vis('#editorPane') && await vis('#showPreview'), 'closing the preview while the code is hidden gives the code its width back: never both away');
  await p.click('#showPreview'); await sleep(500);
  await p.evaluate(() => { let s = '<!doctype html><html><head></head><body><h1>Tide Clock</h1>'; for (let i = 0; i < 160; i++) s += '<script>var x' + i + '="' + 'a'.repeat(22000) + '";</script>\n'; s += '</body></html>'; IngBuild.open({ name: 'tide.html', text: s, title: 'Tide Clock' }); });
  await sleep(1500);
  const lg = await p.evaluate(() => { const box = document.getElementById('bdBox'); const c = box.querySelector('.r400-close'); const say = box.querySelector('.r400-say'); return { close: c ? c.textContent : null, say: say ? say.textContent : null, raised: c ? getComputedStyle(c).boxShadow !== 'none' : false }; });
  ok(lg.close === 'Close Tide Clock' && lg.raised, 'a page opened part by part has a raised key that says what it closes', lg);
  ok(lg.say && /part by part/.test(lg.say) && /Close Tide Clock brings back your own page/.test(lg.say), 'and one line that says how the two panels go together', lg.say);
  await p.evaluate(() => document.getElementById('bdBox').scrollIntoView({ block: 'start' })); await sleep(300); await p.evaluate(() => window.scrollBy(0, -160)); await sleep(300);
  await p.screenshot({ path: 'r400_large.png' });
  await p.evaluate(() => { window.confirm = () => true; }); await p.click('#bdBox .r400-close'); await sleep(1500);
  const back = await p.evaluate(() => ({ large: document.getElementById('buildGrid').classList.contains('bd-large'), code: document.getElementById('codeEditor').value.length, frame: (() => { try { const d = document.getElementById('previewFrame').contentDocument; return d && d.body ? d.body.innerText.slice(0, 60) : '(no access)'; } catch (e) { return '(sandboxed)'; } })() }));
  ok(!back.large && back.code > 50, 'closed, your own page is back in the code (the sample when the code was empty)', back);
  await p.evaluate(() => { setBuildView('closed'); document.body.setAttribute('data-buildfold', '1'); }); await sleep(300);
  await p.evaluate(() => { document.getElementById('displayPanel').hidden = false; }); await sleep(300);
  ok(await vis('#r400Panels'), 'Display has Bring back every panel');
  await p.evaluate(() => document.getElementById('r400Panels').scrollIntoView({ block: 'center' })); await sleep(300);
  await p.screenshot({ path: 'r400_display.png' });
  await p.click('#r400Panels'); await sleep(600); await p.evaluate(() => { document.getElementById('displayPanel').hidden = true; }); await sleep(300);
  ok(await vis('#previewPane') && (await p.evaluate(() => document.body.getAttribute('data-buildfold'))) === '0', 'pressed, every panel is back (the preview docked and unfolded)');
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
