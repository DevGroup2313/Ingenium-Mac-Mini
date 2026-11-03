// Two engines on a computer: the page's side (Ingenium 6.10.5, modules/r214.js; the app's side is desktop/app_engine2_6105.py, checked
// by t_6105_engine.py). The computer app is a stand-in bridge (window.pywebview.api) that offers the engine's calls only; its answers say
// which engines the copy carries. Her words (3 November 2026): "I want the option of a newer engine where it tested and proven to work
// and work well but I still want the llama engine kept optional or in some cases as a backup or default".
//   node rig/t_6105_engine_page.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const BRIDGE = () => { const st = () => JSON.parse(sessionStorage.getItem('__eng') || '{"choice":"auto","newer":true,"running":null}'), put = (o) => sessionStorage.setItem('__eng', JSON.stringify(o)); window.__engCalls = [];
  window.pywebview = { api: {
    engine_info: () => Promise.resolve({ available: true, platform: 'macos-arm64', version: 'llama.cpp b11321', gpu: 'Apple M2', devices: [], state: 'off', model_id: null, port: null, device: { ramGB: 16, cores: 8 } }),
    engine_load: () => Promise.resolve({ ok: false, error: 'not in this test' }), engine_status: () => Promise.resolve({ state: 'off' }), engine_unload: () => Promise.resolve(true),
    engine_choice: () => { const o = st(); return Promise.resolve({ choice: o.choice, proven: { available: true, version: 'llama.cpp b11321', kinds: 154 },
      newer: o.newer ? { available: true, version: 'llama.cpp b12000', kinds: 167, only: ['deepseek41', 'lfm3', 'mistral-large4'] } : { available: false, version: '', kinds: null, only: [] }, running: o.running }); },
    engine_choice_set: (c) => { window.__engCalls.push(c); if (!['auto', 'newer', 'proven'].includes(c)) return Promise.resolve({ ok: false, error: 'That is not one of the engine choices.' }); const o = st(); o.choice = c; put(o); return Promise.resolve({ ok: true, choice: c }); } } }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 950 } }); await ctx.addInitScript(BRIDGE); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(400);
  const open = async () => { await p.evaluate(() => { go('models'); if (window.IngRooms) IngRooms.open('models', 'engine'); }); await p.waitForTimeout(900);
    return p.evaluate(() => { const c = document.getElementById('engPairCard'); if (!c) return null; const room = c.closest('[data-room]');
      return { text: c.innerText, room: room && room.getAttribute('data-room'), shown: !!c.offsetParent, checked: (c.querySelector('input[name="engPairChoice"]:checked') || {}).value || null, opts: c.querySelectorAll('input[name="engPairChoice"]').length }; }); };
  // 1. a copy with both engines
  let r = await open();
  ok(r && /The engines on this computer/.test(r.text) && /Proven: llama\.cpp b11321, which can load 154 kinds of model/.test(r.text) && /Newer: llama\.cpp b12000, 167 kinds/.test(r.text) && /self-test answered/.test(r.text),
    'the Engine room shows both engines, how many kinds of model each can load, and that the newer one went in only after its self-test answered', r && r.text.slice(0, 400));
  ok(r && /Only the newer engine can load: DeepSeek V4\.1, LFM3, Mistral Large 4/.test(r.text) && r.opts === 3 && r.checked === 'auto' && /No model is loaded now/.test(r.text),
    'it names what only the newer engine can load, offers the three choices with Automatic chosen, and says no model is loaded', r && { checked: r.checked, opts: r.opts });
  ok(r && /proven engine loads it at once/.test(r.text), 'it says that, whatever she chooses, the proven engine takes a model the newer one cannot load');
  await p.screenshot({ path: OUT + '/engines.png' });
  // 2. a choice is kept and shown
  await p.evaluate(() => { const i = document.querySelector('#engPairCard input[value="proven"]'); i.checked = true; i.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(500);
  r = await open(); const calls = await p.evaluate(() => window.__engCalls.slice());
  ok(calls.join() === 'proven' && r.checked === 'proven', 'choosing The proven engine only sends that choice to the computer app, and the card shows it chosen', { calls, checked: r.checked });
  await p.evaluate(() => { const o = JSON.parse(sessionStorage.getItem('__eng')); o.running = 'newer'; sessionStorage.setItem('__eng', JSON.stringify(o)); IngR214.refresh(); }); await p.waitForTimeout(400);
  r = await open();
  ok(/Now: the newer engine runs the loaded model\./.test(r.text), 'it says which engine runs the model now', r.text.slice(-80));
  // 3. a copy with the proven engine only
  await p.evaluate(() => { const o = JSON.parse(sessionStorage.getItem('__eng')); o.newer = false; sessionStorage.setItem('__eng', JSON.stringify(o)); IngR214.refresh(); }); await p.waitForTimeout(400);
  r = await open();
  ok(/This copy carries the proven engine only: llama\.cpp b11321, which can load 154 kinds of model/.test(r.text) && r.opts === 0, 'a copy without the newer engine says so, and offers no choice', r.text.slice(0, 200));
  ok(errs.length === 0, 'no script errors on the page', errs);
  // 4. in a web browser (no computer app), no such card
  const p2 = await (await b.newContext()).newPage(); await p2.goto(URL_); await p2.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p2.waitForTimeout(1900);
  ok(await p2.evaluate(() => { go('models'); return !document.getElementById('engPairCard'); }), 'in a web browser, where there is no computer app, the card is not shown');
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
