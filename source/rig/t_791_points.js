// Ingenium 7.91: restore points, one thing brought back, and a backup checked (modules/r393.js), stage 2 of the recommendations she
// approved on 25 November 2026.
//   node rig/t_791_points.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, acceptDownloads: true }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const ready = async () => { await p.waitForFunction(() => window.__ingReady === true && window.IngPoints && window.IngBackup, null, { timeout: 600000 }); await sleep(2000); await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); };
  await p.goto(URL_, { timeout: 600000 }); await ready();
  // 1. a restore point holds the whole desk, with when, why and what it held
  const t1 = await p.evaluate(async () => { state.chats = state.chats || []; state.chats.push({ id: 'cX', title: 'The marker conversation', messages: [{ role: 'me', text: 'hello' }] }); saveState(); const pt = await IngPoints.take('A test'); const L = await IngPoints.list(); return { id: pt && pt.id, n: L.length, why: L[0].why, chats: L[0].sum.chats }; });
  ok(t1.id && t1.n >= 1 && t1.why === 'A test' && t1.chats >= 1, 'a restore point is kept with when, why and what the desk held', t1);
  // 2. one conversation brought back, and nothing else touched
  const t2 = await p.evaluate(async id => { const L = await IngPoints.list(), pt = L.find(x => x.id === id); state.chats = state.chats.filter(c => c.id !== 'cX'); state.chats.push({ id: 'cY', title: 'Written since', messages: [] }); saveState();
    await IngPoints.backChat(pt, 'cX'); return { back: !!state.chats.find(c => c.id === 'cX'), kept: !!state.chats.find(c => c.id === 'cY') }; }, t1.id);
  ok(t2.back && t2.kept, 'one conversation comes back from a restore point; what was written since stays', t2);
  // 3. an app's folder notes brought back
  const t3 = await p.evaluate(async () => { const P = IngFolders.folders()[0]; P.app.brief = 'The notes as they were.'; saveState(); const pt = await IngPoints.take('Notes'); P.app.brief = 'Notes changed since.'; saveState();
    await IngPoints.backNotes(pt, P.id); return IngFolders.folders()[0].app.brief; });
  ok(t3 === 'The notes as they were.', "an app's folder notes come back as they were", t3);
  // 4. the facts Ingenium knew brought back
  const t4 = await p.evaluate(async () => { const f = IngKnow.add('me', 'I write in British English.', { k: 'her' }); const pt = await IngPoints.take('Facts'); IngKnow.drop(f.id); const before = !!IngKnow.store().facts.find(x => x.id === f.id); await IngPoints.backFacts(pt); return { before, after: !!IngKnow.store().facts.find(x => x.id === f.id) }; });
  ok(!t4.before && t4.after, 'the facts Ingenium knew come back, without touching the rest', t4);
  // 5. a backup restored or merged keeps a restore point first
  const t5 = await p.evaluate(async () => { try { await IngBackup.apply({ manifest: {} }, { mode: 'merge' }); } catch (e) {} const L = await IngPoints.list(); return L[0].why; });
  ok(/Before a backup was merged in/.test(t5), 'before a backup (or Ingenium Cloud) brings work in, a restore point is kept', t5);
  // 6. check a backup: a real one is opened and checked without changing anything; a file that is not one is said plainly
  const t6 = await p.evaluate(async () => { const out1 = document.createElement('div'), out2 = document.createElement('div'); let made = null; try { made = await IngBackup.make({}); } catch (e) { made = { err: String(e && e.message || e) }; }
    const n0 = state.chats.length; if (made && made.blob) await IngPoints.check(new File([made.blob], made.name || 'backup.zip'), '', out1);
    await IngPoints.check(new File(['not a backup at all'], 'note.txt'), '', out2); return { made: !!(made && made.blob), err: made && made.err, ok1: out1.className, t1: out1.textContent.slice(0, 160), bad: out2.className, t2: out2.textContent.slice(0, 120), same: state.chats.length === n0 }; });
  ok(t6.made && /rp-ok/.test(t6.ok1) && /can be restored/.test(t6.t1) && /rp-bad/.test(t6.bad) && t6.same, 'Check a backup: a real backup is opened and every part checked; a file that is not one is refused plainly; nothing changes', t6);
  // 7. the card, under the backup's card
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'data'); } catch (e) {} }); await sleep(3000);
  await p.screenshot({ path: OUT + '/settings.png' });
  const t7 = await p.evaluate(() => { IngPoints.paint(); const bk = document.getElementById('bkCard'), c = document.getElementById('rpCard'); return { there: !!c, after: !!(bk && c && bk.nextSibling === c), rows: c ? c.querySelectorAll('.rp-row').length : 0, check: !!(c && c.querySelector('.rp-check')) }; });
  await sleep(500);
  const t7b = await p.evaluate(() => { const c = document.getElementById('rpCard'); return { rows: c ? c.querySelectorAll('.rp-row').length : 0 }; });
  ok(t7.there && t7.after && t7b.rows >= 4 && t7.check, 'Settings, Back up and move: Restore points under the backup, each row with its keys, and Check a backup', { t7, t7b });
  // 8. bring all of it back: the desk as it was, the desk of now kept first
  const id8 = await p.evaluate(async () => { state.chats.push({ id: 'cZ', title: 'Only in the point', messages: [] }); saveState(); const pt = await IngPoints.take('Whole'); state.chats = state.chats.filter(c => c.id !== 'cZ'); saveState(); IngPoints.backAll(pt); return pt.id; });
  await sleep(4000); await ready();
  const t8 = await p.evaluate(async () => { const L = await IngPoints.list(); return { back: !!(state.chats || []).find(c => c.id === 'cZ'), first: L.some(x => /^Before bringing back/.test(x.why)) }; });
  ok(t8.back && t8.first, 'Bring all of it back: the desk returns as it was, and the desk of a moment before was kept first', t8);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
