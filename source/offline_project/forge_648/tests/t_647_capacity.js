// The Forge 647 (from 644's) · apps of any size, without AI (blocks/forge_bigtext.html, patches_bigtext.json), in Chromium. The owner's words
// (23 October 2026): "I want the Forge to be just as capable and functional as Ingenium with the same increased capabilities. I just
// want to do it all without AI." For each app given (rig/... make_big.js: twice Ingenium's size, and 240 MB):
//   Files:  brought in and kept; Edit as text opens it part by part (its data aside, as data); a search finds the heading; the
//           heading is changed in its part; Keep the change keeps the whole file; Show it on the right runs the changed app
//           from a file of its own; Download it gives the whole file with the change; a small file still opens in the one box;
//   Editor: the app chosen in the Editor runs live, from a file of its own;
//   all along the Forge answers, and no page errors.
//   (647: the one box is the code editor since 645, so whether it shows is read from the editor that stands in its place)
//   node tests/t_647_capacity.js <url of the Forge page> <out folder> <app.html> [<app.html> ...]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, ...APPS] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const LOG = path.join(OUT, 'results.log'); fs.writeFileSync(LOG, '');
const ok = (c, m, d) => { const l = (c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : ''); console.log(l); fs.appendFileSync(LOG, l + '\n'); c ? pass++ : fail++; };
const MB = n => (n / 1048576).toFixed(1) + ' MB'; const sec = t => ((Date.now() - t) / 1000).toFixed(1) + ' s';
const within = (pr, ms) => Promise.race([pr, new Promise(r => setTimeout(() => r(null), ms))]);
async function ping(p) { let w = 0; for (let i = 0; i < 5; i++) { const t = Date.now(); await p.evaluate(() => 1); w = Math.max(w, Date.now() - t); await p.waitForTimeout(100); } return w; }
async function frameHead(p, want, ms = 120000) { const t0 = Date.now(); let last = null;
  while (Date.now() - t0 < ms) { const e = await within(p.$('#frame'), 5000); const fr = e && await within(e.contentFrame(), 5000);
    const attr = await p.evaluate(() => { const f = document.getElementById('frame'); return f ? { src: (f.getAttribute('src') || '').slice(0, 5), srcdoc: f.hasAttribute('srcdoc') ? f.getAttribute('srcdoc').length : 0 } : null; });
    let inner = null; try { inner = fr && await within(fr.evaluate(() => ({ ready: !!window.__capReady, head: (document.getElementById('capHead') || {}).textContent || '' })), 5000); } catch (e) { }
    last = Object.assign({ ready: false, head: '' }, attr || {}, inner || {}); if (last.ready && (!want || last.head === want)) return last; await p.waitForTimeout(400); }
  return last; }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox', '--enable-precise-memory-info'] });
  for (const APP of APPS) {
    const name = path.basename(APP), size = fs.statSync(APP).size, tag = name + ' (' + MB(size) + ')';
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const downloads = []; p.on('download', d => downloads.push(d));
    try {
      await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
      await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(800);
      let t0 = Date.now(); await p.setInputFiles('#filesIn', APP);
      await p.waitForFunction(n => [...document.querySelectorAll('#filesList .dw-row')].some(r => r.textContent.includes(n)), name, { timeout: 120000 }).catch(() => { });
      ok(await p.evaluate(n => [...document.querySelectorAll('#filesList .dw-row')].some(r => r.textContent.includes(n)), name), tag + ': Files: brought in and kept in ' + sec(t0));
      t0 = Date.now();
      await p.evaluate(n => { const r = [...document.querySelectorAll('#filesList .dw-row')].find(r => r.textContent.includes(n)); [...r.querySelectorAll('button')].find(b => b.textContent === 'Edit as text').click(); }, name);
      await p.waitForFunction(() => { const b = document.getElementById('feParts'); return b && b.classList.contains('on') && b.querySelectorAll('.fe-part').length > 3; }, null, { timeout: 120000 }).catch(() => { });
      const op = await p.evaluate(() => ({ parts: document.querySelectorAll('#feParts .fe-part').length, data: document.querySelectorAll('#feParts .fe-part.data').length, box: (t => getComputedStyle(t.__ingCode ? t.__ingCode.wrap : t).display)(document.getElementById('fileEditText')), state: document.getElementById('fileEditState').textContent }));
      const pg1 = await ping(p);
      ok(op.parts > 10 && op.data >= 10 && op.box === 'none', tag + ': Edit as text opens it part by part in ' + sec(t0) + ' (its data aside, as data); the Forge answering within ' + pg1 + ' ms', op);
      await p.fill('#feParts .fe-find', 'capHead'); await p.waitForTimeout(800);
      const hits = await p.evaluate(() => document.querySelectorAll('#feParts .fe-hit').length);
      await p.evaluate(() => document.querySelector('#feParts .fe-hit').click()); await p.waitForTimeout(300);
      const sel = await p.evaluate(() => { const t = document.getElementById('feText'); return t.value.slice(t.selectionStart, t.selectionEnd); });
      ok(hits >= 1 && sel === 'capHead', tag + ': a search finds the heading, and a press opens its part with the word chosen', [hits, sel]);
      await p.evaluate(() => { const t = document.getElementById('feText'); t.value = t.value.replace('The Offline Project, master', 'Changed in the Forge'); t.dispatchEvent(new Event('input')); });
      t0 = Date.now(); await p.click('#fileEditSave');
      await p.waitForFunction(() => /kept|gardé/.test(document.getElementById('fileEditState').textContent), null, { timeout: 120000 }).catch(() => { });
      const kept = await p.evaluate(() => document.getElementById('fileEditState').textContent);
      ok(/kept/.test(kept), tag + ': Keep the change keeps the whole file in ' + sec(t0), kept);
      t0 = Date.now(); await p.click('#fileEditShow');
      const fr = await frameHead(p, 'Changed in the Forge');
      ok(fr && fr.ready && fr.head === 'Changed in the Forge' && fr.src === 'blob:', tag + ': Show it on the right runs the changed app in ' + sec(t0) + ', from a file of its own', fr);
      const n0 = downloads.length; t0 = Date.now(); await p.click('#fileEditDown');
      for (let i = 0; i < 600 && downloads.length <= n0; i++) await p.waitForTimeout(200);
      let dl = null; if (downloads[n0]) { dl = path.join(OUT, 'dl-' + Date.now() + '.html'); await downloads[n0].saveAs(dl); }
      const dlOk = dl && Math.abs(fs.statSync(dl).size - size) < 100 && (() => { const fd = fs.openSync(dl, 'r'), bf = Buffer.alloc(3000); fs.readSync(fd, bf, 0, 3000, 0); fs.closeSync(fd); return bf.toString().includes('Changed in the Forge'); })();
      ok(dlOk, tag + ': Download it gives the whole file with the change in ' + sec(t0), dl ? MB(fs.statSync(dl).size) : 'nothing');
      if (dl) fs.unlinkSync(dl);
      // the file kept: opened again, the change is there
      await p.evaluate(n => { const r = [...document.querySelectorAll('#filesList .dw-row')].find(r => r.textContent.includes(n)); [...r.querySelectorAll('button')].find(b => b.textContent === 'Edit as text').click(); }, name);
      await p.waitForFunction(() => document.querySelectorAll('#feParts .fe-part').length > 3, null, { timeout: 120000 }).catch(() => { });
      await p.fill('#feParts .fe-find', 'Changed in the Forge'); await p.waitForTimeout(800);
      ok(await p.evaluate(() => document.querySelectorAll('#feParts .fe-hit').length >= 1), tag + ': opened again from the store, the change is there');
      // a small file still opens in the one box
      fs.writeFileSync(path.join(OUT, 'small.html'), '<!doctype html><title>small</title><h1>Small</h1>');
      await p.setInputFiles('#filesIn', path.join(OUT, 'small.html'));
      await p.waitForFunction(() => [...document.querySelectorAll('#filesList .dw-row')].some(r => r.textContent.includes('small.html')), null, { timeout: 30000 }).catch(() => { });
      await p.evaluate(() => { const r = [...document.querySelectorAll('#filesList .dw-row')].find(r => r.textContent.includes('small.html')); [...r.querySelectorAll('button')].find(b => b.textContent === 'Edit as text').click(); });
      await p.waitForTimeout(800);
      const sm = await p.evaluate(() => ({ box: (t => getComputedStyle(t.__ingCode ? t.__ingCode.wrap : t).display)(document.getElementById('fileEditText')), v: document.getElementById('fileEditText').value.slice(0, 120), parts: document.getElementById('feParts').classList.contains('on') }));
      ok(sm.box !== 'none' && /<h1>Small/.test(sm.v) && !sm.parts, tag + ': a small file still opens in the one box', sm);
      // the Editor
      await p.evaluate(() => FORGE.openRoom('editor')); await p.waitForTimeout(600);
      t0 = Date.now(); await p.setInputFiles('#edShell', APP);
      const ef = await frameHead(p, 'The Offline Project, master');
      const pg2 = await ping(p);
      ok(ef && ef.ready && ef.src === 'blob:', tag + ': the Editor runs it live in ' + sec(t0) + ', from a file of its own; the Forge answering within ' + pg2 + ' ms', ef);
      const heap = await p.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : 0);
      ok(!errs.length, tag + ': no page errors; memory in use ' + MB(heap), errs.slice(0, 4));
    } catch (e) { ok(false, tag + ': the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
