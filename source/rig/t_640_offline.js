// node rig/t_640_offline.js <Ingenium page url (master)> <out dir> [<full edition url>]
// The Offline Project's seal in Fabrica, shown as that app's own icon, the way the other apps' icons are (Ingenium 6.40; modules/r112.js
// and r140.js). Her words (6 November 2026): "I want the Offline Project seal to be shown inside of Fabrica the same way that the other
// apps icons are shown inside of Fabrica, I don't want it to be Fabrica's logo." Her decision of 5 November: the master seal live, "with
// each quarter moving as its app's seal moves". The repositories are invented, made here in the page's own store.
// Checks: a repository named for the Offline Project wears the master crest in its row of Your apps, at a seal's height, live; one named
// for the variation without Inkwell wears the trio's crest; an ordinary app keeps the new app's mark; chosen, the work panel's head shows
// the same crest at its size; Fabrica's own head carries no seal; the crest's seals move (with the sway held still, two pictures of each
// quarter a moment apart differ, while a crest without quarter motions gives the same picture twice); minimal motion stills them and
// they move again after; still pictures and documents are unchanged; the full edition shows the new app's mark for the same name; no
// page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3], FULL = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const FOUR = ['cd', 'forge', 'ingenium', 'inkwell'];
const NAMES = ['The Offline Project', 'Offline-project-forest without Inkwell', 'Harbour Notes'];
const boot = async (ctx, url) => { const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); return p; };
const makeRepos = (p) => p.evaluate(async (NAMES) => { for (const n of NAMES) await IngRepo.create({ name: n }); return (await IngRepo.list()).map(r => r.name); }, NAMES);
const rows = (p) => p.evaluate((NAMES) => NAMES.map(n => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === n); if (!b) return { n, found: false };
  const ls = b.querySelector('.f-ls'), c = ls && ls.querySelector('.ing-crest'), rc = c && c.getBoundingClientRect(), rl = ls && ls.getBoundingClientRect();
  return { n, found: true, cls: ls ? ls.className : '', kind: c ? (c.classList.contains('ic-master') ? 'master' : c.classList.contains('ic-trio') ? 'trio' : 'other') : '', live: !!(c && c.classList.contains('is-live')), quarters: !!(c && c.classList.contains('ic-quarters')),
    h: rc ? Math.round(rc.height) : 0, sq: rl ? Math.round(rl.height) : 0, mark: !!(ls && ls.classList.contains('new')), app: getComputedStyle(b).getPropertyValue('--app').trim() }; }), NAMES);
// what a crest's seals layer (depth .002) holds
const sealsLayer = (p, sel) => p.evaluate(async (sel) => { const c = document.querySelector(sel); if (!c) return null; const im = [...c.querySelectorAll('img.ic-l')].find(x => x.style.getPropertyValue('--z') === '0.002');
  if (!im) return { none: true }; const t = await (await fetch(im.src)).text();
  return { q: ['cd', 'forge', 'ingenium', 'inkwell'].map(k => t.indexOf('class="q q-' + k + '"') >= 0), keys: ['qHalo', 'qGlint', 'qSheen', 'qEngine', 'qBeat', 'qGlow'].every(k => t.indexOf('@keyframes ' + k) >= 0) }; }, sel);
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await boot(ctx, URL_);
  const made = await makeRepos(p);
  ok(NAMES.every(n => made.indexOf(n) >= 0), 'three invented repositories are kept in Fabrica\'s store', made);
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(2000);
  const R = await rows(p);
  const off = R[0], trio = R[1], plain = R[2];
  ok(off.found && /crest/.test(off.cls) && off.kind === 'master' && off.live && off.quarters && off.h >= 50 && off.h <= 58 && off.sq === 56,
    'a repository named for the Offline Project wears the master crest in its row of Your apps, live, as tall as a seal there', off);
  ok(trio.found && trio.kind === 'trio' && trio.live && trio.h >= 50 && trio.h <= 58, 'one named for the variation without Inkwell wears the trio\'s crest', trio);
  ok(plain.found && plain.mark && !plain.kind, 'an ordinary app keeps the new app\'s mark', plain);
  ok(off.app === '#9a7a32' && trio.app === '#9a7a32' && plain.app !== '#9a7a32', 'the Offline Project\'s tile takes the crest\'s gold', { off: off.app, trio: trio.app, plain: plain.app });
  const head = await p.evaluate(() => { const h = document.querySelector('#fb .f-head'); return { crest: !!(h && h.querySelector('.ing-crest, .fb-crest')) }; });
  ok(!head.crest, 'Fabrica\'s own head carries no seal: the crest is the app\'s icon, not Fabrica\'s logo', head);
  await p.screenshot({ path: OUT + '/your-apps.png', clip: { x: 220, y: 130, width: 520, height: 420 } });
  // chosen, the work panel's head shows the same crest at its size
  await p.evaluate((n) => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === n); b.click(); }, NAMES[0]); await p.waitForTimeout(1200);
  const wh = await p.evaluate(() => { const s = document.getElementById('fbWhSeal'), c = s && s.querySelector('.ing-crest'), r = c && c.getBoundingClientRect();
    return { name: (document.getElementById('fbWhName') || {}).textContent, crest: !!c, master: !!(c && c.classList.contains('ic-master')), h: r ? Math.round(r.height) : 0 }; });
  ok(wh.name === NAMES[0] && wh.crest && wh.master && wh.h >= 30 && wh.h <= 36, 'chosen, the work panel\'s head shows the same crest at its size', wh);
  await p.screenshot({ path: OUT + '/chosen.png', clip: { x: 220, y: 130, width: 1000, height: 300 } });
  // the seals move
  const L1 = await sealsLayer(p, '#fbRepos .f-ls.crest .ing-crest.ic-master');
  ok(L1 && L1.q && L1.q.every(Boolean) && L1.keys, 'its seals carry the four quarters and their motions (Carpe Diem\'s ring, The Forge\'s sparks and sheen, Ingenium\'s star and heart stone, Inkwell\'s glow)', L1);
  await p.evaluate((FOUR) => { const st = document.createElement('style'); st.textContent = '#t640 .ic-idle,#t640 .ing-crest{animation:none !important}#t640 .ic-tilt{transition:none !important}'; document.head.appendChild(st);
    const host = document.createElement('div'); host.id = 't640'; host.style.cssText = 'position:fixed;left:20px;top:60px;z-index:99999;display:flex;gap:40px;background:#fff;padding:10px';
    const a = IngSeal.el(FOUR, { live: true, quarters: true, size: 300, night: false }), s = IngSeal.el(FOUR, { live: true, size: 300, night: false }); a.id = 't640a'; s.id = 't640s'; host.appendChild(a); host.appendChild(s); document.body.appendChild(host); }, FOUR);
  await p.waitForTimeout(2500);
  const rects = await p.evaluate(() => { const M = IngSeal.medals(['cd', 'forge', 'ingenium', 'inkwell']); const out = {};
    for (const id of ['t640a', 't640s']) { const r = document.getElementById(id).getBoundingClientRect(); out[id] = M.med.map(m => ({ k: m.k, x: Math.round(r.left + (m.cx - m.r - 3) / 300 * r.width), y: Math.round(r.top + (m.cy - m.r - 3) / 400 * r.height), w: Math.round((2 * m.r + 6) / 300 * r.width), h: Math.round((2 * m.r + 6) / 400 * r.height) })); }
    return out; });
  const shots = async (id) => Promise.all(rects[id].map(q => p.screenshot({ clip: { x: q.x, y: q.y, width: q.w, height: q.h } })));
  const a1 = await shots('t640a'), s1 = await shots('t640s'); await p.waitForTimeout(900); const a2 = await shots('t640a'), s2 = await shots('t640s');
  const moved = rects.t640a.map((q, i) => [q.k, Buffer.compare(a1[i], a2[i]) !== 0]), still = rects.t640s.map((q, i) => [q.k, Buffer.compare(s1[i], s2[i]) === 0]);
  ok(moved.every(x => x[1]) && still.every(x => x[1]), 'with the sway held still, each quarter moves (two pictures a moment apart differ), and a crest without quarter motions gives the same picture twice', { moved, still });
  await p.screenshot({ path: OUT + '/quarters.png', clip: { x: 20, y: 60, width: 700, height: 440 } });
  await p.evaluate(() => { const h = document.getElementById('t640'); if (h) h.remove(); });
  // minimal motion stills them at once; they move again after
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); }); await p.waitForTimeout(700);
  const L2 = await sealsLayer(p, '#fbRepos .f-ls.crest .ing-crest.ic-master');
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'calm'); }); await p.waitForTimeout(700);
  const L3 = await sealsLayer(p, '#fbRepos .f-ls.crest .ing-crest.ic-master');
  ok(L2 && L2.q && L2.q.every(x => !x) && L3 && L3.q && L3.q.every(Boolean), 'minimal motion stills the quarters at once, and with motion back they move again', { minimal: L2 && L2.q, calm: L3 && L3.q });
  // still pictures and documents are unchanged; Home's crest is unchanged
  const docs = await p.evaluate(() => { const s = IngSeal.svg(['cd', 'forge', 'ingenium', 'inkwell']) || ''; return { svg: s.length > 1000, moving: /class="q q-|@keyframes q/.test(s) }; });
  ok(docs.svg && !docs.moving, 'a still picture of the crest (documents, printing) is as it was, with no motion in it', docs);
  // the full edition: the new app's mark for the same name
  if (FULL) { const ctxF = await b.newContext({ viewport: { width: 1440, height: 900 } }); const f = await boot(ctxF, FULL); await makeRepos(f); await f.evaluate(() => go('fabrica')); await f.waitForTimeout(2000);
    const RF = await rows(f);
    ok(RF[0].found && RF[0].mark && !RF[0].kind, 'the full edition shows the new app\'s mark for the same name (the crest names her own apps)', RF[0]);
    ok(f.__errs.length === 0, 'no script errors in the full edition', f.__errs); }
  ok(p.__errs.length === 0, 'no script errors on the page', p.__errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
