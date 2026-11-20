// node rig/t_756_underline.js <Ingenium page url> <out folder>
// Ingenium 7.56: purple words that can be pressed are underlined (modules/r343.js: 7.53's list of keys, and from 7.56 the finder that
// gives the same line to any purple word key the list does not name, as it is drawn). Her words (20 November 2026): "the purple
// clickable word buttons on Ingenium that do not have an underline, they look naked without being underlined when they are in purple and
// are clearly supposed to be clickable especially from your last preview and the rest of the app." Checks, on the running app with an
// invented app (Tide Clock) and person (Ada): keys of the list (Home's See all, Fabrica's Write it for me, Take it away and Put aside's
// Drop) and keys the list missed on 7.55 (Take the guided tour, the model names on the Models page), by day and by night; the line's look
// (1px, 3px under the words, their own colour) and nothing else (no movement added); a key drawn later; keys with a face, the left menu,
// strips and chips left as they are; and, on every page by day and by night, no bare purple word key left without its line.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_756_underline.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const show = async (v) => { await p.evaluate((v) => { fbHubHost.S.view = v; fbHubHost.paint(); }, v); await sleep(1500); };
  const theme = (t) => p.evaluate((t) => { try { setTheme(t); } catch (e) { document.body.setAttribute('data-theme', t); } }, t);
  // how a key is drawn: its line, its colour, its lift
  const lineOf = (sel) => p.evaluate((sel) => { const e = [...document.querySelectorAll(sel)].find((x) => x.offsetParent); if (!e) return null; const cs = getComputedStyle(e);
    return { text: e.textContent.trim().slice(0, 30), mark: e.classList.contains('ing-ul'), line: cs.textDecorationLine, thick: cs.textDecorationThickness, gap: cs.textUnderlineOffset, color: cs.color, deco: cs.textDecorationColor, lift: cs.translate, tr: cs.transitionProperty }; }, sel);
  // the same test as the part's, written again here: bare violet words that act as a key or a link
  const bareLeft = () => p.evaluate(() => {
    function hsl(c) { const m = String(c).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); if (!m) return null; let r = m[1] / 255, g = m[2] / 255, bb = m[3] / 255, a = m[4] == null ? 1 : +m[4];
      const mx = Math.max(r, g, bb), mn = Math.min(r, g, bb); let h = 0, s = 0; const l = (mx + mn) / 2; if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
        h = mx === r ? (g - bb) / d + (g < bb ? 6 : 0) : mx === g ? (bb - r) / d + 2 : (r - g) / d + 4; h *= 60; } return { h, s, l, a }; }
    function filled(cs) { const bg = hsl(cs.backgroundColor); if (bg && bg.a >= 0.08) return true; if (cs.backgroundImage !== 'none') return true; if (cs.boxShadow && cs.boxShadow !== 'none' && !/^(rgba\(0, 0, 0, 0\)[^,]*,?\s*)+$/.test(cs.boxShadow)) return true;
      return ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs['border' + s + 'Width']) > 0.4 && cs['border' + s + 'Style'] !== 'none' && (hsl(cs['border' + s + 'Color']) || { a: 0 }).a > 0.12); }
    const left = [];
    document.querySelectorAll('a,button,[role="button"],summary').forEach((e) => {
      if (!e.offsetParent) return; const t = (e.textContent || '').replace(/\s+/g, ' ').trim(); if (!t || t.length > 60 || !/[A-Za-z]{2}/.test(t)) return;
      if (e.closest('nav.dock,[role="tablist"],[role="menu"],[role="menubar"],[role="listbox"],[role="radiogroup"],.seg,.chips') || e.matches('[role="tab"],[role="option"],[role="menuitem"],[role="switch"],[aria-pressed],[aria-selected],[aria-current],.dmc-c,.fr-part')) return;
      const cs = getComputedStyle(e); const c = hsl(cs.color); if (!c || c.a < 0.6 || !(c.h >= 245 && c.h <= 300 && c.s >= 0.25 && c.l >= 0.3 && c.l <= 0.82)) return; if (parseFloat(cs.fontSize) > 19) return;
      if (filled(cs)) return; for (const ps of ['::before', '::after']) { const q = getComputedStyle(e, ps); if (q.content && q.content !== 'none' && q.content !== 'normal' && filled(q)) return; }
      let k = e.firstElementChild, n = 0, kid = false; while (k && n < 8) { if (filled(getComputedStyle(k))) kid = true; k = k.nextElementSibling; n++; } if (kid) return;
      if (!/underline/.test(cs.textDecorationLine)) left.push(e.tagName.toLowerCase() + '.' + String(e.className).trim().replace(/\s+/g, '.') + ' "' + t.slice(0, 30) + '"'); });
    return left; });
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(1500);
    ok(await p.evaluate(() => !!window.IngUnderline && !!document.getElementById('r343-css')), 'the part is in the page (r343)');
    // 1. Home
    await p.evaluate(() => go('home')); await sleep(1800);
    const see = await lineOf('.hx-btn.quiet');
    ok(see && /underline/.test(see.line), 'Home: See all is underlined (7.53\'s list)', see);
    ok(see && see.thick === '1px' && see.gap === '3px', '   by a line 1px thick, 3px under the words', see);
    ok(see && see.deco === see.color, '   in the words\' own colour', see);
    // 2. Fabrica, with an invented app
    await p.evaluate(() => go('fabrica')); await sleep(2000);
    const id = await p.evaluate(async () => { IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' }); const r = await IngRepo.create({ name: 'Tide Clock' });
      await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day.\n'); await IngRepo.commit(r.id, 'The first version'); await IngRepo.branch(r.id, 'evening'); await IngRepo.switchTo(r.id, 'evening');
      await IngRepo.put(r.id, 'app/evening.js', 'export const evening = 18.5;\n'); await IngRepo.commit(r.id, 'Evening tides'); await IngRepo.switchTo(r.id, 'main');
      await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour.\n');
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return r.id; });
    await sleep(900); await show('changes');
    const wr = await lineOf('#fbWrite');
    ok(wr && /underline/.test(wr.line) && wr.thick === '1px', 'Fabrica, Changes: Write it for me is underlined', wr);
    const keep = await lineOf('#fbKeep');
    ok(keep && !keep.mark && !/underline/.test(keep.line), '   Keep this version, a raised key, is left as it is', keep);
    await p.hover('#fbWrite'); await sleep(450);
    const hv = await lineOf('#fbWrite');
    ok(hv && /underline/.test(hv.line) && (hv.lift === 'none' || hv.lift === ''), '   under the pointer the line stays, and nothing is moved by it (Fabrica\'s own hover rule, older than 7.53, may set its thickness to the font\'s own)', hv);
    await p.mouse.move(4, 4); await sleep(350);
    await p.screenshot({ path: path.join(OUT, 'changes.png') });
    await show('ideas');
    const ta = await lineOf('#fbWorkBody .f-idea .f-btn.quiet');
    ok(ta && ta.text === 'Take it away' && /underline/.test(ta.line), 'Fabrica, Ideas: Take it away is underlined', ta);
    const wk = await lineOf('#fbWorkBody .f-idea .f-btn:not(.quiet)');
    ok(wk && !wk.mark && !/underline/.test(wk.line), '   Work on this, a raised key, is left as it is', wk);
    await show('changes'); await p.fill('#fbMsg', 'Halfway through the harbour'); await p.evaluate(() => document.querySelector('[data-r342="aside"]').click()); await sleep(2200);
    const dr = await lineOf('#r342Aside [data-r342="drop"]');
    ok(dr && dr.text === 'Drop' && /underline/.test(dr.line), 'Put aside: Drop is underlined', dr);
    const bb = await lineOf('#r342Aside [data-r342="back"]');
    ok(bb && !bb.mark, '   Bring back, a raised key, is left as it is', bb);
    // 3. a key drawn later is underlined before the page is painted
    const late = await p.evaluate(async () => { const box = document.querySelector('#fbWorkBody'); const k = document.createElement('button'); k.type = 'button'; k.className = 'r756-late'; k.style.cssText = 'background:none;border:0;padding:0;color:#6a3fb5;font:600 13px system-ui'; k.textContent = 'A key drawn later';
      box.appendChild(k); await Promise.resolve(); const r = { mark: k.classList.contains('ing-ul'), line: getComputedStyle(k).textDecorationLine }; k.remove(); return r; });
    ok(late.mark && /underline/.test(late.line), 'a purple word key no list names, drawn later, is underlined at once', late);
    // 4. by night
    await theme('night'); await sleep(900); await show('ideas');
    const tn = await lineOf('#fbWorkBody .f-idea .f-btn.quiet');
    ok(tn && /underline/.test(tn.line), 'by night: Take it away is underlined', tn);
    ok(tn && tn.color !== ta.color, '   in the night\'s lighter violet', { day: ta && ta.color, night: tn && tn.color });
    await p.screenshot({ path: path.join(OUT, 'ideas_night.png') });
    await theme('day'); await sleep(700);
    // 5. what is left as it is
    await p.evaluate(() => go('home')); await sleep(1500);
    const nav = await p.evaluate(() => [...document.querySelectorAll('nav.dock .nav-btn')].filter((e) => e.offsetParent).map((e) => ({ t: e.textContent.trim().slice(0, 20), mark: e.classList.contains('ing-ul'), line: getComputedStyle(e).textDecorationLine })));
    ok(nav.length > 3 && nav.every((x) => !x.mark && !/underline/.test(x.line)), 'the left menu\'s rows are not underlined', nav.filter((x) => x.mark || /underline/.test(x.line)));
    const chips = await p.evaluate(() => [...document.querySelectorAll('.dmc-c,.seg-btn,.fr-part,[aria-pressed]')].filter((e) => e.classList.contains('ing-ul')).length);
    ok(chips === 0, 'chips, tabs and strips are not underlined', chips);
    // 6. keys the 7.53 list did not name: Take the guided tour, and the model names on the Models page
    const anyLine = (sel) => p.evaluate((sel) => [...document.querySelectorAll(sel)].map((e) => ({ t: e.textContent.trim().slice(0, 30), mark: e.classList.contains('ing-ul'), line: getComputedStyle(e).textDecorationLine })), sel);
    const tour = await anyLine('#introTour');
    ok(tour.length === 0 || tour.every((x) => /underline/.test(x.line)), 'Take the guided tour is underlined (where the page has it)', tour);
    await p.evaluate(() => go('models')); await sleep(1600);
    const names = (await anyLine('.lu-model a')).filter((x) => x.t);
    ok(names.length > 0 && names.every((x) => /underline/.test(x.line)), 'the model names on the Models page are underlined', names.slice(0, 5));
    await p.evaluate(() => go('home')); await sleep(1000);
    // 7. every page, by day and by night: no bare purple word key left without its line
    const pages = await p.evaluate(() => [...document.querySelectorAll('[id^="page-"]')].map((e) => e.id.slice(5)).filter((x) => /^[a-z0-9_-]+$/.test(x)));
    for (const t of ['day', 'night']) { await theme(t); await sleep(700); const left = [];
      for (const pg of pages) { await p.evaluate((g) => { try { go(g); } catch (e) {} }, pg); await sleep(900); (await bareLeft()).forEach((x) => left.push(pg + ': ' + x)); }
      ok(left.length === 0, (t === 'day' ? 'by day' : 'by night') + ', on all ' + pages.length + ' pages: no purple word key left without its line', left.slice(0, 12)); }
    await theme('day'); await sleep(500);
    await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => go('home')); await sleep(1200);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: innerWidth }));
    ok(ph.sw <= ph.w + 1, 'on a phone nothing scrolls sideways', ph);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 6));
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})();
