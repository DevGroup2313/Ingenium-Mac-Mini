// Newer models, found online when she asks (Ingenium 6.11.2, modules/r217.js). Her words (4 November 2026): "I want a path built into
// Ingenium's models page that goes online when I click on the button to check and download and install newer models for Ingenium
// instead of having to continuously do it myself or having you do it on this chat."
// Hugging Face is a stand-in (window.netFetch answers its API with invented repositories, sizes and fingerprints) and so is the computer
// app (window.pywebview.api, 16 GB of memory); nothing is downloaded.
//   node rig/t_6112_found.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const SHA = (c) => c.repeat(64);
const BRIDGE = () => { if (window.top !== window) return; window.__INGENIUM_DEVICE = { ramGB: 16 }; window.__installs = [];
  window.pywebview = { api: {
    engine_info: () => Promise.resolve({ available: true, platform: 'macos-arm64', version: 'llama.cpp b11321', gpu: 'Apple M2', devices: [], state: 'off', device: { ramGB: 16, cores: 8 } }),
    engine_status: () => Promise.resolve({ state: 'off' }), engine_load: () => Promise.resolve({ ok: false }), engine_unload: () => Promise.resolve(true),
    engine_choice: () => { const newer = window.__newerEngine === true; return Promise.resolve({ choice: 'auto', proven: { available: true, version: 'llama.cpp b11321', kinds: 153 }, newer: newer ? { available: true, version: 'llama.cpp b12000', kinds: 167, only: ['lfm3'] } : { available: false, only: [] }, running: null }); },
    install_model: (a) => { window.__installs.push(a); return Promise.resolve({ ok: true }); },
    install_status: () => Promise.resolve({ state: 'done', received: 1, total: 1 }),
    installed_models: () => Promise.resolve([]) } }; };
const HFSTUB = () => { window.__net = []; const now = Date.now(), day = 864e5;
  const list = {
    unsloth: [{ id: 'unsloth/Tallyformer-4B-GGUF', createdAt: new Date(now - 5 * day).toISOString(), likes: 120, downloads: 5400, tags: ['gguf'] },
              { id: 'unsloth/Giant-400B-GGUF', createdAt: new Date(now - 9 * day).toISOString(), likes: 300, downloads: 900, tags: ['gguf'] },
              { id: 'unsloth/Tallyformer-4B-DFlash-GGUF', createdAt: new Date(now - 4 * day).toISOString(), tags: ['gguf'] }],
    LiquidAI: [{ id: 'LiquidAI/LFM3-1.7B-GGUF', createdAt: new Date(now - 3 * day).toISOString(), likes: 80, downloads: 2000, tags: ['gguf'] }],
    'ggml-org': [{ id: 'ggml-org/Mystery-2B-GGUF', createdAt: new Date(now - 2 * day).toISOString(), tags: ['gguf'] }],
    openbmb: [{ id: 'openbmb/MiniCPM5-1B-GGUF', createdAt: new Date(now - 6 * day).toISOString(), tags: ['gguf'] }] };   // already in Ingenium's lineup
  const info = { 'unsloth/Tallyformer-4B-GGUF': { gguf: { architecture: 'qwen3', total: 4.02e9 }, cardData: { license: 'apache-2.0' } },
    'unsloth/Giant-400B-GGUF': { gguf: { architecture: 'qwen3moe', total: 4.0e11 }, tags: ['license:apache-2.0'] },
    'LiquidAI/LFM3-1.7B-GGUF': { gguf: { architecture: 'lfm3', total: 1.7e9 }, cardData: { license: 'other' } },
    'ggml-org/Mystery-2B-GGUF': {} };
  const f = (path, size, c) => ({ type: 'file', path, size: 135, lfs: { oid: c.repeat(64), size } });
  const tree = { 'unsloth/Tallyformer-4B-GGUF': [f('Tallyformer-4B-Q8_0.gguf', 4280000000, 'b'), f('Tallyformer-4B-Q4_K_M.gguf', 2497000000, 'a'), f('mmproj-F16.gguf', 800000000, 'c'), { type: 'file', path: 'README.md', size: 900 }],
    'unsloth/Giant-400B-GGUF': [1, 2, 3, 4, 5].map(i => f('Q4_K_M/Giant-400B-Q4_K_M-0000' + i + '-of-00005.gguf', 49000000000, String(i))),
    'LiquidAI/LFM3-1.7B-GGUF': [f('LFM3-1.7B-Q4_K_M.gguf', 1100000000, 'd')], 'ggml-org/Mystery-2B-GGUF': [f('Mystery-2B-Q4_K_M.gguf', 1300000000, 'e')] };
  window.netFetch = function (url, o) { window.__net.push(String(url)); const res = (okk, st, body) => Promise.resolve({ ok: okk, status: st, text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)), headers: { get: () => null } });
    let m = /huggingface\.co\/api\/models\?author=([^&]+)/.exec(url); if (m) return res(true, 200, list[decodeURIComponent(m[1])] || []);
    m = /huggingface\.co\/api\/models\/([^\/]+\/[^\/?]+)\/tree\/main/.exec(url); if (m) return res(true, 200, tree[m[1]] || []);
    m = /huggingface\.co\/api\/models\/([^\/]+\/[^\/?]+)$/.exec(url); if (m) return res(true, 200, info[m[1]] || {});
    return res(false, 404, 'not in this test'); }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 950 } }); await ctx.addInitScript(BRIDGE); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(HFSTUB); await p.waitForTimeout(300);
  await p.evaluate(() => { go('models'); if (window.IngRooms) try { IngRooms.open('models', 'lineup'); } catch (e) {} }); await p.waitForTimeout(900);
  let c = await p.evaluate(() => { const k = document.getElementById('foundCard'); return k ? { text: k.innerText.slice(0, 400), weekly: document.getElementById('foundWeekly').checked, calls: window.__net.length, dev: lineupDevice() } : null; });
  ok(c && /Newer models, found online/.test(c.text) && /Check for newer models/.test(c.text) && c.weekly === false && c.calls === 0 && c.dev === 'mac-arm',
    'the Models page has its key; the weekly look is off until she turns it on, and nothing has gone online', c);
  await p.evaluate(() => document.getElementById('foundGo').click());
  await p.waitForFunction(() => /newer model|Nothing newer|could not be reached/.test((document.getElementById('foundStatus') || {}).textContent || ''), null, { timeout: 30000 });
  const r = await p.evaluate(() => ({ status: document.getElementById('foundStatus').textContent, list: state.found.list.map(x => ({ id: x.id, ok: !!x.ok, quant: x.quant, house: x.house, skip: x.skip || '' })), net: window.__net.filter(u => /huggingface/.test(u)).length,
    rows: [...document.querySelectorAll('#foundCard .fd-row')].map(x => x.innerText.replace(/\s+/g, ' ')) }));
  const T = r.list.find(x => x.id === 'unsloth/Tallyformer-4B-GGUF'), G = r.list.find(x => x.id === 'unsloth/Giant-400B-GGUF'), L = r.list.find(x => x.id === 'LiquidAI/LFM3-1.7B-GGUF'), M = r.list.find(x => x.id === 'ggml-org/Mystery-2B-GGUF');
  ok(T && T.ok && T.quant === 'Q4_K_M' && T.house === 'velox' && r.rows.length === 1 && /Tallyformer-4B\s*new/.test(r.rows[0]) && /4B parameters/.test(r.rows[0]) && /needs about 3\.3 GB/.test(r.rows[0]) && /its kind: qwen3/.test(r.rows[0]) && /licence: apache-2\.0/.test(r.rows[0]),
    'a new 4B model that fits: offered with its publisher, parameters, file (Q4_K_M, not the larger Q8_0 nor the vision file), memory needed, kind and licence', { T, row: r.rows[0] });
  ok(G && !G.ok && /too large for this device/.test(G.skip) && L && !L.ok && /lfm3, is not one this device's engine loads \(the newer engine does/.test(L.skip) && M && !M.ok && /not stated/.test(M.skip),
    'not offered, each with its reason: a 245 GB model on 16 GB, a kind only the newer engine loads (this copy has none), a kind its record does not state', { G, L, M });
  ok(!r.list.some(x => /MiniCPM5-1B-GGUF|DFlash/i.test(x.id)), 'a repository already in Ingenium\'s lineup, and a speed-up file, are not listed', r.list.map(x => x.id));
  await p.evaluate(() => { const n = [...document.querySelectorAll('#modalBox .btn')].find(x => x.textContent.trim() === 'Not now'); if (n) n.click(); try { closeModal(); } catch (e) {}
    const t = [...document.querySelectorAll('button')].find(x => /Ingenium's models/.test(x.textContent) && x.offsetParent); if (t) t.click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { const k = document.getElementById('foundCard'); if (k) k.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/found.png', fullPage: false });
  // install: the same checked download as Ingenium's own models
  await p.evaluate(() => { const b = [...document.querySelectorAll('#foundCard .fd-row button')].find(x => x.textContent === 'Install'); b.click(); });
  await p.waitForFunction(() => window.__installs.length > 0, null, { timeout: 15000 }); await p.waitForTimeout(800);
  const ins = await p.evaluate(() => ({ a: window.__installs[0], spec: ING_LINEUP.models[window.__installs[0].key], more: (ING_LINEUP.devices['mac-arm'].more || {}).velox || [], status: document.getElementById('foundStatus').textContent }));
  ok(ins.a.url === 'https://huggingface.co/unsloth/Tallyformer-4B-GGUF/resolve/main/Tallyformer-4B-Q4_K_M.gguf' && ins.a.sha256 === 'a'.repeat(64) && ins.a.size === 2497000000 && ins.a.file === 'Tallyformer-4B-Q4_K_M.gguf' && !ins.a.parts,
    'Install asks the computer app for that file, with its size and Hugging Face\'s fingerprint, as for Ingenium\'s own models', ins.a);
  ok(ins.spec && ins.spec.found && /Not part of Ingenium's own reviewed lineup: try it before you rely on it/.test(ins.spec.why) && ins.more.indexOf(ins.a.key) >= 0 && /is installed, its file checked/.test(ins.status),
    'it becomes a lineup entry of its own, offered under Velox, saying it is not part of the reviewed lineup', { why: ins.spec && ins.spec.why, status: ins.status });
  // a copy with the newer engine: the kind only it loads is offered
  const p2 = await ctx.newPage(); await p2.addInitScript(() => { if (window.top === window) window.__newerEngine = true; });
  await p2.goto(URL_); await p2.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p2.waitForTimeout(900);
  await p2.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p2.evaluate(HFSTUB); await p2.evaluate(() => { go('models'); }); await p2.waitForTimeout(600);
  const kept = await p2.evaluate(() => Object.keys(ING_LINEUP.models).filter(k => /^found:/.test(k)));
  ok(kept.length === 1, 'after a restart, the model she installed keeps its entry', kept);
  await p2.evaluate(() => document.getElementById('foundGo').click());
  await p2.waitForFunction(() => /newer model|Nothing newer/.test((document.getElementById('foundStatus') || {}).textContent || ''), null, { timeout: 30000 });
  const L2 = await p2.evaluate(() => state.found.list.find(x => x.id === 'LiquidAI/LFM3-1.7B-GGUF'));
  ok(L2 && L2.ok && L2.engine === 'newer', 'on a computer whose copy carries the newer engine, LFM3 (a kind only it loads) is offered, marked for the newer engine', L2);
  ok(errs.length === 0, 'no script errors on the page', errs);
  // a web browser: no installing
  const p3 = await (await b.newContext()).newPage(); await p3.goto(URL_); await p3.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p3.waitForTimeout(900);
  const web = await p3.evaluate(() => { go('models'); const k = document.getElementById('foundGo'); if (k) k.click(); return { card: !!document.getElementById('foundCard'), said: (document.getElementById('foundStatus') || {}).textContent || '' }; });
  ok(web.card && /A web browser cannot install models/.test(web.said), 'in a web browser the card says installing needs the app', web);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
