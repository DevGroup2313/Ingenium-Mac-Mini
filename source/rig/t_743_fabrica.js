// Ingenium 7.43: Fabrica's next pass (r330, with hooks in r141, r111, r298). Her approval of the live preview
// (source/previews/fabrica_next, https://claude.ai/artifact/2aHjSvn6yc7JSusyQn3aqo): "I approve of the Fabrica Next Pass preview, please
// commit and push it everywhere." An invented app, "Quill", with one file that reaches the internet and one wide button.
//   node rig/t_743_fabrica.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const APP = `<!doctype html><html><head><meta charset="utf-8"><title>Quill</title>
<link rel="stylesheet" href="https://fonts.example.invalid/css?family=Quill">
<style>
html,body{scrollbar-width:none;margin:0;font:15px system-ui;background:#f7f4fb;color:#221a2e}
body.night{background:#1a1424;color:#efe8fa}
button{padding:8px 14px;border-radius:10px;border:1px solid #ccc;background:#fff;transition:transform .2s}
button:hover{transform:translateY(-2px)}
.wide{width:600px}
.card{padding:12px;margin:12px;background:#fff;border-radius:12px}
.card:hover{transform:translateY(-3px)}
button:focus-visible{outline:3px solid #6a3fb5}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style></head><body><div class="card">Quill <button>Write</button> <button class="wide">Add a page to the notebook</button></div>
<a href="https://example.invalid/help">Help</a>
<script src="app.js"></script></body></html>`;
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngFabNext, null, { timeout: 600000, polling: 500 }); await sleep(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2000);
  const S = await p.evaluate(async (APP) => { const r = await IngRepo.create({ name: 'Quill' });
    await IngRepo.put(r.id, 'index.html', APP);
    await IngRepo.put(r.id, 'app.js', 'fetch("https://api.example.invalid/sync").catch(function(){});\nfetch("data/local.json").catch(function(){});\n');
    const first = await IngRepo.commit(r.id, 'The first version');
    fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return { id: r.id, first }; }, APP);
  await sleep(1500);
  // 1. her apps: the checks on every version, and main waits for the checks and her approval, from the start
  const d = await p.evaluate(async (id) => { const rec = await fbHub.live(id); return { auto: rec && rec.auto, rules: rec && rec.rules }; }, S.id);
  ok(d.auto === true && d.rules && d.rules.review === true && d.rules.checks === true, 'her app, from the start: the checks on every version, main waits for the checks and her approval', d);
  // 2. offline and in-house
  await p.evaluate(() => fbHub.open('actions')); await p.waitForFunction(() => { const b = document.getElementById('hOffline'); return b && !b.querySelector('.f-ck.run'); }, null, { timeout: 60000 });
  const o = await p.evaluate(() => { const b = document.getElementById('hOffline'); return { head: b.querySelector('.f-ck').textContent, list: [...b.querySelectorAll('.r330-list li')].map(l => l.textContent), afterSafety: b.previousElementSibling && b.previousElementSibling.id }; });
  ok(/2 places reach outside the app, to 2 addresses/.test(o.head) && o.list.some(t => /fonts\.example\.invalid: a style or font in index\.html, line 2/.test(t)) && o.list.some(t => /api\.example\.invalid: a call in app\.js, line 1/.test(t)) && !o.list.some(t => /help/.test(t)) && o.afterSafety === 'hSafety',
    'Offline and in-house: the font and the call are named by file and line; the local file and the plain link are not counted; beside Safety', o);
  // 3. her ways of working, measured
  await p.locator('#hWays button', { hasText: 'Measure this version' }).click();
  await p.waitForFunction(() => { const b = document.getElementById('hWays'); return b && b.querySelectorAll('.r330-way').length === 7; }, null, { timeout: 60000 });
  const w = await p.evaluate(() => { const b = document.getElementById('hWays'); return { head: b.querySelector('.f-ck').textContent, rows: [...b.querySelectorAll('.r330-way')].map(r => r.querySelector('.r330-tag').textContent + ' ' + r.querySelector('span:nth-child(2)').textContent + ' | ' + r.querySelector('em').textContent) }; });
  const has = (re) => w.rows.some(r => re.test(r));
  ok(has(/^Kept Every key and card answers the pointer/) && has(/^Look No long wide buttons \| "Add a page to the notebook", 600 px wide/) && has(/^Kept No scroll bar in view/) && has(/^Kept No purple shade/) && has(/^Kept A night look/) && has(/^Kept Still when motion is reduced/) && has(/^Kept Keys answer the keyboard/) && /6 of 7 kept/.test(w.head),
    'her ways, measured in the app as it runs: the wide button is found; the rest are kept', w);
  await p.screenshot({ path: OUT + '/1_checks.png', fullPage: false });
  // 4. this app's terms, her master copy
  await p.evaluate(() => fbHub.open('settings')); await sleep(1200);
  const t0 = await p.evaluate(() => { const b = document.getElementById('hTerms'); return b ? { secs: b.querySelectorAll('details.r330-sec').length, name: b.querySelector('input[data-k="app"]').value, afterRules: !!(b.previousElementSibling && /hSetRules|r285/.test(b.previousElementSibling.id + ' ' + b.previousElementSibling.className)) } : null; });
  ok(t0 && t0.secs === 12 && t0.name === 'Quill', "this app's terms: its name in place, the Terms of use and the Privacy notice in twelve sections, each to rewrite", t0);
  await p.fill('#hTerms input[data-k="contact"]', 'quill@example.invalid');
  await p.evaluate(() => { const d = document.querySelector('#hTerms details.r330-sec'); d.open = true; });
  await p.fill('#hTerms details.r330-sec textarea >> nth=0', 'Quill is a notebook made by {owner}. It runs on your device.');
  await p.check('#hTermsAsk'); await p.locator('#hTerms button', { hasText: 'Keep these terms' }).click(); await sleep(600);
  // 5. release notes, kept with the release, and the web app package carries notes and terms
  await p.evaluate(async (id) => { const r = (await IngRepo.list()).find(x => x.id === id); await IngRepo.setNote(id, r.head, 'relNotes', { text: 'What is new\n- The first notebook.', at: Date.now() }); }, S.id);
  const pk = await p.evaluate(async (id) => { const z = await IngShip.webApp(id, {}); const es = IngRepo.core.unzip(z.bytes); const td = new TextDecoder();
    const get = async (re) => { const e = es.find(x => re.test(x.name)); return e ? td.decode(await IngRepo.core.unzipData(z.bytes, e)) : ''; };
    const terms = await get(/TERMS\.txt$/), notes = await get(/NOTES\.txt$/), priv = await get(/PRIVACY\.txt$/), page = await get(/index\.html$/);
    return { names: es.map(e => e.name.split('/').pop()), notes: /The first notebook/.test(notes), terms: !!terms, priv: /Privacy notice/.test(priv), gate: /Before you use/.test(page), mine: /Quill is a notebook made by its maker/.test(terms), contact: /quill@example\.invalid/.test(terms) }; }, S.id);
  ok(pk.notes && pk.terms && pk.priv && pk.mine && pk.contact && pk.gate, 'its web app carries NOTES.txt, TERMS.txt (with her words) and PRIVACY.txt, and asks on first open', pk);
  // the sheet works in the packaged page
  const page = await p.evaluate(async (id) => { const r = (await IngRepo.list()).find(x => x.id === id); const rec = await fbHub.live(id); return IngFabNext.extra(id, r.head).then(x => x.body); }, S.id);
  const q = await (await b.newContext()).newPage(); await q.setContent('<!doctype html><body><p>Quill</p>' + page + '</body>'); await sleep(400);
  const g1 = await q.evaluate(() => ({ open: !!document.querySelector('[role=dialog]'), text: (document.querySelector('[role=dialog]') || {}).textContent || '' }));
  ok(g1.open && /Before you use Quill/.test(g1.text) && /Privacy notice/.test(g1.text), 'the packaged app asks first: its terms and privacy notice, I agree or Decline', g1.text.slice(0, 80));
  await q.locator('button', { hasText: 'I agree' }).click(); ok(await q.evaluate(() => !document.querySelector('[role=dialog]')), 'I agree: the sheet closes, kept on that device');
  // the release card holds the notes
  await p.evaluate(() => fbHub.open('releases')); await sleep(2500);
  const rn = await p.evaluate(() => { const d = document.querySelector('.r330-notes'); return d ? { sum: d.querySelector('summary').textContent, text: d.querySelector('textarea').value } : null; });
  ok(rn && /What is new/.test(rn.text) && /2 lines/.test(rn.sum), 'Releases: the notes are kept with the release, to read and edit', rn);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
