// Ingenium 6.2 · the stage lets go (modules/r156.js), in Chromium. The owner's words (22 October 2026): "The live preview panel
// still show the HTML app even after I remove it from the chat box and never send the message, that crashes the app".
// An app sent as a file (a chip in the message box) runs in the stage when pressed; then:
//   - a large page (over 2 MB) reaches the frame as a file of its own (a blob URL), never as a srcdoc attribute;
//   - closing the stage stops a large page (the frame is emptied); opening it again starts the page afresh;
//   - the chip's ✕ takes the page off the stage, empties the frame, closes the stage and lets the stored copy go;
//   - a small page runs as before (srcdoc), and its ✕ clears the stage too;
//   - a very large page (over 16 MB) asks first: Not now leaves the stage as it was, Run it here runs it;
//   - a page a model writes in a reply still opens in the stage as before;
//   - the page answers at once all along, and no page errors.
//   node rig/t_62_stage.js http://127.0.0.1:8150/ingenium.html <out folder> <small app.html> <large app.html> <very large app.html>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, SMALL, LARGE, HUGE] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });

async function boot(b) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500); await p.evaluate(() => go('chat')); await p.waitForTimeout(500); return p;
}
// the page is handed a file as a drop would hand it (the text read here, given to the page's own stageText)
async function stage(p, file) {
  const text = fs.readFileSync(file, 'utf8');
  await p.evaluate(({ name, text }) => { stageText(name, text, false); }, { name: path.basename(file), text });
  return text.length;
}
const frame = p => p.evaluate(() => { const f = document.getElementById('csFrame'), c = window.csCur;
  return { src: f.getAttribute('src') || '', srcdoc: f.hasAttribute('srcdoc') ? f.getAttribute('srcdoc').length : -1, on: document.body.classList.contains('cs-on'),
    cur: c ? { kind: c.kind, name: c.name, ref: c.ref || null, n: c.html.length } : null, chips: document.querySelectorAll('#chatChips .cchip').length }; });
async function ping(p) { let worst = 0; for (let i = 0; i < 6; i++) { const t = Date.now(); await p.evaluate(() => 1); worst = Math.max(worst, Date.now() - t); await p.waitForTimeout(150); } return worst; }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  try {
    const p = await boot(b);
    ok(await p.evaluate(() => !!(window.IngStage && IngStage.big === 2000000)), 'the stage module is in the page', await p.evaluate(() => !!window.IngStage));

    // ---------------- a large page (over 2 MB) ----------------
    const nL = await stage(p, LARGE);
    const ref = await p.evaluate(() => stagedFiles[stagedFiles.length - 1].page);
    await p.click('#chatChips .cchip.pv'); await p.waitForTimeout(2500);
    let s = await frame(p);
    ok(s.on && s.cur && s.cur.kind === 'file' && s.cur.ref === ref && /^blob:/.test(s.src) && s.srcdoc === -1, 'a large page (' + Math.round(nL / 1e6) + ' M characters) runs in the stage from a file of its own, not a srcdoc attribute', s);
    await shot(p, 's62-large-open');
    const p1 = await ping(p); ok(p1 < 400, 'the page answers at once while it runs', p1 + ' ms');
    // closing stops it; opening again starts it afresh
    await p.evaluate(() => csOpen(false, true)); await p.waitForTimeout(500);
    s = await frame(p);
    ok(!s.on && !s.src && s.srcdoc === -1 && s.cur && s.cur.ref === ref, 'closing the stage stops the large page (the frame is emptied); it stays the page of the stage', s);
    await p.evaluate(() => csOpen(true, true)); await p.waitForTimeout(1500);
    s = await frame(p);
    ok(s.on && /^blob:/.test(s.src), 'opened again, it starts afresh', s);
    // the chip's ✕
    await p.click('#chatChips .cchip .cx'); await p.waitForTimeout(800);
    s = await frame(p);
    const gone = await p.evaluate(async r => !(await IngBig.load(r)), ref);
    ok(s.chips === 0 && !s.cur && !s.src && s.srcdoc === -1 && !s.on, 'the ✕ on the chip takes the page off the stage, empties the frame and closes the stage', s);
    ok(gone, 'and the stored copy of the page is let go', gone);
    await shot(p, 's62-large-removed');

    // ---------------- a small page ----------------
    await stage(p, SMALL);
    await p.click('#chatChips .cchip.pv'); await p.waitForTimeout(1500);
    s = await frame(p);
    ok(s.on && s.cur && s.cur.kind === 'file' && !s.src && s.srcdoc > 1000, 'a small page runs as before, in srcdoc', s);
    await p.click('#chatChips .cchip .cx'); await p.waitForTimeout(600);
    s = await frame(p);
    ok(!s.cur && s.srcdoc === -1 && !s.on, 'and its ✕ clears the stage too', s);

    // ---------------- a page that is not the one on the stage ----------------
    await stage(p, SMALL); await stage(p, LARGE);
    await p.click('#chatChips .cchip.pv >> nth=0'); await p.waitForTimeout(1500);
    await p.click('#chatChips .cchip:nth-child(2) .cx'); await p.waitForTimeout(600);
    s = await frame(p);
    ok(s.chips === 1 && s.on && s.cur && s.cur.kind === 'file' && s.srcdoc > 1000, 'removing another file leaves the page on the stage as it is', s);
    await p.click('#chatChips .cchip .cx'); await p.waitForTimeout(500);

    // ---------------- a very large page asks first ----------------
    const nH = await stage(p, HUGE);
    await p.click('#chatChips .cchip.pv'); await p.waitForTimeout(1200);
    const ask = await p.evaluate(() => { const a = document.querySelector('.ing-ask'); return a ? a.textContent : null; });
    ok(!!ask && /Run it here/.test(ask) && /Not now/.test(ask), 'a very large page (' + Math.round(nH / 1e6) + ' M characters) asks before it runs', ask);
    await shot(p, 's62-huge-ask');
    await p.click('.ing-ask-keys .btn.ghost'); await p.waitForTimeout(500);
    s = await frame(p);
    ok(!s.cur && !s.on, 'Not now: nothing runs', s);
    await p.click('#chatChips .cchip.pv'); await p.waitForTimeout(800); await p.click('.ing-ask-keys .btn.primary'); await p.waitForTimeout(3000);
    s = await frame(p);
    ok(s.on && s.cur && /^blob:/.test(s.src), 'Run it here: it runs, from a file of its own', s);
    const p2 = await ping(p); ok(p2 < 600, 'the page still answers at once', p2 + ' ms');
    await p.click('#chatChips .cchip .cx'); await p.waitForTimeout(800);
    s = await frame(p);
    ok(!s.cur && !s.src && !s.on, 'and its ✕ lets it go', s);

    // ---------------- a reply's page still opens ----------------
    await p.evaluate(() => { const c = curChat(); c.messages = c.messages || []; c.messages.push({ role: 'me', text: 'make a page', at: Date.now() });
      c.messages.push({ role: 'bot', text: 'Here it is.\n```html\n<!doctype html><html><head><title>Reply page</title></head><body><h1>Hello from the reply</h1></body></html>\n```', at: Date.now() }); renderChat(); });
    await p.waitForTimeout(800);
    await p.evaluate(() => { const k = document.querySelector('.cs-card'); if (k) k.click(); }); await p.waitForTimeout(1000);
    s = await frame(p);
    ok(s.on && s.cur && s.cur.kind === 'reply' && s.srcdoc > 100 && !s.src, 'a page from a reply still opens in the stage as before', s);
    ok(p.__errs.length === 0, 'no page errors along the way', p.__errs.slice(0, 4));
  } catch (e) { ok(false, 'crashed: ' + (e && e.stack || e)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
