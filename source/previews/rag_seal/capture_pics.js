// The folder search's index sealed (Ingenium 7.59), as pictures of the running app, the new lines ringed in Ingenium's violet. An invented
// person (Ada Example) and an invented folder. The computer app's disk calls and its folder bridge stand in (as rig/t_749_disk_page.js
// and rig/t_759_rag_page.js do). compose_pics.py then gives each picture its number, title and sentence, one file each, at full size.
//   python3 rag/test/serve.py 8196 --vendor <vendor tree with noble/> --root <folder holding the built ingenium.html>
//   node previews/rag_seal/capture_pics.js http://127.0.0.1:8196/ <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const BASE = BASE0.replace(/\/?$/, '/'), SRC = path.resolve(__dirname, '..', '..');
const BRIDGE = 'http://127.0.0.1:8199', NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
const STUB = () => { let held = false; const st = () => ({ ok: true, held, kid: held ? 'x' : '', lib: true, files: 2, sealed: held ? 2 : 0, kinds: ['outbox', 'runs', 'training'] });
  const api = (window.pywebview && window.pywebview.api) || {};
  Object.assign(api, { disk_key_hold() { held = true; return Promise.resolve(st()); }, disk_key_drop() { held = false; return Promise.resolve(st()); },
    disk_status() { return Promise.resolve(st()); }, disk_seal_now() { return Promise.resolve(Object.assign(st(), { now: 0 })); },
    disk_unseal_all() { return Promise.resolve(Object.assign(st(), { opened: 2 })); } });
  window.pywebview = Object.assign(window.pywebview || {}, { api }); };
(async () => {
  const bridge = cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), '8199', '--state', path.join(path.resolve(OUT), 'bridge_state')], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 1500));
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(STUB);
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE));
  await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  const p = await ctx.newPage();
  const ring = (pad) => p.evaluate((pad) => { document.querySelectorAll('.pv-ring').forEach((x) => x.remove());
    const el = [...document.querySelectorAll('#secCard p, #ingLockDoor p, #ingLockDoor .ild-prog, #ingLockDoor *')].find((x) => x.offsetParent && x.children.length === 0 && /folder search.s index/.test(x.textContent));
    if (!el) return false; el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect(), d = document.createElement('div'); d.className = 'pv-ring';
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #6a3fb5;border-radius:12px;box-shadow:0 0 0 4px rgba(106,63,181,.18);left:' + (r.left - pad) + 'px;top:' + (r.top - pad) + 'px;width:' + (r.width + pad * 2) + 'px;height:' + (r.height + pad * 2) + 'px';
    document.body.appendChild(d); return true; }, pad || 8).then((x) => { if (!x) console.log('no ring'); return x; });
  const shot = async (name) => { await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/' + name + '.png' }); await p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.remove())); console.log('shot', name); };
  const room = async () => { await p.evaluate(() => { try { go('settings'); IngRooms.open('settings', 'security'); } catch (e) {} if (window.IngSecurity) IngSecurity.paint();
    const sv = [...document.querySelectorAll('#secCard .sc-sub')].find((x) => x.getAttribute('data-v') === 'disk'); if (sv) sv.click(); });
    await p.waitForTimeout(1500); await p.evaluate(() => { if (window.IngSecurity) IngSecurity.paint(); }); await p.waitForTimeout(1500); };
  const theme = (t) => p.evaluate((t) => { try { state.theme = t; applyTheme(); saveState(); } catch (e) {} }, t);
  await p.goto(BASE + 'ingenium.html', { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
  await p.waitForFunction(() => window.IngRag && typeof IngRag.sealState === 'function', null, { timeout: 60000 });
  await p.evaluate(async () => { await IngRag.folders(); const s = IngRag._store, me = IngRag._principalId; const f = await s.folder.add({ name: 'Field notes', path: '/invented/field-notes' }); await s.acl.grant({ folderId: f.id, principalId: me }); });
  // 1. the welcome door passed by Enter, the sign-in still off; then the sign-in turned on, as she would, from Settings
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(800); await room(); await ring(); await shot('1-off');
  await p.evaluate(() => IngLock.setup()); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 30000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800);
  await p.waitForFunction(async () => { const s = await IngRag.sealState(); return s.keyed && s.files && s.files.sealed >= 1; }, null, { timeout: 30000, polling: 500 });
  await room(); await ring(); await shot('2-on');
  await theme('night'); await room(); await ring(); await shot('3-on-night'); await theme('day');
  // turning protection off: the step that opens the index is held for a moment, so that it can be seen
  await p.evaluate(() => { const f = window.__ingBeforeOff; window.__ingBeforeOff = () => new Promise((r) => setTimeout(r, 4000)).then(() => f()); });
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); });
  await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find((x) => /Turn protection off/.test(x.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /folder search.s index/.test((document.querySelector('#ingLockDoor') || {}).textContent || ''), null, { timeout: 60000, polling: 100 });
  await ring(); await shot('4-turning-off');
  await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
  await b.close(); bridge.kill();
})().catch((e) => { console.log('stopped: ' + (e && e.stack || e)); process.exit(1); });
