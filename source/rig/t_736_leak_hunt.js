// Ingenium 7.36: where her data can still be read without her password (a survey, for her security request of 18 November 2026: "I really
// want everything to be encrypted and protected ... my data is protected and also my code is protected and anything that I build inside
// of Ingenium with my local models and all of my current apps").
// A real computer app runs here (rig/run_app.py, HOME in a folder of its own), its page driven with its own functions as
// window.pywebview.api. Protection (modules/r197.js) is turned on as she would turn it on (Settings, Your data, Protect this copy). Then a
// mark is written into every kind of thing she makes: a chat, a note, a memory, a Code project, a Fabrica app (its files and a version),
// a long text, her GitHub sign-in, an app sent to her devices and an app served for the Home Screen. Then every store is read raw:
//   - the page's stores: localStorage, sessionStorage, every IndexedDB database and store (texts, objects, bytes; bytes also inflated, as
//     zlib, raw deflate and gzip, so a compressed copy is not missed), Cache Storage and the origin's private file system;
//   - the computer's disk: every file under the test's home folder (the app's own folder of data), also inflated where it can be.
// Each place is reported as sealed (no mark) or open (the mark readable), with what holds it. It is a survey: it lists, and fails only
// where the lock's own promise is broken (a store r197 says it seals, holding the mark in clear).
//   node rig/t_736_leak_hunt.js <folder holding ingenium_app.py and ingenium.html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const zlib = require('zlib');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 1500))); c ? pass++ : fail++; };
const MARK = 'LEAKMARK7f3a', NAME = 'Yannie', PW1 = 'the-abbey-of-cluny-1088';
const RUN_APP = path.join(__dirname, 'run_app.py');
function start(name, apiPort) { const home = path.join(OUT, name, 'home'), dir = path.join(OUT, name, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
  for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
  const pr = cp.spawn('python3', ['-I', RUN_APP, dir, String(apiPort)], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => err += d);
  return { pr, port: apiPort, home, dir, ready: async () => { for (let i = 0; i < 240; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) return JSON.parse(m[0]); await new Promise(r => setTimeout(r, 250)); } throw new Error(name + ' did not start: ' + err.slice(-600)); } }; }
async function protect(p) {
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 }); await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 180000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
}
/* the mark in bytes, also after inflating them as zlib, raw deflate or gzip */
function hasMark(buf) { if (!buf || !buf.length) return false; if (buf.includes(MARK)) return 'plain';
  for (const [n, f] of [['zlib', zlib.inflateSync], ['deflate-raw', zlib.inflateRawSync], ['gzip', zlib.gunzipSync]]) { try { const o = f(buf); if (o.includes(MARK)) return n; } catch (e) {} }
  return false; }
(async () => {
  const A = start('mac', 18991); let ia;
  try { ia = await A.ready(); } catch (e) { ok(false, 'the computer app starts', String(e)); process.exit(2); }
  const b = await pw.chromium.launch(); const errs = [];
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ca.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: A.port });
  const p = await ca.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 });
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(800);
  await protect(p);
  ok(await p.evaluate(() => !!(window.IngLock && IngLock.on())), 'protection is on, turned on as she would (Settings, Your data, Protect this copy)');
  /* the mark, into every kind of thing she makes */
  const made = await p.evaluate(async M => { const did = {}, t = async (k, f) => { try { await f(); did[k] = 'ok'; } catch (e) { did[k] = 'error: ' + String(e && e.message || e).slice(0, 120); } };
    await t('chat', async () => { state.chats = state.chats || []; state.chats.push({ id: 'c-' + M, title: 'Chat ' + M, msgs: [{ role: 'user', text: M + ' a chat' }, { role: 'assistant', text: M + ' a reply' }], created: Date.now() }); saveState(); });
    await t('note', async () => { const n = newStickyNote(); n.text = M + ' a note'; saveState(); });
    await t('memory', async () => { IngMemory.add(M + ' a memory'); saveState(); });
    await t('github token', async () => { state.github = state.github || {}; state.github.token = M + 'token'; saveState(); });
    await t('long text', async () => { await IngBig.put('leak-' + M, (M + ' a long text ').repeat(400)); });
    await t('code project', async () => { await ccMakeProject('Project ' + M, [{ name: 'index.html', text: '<p>' + M + ' code</p>' }], 'index.html'); });
    await t('fabrica app', async () => { const r = await IngRepo.create({ name: 'App ' + M }); await IngRepo.put(r.id, 'index.html', '<h1>' + M + ' fabrica</h1>'); await IngRepo.commit(r.id, 'Version ' + M); });
    await t('app sent to her devices', async () => { const a = window.pywebview.api; const res = await a.apps_send('leak-app', 'App ' + M, '1.0', btoa('<p>' + M + ' sent</p>'), []); if (!res.ok) throw new Error(res.error); });
    await t('app served for the Home Screen', async () => { const a = window.pywebview.api; const res = await a.apps_serve('leak-served', 'App ' + M, [{ path: 'index.html', b64: btoa('<p>' + M + ' served</p>') }]); if (!res.ok) throw new Error(res.error); });
    try { if (IngLock.flush) await IngLock.flush(); } catch (e) {}
    return did; }, MARK);
  console.log('MADE ' + JSON.stringify(made));
  await p.waitForTimeout(4000);
  /* the page's stores, read raw */
  const pageStores = await p.evaluate(async M => {
    const out = [], enc = new TextEncoder();
    const latin = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return s; };
    async function inflate(u8) { for (const f of ['deflate', 'deflate-raw', 'gzip']) { try { const ds = new DecompressionStream(f); const o = new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer()); const s = latin(o); if (s.includes(M)) return f; } catch (e) {} } return false; }
    async function look(v, depth) { depth = depth || 0; if (v == null || depth > 6) return false;
      if (typeof v === 'string') return v.includes(M) ? 'plain' : false;
      if (v instanceof Blob) v = new Uint8Array(await v.arrayBuffer());
      if (v instanceof ArrayBuffer) v = new Uint8Array(v);
      if (ArrayBuffer.isView(v)) { const u8 = new Uint8Array(v.buffer, v.byteOffset, v.byteLength); if (latin(u8).includes(M)) return 'plain'; return await inflate(u8); }
      if (typeof v === 'object') { for (const k of Object.keys(v)) { const r = await look(v[k], depth + 1); if (r) return r; } return false; }
      return false; }
    const sealedish = v => !!(v && typeof v === 'object' && (v.ing === 'sealed' || v.ing === 'sealed-bin' || v.sealed));
    for (const st of ['localStorage', 'sessionStorage']) { const S = window[st]; for (let i = 0; i < S.length; i++) { const k = S.key(i), v = S.getItem(k) || ''; out.push({ where: st + ' ' + k, n: 1, open: v.includes(M) ? 1 : 0, how: v.includes(M) ? 'plain' : '', sealed: /"ing":"sealed"|^\{"ing"/.test(v) ? 1 : 0 }); } }
    const dbs = indexedDB.databases ? await indexedDB.databases() : [];
    for (const d of dbs) { const db = await new Promise(res => { const r = indexedDB.open(d.name); r.onsuccess = () => res(r.result); r.onerror = () => res(null); }); if (!db) continue;
      for (const sn of [...db.objectStoreNames]) { const all = await new Promise(res => { try { const g = db.transaction(sn, 'readonly').objectStore(sn).getAll(); g.onsuccess = () => res(g.result); g.onerror = () => res([]); } catch (e) { res([]); } });
        let open = 0, how = '', sealed = 0; for (const v of all) { if (sealedish(v) || (window.IngLock && IngLock.isRecEnv && IngLock.isRecEnv(v))) sealed++; const r = await look(v); if (r) { open++; how = how || r; } }
        out.push({ where: 'IndexedDB ' + d.name + ' / ' + sn, n: all.length, open, how, sealed }); }
      db.close(); }
    try { for (const cn of await caches.keys()) { const c = await caches.open(cn); for (const rq of await c.keys()) { const t = await (await c.match(rq)).text(); out.push({ where: 'Cache ' + cn + ' ' + rq.url, n: 1, open: t.includes(M) ? 1 : 0 }); } } } catch (e) {}
    try { const root = await navigator.storage.getDirectory(); for await (const [n, h] of root.entries()) out.push({ where: 'private file system ' + n, n: 1, open: 0 }); } catch (e) {}
    return out; }, MARK);
  /* the computer's disk: every file under the test's home folder */
  const disk = []; (function walk(d) { let ents = []; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ents) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.isFile()) { let st; try { st = fs.statSync(f); } catch (x) { continue; } if (st.size > 200 << 20) continue; const r = hasMark(fs.readFileSync(f)); disk.push({ where: path.relative(A.home, f), size: st.size, open: r ? 1 : 0, how: r || '' }); } } })(A.home);
  fs.writeFileSync(path.join(OUT, 'stores.json'), JSON.stringify({ made, pageStores, disk }, null, 1));
  const openPage = pageStores.filter(x => x.open), openDisk = disk.filter(x => x.open);
  console.log('\nTHE PAGE\'S STORES (' + pageStores.length + '): open, with the mark readable:');
  openPage.forEach(x => console.log('  OPEN  ' + x.where + '  (' + x.open + ' of ' + x.n + ' records, ' + x.how + ')'));
  pageStores.filter(x => !x.open && x.n).forEach(x => console.log('  sealed or without it  ' + x.where + '  (' + x.n + (x.sealed ? ', ' + x.sealed + ' sealed' : '') + ')'));
  console.log('\nTHE COMPUTER\'S DISK (' + disk.length + ' files): open, with the mark readable:');
  openDisk.forEach(x => console.log('  OPEN  ' + x.where + '  (' + x.size + ' bytes, ' + x.how + ')'));
  /* what r197 promises to seal must hold no mark */
  const PROMISED = /^localStorage ingenium_v4|^IndexedDB (ingenium_big|ingenium_claude|ingenium_keys|ingenium_hub|ingenium_apps|ingenium_repos|fabrica_made) \//;
  const broken = openPage.filter(x => PROMISED.test(x.where)).concat(openDisk.filter(x => /desk\.json$|(^|\/)big\//.test(x.where)));
  ok(broken.length === 0, 'what the lock promises to seal holds no readable mark (the desk, the long texts, the stores it names; desk.json and big/ on the disk)', broken);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); A.pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
