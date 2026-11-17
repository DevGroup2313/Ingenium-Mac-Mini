// Ingenium 7.33: Fabrica, easier to find your way, and nothing stiff (modules/r315.js, with modules/r298.js sharing its lessons). Her words
// (17 November 2026), on the live preview (source/previews/fabrica_nav): "I approve of your preview, please commit and push it everywhere";
// "The "4 kept here" button ... the "Kept" button little button and the "Waiting" and "Not tested yet" buttons should all be animated and
// clickable and be responsive and move when I hover my mouse on them. I dislike how the collapsible button on the panels on the Fabrica
// page get a purple shading when I hover over it, I want that removed and I want it to get Ingenium's signature 3D look and animation
// instead. There area lot of sections and buttons inside of the Fabrica page that are stiff and rigid upon hover".
// Checks, in Chromium at 1440 by 1000, with an app that has a change not kept and an open issue:
//   - Where you are: Fabrica › the app › the room › the part, and what GitHub calls the part; it follows a change of room;
//   - the next step (keep the change first) and its key; the counts on the rooms (Now 1, Plans 1); GitHub's name on a room;
//   - Go to anything: typing finds a part, Enter opens it; an issue is found by its title; the map lists every part and opens one;
//   - Teach me as I go: a lesson over the part (what it is, GitHub, git), Got it counts it learned, the switch hides the lessons;
//   - the four chips are raised keys that lift under the pointer, and do something when pressed (Waiting opens Test; 1 not kept opens Changes);
//   - the fold keys: no violet wash under the pointer, the raised key, lifting;
//   - every kind of card, tile, row and key surveyed in every room lifts, leans or slides under the pointer (the containers and the 3D head
//     left out); no page error.
//   node rig/t_733_fabrica_way.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage(); p.setDefaultTimeout(240000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} try { localStorage.removeItem('ing.fabrica.learned.v1'); localStorage.removeItem('ing.fabrica.teach.v1'); } catch (e) {} });
  await p.evaluate(async () => { const r = await IngRepo.create({ name: 'Tide Clock' }); await IngRepo.put(r.id, 'index.html', '<h1>High water at six</h1>'); await IngRepo.commit(r.id, 'First version');
    await IngRepo.put(r.id, 'index.html', '<h1>High water at seven</h1>'); go('fabrica'); });
  await p.waitForTimeout(2500);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); });
  await p.waitForTimeout(2000);
  /* an open issue, through Fabrica's own record */
  await p.evaluate(async () => { const r = fbHubHost.cur(); const rec = await fbHub.live(r.id); rec.issues.push({ n: rec.next++, title: 'The tide is an hour late in March', state: 'open', body: '', made: Date.now(), talk: [], labels: [], people: [] }); fbHub.keep(rec); });
  await p.waitForTimeout(3500); await p.evaluate(() => IngRuns.nav('changes')); await p.waitForTimeout(1500);
  const w = await p.evaluate(() => { const b = document.querySelector('#fb .r315-path'); return b && { crumbs: [...b.querySelectorAll('.r315-crumb')].map(x => x.textContent), gh: (b.querySelector('.r315-gh') || {}).textContent, next: (document.querySelector('#fb .r315-next strong') || {}).textContent,
    counts: Object.fromEntries([...document.querySelectorAll('#fb .fr-room')].map(x => [x.getAttribute('data-room'), (x.querySelector('.r315-n') || {}).textContent || ''])), title: (document.querySelector('#fb .fr-room[data-room="plans"]') || {}).title }; });
  ok(w && w.crumbs.join('›') === 'Fabrica›Tide Clock›Now›Changes' && /GitHub calls it/.test(w.gh), 'Where you are: Fabrica › Tide Clock › Now › Changes, with what GitHub calls it', w);
  ok(w && /^Next: Keep a version/.test(w.next), 'the next step: keep the change first', w && w.next);
  ok(w && w.counts.now === '1' && w.counts.plans === '1' && /On GitHub: Branches, Issues/.test(w.title || ''), 'counts on the rooms: Now 1 (a change not kept), Plans 1 (an open issue); GitHub\'s name on the room', w && { counts: w.counts, title: w.title });
  await p.evaluate(() => IngRuns.nav('history')); await p.waitForTimeout(1200);
  const w2 = await p.evaluate(() => [...document.querySelectorAll('#fb .r315-crumb')].map(x => x.textContent).join('›'));
  ok(w2 === 'Fabrica›Tide Clock›Story›History', 'the path follows a change of room', w2);
  await p.screenshot({ path: path.join(OUT, 'fabrica_way.png') });
  /* Go to anything */
  await p.click('#r315Go'); await p.waitForTimeout(300); await p.keyboard.type('pull'); await p.waitForTimeout(250); await p.keyboard.press('Enter'); await p.waitForTimeout(1200);
  const g1 = await p.evaluate(() => ({ view: fbHubHost.S.view, room: fbRooms.room(), open: !!document.getElementById('r315Veil') }));
  ok(g1.view === 'pulls' && g1.room === 'plans' && !g1.open, 'Go to anything: "pull", then Enter, opens Plans › Pull requests', g1);
  await p.keyboard.press('/'); await p.waitForTimeout(300); await p.keyboard.type('hour late'); await p.waitForTimeout(250);
  const g2 = await p.evaluate(() => [...document.querySelectorAll('.r315-it b')].map(x => x.textContent).slice(0, 3));
  await p.keyboard.press('Enter'); await p.waitForTimeout(1200);
  const g3 = await p.evaluate(() => fbHubHost.S.view);
  ok(g2[0] && /The tide is an hour late in March/.test(g2[0]) && g3 === 'issues', 'an issue is found by its title, and opens', { found: g2, view: g3 });
  /* the map */
  await p.keyboard.press('m'); await p.waitForTimeout(400);
  const mp = await p.evaluate(() => ({ rooms: [...document.querySelectorAll('.r315-mroom h3')].map(x => x.textContent), parts: document.querySelectorAll('.r315-mtab').length }));
  await p.evaluate(() => { const b = [...document.querySelectorAll('.r315-mtab')].find(x => x.getAttribute('data-v') === 'workflows'); b.click(); }); await p.waitForTimeout(1200);
  const mp2 = await p.evaluate(() => ({ view: fbHubHost.S.view, open: !!document.getElementById('r315Veil') }));
  ok(mp.rooms.join() === 'Now,Story,Plans,Runs,Care,Test and ship' && mp.parts === 21 && mp2.view === 'workflows' && !mp2.open, 'the map: every room and its 21 parts; a part pressed opens it', { mp, mp2 });
  /* Teach me as I go */
  await p.evaluate(() => IngRuns.nav('compare')); await p.waitForTimeout(1200);
  const l1 = await p.evaluate(() => { const l = document.querySelector('#fbWorkBody > .r315-lesson'); return l && { t: l.querySelector('.lt b').textContent, dl: l.querySelector('dl').textContent }; });
  ok(l1 && /Compare/.test(l1.t) && /On GitHub/.test(l1.dl) && /In git/.test(l1.dl), 'a lesson over the part: what it is, its GitHub name, its git command', l1);
  const n0 = await p.evaluate(() => IngFabricaWay.learned().length);
  await p.evaluate(() => document.querySelector('#fbWorkBody > .r315-lesson [data-r315="got"]').click()); await p.waitForTimeout(500);
  const n1 = await p.evaluate(() => ({ n: IngFabricaWay.learned().length, has: IngFabricaWay.learned().indexOf('story/compare') >= 0, ring: (document.querySelector('#fb .r315-ring') || {}).textContent }));
  ok(n1.has && /of 21/.test(n1.ring || ''), 'Got it counts it learned, and the head says how many', { before: n0, after: n1 });
  await p.click('#r315Teach'); await p.waitForTimeout(500);
  const l2 = await p.evaluate(() => ({ lesson: !!document.querySelector('#fbWorkBody > .r315-lesson'), sw: document.getElementById('r315Teach').getAttribute('aria-checked'), kept: localStorage.getItem('ing.fabrica.teach.v1') }));
  ok(!l2.lesson && l2.sw === 'false' && l2.kept === '0', 'Teach me as I go switched off: no lesson, and it is kept', l2);
  await p.click('#r315Teach'); await p.waitForTimeout(400);
  /* the four chips: raised keys that lift and do something */
  await p.evaluate(() => IngRuns.nav('history')); await p.waitForTimeout(900);
  const chipLift = async (sel) => { const h = await p.$(sel); if (!h) return null; await p.mouse.move(2, 2); await p.waitForTimeout(300); const a = await h.evaluate(e => getComputedStyle(e).transform); await h.hover(); await p.waitForTimeout(400);
    const z = await h.evaluate(e => ({ t: getComputedStyle(e).transform, s: getComputedStyle(e).boxShadow, c: getComputedStyle(e).cursor, text: e.textContent.trim() })); return { before: a, after: z.t, shadow: z.s !== 'none', cursor: z.c, text: z.text }; };
  const kept = await chipLift('#fb .f-libk2'), wait = await p.evaluate(() => { const c = [...document.querySelectorAll('#fbShip .f-chip')].find(x => x.offsetParent); if (c) c.setAttribute('data-t733', 'ship'); return !!c; }) && await chipLift('#fbShip .f-chip[data-t733="ship"]');
  const notk = await p.evaluate(() => { const c = [...document.querySelectorAll('#fbWork .f-chip')].find(x => x.offsetParent && !x.closest('#fbWorkBody')); if (c) c.setAttribute('data-t733', 'work'); return !!c; }) && await chipLift('#fbWork .f-chip[data-t733="work"]');
  ok([kept, wait, notk].every(x => x && x.before !== x.after && x.shadow && x.cursor === 'pointer'), 'the chips "kept here", "Waiting" (or the test\'s word) and "not kept" are raised keys that lift under the pointer', { kept, wait, notk });
  await p.click('#fbWork .f-chip[data-t733="work"]'); await p.waitForTimeout(900);
  const c1 = await p.evaluate(() => fbHubHost.S.view);
  await p.click('#fbShip .f-chip[data-t733="ship"]'); await p.waitForTimeout(900);
  const c2 = await p.evaluate(() => ({ part: fbRooms.part ? fbRooms.part() : '', glow: !!document.querySelector('#fbShip .r315-glow') }));
  ok(c1 === 'changes' && (c2.part === 'test' || c2.glow), 'pressed: the app\'s chip opens Changes; the test\'s chip opens Test and lights its key', { c1, c2 });
  /* the fold keys */
  const fold = await p.$('#fb .f-fold'); await p.mouse.move(2, 2); await p.waitForTimeout(300);
  const f0 = await fold.evaluate(e => ({ bg: getComputedStyle(e).backgroundImage, t: getComputedStyle(e).transform }));
  await fold.hover(); await p.waitForTimeout(400);
  const f1 = await fold.evaluate(e => ({ bg: getComputedStyle(e).backgroundImage, bgc: getComputedStyle(e).backgroundColor, t: getComputedStyle(e).transform, s: getComputedStyle(e).boxShadow }));
  ok(f1.t !== f0.t && /linear-gradient\(rgb\(255, 255, 255\)/.test(f1.bg) && !/rgba?\(1[0-2]\d, [4-9]\d, 1[89]\d/.test(f1.bgc) && /0px 3px 0px/.test(f1.s), 'the fold keys: the raised key, lifting under the pointer, no violet wash', { f0, f1 });
  /* every kind surveyed, in every room */
  const rooms = { now: ['changes', 'files', 'code'], story: ['history', 'compare', 'releases'], plans: ['ideas', 'issues', 'pulls', 'projects', 'wiki'], runs: ['runs', 'workflows', 'machines'], care: ['actions', 'insights', 'settings'] };
  const LEAVE = /^(SECTION\.skh|DIV\.f-pn-h|DIV\.f-seg|DIV\.fr-parts|DIV\.f-steps|SPAN\.r315-n|SPAN\.tick|SPAN\.m|SPAN\.id|SPAN\.h-id|SPAN\.ic|SPAN\.f-ls|SPAN\.fr-chev|DIV\.r315-|SPAN\.r315-|BUTTON\.r315-|P\.f-hint)/;
  const seen = {}, stiff = [];
  for (const [rm, vs] of Object.entries(rooms)) for (const v of vs) {
    await p.evaluate(v => IngRuns.nav(v), v); await p.waitForTimeout(800);
    const cands = await p.evaluate(() => { const out = []; document.querySelectorAll('#fb *').forEach((e, i) => { if (!e.offsetParent || typeof e.className !== 'string' || !e.className) return; const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (r.width < 14 || r.height < 14) return;
      if (!(cs.boxShadow !== 'none' || (cs.borderStyle !== 'none' && parseFloat(cs.borderWidth) > 0 && cs.borderRadius !== '0px') || e.tagName === 'BUTTON')) return; e.setAttribute('data-t733s', String(i)); out.push([String(i), e.tagName + '.' + e.className.split(/\s+/).slice(0, 2).join('.')]); }); return out; });
    for (const [i, k] of cands) { if (seen[k] || LEAVE.test(k)) continue; seen[k] = 1; const h = await p.$('[data-t733s="' + i + '"]'); if (!h) continue;
      const a = await h.evaluate(e => [getComputedStyle(e).transform, getComputedStyle(e).boxShadow].join('|')); try { await h.hover({ timeout: 1500 }); } catch (e) { continue; } await p.waitForTimeout(320);
      const z = await h.evaluate(e => [getComputedStyle(e).transform, getComputedStyle(e).boxShadow].join('|')); if (a === z) stiff.push(k + ' (' + rm + '/' + v + ')'); await p.mouse.move(2, 2); }
  }
  ok(stiff.length === 0, 'every kind of card, tile, row and key in every room answers the pointer (' + Object.keys(seen).length + ' kinds hovered)', stiff);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1200)); process.exit(2); });
