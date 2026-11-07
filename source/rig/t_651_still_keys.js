// node rig/t_651_still_keys.js <Ingenium page url> <out dir>
// Ingenium 6.51, its second part (7 November 2026), in Chromium. Her words (7 November 2026): "The buttons inside of Ingenium still
// feels flat and are missing the popped out 3D animated look and effect and everything feels really freaking slow when I move my
// mouse around inside of the app." and "Please remove the 4 prompt buttons from the Chat's page ... please only keep the "Connect a
// service" and "Get a model" on there, it looks too crowded and cluttered at the moment." (modules/r248.js, r173.js, r244.js, r116.js,
// thoughts/thought_cloud.html, build_page.py)
//   - left alone, the page keeps still: no element is rewritten over three seconds on Chat, Home, Settings or Blend (Blend's step keys
//     rewrote themselves about 30 times a second on every page), and the browser recalculates its styles only a handful of times;
//   - the seal's star, heart, ring and breath rest, and move while the pointer is on the seal; no movement inside a picture runs by
//     itself (each frame of one painted the page again);
//   - Blend's steps still move (Next, Back, the current step), the who-answers key still says so, the thought cloud's number still counts;
//   - the keys: a shaded face by day (white to #ebe4f6), a lavender edge 2.5 px deep and soft casts; under the pointer a key rises 3 px
//     and its edge grows; pressed, it sinks 2 px; the night theme, Display's Flat depth and reduced motion keep their own ways;
//   - the empty Chat page has no ready-made ideas, and while nothing answers it shows Connect a service and Get a model;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
async function open(b, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(700);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  return { p, ctx, errs }; }
// what changes in the page by itself over ms milliseconds, by kind and place
const census = (p, ms) => p.evaluate((ms) => new Promise(res => { const C = new Map(), name = (n) => { if (n && n.nodeType === 3) n = n.parentNode; if (!n || !n.tagName) return '?'; let s = n.tagName.toLowerCase(); if (n.id) s += '#' + n.id; else if (n.classList && n.classList.length) s += '.' + [...n.classList].slice(0, 2).join('.'); return s; };
  const mo = new MutationObserver(l => l.forEach(m => { const k = m.type + (m.attributeName ? '[' + m.attributeName + ']' : '') + ' ' + name(m.target); C.set(k, (C.get(k) || 0) + 1); }));
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
  setTimeout(() => { mo.disconnect(); res([...C.entries()].sort((a, b) => b[1] - a[1])); }, ms); }), ms);
const inside = () => document.getAnimations().filter(a => { const t = a.effect && a.effect.target; return a.playState === 'running' && t instanceof SVGElement && !(t instanceof SVGSVGElement); }).map(a => a.animationName + ' ' + a.effect.target.getAttribute('class'));
(async () => {
  const b = await pw.chromium.launch();
  const A = await open(b); const p = A.p;
  // 1. left alone, the page keeps still
  const cdp = await A.ctx.newCDPSession(p); await cdp.send('Performance.enable');
  const met = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x => [x.name, x.value]));
  for (const pg of ['chat', 'home', 'settings', 'blend', 'guide']) {
    await p.evaluate((pg) => go(pg), pg); await p.waitForTimeout(2500); await p.mouse.move(700, 450); await p.waitForTimeout(600);
    const a = await met(); const c = await census(p, 3000); const z = await met();
    const n = c.reduce((s, x) => s + x[1], 0), styles = z.RecalcStyleCount - a.RecalcStyleCount;
    ok(n <= 6, 'left alone on ' + pg + ', nothing is rewritten over three seconds (' + n + ' changes)', c.slice(0, 8));
    ok(!c.some(([k]) => /rm-step|rm-stepnav|btn\.ghost|btn\.primary/.test(k)), 'Blend\'s step keys do not rewrite themselves (on ' + pg + ')', c.filter(([k]) => /rm-step|btn/.test(k)));
    ok(styles <= 36, 'on ' + pg + ' the browser works out its styles only now and then, not for every frame (' + styles + ' times in three seconds; a movement drawn by the main thread makes about 180)', styles);
  }
  // 2. the seal rests, and moves while it is pointed at
  await p.evaluate(() => go('chat')); await p.waitForTimeout(1200); await p.mouse.move(700, 450); await p.waitForTimeout(300);
  ok((await p.evaluate(inside)).length === 0, 'no movement inside a picture runs by itself', await p.evaluate(inside));
  const st = () => p.evaluate(() => [...document.querySelectorAll('#brandSealBtn .seal-spin, #brandSealBtn .seal-heart, #brandSealBtn .seal-counter, #brandSealBtn .s4-breath')]
    .map(e => (e.getAnimations()[0] || {}).playState || 'none'));
  const rest = await st();
  ok(rest.length >= 3 && rest.every(x => x === 'paused'), 'the seal\'s star, heart and ring rest', rest);
  const bb = await p.evaluate(() => { const r = document.getElementById('brandSealBtn').querySelector('svg').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(bb.x, bb.y); await p.waitForTimeout(400);
  const moving = await st();
  ok(moving.every(x => x === 'running'), 'pointed at, the seal moves', moving);
  await p.mouse.move(700, 450); await p.waitForTimeout(300);
  ok((await st()).every(x => x === 'paused'), 'and rests again when the pointer leaves', await st());
  // Home's app stones: their sparks rest, and come while the pointer is on a stone
  await p.evaluate(() => go('home')); await p.waitForTimeout(1000);
  const sp = () => p.evaluate(() => [...document.querySelectorAll('.hx-app .hx-stone')].map(e => { const a = e.getAnimations({ subtree: true }).find(x => x.animationName === 'hxGlitter'); return a ? a.playState : 'none'; }));
  const sp0 = await sp();
  ok(sp0.length > 0 && sp0.every(x => x === 'paused' || x === 'none') && sp0.some(x => x === 'paused'), 'Home\'s app stones keep their sparks still', sp0);
  const st0 = await p.evaluate(() => { const e = document.querySelector('.hx-app'); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.waitForTimeout(400); await p.mouse.move(st0.x, st0.y); await p.waitForTimeout(400);
  const sp1 = await sp();
  ok(sp1.some(x => x === 'running'), 'pointed at, a stone sparkles', sp1);
  await p.mouse.move(700, 120); await p.waitForTimeout(200);
  // the apps' own pages (in the editions that hold them): their keys' glow and sparks rest in the app's frame
  const hasTab = await p.evaluate(() => !!document.getElementById('page-tabula'));
  if (hasTab) {
    await p.evaluate(() => go('tabula')); await p.waitForTimeout(5000); await p.mouse.move(700, 120); await p.waitForTimeout(300);
    let run = []; for (const f of p.frames()) { if (f === p.mainFrame()) continue; try { run = run.concat(await f.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && /Glow|Glitter/.test(a.animationName || '')).map(a => a.animationName))); } catch (e) {} }
    ok(run.length === 0, 'in Tabula\'s frame, the app keys\' glow and sparks rest', run);
  } else console.log('(no Tabula page in this edition)');
  // 3. what the guards keep: Blend's steps still move, the who-answers key still says so, the thought cloud's number still counts
  await p.evaluate(() => go('blend')); await p.waitForTimeout(900);
  const s2 = await p.evaluate(() => { IngRooms.step(2); const cur = [...document.querySelectorAll('.rm-step')].findIndex(b => b.getAttribute('aria-current') === 'step') + 1; const nav = document.querySelector('.rm-stepnav');
    return { cur, back: !nav.querySelector('.rm-back').hidden, next: nav.querySelector('.rm-next').textContent, nextHidden: nav.querySelector('.rm-next').hidden }; });
  const s1 = await p.evaluate(() => { IngRooms.step(1); const nav = document.querySelector('.rm-stepnav'); return { cur: [...document.querySelectorAll('.rm-step')].findIndex(b => b.getAttribute('aria-current') === 'step') + 1, back: !nav.querySelector('.rm-back').hidden, next: nav.querySelector('.rm-next').textContent }; });
  ok(s2.cur === 2 && s2.back && !s2.nextHidden && s2.next && s1.cur === 1 && !s1.back && s1.next && s1.next !== s2.next, 'Blend\'s steps still move: the current step, Back and Next follow', { s2, s1 });
  const key = await p.evaluate(() => { go('chat'); const b = document.getElementById('chatModelBtn'), n = document.getElementById('chatModelName'); return { name: n && n.textContent, title: b && b.title, attn: b && b.classList.contains('wa-attn') }; });
  ok(/Choose who answers/.test(key.name || '') && /Nothing answers yet/.test(key.title || '') && key.attn, 'the who-answers key still says nothing answers yet', key);
  const badge = await p.evaluate(async () => { const before = (document.querySelector('#fabPark .tc-badge') || {}).textContent || '0'; IngInbox.tc.add('An invented thought for the test'); saveState(); await new Promise(r => setTimeout(r, 200));
    return { before, after: (document.querySelector('#fabPark .tc-badge') || {}).textContent, shown: !(document.querySelector('#fabPark .tc-badge') || {}).hidden }; });
  ok(+badge.after === +badge.before + 1 && badge.shown, 'the thought cloud\'s number still counts', badge);
  // 4. the keys
  await p.evaluate(() => go('chat')); await p.waitForTimeout(900);
  const tok = await p.evaluate(() => { const r = getComputedStyle(document.documentElement), t = document.getElementById('r248-tok'), t7 = document.getElementById('r247-tok');
    return { pop: r.getPropertyValue('--pop').trim(), edge: r.getPropertyValue('--key-edge').trim(), inHead: !!(t && t.parentNode === document.head), after: !!(t7 && t && (t7.compareDocumentPosition(t) & 4)) }; });
  // 6.53: Carpe Diem's recipe (modules/r251.js) follows 6.51's
  ok(/inset 0 -1\.5px 0 rgba\(16,\s*42,\s*58,\s*\.16\)/.test(tok.pop) && /0 2px 0 rgba\(16,\s*42,\s*58,\s*\.30?\)/.test(tok.pop) && /0 9px 14px rgba\(16,\s*42,\s*58,\s*\.13\)/.test(tok.pop) && !/93,\s*55,\s*161|#fff/.test(tok.pop),
    'the key (6.53): Carpe Diem\'s slate edge and casts, no lavender, no gloss line', tok);
  ok(tok.inHead && tok.after, 'the recipe sits in the head after 6.49\'s, where the Author Studio\'s look can follow it', tok);
  const k = await p.evaluate(() => { const b = document.getElementById('chatCtlBtn'); b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(), c = getComputedStyle(b); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, bg: c.backgroundImage, sh: c.boxShadow }; });
  ok(!/rgb\(235, 228, 246\)/.test(k.bg) && /rgb\(255, 255, 255\), rgb\(255, 255, 255\)|none/.test(k.bg), 'by day a key\'s face is flat white, as Carpe Diem\'s (6.53)', k.bg);
  ok(/rgba\(16, 42, 58, 0\.3\) 0px 2px 0px/.test(k.sh) && !/93, 55, 161|40, 22, 68/.test(k.sh), 'Controls stands on Carpe Diem\'s slate edge, with no purple in its shadow (6.53)', k.sh);
  await p.mouse.move(k.x, k.y); await p.waitForTimeout(500);
  const hov = await p.evaluate(() => { const c = getComputedStyle(document.getElementById('chatCtlBtn')); return { tr: c.transform, sh: c.boxShadow }; });
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(hov.tr) && /rgba\(16, 42, 58, 0\.3\) 0px 3px 0px/.test(hov.sh), 'under the pointer Controls rises 2 px and its edge grows to 3 px (6.53)', hov);
  const gm = await p.evaluate(() => { const b = document.querySelector('.wa-hello .btn.ghost'); if (!b) return null; b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; });
  if (gm) {
    await p.mouse.move(gm.x, gm.y); await p.waitForTimeout(500);
    const h2 = await p.evaluate(() => getComputedStyle(document.querySelector('.wa-hello .btn.ghost')).transform);
    await p.mouse.down(); await p.waitForTimeout(200);
    const d2 = await p.evaluate(() => getComputedStyle(document.querySelector('.wa-hello .btn.ghost')).transform);
    await p.mouse.move(5, 300); await p.mouse.up(); await p.waitForTimeout(300);
    const after = await p.evaluate(() => { const b = document.querySelector('.wa-hello .btn.ghost'), r = b.getBoundingClientRect(); return { w: r.width, h: r.height }; });
    ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(h2), 'Get a model rises 2 px under the pointer (6.53)', h2);
    ok(/matrix\(1, 0, 0, 1, 0, 1\)/.test(d2), 'pressed, it sits 1 px down, as Carpe Diem\'s (6.53)', d2);
    ok(Math.abs(after.w - gm.w) < .6 && Math.abs(after.h - gm.h) < .6, 'and it keeps its size', { before: gm, after });
  } else ok(false, 'Get a model is on the empty Chat page');
  // 5. the empty Chat page
  const hello = await p.evaluate(() => { go('chat'); try { document.getElementById('chatNew') && document.getElementById('chatNew').click(); } catch (e) {} const h = document.querySelector('#chatScroll .cc-hello');
    return { has: !!h, ideas: document.querySelectorAll('#page-chat .cc-idea').length, keys: h ? [...h.querySelectorAll('.wa-hello button')].map(b => b.textContent.trim()) : [], words: h ? h.textContent.replace(/\s+/g, ' ').slice(0, 300) : '' }; });
  ok(hello.has && hello.ideas === 0 && !/cover letter|study timer|Summarise a long document|notes into a report/.test(hello.words), 'the empty Chat page has no ready-made ideas', hello);
  ok(hello.keys.join('|') === 'Connect a service|Get a model', 'while nothing answers it shows Connect a service and Get a model', hello.keys);
  await p.screenshot({ path: OUT + '/chat_empty.png' });
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await A.ctx.close();
  // 6. night, Flat and reduced motion keep their own ways
  const N = await open(b); const n = N.p;
  const night = await n.evaluate(() => { document.body.setAttribute('data-theme', 'night'); go('chat'); const b = document.getElementById('chatCtlBtn'); return getComputedStyle(b).backgroundImage; });
  ok(!/rgb\(235, 228, 246\)/.test(night), 'at night a key keeps its own face', night);
  const flat = await n.evaluate(() => { document.body.setAttribute('data-theme', 'day'); document.body.setAttribute('data-depth', 'flat'); const b = document.getElementById('chatCtlBtn'); return { bg: getComputedStyle(b).backgroundImage, pop: getComputedStyle(document.body).getPropertyValue('--pop') }; });
  ok(!/rgb\(235, 228, 246\)/.test(flat.bg) && !/key-edge|93,\s*55,\s*161/.test(flat.pop), 'Display\'s Flat depth keeps every key flat', flat);
  await N.ctx.close();
  const R = await open(b, { reducedMotion: 'reduce' }); const r = R.p;
  await r.evaluate(() => go('chat')); await r.waitForTimeout(700);
  const g3 = await r.evaluate(() => { const b = document.querySelector('.wa-hello .btn.ghost'); if (!b) return null; const q = b.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; });
  if (g3) { await r.mouse.move(g3.x, g3.y); await r.waitForTimeout(400); }
  const rm = await r.evaluate(() => { const b = document.querySelector('.wa-hello .btn.ghost'); return b ? getComputedStyle(b).transform : 'none'; });
  ok(rm === 'none', 'with reduced motion a key keeps still under the pointer', rm);
  await R.ctx.close();
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
