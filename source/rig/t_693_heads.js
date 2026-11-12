// node rig/t_693_heads.js <Ingenium page url> <out dir> [release]
// Ingenium 6.93 (12 November 2026): the heads of Focus and Lector (modules/r284.js, r287.js), approved by the owner on their pictures
// ("I approve of the Lector and Focus page designs"). In Chromium:
//   - Focus: its head holds the page's own title and words, Begin (the routine the hour suits) or Open Today, and Your routines; the
//     time and what the hour is good for beside the sphere; the sphere is drawn, moves while seen, stills under a mouse and in Minimal
//     motion, and pressed it opens Today; Your routines brings the routines into view;
//   - Lector: its head holds the title, its words, Start reading (named as the brief's own key) and Add your apps; the fan shows the
//     documents The document names, the one shown in front; pressing a sheet behind shows it in The document and brings it to the
//     front; the three panels keep the window's height under the head;
//   - both: night draws them again; left alone, nothing is rewritten over three seconds and styles are worked out only now and then;
//     at a phone's width the scene stands under the words and the page does not scroll sideways; no page error;
//   - with "release": the held heads (the Career Studio's dial, Fabrica's tree, Build's prism) are not in the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, MODE] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const census = (p, ms) => p.evaluate((ms) => new Promise(res => { const C = new Map(), name = (n) => { if (n && n.nodeType === 3) n = n.parentNode; if (!n || !n.tagName) return '?'; let s = n.tagName.toLowerCase(); if (n.id) s += '#' + n.id; else if (n.classList && n.classList.length) s += '.' + [...n.classList].slice(0, 2).join('.'); return s; };
  const mo = new MutationObserver(l => l.forEach(m => { const k = m.type + (m.attributeName ? '[' + m.attributeName + ']' : '') + ' ' + name(m.target); C.set(k, (C.get(k) || 0) + 1); }));
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res([...C.entries()].sort((a, b) => b[1] - a[1])); }, ms); }), ms);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(600);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable');
  const met = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x => [x.name, x.value]));
  const inked = (sel) => p.evaluate((sel) => { const c = document.querySelector(sel); if (!c || !c.width) return 0; const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 64) if (d[i] > 20) n++; return n; }, sel);
  const sum = (sel) => p.evaluate((sel) => { const c = document.querySelector(sel); if (!c || !c.width) return 0; const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height).data; let s = 0; for (let i = 0; i < d.length; i += 97) s = (s + d[i] * (i % 13 + 1)) % 1e9; return s; }, sel);
  // left alone: nothing is rewritten; a head moved by the browser alone (Lector's) works out styles only now and then; a head drawn on a
  // canvas (Focus's) is drawn thirty times a second at most, with little script (what its frames cost to paint depends on the machine's
  // graphics: the cloud machines these tests run on have none, so that is not measured here)
  const still = async (pg, drawn) => { await p.mouse.move(700, 880); await p.waitForTimeout(800); const a = await met(); const c = await census(p, 3000); const z = await met();
    const n = c.reduce((s, x) => s + x[1], 0); ok(n <= 6, 'left alone on ' + pg + ', nothing is rewritten over three seconds (' + n + ' changes)', c.slice(0, 8));
    const st = z.RecalcStyleCount - a.RecalcStyleCount, sc = Math.round((z.ScriptDuration - a.ScriptDuration) * 1000);
    if (drawn) ok(st <= 100 && sc <= 200, 'on ' + pg + ' the scene is drawn thirty times a second at most, with little script (' + st + ' frames, ' + sc + ' ms of script in three seconds)', { st, sc });
    else ok(st <= 36, 'on ' + pg + ' styles are worked out only now and then (' + st + ' in three seconds)', st); };

  // ---------- Focus ----------
  await p.evaluate(() => { go('focus'); document.querySelector('main.main').scrollTop = 0; }); await p.waitForTimeout(1600);
  const f = await p.evaluate(() => { const h = document.querySelector('#page-focus > .hd-head'); return { head: !!h, title: !!(h && h.querySelector('.hd-words > .page-title')), lede: !!(h && h.querySelector('.hd-words > .lede')),
    begin: (document.getElementById('hdFocusBegin') || {}).textContent || '', routines: (document.getElementById('hdFocusRoutines') || {}).textContent || '', st: IngHeads.focus.state() }; });
  ok(f.head && f.title && f.lede, 'Focus: the head holds the page\'s own title and words', f);
  ok(/^(Begin .+|Open Today)$/.test(f.begin) && f.routines === 'Your routines', 'Focus: Begin the routine the hour suits (or Open Today), and Your routines', [f.begin, f.routines]);
  ok(f.st.tag && /\d{1,2}:\d{2}/.test(f.st.tag[0]) && f.st.tag[1].length > 4, 'Focus: the time beside the sphere, and what the hour is good for', f.st.tag);
  ok((await inked('#page-focus .hd-cv')) > 2000, 'Focus: the sphere is drawn');
  const s1 = await sum('#page-focus .hd-cv'); await p.waitForTimeout(700); const s2 = await sum('#page-focus .hd-cv');
  ok(f.st.running && s1 !== s2, 'Focus: the sphere moves while it is seen', { running: f.st.running });
  const sp = await p.evaluate(() => { const e = document.getElementById('hdFocusSphere').getBoundingClientRect(); return { x: e.x + e.width / 2, y: e.y + e.height / 2 }; });
  await p.mouse.move(sp.x, sp.y); await p.waitForTimeout(1600); const held = await p.evaluate(() => IngHeads.focus.state());
  ok(held.hold && held.amp < .05, 'Focus: pointed at, the sphere comes to rest', held);
  await p.mouse.click(sp.x, sp.y); await p.waitForTimeout(700);
  ok(await p.evaluate(() => window.IngFocusParts ? IngFocusParts.show() === 'today' : false), 'Focus: pressed, the sphere opens Today');
  await p.evaluate(() => { IngFocusParts.show('work', true); document.querySelector('main.main').scrollTop = 0; }); await p.waitForTimeout(300);
  await p.click('#hdFocusRoutines'); await p.waitForTimeout(1500);
  ok(await p.evaluate(() => { const r = document.getElementById('fxRoutinesHost'); if (!r || !r.offsetParent) return false; const b = r.getBoundingClientRect(); return IngFocusParts.show() === 'today' && b.top < innerHeight && b.bottom > 0; }), 'Focus: Your routines opens Today and brings the routines into view');
  await p.evaluate(() => { document.querySelector('main.main').scrollTop = 0; }); await p.waitForTimeout(400);
  await still('Focus', true);
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); }); await p.waitForTimeout(300);
  ok(!(await p.evaluate(() => IngHeads.focus.state().running)), 'Focus: in Minimal motion the sphere stops at once');
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'calm'); }); await p.waitForTimeout(300);
  const d1 = await sum('#page-focus .hd-cv'); await p.evaluate(() => { state.theme = 'night'; applyTheme(); document.body.setAttribute('data-theme', 'night'); }); await p.waitForTimeout(600);
  ok(d1 !== await sum('#page-focus .hd-cv'), 'Focus: by night the sphere is drawn in the night\'s colours');
  await p.screenshot({ path: OUT + '/focus_night.png' });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); document.body.setAttribute('data-theme', 'day'); }); await p.waitForTimeout(300);

  // ---------- Lector ----------
  if (await p.evaluate(() => !!document.getElementById('page-lector'))) {
    await p.evaluate(() => { go('lector'); document.querySelector('main.main').scrollTop = 0; }); await p.waitForTimeout(1800);
    const l = await p.evaluate(() => { const h = document.querySelector('#page-lector > .hd-head'), tabs = [...document.querySelectorAll('#l7Dtabs button')].map(x => ({ t: x.textContent.trim(), on: x.getAttribute('aria-selected') === 'true' }));
      return { head: !!h, title: !!(h && h.querySelector('.hd-words > .page-title')), lede: h ? (h.querySelector('.hd-lede') || {}).textContent : '', start: (document.getElementById('hdLectorStart') || {}).textContent || '',
        brief: ((document.querySelector('#l7BriefF button.next') || {}).textContent || '').trim(), add: (document.getElementById('hdLectorAdd') || {}).textContent || '', st: IngHeads.lector.state(), tabs,
        room: document.getElementById('lx7').getBoundingClientRect().height, main: document.querySelector('main.main').getBoundingClientRect().top }; });
    ok(l.head && l.title && /part by part/.test(l.lede), 'Lector: the head holds the title and Lector\'s own words', { head: l.head, title: l.title, lede: l.lede });
    ok(l.start.trim() === (l.brief || 'Start reading') && /Add your apps/.test(l.add), 'Lector: Start reading (named as the brief\'s own key) and Add your apps', [l.start, l.brief, l.add]);
    const front = l.st.cards.find(c => c.pos === 'f'), shown = l.tabs.find(t => t.on);
    ok(l.tabs.length >= 2 && front && shown && front.name === shown.t, 'Lector: the fan shows the documents The document names, the one shown in front', { cards: l.st.cards, tabs: l.tabs });
    ok(Math.abs(l.room - Math.max(440, Math.floor(900 - l.main - 24))) <= 2, 'Lector: the three panels keep the window\'s height under the head (' + Math.round(l.room) + ' px)', l);
    const back = l.st.cards.find(c => c.pos === 'l' && !c.hidden) || l.st.cards.find(c => c.pos === 'r' && !c.hidden);
    const bp = await p.evaluate((pos) => { const e = document.querySelector('#page-lector .lf-card.lf-' + pos).getBoundingClientRect(); return { x: e.x + e.width * (pos === 'l' ? .2 : .8), y: e.y + e.height * .55 }; }, back.pos);
    await p.mouse.move(bp.x, bp.y); await p.waitForTimeout(700);
    ok(await p.evaluate(() => getComputedStyle(document.querySelector('#page-lector .lf')).getPropertyValue('transform') !== 'none' && document.querySelector('#page-lector .lf').classList.contains('lf-hold')), 'Lector: pointed at, the fan keeps still and leans toward the mouse');
    await p.mouse.click(bp.x, bp.y); await p.waitForTimeout(1200);
    const after = await p.evaluate(() => ({ tabs: [...document.querySelectorAll('#l7Dtabs button')].map(x => ({ t: x.textContent.trim(), on: x.getAttribute('aria-selected') === 'true' })), st: IngHeads.lector.state() }));
    const nowShown = after.tabs.find(t => t.on), nowFront = after.st.cards.find(c => c.pos === 'f');
    ok(nowShown && nowShown.t === back.name && nowFront && nowFront.name === back.name, 'Lector: a sheet pressed is shown in The document and comes to the front', { back, after });
    await p.evaluate(() => { document.querySelector('main.main').scrollTop = 0; }); await p.waitForTimeout(500);
    await still('Lector');
    await p.evaluate(() => { state.theme = 'night'; applyTheme(); document.body.setAttribute('data-theme', 'night'); }); await p.waitForTimeout(600);
    ok(await p.evaluate(() => getComputedStyle(document.querySelector('#page-lector .lf-sheet')).backgroundColor !== 'rgb(253, 252, 255)'), 'Lector: by night the sheets take the night\'s paper');
    await p.screenshot({ path: OUT + '/lector_night.png' });
    await p.evaluate(() => { state.theme = 'day'; applyTheme(); document.body.setAttribute('data-theme', 'day'); }); await p.waitForTimeout(300);
  } else console.log('note: this edition has no Lector page');

  // ---------- at a phone's width ----------
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(900);
  for (const pg of ['focus', 'lector']) {
    if (!(await p.evaluate((pg) => !!document.getElementById('page-' + pg), pg))) continue;
    await p.evaluate((pg) => { go(pg); document.querySelector('main.main').scrollTop = 0; }, pg); await p.waitForTimeout(1200);
    const r = await p.evaluate((pg) => { const pa = document.getElementById('page-' + pg), sc = pa.querySelector('.hd-scene'), w = pa.querySelector('.hd-words'); const a = sc.getBoundingClientRect(), z = w.getBoundingClientRect();
      return { stack: pa.classList.contains('hd-stack'), under: a.top >= z.top + 40, wide: Math.max(document.documentElement.scrollWidth, document.querySelector('main.main').scrollWidth) - innerWidth, right: Math.round(a.right) }; }, pg);
    ok(r.stack && r.under && r.wide <= 1 && r.right <= 390, pg + ' at a phone\'s width: the scene stands under the words and nothing runs off the side', r);
  }
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(600);

  // ---------- the release leaves the held heads out ----------
  if (MODE === 'release') {
    const h = await p.evaluate(() => ({ dial: !!window.__r286, tree: !!window.__r288, prism: !!window.__r289, counsel: !!window.IngCounsel, career: !!document.querySelector('#page-career > .hd-head'), fabrica: !!document.querySelector('#page-fabrica > .hd-head'), build: !!document.querySelector('#page-build > .hd-head') }));
    ok(!h.dial && !h.tree && !h.prism && !h.counsel && !h.career && !h.fabrica && !h.build, 'the release leaves out the heads still held (the dial, the tree, the prism) and the counsellor', h);
  }
  ok(errs.length === 0, 'no page errors', errs);
  console.log(pass + '/' + (pass + fail) + ' checks passed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
