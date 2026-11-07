// node rig/t_649_keys.js <Ingenium page url> <out dir> [ref=<the page of an earlier version, to compare sizes with>]
// Ingenium 6.49 (7 November 2026), in Chromium. Her words (6 November 2026): "I don't want the buttons to be made bigger or wider.
// I just want them to look more weighted and 3D animated. I want them to look like clickable buttons and not just flat." Then:
// "Please reduce the heavyness of the buttons, it looks a little too intense and take away from the look of the app. I want it to
// look elevated and refined." (modules/r247.js; the Author Studio's Soft and Deep in modules/r236.js)
//   - every kind of key rests on the new recipe: a fine outline (half a pixel), a thin edge beneath (1.5 px at 18 %) and a soft,
//     wide lift; the top bar's pills on their own lighter recipe; Home's large keys, Lector's, Fabrica's and the Career Studio's
//     keys follow the same recipe;
//   - keys that were words or bare outlines (Chat's plus key and ideas, Lector's Copy, Home's See all) are raised keys now;
//   - no key is bigger or wider than before (when an earlier page is given, every measured key has the same width and height);
//   - under the pointer a key rises 2 px and its edge grows; pressed, it sinks 1 px, a little smaller, in 0.05 s;
//   - the Author Studio's Deep is heavier than the new own look and Soft lighter, and its choice wins over the new recipe;
//   - Display's Flat depth and the night theme keep their own faces; reduced motion keeps every key still;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const REF = (args.find(a => a.startsWith('ref=')) || '').slice(4); const [URL_, OUT] = args.filter(a => !a.startsWith('ref='));
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
// the keys measured on each page: [page, selector, label]
const KEYS = [['settings', '#page-settings .btn:not(.primary)', 'a Settings key'], ['settings', '.cl-key#displayBtn', 'the top bar\'s Display'],
  ['settings', '.cl-key#statusPill', 'the top bar\'s status'], ['chat', '.chat-top-key#chatCtlBtn', 'Chat\'s Controls'], ['chat', '#chatImgBtn', 'Chat\'s plus key'],
  ['chat', '.cc-idea', 'an idea on an empty chat'], ['home', '.hx-key', 'a large Home key'], ['home', '.hx-btn.quiet', 'Home\'s See all'],
  ['lector', '#lx7 .l-btn.quiet', 'a quiet Lector key'], ['lector', '#lx7 .l-btn:not(.quiet):not(.pri)', 'a Lector key'], ['career', '#cs .c-btn:not(.pri), #cs button.c-key', 'a Career Studio key']];
async function open(b, url, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {})); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(700);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  return { p, ctx, errs }; }
async function measure(p) { const out = {};
  for (const [pg, sel, label] of KEYS) {
    // a room this edition does not have (the gift and demo editions hold no Lector, Fabrica or Career Studio) is left out
    if (!(await p.evaluate((pg) => !!document.getElementById('page-' + pg), pg))) { out[label] = 'absent'; continue; }
    await p.evaluate((pg) => go(pg), pg); await p.waitForTimeout(900);
    out[label] = await p.evaluate((sel) => { const all = [...document.querySelectorAll(sel)].filter(x => x.offsetParent && x.getBoundingClientRect().width > 8); if (!all.length) return null;
      const one = k => { const r = k.getBoundingClientRect(), c = getComputedStyle(k); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), sh: c.boxShadow }; };
      const by = {}; all.forEach(k => { let t = (k.textContent || k.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40) || '(no words)'; while (by[t]) t += '+'; by[t] = one(k); });
      return Object.assign(one(all[0]), { by }); }, sel); }
  return out; }
(async () => {
  const b = await pw.chromium.launch();
  const A = await open(b, URL_); const p = A.p;
  // 1. the recipe, read from the page
  const tok = await p.evaluate(() => { const r = getComputedStyle(document.documentElement); const t = document.getElementById('r247-tok');
    return { pop: r.getPropertyValue('--pop').trim(), pill: r.getPropertyValue('--pill').trim(), inHead: !!(t && t.parentNode === document.head) }; });
  ok(/0 0 0 \.5px rgba\((?:var\(--fam-rgb\)|40,\s*22,\s*68),\s*\.20\)/.test(tok.pop) && /0 1\.5px 0 rgba\((?:var\(--fam-rgb\)|40,\s*22,\s*68),\s*\.18\)/.test(tok.pop) && /0 8px 18px/.test(tok.pop),
    'the own key: a fine outline, a thin edge (1.5 px at 18 %) and a soft, wide lift', tok.pop);
  ok(/0 0 0 \.5px/.test(tok.pill) && /0 1px 0 rgba\((?:var\(--fam-rgb\)|40,\s*22,\s*68),\s*\.18\)/.test(tok.pill), 'the top bar\'s pill: the same outline and a 1 px edge', tok.pill);
  ok(tok.inHead, 'the recipe sits in the page\'s head, where the Author Studio\'s look can follow it');
  const now = await measure(p); fs.writeFileSync(OUT + '/keys.json', JSON.stringify(now, null, 1));
  const missing = Object.entries(now).filter(([k, v]) => !v).map(([k]) => k); const absent = Object.entries(now).filter(([k, v]) => v === 'absent').map(([k]) => k);
  Object.keys(now).forEach(k => { if (now[k] === 'absent') delete now[k]; });
  if (absent.length) console.log('(not in this edition: ' + absent.join(', ') + ')');
  ok(missing.length <= 1, 'the keys to measure are on their pages (at most one room shows none yet)', missing);
  const ring = Object.entries(now).filter(([k, v]) => v && !/0px 0px 0px 0\.5px/.test(v.sh)).map(([k, v]) => k + ': ' + v.sh.slice(0, 120));
  ok(ring.length === 0, 'every measured key wears the outline (its own recipe or the room\'s, which follows it)', ring);
  const flatNow = ['Chat\'s plus key', 'an idea on an empty chat', 'Home\'s See all', 'a quiet Lector key'].filter(k => now[k] && (!now[k].sh || now[k].sh === 'none'));
  ok(flatNow.length === 0, 'keys that were words or bare outlines are raised keys now (plus, ideas, See all, Lector\'s quiet keys)', flatNow);
  // 2. no key bigger or wider than on the earlier page
  if (REF) { const R = await open(b, REF); const was = await measure(R.p); await R.ctx.close();
    // the same key on both pages, found by its words: every key of each kind, not only the first
    const grew = [], seen = [];
    Object.keys(now).forEach(k => { if (!now[k] || !was[k] || was[k] === 'absent') return; Object.keys(now[k].by).forEach(txt => { const a = was[k].by[txt], c = now[k].by[txt]; if (!a) return; seen.push(k + ': ' + txt);
      if (Math.abs(c.w - a.w) > 0.5 || Math.abs(c.h - a.h) > 0.5) grew.push(k + ' "' + txt + '": ' + a.w + 'x' + a.h + ' -> ' + c.w + 'x' + c.h); }); });
    fs.writeFileSync(OUT + '/sizes.json', JSON.stringify({ seen, grew }, null, 1));
    ok(grew.length === 0 && seen.length >= 10, 'no key is bigger or wider than on the earlier page (' + seen.length + ' keys, found by their words on both pages)', grew); }
  else console.log('(no earlier page given: sizes not compared)');
  // 3. motion: under the pointer and pressed
  await p.evaluate(() => { state.motion = 'full'; applyTheme(); go('settings'); }); await p.waitForTimeout(900);
  const key = p.locator('#page-settings .btn:not(.primary)').filter({ hasText: /\S/ }).first(); await key.scrollIntoViewIfNeeded(); const box = await key.boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.waitForTimeout(400);
  const hov = await key.evaluate(e => { const c = getComputedStyle(e); return { tf: c.transform, sh: c.boxShadow }; });
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(hov.tf) && /0px 2\.5px 0px/.test(hov.sh), 'under the pointer a key rises 2 px and its edge grows (2.5 px)', hov);
  await p.mouse.down(); await p.waitForTimeout(200);
  const prs = await key.evaluate(e => { const c = getComputedStyle(e); return { tf: c.transform, sh: c.boxShadow, td: c.transitionDuration }; });
  await p.mouse.move(5, 895); await p.mouse.up(); await p.waitForTimeout(300);
  ok(/matrix\(0\.98, 0, 0, 0\.98, 0, 1\)/.test(prs.tf) && /inset/.test(prs.sh) && /0\.05s/.test(prs.td), 'pressed, it sinks 1 px, a little smaller, into its seat in 0.05 s', prs);
  // 4. the Author Studio's depth (the master edition): Deep heavier, Soft lighter, and its choice wins over the recipe
  const hasAuthor = await p.evaluate(() => typeof IngAuthor === 'object' && !!IngAuthor && typeof IngAuthor.open === 'function');
  if (hasAuthor) {
    const popOf = () => p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--pop').trim());
    await p.evaluate(() => { IngAuthor.open('words'); IngAuthor.room('look'); }); await p.waitForTimeout(500);
    await p.selectOption('#auDepth', 'deep'); await p.waitForTimeout(300); const deepPop = await popOf();
    await p.selectOption('#auDepth', 'soft'); await p.waitForTimeout(300); const softPop = await popOf();
    await p.selectOption('#auDepth', ''); await p.waitForTimeout(300); const ownPop = await popOf();
    const order = await p.evaluate(() => { const t = document.getElementById('r247-tok'), a = document.getElementById('auLook'); if (!t || !a) return 'n/a';
      return (t.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) ? 'recipe first' : 'look first'; });
    const edgeOf = s => { const m = /(?:^|,)\s*0 (1|1\.5|2)px 0 rgba\([^)]*,\s*([.\d]+)\)/.exec(s); return m ? +m[2] : NaN; };
    ok(edgeOf(deepPop) > 0.18 && edgeOf(softPop) < 0.18 && order === 'recipe first',
      'the Author Studio\'s Deep is heavier than the own key and Soft lighter, and its choice wins (its look follows the recipe in the head)', { deep: deepPop.slice(0, 140), soft: softPop.slice(0, 140), order });
    ok(/0 0 0 \.5px rgba\((?:var\(--fam-rgb\)|40,\s*22,\s*68),\s*\.20\)/.test(ownPop), 'Ingenium\'s own depth again gives the new recipe back', ownPop.slice(0, 140));
    await p.evaluate(() => { try { IngAuthor.close(); } catch (e) {} go('settings'); }); await p.waitForTimeout(500);
  } else console.log('(the Author Studio is not in this edition: Soft and Deep not tried)');
  // 5. Display's Flat depth and the night theme keep their own faces
  const flat = await p.evaluate(() => { state.depth = 'flat'; applyTheme(); go('settings'); return new Promise(r => setTimeout(() => { const k = document.querySelector('#page-settings .btn:not(.primary)'), t = document.querySelector('.cl-key#displayBtn');
    const o = { key: getComputedStyle(k).boxShadow, top: getComputedStyle(t).boxShadow }; state.depth = 'raised'; applyTheme(); r(o); }, 500)); });
  ok(!/0\.5px/.test(flat.key) && !/0\.5px/.test(flat.top), 'Display\'s Flat depth: keys and pills lie flat, without the outline', flat);
  const night = await p.evaluate(() => { state.theme = 'night'; applyTheme(); return new Promise(r => setTimeout(() => { const k = document.querySelector('#page-settings .btn:not(.primary)'), t = document.querySelector('.cl-key#displayBtn');
    const o = { key: getComputedStyle(k).boxShadow, top: getComputedStyle(t).boxShadow }; state.theme = 'day'; applyTheme(); r(o); }, 500)); });
  ok(/rgba\(0, 0, 0/.test(night.key) && !/rgba\(40, 22, 68/.test(night.key) && /rgba\(0, 0, 0/.test(night.top), 'by night, keys and pills keep the night\'s dark casts', night);
  await A.ctx.close();
  // 6. reduced motion: a quiet key does not move under the pointer
  const M = await open(b, URL_, { reducedMotion: 'reduce' }); await M.p.evaluate(() => go('home')); await M.p.waitForTimeout(900);
  const q = M.p.locator('.hx-btn.quiet').first(); let still = null;
  if (await q.count()) { await q.scrollIntoViewIfNeeded(); const qb = await q.boundingBox(); await M.p.mouse.move(qb.x + qb.width / 2, qb.y + qb.height / 2); await M.p.waitForTimeout(300);
    still = await q.evaluate(e => getComputedStyle(e).transform); }
  ok(still === null || still === 'none', 'with reduced motion, a key does not rise under the pointer', still);
  ok(A.errs.length === 0 && M.errs.length === 0, 'no errors on the page', A.errs.concat(M.errs));
  await M.ctx.close(); await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('stopped: ' + (e && e.stack || e)); process.exit(2); });
