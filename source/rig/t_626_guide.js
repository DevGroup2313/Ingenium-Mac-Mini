// The Guide in rooms, with its topics as tiles and What's new in a key (Ingenium 6.26; modules/r230.js and the Guide's rooms in
// modules/r173.js). Her words (5 November 2026): "Please make the "What is new card on the Guide collapsible from view and folded inside
// of a cute popped out animated 3D button rather than this long list that is taking up half the page and overwhelming me. In fact, the
// entire Guide page looks like a very long document that does not match the rest of Ingenium and its graphics and designs. I want it
// rededesigned and reorganised to better fit the app. I want to see sections and animated 3D styling".
//   node rig/t_626_guide.js <Ingenium page url> <out folder> [master|full|gift|demo]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, ED = 'master'] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1500))); c ? pass++ : fail++; };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(500); await p.evaluate(() => go('guide')); await p.waitForTimeout(1200);
  const master = ED === 'master', career = ED === 'master' || ED === 'full';

  /* 1. rooms, each holding its own topics; What is new in none of them */
  const R = await p.evaluate(() => ({ rooms: IngRooms.rooms('guide').filter(r => r.shown).map(r => r.name), says: IngRooms.rooms('guide').map(r => r.says).join(' | '),
    filed: Object.fromEntries([...document.querySelectorAll('#page-guide .rm-panel')].map(pn => [pn.getAttribute('data-room'), [...pn.children].filter(c => c.classList.contains('card')).map(c => c.id && !/^gdTopic/.test(c.id) ? c.id : ((c.querySelector('.gd-t,h2,h3') || {}).textContent || '').slice(0, 18))])),
    wnInRoom: !!document.querySelector('#page-guide .rm-panel #wnGuide'), wnShown: (() => { const w = document.getElementById('wnGuide'); return !!(w && w.offsetParent); })() }));
  ok(R.rooms.join('|') === 'Start here|Chat and Code|Models and devices|Making and study|Around the app', 'the Guide has five rooms, in order', R.rooms);
  const want = { start: ['guideTourCard', 'What Ingenium is', 'Honest limits'], chatcode: ['guideEffortCard', 'cnGuide', 'ghxGuide', 'envGuide'], models: ['mdGuide', 'How much model eac', 'Ingenium as an app'],
    making: ['blxGuide', 'fdGuide'].concat(career ? ['csGuide'] : []).concat(['Focus: support tha']), around: ['The right rail', 'The instruments'].concat(master ? ['wsGuide'] : []) };
  // which of two cards added by modules lands first in a room depends on which module adds it first, so each room is compared as a set
  const same = (a, b) => JSON.stringify((a || []).slice().sort()) === JSON.stringify(b.slice().sort());
  const filedOk = Object.keys(want).every(k => same(R.filed[k], want[k])) && R.filed.start[0] === 'guideTourCard' && (R.filed.more || []).length === 0;
  ok(filedOk, 'every topic is in its room, and nothing is left over in More', R.filed);
  ok(!R.wnInRoom && !R.wnShown, 'What is new is no longer a card on the page', R);
  ok((career ? /the Career Studio/.test(R.says) : !/Career Studio/.test(R.says)) && (master ? /Author Studio/.test(R.says) : !/Author Studio/.test(R.says)), 'the rooms\' lines name only what this edition carries', R.says);

  /* 2. no long document: each room is about a window tall (6.25: 6,408 pixels) */
  const H = {}; for (const r of ['start', 'chatcode', 'models', 'making', 'around']) { await p.click('#rmT-guide-' + r); await p.waitForTimeout(450); H[r] = await p.evaluate(() => document.scrollingElement.scrollHeight); }
  ok(Object.values(H).every(h => h <= 1700), 'each room is at most 1,700 pixels tall at 1440 by 900 (the whole Guide was 6,408)', H);

  /* 3. the topics are raised tiles: a mark, the title, the first sentence, folded */
  await p.click('#rmT-guide-start'); await p.waitForTimeout(400);
  const T = await p.evaluate(() => [...document.querySelectorAll('#page-guide .gd-tile')].map(c => { const h = c.querySelector(':scope > .gd-head'), o = c.querySelector(':scope > .gd-orig');
    return { id: c.id, head: !!h, exp: h && h.getAttribute('aria-expanded'), mark: !!(h && h.querySelector('.gd-mark svg')), title: h ? h.querySelector('.gd-t').textContent : '', orig: o ? o.textContent.trim() : '', sum: h ? h.querySelector('.gd-s').textContent : '' }; }));
  ok(T.length >= (master ? 15 : 13) && T.every(t => t.head && t.exp === 'false' && t.mark && t.title === t.orig && t.sum.length > 12 && /^[A-Z0-9“"‘']/.test(t.sum)), 'every topic is a folded tile with a mark, its own title and its first sentence (no stray marks)', T.filter(t => !(t.head && t.exp === 'false' && t.mark && t.title === t.orig && t.sum.length > 12 && /^[A-Z0-9“"‘']/.test(t.sum))).concat([{ n: T.length }]));
  const tour = await p.evaluate(() => { const c = document.getElementById('guideTourCard'), r = c.getBoundingClientRect(); return { feature: c.classList.contains('gd-feature'), tile: c.classList.contains('gd-tile'), w: Math.round(r.width), key: !!c.querySelector('.btn.primary') }; });
  ok(tour.feature && !tour.tile && tour.w > 1000 && tour.key, 'the tour\'s own card stays open, across the room, first in Start here', tour);
  await p.screenshot({ path: OUT + '/start.png' });

  /* 4. pressed, a tile opens across the room; one topic open at a time; pressed again, it folds */
  await p.click('#rmT-guide-chatcode'); await p.waitForTimeout(400);
  await p.click('#cnGuide .gd-head'); await p.waitForTimeout(500);
  const o1 = await p.evaluate(() => { const c = document.getElementById('cnGuide'), r = c.getBoundingClientRect(), dt = c.querySelector('dt'); return { exp: c.querySelector('.gd-head').getAttribute('aria-expanded'), w: Math.round(r.width), dt: dt ? Math.round(dt.getBoundingClientRect().height) : 0, text: c.innerText.length }; });
  ok(o1.exp === 'true' && o1.w > 1000 && o1.dt > 10 && o1.text > 500, 'pressed, Connectors opens across the room with all it says', o1);
  await p.click('#guideEffortCard .gd-head'); await p.waitForTimeout(500);
  const o2 = await p.evaluate(() => ({ eff: document.querySelector('#guideEffortCard .gd-head').getAttribute('aria-expanded'), cn: document.querySelector('#cnGuide .gd-head').getAttribute('aria-expanded'), cnDt: Math.round((document.querySelector('#cnGuide dt') || { getBoundingClientRect: () => ({ height: 0 }) }).getBoundingClientRect().height) }));
  ok(o2.eff === 'true' && o2.cn === 'false' && o2.cnDt === 0, 'opening another topic folds the one before: one open at a time', o2);
  await p.screenshot({ path: OUT + '/open.png' });
  await p.click('#guideEffortCard .gd-head'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelector('#guideEffortCard .gd-head').getAttribute('aria-expanded')) === 'false', 'pressed again, it folds away');
  const kb = await p.evaluate(async () => { const h = document.querySelector('#ghxGuide .gd-head'); h.focus(); return document.activeElement === h; });
  await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  ok(kb && await p.evaluate(() => document.querySelector('#ghxGuide .gd-head').getAttribute('aria-expanded')) === 'true', 'a tile opens from the keyboard too (Enter)');
  await p.keyboard.press('Enter'); await p.waitForTimeout(300);

  /* 5. 3D and animated: they rise in, lift under the pointer; still when motion is set to minimal */
  const an = await p.evaluate(() => { const t = document.querySelector('#page-guide .rm-panel:not([hidden]) .gd-tile'), k = document.getElementById('gdNewKey');
    return { rise: getComputedStyle(t).animationName, twinkle: getComputedStyle(k.querySelector('.gd-spark svg')).animationName }; });
  const box = await p.evaluate(() => { const r = document.querySelector('#envGuide .gd-head').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  const before = await p.evaluate(() => getComputedStyle(document.getElementById('envGuide')).transform);
  await p.mouse.move(box.x, box.y); await p.waitForTimeout(450);
  const lifted = await p.evaluate(() => getComputedStyle(document.getElementById('envGuide')).transform); await p.mouse.move(5, 5);
  ok(an.rise === 'gdRise' && an.twinkle === 'gdTwinkle', 'tiles rise in; the key\'s small gold spark turns now and then', an);
  /* her words, the same day: "The "What's new" button is way too bulky and looks too bright and odd against the rest of the app on both
     light and dark mode": it is one of the page's own raised keys now, beside "Show the whole guide at once" */
  const fam = await p.evaluate(() => { const k = document.getElementById('gdNewKey'), a = document.getElementById('rmAll-guide'), ks = getComputedStyle(k), as = getComputedStyle(a);
    return { bg: ks.backgroundImage === as.backgroundImage, shadow: ks.boxShadow === as.boxShadow, radius: ks.borderRadius === as.borderRadius, border: ks.borderTopColor === as.borderTopColor,
      h: Math.round(k.getBoundingClientRect().height), ah: Math.round(a.getBoundingClientRect().height), w: Math.round(k.getBoundingClientRect().width), ink: ks.color }; });
  ok(fam.bg && fam.shadow && fam.radius && fam.border && Math.abs(fam.h - fam.ah) <= 2 && fam.w < 200 && !/255, 255, 255/.test(fam.ink), 'the key is one of the page\'s own raised keys: the same face, rim, shadow and corners, as tall as its neighbour, no wider than 200 pixels, its words in ink', fam);
  ok(/matrix\(1, 0, 0, 1, 0, -[1-3]/.test(lifted) && lifted !== before, 'a tile lifts under the pointer', { before, lifted });
  const still = await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); const t = document.querySelector('#page-guide .rm-panel:not([hidden]) .gd-tile'), k = document.getElementById('gdNewKey');
    const r = { rise: getComputedStyle(t).animationName, spark: getComputedStyle(k.querySelector('.gd-spark svg')).animationName }; document.body.removeAttribute('data-motion'); return r; });
  ok(still.rise === 'none' && still.spark === 'none', 'with motion set to minimal, nothing moves', still);

  /* 6. What's new, folded into a key beside the title */
  const K = await p.evaluate(() => { const k = document.getElementById('gdNewKey'), h1 = document.querySelector('#page-guide > .page-title'), s = document.getElementById('page-guide');
    const kr = k.getBoundingClientRect(), hr = h1.getBoundingClientRect(), sr = s.getBoundingClientRect();
    return { ver: k.querySelector('.gd-ver').textContent, app: ING_VERSION, dot: !k.querySelector('.gd-dot').hidden, exp: k.getAttribute('aria-expanded'), popup: k.getAttribute('aria-haspopup'),
      top: Math.round(kr.top - hr.top), right: Math.round(sr.right - kr.right), h: Math.round(kr.height), label: k.getAttribute('aria-label'), h1: h1.textContent }; });
  ok(K.ver === K.app && K.dot && K.exp === 'false' && K.popup === 'dialog' && Math.abs(K.top) < 40 && K.right >= 0 && K.right < 40 && K.h >= 34 && K.h <= 42 && /not opened yet/.test(K.label) && K.h1 === 'Guide',
    'a key beside the title shows the newest version, with a small gold dot until it is opened', K);
  await p.click('#gdNewKey'); await p.waitForTimeout(600);
  const P = await p.evaluate(() => { const pop = document.getElementById('gdNewPop'), k = document.getElementById('gdNewKey'), gs = [...pop.querySelectorAll('.gd-v')];
    return { shown: !pop.hidden && pop.getBoundingClientRect().height > 200, role: pop.getAttribute('role'), exp: k.getAttribute('aria-expanded'), groups: gs.length, first: gs[0] && gs[0].classList.contains('open'), firstItems: gs[0] ? gs[0].querySelectorAll('li').length : 0,
      restShut: gs.slice(1).every(g => !g.classList.contains('open')), earlier: !!pop.querySelector('.gd-earlier'), focus: pop.contains(document.activeElement), run: (pop.querySelector('.gd-run') || {}).textContent || '',
      dot: k.querySelector('.gd-dot').hidden, seen: localStorage.getItem('ing.guide.seen.v1'), v0: (gs[0] && gs[0].querySelector('b') || {}).textContent }; });
  ok(P.shown && P.role === 'dialog' && P.exp === 'true' && P.groups >= 10 && P.first && P.firstItems >= 1 && P.restShut && P.earlier && P.focus, 'pressed, a card springs out: the newest version open, every earlier one a line of its own, the focus inside', P);
  ok(/^You are running Version 6\.\d+/.test(P.run) && P.dot && P.seen === P.v0, 'its foot says which version is running, and the gold dot goes once it has been opened', P);
  await p.screenshot({ path: OUT + '/whats_new.png' });
  const g2 = await p.evaluate(async () => { const g = document.querySelectorAll('#gdNewPop .gd-v')[2]; g.querySelector('.gd-vh').click(); await new Promise(r => setTimeout(r, 300));
    return { open: g.classList.contains('open'), exp: g.querySelector('.gd-vh').getAttribute('aria-expanded'), li: Math.round(g.querySelector('li').getBoundingClientRect().height) }; });
  ok(g2.open && g2.exp === 'true' && g2.li > 10, 'an earlier version opens when pressed', g2);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const esc = await p.evaluate(() => ({ hidden: document.getElementById('gdNewPop').hidden, focus: document.activeElement && document.activeElement.id, exp: document.getElementById('gdNewKey').getAttribute('aria-expanded') }));
  ok(esc.hidden && esc.focus === 'gdNewKey' && esc.exp === 'false', 'Escape folds it away and gives the focus back to the key', esc);
  await p.click('#gdNewKey'); await p.waitForTimeout(400); await p.click('#page-guide > .page-title'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.getElementById('gdNewPop').hidden), 'a press outside it folds it away too');

  /* 7. Find in the guide, and anything that points inside a folded topic, opens its room and the topic */
  await p.fill('#rmFind-guide', 'lending'); await p.waitForTimeout(500);
  const hits = await p.evaluate(() => [...document.querySelectorAll('#rmFindOut-guide .rm-hit')].map(h => h.innerText.replace(/\s+/g, ' ')));
  await p.press('#rmFind-guide', 'Enter'); await p.waitForTimeout(800);
  const fh = await p.evaluate(() => { const c = [...document.querySelectorAll('#page-guide .gd-tile')].find(t => /How much model/.test(t.querySelector('.gd-t').textContent)); return { room: IngRooms.current('guide'), open: c && c.classList.contains('gd-open'), focus: document.activeElement && document.activeElement.classList.contains('gd-head') }; });
  ok(hits.length >= 1 && /in Models and devices/.test(hits[0]) && fh.room === 'models' && fh.open && fh.focus, 'Find in the guide: "lending" finds How much model each device carries; Enter opens its room and the topic', { hits, fh });
  const rv = await p.evaluate(async () => { const t = [...document.querySelectorAll('#page-guide .gd-tile')].find(c => /The instruments/.test(c.querySelector('.gd-t').textContent)); const inner = t.querySelector('.tip');
    IngRooms.reveal(inner, {}); await new Promise(r => setTimeout(r, 500)); return { room: IngRooms.current('guide'), open: t.classList.contains('gd-open'), h: Math.round(inner.getBoundingClientRect().height) }; });
  ok(rv.room === 'around' && rv.open && rv.h > 10, 'a part inside a folded topic in another room, reached from elsewhere, opens the room and the topic', rv);

  /* 8. Show the whole guide at once: one long page, every topic open; back in rooms, every topic folded */
  await p.click('#rmAll-guide'); await p.waitForTimeout(700);
  const all = await p.evaluate(() => ({ open: [...document.querySelectorAll('#page-guide .gd-tile')].every(t => t.classList.contains('gd-open')), h: document.scrollingElement.scrollHeight, label: document.querySelector('#rmAll-guide span').textContent }));
  await p.click('#rmAll-guide'); await p.waitForTimeout(700);
  const back = await p.evaluate(() => ({ shut: [...document.querySelectorAll('#page-guide .gd-tile')].every(t => !t.classList.contains('gd-open')), label: document.querySelector('#rmAll-guide span').textContent }));
  ok(all.open && all.h > 3500 && all.label === 'Show the guide in rooms' && back.shut && back.label === 'Show the whole guide at once', 'Show the whole guide at once opens every topic; back in rooms they fold again', { all, back });

  /* 9. by night */
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); }); await p.click('#rmT-guide-models'); await p.waitForTimeout(600);
  const nt = await p.evaluate(() => { const t = document.querySelector('#page-guide .rm-panel:not([hidden]) .gd-t'), k = document.getElementById('gdNewKey'), a = document.getElementById('rmAll-guide');
    return { title: getComputedStyle(t).color, key: getComputedStyle(k.querySelector('.gd-lab')).color, same: getComputedStyle(k).backgroundImage === getComputedStyle(a).backgroundImage }; });
  const light = c => /rgb\((2[0-4][0-9]|1[89][0-9]|25[0-5]), ?(2[0-4][0-9]|1[89][0-9]|25[0-5]), ?(2[0-4][0-9]|1[89][0-9]|25[0-5])\)/.test(c);
  ok(light(nt.title) && light(nt.key) && nt.same, 'by night the titles and the key\'s words read light, and the key wears the night face of its neighbours', nt);
  await p.screenshot({ path: OUT + '/night.png' }); await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));

  /* 10. on a phone: nothing past the edge; the card rises from the foot, above the side keys */
  const q = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage(); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 200)));
  await q.goto(URL_); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await q.waitForTimeout(1200);
  await q.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('guide'); }); await q.waitForTimeout(900);
  await q.evaluate(() => document.getElementById('gdNewKey').click()); await q.waitForTimeout(700);
  const ph = await q.evaluate(() => { const pop = document.getElementById('gdNewPop'), r = pop.getBoundingClientRect(); const pts = [[r.right - 18, r.top + r.height * 0.5], [r.right - 18, r.top + r.height * 0.75], [r.left + 30, r.top + 40]];
    return { over: document.scrollingElement.scrollWidth - innerWidth, inView: r.left >= 0 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1 && r.top >= 0, onTop: pts.every(([x, y]) => pop.contains(document.elementFromPoint(x, y))) }; });
  await q.screenshot({ path: OUT + '/phone_whats_new.png' });
  ok(ph.over <= 1 && ph.inView && ph.onTop, 'on a phone the card fits the screen and nothing is drawn over it (the side keys stay beneath)', ph);

  ok(errs.length === 0, 'no error on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
