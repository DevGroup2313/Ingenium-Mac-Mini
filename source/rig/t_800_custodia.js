// Ingenium 8.00, r408: Custodia, every key and its ways back. node rig/t_800_custodia.js <page url> [picture folder]
// An invented person, invented passwords; the Cloud is stood in for (its settings and its seal) by a stand-in made the Cloud's own way.
const pw = require('/opt/node-tools/node_modules/playwright'); const os = require('os'); const path = require('path'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = process.argv[2]; const pics = process.argv[3] || path.join(os.tmpdir(), 't800c');
const NAME = 'Test Person', PW = 'violet harbour 4417', OWNER_PW = 'lantern meadow 9921', CLOUD = 'quiet river stones 55', BACKUP = 'backup-candle-778';
let ok = 0, bad = 0; const check = (c, m, x) => { if (c) { ok++; console.log('PASS ' + m); } else { bad++; console.log('FAIL ' + m + (x !== undefined ? '  ' + JSON.stringify(x).slice(0, 400) : '')); } };
(async () => {
  require('fs').mkdirSync(pics, { recursive: true });
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 240)));
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1200);
  // the sign-in, set up at the welcome door, as rig/t_700_lock.js does
  await p.click('#introProtect'); await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 15000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW); await p.fill('#ildP2', PW); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 30000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map((d) => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return m ? [+m[1], +m[2]] : null; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.click('#ingLockDoor #ildDone'); await sleep(800);
  check(await p.evaluate(() => IngLock.on() && IngLock.active()), 'the sign-in is on (set up at the welcome door)');
  const confirmPw = async () => { await p.waitForSelector('#ingLockDoor #ildAsk #ildPw', { timeout: 15000 }); await p.fill('#ingLockDoor #ildAsk #ildPw', PW); await p.click('#ingLockDoor #ildAsk button[type=submit]'); await sleep(1500); };
  check(await p.evaluate(() => window.__ingParts && window.__ingParts.p408 === 'running' && typeof IngCustodia === 'object'), 'r408 runs');
  check(await p.evaluate(() => { const c = document.querySelector('.nav-btn[data-page="custodia"]'), s = document.querySelector('.nav-btn[data-page="settings"]'); return !!c && !!s && c.nextElementSibling === s && c.textContent.trim() === 'Custodia'; }), 'Custodia stands in the side bar, just before Settings');
  // an owner key on this device (the master edition's), made as the Ownership card makes it
  await p.evaluate((OPW) => PermitCore.makeKey(OPW).then((k) => PermitCore._.put('key', k)), OWNER_PW);
  // a stand-in for the Cloud: its settings and its seal, made the Cloud's own way (PBKDF2-SHA-256, 512 bits, the second half for HMAC)
  await p.evaluate(async (PASS) => { const s = crypto.subtle, salt = crypto.getRandomValues(new Uint8Array(16)); let b = ''; salt.forEach((x) => { b += String.fromCharCode(x); }); const kdf = { salt: btoa(b), iter: 600000 };
    const k = await s.importKey('raw', new TextEncoder().encode(PASS.normalize('NFC')), 'PBKDF2', false, ['deriveBits']); const bits = new Uint8Array(await s.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 600000 }, k, 512));
    const mac = await s.importKey('raw', bits.slice(32), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); const real = window.IngCloud; window.__realCloud = real;
    window.IngCloud = Object.assign({}, real, { settings: () => ({ keyOk: true, kdf }), seal: async (u8) => { const a = new TextEncoder().encode('ingenium-cloud part 1\n'), x = new Uint8Array(a.length + u8.length); x.set(a, 0); x.set(u8, a.length); const h = new Uint8Array(await s.sign('HMAC', mac, x)); return { id: [...h].map((v) => ('0' + v.toString(16)).slice(-2)).join(''), sealed: new Uint8Array(0) }; }, forget: () => Promise.resolve() }); }, CLOUD);
  await p.evaluate(() => IngCustodia.open(null)); await sleep(1500);
  const board = await p.evaluate(() => ({ active: document.getElementById('page-custodia').classList.contains('active'), tags: [...document.querySelectorAll('#cuBoard .cu-tag')].map((t) => ({ k: t.getAttribute('data-key'), cls: t.className, st: t.querySelector('.cu-st').textContent })), lamps: document.querySelectorAll('#cuHead .cu-lamp').length }));
  const tag = (k) => board.tags.find((t) => t.k === k) || {};
  check(board.active && board.tags.length >= 6 && board.lamps === board.tags.length, 'Custodia opens: a tag for each key, and a lamp for each around the dial', board);
  check(/ways? back/.test(tag('signin').st) && !/warn/.test(tag('signin').cls), 'the sign-in has its ways back (its ten words)', tag('signin'));
  check(/warn/.test(tag('cloud').cls) && /No way back yet/.test(tag('cloud').st), 'the Cloud passphrase has no way back yet: amber', tag('cloud'));
  check(/warn/.test(tag('owner').cls), 'the owner key has no way back yet: amber', tag('owner'));
  check(!/warn/.test(tag('backup').cls) && !!tag('signing').k === !!(await p.evaluate(() => !!window.IngApk)) && !!tag('pair').k && !!tag('github').k, 'the backup password is kept by default; signing keys, the pairing code and GitHub are listed', board.tags.map((t) => t.k));
  await p.screenshot({ path: path.join(pics, '1_board.png') });
  // the Cloud: a wrong passphrase is refused; the right one is checked and kept sealed
  await p.evaluate(() => IngCustodia.open('cloud')); await sleep(800);
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /Keep a sealed copy/.test(x.textContent)).click()); await sleep(300);
  await p.fill('#cuSecret', 'not the passphrase'); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(2500);
  check(await p.evaluate(() => /does not open this Cloud/.test((document.querySelector('#cuOpen .cu-err') || {}).textContent || '') && !IngCustodia.store().v.cloud), 'a passphrase that does not open the Cloud is refused, and nothing is kept');
  await p.fill('#cuSecret', CLOUD); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(3500);
  const kept = await p.evaluate(() => { const v = IngCustodia.store().v.cloud; return { has: !!v, sealed: !!v && /^ING1/.test(v.c), plain: JSON.stringify(state).indexOf('quiet river stones') >= 0 }; });
  check(kept.has && kept.sealed && !kept.plain, 'the right one is checked and kept sealed with the sign-in (never in the clear)', kept);
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /^Show it$/.test(x.textContent.trim())).click()); await confirmPw();
  check(await p.evaluate((C) => (document.querySelector('#cuOpen .cu-reveal code') || {}).textContent === C, CLOUD), 'Show it asks the sign-in\'s password, then shows the passphrase');
  await p.screenshot({ path: path.join(pics, '2_cloud_shown.png') });
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /^Check it$/.test(x.textContent.trim())).click()); await confirmPw(); await sleep(2500);
  check(await p.evaluate(() => /still opens it/.test((document.querySelector('#cuOpen .cu-ok') || {}).textContent || '')), 'Check it: the sealed copy still opens the Cloud');
  // the owner key's own ten words
  await p.evaluate(() => IngCustodia.open('owner')); await sleep(800);
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /Make its ten words/.test(x.textContent)).click()); await sleep(300);
  await p.fill('#cuOwPw', 'wrong password'); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(2500);
  check(await p.evaluate(() => /does not open the key/.test((document.querySelector('#cuOpen .cu-err') || {}).textContent || '')), 'the owner key\'s ten words are made only after its password is checked');
  await p.fill('#cuOwPw', OWNER_PW); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(2500);
  const ow = await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-wgrid span')].map((s) => s.textContent.replace(/^\d+/, '').trim()));
  check(ow.length === 10 && ow.every((w) => /^[a-z]{3,8}$/.test(w)) && ow.join(' ') !== words.join(' '), 'ten words of its own, apart from the sign-in\'s', ow);
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /written them down/.test(x.textContent)).click()); await sleep(300);
  const q = await p.evaluate(() => [...document.querySelectorAll('#cuOpen form.cu-form label')].map((l) => +l.textContent.replace(/\D/g, '')));
  await p.fill('#cuW0', ow[q[0] - 1]); await p.fill('#cuW1', 'wrongword'); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(400);
  check(await p.evaluate(() => /not the words/.test((document.querySelector('#cuOpen .cu-err') || {}).textContent || '')), 'a wrong word is refused when two are asked back');
  await p.fill('#cuW1', ow[q[1] - 1]); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(4000);
  const wr = await p.evaluate(() => PermitCore._.get('words'));
  check(!!wr && wr.kind === 'ingenium-owner-words' && wr.iter === 600000 && JSON.stringify(wr).indexOf('lantern') < 0, 'the words are kept as a sealed record in the owner key\'s own store (never the password in the clear)', wr && { kind: wr.kind, iter: wr.iter });
  await p.evaluate(() => [...document.querySelectorAll('#cuOpen .cu-key')].find((x) => /Use the words/.test(x.textContent)).click()); await sleep(300);
  await p.fill('#cuOwWords', ow.slice().reverse().join(' ')); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(2500);
  check(await p.evaluate(() => /do not open it/.test((document.querySelector('#cuOpen .cu-err') || {}).textContent || '')), 'words in the wrong order do not open it');
  await p.fill('#cuOwWords', ow.join('  ').toUpperCase()); await p.evaluate(() => document.querySelector('#cuOpen form.cu-form').requestSubmit()); await sleep(2500);
  check(await p.evaluate((O) => (document.querySelector('#cuOpen .cu-reveal code') || {}).textContent === O, OWNER_PW), 'the right words (capitals and spaces do not matter) bring back the owner key\'s password');
  await p.screenshot({ path: path.join(pics, '3_owner_words.png') });
  // a backup made with a password: a sealed copy kept as it is made
  const made = await p.evaluate((B) => Promise.resolve(IngBackup.make({ password: B, keys: true, onProgress() {} })).then(() => 'made', (e) => 'failed: ' + (e && e.message)), BACKUP); await sleep(2500);
  const bk = await p.evaluate(() => IngCustodia.store().v.backup);
  check(made === 'made' && bk.length === 1 && /^ING1/.test(bk[0].c), 'a backup made with a password keeps a sealed copy of that password', { made, n: bk.length });
  // the recovery sheet: her ten words after the password, no password on it
  let saved = ''; await p.exposeFunction('__keepSheet', (t) => { saved = t; });
  await p.evaluate(() => { window.saveFileNative = (n, m, t) => { window.__keepSheet(t); return Promise.resolve(true); }; });
  await p.evaluate(() => IngCustodia.sheet()); await confirmPw(); await sleep(800);
  const sh = await p.evaluate(() => [...document.querySelectorAll('#cuSheet .words span')].map((s) => s.textContent.replace(/^\d+/, '').trim()));
  check(JSON.stringify(sh) === JSON.stringify(words), 'the recovery sheet shows the sign-in\'s ten words, after its password', sh);
  await p.screenshot({ path: path.join(pics, '4_sheet.png') });
  await p.evaluate(() => [...document.querySelectorAll('#cuSheet .cu-key')].find((x) => /Save it/.test(x.textContent)).click()); await sleep(800);
  check(saved.length > 500 && words.every((w) => saved.indexOf(w) >= 0) && [PW, OWNER_PW, CLOUD, BACKUP].every((x) => saved.indexOf(x) < 0), 'the saved sheet carries the ten words and where each way back is, and no password', saved.length);
  // the board now
  await p.evaluate(() => IngCustodia.open(null)); await sleep(1200);
  const after = await p.evaluate(() => [...document.querySelectorAll('#cuBoard .cu-tag')].filter((t) => /warn/.test(t.className)).map((t) => t.getAttribute('data-key')));
  check(after.length === 0, 'every key now has a way back: no amber tag is left', after);
  // night, minimal motion, a narrow window
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(400);
  check(await p.evaluate(() => getComputedStyle(document.getElementById('cuHead')).backgroundImage.indexOf('36, 26, 55') >= 0 || getComputedStyle(document.getElementById('page-custodia')).getPropertyValue('--c-p0').trim() === '#1c1530'), 'by night it is deep indigo');
  await p.screenshot({ path: path.join(pics, '5_night.png') });
  await p.evaluate(() => { document.body.removeAttribute('data-theme'); document.body.setAttribute('data-motion', 'minimal'); }); await sleep(300);
  check(await p.evaluate(() => getComputedStyle(document.querySelector('#cuHead .cu-turn')).animationName === 'none'), 'Minimal motion keeps the dial still');
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  await p.setViewportSize({ width: 420, height: 900 }); await sleep(600);
  check(await p.evaluate(() => { const r = document.getElementById('cuRoot'); return r.scrollWidth <= r.clientWidth + 2; }), 'in a narrow window nothing runs past the edge');
  await p.evaluate(() => { if (window.__realCloud) window.IngCloud = window.__realCloud; });
  check(errs.length === 0, 'no page error' + (errs.length ? ': ' + errs.join(' | ') : ''));
  console.log(ok + ' passed, ' + bad + ' failed'); await b.close(); process.exit(bad ? 1 : 0);
})();
