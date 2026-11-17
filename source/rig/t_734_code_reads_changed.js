// Ingenium 7.34: Code reads only an app's changed files (modules/r112.js: openInCode and syncFromCode, with the fingerprints last given
// to Code kept in state.fabrica.codeOids). One of the workshop's open ends (7.27): "opening an app in Code still reads all its files".
//   node rig/t_734_code_reads_changed.js <Ingenium page url> <out folder>
// Checks, on an invented app of three text files and a picture:
//   - the first opening reads every file (4), and Code has the three text files;
//   - opened again with nothing changed, it reads nothing, and Code's files are as they were;
//   - one file changed in Fabrica: only that one is read, and Code has its new words;
//   - a file Code no longer has is read again (and only it);
//   - the picture, which Code cannot take, is not read again;
//   - a change made in Fabrica is not undone by Code's older copy when Fabrica is opened (before 7.34 it was);
//   - what Code changes comes back to Fabrica as before (fbSync), reading from Fabrica only the file that differs; after it, opening
//     again reads nothing;
//   - Fabrica's own reads are counted by wrapping IngRepo.read and IngRepo.readText, not taken from the page's own count alone.
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
function ok(c, name, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  ' + JSON.stringify(info).slice(0, 400) : '')); }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(240000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const id = await p.evaluate(async () => {
    const r = await IngRepo.create({ name: 'Harbour Lights' });
    await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Harbour Lights</title><link rel="stylesheet" href="style.css"><h1>Harbour Lights</h1><script src="app.js"></script>');
    await IngRepo.put(r.id, 'style.css', 'h1{color:navy}');
    await IngRepo.put(r.id, 'app.js', 'console.log("lights")');
    await IngRepo.put(r.id, 'icon.png', new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82]));
    await IngRepo.commit(r.id, 'First version');
    /* Fabrica's reads, counted */
    window.__t734 = { read: [], text: [] };
    const r0 = IngRepo.read, t0 = IngRepo.readText;
    IngRepo.read = function (rid, path) { if (rid === r.id) window.__t734.read.push(path); return r0.apply(this, arguments); };
    IngRepo.readText = function (rid, path) { if (rid === r.id) window.__t734.text.push(path); return t0.apply(this, arguments); };
    return r.id;
  });
  async function open() {
    return p.evaluate(async id => {
      try { go('fabrica'); } catch (e) {} for (let i = 0; i < 40 && !document.getElementById('fb'); i++) await new Promise(res => setTimeout(res, 250)); await new Promise(res => setTimeout(res, 1500));
      window.__t734.read = []; window.__fbCodeRead = null;
      const r = (await IngRepo.list()).find(x => x.id === id); fbOpenInCode(r);
      for (let i = 0; i < 120; i++) { await new Promise(res => setTimeout(res, 250)); const pid = state.fabrica.links[id]; const pr = pid && (state.projects || []).find(x => x.id === pid);
        if (window.__fbCodeRead && pr && document.querySelector('#page-code.active')) break; }
      await new Promise(res => setTimeout(res, 600));
      const pr = (state.projects || []).find(x => x.id === state.fabrica.links[id]); try { await ccLoadAll(pr); } catch (e) {}
      return { read: window.__t734.read.slice().sort(), count: window.__fbCodeRead, code: (pr && pr.files || []).filter(f => typeof f.text === 'string').map(f => [f.name, f.text]).sort() };
    }, id);
  }
  const o1 = await open();
  /* the page's own count (window.__fbCodeRead) is openInCode's; the wrapped reads may also hold another part's read of the same app (on a
     release page Fabrica reads the app's picture for its card while Code opens it), so the files are counted once each */
  ok(new Set(o1.read).size === 4 && o1.count && o1.count.read === 4, 'the first opening reads every file (4)', { read: o1.read, count: o1.count });
  ok(o1.code.length === 3 && o1.code.some(([n, t]) => n === 'style.css' && t === 'h1{color:navy}'), 'Code has the three text files (not the picture)', o1.code.map(x => x[0]));
  const o2 = await open();
  ok(o2.read.length === 0 && o2.count && o2.count.read === 0 && o2.count.files === 4, 'opened again with nothing changed, nothing is read', { read: o2.read, count: o2.count });
  ok(JSON.stringify(o2.code) === JSON.stringify(o1.code), "and Code's files are as they were");
  await p.evaluate(async id => { await IngRepo.put(id, 'style.css', 'h1{color:teal}'); }, id);
  const o3 = await open();
  ok(o3.read.length === 1 && o3.read[0] === 'style.css', 'one file changed in Fabrica: only it is read', o3.read);
  ok(o3.code.some(([n, t]) => n === 'style.css' && t === 'h1{color:teal}'), 'and Code has its new words');
  const kept3 = await p.evaluate(id => IngRepo.readText(id, 'style.css'), id);
  ok(kept3 === 'h1{color:teal}', "Fabrica's change is kept: Code's older copy, which Code had not changed, did not come back over it (it did before 7.34)", kept3);
  await p.evaluate(async id => { const pr = state.projects.find(x => x.id === state.fabrica.links[id]); pr.files = pr.files.filter(f => f.name !== 'app.js'); try { saveState(); } catch (e) {} }, id);
  const o4 = await open();
  ok(o4.read.length === 1 && o4.read[0] === 'app.js' && o4.code.some(([n]) => n === 'app.js'), 'a file Code no longer has is read again, and only it', o4.read);
  ok(!o4.read.includes('icon.png') && !o3.read.includes('icon.png') && !o2.read.includes('icon.png'), 'the picture, which Code cannot take, is not read again');
  /* Code changes a file; Fabrica takes it back */
  const back = await p.evaluate(async id => {
    const pr = state.projects.find(x => x.id === state.fabrica.links[id]); await ccLoadAll(pr); const f = pr.files.find(x => x.name === 'app.js'); await ccPut(f, 'console.log("lights on")');
    window.__t734.text = []; const r = (await IngRepo.list()).find(x => x.id === id); const changed = await fbSync(r);
    return { changed, text: window.__t734.text.slice(), now: await IngRepo.readText(id, 'app.js') };
  }, id);
  ok(back.changed === true && back.now === 'console.log("lights on")', "what Code changed comes back to Fabrica, as before", back);
  ok(back.text.length >= 1 && back.text.every(x => x === 'app.js'), 'and Fabrica read only the file that differs to compare it', back.text);
  const none = await p.evaluate(async id => { window.__t734.text = []; const r = (await IngRepo.list()).find(x => x.id === id); const changed = await fbSync(r); return { changed, text: window.__t734.text.slice() }; }, id);
  ok(none.changed === false && none.text.length === 0, 'with nothing changed in Code, Fabrica reads nothing to compare', none);
  const o5 = await open();
  ok(o5.read.length === 0, 'opened again after that, nothing is read', o5.read);
  const kept = await p.evaluate(id => state.fabrica.codeOids && state.fabrica.codeOids[id], id);
  ok(kept && Object.keys(kept).length === 4 && /^~/.test(kept['icon.png']) && !/^~/.test(kept['index.html']), "the fingerprints given to Code are kept with Fabrica's settings (the picture marked as not taken)", kept);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
