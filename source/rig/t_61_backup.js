// Ingenium 6.1 · Backup and moving (modules/r143.js), in Chromium:
// the owner's words (20 October 2026): "Create a backup and restore system that allows users to export the entire library
// and app state. ... Develop a migration path for users moving between different devices or platforms."
// A full round trip, byte for byte, from one browser profile to a fresh one (conversations, a Fabrica app with its history,
// its issues, settings, a large-store entry, Lector's documents, the app library, the small store, a signing key and the
// connection keys); the zip and its manifest read by Python's own zipfile; Merge beside Replace; a damaged, a cut-off and a
// foreign file refused with nothing changed; the keys opened by the right password and refused with a wrong one; the long
// texts a computer app keeps only on its disk (through shellApi); hundreds of megabytes there and back; the guide for every
// pair of devices; the look by day and night from a phone to 3440 pixels; axe-core on all of it; the time to ready.
//   node rig/t_61_backup.js http://127.0.0.1:8203/ingenium.html <out folder> [page without r143, for the time to ready]
//   BK_BIG_MB=240 sets the size of the large round trip (0 leaves it out).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const { spawnSync } = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3], URL_BASE = process.argv[4] || null;
const AXE = process.env.AXE || '/tmp/claude-0/-home-user/02db3569-4f80-5425-acc7-7b83b521aecb/scratchpad/a11y/package/axe.min.js';
const BIG_MB = process.env.BK_BIG_MB == null ? 240 : +process.env.BK_BIG_MB;
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n, full) => p.screenshot({ path: path.join(OUT, n + '.png'), fullPage: !!full });
let dlN = 0;
// each file the page hands over goes into a new folder of its own, and is read only by Python in isolated mode
function dlDir(tag) { const d = path.join(OUT, 'dl-' + (++dlN) + '-' + tag); fs.mkdirSync(d, { recursive: true }); return d; }
const PY = `
import sys, json, zipfile, hashlib
p = sys.argv[1]
out = {}
try:
    z = zipfile.ZipFile(p)
    out['test'] = z.testzip()
    m = json.loads(z.read('manifest.json'))
    names = set(z.namelist())
    bad = []
    blob = []
    for n, f in m['files'].items():
        b = z.read(n)
        if len(b) != f['size'] or hashlib.sha256(b).hexdigest() != f['sha256']:
            bad.append(n)
    for n in names:
        blob.append(z.read(n))
    allb = b''.join(blob)
    out.update(kind=m.get('kind'), format=m.get('format'), app=m.get('app'), version=m.get('version'), made=m.get('made'), platform=m.get('platform'),
               nfiles=len(m['files']), bad=bad, extra=sorted(names - set(m['files']) - {'manifest.json'}), missing=sorted(set(m['files']) - names),
               stores=[d['db'] for d in m.get('stores', [])], contents=[[c.get('label'), c.get('count'), c.get('bytes')] for c in m.get('contents', [])],
               secrets=m.get('secrets'), models=m.get('models'), leftOut=[x.get('what') for x in m.get('leftOut', [])], census=m.get('census'),
               secretPaths=m.get('secretPaths'), hub=m.get('hub'), disk=m.get('disk'), absent=m.get('absent'), excluded=[e.get('db') for e in m.get('excluded', [])],
               has=dict((k, k.encode() in allb) for k in sys.argv[2:]))
    for i in z.infolist():
        if i.filename == 'manifest.json':
            out['manifest_last'] = z.infolist()[-1].filename == 'manifest.json'
except Exception as e:
    out['error'] = repr(e)
print(json.dumps(out))
`;
function pyZip(file, ...needles) { const r = spawnSync('python3', ['-I', '-c', PY, file, ...needles], { encoding: 'utf8', maxBuffer: 64 << 20 }); try { return JSON.parse(r.stdout); } catch (e) { return { error: r.stderr || r.stdout }; } }
// a damaged copy: one byte turned over in the middle of the largest part's data
const PYFLIP = `
import sys, zipfile
src, dst = sys.argv[1], sys.argv[2]
z = zipfile.ZipFile(src)
i = max(z.infolist(), key=lambda x: x.compress_size)
data = bytearray(open(src, 'rb').read())
with open(src, 'rb') as f:
    f.seek(i.header_offset + 26)
    h = f.read(4)
nl = h[0] | (h[1] << 8); xl = h[2] | (h[3] << 8)
at = i.header_offset + 30 + nl + xl + i.compress_size // 2
data[at] ^= 0x5A
open(dst, 'wb').write(bytes(data))
print(i.filename, at)
`;
const PYZIP = `
import sys, zipfile
with zipfile.ZipFile(sys.argv[1], 'w') as z:
    z.writestr('hello.txt', 'Not a backup at all.')
    z.writestr('manifest.json', '{"kind":"something-else"}')
`;

async function boot(p, url) {
  const t0 = Date.now(); await p.goto(url || URL_);
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  const ms = Date.now() - t0;
  await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  return ms;
}
async function fresh(b, vp) { const ctx = await b.newContext({ viewport: vp || { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage(); p.__errs = [];
  p.on('pageerror', e => p.__errs.push(e.message)); return { ctx, p }; }
async function settings(p, tab) {
  await p.evaluate(() => go('settings')); await p.waitForSelector('#bkCard', { timeout: 15000 });
  if (tab) { await p.click('#bkTab-' + tab); await p.waitForTimeout(250); }
  await p.evaluate(() => document.getElementById('bkCard').scrollIntoView({ block: 'start' })); await p.waitForTimeout(250);
}
async function axeOn(p, where, sel) {
  await p.addScriptTag({ path: AXE });
  return p.evaluate(async ([where, sel]) => {
    const r = await axe.run(sel ? document.querySelector(sel) : document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ where, id: v.id, n: v.nodes.length, eg: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' ' + (n.failureSummary || '').slice(0, 160)) }));
  }, [where, sel || null]);
}
function fpDiff(a, b) { const out = []; ['state', 'local'].forEach(k => { if (a[k] !== b[k]) out.push(k); });
  const ks = new Set(Object.keys(a.stores || {}).concat(Object.keys(b.stores || {}))); ks.forEach(k => { if (JSON.stringify((a.stores || {})[k]) !== JSON.stringify((b.stores || {})[k])) out.push(k); });
  if (JSON.stringify(a.hub) !== JSON.stringify(b.hub)) out.push('hub'); return out; }
// what a refusal must leave as it was: every store and the issues, record by record, and the desk's own work
async function untouched(p) { return p.evaluate(async () => { const fp = await IngBackup.fingerprints();
  return JSON.stringify({ stores: fp.stores, hub: fp.hub, chats: (state.chats || []).map(c => c.id + ':' + (c.messages || []).length), appName: state.appName, lector: JSON.stringify((state.lector || {}).sets || {}),
    lib: JSON.stringify((state.appLib && state.appLib.apps) || {}), models: (state.models || []).length, keys: [state.cloud && state.cloud.key, state.search && state.search.braveKey],
    small: Object.keys(localStorage).filter(k => !/^ingenium_v4|^ing_lite_hub$/.test(k)).sort().map(k => k + '=' + localStorage.getItem(k)).join('|') }); }); }
function unDiff(a, b) { const x = JSON.parse(a), y = JSON.parse(b); return Object.keys(x).filter(k => JSON.stringify(x[k]) !== JSON.stringify(y[k])).map(k => k + ': ' + String(JSON.stringify(x[k])).slice(0, 300) + ' -> ' + String(JSON.stringify(y[k])).slice(0, 300)); }
// the page's own first-start work is let finish first: 9 seconds after it is ready it keeps the apps it carries in the
// library (modules/r120.js), which would otherwise land in the middle of a comparison
async function settle(p) {
  const t0 = Date.now(); let last = '', same = 0;
  while (Date.now() - t0 < 60000) {
    const s = await p.evaluate(() => JSON.stringify(Object.keys((state.appLib && state.appLib.apps) || {}).sort().map(k => k + ':' + (state.appLib.apps[k].version || '') + ':' + (state.appLib.apps[k].ref || ''))) + (performance.now() > 14000 ? '|late' : '|early'));
    if (s === last && /late$/.test(s)) { if (++same >= 3) return; } else same = 0;
    last = s; await p.waitForTimeout(1000);
  }
}
async function enterAgain(p) {
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
}
async function download(p, sel, tag) {
  const dir = dlDir(tag);
  const [d] = await Promise.all([p.waitForEvent('download', { timeout: 600000 }), p.click(sel)]);
  const f = path.join(dir, d.suggestedFilename()); await d.saveAs(f); return f;
}
async function chooseFile(p, file) {
  await settings(p, 'restore');
  await p.setInputFiles('#bkFile', file);
  await p.waitForFunction(() => { const o = document.getElementById('bkReadOut'); return o && (o.querySelector('#bkSum') || o.querySelector('.bk-msg')); }, null, { timeout: 600000 });
  await p.waitForTimeout(200);
  return p.evaluate(() => { const o = document.getElementById('bkReadOut'); const a = o.querySelector('.bk-msg.bad'); return { refused: !!a, text: o.textContent, role: a && a.getAttribute('role') }; });
}
// what this profile holds, read through the apps' own ways in
async function holdings(p, ids) {
  return p.evaluate(async (ids) => {
    const sha = u => AppLib.sha(typeof u === 'string' ? new TextEncoder().encode(u) : u);
    const o = { chats: (state.chats || []).filter(c => /^rt_/.test(c.id)).map(c => JSON.stringify(c)), appName: state.appName, motion: state.motion,
      lector: JSON.stringify((state.lector && state.lector.sets) || {}), appLib: JSON.stringify(state.appLib || {}),
      cloudKey: state.cloud && state.cloud.key, braveKey: state.search && state.search.braveKey, tabula: localStorage.getItem('tabula_rt_doc'),
      models: (state.models || []).map(m => m.customName || m.fileName) };
    if (ids.repo) {
      try { o.log = (await IngRepo.log(ids.repo)).map(c => c.oid + ' ' + c.msg); o.bundle = await sha(await IngRepo.bundle(ids.repo)); o.index = await IngRepo.readText(ids.repo, 'index.html'); o.appjs = await IngRepo.readText(ids.repo, 'app.js'); } catch (e) { o.repoErr = String(e && e.message || e); }
      try { o.hub = JSON.stringify(await fbHub.record(ids.repo)); } catch (e) { o.hubErr = String(e); }
    }
    for (const k of ['big1', 'big2', 'lx']) if (ids[k]) { const t = await IngBig.load(ids[k]); o[k] = t == null ? null : (t.length + ':' + await sha(t)); }
    try { const t = await AppLib.text('inkwell'); o.lib = t == null ? null : t.length + ':' + await sha(t); } catch (e) { o.lib = 'err'; }
    try { const k = await new Promise((res) => { const rq = indexedDB.open('ingenium_keys'); rq.onsuccess = () => { const d = rq.result; if (!d.objectStoreNames.contains('k')) { d.close(); res(null); return; } const g = d.transaction('k').objectStore('k').get('device'); g.onsuccess = () => { d.close(); res(g.result || null); }; g.onerror = () => { d.close(); res(null); }; }; rq.onerror = () => res(null); });
      o.key = k ? Array.from(k.pkcs8.slice(0, 64)).join(',') + ':' + k.pkcs8.length + ':' + await sha(k.pkcs8) : null; } catch (e) { o.key = 'err ' + e; }
    return o;
  }, ids);
}

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });

  // ---------------- 1 · the card in Settings, and the time to ready ----------------
  const A = await fresh(b); const pa = A.p;
  const readyA = await boot(pa);
  ok(await pa.evaluate(() => window.__ingParts && window.__ingParts.p64 === 'running' && typeof window.IngBackup === 'object'), 'the part runs (p64) and window.IngBackup is there');
  ok(await pa.evaluate(() => !document.getElementById('bkCard')), 'nothing is drawn at start: the card waits for Settings');
  await settings(pa);
  const card = await pa.evaluate(() => { const c = document.getElementById('bkCard'), d = document.getElementById('exportApp').closest('.card');
    return { label: c.getAttribute('aria-labelledby') && document.getElementById(c.getAttribute('aria-labelledby')).textContent, before: !!(c.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING),
      tabs: [...c.querySelectorAll('[role=tab]')].map(t => t.textContent + ':' + t.getAttribute('aria-selected')), oldKeys: !!document.getElementById('exportApp') && !!document.getElementById('importApp'),
      pointer: !!d.querySelector('.bk-pointer') }; });
  ok(card.label === 'Backup and moving' && card.before && card.tabs.join() === 'Back up:true,Restore:false,Moving:false', 'Settings has a "Backup and moving" card, before Data on this device, with three tabs', card);
  ok(card.oldKeys && card.pointer, 'the older desk-only keys stay, with a word pointing to the new card');
  // the keyboard moves between the tabs
  await pa.focus('#bkTab-make'); await pa.keyboard.press('ArrowRight');
  let kb = await pa.evaluate(() => ({ sel: document.querySelector('#bkCard [aria-selected=true]').id, foc: document.activeElement.id, vis: !document.getElementById('bkPane-restore').hidden }));
  await pa.keyboard.press('End'); const kb2 = await pa.evaluate(() => document.activeElement.id);
  await pa.keyboard.press('Home'); const kb3 = await pa.evaluate(() => document.activeElement.id);
  ok(kb.sel === 'bkTab-restore' && kb.foc === 'bkTab-restore' && kb.vis && kb2 === 'bkTab-move' && kb3 === 'bkTab-make', 'the arrow keys, Home and End move between the tabs and show their panes', { kb, kb2, kb3 });

  // ---------------- 2 · what one device holds ----------------
  const ids = await pa.evaluate(async () => {
    const enc = s => new TextEncoder().encode(s), o = {};
    o.big1 = IngBig.newId(); await IngBig.put(o.big1, 'A long attachment, line by line.\n'.repeat(9000));
    o.big2 = IngBig.newId(); await IngBig.put(o.big2, ('A large-store entry, with letters from afar: αβγ δ, 漢字, emoji 🌿. ').repeat(52000));
    state.chats = state.chats || [];
    for (let i = 0; i < 3; i++) state.chats.push({ id: 'rt_chat_' + i, title: 'Round trip ' + (i + 1), created: Date.now() - 9000 + i, messages: [
      { role: 'me', text: 'Question ' + i + ': will this come back whole?', at: Date.now() - 6000 }, { role: 'bot', text: 'Answer ' + i + ': yes, byte for byte ✓', at: Date.now() - 5000, done: Date.now() - 5000 }] });
    state.chats[state.chats.length - 2].messages.push({ role: 'me', text: 'With a file', at: Date.now() - 4000, attachRef: o.big1, attachName: 'notes.txt' });
    state.chats[state.chats.length - 1].messages.push({ role: 'me', text: 'With a long text', at: Date.now() - 3000, attachRef: o.big2, attachName: 'long.txt' });
    state.appName = 'Forest Studio'; state.motion = 'calm';
    state.search = state.search || {}; state.search.braveKey = 'BSA-rt-secret-123';
    state.cloud = state.cloud || {}; state.cloud.key = 'sk-rt-cloud-456'; state.cloud.base = 'http://192.168.1.20:8080';
    state.models = state.models || []; state.models.push({ id: 'm_rt', fileName: 'hearth-4b-q4.gguf', customName: 'Hearth 4B', sizeBytes: 2500000000, type: 'gguf', fileState: 'missing' });
    // a Fabrica app with three versions
    const r = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Round Trip</title><h1>One</h1>' }], { name: 'Round Trip App', msg: 'First version' });
    o.repo = r.id;
    await IngRepo.put(o.repo, 'index.html', '<!doctype html><title>Round Trip</title><h1>Two</h1>'); await IngRepo.commit(o.repo, 'Second version');
    await IngRepo.put(o.repo, 'app.js', 'console.log("three");'); await IngRepo.commit(o.repo, 'Third version: a script');
    // an issue with a comment, on that app
    await fbHub.importAll({ kind: 'ingenium-hub', version: 1, apps: [{ id: o.repo, next: 2, issues: [{ n: 1, title: 'Keep the backup whole', body: 'It must come back byte for byte.', state: 'open', by: 'Yannie', at: Date.now(),
      comments: [{ by: 'Yannie', at: Date.now(), body: 'A first comment, with ünïcödé.' }], events: [], labels: ['bug'], refs: [] }], pulls: [] }] });
    // a Lector document
    o.lx = IngBig.newId(); await IngBig.put(o.lx, '# The brief\n\nA document from Lector, kept whole: ' + 'its words, '.repeat(400));
    lxState(); state.lector.sets = Object.assign(state.lector.sets || {}, { rt_set: { docs: { brief: { ref: o.lx, title: 'Round Trip · The brief', made: Date.now() } } } });
    // an app in the library
    const page = '<!doctype html><title>Inkwell</title>' + '<p>Inkwell page body.</p>'.repeat(60000);
    await libKeep('inkwell', { version: '7.42', sha256: await AppLib.sha(enc(page)), size: enc(page).length, title: 'Inkwell' }, enc(page), page);
    // a signing key, made here
    await IngApk.keys.device();
    // the small store, as an app inside keeps it
    localStorage.setItem('tabula_rt_doc', JSON.stringify({ title: 'Tabula page', body: 'kept in the small store' }));
    // a package Fabrica made
    await new Promise((res, rej) => { const rq = indexedDB.open('fabrica_made', 1); rq.onupgradeneeded = () => { const d = rq.result; try { d.createObjectStore('meta'); } catch (e) { } try { d.createObjectStore('bytes'); } catch (e) { } };
      rq.onsuccess = () => { const d = rq.result, t = d.transaction(['meta', 'bytes'], 'readwrite'), key = o.repo + '|x|apk|rt.apk'; t.objectStore('meta').put({ key, repo: o.repo, commit: 'x', kind: 'apk', name: 'rt.apk', size: 4, at: Date.now() }, key); t.objectStore('bytes').put(new Uint8Array([80, 75, 3, 4]), key); t.oncomplete = () => { d.close(); res(); }; t.onerror = () => rej(t.error); }; rq.onerror = () => rej(rq.error); });
    saveState(); return o;
  });
  await settle(pa);
  const before = await holdings(pa, ids);
  const fpA = await pa.evaluate(() => IngBackup.fingerprints());
  ok(before.log && before.log.length === 3 && /Round Trip/.test(before.index) && before.big2 && before.lx && before.lib && before.key && before.hub, 'this profile holds the round trip: an app with 3 versions, an issue, long texts, a Lector document, a library app, a key', { log: before.log && before.log.length, lib: before.lib, key: !!before.key });

  // ---------------- 3 · backing up, from the card ----------------
  await settings(pa, 'make');
  await pa.waitForFunction(() => /Round Trip App/.test(document.getElementById('bkWhat').textContent), null, { timeout: 30000 });
  const what = await pa.evaluate(() => document.getElementById('bkWhat').innerText);
  ok(/Round Trip App/.test(what) && /documents? from Lector/.test(what) && /apps? in your library/.test(what) && /Inkwell/.test(what) && /issues and pull requests/.test(what), 'What goes in counts this device: conversations, Fabrica\'s apps by name, issues, Lector, the library', what.replace(/\n/g, ' | '));
  await shot(pa, 'b61-backup-day');
  // the keys, locked: a short password and two different ones are refused first
  await pa.click('#bkOptKy'); await pa.fill('#bkPw1', 'short'); await pa.fill('#bkPw2', 'short'); await pa.click('#bkMake');
  const e1 = await pa.textContent('#bkMakeErr');
  await pa.fill('#bkPw1', 'correct horse 42'); await pa.fill('#bkPw2', 'correct horse 43'); await pa.click('#bkMake');
  const e2 = await pa.textContent('#bkMakeErr');
  ok(/at least eight/.test(e1) && /not the same/.test(e2), 'a password under eight characters, or two that differ, is refused plainly', { e1, e2 });
  await pa.fill('#bkPw2', 'correct horse 42');
  let t0 = Date.now();
  const sawBar = pa.waitForFunction(() => { const p = document.getElementById('bkMakeProg'); return p && !p.hidden; }, null, { timeout: 60000 }).then(() => true, () => false);
  const fileKeys = await download(pa, '#bkMake', 'keys');
  const makeMs = Date.now() - t0;
  await pa.waitForFunction(() => /ready/.test((document.getElementById('bkMakeOut') || {}).textContent || ''), null, { timeout: 60000 });
  const made1 = await pa.evaluate(() => ({ out: document.getElementById('bkMakeOut').innerText, last: document.getElementById('bkLast').textContent, pw: document.getElementById('bkPw1').value, v: state.v61 && state.v61.backup && state.v61.backup.last }));
  ok(await sawBar && /Your backup is ready/.test(made1.out) && /Last backup: /.test(made1.last) && made1.pw === '' && made1.v && made1.v.keys === true, 'Make the backup shows its progress, saves one .zip, says it is ready, notes the last backup and forgets the password', { name: path.basename(fileKeys), ms: makeMs, last: made1.last });
  await shot(pa, 'b61-backup-made');
  const zk = pyZip(fileKeys, 'sk-rt-cloud-456', 'BSA-rt-secret-123', 'Round Trip App', 'Hearth 4B');
  ok(!zk.error && zk.test === null && zk.kind === 'ingenium-backup' && zk.format === 1 && zk.app === 'Ingenium' && zk.made && zk.platform && zk.platform.kind === 'browser', 'Python\'s zipfile reads it whole (every CRC right): a manifest naming the app, its version, the date and the device', { test: zk.test, kind: zk.kind, version: zk.version, platform: zk.platform, err: zk.error });
  ok(zk.bad && zk.bad.length === 0 && zk.extra.length === 0 && zk.missing.length === 0 && zk.nfiles > 5 && zk.manifest_last, 'the manifest gives the size and SHA-256 of every part, and every one is right', { n: zk.nfiles, bad: zk.bad, extra: zk.extra });
  ok(zk.contents && zk.contents.every(c => c[0] && typeof c[1] === 'number' && typeof c[2] === 'number') && zk.census && zk.census.chats >= 3 && zk.census.lector === 1 && zk.census.issues === 1 && (zk.census.fabrica || []).length === 1, 'its contents are listed with counts and sizes, and a census of conversations, apps, issues and documents', zk.contents);
  ok(['ingenium_big', 'ingenium_apps', 'ingenium_repos'].every(d => zk.stores.includes(d)) && zk.hub && zk.hub.issues === 1 && !zk.stores.includes('ingenium_files') && !zk.stores.includes('ingenium_desk') && !zk.stores.includes('ingenium_keys'), 'every store goes in (the large store, the library, Fabrica\'s apps), Fabrica\'s issues through fbHub.exportAll; the model store never', zk.stores);
  ok(!zk.stores.includes('fabrica_made') && zk.leftOut.includes("Fabrica's packages"), 'Fabrica\'s packages stay out by default', zk.leftOut);
  ok(['ingenium_files', 'ingenium_keys', 'fabrica_made', 'ingenium_hub'].every(d => zk.excluded.includes(d)), 'the manifest also names each store left out, with the reason (models and file links, the keys, the packages, the issues read through Fabrica)', zk.excluded);
  ok(zk.secrets && zk.secrets.kdf && zk.secrets.kdf.name === 'PBKDF2' && zk.secrets.kdf.iterations >= 600000 && zk.secrets.cipher.name === 'AES-GCM' && zk.secrets.keys === 1 && zk.secrets.connections === 2 && !zk.has['sk-rt-cloud-456'] && !zk.has['BSA-rt-secret-123'], 'chosen, the keys go locked (AES-GCM, PBKDF2 with 600,000 rounds): no connection key is readable anywhere in the file', { secrets: zk.secrets && { keys: zk.secrets.keys, connections: zk.secrets.connections, it: zk.secrets.kdf.iterations }, has: zk.has });
  ok(zk.models && zk.models.length === 1 && zk.models[0].name === 'Hearth 4B' && zk.leftOut.includes('Model files'), 'models never go in; their names are listed so they can be fetched again', zk.models);
  // the same without keys
  await pa.click('#bkOptKy');
  const filePlain = await download(pa, '#bkMake', 'plain');
  const zp = pyZip(filePlain, 'sk-rt-cloud-456', 'BSA-rt-secret-123');
  ok(!zp.error && !zp.secrets && !zp.has['sk-rt-cloud-456'] && !zp.has['BSA-rt-secret-123'] && (zp.secretPaths || []).length === 2 && zp.leftOut.includes('Signing keys and connection keys'), 'without the keys chosen, neither the signing key nor any connection key goes in (their places are named, not their values)', { secretPaths: zp.secretPaths });
  const withPk = await pa.evaluate(async () => { const r = await IngBackup.make({ packages: true }); return { stores: r.manifest.stores.map(d => d.db), n: r.manifest.census.packages }; });
  ok(withPk.stores.includes('fabrica_made') && withPk.n === 1, 'chosen, Fabrica\'s packages go in', withPk);

  // ---------------- 4 · restoring on a fresh device: the keys refused with a wrong password, then Replace ----------------
  const B = await fresh(b); const pb = B.p;
  await boot(pb); await settle(pb);
  const fpB0 = await pb.evaluate(() => IngBackup.fingerprints()), unB0 = await untouched(pb);
  t0 = Date.now();
  const r1 = await chooseFile(pb, fileKeys);
  const sum = await pb.evaluate(() => { const s = document.getElementById('bkSum'); const rows = [...s.querySelectorAll('tbody tr')].map(r => [...r.children].map(c => c.textContent));
    return { text: s.innerText, rows, focus: document.activeElement && document.activeElement.id, mode: (s.querySelector('input[name=bkMode]:checked') || {}).value, go: document.getElementById('bkGo').textContent,
      chips: [...s.querySelectorAll('.bk-chips li')].map(x => x.textContent), keys: !!document.getElementById('bkKeyPw') }; });
  const conv = sum.rows.find(r => /^Conversations/.test(r[0])) || [];
  ok(!r1.refused && /Every fingerprint matches/.test(sum.text) && /Made .* on a browser, with Ingenium/.test(sum.text), 'Restore checks every fingerprint first, and says when, where and with which Ingenium the backup was made', sum.text.split('\n').slice(0, 3).join(' | '));
  ok(+conv[1] >= 3 && conv[3] === conv[1] && sum.rows.some(r => /Apps in Fabrica/.test(r[0]) && r[1] === '1') && sum.rows.some(r => /Issues/.test(r[0]) && r[1] === '1') && sum.rows.some(r => /Lector/.test(r[0]) && r[1] === '1'), 'it shows what the backup holds, what is here now, and what there will be after', sum.rows.slice(0, 9));
  ok(sum.mode === 'replace' && /Replace and start again/.test(sum.go) && sum.chips.join() === 'Hearth 4B' && sum.keys && sum.focus === 'bkSum', 'on a fresh device Replace is chosen; the models to fetch again are named; the keys ask for their password; focus moves to the summary', { mode: sum.mode, chips: sum.chips, focus: sum.focus });
  await shot(pb, 'b61-restore-summary-day');
  await pb.fill('#bkKeyPw', 'a wrong password'); await pb.click('#bkGo');
  await pb.waitForFunction(() => /does not open/.test((document.getElementById('bkKeyErr') || {}).textContent || ''), null, { timeout: 60000 });
  const fpB1 = await pb.evaluate(() => IngBackup.fingerprints()), unB1 = await untouched(pb);
  ok(unB1 === unB0 && await pb.evaluate(() => !document.querySelector('.ing-ask')), 'a wrong password is refused ("That password does not open the keys. Nothing was changed.") and nothing here changes', { said: await pb.textContent('#bkKeyErr'), moved: unDiff(unB0, unB1) });
  await pb.fill('#bkKeyPw', 'correct horse 42'); await pb.click('#bkGo');
  await pb.waitForSelector('.ing-ask', { timeout: 120000 });
  const ask = await pb.evaluate(() => ({ t: document.querySelector('.ing-ask h3').textContent, x: document.querySelector('.ing-ask p').textContent, yes: document.querySelector('.ing-ask-keys .btn.primary').textContent }));
  ok(/Replace what is here/.test(ask.t) && /recovery shelf/.test(ask.x) && /Replace and start again/.test(ask.yes), 'the right password opens the keys, then the restore is confirmed first, saying the desk goes onto the recovery shelf', ask);
  await shot(pb, 'b61-restore-confirm');
  await Promise.all([pb.waitForNavigation({ timeout: 300000 }), pb.click('.ing-ask-keys .btn.primary')]);
  const restoreMs = Date.now() - t0;
  await enterAgain(pb);
  await pb.waitForTimeout(2000);
  const toast = await pb.evaluate(() => (document.getElementById('ingToast') || {}).textContent || '');
  const after = await holdings(pb, ids);
  const same = k => JSON.stringify(after[k]) === JSON.stringify(before[k]);
  ok(same('chats') && after.chats.length === 3, 'after it starts again: the conversations are back, word for word', after.chats.length);
  ok(same('log') && same('bundle') && same('index') && same('appjs'), 'the Fabrica app is back with its whole history: the same three versions, the same git bundle byte for byte', { log: after.log, bundle: after.bundle === before.bundle });
  ok(same('hub') && /Keep the backup whole/.test(after.hub || ''), 'its issue and comment are back (fbHub.importAll, after the app)', (after.hub || after.hubErr || '').slice(0, 120));
  ok(same('appName') && same('motion') && same('cloudKey') && same('braveKey') && same('tabula'), 'the settings, the small store and the connection keys are back', { appName: after.appName, cloud: !!after.cloudKey, brave: !!after.braveKey });
  ok(same('big1') && same('big2') && same('lx') && same('lector'), 'the large-store entries and Lector\'s document are back, byte for byte', { big2: after.big2, lx: after.lx });
  ok(same('lib') && same('appLib'), 'the app in the library is back, byte for byte', after.lib);
  ok(same('key'), 'the signing key is back, byte for byte, opened by its password', (after.key || '').slice(-20));
  ok(after.models.length === 0, 'the models list of the fresh device stays its own (models never move; their names wait to be fetched)', after.models);
  await settle(pb);
  const fpB2 = await pb.evaluate(() => IngBackup.fingerprints());
  const stores = ['ingenium_big/t', 'ingenium_apps/b', 'ingenium_repos/o', 'ingenium_repos/r', 'ingenium_keys/k'];
  const diff = stores.filter(k => !fpA.stores[k] || !fpB2.stores[k] || fpA.stores[k].digest !== fpB2.stores[k].digest);
  ok(diff.length === 0 && fpA.hub && fpB2.hub && fpA.hub.digest === fpB2.hub.digest, 'store by store, every record has the same fingerprint as on the first device (the large store, the library, Fabrica\'s objects and refs, the keys, the issues)', { diff, a: stores.map(k => fpA.stores[k] && fpA.stores[k].count), b: stores.map(k => fpB2.stores[k] && fpB2.stores[k].count) });
  ok(/Restored from the backup of/.test(toast) && /model to fetch again/.test(toast), 'once started again, a word says it was restored and that a model waits to be fetched', toast);
  await settings(pb);
  const note = await pb.evaluate(() => document.getElementById('bkNotice').innerText);
  ok(/Restored on/.test(note) && /Hearth 4B/.test(note), 'Backup and moving says when it was restored, from where, and which models to fetch again', note.replace(/\n/g, ' | '));
  await shot(pb, 'b61-restored-note');
  console.log('INFO timings: make ' + makeMs + ' ms, restore (read, check, confirm, put back, start again) ' + restoreMs + ' ms; ready A ' + readyA + ' ms');

  // ---------------- 5 · Merge: the work here stays beside the backup's ----------------
  await pb.evaluate(() => { state.chats.push({ id: 'rt_only_here', title: 'Only on this device', created: Date.now(), messages: [{ role: 'me', text: 'mine', at: Date.now() }] }); state.appName = 'B Studio'; saveState(); });
  const r2 = await chooseFile(pb, filePlain);
  const sum2 = await pb.evaluate(() => ({ mode: (document.querySelector('#bkSum input[name=bkMode]:checked') || {}).value, go: document.getElementById('bkGo').textContent, keys: !!document.getElementById('bkKeyPw'), lines: document.querySelector('#bkSum .bk-lines').innerText }));
  ok(!r2.refused && sum2.mode === 'merge' && /Merge and start again/.test(sum2.go) && !sum2.keys && /newer one is kept/.test(sum2.lines) && /settings here stay/.test(sum2.lines), 'on a device in use Merge is chosen, and it says the newer copy of each thing is kept and the settings here stay', sum2);
  await shot(pb, 'b61-restore-merge');
  await pb.click('#bkGo'); await pb.waitForSelector('.ing-ask', { timeout: 60000 });
  await Promise.all([pb.waitForNavigation({ timeout: 300000 }), pb.click('.ing-ask-keys .btn.primary')]);
  await enterAgain(pb);
  const merged = await holdings(pb, ids);
  const mergedIds = await pb.evaluate(() => (state.chats || []).map(c => c.id).filter(x => /^rt_/.test(x)).sort());
  ok(mergedIds.join() === 'rt_chat_0,rt_chat_1,rt_chat_2,rt_only_here' && merged.appName === 'B Studio' && merged.key === before.key && merged.braveKey === before.braveKey && merged.log.join() === before.log.join(), 'after Merge: the conversation only here stays beside the backup\'s, the name chosen here stays, the keys here stay', { mergedIds, appName: merged.appName });

  // ---------------- 6 · refused: damaged, cut off, foreign; nothing changes ----------------
  const C = await fresh(b); const pc = C.p; await boot(pc); await settle(pc);
  const fpC0 = await pc.evaluate(() => IngBackup.fingerprints()), unC0 = await untouched(pc);
  const dmg = path.join(dlDir('damaged'), 'Ingenium-backup-damaged.zip');
  const flip = spawnSync('python3', ['-I', '-c', PYFLIP, filePlain, dmg], { encoding: 'utf8' });
  const rd = await chooseFile(pc, dmg);
  ok(rd.refused && rd.role === 'alert' && /This backup is damaged/.test(rd.text) && /do(es)? not match (its|their) fingerprints?/.test(rd.text) && /Nothing was changed/.test(rd.text), 'a backup with one byte turned over is refused plainly: which parts fail their fingerprints, and that nothing was changed', { flipped: flip.stdout.trim(), text: rd.text.trim().slice(0, 200) });
  await shot(pc, 'b61-refused-damaged');
  const cut = path.join(dlDir('cut'), 'Ingenium-backup-cut.zip'); fs.writeFileSync(cut, fs.readFileSync(filePlain).subarray(0, Math.floor(fs.statSync(filePlain).size / 2)));
  const rc = await chooseFile(pc, cut);
  ok(rc.refused && /damaged/.test(rc.text) && /ends too soon/.test(rc.text), 'a backup cut off half way (a copy not finished) is refused: it ends too soon', rc.text.trim().slice(0, 160));
  const txt = path.join(dlDir('foreign'), 'holiday.zip'); fs.writeFileSync(txt, 'Just some words, not a backup.');
  const rf = await chooseFile(pc, txt);
  const otherZip = path.join(dlDir('otherzip'), 'photos.zip'); spawnSync('python3', ['-I', '-c', PYZIP, otherZip]);
  const rz = await chooseFile(pc, otherZip);
  const hubJson = path.join(dlDir('hubjson'), 'fabrica-issues.json'); fs.writeFileSync(hubJson, JSON.stringify({ kind: 'ingenium-hub', version: 1, apps: [] }));
  const rh = await chooseFile(pc, hubJson);
  ok(rf.refused && /not an Ingenium backup/.test(rf.text) && rz.refused && /not an Ingenium backup/.test(rz.text) && rh.refused && /Fabrica's issues and pages/.test(rh.text) && [rf, rz, rh].every(x => /Nothing was changed/.test(x.text)), 'foreign files are refused plainly: words, a zip of something else, and Fabrica\'s own copy of its issues (pointed to its place)', { rf: rf.text.trim().slice(0, 80), rz: rz.text.trim().slice(0, 90), rh: rh.text.trim().slice(0, 120) });
  const fpC1 = await pc.evaluate(() => IngBackup.fingerprints()), unC1 = await untouched(pc);
  ok(unC0 === unC1, 'after every refusal, nothing here changed (every store record by record, the issues, the desk\'s work, the small store)', unDiff(unC0, unC1));
  // a desk backup from an earlier Ingenium (one .json file) is still read
  const oldDesk = path.join(dlDir('olddesk'), 'Ingenium-backup.json');
  fs.writeFileSync(oldDesk, await pa.evaluate(() => JSON.stringify(state)));
  const ro = await chooseFile(pc, oldDesk);
  ok(!ro.refused && /desk backup from an earlier Ingenium/.test(ro.text), 'a desk backup from an earlier Ingenium (.json) is read, and shown as the desk alone', ro.text.trim().slice(0, 120));
  // the guide's restore key and the summary, checked for accessibility by night and on a phone below

  // ---------------- 7 · a computer app: the long texts its disk alone keeps, through shellApi ----------------
  const D = await fresh(b); const pd = D.p; await boot(pd);
  const desk = await pd.evaluate(async () => {
    window.__disk = {}; window.__calls = [];
    const fake = { big_put: (id, t) => { __disk[id] = t; __calls.push('big_put:' + id); return { ok: true }; }, big_get: id => (id in __disk ? { ok: true, text: __disk[id] } : { ok: false }),
      big_del: id => { delete __disk[id]; return { ok: true }; }, big_gc: () => ({ ok: true }), save_state: raw => { __calls.push('save_state'); window.__saved = raw.length; return true; }, desk_keep_now: why => { __calls.push('desk_keep_now:' + why); return { ok: true }; } };
    window.shellApi = function () { return fake; };
    const id = IngBig.newId(); __disk[id] = 'Kept only on the computer\'s disk. '.repeat(3000);
    state.chats.push({ id: 'rt_disk', title: 'From the disk', created: Date.now(), messages: [{ role: 'me', text: 'disk', at: Date.now(), attachRef: id }] });
    const r = await IngRepo.fromFiles([{ path: 'a.txt', data: 'mirrored' }], { name: 'Mirrored App', msg: 'One' }); await IngRepo.core.mirrorNow().catch(() => { });
    saveState();
    const made = await IngBackup.make({});
    const u8 = new Uint8Array(await made.blob.arrayBuffer()); let s = ''; for (let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
    return { id, disk: made.manifest.disk, mir: Object.keys((state.yard && state.yard.mir && state.yard.mir.recs) || {}).length, b64: btoa(s) };
  });
  ok(desk.disk && desk.disk.count === 1 && desk.mir >= 1, 'on a computer app, a long text the desk names that only the disk still holds goes in (read through shellApi big_get); the disk copy of Fabrica\'s apps does not go twice', { disk: desk.disk && desk.disk.count, mirrored: desk.mir });
  const deskZip = path.join(dlDir('desktop'), 'Ingenium-backup-desktop.zip'); fs.writeFileSync(deskZip, Buffer.from(desk.b64, 'base64'));
  const E = await fresh(b); const pe = E.p; await boot(pe);
  await chooseFile(pe, deskZip); await pe.click('#bkGo'); await pe.waitForSelector('.ing-ask'); await Promise.all([pe.waitForNavigation({ timeout: 120000 }), pe.click('.ing-ask-keys .btn.primary')]);
  await enterAgain(pe);
  const back = await pe.evaluate(async (id) => { const t = await IngBig.load(id); return t ? t.length : 0; }, desk.id);
  ok(back === 'Kept only on the computer\'s disk. '.length * 3000, 'restored in a browser, that text is in the large store here', back);
  // restoring onto a computer app: the desk is kept first, and what goes into the stores goes onto the disk too
  const F = await fresh(b); const pf = F.p; await boot(pf);
  const toDisk = await pf.evaluate(async (b64) => {
    window.__disk = {}; window.__calls = [];
    const fake = { big_put: (id, t) => { __disk[id] = t; __calls.push('big_put:' + id); return { ok: true }; }, big_get: id => (id in __disk ? { ok: true, text: __disk[id] } : { ok: false }),
      big_del: id => { delete __disk[id]; return { ok: true }; }, big_gc: () => ({ ok: true }), save_state: raw => { __calls.push('save_state'); return true; }, desk_keep_now: why => { __calls.push('desk_keep_now:' + why); return { ok: true }; } };
    window.shellApi = function () { return fake; };
    const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const r = await IngBackup.restore(new File([u8], 'b.zip'), { mode: 'replace', password: 'correct horse 42', reload: false });
    return { ok: r.ok, problems: r.problems, calls: __calls.filter(c => !/^big_put:big_/.test(c) || true).slice(0, 400), keys: Object.keys(__disk) };
  }, fs.readFileSync(fileKeys).toString('base64'));
  const putIds = toDisk.calls.filter(c => c.startsWith('big_put:')).map(c => c.slice(8));
  ok(toDisk.ok && toDisk.calls[0] === 'desk_keep_now:before-restore' && toDisk.calls.includes('save_state') && putIds.includes(ids.big2) && putIds.includes(ids.lx) && toDisk.keys.includes('signing_device') && toDisk.keys.some(k => /^big_/.test(k) && k !== ids.big1 && k !== ids.big2 && k !== ids.lx), 'onto a computer app: the desk there is kept first (desk_keep_now), the desk saved to its disk, every long text, the library page, the key and Fabrica\'s apps written to its disk', { first: toDisk.calls[0], n: putIds.length, problems: toDisk.problems });

  // ---------------- 8 · moving: the guide for every pair of devices ----------------
  const gd = await pa.evaluate(() => { const D = Object.keys(IngBackup.devices), out = { pairs: 0, bad: [], dash: [] };
    D.forEach(f => D.forEach(t => { const g = IngBackup.guide(f, t); out.pairs++; if (g.steps.length !== 4 || g.steps.some(s => !s.title || s.text.length < 40) || g.stay.length < 5) out.bad.push(f + '>' + t);
      const all = JSON.stringify(g); if (/ - |—|–/.test(all)) out.dash.push(f + '>' + t); }));
    const T = (f, t) => IngBackup.guide(f, t).steps.map(s => s.text).join(' ');
    out.macIphone = /AirDrop/.test(T('mac', 'iphone')); out.winFire = /File Explorer/.test(T('windows', 'fire')) && /Download/.test(T('windows', 'fire'));
    out.fireMac = /OpenMTP/.test(T('fire', 'mac')) && /Silk's downloads/.test(T('fire', 'mac')); out.iphoneWin = /USB stick/.test(T('iphone', 'windows')) && /Files/.test(T('iphone', 'windows'));
    out.macWin = /exFAT/.test(T('macmini', 'windows')); out.fireIpad = /AirDrop/.test(T('fire', 'ipad')); out.browser = /already there/.test(T('browser', 'mac'));
    out.stay = IngBackup.guide('mac', 'fire').stay.join(' '); return out; });
  ok(gd.pairs === 49 && gd.bad.length === 0, 'the guide has four steps and what does not move for every pair of the seven devices', { pairs: gd.pairs, bad: gd.bad });
  ok(gd.macIphone && gd.winFire && gd.fireMac && gd.iphoneWin && gd.macWin && gd.fireIpad && gd.browser, 'each pair is carried its own way: AirDrop, File Explorer and the Download folder, OpenMTP and Silk\'s downloads, a USB stick and Files, exFAT, through a Mac', gd);
  ok(/Models/.test(gd.stay) && /Signing keys/.test(gd.stay) && /packages/.test(gd.stay) && /Links to files/.test(gd.stay) && gd.dash.length === 0, 'what does not move is said plainly (models, keys unless chosen, packages, file links), with no dashes as punctuation', gd.dash);
  await settings(pa, 'move');
  await pa.selectOption('#bkFrom', 'fire'); await pa.selectOption('#bkTo', 'windows'); await pa.waitForTimeout(200);
  const mv = await pa.evaluate(() => ({ n: document.querySelectorAll('#bkSteps > li').length, h: [...document.querySelectorAll('#bkSteps h4')].map(x => x.textContent), stay: document.querySelectorAll('#bkStay li').length }));
  await pa.click('#bkSwap'); await pa.waitForTimeout(150);
  const mv2 = await pa.evaluate(() => ({ f: document.getElementById('bkFrom').value, t: document.getElementById('bkTo').value, h: document.querySelector('#bkSteps h4').textContent, act: [...document.querySelectorAll('#bkSteps .bk-key')].map(x => x.textContent) }));
  ok(mv.n === 4 && /Back up on the Fire tablet/.test(mv.h[0]) && /Carry it to the Windows computer/.test(mv.h[1]) && mv2.f === 'windows' && mv2.t === 'fire' && /Back up on the Windows computer/.test(mv2.h), 'Moving shows the steps for the two devices chosen, and the swap key turns them round', { mv, mv2 });
  await pa.selectOption('#bkFrom', 'browser'); await pa.selectOption('#bkTo', 'ipad'); await pa.waitForTimeout(150);
  const act = await pa.evaluate(() => [...document.querySelectorAll('#bkSteps .bk-key')].map(x => x.textContent));
  ok(act.includes('Make the backup now'), 'when the first device is this one, its step has a key to make the backup now', act);
  await shot(pa, 'b61-moving-day');

  // ---------------- 9 · the look: by night, on a phone, on a 3440-pixel display; and axe-core ----------------
  const v = [];
  for (const tab of ['make', 'restore', 'move']) { await settings(pa, tab); v.push(...await axeOn(pa, 'desk/day/' + tab, '#bkCard')); }
  await pa.evaluate(() => document.body.setAttribute('data-theme', 'night'));
  for (const tab of ['make', 'restore', 'move']) { await settings(pa, tab); v.push(...await axeOn(pa, 'desk/night/' + tab, '#bkCard')); await shot(pa, 'b61-' + tab + '-night'); }
  await pb.evaluate(() => document.body.setAttribute('data-theme', 'night'));
  await chooseFile(pb, fileKeys); v.push(...await axeOn(pb, 'desk/night/summary', '#bkCard')); await shot(pb, 'b61-restore-summary-night');
  await pc.evaluate(() => document.body.setAttribute('data-theme', 'night')); await chooseFile(pc, dmg); v.push(...await axeOn(pc, 'desk/night/refused', '#bkCard'));
  const P = await fresh(b, { width: 390, height: 844 }); const pp = P.p; await boot(pp);
  const phone = [];
  for (const theme of ['day', 'night']) {
    await pp.evaluate(t => document.body.setAttribute('data-theme', t), theme);
    for (const tab of ['make', 'restore', 'move']) { await settings(pp, tab); v.push(...await axeOn(pp, 'phone/' + theme + '/' + tab, '#bkCard'));
      phone.push(await pp.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, card: Math.round(document.getElementById('bkCard').getBoundingClientRect().right) })));
      await shot(pp, 'b61-phone-' + theme + '-' + tab); }
  }
  await chooseFile(pp, fileKeys); v.push(...await axeOn(pp, 'phone/night/summary', '#bkCard'));
  phone.push(await pp.evaluate(() => { const w = document.querySelector('#bkSum .bk-tabwrap'); return { sw: document.documentElement.scrollWidth, iw: innerWidth, card: Math.round(document.getElementById('bkCard').getBoundingClientRect().right), table: w.scrollWidth <= w.clientWidth + 1 }; }));
  await pp.evaluate(() => document.getElementById('bkSum').scrollIntoView()); await shot(pp, 'b61-phone-night-summary');
  ok(phone.every(x => x.sw <= x.iw && x.card <= x.iw && x.table !== false), 'on a phone (390 pixels) nothing runs off the side, on every tab and with a summary shown (its table fits without scrolling)', phone);
  const W = await fresh(b, { width: 3440, height: 1440 }); const pw3 = W.p; await boot(pw3); await settings(pw3, 'make');
  const wide = await pw3.evaluate(() => { const r = document.getElementById('bkCard').getBoundingClientRect(); return { w: Math.round(r.width), sw: document.documentElement.scrollWidth, iw: innerWidth }; });
  await shot(pw3, 'b61-3440-day'); await settings(pw3, 'move'); await shot(pw3, 'b61-3440-move');
  ok(wide.sw <= wide.iw && wide.w > 600, 'on a 3440-pixel display the card sits in the page as the other cards do', wide);
  ok(v.length === 0, 'axe-core (WCAG 2.1 A and AA) finds nothing in the card: every tab, a summary, a refusal, by day and by night, on a desk and a phone', v.slice(0, 6));
  // reduced motion: nothing moves
  const rm = await pa.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); const k = document.querySelector('#bkCard .bk-key'); const t = getComputedStyle(k).transitionDuration; document.body.removeAttribute('data-motion'); return t; });
  const P2 = await b.newContext({ reducedMotion: 'reduce' }); const pr = await P2.newPage(); await boot(pr); await settings(pr);
  const rm2 = await pr.evaluate(() => getComputedStyle(document.querySelector('#bkCard .bk-thumb')).transitionDuration);
  ok(/^0\.00001s|^1e-05s|^0s/.test(rm.split(',')[0]) && /^0\.00001s|^1e-05s|^0s/.test(rm2.split(',')[0]), 'calm motion and the system\'s reduced motion are respected: the keys and the tab thumb do not move', { minimal: rm, reduce: rm2 });
  await P2.close();

  // ---------------- 10 · hundreds of megabytes, there and back ----------------
  if (BIG_MB > 0) {
    const G = await fresh(b); const pg = G.p; await boot(pg); await settle(pg);
    const seeded = await pg.evaluate(async (mb) => {
      // app pages and long texts, as text that squeezes about as a real page does
      function text(n, seed) { const w = ['ingenium', 'fabrica', 'lector', 'tabula', 'carpe', 'diem', 'forge', 'amethyst', 'slab', 'key', 'spring', 'night', 'day'], out = new Uint8Array(n); let x = seed | 1, i = 0;
        while (i < n) { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; const s = w[(x >>> 0) % w.length] + ((x & 7) === 0 ? '\n' : ' ') + (((x >>> 8) & 3) === 0 ? String.fromCharCode(48 + ((x >>> 12) % 75)) : ''); for (let j = 0; j < s.length && i < n; j++)out[i++] = s.charCodeAt(j); }
        return out; }
      const per = Math.floor(mb * 1024 * 1024 / 4), d = await new Promise(res => { const rq = indexedDB.open('ingenium_apps', 1); rq.onupgradeneeded = () => { try { rq.result.createObjectStore('b'); } catch (e) { } }; rq.onsuccess = () => res(rq.result); });
      const keys = [];
      for (let i = 0; i < 3; i++) { const id = IngBig.newId(), u = text(per, 77 + i); await new Promise(res => { const t = d.transaction('b', 'readwrite'); t.objectStore('b').put(u, id); t.oncomplete = res; }); keys.push(id); }
      d.close();
      const big = IngBig.newId(); await IngBig.put(big, new TextDecoder().decode(text(per, 991)));
      state.chats.push({ id: 'rt_big', title: 'Big', created: Date.now(), messages: [{ role: 'me', text: 'big', at: Date.now(), attachRef: big }] });
      state.rtBigLib = keys; saveState(); return { keys, big };
    }, BIG_MB);
    const fpG = await pg.evaluate(() => IngBackup.fingerprints());
    await settings(pg, 'make');
    const heap0 = await pg.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : 0);
    let peak = heap0; const watch = setInterval(async () => { try { const h = await pg.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : 0); if (h > peak) peak = h; } catch (e) { } }, 400);
    t0 = Date.now(); const bigFile = await download(pg, '#bkMake', 'big'); const bigMake = Date.now() - t0; clearInterval(watch);
    const bigSize = fs.statSync(bigFile).size;
    const zb = pyZip(bigFile);
    ok(!zb.error && zb.bad.length === 0 && bigSize > 0, 'a backup of ' + BIG_MB + ' MB is made from the card and saved as one file, every part fingerprinted', { file: Math.round(bigSize / 1048576) + ' MB', ms: bigMake, heapPeakMB: Math.round(peak / 1048576), err: zb.error });
    const H = await fresh(b); const ph = H.p; await boot(ph);
    t0 = Date.now(); const rb = await chooseFile(ph, bigFile); const bigCheck = Date.now() - t0;
    await ph.click('#bkGo'); await ph.waitForSelector('.ing-ask', { timeout: 60000 });
    await Promise.all([ph.waitForNavigation({ timeout: 900000 }), ph.click('.ing-ask-keys .btn.primary')]);
    await enterAgain(ph); const bigRestore = Date.now() - t0; await settle(ph);
    const fpH = await ph.evaluate(() => IngBackup.fingerprints());
    const dd = ['ingenium_apps/b', 'ingenium_big/t'].filter(k => !fpG.stores[k] || !fpH.stores[k] || fpG.stores[k].digest !== fpH.stores[k].digest);
    ok(!rb.refused && dd.length === 0, BIG_MB + ' MB there and back, byte for byte (checked in ' + bigCheck + ' ms, restored and started again in ' + bigRestore + ' ms)', { dd, counts: ['ingenium_apps/b', 'ingenium_big/t'].map(k => fpH.stores[k] && fpH.stores[k].count) });
    await G.ctx.close(); await H.ctx.close();
  }

  // ---------------- 11 · light at start ----------------
  if (URL_BASE) {
    const t = { with: [], without: [] };
    for (let i = 0; i < 3; i++) for (const [k, u] of [['with', URL_], ['without', URL_BASE]]) { const c = await b.newContext(); const p = await c.newPage(); const s = Date.now(); await p.goto(u); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); t[k].push(Date.now() - s); await c.close(); }
    const med = a => a.slice().sort((x, y) => x - y)[1];
    ok(med(t.with) - med(t.without) < 250, 'the time to ready is about the same with this part as without it (median of three)', { with: t.with, without: t.without });
  }

  const errs = [pa, pb, pc, pd, pe, pf, pp, pw3].reduce((a, p) => a.concat(p.__errs || []), []).filter(e => !/ResizeObserver/.test(e));
  ok(errs.length === 0, 'no page errors on any of the profiles', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
