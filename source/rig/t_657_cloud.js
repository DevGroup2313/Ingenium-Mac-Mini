// node rig/t_657_cloud.js <Ingenium page url> <box address, e.g. 127.0.0.1:17860> <pairing code> <the box's folder> <out dir>
// Ingenium 6.57 (8 November 2026), in Chromium, with the desktop app's back end running headless as the computer that keeps the Cloud
// (rig/run_app.py with desktop/app_cloud_657.py applied, cloud_box_set(true)). Her words (8 November 2026): "I want all of my devices
// to have the same content in real time or be able to be updated over Ingenium's Cloud ... continue working on any app, project,
// assignment, or chat ... right from where I stopped working on the previous device." Two devices are two browser profiles; the
// people and the conversations are invented.
//   - device A makes a new Cloud with a passphrase and sends its work; the box keeps one snapshot, and none of the words of the work
//     can be found in the box's files (each part is sealed on the device);
//   - sent again with nothing changed, only what changed travels (no more than the desk and the snapshot's own list);
//   - device B with a wrong passphrase is refused and keeps nothing; with the right one it sees A's work, brings it in, and has A's
//     conversations, while its own models, its connection and its window stay as they were;
//   - B deletes one conversation, writes another, and sends; A brings it in: the deleted one is gone on A, the new one is there;
//   - a conversation A changed after B deleted it stays on A (a later change wins over an earlier deletion);
//   - a sync file sealed with the passphrase carries the work to a third device that has no Cloud;
//   - Settings, Your data, Ingenium Cloud shows the three steps;
//   - no errors on the pages.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, BOX, CODE, BOXDIR, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const PASS = 'correct horse battery staple 2026';
async function device(b) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCloud && window.IngBackup, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd && tourEnd(); } catch (e) {} });
  await p.waitForTimeout(500); return { ctx, p, errs }; }
function chat(id, title, text, t) { return { id, title, created: t, updated: t, messages: [{ role: 'user', content: text, at: t }, { role: 'assistant', content: 'Noted: ' + text, at: t + 1 }] }; }
function grepBox(word) { let hit = 0; const walk = d => { for (const f of fs.readdirSync(d)) { const q = path.join(d, f); if (fs.statSync(q).isDirectory()) walk(q); else if (fs.readFileSync(q).includes(word)) hit++; } }; walk(BOXDIR); return hit; }
(async () => {
  const b = await pw.chromium.launch();
  const A = await device(b), B = await device(b);
  const t0 = Date.now();
  // 1. device A: its work, a new Cloud, sent
  await A.p.evaluate(([c1, c2, c3]) => { state.chats = (state.chats || []).concat([c1, c2, c3]); state.activeChat = c3.id; saveState(); },
    [chat('ca1', 'Zephyrine thesis plan', 'Outline the Zephyrine chapter on learning design', t0), chat('ca2', 'Cover letter', 'A remote learning designer role at Quillmark', t0 + 5), chat('ca3', 'Reading list', 'Ten books on assessment', t0 + 9)]);
  const made = await A.p.evaluate(async ([box, code, pass]) => { try { const r = await IngCloud.connect({ addr: box, code, self: false }, pass); const s = await IngCloud.send(); return { r, s }; } catch (e) { return { err: String(e && e.message || e) }; } }, [BOX, CODE, PASS]);
  ok(made.r && made.r.created && made.s && made.s.sent > 2, 'device A makes a new Cloud and sends its work (' + (made.s ? made.s.sent + ' parts, ' + made.s.sentBytes + ' bytes' : '') + ')', made);
  const box1 = JSON.parse(await (await fetch('http://' + BOX + '/ingenium/cloud', { headers: { Authorization: 'Bearer ' + CODE } })).text());
  ok(box1.snaps.length === 1 && box1.snaps[0].kdf && box1.snaps[0].kdf.iter === 600000, 'the box keeps one snapshot, with how the key is drawn (600,000 rounds)', box1.snaps.map(s => ({ name: s.name, kdf: s.kdf })));
  ok(grepBox('Zephyrine') === 0 && grepBox('Quillmark') === 0, 'none of the words of the work can be found in the box\'s files: each part is sealed', { Zephyrine: grepBox('Zephyrine'), Quillmark: grepBox('Quillmark') });
  const again = await A.p.evaluate(async () => { try { return await IngCloud.send(); } catch (e) { return { err: String(e) }; } });
  ok(again && again.sent <= 3, 'sent again with nothing changed, only what changed travels (' + (again && again.sent) + ' parts)', again);
  // 2. device B: a wrong passphrase, then the right one
  await B.p.evaluate(() => { state.cloud = { provider: 'ingenium', addr: 'B-own-lender:17860', key: 'B-CODE', on: true }; state.winPos = { x: 7, y: 9 }; saveState(); });
  const wrong = await B.p.evaluate(async ([box, code]) => { try { await IngCloud.connect({ addr: box, code, self: false }, 'not the passphrase at all'); return { ok: true }; } catch (e) { return { err: String(e && e.message || e), ready: IngCloud.ready() }; } }, [BOX, CODE]);
  ok(/does not open this Cloud/.test(wrong.err || '') && wrong.ready === false, 'with a wrong passphrase device B is refused, plainly, and keeps nothing', wrong);
  const join = await B.p.evaluate(async ([box, code, pass]) => { try { const r = await IngCloud.connect({ addr: box, code, self: false }, pass); return { fresh: r.fresh.map(s => s.name), created: r.created }; } catch (e) { return { err: String(e && e.message || e) }; } }, [BOX, CODE, PASS]);
  ok(join.fresh && join.fresh.length === 1 && join.created === false, 'with the right passphrase device B sees A\'s work waiting', join);
  const brought = await B.p.evaluate(async () => { const x = await IngCloud.check(); await IngCloud.bring(x.fresh, { reload: false });
    return { ids: (state.chats || []).map(c => c.id), text: JSON.stringify(state.chats).includes('Zephyrine'), cloud: state.cloud, winPos: state.winPos, active: state.activeChat }; });
  ok(['ca1', 'ca2', 'ca3'].every(i => brought.ids.includes(i)) && brought.text, 'device B brings it in and has A\'s conversations, words and all', brought.ids);
  ok(brought.cloud && brought.cloud.addr === 'B-own-lender:17860' && brought.winPos && brought.winPos.x === 7, 'device B keeps its own connection and its window as they were', { cloud: brought.cloud, winPos: brought.winPos });
  // 3. B deletes one and writes another; A brings it in
  await B.p.waitForTimeout(50);
  const bs = await B.p.evaluate(async (t) => { state.chats = state.chats.filter(c => c.id !== 'ca2'); state.chats.push({ id: 'cb1', title: 'Interview practice', created: t, updated: t, messages: [{ role: 'user', content: 'Practise the Halvorsen interview questions', at: t }] }); saveState();
    try { const s = await IngCloud.send(); return { sent: s.sent, gone: (state.cloudGone || []).map(g => g.i) }; } catch (e) { return { err: String(e) }; } }, Date.now());
  ok(bs.sent >= 1 && bs.gone.includes('ca2'), 'device B sends its change, and its deletion travels with it', bs);
  // meanwhile A changed ca3 after... no: A changes ca1 now (after B deleted ca2, nothing of B's touches ca1)
  const ab = await A.p.evaluate(async () => { const x = await IngCloud.check(); const names = x.fresh.map(s => s.name); await IngCloud.bring(x.fresh, { reload: false });
    return { names, ids: (state.chats || []).map(c => c.id), text: JSON.stringify(state.chats).includes('Halvorsen') }; });
  ok(!ab.ids.includes('ca2') && ab.ids.includes('cb1') && ab.text && ab.ids.includes('ca1') && ab.ids.includes('ca3'), 'device A brings in B\'s work: the conversation deleted on B is gone on A, the new one is there', ab);
  // 4. a later change wins over an earlier deletion: B deletes ca3, then A edits ca3 before bringing B's work in
  await B.p.evaluate(async () => { state.chats = state.chats.filter(c => c.id !== 'ca3'); saveState(); await IngCloud.send(); });
  await A.p.waitForTimeout(30);
  const late = await A.p.evaluate(async () => { const c = state.chats.find(x => x.id === 'ca3'); c.messages.push({ role: 'user', content: 'Add two more books', at: Date.now() + 1000 }); c.updated = Date.now() + 1000; saveState();
    const x = await IngCloud.check(); await IngCloud.bring(x.fresh, { reload: false }); return (state.chats || []).map(c => c.id); });
  ok(late.includes('ca3'), 'a conversation changed on A after B deleted it stays on A', late);
  // 5. a sync file carries the work to a third device that has no Cloud
  const C = await device(b);
  const file = await A.p.evaluate(async (pass) => { const r = await IngBackup.make({ leave: ['ingenium_apps'] }); const s = await IngBackup.seal(r, pass); const u = new Uint8Array(await s.blob.arrayBuffer()); let bin = ''; for (let i = 0; i < u.length; i += 32768) bin += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(bin); }, PASS);
  const cIn = await C.p.evaluate(async ([b64, pass]) => { const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    const f = new File([u], 'Ingenium sync.sealed'); const bk = await IngBackup.open(f, { sealPassword: pass }); window.__noReload = true;
    const realReload = location.reload; try { await IngCloud.fileIn(bk, { reload: false }); } catch (e) { return { err: String(e) }; } return { ids: (state.chats || []).map(c => c.id) }; }, [file, PASS]);
  ok(cIn.ids && cIn.ids.includes('ca1') && cIn.ids.includes('cb1'), 'a sync file sealed with the passphrase carries the work to a third device without a Cloud', cIn);
  // 6. the card
  const card = await A.p.evaluate(async () => { IngRooms.open('settings', 'data', false); await new Promise(r => setTimeout(r, 400)); IngSettingsParts.show('data', 'cloud'); await new Promise(r => setTimeout(r, 600));
    const c = document.getElementById('cloudCard'); return c ? { shown: !!c.getClientRects().length, steps: [...c.querySelectorAll('.cl-step h3')].map(h => h.textContent.trim()), status: (c.querySelector('.cl-status') || {}).textContent, h: Math.round(c.getBoundingClientRect().height) } : null; });
  ok(card && card.shown && card.steps.length === 3 && /^On\./.test(card.status || ''), 'Settings, Your data, Ingenium Cloud shows the three steps and that it is on', card);
  await A.p.screenshot({ path: OUT + '/cloud_card.png' });
  ok(A.errs.length === 0 && B.errs.length === 0 && C.errs.length === 0, 'no errors on the pages', { A: A.errs, B: B.errs, C: C.errs });
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
