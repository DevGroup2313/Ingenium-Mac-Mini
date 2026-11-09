// node rig/t_635_newer.js <Ingenium page url> <out dir>
// Newer models, in a room of their own on the Models page (Ingenium 6.35, modules/r173.js and r217.js). Her words (4 November 2026): the
// path to check, download and install newer models, "the existing section to be redesigned and be visible". Until 6.35 the card sat at the
// foot of the four houses' card, which is long, so it was out of sight. Hugging Face and the computer app are stand-ins, as in
// rig/t_6112_found.js (whose stand-ins are copied here); nothing is downloaded.
// Checks: the Models page shows a Newer models key in its row of rooms, beside Ingenium's models; its room holds the card on its own (not
// inside the houses' card), with Check for newer models in sight at the top and a line saying what pressing it does; nothing has gone
// online; Check lists what this device can run with a one-line count; Install works as before; the tour's ring and Find open the room;
// on a phone the row and the card fit the screen; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
// ---- the stand-ins of rig/t_6112_found.js ----
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

const enter = async (p) => { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
  // the first-run offer on a computer with no model (Getting ready): Not now, as she might
  await p.evaluate(() => { const n = [...document.querySelectorAll('#modalBox .btn')].find(x => x.textContent.trim() === 'Not now'); if (n) n.click(); try { closeModal(); } catch (e) {} }); await p.waitForTimeout(300); };
const dismiss = async (p) => { await p.evaluate(() => { const r = document.getElementById('modalRoot'); if (!r || !r.classList.contains('open')) return; const n = [...document.querySelectorAll('#modalBox .btn')].find(x => x.textContent.trim() === 'Not now'); if (n) n.click(); try { closeModal(); } catch (e) {} }); await p.waitForTimeout(300); };
const room = (p) => p.evaluate(() => { const tabs = [...document.querySelectorAll('#page-models .rm-tab')].filter(t => !t.hidden && t.offsetParent !== null);
  const k = document.getElementById('foundCard'), go = document.getElementById('foundGo'), r = k ? k.getBoundingClientRect() : null, g = go ? go.getBoundingClientRect() : null;
  return { tabs: tabs.map(t => t.textContent.trim()), cur: window.IngRooms ? IngRooms.current('models') : null, card: !!k, shown: !!(k && k.offsetParent !== null), inLineup: !!(k && k.closest('#lineupCard')),
    isCard: !!(k && k.classList.contains('card')), panel: k && k.parentNode ? k.parentNode.id : '', goTop: g ? Math.round(g.top) : null, goVisible: !!(g && g.top >= 0 && g.bottom <= innerHeight && go.offsetParent !== null),
    text: k ? k.innerText.slice(0, 4000) : '', calls: (window.__net || []).length, sw: document.scrollingElement.scrollWidth, iw: innerWidth }; });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 900 } }); await ctx.addInitScript(BRIDGE); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900); await enter(p);
  await p.evaluate(HFSTUB); await p.waitForTimeout(300);
  await p.evaluate(() => { go('models'); }); await p.waitForTimeout(2500); await dismiss(p);
  const r0 = await room(p);
  ok(r0.tabs.indexOf('Newer models') === r0.tabs.indexOf("Ingenium's models") + 1 && r0.tabs.indexOf('Newer models') > 0, 'the Models page has a Newer models key in its row of rooms, beside Ingenium\'s models', r0.tabs);
  await p.click('#page-models .rm-tab:has-text("Newer models")'); await p.waitForTimeout(700);
  const r1 = await room(p);
  ok(r1.cur === 'newer' && r1.shown && !r1.inLineup && r1.isCard, 'its room holds the card on its own, not at the foot of the houses\' card', r1);
  ok(r1.goVisible && r1.goTop < 450, 'Check for newer models is in sight at the top of the room, without scrolling', { goTop: r1.goTop, goVisible: r1.goVisible });
  ok(/Nothing has been looked for yet\. Press Check for newer models/.test(r1.text) && /Nothing is installed until you press Install/.test(r1.text) && r1.calls === 0, 'before a look it says what pressing Check does, and nothing has gone online', { text: r1.text.slice(0, 300), calls: r1.calls });
  await p.screenshot({ path: OUT + '/newer-empty.png' });
  // a look: what this device can run, counted in one line
  await dismiss(p); await p.click('#foundGo');
  await p.waitForFunction(() => /newer model|Nothing newer|could not be reached/.test((document.getElementById('foundStatus') || {}).textContent || ''), null, { timeout: 30000 });
  await p.evaluate(() => { const n = [...document.querySelectorAll('#modalBox .btn')].find(x => x.textContent.trim() === 'Not now'); if (n) n.click(); try { closeModal(); } catch (e) {} }); await p.waitForTimeout(500);
  const r2 = await p.evaluate(() => ({ sum: (document.getElementById('foundSum') || {}).textContent || '', sumShown: !!(document.getElementById('foundSum') && !document.getElementById('foundSum').hidden),
    rows: [...document.querySelectorAll('#foundCard .fd-row')].map(x => x.innerText.replace(/\s+/g, ' ')), empty: !!document.querySelector('#foundCard .fd-empty') }));
  ok(r2.sumShown && /^1 model this device can run, 1 new since the look before\.$|^1 model this device can run\.$/.test(r2.sum) && r2.rows.length === 1 && /Tallyformer-4B/.test(r2.rows[0]) && !r2.empty,
    'after a look: one line counts what this device can run, and each model has its row (the empty state is gone)', r2);
  await p.screenshot({ path: OUT + '/newer-found.png' });
  await p.evaluate(() => { const b = [...document.querySelectorAll('#foundCard .fd-row button')].find(x => x.textContent === 'Install'); b.click(); });
  await p.waitForFunction(() => window.__installs.length > 0, null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(600);
  const ins = await p.evaluate(() => ({ n: window.__installs.length, file: window.__installs[0] && window.__installs[0].file, status: document.getElementById('foundStatus').textContent }));
  ok(ins.n === 1 && ins.file === 'Tallyformer-4B-Q4_K_M.gguf' && /is installed, its file checked/.test(ins.status), 'Install works as before, from the room', ins);
  // reached from elsewhere: the tour's ring and Find a setting open the room
  await p.evaluate(() => { IngRooms.open('models', 'yours', false); }); await p.waitForTimeout(400);
  await p.evaluate(() => { IngRooms.reveal(document.getElementById('foundCard'), {}); }); await p.waitForTimeout(600);
  const rv = await room(p);
  ok(rv.cur === 'newer' && rv.shown, 'a ring from the tour or the Guide opens the room that holds it', { cur: rv.cur, shown: rv.shown });
  const gd = await p.evaluate(() => { const d = [...document.querySelectorAll('#mdGuide dt, #mdGuide dd, #mdGuide')].map(x => x.textContent).join(' '); return /in its own room, Newer models/.test(d); });
  ok(gd, 'the Guide says where it is now (in its own room, Newer models)');
  // a phone
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }); await ph.addInitScript(BRIDGE); const q = await ph.newPage(); const errsQ = []; q.on('pageerror', e => errsQ.push(e.message.slice(0, 200)));
  await q.goto(URL_); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await q.waitForTimeout(900); await enter(q);
  await q.evaluate(() => { go('models'); IngRooms.open('models', 'newer', false); }); await q.waitForTimeout(2500); await dismiss(q);
  const rq = await room(q); await q.screenshot({ path: OUT + '/newer-phone.png' });
  ok(rq.cur === 'newer' && rq.shown && rq.sw <= rq.iw + 1 && rq.goVisible, 'on a phone the room opens with its Check key in sight, and nothing is wider than the screen', { cur: rq.cur, sw: rq.sw, iw: rq.iw, goTop: rq.goTop });
  ok(errs.length === 0 && errsQ.length === 0, 'no script errors on the page', errs.concat(errsQ));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
