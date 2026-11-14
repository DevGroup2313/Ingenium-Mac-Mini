// Fabrica's header card and its four steps, as Ingenium draws them with quill-notes open (an invented app), by day and by night: pictures
// for the phase 3 preview, which shows the panels live below them. The tree is drawn by the graphics chip, so the pictures are taken with it.
//   node capture_head.js <page url> <out folder> <logos.json>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, LOGOS] = process.argv.slice(2); const L = JSON.parse(fs.readFileSync(LOGOS, 'utf8')); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(async (L) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    const enc = s => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada', email: '' });
    const page = (t, logo) => '<!doctype html><html><head><meta charset="utf-8"><link rel="icon" type="image/png" sizes="256x256" href="data:image/png;base64,' + logo + '"><title>' + t + '</title></head><body><h1>' + t + '</h1></body></html>';
    const a = await IngRepo.fromFiles([{ path: 'index.html', data: enc(page('Quill Notes', L.quill)) }, { path: 'README.md', data: enc('# Quill Notes\n') }], { name: 'quill-notes' });
    const put = (f, t) => IngRepo.put(a.id, f, enc(t)), keep = m => IngRepo.commit(a.id, m);
    for (const [i, m] of ['A reader for long notes', 'The export keeps its fonts', 'French for the guide'].entries()) { await put('n' + i + '.txt', 'v' + i); await keep(m); }
    await IngRepo.tag(a.id, 'v3.2'); await IngRepo.branch(a.id, 'night-reader'); await IngRepo.switchTo(a.id, 'night-reader'); await put('r.js', '1'); await keep('Night mode for the reader'); await IngRepo.switchTo(a.id, 'main');
    await put('p.js', '1'); await keep('Print in colour'); await IngRepo.tag(a.id, 'v3.3-beta');
    await IngRepo.fromFiles([{ path: 'index.html', data: enc(page('Harbour Garden', L.leaf)) }], { name: 'harbour-garden' });
    await IngRepo.fromFiles([{ path: 'index.html', data: enc(page('Ledger', L.ledger)) }], { name: 'ledger' });
    go('fabrica'); }, L);
  await p.waitForTimeout(2500);
  await p.evaluate(() => { const r = [...document.querySelectorAll('#fb .f-repo')].find(x => /quill-notes/.test(x.textContent)); if (r) r.click(); }); await p.waitForTimeout(3000);
  const geo = {};
  for (const th of ['day', 'night']) {
    await p.evaluate((th) => { state.theme = th; applyTheme(); window.scrollTo(0, 0); }, th); await p.waitForTimeout(3500);
    const g = await p.evaluate(() => { const pg = document.getElementById('page-fabrica'), fb = document.getElementById('fb'), a = pg.getBoundingClientRect(), f = fb.getBoundingClientRect();
      return { pageTop: Math.round(a.top + scrollY), fbTop: Math.round(f.top + scrollY), left: Math.round(f.left), width: Math.round(f.width), says: document.querySelector('#page-fabrica .skh-says').textContent }; });
    geo[th] = g;
    await p.screenshot({ path: path.join(OUT, 'head_' + th + '.png'), clip: { x: 221, y: 0, width: 1364 - 221, height: g.fbTop } });
  }
  fs.writeFileSync(path.join(OUT, 'head.json'), JSON.stringify(geo, null, 1));
  console.log(JSON.stringify(geo), 'errors', JSON.stringify(errs));
  await b.close();
})();
