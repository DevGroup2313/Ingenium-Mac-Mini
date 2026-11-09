// Ingenium 6.30 (5 November 2026): a whole backup sealed with a password of her own (modules/r143.js). Her words: "I want you to encrypt
// Ingenium and everything inside of it ... I don't want my data getting lost or being stolen or leaked." Until now a backup was a plain zip,
// even with Ingenium locked. Invented data only: a chat about a made-up book, and a password made up here.
//   node rig/t_630_sealed.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const SECRET = 'Zeltrinaxa Quorvel'; const PW = 'tangerine-lighthouse-42';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngBackup, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  // an invented conversation
  await p.evaluate((SECRET) => { state.chats = state.chats || []; state.chats.unshift({ id: 'cSeal', title: 'Notes on ' + SECRET, msgs: [{ role: 'user', text: 'What happens in ' + SECRET + '?' }, { role: 'bot', text: SECRET + ' is a made-up book for this test.' }], created: Date.now() }); saveState(); }, SECRET);
  // 1. made and sealed through the page's own functions
  const r = await p.evaluate(([PW, SECRET]) => IngBackup.make({}).then(plain => IngBackup.seal(plain, PW).then(sealed => {
      const rd = bl => bl.arrayBuffer().then(x => new Uint8Array(x));
      return Promise.all([rd(plain.blob), rd(sealed.blob)]).then(([pu, su]) => { const td = new TextDecoder('latin1'); const ps = td.decode(pu), ss = td.decode(su);
        window.__sealed = sealed.blob; window.__plainSize = plain.blob.size;
        return { name: sealed.name, head: ss.slice(0, 24), plainHasManifest: ps.includes('manifest.json'), sealedHasManifest: ss.includes('manifest.json'), sealedHasSecret: ss.includes(SECRET), size: [plain.blob.size, sealed.blob.size], headJson: ss.slice(25, ss.indexOf('\n', 25)) }; }); })), [PW, SECRET]);
  ok(r.head === 'INGENIUM SEALED BACKUP 1' && /\.sealed$/.test(r.name), 'a sealed backup says what it is on its first line, and its name ends in .sealed', { head: r.head, name: r.name });
  ok(r.plainHasManifest && !r.sealedHasManifest && !r.sealedHasSecret, 'nothing of the backup can be read in the sealed file: not its list of contents, not a word of the conversation', r);
  const hj = JSON.parse(r.headJson);
  ok(hj.cipher === 'AES-GCM-256' && hj.kdf === 'PBKDF2-SHA-256' && hj.iter >= 600000 && hj.size === r.size[0] && r.size[1] === r.headJson.length + 26 + hj.size + 16 * hj.parts, 'its head names AES-GCM-256 under PBKDF2-SHA-256 with 600,000 rounds, and its length adds up', hj);
  // 2. opened: without the password it asks; a wrong one changes nothing; the right one opens it, every fingerprint checked
  const o = await p.evaluate(([PW]) => { const f = new File([window.__sealed], 'Ingenium backup.sealed');
    const tryOpen = pw => IngBackup.open(f, { sealPassword: pw }).then(bk => ({ ok: true, sealed: bk.sealed, kind: bk.kind, parts: bk.parts, chats: bk.manifest && bk.manifest.census }), e => ({ ok: false, code: e.code, msg: e.message }));
    return tryOpen(null).then(a => tryOpen('not-the-password-1').then(b2 => tryOpen(PW).then(c => ({ none: a, wrong: b2, right: c })))); }, [PW]);
  ok(o.none.code === 'sealed' && o.wrong.code === 'sealpw' && /does not open/.test(o.wrong.msg), 'without its password it asks for it; a wrong password is told so', o);
  ok(o.right.ok && o.right.sealed && o.right.kind === 'zip' && o.right.parts > 0, 'with the right password it opens as the backup it holds', o.right);
  // 3. a changed byte is found
  const t = await p.evaluate(([PW]) => window.__sealed.arrayBuffer().then(x => { const u = new Uint8Array(x); u[u.length - 40] ^= 1; const f = new File([u], 'changed.sealed');
    return IngBackup.open(f, { sealPassword: PW }).then(() => 'opened', e => e.code + ': ' + e.message); }), [PW]);
  ok(/^(damaged|sealpw)/.test(t), 'a sealed file with one byte changed is refused, not opened', t);
  // 4. the Backup card: the switch, the password fields it shares with the keys, and a sealed file asking for its password
  const card = await p.evaluate(() => { IngBackup.show('make'); const c = document.querySelector('#bkOptSl'); const pwBox = document.querySelector('#bkPw'); if (!c) return null;
    const before = pwBox.hidden; c.checked = true; c.dispatchEvent(new Event('change')); const lab = (document.querySelector('#bkPwLab') || {}).textContent;
    return { switch: !!c, label: (document.querySelector('#bkOptSlL') || {}).textContent, hiddenBefore: before, hiddenAfter: pwBox.hidden, pwLabel: lab }; });
  ok(card && card.label === 'Seal the whole backup' && card.hiddenAfter === false && card.pwLabel === 'A password for the backup', 'the Backup card has a switch to seal the whole backup, which asks for a password', card);
  await p.locator('#bkOptSl').scrollIntoViewIfNeeded().catch(() => {}); await p.locator('#bkMake').screenshot({ path: OUT + '/630_make.png' }).catch(() => {});
  const sealedPath = path.join(OUT, 'Ingenium backup.sealed'); const bytes = await p.evaluate(() => window.__sealed.arrayBuffer().then(x => Array.from(new Uint8Array(x))));
  fs.writeFileSync(sealedPath, Buffer.from(bytes));
  await p.evaluate(() => IngBackup.show('restore')); await p.waitForTimeout(500);
  const input = await p.$('#bkFile');
  if (input) { await input.setInputFiles(sealedPath); await p.waitForTimeout(1500); }
  const ask = await p.evaluate(() => ({ asked: !!document.querySelector('#bkSealPw'), text: (document.querySelector('#bkReadOut') || {}).textContent || '' }));
  ok(input && ask.asked && /sealed/.test(ask.text), 'chosen to restore, a sealed file asks for its password in place', { input: !!input, ask });
  if (ask.asked) { await p.fill('#bkSealPw', 'wrong-password-123'); await p.click('#bkSealGo'); await p.waitForTimeout(2500); }
  const wrong = await p.evaluate(() => (document.querySelector('#bkReadOut') || {}).textContent || '');
  ok(/does not open/.test(wrong), 'a wrong password there says so and asks again', wrong.slice(0, 120));
  if (ask.asked) { await p.fill('#bkSealPw', PW); await p.click('#bkSealGo'); await p.waitForFunction(() => /What this backup holds/.test((document.querySelector('#bkReadOut') || {}).textContent || ''), null, { timeout: 120000 }).catch(() => {}); }
  const right = await p.evaluate(() => (document.querySelector('#bkReadOut') || {}).textContent || '');
  ok(/What this backup holds/.test(right) && /fingerprint matches/.test(right), 'the right password opens it, and every fingerprint matches', right.slice(0, 160));
  await p.locator('#bkReadOut').screenshot({ path: OUT + '/630_read.png' }).catch(() => {});
  const acc = await p.evaluate(() => (document.querySelector('#bkFile') || {}).accept || '');
  ok(/\.sealed/.test(acc), 'the file picker takes a .sealed file', acc);
  // 6. restored (last: restoring starts the page again): the conversation comes back from the sealed file
  const back = await p.evaluate(([PW, SECRET]) => { state.chats = state.chats.filter(c => c.id !== 'cSeal'); saveState(); const f = new File([window.__sealed], 'Ingenium backup.sealed');
    return IngBackup.restore(f, { sealPassword: PW, mode: 'merge' }).then(() => { try { const st = JSON.parse(localStorage.getItem('ingenium_v4') || '{}'); return (st.chats || state.chats || []).some(c => String(c.title || '').includes(SECRET)) || (state.chats || []).some(c => String(c.title || '').includes(SECRET)); } catch (e) { return 'err ' + e.message; } }, e => 'failed: ' + (e && e.message)); }, [PW, SECRET]);
  ok(back === true, 'restoring the sealed backup brings the conversation back', back);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
