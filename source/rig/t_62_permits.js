// Ingenium 6.2 · ownership, licence and permissions (thoughts/permit_core.html, modules/r162.js), in Chromium. The owner's words:
// "only I am able to do distribute, sell, edit, remove or basically do anything with it, no one else has that right and should
// not ever have access unless I grant them limited persmission that I can discontinue at any time."
//   master: the card holds the licence (version 3 from 6.7) whole, laid out as a document, and saves it; the owner's key is made here under a password (too short
//           or two different ones refused) and its backup saved; its public half saved; a permission given (signed, saved), a
//           wrong password refused; a second one given and withdrawn, and the list of withdrawn permissions saved, signed;
//   then a full edition and a gift edition are built carrying that public key (and the gift one carrying the first permission):
//   full:   no permission kept, so Ingenium itself is neither in Code's list nor in the install kit; the permission brought in is
//           valid, names its holder and number, and lets Ingenium itself be opened (edit) but not packaged (it does not allow it);
//           a permission changed by one letter, one signed by another key, one that has ended and one withdrawn (once the list is
//           brought in) each allow nothing and say why; kept after a reload;
//   gift:   carries its holder's permission from the start;
//   no page errors.
//   node rig/t_62_permits.js <master url> <out> <served folder> <its url>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { spawnSync } = require('child_process');
const [URL_M, OUT, SERVE, SERVE_URL] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const BUILD = path.join(__dirname, '..', 'build', 'build_page.py');
const LIC = fs.readFileSync(path.join(__dirname, '..', 'licence', 'LICENCE_ingenium.txt'), 'utf8');
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const PW = 'correct horse battery 42';

async function open(b, url) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage(); p.__errs = []; p.__dl = [];
  p.on('pageerror', e => p.__errs.push(e.message)); p.on('download', d => p.__dl.push(d));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  await settings(p); return { ctx, p };
}
async function settings(p) { await p.evaluate(() => go('settings')); await p.waitForSelector('#ingPermitCard', { timeout: 20000 }); await p.waitForTimeout(500); }
const press = (p, text) => p.evaluate(t => { const b = [...document.querySelectorAll('#ingPermitCard button')].find(x => x.textContent.trim() === t || x.textContent.trim().indexOf(t) === 0); if (!b) return false; b.click(); return true; }, text);
async function answer(p, pw1, pw2) { await p.waitForSelector('#ingPermitCard .pc-form[role=group] input[type=password]', { timeout: 30000 });
  const ins = await p.$$('#ingPermitCard .pc-form[role=group] input[type=password]'); await ins[0].fill(pw1); if (ins[1]) await ins[1].fill(pw2 == null ? pw1 : pw2);
  await p.evaluate(() => [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] button')].find(b => b.textContent === 'Go on').click()); }
async function nextDownload(p, n0, ms = 60000) { const t = Date.now(); while (p.__dl.length <= n0 && Date.now() - t < ms) await p.waitForTimeout(100); const d = p.__dl[n0]; if (!d) return null;
  const f = path.join(OUT, (++DLN) + '-' + d.suggestedFilename()); await d.saveAs(f); return f; }
let DLN = 0;
const sayText = p => p.evaluate(() => (document.querySelector('#ingPermitCard .pc-say') || {}).textContent || '');
async function waitSay(p, re, ms = 60000) { const t = Date.now(); let s = ''; while (Date.now() - t < ms) { s = await sayText(p); if (re.test(s)) return s; await p.waitForTimeout(200); } return s; }
async function give(p, holder, allows, from, until) {
  await p.evaluate(({ holder, allows, from, until }) => { const f = document.querySelector('#ingPermitCard form.pc-form'); f.querySelector('[name=holder]').value = holder;
    f.querySelectorAll('input[name=allow]').forEach(i => { i.checked = allows.includes(i.value); });
    if (from) f.querySelector('[name=from]').value = from; if (until !== undefined) f.querySelector('[name=until]').value = until; }, { holder, allows, from, until });
  const n0 = p.__dl.length; await press(p, 'Sign and save the permission'); await answer(p, PW); const f = await nextDownload(p, n0); await waitSay(p, /is signed and saved/); return f; }
async function bring(p, file) { const [fc] = await Promise.all([p.waitForEvent('filechooser'), press(p, 'Bring in a permission')]); await fc.setFiles(file); await p.waitForTimeout(1500); return sayText(p); }
const items = p => p.evaluate(() => [...document.querySelectorAll('#ingPermitCard .pc-list')][0] ? [...[...document.querySelectorAll('#ingPermitCard .pc-list')][0].querySelectorAll('.pc-item')].map(i => i.innerText.replace(/\n+/g, ' | ')) : []);
function build(ed, out, env) { const r = spawnSync('python3', [BUILD, out], { env: Object.assign({}, process.env, { ING_EDITION: ed }, env), encoding: 'utf8' }); if (r.status) throw new Error(r.stderr || r.stdout); return r.stdout; }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  let files = {};
  try {
    // ---------------- the master edition: the licence, the owner's key, permissions given and withdrawn ----------------
    let { ctx, p } = await open(b, URL_M);
    // 6.7: the licence (version 3) is laid out as a document: its contents, the plain words, every section and clause of the text
    const lic = await p.evaluate(() => { const d = document.querySelector('#ingPermitCard .pc-doc'); const norm = t => String(t || '').replace(/\s+/g, ' ').trim();
      return { text: d ? norm(d.textContent) : '', sections: d ? d.querySelectorAll('.pcd-h').length : 0, toc: d ? d.querySelectorAll('.pcd-toc button').length : 0, plain: d ? d.querySelectorAll('.pcd-plain li').length : 0,
        summary: (document.querySelector('#ingPermitCard details.pc-text > summary') || {}).textContent, head: document.querySelector('#ingPermitCard h2').textContent, line: document.querySelector('#ingPermitCard .pc-line').textContent }; });
    const words = LIC.replace(/=+/g, ' ').replace(/\u2022/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 3);
    const low = lic.text.toLowerCase(), missing = words.filter(w => low.indexOf(w.toLowerCase()) < 0);  // headings are shown in sentence case
    const nSec = (LIC.match(/^\d+\. [^a-z\n]+$/gm) || []).length, nPlain = (LIC.match(/^  \u2022 /gm) || []).length;
    ok(missing.length === 0 && /Version 3, 25 October 2026/.test(lic.text) && lic.sections === nSec && lic.toc === nSec && lic.plain === nPlain && /version 3/.test(lic.summary) && /sole original work of Yannie D\. Forest/.test(lic.line),
      'Settings holds the licence (version 3) whole, laid out with its contents and plain words, and says plainly whose work it is', { missing: missing.slice(0, 5), sections: lic.sections, nSec, toc: lic.toc, plain: lic.plain, nPlain, summary: lic.summary });
    let n0 = p.__dl.length; await press(p, 'Save the licence'); const lf = await nextDownload(p, n0);
    ok(lf && fs.readFileSync(lf, 'utf8') === LIC, 'Save the licence gives LICENCE.txt, the same text');
    // the key: a short password, two different ones, then made
    await press(p, 'Make my owner key'); await answer(p, 'short'); let bad = await p.evaluate(() => document.querySelector('#ingPermitCard .pc-form .pc-say.bad').textContent);
    await p.evaluate(() => [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] input')].forEach((i, k) => { i.value = k ? 'correct horse battery 43' : 'correct horse battery 42'; }));
    await p.evaluate(() => [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] button')].find(b => b.textContent === 'Go on').click());
    const bad2 = await p.evaluate(() => document.querySelector('#ingPermitCard .pc-form .pc-say.bad').textContent);
    ok(/twelve/.test(bad) && /not the same/.test(bad2), 'a password under twelve characters, or two that differ, is refused', [bad, bad2]);
    n0 = p.__dl.length;
    await p.evaluate(pw => { [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] input')].forEach(i => { i.value = pw; }); [...document.querySelectorAll('#ingPermitCard .pc-form[role=group] button')].find(b => b.textContent === 'Go on').click(); }, PW);
    files.backup = await nextDownload(p, n0); await waitSay(p, /Your owner key is made/);
    const bk = files.backup ? JSON.parse(fs.readFileSync(files.backup, 'utf8')) : {};
    ok(bk.kind === 'offline-project-owner-key' && bk.enc && bk.enc.iter >= 600000 && bk.enc.cipher === 'AES-256-GCM' && !JSON.stringify(bk).includes('"d"') && bk.pub && !bk.pub.d,
      'the owner key is made here; its backup is saved, its private half sealed under the password (PBKDF2, 600,000 rounds, AES-256-GCM), never in the clear', { kind: bk.kind, iter: bk.enc && bk.enc.iter });
    await p.waitForTimeout(600);
    const fp = await p.evaluate(() => (document.querySelector('#ingPermitCard .pc-fp') || {}).textContent || '');
    n0 = p.__dl.length; await press(p, 'Save the public key'); files.pub = await nextDownload(p, n0);
    const pub = JSON.parse(fs.readFileSync(files.pub, 'utf8'));
    ok(fp && pub.keys && pub.keys.length === 1 && pub.keys[0].kid === fp && pub.keys[0].jwk.crv === 'P-256' && !pub.keys[0].jwk.d && /not carry its public half/.test(await p.evaluate(() => document.getElementById('ingPermitCard').innerText)),
      'its public half is saved (owner_keys.json), and the card says this build does not carry it yet', { kid: fp });
    // a permission, then a wrong password, then one to withdraw, and one that has ended
    files.ada = await give(p, 'Ada Example', ['use', 'install', 'edit']);
    const ada = JSON.parse(fs.readFileSync(files.ada, 'utf8'));
    ok(ada.kind === 'offline-project-permission' && ada.permit.holder === 'Ada Example' && /^P-\d{4}-0001$/.test(ada.permit.n) && ada.permit.until && ada.kid === fp && ada.sig.length > 60,
      'a permission is given: it names its holder, its number, the apps, what it allows and when it ends, and is signed', ada.permit);
    await p.evaluate(() => { const f = document.querySelector('#ingPermitCard form.pc-form'); f.querySelector('[name=holder]').value = 'Wrong Password'; });
    await press(p, 'Sign and save the permission'); await answer(p, 'not the password at all'); const wr = await waitSay(p, /does not open/);
    ok(/That password does not open the key/.test(wr), 'a wrong password signs nothing', wr);
    files.bo = await give(p, 'Bo Tester', ['use']);
    files.old = await give(p, 'Cy Former', ['use', 'edit'], '2026-01-01', '2026-02-01');
    await p.evaluate(() => { const it = [...document.querySelectorAll('#ingPermitCard .pc-item')].find(i => /Bo Tester/.test(i.textContent) && i.querySelector('button')); it.querySelector('button').click(); });
    await waitSay(p, /is withdrawn in your book/);
    n0 = p.__dl.length; await press(p, 'Save the list of withdrawn permissions'); await answer(p, PW); files.wd = await nextDownload(p, n0); await waitSay(p, /signed and saved/);
    const wd = JSON.parse(fs.readFileSync(files.wd, 'utf8'));
    ok(wd.kind === 'offline-project-withdrawals' && wd.list.withdrawn.length === 1 && wd.kid === fp, 'one is withdrawn, and the list of withdrawn permissions is saved, signed', wd.list);
    ok(!p.__errs.length, 'master: no page errors', p.__errs.slice(0, 3));
    // a second key, somewhere else: what it signs is not the owner's
    const { ctx: c2, p: p2 } = await open(b, URL_M + '#other');
    await p2.evaluate(() => indexedDB.deleteDatabase('offline_owner')); await p2.reload(); await p2.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p2.waitForTimeout(1200); await settings(p2);
    // (a new context has its own store already; the reload above only makes sure)
    let m0 = p2.__dl.length; await press(p2, 'Make my owner key'); await answer(p2, PW); await nextDownload(p2, m0); await waitSay(p2, /Your owner key is made/); await p2.waitForTimeout(500);
    files.alien = await give(p2, 'Ada Example', ['use', 'install', 'edit', 'package']);
    await c2.close(); await ctx.close();
    // a changed one: one letter of its holder
    const tam = JSON.parse(JSON.stringify(ada)); tam.permit.holder = 'Ada Exampld'; files.tam = path.join(OUT, 'tampered.ingperm'); fs.writeFileSync(files.tam, JSON.stringify(tam));

    // ---------------- a full edition, carrying the owner's public key ----------------
    const fullOut = path.join(SERVE, 'ingenium_full_pk.html'), giftOut = path.join(SERVE, 'ingenium_gift_pk.html');
    const t0 = Date.now(); console.log('NOTE ' + build('full', fullOut, { ING_OWNER_KEYS: files.pub }).trim().split('\n').slice(-2).join(' | '));
    console.log('NOTE ' + build('gift', giftOut, { ING_OWNER_KEYS: files.pub, ING_PERMIT: files.ada }).trim().split('\n').slice(-2).join(' | ') + ' (' + ((Date.now() - t0) / 1000).toFixed(0) + ' s)');
    ({ ctx, p } = await open(b, SERVE_URL + '/ingenium_full_pk.html'));
    let st = await p.evaluate(() => ({ self: IngApps.list().some(a => a.key === 'ingenium-self' || a.key === 'ingenium'), kit: (() => { const k = document.querySelector('input[name="kitWhat"][value="self"]'); return k ? !k.closest('label').hidden : false; })(), what: kitWhat(), text: document.getElementById('ingPermitCard').innerText }));
    ok(!st.self && !st.kit && st.what === 'editor' && /No permission is kept here yet/.test(st.text) && !/carries no key of the owner/.test(st.text),
      'full, with no permission: Ingenium itself is neither in Code\'s list nor in the install kit; the card says none is kept', { self: st.self, kit: st.kit });
    let s = await bring(p, files.ada); let it = await items(p);
    st = await p.evaluate(() => ({ self: IngApps.list().some(a => a.key === 'ingenium-self' || a.key === 'ingenium'), kit: (() => { const k = document.querySelector('input[name="kitWhat"][value="self"]'); return k ? !k.closest('label').hidden : false; })() }));
    ok(/is the owner's and is valid: Ada Example, number P-\d{4}-0001/.test(s) && it.some(t => /Ada Example · P-\d{4}-0001 valid \|/.test(t) && /change it, for their own use/.test(t)) && st.self && !st.kit,
      'the owner\'s permission brought in is valid, names its holder and number, and lets Ingenium itself be opened (edit) but not packaged', { s, it, st });
    s = await bring(p, files.tam); it = await items(p);
    ok(/does not allow anything/.test(s) && it.some(t => /Ada Exampld/.test(t) && /not the owner's/.test(t) && /signature does not match/.test(t)), 'a permission changed by one letter is not the owner\'s', s);
    s = await bring(p, files.alien); it = await items(p);
    ok(it.filter(t => /not the owner's/.test(t) && /not signed with the owner's key/.test(t)).length === 1, 'one signed by another key is not the owner\'s', it.filter(t => /another|not signed/.test(t)));
    s = await bring(p, files.old); it = await items(p);
    ok(it.some(t => /Cy Former/.test(t) && /ended/.test(t) && /It ended on 1 February 2026/.test(t)), 'one that has ended says so, and allows nothing', it.find(t => /Cy Former/.test(t)));
    s = await bring(p, files.bo); it = await items(p); const boBefore = it.find(t => /Bo Tester/.test(t));
    s = await bring(p, files.wd); it = await items(p); const boAfter = it.find(t => /Bo Tester/.test(t));
    ok(/P-\d{4}-0002 valid \|/.test(boBefore || '') && /withdrawn/.test(boAfter || '') && /The owner has withdrawn it/.test(boAfter || '') && /list of withdrawn permissions is kept/.test(s), 'a withdrawn one is valid until the owner\'s list reaches this copy, and withdrawn once it does', [boBefore, boAfter]);
    await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1500); await settings(p); await p.waitForTimeout(800);
    it = await items(p); st = await p.evaluate(() => ({ self: IngApps.list().some(a => a.key === 'ingenium-self' || a.key === 'ingenium') }));
    ok(it.length === 5 && it.some(t => /Ada Example · .* valid/.test(t)) && it.some(t => /Bo Tester.*withdrawn/.test(t)) && st.self, 'kept after a reload, each with its state', { n: it.length, st, it });
    ok(!p.__errs.length, 'full: no page errors', p.__errs.slice(0, 3));
    await ctx.close();
    // ---------------- a gift edition, made for Ada ----------------
    ({ ctx, p } = await open(b, SERVE_URL + '/ingenium_gift_pk.html'));
    it = await items(p); st = await p.evaluate(() => ({ holder: (IngPermit.holder() || {}).holder, self: IngApps.list().some(a => a.key === 'ingenium-self' || a.key === 'ingenium') }));
    ok(it.length === 1 && /Ada Example · P-\d{4}-0001 valid \|/.test(it[0]) && st.holder === 'Ada Example' && !st.self, 'gift, made for Ada: it carries Ada\'s permission from the start (and the gift edition still holds no Ingenium of its own)', { it, st });
    ok(!p.__errs.length, 'gift: no page errors', p.__errs.slice(0, 3));
    await ctx.close();
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
