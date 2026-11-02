// Ingenium 6.7 · the owner's real key, end to end. The key file and its password are given on the command line and never kept in
// the repositories. The master edition brings the key back from its backup file, with its password, and signs a permission with it;
// a full edition built with the owner's public key (security/owner_keys.json) shows that permission as the owner's and valid, and a
// copy of it changed by one letter as not the owner's.
//   node rig/t_67_owner_key.js <master url> <full url> <key.ingkey> <password file> <out>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_M, URL_F, KEYFILE, PWFILE, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const PW = fs.readFileSync(PWFILE, 'utf8').trim();
const OWNER = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'security', 'owner_keys.json'), 'utf8')).keys[0];
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
async function open(b, url) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage(); p.__errs = []; p.__dl = [];
  p.on('pageerror', e => p.__errs.push(e.message)); p.on('download', d => p.__dl.push(d));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1200);
  // 6.7: Settings is in rooms (r173); the licence card is in Ownership, so that room is opened, as a person would
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('settings'); if (window.IngRooms) IngRooms.open('settings', 'own'); });
  await p.waitForSelector('#ingPermitCard', { timeout: 20000 }); await p.waitForTimeout(600); return { ctx, p };
}
const press = (p, text) => p.evaluate(t => { const b = [...document.querySelectorAll('#ingPermitCard button')].find(x => x.textContent.trim() === t || x.textContent.trim().indexOf(t) === 0); if (!b) return false; b.click(); return true; }, text);
async function answer(p, pw1) { await p.waitForSelector('#ingPermitCard .pc-form[role=group] input[type=password]', { timeout: 30000 });
  const ins = await p.$$('#ingPermitCard .pc-form[role=group] input[type=password]'); for (const i of ins) await i.fill(pw1);
  await p.evaluate(() => [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] button')].find(b => b.textContent === 'Go on').click()); }
const sayText = p => p.evaluate(() => (document.querySelector('#ingPermitCard .pc-say') || {}).textContent || '');
async function waitSay(p, re, ms = 90000) { const t = Date.now(); let s = ''; while (Date.now() - t < ms) { s = await sayText(p); if (re.test(s)) return s; await p.waitForTimeout(200); } return s; }
async function nextDownload(p, n0, name, ms = 90000) { const t = Date.now(); while (p.__dl.length <= n0 && Date.now() - t < ms) await p.waitForTimeout(100); const d = p.__dl[n0]; if (!d) return null; const f = path.join(OUT, name); await d.saveAs(f); return f; }
(async () => {
  const b = await pw.chromium.launch();
  try {
    let { ctx, p } = await open(b, URL_M);
    const [fc] = await Promise.all([p.waitForEvent('filechooser'), press(p, 'Bring back my key from its backup')]); await fc.setFiles(KEYFILE);
    await answer(p, 'not the password at all'); let s = await waitSay(p, /does not open|back on this device/);
    ok(/does not open/.test(s), 'a wrong password does not open the owner key', s);
    await p.evaluate(() => { const e = document.querySelector('#ingPermitCard .pc-say'); if (e) e.textContent = ''; });
    const [fc2] = await Promise.all([p.waitForEvent('filechooser'), press(p, 'Bring back my key from its backup')]); await fc2.setFiles(KEYFILE);
    await answer(p, PW); s = await waitSay(p, /back on this device|does not open/);
    ok(/back on this device/.test(s), 'the owner key comes back from its backup file with its password', s);
    const kid = await p.evaluate(() => new Promise(r => { const q = indexedDB.open('offline_owner', 1); q.onsuccess = () => { const t = q.result.transaction('o').objectStore('o').get('key'); t.onsuccess = () => r(t.result && t.result.kid); }; }));
    ok(kid === OWNER.kid, 'it is the key whose public half every build now carries', { kid, carried: OWNER.kid });
    await p.evaluate(() => { const f = document.querySelector('#ingPermitCard form.pc-form'); f.querySelector('[name=holder]').value = 'Test Holder';
      f.querySelectorAll('input[name=app]').forEach(i => { i.checked = i.value === 'ingenium'; }); f.querySelectorAll('input[name=allow]').forEach(i => { i.checked = i.value === 'use'; }); });
    await p.evaluate(() => { const e = document.querySelector('#ingPermitCard .pc-say'); if (e) e.textContent = ''; });
    const n0 = p.__dl.length; await press(p, 'Sign and save the permission'); await answer(p, PW);
    const permFile = await nextDownload(p, n0, 'test.ingperm'); s = await waitSay(p, /is signed and saved/);
    const perm = permFile ? JSON.parse(fs.readFileSync(permFile, 'utf8')) : null;
    ok(perm && perm.kid === OWNER.kid && /is signed and saved/.test(s), 'a permission is signed with the owner key', perm && perm.permit);
    ok(!p.__errs.length, 'master: no page errors', p.__errs); await ctx.close();

    ({ ctx, p } = await open(b, URL_F));
    const carried = await p.evaluate(() => !/carries no key of the owner/.test(document.querySelector('#ingPermitCard').textContent));
    ok(carried, 'the full edition carries the owner key (it no longer says it cannot check a permission)');
    const bring = async f => { const [c] = await Promise.all([p.waitForEvent('filechooser'), press(p, 'Bring in a permission')]); await c.setFiles(f); await p.waitForTimeout(1800); return sayText(p); };
    s = await bring(permFile); ok(/is the owner's and is valid: Test Holder/.test(s), 'the full edition shows the permission as the owner\'s and valid', s);
    const bad = JSON.parse(JSON.stringify(perm)); bad.permit.holder = 'Test Holdes'; fs.writeFileSync(path.join(OUT, 'changed.ingperm'), JSON.stringify(bad));
    s = await bring(path.join(OUT, 'changed.ingperm')); ok(/does not allow anything/.test(s) && /signature does not match/.test(s), 'the same permission changed by one letter is not the owner\'s', s);
    ok(!p.__errs.length, 'full: no page errors', p.__errs); await ctx.close();
  } catch (e) { ok(false, 'ran to the end', e.stack); }
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
