// node rig/t_758_self_page.js <api port of rig/t_758_run_self.py> <the app's folder it runs> <out folder>
// Ingenium 7.58 · Ingenium itself, signed and checked: the page's side (modules/r348.js, in r318's Security room) with the computer app's
// own back-end (build/desktop/app_self_758.py, run headless by rig/t_758_run_self.py). The owner key is a test key made by the page's own
// PermitCore (makeKey), its public half handed to the app in place of the owner's, in the test's process only. Then:
//   1. Settings, Security, Ingenium itself: this copy's version, edition and fingerprint as the app read them; Not signed yet; Sign this
//      release offered; the room counts it off;
//   2. Sign this release asks the owner key's password in a card of its own: a wrong one is refused and nothing is kept;
//   3. the right one: signed in the page (WebCrypto), checked by the app (Python, cryptography) and kept; the room says Signed and counts it
//      on; the kept file is checked again here, apart from both (Node's WebCrypto, PermitCore's fixed order, the page's own fingerprint);
//   4. Save the signature, and Bring a signature in on a copy that has none: signed again;
//   5. the page's file changed on the disk: the app's own address gives the refusal, naming ingenium.html, and not the page; put back as it
//      was, it opens, and the room says it refused once;
//   6. no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const API = +process.argv[2], APP = process.argv[3], OUT = process.argv[4];
if (!API || !APP || !OUT) { console.log('usage: node rig/t_758_self_page.js <api port> <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Tide Clock owner key, for the test only';
// PermitCore's fixed order (build/thoughts/permit_core.html, canon), written again here so the check stands apart from the page
const canon = (v) => { if (v === null || typeof v !== 'object') return JSON.stringify(v); if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  return '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; };
const unb64u = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
// the page as the release has it: the build number a device build stamps into its first <meta name="ingenium-build"> left out (the
// runner stamps one in, as the build workflows do with tools/stamp_build.py)
const BUILDTAG = /<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">/;
const norm = (buf) => { const m = BUILDTAG.exec(buf.subarray(0, 1 << 20).toString('latin1')); if (!m) return { buf, build: '' };
  const at = m.index + m[0].indexOf('content="') + 9; return { buf: Buffer.concat([buf.subarray(0, at), buf.subarray(at + m[1].length)]), build: m[1] }; };
(async () => {
  const info = await (await fetch('http://127.0.0.1:' + API + '/')).json();
  const call = (n, ...a) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(a) }).then((r) => r.json()).then((j) => j.v);
  const test = (what, v) => fetch('http://127.0.0.1:' + API + '/test/' + what, { method: 'POST', body: JSON.stringify(v) }).then((r) => r.json());
  const SIGS = path.join(info.data, 'Ingenium', 'signatures');
  const PAGE = path.join(APP, 'ingenium.html'); const ORIG = fs.readFileSync(PAGE);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  await ctx.addInitScript(({ names, API }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const URL_ = 'http://127.0.0.1:' + info.port + '/ingenium.html';
  const open = async () => { await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(1500); };
  const room = async () => { await p.evaluate(async () => { await IngSelfSign._key(); await IngSelfSign.check(true); go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(1500);
    return p.evaluate(() => { const s = document.querySelector('#secCard .sc-p[data-k="self"]'); const it = IngSecurity.items().filter((x) => x.k === 'self')[0];
      return { text: s ? s.innerText.replace(/\s+/g, ' ') : '', keys: s ? [...s.querySelectorAll('[data-ss]')].map((x) => x.getAttribute('data-ss') + ':' + x.textContent.trim()) : [],
        chip: s ? ((s.querySelector('.sc-well .sc-chip') || {}).textContent || '') : '', item: it && it.s, shown: !!(s && s.offsetParent) }; }); };
  const sigFiles = () => { try { return fs.readdirSync(SIGS).filter((f) => f.endsWith('.ingsig')); } catch (e) { return []; } };
  try {
    await open();
    // the owner key: made by the page's own PermitCore, kept in its own store; its public half given to the app in the test's place
    const sealed = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); return s; }, PW);
    ok(sealed && sealed.kid && sealed.enc && !JSON.stringify(sealed).includes('"d"'), 'the test owner key is made by PermitCore and kept sealed (no private part in the open)');
    const ver = await p.evaluate(() => ING_VERSION);
    await test('keys', [{ kid: sealed.kid, x: sealed.pub.x, y: sealed.pub.y }]); await test('release', ver);
    // 1. not signed yet
    let r = await room();
    ok(r.shown && r.chip === 'Not signed yet' && /Not signed yet\. Sign it once you have installed it from your own release/.test(r.text), 'the room: this copy is not signed yet', r);
    const N = norm(ORIG), fpPage = crypto.createHash('sha256').update(N.buf).digest('hex');
    ok(r.text.includes(fpPage.slice(0, 8) + ' ' + fpPage.slice(8, 16)) && r.text.includes(fpPage.slice(-8)) && r.text.includes(ver + ', the master edition'), "this copy's version, edition and fingerprint, as the app read them", r.text.slice(0, 300));
    ok(N.build ? r.text.includes('Build ' + N.build) : !/\bBuild\b/.test(r.text.split('Its page')[0]), 'its build, as a device build stamped it' + (N.build ? ' (' + N.build + '), left out of the fingerprint' : ' (none stamped)'), r.text.slice(0, 300));
    ok(r.keys.includes('sign:Sign this release') && r.keys.includes('bring:Bring a signature in') && r.keys.includes('check:Check it now'), 'Sign this release, Bring a signature in and Check it now are offered', r.keys);
    ok(r.item === 'off', 'the room counts it off', r.item);
    await p.screenshot({ path: path.join(OUT, '1-not-signed.png') });
    // 2. a wrong password
    await p.click('#secCard [data-ss="sign"]'); await sleep(700);
    const card = await p.evaluate(() => { const w = document.getElementById('r348Ask'); return w ? { h: w.querySelector('h2').textContent, t: w.innerText.replace(/\s+/g, ' '), focus: document.activeElement && document.activeElement.id } : null; });
    ok(card && card.h === 'Sign this release' && card.t.includes(fpPage.slice(0, 8)) && card.focus === 'r348Pw', "Sign this release asks the owner key's password in a card of its own, the fingerprint shown", card);
    await p.fill('#r348Pw', 'not the password'); await p.click('#r348Yes');
    await p.waitForFunction(() => { const s = document.getElementById('r348Say'); return s && /does not open/.test(s.textContent); }, null, { timeout: 60000 }).catch(() => {});
    const wrong = await p.evaluate(() => ({ say: (document.getElementById('r348Say') || {}).textContent, open: !!document.getElementById('r348Ask'), pw: (document.getElementById('r348Pw') || {}).value }));
    ok(wrong.open && /That password does not open the key/.test(wrong.say) && wrong.pw === '', 'a wrong password is refused, the card stays, the field is cleared', wrong);
    ok(sigFiles().length === 0 && (await call('self_check', true)).state === 'unsigned', 'nothing was signed or kept');
    // 3. the right password: signed in the page, checked and kept by the app
    await p.fill('#r348Pw', PW); await p.click('#r348Yes');
    await p.waitForFunction(() => !document.getElementById('r348Ask'), null, { timeout: 90000 }).catch(() => {});
    await sleep(1200);
    r = await room();
    ok(r.chip === 'Signed' && /Signed with your owner key on \d+ \w+ \d{4}, and checked at this start: this is the copy you signed/.test(r.text), 'signed: the room says so, and when', r.text.slice(0, 400));
    ok(r.item === 'on' && r.keys.includes('save:Save the signature') && !r.keys.some((k) => k.startsWith('sign:')), 'the room counts it on, and offers Save the signature', r);
    const app = await call('self_check', true);
    ok(app.state === 'signed' && app.signed && app.signed.kid === sealed.kid, 'the computer app checked the page\'s signature in Python, with the key it was given', app.state);
    const files = sigFiles();
    ok(files.length === 1, 'one signature is kept, in the app\'s own folder', files);
    const kept = JSON.parse(fs.readFileSync(path.join(SIGS, files[0]), 'utf8'));
    const key = await crypto.webcrypto.subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: sealed.pub.x, y: sealed.pub.y, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const good = await crypto.webcrypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, unb64u(kept.sig), new TextEncoder().encode(canon(kept.release)));
    ok(good && kept.kind === 'ingenium-release-signature' && kept.kid === sealed.kid, 'the kept signature checks apart from both, with Node\'s own WebCrypto and the fixed order');
    ok(kept.release.files['ingenium.html'].sha256 === fpPage && kept.release.files['ingenium.html'].size === N.buf.length && kept.release.version === ver && kept.release.edition === 'master',
      'it names this very page: its fingerprint, size, version and edition', kept.release);
    ok(!JSON.stringify(kept).includes(PW) && !('enc' in kept) && !JSON.stringify(kept).includes(sealed.enc.ct), 'nothing of the key or its password is in it');
    await p.screenshot({ path: path.join(OUT, '3-signed.png') });
    // 4. saved, and brought in on a copy that has none
    const dl = p.waitForEvent('download', { timeout: 15000 }).catch(() => null);
    await p.click('#secCard [data-ss="save"]'); await sleep(1500);
    const say = await p.evaluate(() => (document.querySelector('#secCard .r348-say') || {}).textContent || '');
    const got = await dl; let savedText = null;
    if (got) { const f = path.join(OUT, 'saved.ingsig'); await got.saveAs(f); savedText = fs.readFileSync(f, 'utf8'); }
    else { for (const d of [path.join(process.env.HOME || '', 'Downloads'), process.env.HOME || '']) {   // the app's save with no dialog: Downloads, else home
      const c = fs.existsSync(d) ? fs.readdirSync(d).filter((x) => /signature\.ingsig$/.test(x)) : []; if (c.length) { savedText = fs.readFileSync(path.join(d, c[0]), 'utf8'); break; } } }
    ok(/Saved as “Ingenium [0-9.]+ signature\.ingsig”/.test(say) && savedText && JSON.parse(savedText).sig === kept.sig, 'Save the signature saves the very signature kept', say);
    fs.unlinkSync(path.join(SIGS, files[0]));
    r = await room();
    ok(r.chip === 'Not signed yet', 'the signature taken away: not signed yet again', r.chip);
    const tmp = path.join(OUT, 'bring.ingsig'); fs.writeFileSync(tmp, savedText || '{}');
    const chooser = p.waitForEvent('filechooser', { timeout: 15000 });
    await p.click('#secCard [data-ss="bring"]'); const fc = await chooser; await fc.setFiles(tmp); await sleep(2500);
    r = await room();
    ok(r.chip === 'Signed' && sigFiles().length === 1, 'Bring a signature in: checked, kept, signed again', r.chip);
    const bad = JSON.parse(savedText || JSON.stringify(kept)); bad.release.files['ingenium.html'].size += 1; fs.writeFileSync(tmp, JSON.stringify(bad));
    const chooser2 = p.waitForEvent('filechooser', { timeout: 15000 });
    await p.evaluate(() => IngSelfSign.bring()); const fc2 = await chooser2; await fc2.setFiles(tmp); await sleep(2500);
    const say2 = await p.evaluate(() => (document.querySelector('#secCard .r348-say') || {}).textContent || '');
    ok(/does not match/.test(say2) && sigFiles().length === 1, 'a signature changed after signing is refused when brought in, and nothing more is kept', say2);
    // 5. the page's file changed on the disk
    fs.writeFileSync(PAGE, Buffer.concat([ORIG, Buffer.from('\n<!-- changed by someone else -->\n')]));
    await sleep(2300);
    await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 120000 }); await sleep(1500);
    const ref = await p.evaluate(() => ({ h: (document.querySelector('h1') || {}).textContent, t: document.body.innerText.replace(/\s+/g, ' '), ready: window.__ingReady === true, keys: [...document.querySelectorAll('button')].map((x) => x.textContent.trim()) }));
    ok(ref.h === 'Ingenium did not open' && /ingenium\.html/.test(ref.t) && ref.t.includes(fpPage.slice(0, 8)) && !ref.ready, 'the page changed on the disk: the app gives the refusal, naming ingenium.html and what was signed, and not the page', ref.t.slice(0, 400));
    ok(ref.keys.join('|') === 'Show the file|Quit Ingenium', 'the refusal offers Show the file and Quit Ingenium', ref.keys);
    await p.screenshot({ path: path.join(OUT, '5-refused.png') });
    fs.writeFileSync(PAGE, ORIG);
    await sleep(2300);
    await open();
    r = await room();
    ok(r.chip === 'Signed' && /Refused to open/.test(r.text) && /ingenium\.html is not the file you signed/.test(r.text), 'put back as it was, it opens signed, and the room says it refused once', r.text.slice(0, 600));
    // 6.
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 600)); }
  finally { try { fs.writeFileSync(PAGE, ORIG); } catch (e) {} await b.close(); }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
