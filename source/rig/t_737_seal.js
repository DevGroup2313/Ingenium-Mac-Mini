// Ingenium 7.37: sealed between her devices (build/desktop/app_seal_737.py, modules/r319.js; the Security room's line, r318), as her
// approved preview (https://claude.ai/artifact/KRuQqSihghbSgFcHswJCEU): "Approve, build it".
//   node rig/t_737_seal.js <folder holding ingenium_app.py (patched) and ingenium.html> <out folder>
// A real computer app runs here (rig/run_app.py) as the Mac, its page bridged as window.pywebview.api; plain browsers are her devices.
// A device paired before 7.37 is seeded in share.json before the app starts. Checks:
//   - the Mac's hello says it seals; on the Mac, an older device is marked as such;
//   - a device pairs: both screens show the same four words; on the Mac she presses They match; the device says Paired, sealed end to
//     end; from then on its requests to the Mac go to /ingenium/sealed, carry no code, and show neither the path nor the body in clear;
//   - a request through IngLend works sealed; an app of 600 KB comes back whole over several sealed frames;
//   - a sealed request sent twice is refused; one with a changed byte is refused; the sealed device with the code alone is refused; a new
//     device with the code alone is refused; the device paired before 7.37 still works with the code;
//   - a second device: the Mac presses They do not match: not paired, and the device says so;
//   - a device that cannot seal asks, and the Mac allows it with the code alone (an older device from then on);
//   - the Mac's list marks each device (sealed, Pair once more); the Security room on the Mac and on a device says the truth;
//   - every sheet's keys and words lift under the pointer; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const RUN_APP = path.join(__dirname, 'run_app.py');
function start(name, apiPort, seed) { const home = path.join(OUT, name, 'home'), dir = path.join(OUT, name, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
  for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
  if (seed) { const d = path.join(home, '.local', 'share', 'ingenium'); fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, 'share.json'), JSON.stringify(seed)); }
  const pr = cp.spawn('python3', ['-I', RUN_APP, dir, String(apiPort)], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => err += d);
  return { pr, port: apiPort, home, err: () => err, ready: async () => { for (let i = 0; i < 240; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) return JSON.parse(m[0]); await new Promise(r => setTimeout(r, 250)); } throw new Error(name + ' did not start: ' + err.slice(-800)); } };
}
const api = (port, n, args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
const enter = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
  await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await pg.waitForTimeout(800); };
const LEGACY = 'legacy-hp-laptop-01';
(async () => {
  const A = start('mac', 18997, { devices: { [LEGACY]: { name: 'HP laptop', kind: 'laptop', last: Math.floor(Date.now() / 1000) - 3600 } } });
  let ia; try { ia = await A.ready(); } catch (e) { ok(false, 'the computer app starts', String(e)); process.exit(2); }
  ok(['seal_pending', 'seal_answer', 'seal_status'].every(n => ia.names.includes(n)), 'the computer app runs here, with seal_pending, seal_answer and seal_status');
  const b = await pw.chromium.launch(); const errs = [];
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ca.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: A.port });
  const p = await ca.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', e => errs.push('mac: ' + e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(p);
  const s0 = await api(A.port, 'share_runs_set', [true]); const code = s0.code, SP = s0.port, base = 'http://127.0.0.1:' + SP;
  const hello = await (await fetch(base + '/ingenium/hello')).json();
  ok(hello.seal === 1, "the Mac's hello says it seals", { seal: hello.seal });
  const st0 = await api(A.port, 'share_status', []); const leg0 = (st0.devices || []).find(d => d.id === LEGACY);
  ok(leg0 && leg0.legacy === true && leg0.sealed === false && st0.seal && st0.seal.legacy === 1, 'a device paired before 7.37 is marked as such on the Mac', { leg0, seal: st0.seal });

  /* the iPhone pairs */
  const ci = await b.newContext({ viewport: { width: 1180, height: 820 } }); const q = await ci.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('iphone: ' + e.message.slice(0, 200)));
  const sent = []; ci.on('request', r => { if (r.url().startsWith(base)) sent.push({ url: r.url(), method: r.method(), auth: r.headers()['authorization'] || '', body: r.postData() || '' }); });
  await q.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(q);
  await q.evaluate(([port, code]) => { window.__pair = IngLend.pair('127.0.0.1:' + port, code).then(c => ({ id: c.id, name: c.name }), e => ({ err: String(e && e.message || e) })); }, [SP, code]);
  await q.waitForSelector('#sealPair .sl-word', { timeout: 30000 }); await p.waitForSelector('#sealAsk .sl-word', { timeout: 30000 });
  const wq = await q.evaluate(() => [...document.querySelectorAll('#sealPair .sl-word')].map(x => x.lastChild.textContent));
  const wp = await p.evaluate(() => ({ h: document.querySelector('#sealAsk h2').textContent, w: [...document.querySelectorAll('#sealAsk .sl-word')].map(x => x.lastChild.textContent), keys: [...document.querySelectorAll('#sealAsk .sl-key')].map(x => x.textContent) }));
  const pend = await api(A.port, 'seal_pending', []);
  ok(wq.length === 4 && JSON.stringify(wq) === JSON.stringify(wp.w) && JSON.stringify(pend.asks[0].words) === JSON.stringify(wq), 'both screens show the same four words (and seal_pending lists the ask)', { iphone: wq, mac: wp.w });
  ok(/asks to pair$/.test(wp.h) && wp.keys.join('|') === 'They match|They do not match', 'on the Mac: "… asks to pair", They match, They do not match', wp);
  await p.screenshot({ path: OUT + '/mac_ask.png' }); await q.screenshot({ path: OUT + '/iphone_words.png' });
  // under the pointer, the words and the keys lift
  const lift = async (pg, sel) => { const h = await pg.$(sel); await pg.mouse.move(2, 2); await pg.waitForTimeout(350); const a = await h.evaluate(e => getComputedStyle(e).transform); await h.hover(); await pg.waitForTimeout(450); return [a, await h.evaluate(e => getComputedStyle(e).transform)]; };
  const L = { word: await lift(p, '#sealAsk .sl-word'), key: await lift(p, '#sealAsk .sl-key:not(.pri)'), stop: await lift(q, '#sealPair .sl-key') };
  ok(Object.values(L).every(([a, z]) => a !== z), 'the words and keys lift under the pointer', L);
  await p.click('#sealAsk .sl-key.pri');
  const pr1 = await q.evaluate(() => window.__pair);
  ok(pr1.id && !pr1.err, 'the iPhone is paired', pr1);
  const done = await q.evaluate(() => { const s = document.querySelector('#sealPair'); return s ? s.innerText.replace(/\s+/g, ' ') : null; });
  ok(/Paired with/.test(done || '') && /Sealed end to end/.test(done || ''), 'the iPhone says Paired with …, Sealed end to end', done);
  const recs = await q.evaluate(() => IngSealing.computers());
  ok(recs.length === 1 && recs[0].id === pr1.id, 'the iPhone holds a sealed key for the Mac (never shown to the page: a key that cannot be exported)', recs);
  const keyKind = await q.evaluate(() => new Promise(res => { const r = indexedDB.open('ingenium_seal'); r.onsuccess = () => { const t = r.result.transaction('k', 'readonly').objectStore('k').get('c:' + IngSealing.computers()[0].id); t.onsuccess = () => res({ type: t.result.key.type, extractable: t.result.key.extractable, alg: t.result.key.algorithm.name }); }; }));
  ok(keyKind.type === 'secret' && keyKind.extractable === false && keyKind.alg === 'AES-GCM', 'the key is AES-GCM and cannot be exported from the browser', keyKind);

  /* sealed from now on */
  const n0 = sent.length;
  const ob = await q.evaluate(async (id) => { try { return await IngLend.request(id, 'GET', '/ingenium/apps/outbox'); } catch (e) { return { err: String(e && e.message || e) }; } }, pr1.id);
  const after = sent.slice(n0);
  ok(ob && ob.ok === true && Array.isArray(ob.apps), 'a request through IngLend works, sealed (the outbox answers)', ob);
  ok(after.length >= 1 && after.every(r => r.url === base + '/ingenium/sealed' && r.method === 'POST' && !r.auth && !/apps\/outbox/.test(r.body) && !r.body.includes(code)),
    'it went to /ingenium/sealed, with no code, and neither its path nor the code appear in what was sent', after.map(r => [r.url.replace(base, ''), r.auth ? 'code!' : '', r.body.slice(0, 60)]));
  // a big answer, in several frames: an app of 600 KB sent from the Mac, taken by the iPhone
  const big = '<!doctype html><title>Tide Clock</title><p>' + 'tide '.repeat(120000) + '</p>';
  const sendR = await api(A.port, 'apps_send', ['tide-clock', 'Tide Clock', '1.0', Buffer.from(big).toString('base64'), [await q.evaluate(() => IngLend.state().me.id)]]);
  const got = await q.evaluate(async ([id, aid]) => { try { const j = await IngLend.request(id, 'GET', '/ingenium/apps/get?id=' + encodeURIComponent(aid)); return { len: atob(j.b64).length, head: atob(j.b64).slice(0, 30) }; } catch (e) { return { err: String(e && e.message || e) }; } }, [pr1.id, sendR.id]);
  ok(got.len === Buffer.byteLength(big) && got.head === big.slice(0, 30), 'an app of 600 KB comes back whole over several sealed frames', { got, want: Buffer.byteLength(big) });
  const lastSealed = sent.filter(r => r.url === base + '/ingenium/sealed').slice(-1)[0];

  /* refused */
  const replay = await fetch(base + '/ingenium/sealed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: lastSealed.body });
  ok(replay.status === 409, 'the same sealed request sent again is refused', replay.status);
  const env = JSON.parse(lastSealed.body); const c = Buffer.from(env.c, 'base64'); c[5] ^= 1; env.c = c.toString('base64'); env.i = env.i;
  const tamper = await fetch(base + '/ingenium/sealed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(env) });
  ok(tamper.status === 401, 'a sealed request with one changed byte is refused', tamper.status);
  const devH = await q.evaluate(() => { const d = IngLend.state().me; return 'id=' + encodeURIComponent(d.id) + ';kind=' + encodeURIComponent(d.kind || '') + ';name=' + encodeURIComponent(d.name || ''); });
  const plainSealedDev = await fetch(base + '/ingenium/apps/outbox', { headers: { Authorization: 'Bearer ' + code, 'X-Ingenium-Device': devH } });
  const psj = await plainSealedDev.json();
  ok(plainSealedDev.status === 401 && psj.pair_sealed, 'the sealed iPhone with the code alone is refused (someone who learnt the code cannot pass for it)', { status: plainSealedDev.status, msg: psj.error && psj.error.message });
  const newDev = await fetch(base + '/ingenium/apps/outbox', { headers: { Authorization: 'Bearer ' + code, 'X-Ingenium-Device': 'id=stranger-device-77;kind=phone;name=Stranger' } });
  ok(newDev.status === 401, 'a new device with the code alone is refused', newDev.status);
  const oldDev = await fetch(base + '/ingenium/apps/outbox', { headers: { Authorization: 'Bearer ' + code, 'X-Ingenium-Device': 'id=' + LEGACY + ';kind=laptop;name=HP%20laptop' } });
  ok(oldDev.status === 200, 'the device paired before 7.37 still works with the code', oldDev.status);

  /* a second device: the words are refused */
  const cj = await b.newContext({ viewport: { width: 1180, height: 820 } }); const r2 = await cj.newPage(); r2.setDefaultTimeout(180000); r2.on('pageerror', e => errs.push('ipad: ' + e.message.slice(0, 200)));
  await r2.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(r2);
  await r2.evaluate(([port, code]) => { window.__pair = IngLend.pair('127.0.0.1:' + port, code).then(c => ({ id: c.id }), e => ({ err: String(e && e.message || e) })); }, [SP, code]);
  await p.waitForSelector('#sealAsk .sl-word', { timeout: 30000 });
  await p.evaluate(() => [...document.querySelectorAll('#sealAsk .sl-key')].find(x => x.textContent === 'They do not match').click());
  const pr2 = await r2.evaluate(() => window.__pair);
  const say2 = await r2.evaluate(() => { const s = document.querySelector('#sealPair'); return s ? s.innerText.replace(/\s+/g, ' ') : null; });
  const st2 = await api(A.port, 'seal_status', []);
  ok(pr2.err && /^Not paired: the words were refused/.test(pr2.err) && /Not paired/.test(say2 || '') && st2.sealed === 1, 'a second device: They do not match: not paired, and it says so', { pr2, say2: (say2 || '').slice(0, 160), sealed: st2.sealed });

  /* a device that cannot seal */
  const ck = await b.newContext({ viewport: { width: 1180, height: 820 } });
  await ck.addInitScript(() => { try { Object.defineProperty(window, 'isSecureContext', { value: false }); } catch (e) {} });
  const r3 = await ck.newPage(); r3.setDefaultTimeout(180000); r3.on('pageerror', e => errs.push('fire: ' + e.message.slice(0, 200)));
  await r3.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(r3);
  await r3.evaluate(([port, code]) => { window.__pair = IngLend.pair('127.0.0.1:' + port, code).then(c => ({ id: c.id }), e => ({ err: String(e && e.message || e) })); }, [SP, code]);
  await p.waitForSelector('#sealAsk h2', { timeout: 30000 });
  const ask3 = await p.evaluate(() => ({ t: document.querySelector('#sealAsk').innerText.replace(/\s+/g, ' '), words: document.querySelectorAll('#sealAsk .sl-word').length, keys: [...document.querySelectorAll('#sealAsk .sl-key')].map(x => x.textContent) }));
  ok(ask3.words === 0 && /cannot seal/.test(ask3.t) && ask3.keys.join('|') === 'Allow it with the code alone|Refuse', 'a device that cannot seal: the Mac asks whether to allow it with the code alone', ask3);
  await p.click('#sealAsk .sl-key.pri');
  const pr3 = await r3.evaluate(() => window.__pair);
  const st3 = await api(A.port, 'share_status', []);
  const d3 = (st3.devices || []).find(d => d.id === (pr3 && pr3.id ? null : 'x')) ;
  ok(pr3.id && st3.seal.legacy === 2 && st3.seal.sealed === 1, 'allowed, it is paired, unsealed, as an older device', { pr3, seal: st3.seal });

  /* the marks on the Mac, and the Security room (7.39: the list of devices shows whenever sharing runs; here only Fabrica's runs are on) */
  await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 800)); const c = document.getElementById('linkCard'); try { IngRooms.reveal(c, {}); } catch (e) {} try { IngLend.refresh(); } catch (e) {} try { IngLend.paint(); } catch (e) {} });
  await p.waitForTimeout(4500);
  const rows = await p.evaluate(() => [...document.querySelectorAll('#linkCard .ld-user')].map(r => [r.querySelector('b').textContent, (r.querySelector('.sl-chip') || {}).textContent || '', (r.querySelector('.sl-key.amb') || {}).textContent || '']));
  const label = await p.evaluate(() => [...document.querySelectorAll('#linkCard .ld-lbl')].map(x => x.textContent));
  ok(rows.some(r => r[1] === 'Sealed end to end') && rows.some(r => r[0] === 'HP laptop' && r[2] === 'Pair once more') && label.includes('Devices that reach this computer') && !label.includes('The models it lends'), "the Mac's list, with sharing on for Fabrica's runs only (7.39): Devices that reach this computer; the iPhone Sealed end to end, the HP laptop Pair once more", { rows, label });
  await p.screenshot({ path: OUT + '/mac_devices.png' });
  const room = async (pg) => { await pg.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('wifi'); }); await pg.waitForTimeout(900);
    return pg.evaluate(() => { const it = [...document.querySelectorAll('#secCard .sc-it')].find(x => /Sealed between your devices/.test(x.textContent)); const sec = [...document.querySelectorAll('#secCard .sc-p')].find(x => /Sealed between your devices/.test(x.textContent));
      return { chip: (it || sec) && (it || sec).querySelector('.sc-chip').textContent, text: sec ? sec.innerText.replace(/\s+/g, ' ') : null }; }); };
  const rm = await room(p), rq = await room(q);
  ok(rm.chip === 'Off' && /1 device is sealed; 2 paired before 7\.37 still use the code alone/.test(rm.text || ''), 'the Security room on the Mac: Off while two devices use the code alone, and says so', rm);
  ok(rq.chip === 'On' && /1 of 1 paired computer sealed/.test(rq.text || ''), 'the Security room on the iPhone: On, 1 of 1 paired computer sealed', rq);
  // Reset everything (Settings, Your data) clears the sealing store too: its confirming key (#rGo) deletes ingenium_seal
  const rs = await q.evaluate(() => new Promise(res => { const del = []; const o = indexedDB.deleteDatabase.bind(indexedDB); indexedDB.deleteDatabase = n => { del.push(n); return o('__t737_none'); };
    const k = document.createElement('button'); k.id = 'rGo'; k.addEventListener('click', e => e.stopPropagation()); document.body.appendChild(k); k.click(); setTimeout(() => { k.remove(); indexedDB.deleteDatabase = o; res(del); }, 600); }));
  ok(rs.includes('ingenium_seal'), 'Reset everything also deletes the sealing store (this device\'s keys)', rs);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); A.pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
