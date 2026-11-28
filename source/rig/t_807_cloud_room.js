// node rig/t_807_cloud_room.js <page url> [picture folder]
// Ingenium 8.07 (modules/r409.js): Memoria's Ingenium Cloud room, raised in the From your chats room's own language, and its drawing refined.
// Her words (28 November 2026): "All of the pages are flat on the Ingenium Cloud tab page in Memoria, please fix this and slightly redesign the
// page, it looks so plain and motionless and doesn't fit with the other tab pages"; of the live preview: "I approve of the previews for the
// Cloud room, please commit and push it everywhere"; of its drawing: "make the little drawing more 3D and animated ... clickable and
// interactive like the rest of the app is", "I didn't want you to change the design of the drawing, I just wanted it refined and improved",
// "I don't want the lines to stay solid and attached to the bigger orb. I want it to be like rays going in and out of the orbs"; "the rays look fake
// and synthetic, I want you to match it to the ones from the Adamas page and the Vesta page"; "There is a white outline around the orbs that cheapen
// the look, please fix that and match them to the orbs from the Home page"; "By rays I meant shooting stars or a thin sparkling rays of light going back
// in forth to keep in theme with the rest of the app"; "These cards cover the orbs on the screen."
// Three states: not set up; in step (a Cloud seeded into this browser's own store: invented devices, nothing sent anywhere, auto off);
// a choice waiting (an invented conversation put in r394's own store). No sign-in; nothing of anyone's is read.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const URL = process.argv[2], OUT = process.argv[3] || path.join(require('os').tmpdir(), 't807c'); fs.mkdirSync(OUT, { recursive: true });
async function open(b, seed) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  if (seed) await p.addInitScript((s) => { try { if (!sessionStorage.getItem('t807')) { localStorage.setItem('ingenium_cloud', JSON.stringify(s)); sessionStorage.setItem('t807', '1'); } } catch (e) {} }, seed);
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  await p.evaluate(() => go('memoria')); await sleep(2200);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#page-memoria .fxp-tab')].find((x) => /Ingenium Cloud/.test(x.textContent)); if (t) t.click(); }); await sleep(2600);
  return { p, ctx, errs };
}
const room = (p) => p.evaluate(() => { const c = document.getElementById('cloudCard'); if (!c) return null; const cs = getComputedStyle(c), q = (s) => c.querySelector(s);
  const fig = q('.clx-fig'); return { cls: c.className, s: c.getAttribute('data-s'), slab: cs.boxShadow !== 'none' && /inset/.test(cs.boxShadow), eye: (q('.mr-eye') || {}).textContent, title: (q('.clx-title') || {}).textContent,
    counts: [...c.querySelectorAll('.mr-counts .mr-count')].map((x) => x.textContent.trim()), orbs: fig ? [...fig.querySelectorAll('.clx-orb')].map((o) => ({ c: o.className.replace('clx-orb ', ''), lab: o.querySelector('.clx-lab').textContent, svg: !!o.querySelector('.clx-oball svg'), round: (() => { const r = o.querySelector('.clx-oxo').getBoundingClientRect(); return +(r.height / r.width).toFixed(2); })(),
      rim: (() => { const c = [...o.querySelectorAll('.clx-oball svg circle')].find((x) => x.getAttribute('stroke-width') === '.9'); return c ? +getComputedStyle(c).strokeOpacity : 0; })(), mark: !!o.querySelector('.clx-omark .clx-oico svg') })) : [],
    links: fig ? fig.querySelectorAll('.clx-links .lk-track').length : -1, linkOp: fig && fig.querySelector('.clx-links .lk-track') ? +getComputedStyle(fig.querySelector('.clx-links .lk-track')).opacity : -1, rays: fig ? fig.querySelectorAll('.clx-links .lk-wave').length : -1,
    cards: fig ? fig.querySelectorAll('.clx-tip').length : -1, sayBelow: fig ? (() => { const y = Math.max(...[...fig.querySelectorAll('.clx-lab')].map((l) => l.getBoundingClientRect().bottom)); return fig.querySelector('.clx-figsay').getBoundingClientRect().top >= y - 1; })() : false,
    steps: [...c.querySelectorAll('.cl-step')].map((s) => ({ open: s.classList.contains('open'), done: s.classList.contains('done'), raised: getComputedStyle(s).boxShadow !== 'none', inLeft: !!s.closest('.clx-left') })),
    keys: [...c.querySelectorAll('.btn.small')].map((k) => getComputedStyle(k).boxShadow !== 'none'), right: !!q('.clx-right .clx-devgroup'), away: !!q('.clx-right details.cl-more'),
    times: !!(q('#clTimes') && q('#clTimes').previousElementSibling === q('.clx-cols')), rows: [...c.querySelectorAll('.clx-drow b')].map((x) => x.textContent), empty: !!q('.clx-right .clx-empty'),
    wide: c.scrollWidth <= c.clientWidth + 1, say: (q('.clx-figsay') || {}).textContent }; });
(async () => {
  const b = await pw.chromium.launch();
  /* 1. not set up */
  let { p, ctx, errs } = await open(b);
  await sleep(1200); let r = await room(p);
  ok(r && /clx-room/.test(r.cls) && r.s === 'off' && r.slab, 'the room is a raised slab, as the From your chats room is', r && { cls: r.cls, s: r.s, slab: r.slab });
  ok(r && /Ingenium Cloud/.test(r.eye || '') && r.title === 'Your work, on every device' && /Off on this device/.test(r.counts.join('|')) && /never/.test(r.counts.join('|')), 'its head: the eyebrow, the title, and its state in raised counters', r && { eye: r.eye, title: r.title, counts: r.counts });
  ok(r && r.orbs.length === 3 && r.orbs.every((o) => o.svg && o.round === 1) && r.orbs.map((o) => o.lab).join('|') === 'Your computer|This device|Your others', 'the drawing: its three spheres in their places, each one of Home\'s own, round', r && r.orbs);
  ok(r && r.orbs.every((o) => o.rim === 0 && o.mark), 'each orb is made as Home\'s are: no rim line round it, its pearl mark standing above it', r && r.orbs.map((o) => ({ c: o.c, rim: o.rim, mark: o.mark })));
  ok(r && r.links === 2 && r.linkOp > 0 && r.linkOp < 0.35 && r.rays === 0, 'before it is set up, the links from the keeper stand faint and still, and no signal runs', r && { links: r.links, op: r.linkOp, waves: r.rays });
  ok(r && r.cards === 0 && r.sayBelow, 'nothing covers the spheres: no card floats over the drawing; its words sit in the line beneath the names', r && { cards: r.cards, below: r.sayBelow });
  ok(r && r.steps.length === 3 && r.steps.every((s) => s.raised && s.inLeft) && r.steps[0].open, 'the three steps are raised cards in the left column, the first open', r && r.steps);
  ok(r && r.keys.length > 0 && r.keys.every(Boolean), 'its keys are raised', r && r.keys);
  ok(r && r.right && r.away && r.empty && r.times && r.wide, 'the right column holds the devices and the sync file; the times sit in a well at the foot; nothing spills sideways', r && { right: r.right, away: r.away, empty: r.empty, times: r.times, wide: r.wide });
  await p.click('#cloudCard .clx-orb.keep'); await sleep(900);
  const s2 = await p.evaluate(() => ({ open: document.querySelectorAll('#cloudCard .cl-step')[1].classList.contains('open'), tip: (document.querySelector('#cloudCard .clx-figsay') || {}).textContent || '' }));
  ok(s2.open && /step 2/.test(s2.tip), 'pressing the computer that keeps it says what it is and opens step 2', s2);
  const box = await p.evaluate(() => { const e = document.querySelectorAll('#cloudCard .cl-step')[2]; e.scrollIntoView({ block: 'center' }); const s = e.getBoundingClientRect(); return { x: s.left + s.width / 2, y: s.top + 20 }; });
  await sleep(400); await p.mouse.move(box.x - 40, box.y + 5); await p.mouse.move(box.x, box.y, { steps: 5 }); await sleep(500);
  const lean = await p.evaluate(() => document.querySelectorAll('#cloudCard .cl-step')[2].classList.contains('mr-ph'));
  ok(lean, 'a step card leans toward the pointer and lifts under it', lean);
  const sl = await p.evaluate(() => { const c = document.getElementById('cloudCard').getBoundingClientRect(); return { x: c.right - 30, y: c.bottom - 12 }; });
  await p.mouse.move(sl.x, sl.y); await p.mouse.down(); await sleep(80); const sunk = await p.evaluate(() => document.getElementById('cloudCard').classList.contains('mr-pd')); await p.mouse.up();
  ok(!sunk, 'pressing the room itself does not sink the whole room', sunk);
  await p.evaluate(() => { const e = document.getElementById('cloudCard'); e.scrollIntoView({ block: 'start' }); }); await sleep(500);
  await p.screenshot({ path: path.join(OUT, 'cloud_off_day.png') });
  ok(errs.length === 0, 'no page error (not set up)', errs); await ctx.close();
  /* 2. in step, seeded */
  const now = Date.now();
  const seed = { device: 'a'.repeat(24), name: 'MacBook Pro', box: { addr: '127.0.0.1:9', code: 'TEST-CODE', computer: 'Mac mini', self: false }, kdf: { salt: 'AAAA', iter: 1 }, keyOk: true, auto: false, bring: 'ask',
    lastPush: { at: now - 4 * 60000 }, lastPull: { at: now - 2 * 60000 }, snaps: [{ device: 'a'.repeat(24), name: 'MacBook Pro', got: now - 4 * 60000, bytes: 13002342 }, { device: 'b'.repeat(24), name: 'iPhone', got: now - 864e5, bytes: 8493465 }], seen: {}, ids: {} };
  ({ p, ctx, errs } = await open(b, seed));
  await sleep(1200); r = await room(p);
  ok(r && r.s === 'on' && /On, kept by Mac mini/.test(r.counts.join('|')) && /4 min/.test(r.counts.join('|')) && /2 min/.test(r.counts.join('|')), 'in step: the counters say who keeps it, and when work went and came', r && { s: r.s, counts: r.counts });
  ok(r && r.orbs.map((o) => o.lab).join('|') === 'Mac mini|This device|iPhone' && r.links === 2, 'the drawing names the keeper and her other device, a link from the keeper to each', r && { orbs: r.orbs.map((o) => o.lab), links: r.liaticLines });
  /* 8.09: waves of signal leave the keeper for each small sphere, which answers with a ring; the links stay attached to both (her words:
     "I just wanted to show the animated connection wireless connection signal links going from the mac mini's orb to the other two orbs";
     her choice: "I choose the waves look for the Ingenium Cloud preview") */
  const wv = await p.evaluate(async () => { const fig = document.querySelector('#cloudCard .clx-fig'), sv = fig.querySelector('.clx-links'); let waves = 0, rcv = false; const t0 = performance.now();
    while (performance.now() - t0 < 7000) { await new Promise((r) => setTimeout(r, 60)); waves = Math.max(waves, sv.querySelectorAll('.lk-wave').length); if (fig.querySelector('.clx-orb.rcv')) rcv = true; }
    const m = sv.getScreenCTM(), ctr = (c) => { const o = fig.querySelector('.clx-orb.' + c + ' .clx-oxo'), q = o.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2, r: q.width * 0.33 }; }, K = ctr('keep');
    const att = [...sv.querySelectorAll('.lk-track')].map((t, i) => { const P = (s) => { const pt = t.getPointAtLength(s); return { x: pt.x * m.a + pt.y * m.c + m.e, y: pt.x * m.b + pt.y * m.d + m.f }; }, a = P(0), z = P(t.getTotalLength()), M = ctr(i ? 'far' : 'me');
      return [+(Math.hypot(a.x - K.x, a.y - K.y) / K.r).toFixed(2), +(Math.hypot(z.x - M.x, z.y - M.y) / M.r).toFixed(2)]; });
    return { waves, rcv, att, look: fig.getAttribute('data-look') }; });
  ok(wv.look === 'waves' && wv.waves > 0 && wv.rcv && wv.att.length === 2 && wv.att.every((x) => x[0] > 0.95 && x[0] < 1.4 && x[1] > 0.95 && x[1] < 1.5), 'while the Cloud is on, waves of signal run from the keeper along each link to a small sphere, which answers; each link is attached to both', wv);
  ok(r && r.rows.join('|') === 'Mac mini|This device (MacBook Pro)|iPhone' && r.steps[0].done && r.steps[1].done && r.steps[2].open, 'the devices in her Cloud are raised rows; steps 1 and 2 done; step 3 open', r && { rows: r.rows, steps: r.steps });
  await p.waitForFunction(() => !document.querySelector('#cloudCard .clx-links .lk-wave'), null, { timeout: 8000 }).catch(() => {});
  await p.click('#cloudCard .clx-orb.keep'); await sleep(350);
  await sleep(300); const pr = await p.evaluate(() => ({ rays: document.querySelectorAll('#cloudCard .clx-links .lk-wave').length, tip: (document.querySelector('#cloudCard .clx-figsay') || {}).textContent }));
  ok(pr.rays > 0 && /Mac mini keeps your Cloud/.test(pr.tip), 'pressing the keeper sends waves to both and says what it is in the line beneath', pr);
  /* 3. a choice waiting: an invented conversation in r394's own store */
  await p.evaluate(() => new Promise((res) => { const rq = indexedDB.open('ingenium_conflicts', 1); rq.onupgradeneeded = () => { if (!rq.result.objectStoreNames.contains('c')) rq.result.createObjectStore('c', { keyPath: 'id' }); };
    rq.onsuccess = () => { const t = rq.result.transaction('c', 'readwrite'); t.objectStore('c').put({ id: 'cft807', key: 'chat:t807', kind: 'chat', title: 'A reading list for the term', at: Date.now() - 120000, from: 'iPhone',
      mine: { title: 'A reading list for the term', messages: [{ text: 'Add the two chapters on memory, and move the seminar to Thursday.', at: Date.now() - 300000 }] }, theirs: { title: 'A reading list for the term', messages: [{ text: 'Add the chapter on memory.', at: Date.now() - 600000 }] } });
      t.oncomplete = () => res(); }; }));
  await p.evaluate(() => { try { IngConflicts.paint(); } catch (e) {} }); await sleep(1800);
  r = await room(p); const cf = await p.evaluate(() => { const c = document.querySelector('#cloudCard #clConf'); return c ? { inRight: !!c.closest('.clx-right'), rows: c.querySelectorAll('.cf-row').length, raised: c.querySelector('.cf-row') ? getComputedStyle(c.querySelector('.cf-row')).boxShadow !== 'none' : false } : null; });
  ok(r && r.s === 'choose' && /to choose/.test(r.counts.join('|')) && cf && cf.inRight && cf.rows === 1 && cf.raised && /one thing waits/.test(r.say || ''), 'a choice waiting: counted, raised in the right column, and named under the drawing', { s: r && r.s, counts: r && r.counts, cf, say: r && r.say });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(900);
  await p.evaluate(() => { const e = document.getElementById('cloudCard'); e.scrollIntoView({ block: 'start' }); }); await sleep(600);
  await p.screenshot({ path: path.join(OUT, 'cloud_choose_night.png') });
  /* 4. held still: Minimal motion runs no signal */
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await sleep(1500);
  let still = 0; for (let i = 0; i < 25; i++) { still = Math.max(still, await p.evaluate(() => document.querySelectorAll('#cloudCard .clx-links .lk-wave').length)); await sleep(200); }
  ok(still === 0, 'under Minimal motion no signal runs', still);
  ok(errs.length === 0, 'no page error (in step, a choice waiting)', errs); await ctx.close();
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
