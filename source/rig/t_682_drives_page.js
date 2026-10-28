// node rig/t_682_drives_page.js <api port of rig/run_app.py> <the folder standing in for the drive>
// 6.8.2: the Models page's "Where your models are kept" card (modules/r186.js), in Chromium, with the page bridged to the
// computer app's own back-end (rig/run_app.py, its ingenium_app.py patched with build/desktop/app_drives_682.py). The folder
// dialog cannot open headless, so the choice it would give is handed to the app as the dialog would. It checks: the card
// stands in the Your models room; a model kept from the page is on this computer; a drive chosen with the card's key becomes
// the place for new models, with its room shown; a model moved there with its key arrives, its progress shown; the drive
// unplugged (its folder renamed) and the page opened again: the model is listed as not connected; plugged in again, it is
// moved back with its key; the choice undone with its key; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const API = +process.argv[2], DRIVE = process.argv[3];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const info = await (await fetch('http://127.0.0.1:' + API + '/')).json();
  const call = (n, ...a) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(a) }).then(r => r.json()).then(j => j.v);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  await ctx.addInitScript(({ names, API, DRIVE }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    api.choose_model_place = () => api.set_model_place(DRIVE);   // what the folder dialog would answer
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API, DRIVE });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  async function open() {
    await p.goto('http://127.0.0.1:' + info.port + '/ingenium.html', { waitUntil: 'domcontentloaded', timeout: 300000 });
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    await p.waitForTimeout(800); await p.evaluate(() => go('models')); await p.waitForTimeout(1200);
    await p.evaluate(() => { const r = [...document.querySelectorAll('button,[role=tab]')].find(x => x.offsetParent && /^Your models$/.test(x.textContent.trim())); if (r) r.click(); });
    await p.waitForTimeout(800);
  }
  const card = () => p.evaluate(() => { const c = document.getElementById('mdPlaceCard'); if (!c) return null;
    return { shown: !!c.offsetParent, text: c.innerText, places: [...c.querySelectorAll('.mp-place')].map(x => x.innerText.replace(/\s+/g, ' ')),
      rows: [...c.querySelectorAll('.mp-row')].map(x => ({ id: x.getAttribute('data-model'), text: (x.querySelector('.nm small') || x).innerText.replace(/\s+/g, ' '), keys: [...x.querySelectorAll('button')].map(k => k.textContent) })),
      keys: [...c.querySelectorAll('.mp-keys button')].map(k => k.textContent), say: (document.getElementById('mdPlaceSay') || {}).textContent || '' }; });
  const press = async text => { const bb = await p.evaluate(t => { const k = [...document.querySelectorAll('#mdPlaceCard button')].find(x => x.offsetParent && x.textContent.indexOf(t) === 0); if (!k) return null; k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, text);
    if (!bb) throw new Error('no key ' + text); await p.mouse.click(bb[0], bb[1]); await p.waitForTimeout(400); };
  const settle = async id => { for (let i = 0; i < 60; i++) { const st = await call('move_status', id); if (st.state !== 'running') return st; await p.waitForTimeout(250); } };

  // a model kept from the page (a few megabytes, the way the page stores one)
  const blob = Buffer.concat([Buffer.from('GGUF'), Buffer.alloc(6 << 20, 7)]).toString('base64');
  await call('put_model_part', 'm-drive-test', blob, true);
  await open();
  let c = await card();
  ok(c && c.shown, 'the card "Where your models are kept" is shown on the Models page', JSON.stringify(c && c.text.slice(0, 80)));
  ok(await p.evaluate(() => { const c = document.getElementById('mdPlaceCard'), y = document.getElementById('yourModelsCard'); return !!(c && y && c.parentNode === y.parentNode); }), 'in the Your models room, beside Your models');
  ok(c && c.places.length === 1 && /This computer · new models go here/.test(c.places[0]) && /free of/.test(c.places[0]), 'with no drive chosen: this computer, its room, and new models go there', JSON.stringify(c && c.places));
  const row = c && c.rows.find(r => r.id === 'm-drive-test');
  ok(row && /On this computer/.test(row.text) && !row.keys.length, 'the model is listed on this computer (no drive to move it to yet)', JSON.stringify(row));
  // a drive chosen with the card's key
  await press('Choose a drive'); await p.waitForTimeout(600); c = await card();
  ok(c.places.length === 2 && /new models go here/.test(c.places[1]) && !/new models go here/.test(c.places[0]) && /free of/.test(c.places[1]), 'a drive chosen: it is shown with its room, and new models go there', JSON.stringify(c.places));
  ok(/New models now go to/.test(c.say), 'and the card says so', c.say);
  ok(fs.existsSync(DRIVE + '/Ingenium models'), 'an Ingenium models folder is made on the drive');
  // moved there with its key
  const key = (await card()).rows.find(r => r.id === 'm-drive-test').keys[0];
  ok(/^Move to /.test(key || ''), 'the model has a key to move it to the drive', key);
  await press(key); const st = await settle('m-drive-test'); await p.waitForTimeout(900); c = await card();
  const r2 = c.rows.find(r => r.id === 'm-drive-test');
  ok(st && st.state === 'done' && /^On /.test(r2.text) && !/this computer/.test(r2.text) && fs.existsSync(DRIVE + '/Ingenium models/m-drive-test'),
    'pressed, the model is moved: the file is on the drive and the row says so', JSON.stringify({ st, row: r2 }));
  ok(r2.keys.join() === 'Move to this computer', 'and offers to move it back', r2.keys.join());
  // the drive unplugged, the page opened again
  fs.renameSync(DRIVE, DRIVE + '-away');
  await open(); c = await card();
  const r3 = c.rows.find(r => r.id === 'm-drive-test');
  ok(r3 && /not connected/.test(r3.text) && !r3.keys.length, 'with the drive unplugged, the model is still listed, as not connected', JSON.stringify(r3));
  ok(c.places.length === 2 && /Not connected/.test(c.places[1]) && /new models go here/.test(c.places[0]), 'the drive is said to be not connected, and new models go to this computer meanwhile', JSON.stringify(c.places));
  fs.renameSync(DRIVE + '-away', DRIVE);
  await open(); c = await card();
  ok(/^On /.test(c.rows.find(r => r.id === 'm-drive-test').text) && !/not connected/.test(c.rows.find(r => r.id === 'm-drive-test').text), 'plugged in again, the model is back');
  await press('Move to this computer'); await settle('m-drive-test'); await p.waitForTimeout(900); c = await card();
  ok(/On this computer/.test(c.rows.find(r => r.id === 'm-drive-test').text) && !fs.existsSync(DRIVE + '/Ingenium models/m-drive-test'), 'moved back with its key: on this computer again, gone from the drive');
  await press('Keep new models on this computer'); await p.waitForTimeout(600); c = await card();
  ok(c.places.length === 1 && /new models go here/.test(c.places[0]), 'the drive let go with its key: new models go to this computer', JSON.stringify(c.places));
  await p.screenshot({ path: '/tmp/claude-0/out/drives_card.png', fullPage: false });
  await call('delete_model_file', 'm-drive-test');
  ok(!errs.length, 'no page errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
