// Sharing models between her devices, made simple (Ingenium 6.81: modules/r274.js, build/desktop/app_lend_681.py, the Fire and iPhone bridges'
// findLenders). Her words (9 November 2026): "I want it to be easy to do and for it to work everytime and with no issues"; (11 November 2026)
// "please include the mac mini, the iPad, the iPhone and Fire Tablet as well and any other devices that I may purchase in the future".
// Invented computers and models; two stand-in lenders (rig/lend681_mock.py, one computer at two addresses) and the real computer back-end
// (rig/run_app.py with the patched app). Nothing is downloaded. Checks:
//   web (a browser): the new card; a wrong code does not pair; the right code pairs once, keeps every address, and the chat answers
//     through the computer, the request naming this device; the computer at a new address is found again by itself; Claude and the
//     computer both kept, one press each; removed on the computer: the code once more; the top bar's menu lists its models; after a
//     reload it is still paired and found; left alone, nothing is redrawn; by night; no page error;
//   native (the Fire tablet's app, emulated): Find my computers finds it by itself, and it pairs as "Fire tablet";
//   shell (the real computer app lending): its code in tiles; a device that pairs is listed by name and icon; Remove refuses it.
//   node rig/t_681_lend.js <page url> <out folder> <patched ingenium_app.py> <page file>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const http = require('http');
const [URL_, OUT, APP, PAGE_FILE] = process.argv.slice(2);
if (!URL_ || !OUT || !APP || !PAGE_FILE) { console.log('usage: node rig/t_681_lend.js <page url> <out folder> <patched ingenium_app.py> <page file>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
const HERE = __dirname, LOG = path.join(OUT, 'lenders.jsonl'), CODE = 'K7QM-4HXP', CID = 'aa11bb22cc33', PA = 8285, PB = 8286, API = 8297;
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.unlinkSync(LOG); } catch (e) {}
const lender = port => cp.spawn('python3', ['-I', path.join(HERE, 'lend681_mock.py'), String(port), LOG, CODE, CID, 'Study laptop', 'laptop', '127.0.0.1:' + PA + ',127.0.0.1:' + PB], { stdio: 'ignore' });
const post = (port, p, body, headers) => new Promise((res, rej) => { const d = JSON.stringify(body || {}); const r = http.request({ host: '127.0.0.1', port, path: p, method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(d) }, headers || {}) }, s => { let b = ''; s.on('data', x => b += x); s.on('end', () => res({ status: s.statusCode, body: b })); }); r.on('error', rej); r.end(d); });
const getj = (port, p, headers) => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port, path: p, method: 'GET', headers: headers || {} }, s => { let b = ''; s.on('data', x => b += x); s.on('end', () => res({ status: s.statusCode, body: b })); }); r.on('error', rej); r.end(); });
const logs = () => { try { return fs.readFileSync(LOG, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch (e) { return []; } };
async function settings(p) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} try { closeModal(); } catch (e) {} state.theme = 'day'; applyTheme();
    go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) {} try { IngSettingsParts.show('ai', 'devices', false); } catch (e) {} }); await p.waitForTimeout(1200); }
const clickText = (p, sel, re) => p.evaluate(({ sel, re }) => { const b = [...document.querySelectorAll(sel)].find(x => new RegExp(re).test(x.textContent.trim()) && x.offsetParent); if (b) b.click(); return !!b; }, { sel, re });

const PARTS = (process.env.PARTS || 'web,native,shell').split(',');
const step = m => { if (process.env.STEPS) console.log('.. ' + m); };
(async () => {
  const A = lender(PA), B = lender(PB); await sleep(1200);
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  // ---------------- web: a browser ----------------
  if (PARTS.includes('web')) {
  console.log('== a web browser');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await settings(p);
  const c0 = await p.evaluate(() => { const c = document.getElementById('linkCard'); return { on: c.classList.contains('ld-on'), oldHidden: getComputedStyle(document.getElementById('linkClient')).display === 'none', me: (c.querySelector('.ld-col:last-child .ld-head h3') || {}).textContent,
    find: [...c.querySelectorAll('button')].some(x => /Find my computers/.test(x.textContent)), typed: [...c.querySelectorAll('button')].some(x => /Type its address instead/.test(x.textContent)), shown: !!c.offsetParent }; });
  ok(c0.on && c0.oldHidden && c0.me === 'A web browser' && !c0.find && c0.typed && c0.shown, 'Settings, Your devices: the new card; a browser types the address (it cannot look on the Wi-Fi)', c0);
  await p.screenshot({ path: OUT + '/1_web_card.png' });
  await clickText(p, '#linkCard button', '^Type its address instead$'); await p.waitForTimeout(400);
  await p.fill('#ldAddr', '127.0.0.1:' + PA); await p.fill('#ldCode-typed', 'K7QM4HXX'); await clickText(p, '#linkCard .ld-code button', '^Pair$'); await p.waitForTimeout(1800);
  const wrong = await p.evaluate(() => ({ err: (document.querySelector('#linkCard .ld-err') || {}).textContent || '', n: IngLend.state().computers.length }));
  ok(/not the one/.test(wrong.err) && wrong.n === 0, 'a wrong code does not pair, and says so in plain words', wrong);
  await p.fill('#ldCode-typed', 'K7QM4HXP'); await clickText(p, '#linkCard .ld-code button', '^Pair$'); await p.waitForTimeout(2500);
  const s1 = await p.evaluate(() => { const s = IngLend.state(); return { s, cloud: { p: state.cloud.provider, base: state.cloud.base, model: state.cloud.model, lendId: state.cloud.lendId }, src: chatSource() }; });
  const paired = logs().filter(l => l.paired);
  ok(s1.s.computers.length === 1 && s1.s.computers[0].id === CID && s1.s.computers[0].addrs.some(a => /8286/.test(a)) && s1.s.active === CID && s1.cloud.p === 'ingenium' && s1.cloud.lendId === CID && s1.src === 'cloud' && s1.cloud.model === 'Scriba 4B',
    'the right code pairs once: the computer is kept with every address, and its quick model answers', s1);
  ok(paired.length && paired[paired.length - 1].paired && paired[paired.length - 1].paired.name === 'A web browser' && paired[paired.length - 1].paired.kind === 'browser', 'the computer knows this device by its name and kind', paired.slice(-1));
  await p.screenshot({ path: OUT + '/2_web_paired.png' });
  // the chat answers through the computer, and the request names this device
  await p.evaluate(() => { go('chat'); document.getElementById('chatNew').click(); const i = document.getElementById('chatInput'); i.value = 'Hello?'; sendChat(); }); await p.waitForTimeout(3500);
  const chat = await p.evaluate(() => { const m = curMsgs(); return m.slice(-1)[0] && m.slice(-1)[0].text; });
  const asked = logs().filter(l => /chat\/completions/.test(l.path || '') && l.model);
  ok(/Hello from the study laptop\./.test(chat || '') && asked.length && asked[asked.length - 1].device && asked[asked.length - 1].device.name === 'A web browser', 'a message is answered by the computer, and the request names this device', { chat, asked: asked.slice(-1) });
  // a new address: found again by itself
  A.kill('SIGKILL'); await sleep(500);
  await p.evaluate(() => IngLend.check('aa11bb22cc33', { find: true })); await p.waitForTimeout(1500);
  await settings(p);
  const s2 = await p.evaluate(() => ({ base: IngLend.state().computers[0].base, status: IngLend.state().computers[0].status, cloud: state.cloud.base, chip: (document.querySelector('#linkCard .ld-comp .ld-chip') || {}).textContent }));
  ok(/8286$/.test(s2.base) && /8286\/v1$/.test(s2.cloud) && s2.status === 'ok' && /Connected at 127\.0\.0\.1:8286/.test(s2.chip || ''), 'the computer at a new address is found again by itself, and the chat follows it', s2);
  // Claude and the computer, both kept, one press each
  await p.evaluate(() => { state.cxKept = [{ id: 'anthropic|https://api.anthropic.com', provider: 'anthropic', base: 'https://api.anthropic.com', key: 'sk-test-invented', model: 'claude-opus-5-5', models: ['claude-opus-5-5'] }]; IngLend.paint(); });
  await p.waitForTimeout(300);
  const toClaude = await clickText(p, '#linkCard .ld-who button', 'Claude'); await p.waitForTimeout(500);
  const c1 = await p.evaluate(() => ({ p: state.cloud.provider, kept: (state.cxKept || []).length }));
  const toLaptop = await clickText(p, '#linkCard .ld-who button', 'Study laptop'); await p.waitForTimeout(500);
  const c2 = await p.evaluate(() => ({ p: state.cloud.provider, lendId: state.cloud.lendId, base: state.cloud.base, kept: (state.cxKept || []).filter(k => k.provider === 'anthropic').length, pressed: [...document.querySelectorAll('#linkCard .ld-who button')].map(x => x.getAttribute('aria-pressed') + ':' + x.textContent.trim().slice(0, 14)) }));
  ok(toClaude && toLaptop && c1.p === 'anthropic' && c2.p === 'ingenium' && c2.lendId === CID && /8286\/v1$/.test(c2.base) && c2.kept === 1, 'Claude and the computer are both kept: one press each, nothing to type again', { c1, c2 });
  // removed on the computer: the code once more
  const myId = await p.evaluate(() => IngLend.state().me.id);
  await post(PB, '/ctl/remove', { id: myId });
  await p.evaluate(() => IngLend.check('aa11bb22cc33', { find: false })); await p.waitForTimeout(1200);
  const r1 = await p.evaluate(() => ({ status: IngLend.state().computers[0].status, input: !!document.getElementById('ldCode-aa11bb22cc33'), chip: (document.querySelector('#linkCard .ld-comp .ld-chip') || {}).textContent }));
  ok(r1.status === 'code' && r1.input && /Removed there/.test(r1.chip || ''), 'removed on the computer: it asks for the code once more', r1);
  await p.fill('#ldCode-aa11bb22cc33', 'K7QM-4HXP'); await clickText(p, '#linkCard .ld-comp .ld-code button', '^Pair$'); await p.waitForTimeout(2000);
  const r2 = await p.evaluate(() => IngLend.state().computers.map(c => c.status + ':' + c.id));
  ok(r2.join() === 'ok:' + CID, 'the code typed again pairs it again', r2);
  // the top bar's menu lists the computer's models
  await p.evaluate(() => { go('chat'); }); await p.waitForTimeout(500);
  await p.click('#activeModelPill'); await p.waitForTimeout(800);
  const m1 = await p.evaluate(() => [...document.querySelectorAll('#waPop .ld-sec .tl-row')].map(x => x.textContent.trim()));
  await clickText(p, '#waPop .ld-sec .tl-row', 'Velox 2B'); await p.waitForTimeout(500);
  const m2 = await p.evaluate(() => state.cloud.model);
  ok(m1.length === 3 && m1.some(x => /Velox 2B/.test(x) && /Study laptop/.test(x)) && m2 === 'Velox 2B', "the top bar's menu lists the computer's models, one press each", { m1, m2 });
  await p.screenshot({ path: OUT + '/3_menu.png' });
  await p.keyboard.press('Escape');
  // after a reload: still paired, and found
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(2500); await settings(p); await p.waitForTimeout(1500);
  const rl = await p.evaluate(() => ({ s: IngLend.state().computers.map(c => c.name + '|' + c.status), act: IngLend.state().active, chip: (document.querySelector('#linkCard .ld-comp .ld-chip') || {}).textContent }));
  ok(rl.s.join() === 'Study laptop|ok' && rl.act === CID && /Connected at 127\.0\.0\.1:8286/.test(rl.chip || ''), 'after a reload it is still paired, and found by itself', rl);
  // left alone, nothing is redrawn
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const mo = new MutationObserver(ms => { n += ms.length; }); mo.observe(document.getElementById('linkCard'), { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 4000); }));
  ok(still === 0, 'left alone, nothing in the card is redrawn', still);
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(800);
  const nb = await p.evaluate(() => getComputedStyle(document.querySelector('#linkCard .ld-comp')).backgroundImage);
  ok(/rgb\(43, 35, 57\)/.test(nb), 'by night the card takes the night colours', nb);
  await p.screenshot({ path: OUT + '/4_night.png' });
  ok(errs.length === 0, 'no page error (browser)', errs);
  await ctx.close();
  }

  // ---------------- native: the Fire tablet's app (its bridge emulated) ----------------
  if (PARTS.includes('native')) {
  console.log('== the Fire tablet');
  const UA = 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/126.3.1 like Chrome/126.0.6478.71 Safari/537.36';
  const nctx = await b.newContext({ viewport: { width: 800, height: 1280 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.5, userAgent: UA }); const q = await nctx.newPage();
  const nerrs = []; q.on('pageerror', e => nerrs.push(e.message.slice(0, 300)));
  const emit = ev => q.evaluate(e => window.__ingNativeEvent && window.__ingNativeEvent(e), ev).catch(() => {});
  const reply = (callId, okk, v) => emit(okk ? { type: 'reply', callId, ok: true, result: v } : { type: 'reply', callId, ok: false, error: v });
  await q.exposeFunction('__nodeCall', async (json) => { let o; try { o = JSON.parse(json); } catch (e) { return; } const { method, args = {}, callId = '' } = o;
    if (method === 'info') return reply(callId, true, { engine: 'emulated', available: false, platform: 'android', threads: 4, gpu: false, maxCtx: 16384, net: true, device: { ramGB: 3, cores: 8, model: 'KFTRWI', maker: 'Amazon' } });
    if (method === 'listModels') return reply(callId, true, { models: [], builtin: [] });
    if (method === 'deviceInfo') return reply(callId, true, { kind: 'tablet', name: 'Fire tablet' });
    if (method === 'findLenders') { const found = []; for (const port of [PA, PB]) { try { const r = await getj(port, '/ingenium/hello'); const h = JSON.parse(r.body); if (h.app === 'Ingenium') found.push({ address: '127.0.0.1:' + port, computer: h.computer, models: h.models, lends: h.lends, callins: h.callins, id: h.id, kind: h.kind, addresses: h.addresses }); } catch (e) {} }
      return reply(callId, true, { found, me: '127.0.0.9', device: { kind: 'tablet', name: 'Fire tablet' } }); }
    if (method === 'net') { const u = new URL(args.url), body = args.body == null ? null : String(args.body), hdr = {};
      for (const [k, v] of Object.entries(args.headers || {})) { const low = k.toLowerCase(); if (low === 'host' || low === 'content-length' || low === 'connection') continue; hdr[k] = String(v); }
      if (body != null) { hdr['Content-Length'] = Buffer.byteLength(body); if (!Object.keys(hdr).some(k => k.toLowerCase() === 'content-type')) hdr['Content-Type'] = 'application/json'; }
      const r = http.request({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: String(args.method || 'GET').toUpperCase(), headers: hdr, agent: false }, res => { let all = '';
        res.on('data', d => { const s = d.toString(); if (args.stream && res.statusCode < 400) emit({ type: 'net-chunk', req: args.req || callId, text: s }); else all += s; });
        res.on('end', () => reply(callId, true, { status: res.statusCode, contentType: res.headers['content-type'] || '', body: all })); });
      r.on('error', e => reply(callId, false, e.code === 'ECONNREFUSED' ? 'Nothing answered at that address (is the program there running?).' : String(e.message))); if (body != null) r.write(body); r.end(); return; }
    return reply(callId, false, 'not available in this emulation: ' + method); });
  await nctx.addInitScript(() => { window.IngeniumNative = { call: function (j) { window.__nodeCall(String(j)); }, saveFile: function () { return true; } }; });
  await q.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 120000 }); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await q.waitForTimeout(1500);
  await q.evaluate(() => { try { localStorage.removeItem('ing.lend.device'); } catch (e) {} });
  await settings(q);
  const f0 = await q.evaluate(() => ({ me: (document.querySelector('#linkCard .ld-col:last-child .ld-head h3') || {}).textContent, find: [...document.querySelectorAll('#linkCard button')].some(x => /Find my computers/.test(x.textContent)), lender: !!document.getElementById('ldShare') }));
  ok(f0.me === 'Fire tablet' && f0.find && !f0.lender, 'the Fire tablet: named by its kind, it can look on the Wi-Fi (and does not lend)', f0);
  await clickText(q, '#linkCard button', '^Find my computers$'); await q.waitForTimeout(2000);
  const f1 = await q.evaluate(() => [...document.querySelectorAll('#linkCard .ld-found')].map(x => x.textContent.trim()));
  ok(f1.length === 1 && /Study laptop/.test(f1[0]), 'Find my computers finds the computer by itself (one computer, though it answered at one address)', f1);
  await q.screenshot({ path: OUT + '/5_fire_found.png' });
  await q.evaluate(() => document.querySelector('#linkCard .ld-found').click()); await q.waitForTimeout(400);
  const fid = await q.evaluate(() => { const i = document.querySelector('#linkCard .ld-codein'); return i && i.id; });
  await q.fill('#' + fid, 'k7qm4hxp'); await clickText(q, '#linkCard .ld-code button', '^Pair$'); await q.waitForTimeout(2500);
  const f2 = await q.evaluate(() => ({ s: IngLend.state().computers.map(c => c.name + '|' + c.status), act: IngLend.state().active }));
  const fp = logs().filter(l => l.paired && l.paired.name === 'Fire tablet');
  ok(f2.s.join() === 'Study laptop|ok' && f2.act === CID && fp.length && fp[0].paired.kind === 'tablet', 'the Fire tablet pairs with the code typed once; the computer knows it as "Fire tablet"', { f2, fp });
  await q.screenshot({ path: OUT + '/6_fire_paired.png' });
  ok(nerrs.length === 0, 'no page error (Fire tablet)', nerrs);
  await nctx.close();
  }

  // ---------------- shell: the real computer app, lending ----------------
  if (PARTS.includes('shell')) {
  console.log('== the computer that lends (the real back-end)');
  const appDir = path.join(OUT, 'app'); fs.mkdirSync(path.join(appDir, 'engine', 'linux-x64'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'home'), { recursive: true });
  fs.copyFileSync(APP, path.join(appDir, 'ingenium_app.py')); try { fs.rmSync(path.join(appDir, 'ingenium.html'), { force: true }); fs.symlinkSync(path.resolve(PAGE_FILE), path.join(appDir, 'ingenium.html')); } catch (e) { fs.copyFileSync(PAGE_FILE, path.join(appDir, 'ingenium.html')); }
  fs.copyFileSync(path.join(HERE, 'lend705_stub_llama.py'), path.join(appDir, 'engine', 'linux-x64', 'llama-server')); fs.chmodSync(path.join(appDir, 'engine', 'linux-x64', 'llama-server'), 0o755);
  const back = cp.spawn('python3', ['-I', path.join(HERE, 'run_app.py'), appDir, String(API)], { stdio: ['ignore', 'pipe', 'inherit'], env: Object.assign({}, process.env, { HOME: path.join(OUT, 'home'), STUB_LOG: path.join(OUT, 'stub.jsonl') }) });
  await new Promise((res, rej) => { let bb = ''; back.stdout.on('data', d => { bb += d; if (/page_port/.test(bb)) res(); }); back.on('exit', () => rej(new Error('run_app.py stopped'))); setTimeout(() => rej(new Error('run_app.py did not start')), 90000); });
  await sleep(1200); step('the back-end answers');
  const { openApp } = require('./bridge.js'); const sh = await openApp({ apiPort: API }); const s = sh.page; step('the page opened');
  const serrs = []; s.on('pageerror', e => serrs.push(e.message.slice(0, 300)));
  await s.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); step('ready'); await s.waitForTimeout(1500); await settings(s); await s.waitForTimeout(1500); step('settings');
  const h0 = await s.evaluate(() => ({ sw: !!document.getElementById('ldShare'), on: (document.getElementById('ldShare') || {}).getAttribute && document.getElementById('ldShare').getAttribute('aria-checked') }));
  await s.evaluate(() => document.getElementById('ldShare').click()); await s.waitForTimeout(2500); step('switched on');
  const st = await s.evaluate(() => window.pywebview.api.share_status());
  const h1 = await s.evaluate(() => ({ tiles: [...document.querySelectorAll('#linkCard .ld-tile')].map(x => x.textContent).join(''), on: document.getElementById('ldShare').getAttribute('aria-checked'), lend: !!document.querySelector('#linkCard details.ld-fix #lkLend') }));
  ok(h0.sw && h1.on === 'true' && h1.tiles === String(st.code).replace('-', '') && st.on && h1.lend, "the computer's own card: one switch; its code in raised tiles; How this computer lends kept", { h0, h1, code: st.code });
  const gp = st.port; const dh = { 'Authorization': 'Bearer ' + st.code, 'X-Ingenium-Device': 'id=fire-tab01;kind=tablet;name=Fire%20tablet' };
  const pr = await post(gp, '/ingenium/pair', {}, dh);
  await s.evaluate(() => IngLend.refresh()); await s.waitForTimeout(1500);
  const u1 = await s.evaluate(() => [...document.querySelectorAll('#linkCard .ld-user')].map(x => x.textContent.trim() + '|' + (x.querySelector('svg') ? 'icon' : '')));
  ok(pr.status === 200 && u1.length === 1 && /Fire tablet/.test(u1[0]) && /tablet/.test(u1[0]) && /icon$/.test(u1[0]), 'a device that pairs is listed by its name, with its own icon', { pr: pr.status, u1 });
  await s.screenshot({ path: OUT + '/7_lender.png' });
  await clickText(s, '#linkCard .ld-user button', '^Remove$'); await s.waitForTimeout(1500);
  const u2 = await s.evaluate(() => document.querySelectorAll('#linkCard .ld-user').length);
  const refused = await getj(gp, '/v1/models', dh);
  ok(u2 === 0 && refused.status === 401 && /removed/.test(refused.body), 'Remove: the device leaves the list, and the computer refuses it until it pairs again', { u2, refused });
  ok(serrs.length === 0, 'no page error (computer app)', serrs);
  await sh.browser.close(); back.kill('SIGKILL');
  }
  B.kill('SIGKILL'); try { A.kill('SIGKILL'); } catch (e) {}
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
