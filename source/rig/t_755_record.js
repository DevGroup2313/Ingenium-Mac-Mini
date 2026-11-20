// Ingenium 7.55 · the record of Ingenium's security, profiles and design, put into Ingenium's folder (modules/r345.js; the files in
// source/docs/ingenium_record). Her words (20 November 2026): "I want any local model or even frontier models that I am using to have
// that information available to them in the Folders from the Ingenia". An invented person only.
//   1. her master copy, her own profile: Ingenium's folder holds the eleven files of the record, each the very text of its source file
//   2. opened again, nothing is added twice
//   3. a conversation in that folder carries them, as a folder's files go (its system prompt names each one)
//   4. her own change to a file stays; when the record changes, its new text goes beside hers, dated
//   5. a file she removed stays out; when the record changes, it comes back
//   6. with her sign-in on, the record's texts are sealed in the larger store, as every folder's files are
//   7. another person's profile on her master copy: nothing of the record
//     node rig/t_755_record.js <master test page url>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2];
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
const DIR = path.join(__dirname, '..', 'docs', 'ingenium_record');
const SRC = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).sort().map((f) => { const t = fs.readFileSync(path.join(DIR, f), 'utf8'); return { name: t.split('\n', 1)[0].replace(/^#+/, '').trim() + '.md', text: t }; });
const NAME = 'Ada Example', PW = 'tide-clock-harbour-41';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true || !!document.querySelector('#ingLockDoor:not([hidden]) #ildPw') || !!document.querySelector('#profDoor:not([hidden])'), null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2200); };
  const enter = () => p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const placed = () => p.evaluate(async () => { await (window.IngRecord ? IngRecord.place() : null); const f = (IngFolders.folders() || []).filter((x) => /^\s*ingenium\b/i.test(x.name))[0]; if (!f) return null;
    const out = []; for (const x of f.files || []) { const t = await ccLoad(x); out.push({ name: x.name, text: t }); } return { id: f.id, name: f.name, files: out, book: state.__r345 || null }; });
  const settle = async () => { await p.waitForFunction(() => !!(window.state && state.__r345 && Object.keys(state.__r345.files || {}).length), null, { timeout: 60000, polling: 500 }).catch(() => {}); await p.waitForTimeout(1500); };
  await p.goto(URL_, { timeout: 600000 }); await ready(); await enter(); await settle();
  // 1. the eleven files, each the very text
  let r = await placed();
  const rec = r ? r.files.filter((x) => /^Ingenium record \d\d · /.test(x.name)) : [];
  ok(SRC.length === 11 && rec.length === 11, 'Ingenium\'s folder holds the eleven files of the record', { src: SRC.length, inFolder: rec.map((x) => x.name) });
  ok(SRC.every((s) => rec.some((x) => x.name === s.name && x.text === s.text)), 'each one is the very text of its source file, under the title its first line gives', rec.map((x) => x.name + ' ' + (x.text || '').length));
  // 2. opened again
  await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(800); await p.reload(); await ready(); await enter(); await p.waitForTimeout(3000);
  r = await placed();
  ok(r && r.files.filter((x) => /^Ingenium record \d\d · /.test(x.name)).length === 11 && r.files.length === new Set(r.files.map((x) => x.name)).size, 'opened again, nothing is added twice', r && r.files.map((x) => x.name));
  // 3. a conversation in that folder carries them
  const sp = await p.evaluate((fid) => { const c = { id: 'ct1', title: 'Porting the sign-in', messages: [], projectId: fid }; state.chats = state.chats || []; state.chats.push(c); state.activeChat = 'ct1';
    const s = chatSystemPrompt(200000); return { has: (s.match(/<file name="Ingenium record \d\d · [^"]+">/g) || []).length, mark: /Files of the project/.test(s) }; }, r.id);
  ok(sp.mark && sp.has === 11, 'a conversation in that folder carries the eleven files, as a folder\'s files go', sp);
  // 4. her own change stays; a new record goes beside it, dated
  const target = SRC[3].name;
  await p.evaluate(async ([fid, nm]) => { const f = IngFolders.folders().filter((x) => x.id === fid)[0]; const x = f.files.filter((y) => y.name === nm)[0]; await ccPut(x, 'HERMARK-1 her own notes on profiles'); state.__r345.files[nm] = 'an older record'; saveState(); }, [r.id, target]);
  await p.waitForTimeout(800); await p.reload(); await ready(); await enter(); await p.waitForTimeout(3000);
  r = await placed();
  const hers = r.files.filter((x) => x.name === target)[0], beside = r.files.filter((x) => x.name !== target && x.name.indexOf(target.replace(/\.md$/, '') + ' (record of ') === 0)[0];
  ok(hers && hers.text === 'HERMARK-1 her own notes on profiles' && beside && beside.text === SRC[3].text, 'her own change stays; the record\'s new text goes beside it, dated', { hers: hers && hers.text.slice(0, 40), beside: beside && beside.name });
  // 5. a file she removed stays out, and comes back when the record changes
  const gone = SRC[5].name;
  await p.evaluate(([fid, nm]) => { const f = IngFolders.folders().filter((x) => x.id === fid)[0]; f.files = f.files.filter((y) => y.name !== nm); saveState(); }, [r.id, gone]);
  await p.waitForTimeout(800); await p.reload(); await ready(); await enter(); await p.waitForTimeout(3000);
  r = await placed();
  ok(!r.files.some((x) => x.name === gone), 'a file she removed stays out while the record is the same', r.files.map((x) => x.name));
  await p.evaluate((nm) => { state.__r345.files[nm] = 'an older record'; saveState(); }, gone); await p.waitForTimeout(800); await p.reload(); await ready(); await enter(); await p.waitForTimeout(3000);
  r = await placed();
  ok(r.files.some((x) => x.name === gone && x.text === SRC[5].text), 'when the record changes, it comes back', r.files.map((x) => x.name));
  // 6. with her sign-in on, sealed in the larger store
  await p.evaluate(() => { try { saveState(); } catch (e) {} }); await p.waitForTimeout(500);
  await p.evaluate(() => IngLock.setup({})); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 15000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 15000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 120000 });
  await p.evaluate(() => { const d = document.querySelector('#ingLockDoor #ildDone'); if (d) d.click(); }); await p.waitForTimeout(1500);
  const raw = await p.evaluate(async (nm) => { const f = IngFolders.folders().filter((x) => /^\s*ingenium\b/i.test(x.name))[0]; const x = f.files.filter((y) => y.name === nm)[0]; if (!x || !x.ref) return { ref: null };
    const db = await new Promise((res, rej) => { const q = indexedDB.open('ingenium_big'); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
    const v = await new Promise((res) => { const t = db.transaction('t', 'readonly').objectStore('t').get(x.ref); t.onsuccess = () => res(t.result); t.onerror = () => res(null); }); db.close();
    return { ref: x.ref, start: typeof v === 'string' ? v.slice(0, 6) : typeof v, plain: typeof v === 'string' && v.indexOf('Ingenium record') >= 0 }; }, SRC[2].name);
  ok(raw.ref && /^ING1/.test(raw.start) && !raw.plain, 'with her sign-in on, the record\'s texts are sealed in the larger store, as every folder\'s files are', raw);
  // 7. another person's profile
  await p.evaluate(() => { const x = window.__ingProfiles, g = x.reg() || { v: 1, cur: 'owner', list: [] }; if (!g.list.some((q) => q.id === 'ptide')) g.list.push({ id: 'ptide', name: 'Theo', t: 2, pw: 'none', kind: 'guest' }); g.cur = 'ptide'; x.save(g); });
  await p.reload(); await ready(); await enter(); await p.waitForTimeout(6000);
  const g = await p.evaluate(async () => { const fs_ = (window.IngFolders && IngFolders.folders()) || []; const n = fs_.reduce((a, f) => a + (f.files || []).filter((x) => /^Ingenium record \d\d · /.test(x.name)).length, 0);
    return { guest: !!window.__ingGuest, n, book: !!(window.state && state.__r345) }; });
  ok(g.guest && g.n === 0 && !g.book, 'another person\'s profile on her master copy: nothing of the record', g);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
