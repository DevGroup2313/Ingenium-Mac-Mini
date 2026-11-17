// Ingenium 7.29: Adamas's chosen tab reads as the other pages' chosen tabs do. Her words (17 November 2026), with a picture of
// Adamas by day: "The selected tab on the Adamas page is translucent and white and ineligible, please fix that as well."
// Found: Adamas has had tabs since 7.27 (modules/r173.js CONF.build, r311), but r173 gave its tab colours (--rm-pa, --rm-pb and
// the rest) only to Settings, Mentes, Concordia and the Guide, so Adamas's chosen tab drew white words on no colour at all; the
// same list kept where() from opening Adamas's other tab for a card in it. Checks, in Chromium, at 1440 by 900:
//   - by day and by night, Adamas's chosen tab has the violet key Settings' chosen tab has (the same background), and its words
//     stand out from it (contrast of at least 4.5 against the key's lighter end);
//   - the tab not chosen keeps its own pale key and dark words;
//   - a card in Adamas's other tab, focused from code, opens that tab first (where() now knows Adamas);
//   - an accent colour of her own (the Author Studio's look, r236) colours Adamas's and Career Studio's chosen tabs too;
//   - no page errors.
//   node rig/t_729_adamas_tabs.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(800);
  // the colours of a tab, read as the browser draws them: the background's colours (a gradient's stops), the words' colour
  // (a tab's colours ease over 0.15 s when its page shows: read once its transitions have ended, as the eye sees it at rest)
  const read = (pk, room) => p.evaluate(async ([pk, room]) => {
    const t = document.querySelector('#page-' + pk + ' .rm-tab[data-room="' + room + '"]'); if (!t) return null;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); await Promise.race([Promise.all(t.getAnimations().map(a => a.finished.catch(() => {}))), new Promise(r => setTimeout(r, 3000))]);
    const cs = getComputedStyle(t);
    const rgb = s => (s.match(/rgba?\(([^)]+)\)/g) || []).map(x => x.replace(/rgba?\(|\)/g, '').split(',').map(Number));
    const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const stops = rgb(cs.backgroundImage), ink = rgb(cs.color)[0];
    const lighter = stops.length ? stops.reduce((a, c) => lum(c) > lum(a) ? c : a) : rgb(cs.backgroundColor)[0];
    const L1 = Math.max(lum(ink), lum(lighter)), L2 = Math.min(lum(ink), lum(lighter));
    return { selected: t.getAttribute('aria-selected'), bg: cs.backgroundImage.slice(0, 160), stops: stops.map(s => s.slice(0, 3).join(',')), stopAlpha: stops.map(s => s.length > 3 ? s[3] : 1),
      ink: ink.join(','), contrast: Math.round((L1 + 0.05) / (L2 + 0.05) * 100) / 100, pa: getComputedStyle(document.getElementById('page-' + pk)).getPropertyValue('--rm-pa').trim() };
  }, [pk, room]);
  for (const theme of ['day', 'night']) {
    await p.evaluate(th => { state.theme = th; applyTheme(); }, theme); await p.waitForTimeout(600);
    await p.evaluate(() => { go('settings'); IngRooms.open('settings', IngRooms.rooms('settings')[0].key); }); await p.waitForTimeout(500);
    const st = await read('settings', await p.evaluate(() => IngRooms.current('settings')));
    await p.evaluate(() => { go('build'); IngRooms.open('build', 'page'); }); await p.waitForTimeout(700);
    const ad = await read('build', 'page'), other = await read('build', 'apps');
    ok(ad && ad.selected === 'true' && ad.pa !== '' && ad.stops.length >= 2 && ad.stopAlpha.every(a => a === 1), theme + ': Adamas has its tab colours, and its chosen tab is a solid violet key', ad);
    ok(ad && st && ad.bg === st.bg, theme + ': the same key as Settings\' chosen tab', { adamas: ad && ad.bg, settings: st && st.bg });
    ok(ad && ad.contrast >= 4.5, theme + ': its words stand out from the key (contrast 4.5 or more)', ad && { ink: ad.ink, stops: ad.stops, contrast: ad.contrast });
    ok(other && other.selected === 'false' && other.contrast >= 4.5, theme + ': the tab not chosen keeps its own key, its words readable', other && { ink: other.ink, stops: other.stops, contrast: other.contrast });
    const box = await p.evaluate(() => { const r = document.querySelector('#page-build .rm-tabs').getBoundingClientRect(); return { x: Math.max(0, r.left - 12), y: Math.max(0, r.top - 12), width: Math.min(innerWidth, r.width + 24), height: r.height + 24 }; });
    await p.evaluate(() => { const r = document.querySelector('#page-build .rm-tabs'); r.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
    const box2 = await p.evaluate(() => { const r = document.querySelector('#page-build .rm-tabs').getBoundingClientRect(); return { x: Math.max(0, r.left - 12), y: Math.max(0, r.top - 12), width: Math.min(innerWidth - r.left + 12, 560), height: r.height + 24 }; });
    await p.screenshot({ path: path.join(OUT, 'adamas_tabs_' + theme + '.png'), clip: box2 || box });
  }
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); });
  // where(): a card in the closed tab, focused from code, opens that tab first
  const rv = await p.evaluate(async () => { go('build'); IngRooms.open('build', 'page'); await new Promise(r => setTimeout(r, 400));
    const cards = IngRooms.cards('build'); const inApps = [...document.querySelectorAll('#page-build .rm-panel[data-room="apps"] input, #page-build .rm-panel[data-room="apps"] button')].find(x => !x.disabled);
    const before = IngRooms.current('build'), roomOf = inApps ? IngRooms.roomOf(inApps) : null; if (inApps) inApps.focus(); await new Promise(r => setTimeout(r, 500));
    return { before, roomOf, after: IngRooms.current('build'), focused: document.activeElement === inApps, cards: cards.length }; });
  ok(rv.before === 'page' && rv.roomOf === 'apps' && rv.after === 'apps' && rv.focused, 'a key in Download as an app, focused from code, opens that tab first', rv);
  // an accent of her own (the Author Studio's look): Adamas's and Career Studio's chosen tabs take it too
  const lookSrc = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r236.js'), 'utf8');
  const m = /css\+="(#page-settings[^{"]*)\{--rm-pa:/.exec(lookSrc); const names = m ? m[1].split(',') : [];
  ok(names.includes('#page-build') && names.includes('#page-career'), 'an accent colour of her own reaches Adamas\'s and Career Studio\'s tabs (r236 names them)', names);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
