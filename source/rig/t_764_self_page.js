// node rig/t_764_self_page.js <api port of rig/t_764_run_self.py> <the app's folder it runs> <out folder>
// Ingenium 7.64 · Ingenium itself, signed and checked, part two: the page's side (modules/r355.js, with r348 in r318's Security room) with
// the computer app's own back-end (build/desktop/app_self_758.py and app_self2_764.py, run headless by rig/t_764_run_self.py). The owner
// key is a test key made by the page's own PermitCore (makeKey), its public half handed to the app in place of the owner's, in the test's
// process only. Then:
//   1. Sign this release's card says it signs the copy for phones and tablets too; signed: the computer app keeps both signatures, and says
//      mobile_signed; each checks apart from both (Node's WebCrypto, PermitCore's fixed order); the phones' names the very files the app
//      makes for them (self_mobile_fields) and its app is ingenium-mobile
//   2. Save the signature saves one file with both; taken away, Bring a signature in takes that file and keeps both again
//   3. with the computer apps' signature alone kept, the room offers Sign it for your phones and tablets, and it signs that copy
//   4. Sign a copy you give: the gift edition's page (the test's own copy, its edition gift) read by the app; the card names the gift
//      edition and its fingerprint; Sign and save saves one file with its two signatures, each checking apart from both and naming that
//      page and its copy for phones and tablets
//   5. no page error
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const API = +process.argv[2], APP = process.argv[3], OUT = process.argv[4];
if (!API || !APP || !OUT) { console.log('usage: node rig/t_764_self_page.js <api port> <app folder> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PW = 'Harbour Lamp owner key, for the test only';
const canon = (v) => { if (v === null || typeof v !== 'object') return JSON.stringify(v); if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  return '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; };
const unb64u = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
(async () => {
  const info = await (await fetch('http://127.0.0.1:' + API + '/')).json();
  const call = (n, ...a) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(a) }).then((r) => r.json()).then((j) => j.v);
  const test = (what, v) => fetch('http://127.0.0.1:' + API + '/test/' + what, { method: 'POST', body: JSON.stringify(v) }).then((r) => r.json());
  const SIGS = path.join(info.data, 'Ingenium', 'signatures');
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  await ctx.addInitScript(({ names, API }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch('http://127.0.0.1:' + API + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, API });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const URL_ = 'http://127.0.0.1:' + info.port + '/ingenium.html';
  const room = async () => { await p.evaluate(async () => { await IngSelfSign._key(); await IngSelfSign.check(true); go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('self'); }); await sleep(1500);
    return p.evaluate(() => { const s = document.querySelector('#secCard .sc-p[data-k="self"]');
      return { text: s ? s.innerText.replace(/\s+/g, ' ') : '', keys: s ? [...s.querySelectorAll('[data-ss]')].map((x) => x.getAttribute('data-ss') + ':' + x.textContent.trim()) : [],
        chip: s ? ((s.querySelector('.sc-well .sc-chip') || {}).textContent || '') : '' }; }); };
  const sigFiles = () => { try { return fs.readdirSync(SIGS).filter((f) => f.endsWith('.ingsig')).sort(); } catch (e) { return []; } };
  /* a key of the room, pressed once the room is drawn and the key on screen (the room draws itself again when the app's check returns) */
  const press = async (k) => { await p.waitForFunction((k) => { try { IngSecurity.view('self'); } catch (e) {} const x = document.querySelector('#secCard [data-ss="' + k + '"]');
      if (!x) return false; x.scrollIntoView({ block: 'center' }); return !!x.offsetParent; }, k, { timeout: 60000, polling: 500 });
    await p.evaluate((k) => document.querySelector('#secCard [data-ss="' + k + '"]').click(), k); await sleep(700); };
  const card = (pass_) => p.evaluate(() => { const w = document.getElementById('r348Ask'); return w ? { h: w.querySelector('h2').textContent, t: w.innerText.replace(/\s+/g, ' ') } : null; });
  /* the computer app reads the page whole (89 MB) to check what is brought in: wait for its answer, as the room does */
  const until = async (want, ms = 90000) => { const t0 = Date.now(); let s = null; while (Date.now() - t0 < ms) { s = await call('self_check', true); if (want(s)) return s; await sleep(1000); } return s; };
  const submit = async (word) => { await p.fill('#r348Pw', word); await p.click('#r348Yes'); await p.waitForFunction(() => !document.getElementById('r348Ask'), null, { timeout: 90000 }).catch(() => {}); await sleep(1200); };
  let key = null;
  const verifies = async (s) => crypto.webcrypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, unb64u(s.sig), new TextEncoder().encode(canon(s.release)));
  try {
    await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(1500);
    const sealed = await p.evaluate(async (PW) => { const s = await PermitCore.makeKey(PW); await PermitCore._.put('key', s); return s; }, PW);
    key = await crypto.webcrypto.subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: sealed.pub.x, y: sealed.pub.y, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const ver = await p.evaluate(() => ING_VERSION);
    await test('keys', [{ kid: sealed.kid, x: sealed.pub.x, y: sealed.pub.y }]); await test('release', ver);
    ok(ver === '7.64' && (await p.evaluate(() => !!(window.IngSelf2 && window.__ingParts && window.__ingParts.p355 === 'running'))), 'the page is 7.64 and r355 runs in it', ver);
    // 1. Sign this release signs both copies
    let r = await room();
    ok(r.chip === 'Not signed yet' && r.keys.includes('sign:Sign this release') && r.keys.includes('give:Sign a copy you give'), 'not signed yet; Sign this release and Sign a copy you give are offered', r.keys);
    await press('sign'); await sleep(700);
    let c = await card();
    ok(c && /It signs the copy your computers run and the copy your iPhone, iPad and Fire tablet carry/.test(c.t), "Sign this release's card says it signs the copy for phones and tablets too", c && c.t.slice(0, 400));
    await submit(PW);
    const st = await call('self_check', true);
    const files = sigFiles();
    ok(st.state === 'signed' && st.mobile_signed === true && files.length === 2 && files.some((f) => f.startsWith('ingenium-mobile-')), 'signed: the computer app keeps both signatures, and says mobile_signed', { state: st.state, mobile: st.mobile_signed, files });
    const mf = await call('self_mobile_fields');
    const mob = JSON.parse(fs.readFileSync(path.join(SIGS, files.find((f) => f.startsWith('ingenium-mobile-'))), 'utf8'));
    const desk = JSON.parse(fs.readFileSync(path.join(SIGS, files.find((f) => !f.startsWith('ingenium-mobile-'))), 'utf8'));
    ok(await verifies(mob) && await verifies(desk), 'each signature checks apart from both, with Node\'s own WebCrypto and the fixed order');
    ok(mob.release.app === 'ingenium-mobile' && canon(mob.release.files) === canon(mf.files) && mob.release.version === ver && desk.release.app === 'ingenium',
      'the phones\' and tablets\' signature names the very files the app makes for them, its app ingenium-mobile', { app: mob.release.app, files: Object.keys(mob.release.files) });
    r = await room();
    ok(r.chip === 'Signed' && !r.keys.some((k) => k.startsWith('mobile:')), 'the room says Signed, and offers no Sign it for your phones and tablets', r.keys);
    // 2. one file for every device
    const dl = p.waitForEvent('download', { timeout: 15000 }).catch(() => null);
    await press('save'); await sleep(1500);
    const got = await dl; let savedText = null;
    if (got) { const f = path.join(OUT, 'saved.ingsig'); await got.saveAs(f); savedText = fs.readFileSync(f, 'utf8'); }
    else { for (const d of [path.join(process.env.HOME || '', 'Downloads'), process.env.HOME || '']) {
      const cand = fs.existsSync(d) ? fs.readdirSync(d).filter((x) => /signature\.ingsig$/.test(x)) : []; if (cand.length) { savedText = fs.readFileSync(path.join(d, cand[0]), 'utf8'); break; } } }
    const saved = savedText ? JSON.parse(savedText) : {};
    ok(saved.kind === 'ingenium-release-signatures' && (saved.signatures || []).map((x) => x.release.app).join(',') === 'ingenium,ingenium-mobile', 'Save the signature saves one file with both, the computer apps\' first', saved.kind);
    for (const f of sigFiles()) fs.unlinkSync(path.join(SIGS, f));
    r = await room();
    ok(r.chip === 'Not signed yet', 'both taken away: not signed yet again', r.chip);
    const tmp = path.join(OUT, 'bring.ingsig'); fs.writeFileSync(tmp, savedText || '{}');
    const chooser = p.waitForEvent('filechooser', { timeout: 15000 });
    await press('bring'); const fc = await chooser; await fc.setFiles(tmp);
    const st2 = await until((s) => s.state === 'signed' && s.mobile_signed === true && sigFiles().length === 2);
    ok(st2.state === 'signed' && st2.mobile_signed === true && sigFiles().length === 2, 'Bring a signature in takes that file: both kept again', { state: st2.state, files: sigFiles() });
    // 3. Sign it for your phones and tablets
    fs.unlinkSync(path.join(SIGS, sigFiles().find((f) => f.startsWith('ingenium-mobile-'))));
    r = await room();
    ok(r.chip === 'Signed' && r.keys.includes('mobile:Sign it for your phones and tablets'), 'with the computer apps\' signature alone, the room offers Sign it for your phones and tablets', r.keys);
    await press('mobile'); await sleep(700);
    c = await card();
    ok(c && c.h === 'Sign it for your phones and tablets', 'its card asks the owner key\'s password', c && c.h);
    await submit(PW);
    ok((await call('self_check', true)).mobile_signed === true && sigFiles().length === 2, 'and it signs the copy for phones and tablets', sigFiles());
    // 4. Sign a copy you give
    const GIFT = path.join(OUT, 'ingenium_gift.html');
    fs.writeFileSync(GIFT, fs.readFileSync(path.join(APP, 'ingenium.html'), 'utf8').replace('var ING_EDITION="master"', 'var ING_EDITION="gift"'));
    const gv = (await test('give', GIFT)).v;
    ok(gv && gv.ok && gv.edition === 'gift' && gv.files && gv.files['ingenium.html'] && gv.mobile_files && gv.mobile_files['ingenium.html'], 'the app reads the gift edition\'s page: its own fingerprint and its copy for phones and tablets', gv && { ok: gv.ok, ed: gv.edition });
    await p.evaluate((gv) => { window.pywebview.api.self_give_pick = () => Promise.resolve(gv); window.__given = null;
      window.saveFileNative = (name, mime, text) => { window.__given = { name, text }; return Promise.resolve(true); }; }, gv);
    r = await room();
    await press('give'); await sleep(900);
    c = await card();
    const gfp = gv.files['ingenium.html'].sha256;
    ok(c && c.h === 'Sign a copy you give' && /the gift edition/.test(c.t) && c.t.includes(gfp.slice(0, 8)) && c.t.includes(gfp.slice(-8)), 'its card names the gift edition and its fingerprint', c && c.t.slice(0, 300));
    await submit(PW);
    const given = await p.evaluate(() => window.__given);
    const gl = given ? JSON.parse(given.text) : {};
    const gs = gl.signatures || [];
    ok(given && given.name === 'ingenium-gift-' + ver + '-' + gfp.slice(0, 12) + '.ingsig' && gl.kind === 'ingenium-release-signatures' && gs.length === 2, 'Sign and save saves one file with its two signatures, named for that copy', given && given.name);
    ok(gs.length === 2 && await verifies(gs[0]) && await verifies(gs[1]) && gs[0].release.edition === 'gift' && canon(gs[0].release.files) === canon(gv.files)
      && gs[1].release.app === 'ingenium-mobile' && canon(gs[1].release.files) === canon(gv.mobile_files), 'each checks apart from both, and names that page and its copy for phones and tablets');
    ok(sigFiles().length === 2, 'and nothing of the copy given is kept on this computer', sigFiles());
    // 5.
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 600)); }
  finally { await b.close(); }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
