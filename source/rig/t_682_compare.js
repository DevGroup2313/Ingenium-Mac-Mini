// node rig/t_682_compare.js <Ingenium page url>
// 6.8.2: comparing two versions of an app kept in the library (modules/r187.js), in Chromium, pressed as a person presses it.
// Two versions of a small app are kept in the library the way the library keeps them (libKeep): the second changes one
// function's lines, takes a line away from another, adds a part and changes a carried block of 300 KB on one line. In Settings, Your
// data, Storage, the app has a Compare versions key; pressed, the summary names the counts exactly, each changed place is
// listed by its name, its lines are shown when it is opened, the carried block is compared by its fingerprint (never shown
// whole), the same version twice is said to be the same choice, and nothing throws.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
const BIG1 = 'A'.repeat(300000), BIG2 = 'A'.repeat(299999) + 'B';
const V1 = ['<!doctype html><html><head><title>Lumen</title>', '<style id="lumen-css">', 'body{margin:0}', '</style></head><body>',
  '<script id="lumen-main">', 'function drawNote(n){', '  return n;', '}', 'function keepNote(n){', '  save(n);', '  return true;', '}', '</script>',
  '<script type="text/plain" id="lumen-carried">' + BIG1 + '</script>', '</body></html>'].join('\n');
const V2 = ['<!doctype html><html><head><title>Lumen</title>', '<style id="lumen-css">', 'body{margin:0}', '</style></head><body>',
  '<script id="lumen-main">', 'function drawNote(n){', '  var t=n.trim();', '  return t;', '}', 'function keepNote(n){', '  return true;', '}', '</script>',
  '<script id="lumen-clock">', 'function tick(){}', '</script>',
  '<script type="text/plain" id="lumen-carried">' + BIG2 + '</script>', '</body></html>'].join('\n');
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(1000);
  const kept = await p.evaluate(async ([v1, v2]) => {
    async function keep(text, version) { const u8 = new TextEncoder().encode(text); const h = await crypto.subtle.digest('SHA-256', u8);
      const sha = [...new Uint8Array(h)].map(x => ('0' + x.toString(16)).slice(-2)).join('');
      return libKeep('ingenium', { title: 'Lumen', version, build: '', date: '', size: u8.length, sha256: sha, name: 'lumen.html', source: 'library' }, u8, text); }
    const r1 = await keep(v1, '1.0'); await new Promise(r => setTimeout(r, 50)); const r2 = await keep(v2, '1.1');
    return [r1, r2, (IngStore.versions('ingenium') || []).map(v => v.version)]; }, [V1, V2]);
  ok(kept[0] === 'kept' && kept[1] === 'kept' && kept[2].join() === '1.1,1.0', 'two versions are kept in the library, newest first', JSON.stringify(kept));
  await p.evaluate(() => go('settings')); await p.waitForTimeout(800);
  await p.evaluate(() => { const r = [...document.querySelectorAll('button,[role=tab]')].find(x => x.offsetParent && /^Your data$/.test(x.textContent.trim())); if (r) r.click(); });
  await p.waitForTimeout(1200);
  const key = await p.evaluate(() => { const k = [...document.querySelectorAll('#stxApps .r187-key')].find(x => /Ingenium/.test(x.getAttribute('aria-label') || '')); if (!k) return null; k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { at: [r.left + r.width / 2, r.top + r.height / 2], shown: !!k.offsetParent }; });
  ok(key && key.shown, 'in Settings, Your data, Storage, the app has a Compare versions key', JSON.stringify(key));
  await p.mouse.click(key.at[0], key.at[1]);
  await p.waitForFunction(() => { const s = document.getElementById('r187Sum'); return s && /place/.test(s.textContent); }, null, { timeout: 30000 }).catch(() => {});
  const r = await p.evaluate(() => ({ sum: (document.getElementById('r187Sum') || {}).textContent || '', from: (document.getElementById('r187A') || {}).value, to: (document.getElementById('r187B') || {}).value,
    places: [...document.querySelectorAll('#r187List summary')].map(s => s.innerText.replace(/\s+/g, ' ')) }));
  ok(r.from === '1' && r.to === '0', 'it opens on the version before and the newest', JSON.stringify(r));
  ok(/^Ingenium 1\.1 against 1\.0: 5 places changed, 6 lines added and 3 taken away, 1 carried block new or changed\./.test(r.sum), 'the summary names the counts exactly', r.sum);
  ok(/The page grew by/.test(r.sum), 'and how the size moved', r.sum);
  ok(r.places.join('|') === 'Function drawNote +2 · −1|Function keepNote +0 · −1|Script lumen-carried +1 · −1|Script lumen-clock +1 · −0|Function tick +2 · −0',
    'each changed place is listed by its name, with its lines added and taken away', JSON.stringify(r.places));
  // its lines, when opened
  await p.evaluate(() => { const d = [...document.querySelectorAll('#r187List details')].find(x => /drawNote/.test(x.textContent)); d.querySelector('summary').click(); });
  await p.waitForTimeout(300);
  const pre = await p.evaluate(() => { const d = [...document.querySelectorAll('#r187List details')].find(x => /drawNote/.test(x.textContent)); const q = d.querySelector('pre'); return q ? q.innerText : null; });
  ok(pre && /- +return n;/.test(pre) && /\+ +var t=n\.trim\(\);/.test(pre) && /\+ +return t;/.test(pre), 'opened, a place shows the lines taken away and added', pre);
  const blk = await p.evaluate(() => { const d = [...document.querySelectorAll('#r187List details')].find(x => /lumen-clock|carried/.test(x.textContent)); return document.getElementById('r187List').innerText.length; });
  ok(blk < 5000, 'the carried block is never shown whole (the list stays short)', blk);
  // the same version twice
  await p.selectOption('#r187A', '0'); await p.click('#r187Go'); await p.waitForTimeout(300);
  ok(/Choose two different versions/.test(await p.textContent('#r187Sum')), 'the same version on both sides is said to be the same choice');
  await p.click('#r187Close'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => { const h = document.getElementById('r187H'); return !h || !h.offsetParent; }), 'Close closes it');
  ok(!errs.length, 'no page errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
