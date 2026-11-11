// Ingenium 6.80: an older web view, and a model never kept waiting behind a read-ahead (modules/r271.js, modules/r273.js).
// Found on the Fire and Android build of 6.79 (GitHub run 43056507079): the Android 11 emulator's web view (Chrome 83) has no
// Element.replaceChildren, so the Memory room and the tray stopped as they drew; and a change of model waited 465 s behind the
// first model's read-ahead, so the self-test ran out of time.
// Checks:
//   1. no module uses a call or an operator that Chrome 83 lacks (read from the sources: no page needed);
//   2. on a page whose web view has no replaceChildren: no page error, the memory part runs, the tray and the Memory room are drawn;
//   3. an engine that does one thing at a time (as the phone and tablet apps do): a read-ahead in progress is stopped before the model
//      is unloaded, so unloading is immediate; with no read-ahead in progress nothing is stopped.
// Invented memories and an invented model; the engine is a stand-in; nothing is downloaded.
//   node rig/t_680_old_webview.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_680_old_webview.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
// what Chrome 83 lacks, by the Chrome version that brought it
const NEWER = [['replaceChildren (86)', /\.replaceChildren\(/], ['String.replaceAll (85)', /\.replaceAll\(/], ['Promise.any (85)', /Promise\.any\(/],
  ['logical assignment (85)', /[\w\]\)]\s*(\|\|=|&&=|\?\?=)/], ['Array.at (92)', /\.at\(-?\d/], ['Object.hasOwn (93)', /Object\.hasOwn\(/], ['structuredClone (98)', /structuredClone\(/],
  ['findLast (97)', /\.findLast(Index)?\(/], ['toSorted and friends (110)', /\.to(Sorted|Reversed|Spliced)\(/], ['AbortSignal.timeout (103)', /AbortSignal\.timeout\(/], ['Intl.Segmenter (87)', /Intl\.Segmenter/]];
(async () => {
  // 1. the sources
  const dir = path.join(__dirname, '..', 'build', 'modules'), hits = [];
  fs.readdirSync(dir).filter(f => /^r\d+\.js$/.test(f)).forEach(f => { const s = fs.readFileSync(path.join(dir, f), 'utf8'); NEWER.forEach(([n, re]) => { if (re.test(s)) hits.push(f + ': ' + n); }); });
  ok(hits.length === 0, 'no module uses what the Android 11 web view (Chrome 83) lacks', hits);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 };
    [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(o => { try { delete o.replaceChildren; } catch (e) {} }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  ok(await p.evaluate(() => typeof document.body.replaceChildren === 'undefined'), 'this page has no replaceChildren, as an older web view');
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme(); const day = (d) => new Date(2026, 10, d, 10).getTime();
    state.memory = { on: true, learn: false, ask: true, cloud: false, items: [
      { id: 'm1', text: 'You are building Lantern, a reading app for iPad, in SwiftUI.', at: day(9), how: 'key', g: 'project', chat: "Lantern's first screen" },
      { id: 'm3', text: 'You like short answers in British spelling, with one example.', at: day(4), how: 'asked' },
      { id: 'm5', text: 'Your essay on soil carbon is due on Friday 13 November.', at: day(10), how: 'key', chat: 'Soil essay plan' }],
      waiting: [{ id: 'm8', text: 'Your tutor for the soil essay is Dr Okafor.', at: day(10), how: 'noted', g: 'date', chat: 'Soil essay plan' }], skip: {}, noted: {}, no: [] };
    state.models = [{ id: 'mv', customName: 'Velox', fileName: 'velox.gguf', color: '#7458c6', sizeBytes: 0.7e9, paramB: 1.2, type: 'GGUF', fileState: 'ready', ctx: 8192 }];
    state.activeModelId = 'mv'; try { saveState(); } catch (e) {}
    window.__reply = 'Your essay on soil carbon is due on Friday 13 November.';
    Engine.adapter = { abort() {} }; Engine.modelId = 'mv'; Engine.setStatus('ready');
    Engine.generate = function (job) { return new Promise(res => setTimeout(() => { job.onToken(window.__reply); res({ text: window.__reply }); }, 60)); };
    go('chat'); document.getElementById('chatNew').click(); renderChat(); });
  await p.waitForTimeout(900);
  // 2. the memory part on that page
  ok(await p.evaluate(() => (window.__ingParts || {}).p271 === 'running' && (window.__ingParts || {}).p273 === 'running'), 'the memory part and the read-ahead part are running', await p.evaluate(() => [window.__ingParts.p271, window.__ingParts.p273]));
  const t0 = await p.evaluate(() => IngChatMemory.tray());
  ok(t0 && t0.shown && /Ingenium remembers 3 things/.test(t0.name), 'the tray above a new chat is drawn', t0);
  await p.evaluate(t => { const i = document.getElementById('chatInput'); i.value = t; sendChat(); }, 'When is my essay due?'); await p.waitForTimeout(1000);
  const t1 = await p.evaluate(() => ({ tray: IngChatMemory.tray(), toks: document.querySelectorAll('#memTrayList .mt-tok').length, used: [...document.querySelectorAll('#chatScroll .msg.bot .mt-used')].map(x => x.textContent.trim()) }));
  ok(t1.tray.open && t1.toks >= 1 && /^Used \d+ memor/.test(t1.used.join()), 'after a message the tray lists the memories that went with it, and the answer says Used N memories', t1);
  await p.evaluate(() => IngChatMemory.open()); await p.waitForTimeout(1200);
  const room = await p.evaluate(() => { const c = document.getElementById('memRoomCard'); return { card: !!c, shown: !!(c && c.offsetParent), room: !!(c && c.querySelector('.mr-room')), mems: c ? c.querySelectorAll('.mr-mem').length : 0, left: !!(c && c.querySelector('.mr-left') && c.querySelector('.mr-left').children.length), right: !!(c && c.querySelector('.mr-right') && c.querySelector('.mr-right').children.length) }; });
  ok(room.shown && room.room && room.mems >= 3 && room.left && room.right, 'the Memory room is drawn, with its memories', room);
  await p.screenshot({ path: OUT + '/1_room_old_webview.png' });
  await p.evaluate(() => IngChatMemory.paint()); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.querySelectorAll('#memRoomCard .mr-room').length === 1 && document.querySelectorAll('#memRoomCard .mr-mem').length >= 3), 'drawn again, the room holds each memory once (emptied by hand, not doubled)');
  // 3. an engine that does one thing at a time
  const r = await p.evaluate(async () => { go('chat'); document.getElementById('chatNew').click(); renderChat();
    let stopped = 0, q = Promise.resolve(), stopRead = null, reads = 0;
    const fake = { prefill() { reads++; const run = () => new Promise(res => { stopRead = () => { stopRead = null; res({ prefill: true, stop: 'abort' }); }; setTimeout(() => { stopRead = null; res({ prefill: true, stop: 'prefill' }); }, 8000); }); const pr = q.then(run); q = pr.then(() => {}, () => {}); return pr; },
      abort() { stopped++; if (stopRead) stopRead(); }, dispose() { const pr = q.then(() => {}); q = pr; return pr; } };
    Engine.adapter = fake; Engine.modelId = 'mv'; Engine.setStatus('ready'); await new Promise(r => setTimeout(r, 50)); clearTimeout(ingReadAheadT);
    ingReadAheadKey = ''; Engine._prefilling = false; ingReadAhead(); const reading = Engine._prefilling === true; await new Promise(r => setTimeout(r, 300)); const reads1 = reads;  // the reading is under way
    const a = performance.now(); await Engine.unload(); const ms = Math.round(performance.now() - a); await new Promise(r => setTimeout(r, 50));
    const out = { reading, reads1, stopped, ms, status: Engine.status, after: Engine._prefilling };
    // none in progress: nothing to stop
    Engine.adapter = fake; Engine.modelId = 'mv'; Engine._prefilling = false; const s0 = stopped; await Engine.unload(); out.quiet = stopped - s0; return out; });
  ok(r.reading && r.reads1 === 1, 'the stand-in engine is reading the chat ahead, as after a model is loaded', r);
  ok(r.stopped === 1 && r.ms < 1500 && r.status === 'disconnected', 'unloading stops the read-ahead first, so the model is free at once (not after the 8 s the reading would take)', r);
  ok(r.after === false, 'the read-ahead is over afterwards', r);
  ok(r.quiet === 0, 'with no read-ahead in progress, unloading stops nothing', r);
  ok(errs.length === 0, 'no page error', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
