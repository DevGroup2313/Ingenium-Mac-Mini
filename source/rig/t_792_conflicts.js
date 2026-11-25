// Ingenium 7.92: what two devices both changed, kept for her to choose (modules/r394.js). A merge as Ingenium Cloud makes one: a
// conversation she changed here since work last came in, replaced by a newer copy from elsewhere, is kept aside; Keep mine brings it back.
//   node rig/t_792_conflicts.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngConflicts && window.IngBackup, null, { timeout: 600000 }); await sleep(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const t1 = await p.evaluate(async () => { const now = Date.now(); state.chats = state.chats || [];
    state.chats.push({ id: 'cA', title: 'Thesis plan', updated: now, messages: [{ role: 'me', text: 'My version, written on this device', at: now }] });
    state.chats.push({ id: 'cB', title: 'Untouched here', updated: now - 30 * 864e5, messages: [{ role: 'me', text: 'old', at: now - 30 * 864e5 }] }); saveState();
    const theirs = JSON.parse(JSON.stringify(state)); theirs.chats = [{ id: 'cA', title: 'Thesis plan', updated: now + 60000, messages: [{ role: 'me', text: 'Their version, from the Mac mini', at: now + 60000 }, { role: 'bot', text: 'ok', at: now + 60000 }] },
      { id: 'cB', title: 'Untouched here', updated: now + 60000, messages: [{ role: 'me', text: 'changed elsewhere only', at: now + 60000 }] }];
    let r = null, err = null; try { r = await IngBackup.apply({ kind: 'desk', state: theirs, manifest: { stores: [], platform: { label: 'Mac mini' } } }, { mode: 'merge', reload: false }); } catch (e) { err = String(e && e.message || e); }
    const L = await IngConflicts.list(); const a = state.chats.find(c => c.id === 'cA');
    return { err, kept: r && r.keptAside, n: L.length, keys: L.map(x => x.key), now: a && a.messages[0].text }; });
  ok(!t1.err && t1.n === 1 && t1.keys[0] === 'chat:cA' && /Their version/.test(t1.now || ''), 'a conversation changed here and replaced by a newer copy is kept aside; one changed only elsewhere is not a conflict', t1);
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'data'); } catch (e) {} try { IngSettingsParts.show('data', 'cloud', true); } catch (e) {} }); await sleep(3000);
  const t2 = await p.evaluate(() => { IngConflicts.paint(); return new Promise(r => setTimeout(() => { const c = document.getElementById('clConf'); r({ there: !!c, rows: c ? c.querySelectorAll('.cf-row').length : 0, sides: c ? [...c.querySelectorAll('.cf-side b')].map(x => x.textContent) : [], times: (document.getElementById('clTimes') || {}).textContent || '' }); }, 500)); });
  ok(t2.there && t2.rows === 1 && t2.sides.length === 2 && /last sent/.test(t2.times), 'the Cloud card shows it side by side, hers and the one brought in, and when this device last sent and brought in work', t2);
  const vis = await p.evaluate(() => { const c = document.getElementById('clConf'); return !!(c && c.offsetParent); }); if (vis) { await p.evaluate(() => document.getElementById('clConf').scrollIntoView({ block: 'center' })); await sleep(300); await p.screenshot({ path: OUT + '/conflict.png' }); }
  const t3 = await p.evaluate(async () => { const L = await IngConflicts.list(); await IngConflicts.keepMine(L[0]); const a = state.chats.find(c => c.id === 'cA'); return { mine: a && a.messages[0].text, left: (await IngConflicts.list()).length }; });
  ok(/My version/.test(t3.mine || '') && t3.left === 0, 'Keep mine: her version comes back as it was, and the choice is settled', t3);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
