// Ingenium 7.35: your app on the iPhone and iPad, four ways (modules/r316.js and r112.js; the computer's side, build/desktop/app_apps_735.py).
// Her approved preview (18 November 2026, https://claude.ai/artifact/HMXfpBF7MfUwg9Q8Z2yNRP): "I approve of the preview, please just add some
// colours to the buttons because they all look very plain all in white. Please commit and push it everywhere".
// A real computer app runs here (rig/run_app.py, HOME in a folder of its own): "the Mac", whose page is driven with its own functions as
// window.pywebview.api. A plain browser paired with it is "the iPhone". GitHub is stood in for inside the Mac's browser (page.route on
// api.github.com); nothing reaches the real GitHub. Checks:
//   - Fabrica's Ship part: the iPhone card reads "iPhone and iPad", its four ways, and its key Choose a way;
//   - the sheet: its four ways, the first open; every key in a colour of Ingenium's own (lavender, sky blue, amber, emerald, Ingenium's
//     violet), none plain white; a way and a key lift under the pointer, with no wash; by night the colours are the night's;
//   - Inside Ingenium, on the Mac: the iPhone, paired, is listed; Send leaves the app's page waiting on the Mac for it;
//   - on the iPhone: Fabrica offers it above Your apps; Keep it here makes the app there, with its page; the Mac then says Kept there;
//     sent again after a change, the iPhone's app takes it as a new version;
//   - Make the file, Make the IPA and Make the kit ask Fabrica for the one page, the IPA, and the iPhone and iPad kits;
//   - On the Home Screen, from my Mac: Serve it now serves the web app at /apps/<name>/ on the home Wi-Fi (its page and manifest read by the
//     iPhone's browser, with no code), its address and a code for the camera shown; Stop serving ends it;
//   - On GitHub Pages: the web app's files on the branch gh-pages (blobs, a tree, a commit, the branch made, then moved on the second
//     publish), with .nojekyll, Pages switched on for it, its address shown;
//   - on the iPhone (no computer app): the sheet says where to send and serve from;
//   - no page errors.
//   node rig/t_735_iphone_ways.js <folder holding ingenium_app.py (patched) and ingenium.html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const crypto = require('crypto');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const RUN_APP = path.join(__dirname, 'run_app.py');
function start(name, apiPort) { const home = path.join(OUT, name, 'home'), dir = path.join(OUT, name, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
  for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
  const pr = cp.spawn('python3', ['-I', RUN_APP, dir, String(apiPort)], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => err += d);
  return { pr, port: apiPort, err: () => err, ready: async () => { for (let i = 0; i < 240; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) return JSON.parse(m[0]); await new Promise(r => setTimeout(r, 250)); } throw new Error(name + ' did not start: ' + err.slice(-600)); } }; }
const api = (port, n, args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
/* the stand-in GitHub: what it was asked, and its answers */
const GH = { calls: [], blobs: {}, ref: null, pages: false };
async function github(route) {
  const q = route.request(), u = new URL(q.url()), m = q.method(), body = q.postData() ? JSON.parse(q.postData()) : null; GH.calls.push(m + ' ' + u.pathname);
  const json = (s, o) => route.fulfill({ status: s, contentType: 'application/json; charset=utf-8', body: JSON.stringify(o) });
  const R = '/repos/harbour/tide-clock'; const p = u.pathname;
  if (p === R + '/git/blobs' && m === 'POST') { const raw = Buffer.from(body.content || '', 'base64'); const sha = crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + raw.length + '\0'), raw])).digest('hex'); GH.blobs[sha] = raw; return json(201, { sha }); }
  if (p === R + '/git/trees' && m === 'POST') { GH.tree = body.tree; return json(201, { sha: crypto.createHash('sha1').update(JSON.stringify(body.tree)).digest('hex') }); }
  if (p === R + '/git/ref/heads/gh-pages' && m === 'GET') return GH.ref ? json(200, { ref: 'refs/heads/gh-pages', object: { sha: GH.ref } }) : json(404, { message: 'Not Found' });
  if (p === R + '/git/commits' && m === 'POST') { GH.commit = body; return json(201, { sha: crypto.createHash('sha1').update(JSON.stringify(body) + Date.now()).digest('hex') }); }
  if (p === R + '/git/refs' && m === 'POST') { GH.ref = body.sha; GH.made = body.ref; return json(201, { ref: body.ref, object: { sha: body.sha } }); }
  if (p === R + '/git/refs/heads/gh-pages' && m === 'PATCH') { GH.moved = (GH.moved || 0) + 1; GH.ref = body.sha; return json(200, { ref: 'refs/heads/gh-pages', object: { sha: body.sha } }); }
  if (p === R + '/pages' && m === 'GET') return GH.pages ? json(200, { html_url: 'https://harbour.github.io/tide-clock/', source: { branch: 'gh-pages', path: '/' } }) : json(404, { message: 'Not Found' });
  if (p === R + '/pages' && m === 'POST') { GH.pages = true; GH.pagesBody = body; return json(201, { html_url: 'https://harbour.github.io/tide-clock/', source: body.source }); }
  return json(404, { message: 'Not Found' });
}
(async () => {
  const A = start('mac', 18981); let ia;
  try { ia = await A.ready(); } catch (e) { ok(false, 'the computer app starts', String(e)); process.exit(2); }
  ok(['apps_serve', 'apps_send', 'apps_outbox', 'apps_served', 'apps_unserve'].every(n => ia.names.includes(n)), "the computer app runs here, with the new functions (apps_serve, apps_send and the rest)", ia.page_port);
  const b = await pw.chromium.launch(); const errs = [];
  const enter = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await pg.waitForTimeout(800); };
  // ---- the Mac: its own functions as window.pywebview.api ----
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ca.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: A.port });
  await ca.route('https://api.github.com/**', github);
  const p = await ca.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', e => errs.push('mac: ' + e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(p);
  const rid = await p.evaluate(async () => { const r = await IngRepo.create({ name: 'Tide Clock' }); await IngRepo.put(r.id, 'index.html', '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock</title><link rel="stylesheet" href="style.css"></head><body><h1>Tide Clock</h1></body></html>'); await IngRepo.put(r.id, 'style.css', 'h1{color:navy}'); await IngRepo.commit(r.id, 'First version'); return r.id; });
  const ship = async (pg) => { await pg.evaluate(() => go('fabrica')); await pg.waitForTimeout(2000); await pg.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); }); await pg.waitForTimeout(1500);
    await pg.evaluate(() => { const t = document.getElementById('fbPart_ship'); if (t) t.click(); }); await pg.waitForTimeout(1500); };
  await ship(p);
  const card = await p.evaluate(() => { const c = document.querySelector('#fbShip .f-tg[data-k="ipa"]'); const w = c && c.closest('.fr-tgw'); const k = w && w.querySelector('.fr-mk'); return c ? { title: c.querySelector('b').textContent, small: c.querySelector('small').textContent, key: k && k.textContent } : null; });
  ok(card && card.title === 'iPhone and iPad' && /^Four ways: inside Ingenium, on the Home Screen/.test(card.small) && card.key === 'Choose a way', "the Ship part's iPhone card: iPhone and iPad, its four ways, and Choose a way", card);
  const openSheet = async (pg) => { await pg.evaluate(() => { const s = document.querySelector('.f-sheet.r316'); if (s) s.closest('.f-sheet-wrap').remove(); document.querySelector('#fbShip .f-tg[data-k="ipa"]').closest('.fr-tgw').querySelector('.fr-mk').click(); }); await pg.waitForTimeout(1200); };
  const openWay = async (pg, t) => { await pg.evaluate(t => { const w = [...document.querySelectorAll('.f-sheet.r316 .r316-way')].find(x => x.querySelector('.r316-wh b').textContent === t); if (w.getAttribute('aria-expanded') !== 'true') w.querySelector('.r316-wh').click(); }, t); await pg.waitForTimeout(900); };
  // pairing: the iPhone pairs once with the code (the lending server runs while she lends, here while runs are on)
  const s0 = await api(A.port, 'share_runs_set', [true]); const code = s0.code;
  const ci = await b.newContext({ viewport: { width: 1180, height: 820 } }); const q = await ci.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('iphone: ' + e.message.slice(0, 200)));
  await q.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(q);
  const pq = await q.evaluate(async ([port, code]) => { try { const c = await IngLend.pair('127.0.0.1:' + port, code); return { id: c.id, name: c.name, me: IngLend.state().me }; } catch (e) { return { err: String(e && e.message || e) }; } }, [s0.port, code]);
  ok(pq.id, 'the iPhone pairs with the Mac', { id: pq.id, name: pq.name });
  await api(A.port, 'share_runs_set', [false]);
  const s1 = await api(A.port, 'share_status', []);
  ok(!s1.running && (s1.devices || []).length >= 1, 'with nothing lent, served or waiting, the Mac stops its server, and remembers the device', { running: s1.running, devices: (s1.devices || []).map(d => d.name) });
  // the sheet on the Mac
  await openSheet(p);
  const sh = await p.evaluate(() => { const s = document.querySelector('.f-sheet.r316'); return s ? { h: s.querySelector('h3').textContent, ways: [...s.querySelectorAll('.r316-way')].map(w => [w.querySelector('.r316-wh b').textContent, w.getAttribute('aria-expanded')]) } : null; });
  ok(sh && sh.h === 'Tide Clock on your iPhone and iPad' && sh.ways.map(x => x[0]).join('|') === 'Inside Ingenium|On the Home Screen|With your Apple ID (free)|With a developer account (paid)' && sh.ways[0][1] === 'true' && sh.ways.slice(1).every(x => x[1] === 'false'), 'the sheet: its four ways, the first open', sh);
  for (const t of ['On the Home Screen', 'With your Apple ID (free)', 'With a developer account (paid)']) await openWay(p, t);
  const keys = await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 button.f-btn')].filter(x => x.offsetParent).map(x => ({ t: x.textContent, c: x.className.replace(/^f-btn ?/, ''), bg: getComputedStyle(x).backgroundColor, bgi: getComputedStyle(x).backgroundImage })));
  const coloured = keys.filter(k => !/quiet/.test(k.c));
  ok(coloured.length >= 7 && coloured.every(k => /c-(lav|sky|amb|emr)|pri/.test(k.c) && !/rgb\(255, 255, 255\)|rgba\(0, 0, 0, 0\)/.test(k.bg) || (/pri/.test(k.c) && /linear-gradient/.test(k.bgi))), 'every key in a colour of Ingenium\'s own, none plain white', keys.map(k => k.t + ':' + k.c));
  const lift = await p.evaluate(async () => { const w = document.querySelectorAll('.f-sheet.r316 .r316-way')[1], k = document.querySelector('.f-sheet.r316 .f-btn.c-sky');
    const a = [getComputedStyle(w).transform, getComputedStyle(k).transform, getComputedStyle(k).backgroundColor]; return { a, kr: k.getBoundingClientRect().toJSON(), wr: w.getBoundingClientRect().toJSON() }; });
  await p.mouse.move(lift.kr.x + lift.kr.width / 2, lift.kr.y + lift.kr.height / 2); await p.waitForTimeout(450);
  const lift2 = await p.evaluate(() => { const w = document.querySelectorAll('.f-sheet.r316 .r316-way')[1], k = document.querySelector('.f-sheet.r316 .f-btn.c-sky'); return [getComputedStyle(w).transform, getComputedStyle(k).transform, getComputedStyle(k).backgroundColor]; });
  ok(lift.a[0] === 'none' && lift2[0] !== 'none' && lift2[1] === 'matrix(1, 0, 0, 1, 0, -3)' && lift2[2] === lift.a[2], 'a way and a key lift under the pointer, the key three points, with no wash', { before: lift.a, after: lift2 });
  await p.mouse.move(2, 2);
  // what each maker key asks of Fabrica
  const made = await p.evaluate(async () => { const H = window.fbHubHost, o = H.makeOne, calls = []; H.makeOne = function (r, k, opt) { calls.push([k, opt && opt.kits ? opt.kits.join(',') : '']); return Promise.resolve(); };
    const t0 = H.targetHere; H.targetHere = function () { return true; };
    const by = t => [...document.querySelectorAll('.f-sheet.r316 button.f-btn')].filter(x => x.textContent === t);
    by('Make the file')[0].click(); by('Make the IPA').forEach(x => x.click()); by('Make the kit')[0].click(); H.makeOne = o; H.targetHere = t0; return calls; });
  ok(JSON.stringify(made) === JSON.stringify([['page', ''], ['ipa', ''], ['ipa', ''], ['kits', 'iphone,ipad']]), 'Make the file, Make the IPA (free and paid) and Make the kit ask Fabrica for the one page, the IPA, and the iPhone and iPad kits', made);
  // inside Ingenium: sent to the iPhone
  await openSheet(p); await p.waitForTimeout(1200);
  const devs = await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 .r316-dev')].map(r => [r.querySelector('b').textContent, r.querySelector('.st').textContent, (r.querySelector('button') || {}).textContent]));
  ok(devs.length >= 1 && devs[0][2] === 'Send', 'Inside Ingenium, on the Mac: the paired iPhone is listed, with Send', devs);
  await p.evaluate(() => document.querySelector('.f-sheet.r316 .r316-dev button').click()); await p.waitForTimeout(3000);
  const ob = await api(A.port, 'apps_outbox', []); const st2 = await api(A.port, 'share_status', []);
  ok((ob.apps || []).length === 1 && ob.apps[0].name === 'Tide Clock' && ob.apps[0].to.length === 1 && st2.running, 'Send leaves the app\'s page waiting on the Mac for that device, and the Mac\'s server runs again', { apps: ob.apps.map(a => [a.name, a.to]), running: st2.running });
  const devAfter = await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 .r316-dev .st')].map(x => x.textContent));
  ok(devAfter[0] === 'Waiting for it', 'its row says Waiting for it', devAfter);
  // on the iPhone
  await q.evaluate(() => go('fabrica')); await q.waitForTimeout(800);
  await q.evaluate(() => IngIphone.check(true)); await q.waitForTimeout(1500);
  const offer = await q.evaluate(() => { const b = document.getElementById('r316In'); return b ? { text: b.innerText.replace(/\s+/g, ' '), above: b.nextElementSibling && b.nextElementSibling.id, keys: [...b.querySelectorAll('button')].map(x => x.textContent) } : null; });
  ok(offer && /Tide Clock/.test(offer.text) && /From /.test(offer.text) && offer.above === 'fbRepos' && offer.keys.join('|') === 'Keep it here|Not now', 'on the iPhone, Fabrica offers it above Your apps: Keep it here, Not now', offer);
  await q.screenshot({ path: OUT + '/iphone_offer.png' });
  await q.evaluate(() => [...document.querySelectorAll('#r316In button')].find(x => x.textContent === 'Keep it here').click()); await q.waitForTimeout(3000);
  const kept = await q.evaluate(async () => { const r = (await IngRepo.list()).find(x => x.name === 'Tide Clock'); if (!r) return null; const fl = await IngRepo.files(r.id); const t = await IngRepo.readText(r.id, 'index.html'); const log = await IngRepo.log(r.id, { max: 9 }); return { files: fl.map(f => f.path), page: /<h1>Tide Clock<\/h1>/.test(t) && /h1\{color:navy\}/.test(t), n: log.length, msg: (log[0].message || log[0].msg || log[0].subject || '').trim(), offer: !!document.getElementById('r316In') }; });
  ok(kept && kept.files.includes('index.html') && kept.page && kept.n === 1 && /^From /.test(kept.msg) && !kept.offer, 'Keep it here: the app is in the iPhone\'s Your apps, its whole page (its style inside), the offer gone', kept);
  const ob2 = await api(A.port, 'apps_outbox', []);
  ok(ob2.apps[0] && Object.keys(ob2.apps[0].got || {}).length === 1, 'the Mac knows the iPhone kept it', ob2.apps[0] && ob2.apps[0].got);
  await openSheet(p); await p.waitForTimeout(1500);
  const devKept = await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 .r316-dev .st')].map(x => x.textContent));
  ok(devKept[0] === 'Kept there', 'and its row says Kept there', devKept);
  // sent again after a change: a new version there
  await p.evaluate(async id => { await IngRepo.put(id, 'style.css', 'h1{color:teal}'); await IngRepo.commit(id, 'Teal'); }, rid);
  await p.evaluate(() => document.querySelector('.f-sheet.r316 .r316-dev button').click()); await p.waitForTimeout(3000);
  await q.evaluate(() => IngIphone.check(true)); await q.waitForTimeout(1500);
  await q.evaluate(() => { const k = [...document.querySelectorAll('#r316In button')].find(x => x.textContent === 'Keep it here'); if (k) k.click(); }); await q.waitForTimeout(3000);
  const v2 = await q.evaluate(async () => { const rs = (await IngRepo.list()).filter(x => x.name === 'Tide Clock'); const r = rs[0]; const t = await IngRepo.readText(r.id, 'index.html'); return { apps: rs.length, n: (await IngRepo.log(r.id, { max: 9 })).length, teal: /h1\{color:teal\}/.test(t) }; });
  ok(v2.apps === 1 && v2.n === 2 && v2.teal, 'sent again after a change, the iPhone\'s app takes it as a new version (one app, two versions)', v2);
  // on the Home Screen, from the Mac
  await openSheet(p); await openWay(p, 'On the Home Screen');
  await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 button')].find(x => x.textContent === 'Serve it now').click());
  let addr = null; for (let i = 0; i < 60 && !addr; i++) { await p.waitForTimeout(500); addr = await p.evaluate(() => { const c = document.querySelector('.f-sheet.r316 .r316-addr code'); return c ? { url: c.textContent, qr: !!document.querySelector('.f-sheet.r316 .r316-qr svg path') } : null; }); }
  ok(addr && /^http:\/\/[^/]+\/apps\/tide-clock\/$/.test(addr.url) && addr.qr, 'Serve it now: its address on the home Wi-Fi, and a code for the camera', addr);
  const port2 = (await api(A.port, 'share_status', [])).port;
  /* as Safari does: the address opened in a page of its own (a fetch from the iPhone's Ingenium would be another origin) */
  const sv = await ci.newPage(); const nav = await sv.goto('http://127.0.0.1:' + port2 + '/apps/tide-clock/', { timeout: 60000 });
  const got = await sv.evaluate(async () => { const t = document.documentElement.outerHTML; const l = document.querySelector('link[rel="manifest"]'); let mj = null; if (l) { const m = await fetch(l.href); mj = { status: m.status, type: m.headers.get('content-type'), name: (await m.json()).name }; } return { title: document.title === 'Tide Clock', man: l && l.getAttribute('href'), mj }; });
  got.status = nav && nav.status(); await sv.close();
  ok(got.status === 200 && got.title && got.mj && got.mj.status === 200 && /manifest\+json|application\/json/.test(got.mj.type), 'the iPhone\'s browser reads its page and its manifest there, with no code', got);
  await p.screenshot({ path: OUT + '/mac_serve.png' });
  await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 button')].find(x => x.textContent === 'Stop serving').click()); await p.waitForTimeout(1500);
  const gone = await fetch('http://127.0.0.1:' + port2 + '/apps/tide-clock/').then(r => r.status, () => 'unreachable');
  ok(gone === 404 || gone === 'unreachable', 'Stop serving ends it', gone);
  // on GitHub Pages (the stand-in GitHub)
  await p.evaluate(id => { state.github = state.github || {}; state.github.token = 'test-token'; state.fabrica.remote = state.fabrica.remote || {}; state.fabrica.remote[id] = { owner: 'harbour', repo: 'tide-clock', branch: 'main', map: {}, rmap: {}, have: {} }; }, rid);
  await openSheet(p); await openWay(p, 'On the Home Screen');
  await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 button')].find(x => x.textContent === 'Publish on GitHub Pages').click());
  let pub = null; for (let i = 0; i < 60 && !pub; i++) { await p.waitForTimeout(500); pub = await p.evaluate(() => { const c = [...document.querySelectorAll('.f-sheet.r316 .r316-addr code')].find(x => /github\.io/.test(x.textContent)); return c ? c.textContent : null; }); }
  const paths = (GH.tree || []).map(t => t.path);
  ok(pub === 'https://harbour.github.io/tide-clock/' && paths.includes('index.html') && paths.includes('.nojekyll') && GH.made === 'refs/heads/gh-pages' && GH.pages && GH.pagesBody.source.branch === 'gh-pages' && GH.commit.parents.length === 0, 'On GitHub Pages: its files on gh-pages (with .nojekyll), the branch made, Pages switched on, its address shown', { pub, paths, made: GH.made, pages: GH.pagesBody });
  await openSheet(p); await openWay(p, 'On the Home Screen');
  await p.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 button')].find(x => x.textContent === 'Publish on GitHub Pages').click()); await p.waitForTimeout(4000);
  ok(GH.moved === 1 && GH.commit.parents.length === 1, 'published again: the branch moved on, the new version on the last', { moved: GH.moved, parents: GH.commit.parents.length });
  // night
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(800);
  const night = await p.evaluate(() => { const g = c => { const k = document.querySelector('.f-sheet.r316 .f-btn.' + c); return k ? getComputedStyle(k).color : null; }; return { lav: g('c-lav'), sky: g('c-sky'), amb: g('c-amb') }; });
  ok(night.lav === 'rgb(183, 156, 230)' && night.sky === 'rgb(124, 196, 255)' && night.amb === 'rgb(240, 176, 96)', 'by night the keys wear the night\'s colours', night);
  await (await p.$('.f-sheet.r316')).screenshot({ path: OUT + '/sheet_night.png' });
  // on the iPhone: no computer app
  await ship(q); await openSheet(q); await openWay(q, 'On the Home Screen');
  const ip = await q.evaluate(() => [...document.querySelectorAll('.f-sheet.r316 .r316-note')].map(x => x.textContent).join(' | '));
  ok(/Send it from Fabrica on the computer your iPhone and iPad pair with/.test(ip) && /Ingenium on your Mac serves it/.test(ip), 'on the iPhone, the sheet says where to send and serve from', ip.slice(0, 300));
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); A.pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
