// Ingenium 7.59: the folder search's index sealed with the sign-in, on the page (modules/r197.js IngLock.ragKey and __ingBeforeOff,
// rag/main.js, modules/r340.js), with the desktop app's folder bridge standing in (rig/rag_bridge.py, rig/rag_bridge_shim.js).
// An invented person (Ada Quill) and invented passages. Her choice (21 November 2026): "One index per profile".
//   1. no sign-in: the index is plain, and Settings, Security says so
//   2. the sign-in turned on with the index open: it is sealed in place at once; read raw (the folder search stopped), the passages'
//      word is in no file; Settings, Security says it is sealed
//   3. Lock now, then sign in: the index opens with the key again, every passage found
//   4. the sign-in turned off: the index is opened again in place before the lock record goes; read raw, the word is back
//   python3 rag/test/serve.py 8196 --vendor <vendor tree with noble/> --root <folder holding the built ingenium.html>
//   node rig/t_759_rag_page.js http://127.0.0.1:8196/ <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_759_rag_page.js <page server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'), PAGE = BASE + 'ingenium.html', ORIGIN = new URL(BASE).origin;
const BRIDGE = (process.env.RAG_BRIDGE || 'http://127.0.0.1:8199').replace(/\/$/, ''), BRIDGE_ORIGIN = new URL(BRIDGE).origin;
const SRC = path.resolve(__dirname, '..');
fs.mkdirSync(OUT, { recursive: true }); const OUTA = path.resolve(OUT);
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const NAME = 'Ada Quill', PW = 'larkspur-meadow-4417', WORD = 'Wrenfallow';
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
async function waitOpen(p) { await p.waitForFunction(() => window.__ingLocked === false && (!document.querySelector('#ingLockDoor') || document.querySelector('#ingLockDoor').hidden), null, { timeout: 60000 }); await p.waitForTimeout(500); }

function helpers() {
  window.T = {};
  T.mk = (seed, dims = 384) => {
    const a = new Float32Array(dims); let s = (seed * 2654435761) >>> 0, n = 0;
    for (let i = 0; i < dims; i++) { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; a[i] = s / 4294967296 - 0.5; n += a[i] * a[i]; }
    n = Math.sqrt(n); for (let i = 0; i < dims; i++) a[i] /= n; return a;
  };
  T.files = async () => {
    const out = [];
    const go = async (d) => { for await (const [, h] of d.entries()) { if (h.kind === 'file') out.push(h); else await go(h); } };
    try { await go(await (await navigator.storage.getDirectory()).getDirectoryHandle('.ingenium-rag')); } catch (_) { /* none yet */ }
    return out;
  };
  // the folder search stopped first (its worker holds the files), then every file read raw
  T.raw = async (word) => {
    await IngRag.shutdown(); await new Promise((r) => setTimeout(r, 400));
    const out = { files: 0, holding: 0, sealedHeads: 0 };
    for (const h of await T.files()) {
      const u8 = new Uint8Array(await (await h.getFile()).arrayBuffer());
      if (u8.length <= 4096) continue;
      out.files++;
      const t = new TextDecoder('latin1').decode(u8);
      if (t.includes(word) || t.includes(word.toLowerCase())) out.holding++;
      if (t.slice(4096, 4104) === 'INGRAGS1') out.sealedHeads++;
    }
    return out;
  };
  T.state = async () => { await IngRag.folders(); return IngRag.sealState(); };
  T.found = async (word) => { await IngRag.folders(); const s = IngRag._store; return (await s.search.fts({ principalId: IngRag._principalId, query: word, k: 10 })).hits.length; };
  T.room = async () => { IngDiskSeal.describe(false); await new Promise((r) => setTimeout(r, 1200)); const d = document.createElement('div'); d.innerHTML = IngDiskSeal.describe(false); return d.textContent; };
}

(async () => {
  const started = [];
  started.push(cp.spawn('python3', [path.join(SRC, 'rig', 'rag_bridge.py'), new URL(BRIDGE).port, '--state', path.join(OUTA, 'bridge_state')], { stdio: 'ignore' }));
  await new Promise((r) => setTimeout(r, 1500));
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const external = [];
  await ctx.route((u) => u.origin !== ORIGIN && u.origin !== BRIDGE_ORIGIN && !/^(data|blob):/.test(u.protocol), (route) => { external.push(route.request().url()); route.abort(); });
  await ctx.addInitScript('window.__RAG_BRIDGE__ = ' + JSON.stringify(BRIDGE));
  await ctx.addInitScript({ path: path.join(SRC, 'rig', 'rag_bridge_shim.js') });
  await ctx.addInitScript(helpers);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const ev = (fn, a) => p.evaluate(fn, a);
  try {
    await p.goto(PAGE); await waitBoot(p);
    await p.waitForFunction(() => window.IngRag && typeof window.IngRag.sealState === 'function', null, { timeout: 60000 });

    // 1. no sign-in
    const plain = await ev(async (w) => {
      await IngRag.folders();
      const s = IngRag._store, me = IngRag._principalId;
      const f = await s.folder.add({ name: 'Field notes', path: '/invented/field-notes' });
      await s.acl.grant({ folderId: f.id, principalId: me });
      const chunks = [0, 1, 2, 3].map((i) => ({ chunk_index: i, heading_path: 'Part ' + (i + 1), char_start: i * 100, char_end: i * 100 + 99, page: null,
        content_hash: 'wf-' + i, text: 'The ' + w + ' hedge was planted in spring, entry ' + i + '.', embedding: T.mk(50 + i) }));
      await s.file.replace({ folderId: f.id, path: 'notes/one.md', size: 400, mtime: 1730000000000, contentHash: 'wf-file', model: 'm1', chunks });
      return { state: await IngRag.sealState(), found: await T.found(w), room: await T.room(), principal: IngRag.principal };
    }, WORD);
    ok(plain.principal === 'me' && plain.found === 4, 'the owner\'s folder search holds the invented folder (4 passages found)', plain);
    ok(plain.state.open && plain.state.on && !plain.state.keyed && plain.state.files.plain >= 1 && !plain.state.files.sealed, 'no sign-in: the index is plain', plain.state);
    ok(/The folder search's index is plain too/.test(plain.room), 'Settings, Security says the index is plain while the sign-in is off', plain.room);

    // 2. the sign-in turned on with the index open
    await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 10000 });
    await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
    await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 30000 });
    const words = await ev(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
    await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
    const asked = await ev(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
    await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
    await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
    await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
    await p.waitForFunction(async () => { const s = await IngRag.sealState(); return s.keyed && s.files && s.files.sealed >= 1; }, null, { timeout: 30000, polling: 500 }).catch(() => null);
    const on = await ev(async (w) => ({ state: await IngRag.sealState(), found: await T.found(w), room: await T.room() }), WORD);
    ok(on.state.keyed && on.state.files.sealed >= 1 && !on.state.files.plain, 'turning the sign-in on seals the open index in place, with the key in the folder search\'s memory', on.state);
    ok(on.found === 4, 'sealed, every passage is still found', on.found);
    ok(/The folder search's index: sealed with the same password/.test(on.room) && /Another person's profile has an index of its own/.test(on.room), 'Settings, Security says the index is sealed, and each profile\'s with its own', on.room);
    const raw1 = await ev((w) => T.raw(w), WORD);
    ok(raw1.files >= 1 && raw1.holding === 0 && raw1.sealedHeads === 1, 'read raw, the passages\' word is in no file of the private file system, and the index begins with the seal\'s head', raw1);

    // 3. Lock now, then sign in
    await ev(() => IngLock.lockNow('press'));
    await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 60000 }); await waitBoot(p);
    await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor #ildGo'); await waitOpen(p);
    await p.waitForFunction(() => window.IngRag && typeof window.IngRag.sealState === 'function', null, { timeout: 60000 });
    const back = await ev(async (w) => ({ found: await T.found(w), state: await IngRag.sealState() }), WORD);
    ok(back.found === 4 && back.state.keyed && back.state.files.sealed >= 1, 'after Lock now and the sign-in, the index opens with the key again, every passage found', back);

    // 4. the sign-in turned off
    await ev(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); if (window.IngSettingsParts) IngSettingsParts.show('data', 'lock'); });
    await p.waitForSelector('#ingLockCard', { timeout: 10000 });
    await ev(() => [...document.querySelectorAll('#ingLockCard button')].find((x) => /Turn protection off/.test(x.textContent)).click());
    await p.waitForSelector('#ingLockDoor #ildPw', { timeout: 5000 }); await p.fill('#ingLockDoor #ildPw', PW); await p.click('#ingLockDoor form button[type=submit]');
    await p.waitForFunction(() => /Protection is off/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 90000 });
    await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(800);
    const off = await ev(async (w) => ({ active: IngLock.active(), state: await IngRag.sealState(), found: await T.found(w) }), WORD);
    ok(!off.active && !off.state.keyed && off.state.files.plain >= 1 && !off.state.files.sealed && off.found === 4, 'turning the sign-in off opens the index again in place first, every passage there', off);
    const raw2 = await ev((w) => T.raw(w), WORD);
    ok(raw2.holding === 1 && raw2.sealedHeads === 0, 'read raw, the word is back in its one file, and no file is sealed', raw2);
    const again = await ev(async (w) => ({ found: await T.found(w), state: await IngRag.sealState() }), WORD);
    ok(again.found === 4 && !again.state.keyed, 'it opens without any key now', again);
  } catch (e) { ok(false, 'the test stopped: ' + (e && e.message)); try { await p.screenshot({ path: path.join(OUTA, 'stopped.png') }); } catch (_) { /* gone */ } }
  ok(external.length === 0, 'nothing was fetched from outside', external);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); started.forEach((c) => { try { c.kill(); } catch (_) { /* gone */ } });
  console.log(pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
