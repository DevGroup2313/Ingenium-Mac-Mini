// Ingenium 7.46: what she asked for on 19 November 2026, in Chromium on a built page.
//   1. "Please remove the weird film that covers the background when a panel or popup is opened": with a sheet open (#modalRoot), the
//      Security room's ask (#secAsk) and Fabrica's New app panel, nothing over the page is tinted or blurred
//   2. "I also want the profile toggle entirely removed from Ingenium's top header area ... put it somewhere else more appropriate":
//      no profile key in the top bar; it stands at the foot of the left menu, and its menu opens above it, inside the window
//   3. (stage 1's parts, when r333 is in the page) Code's start cards and Chat's + menu rows: under the pointer no violet wash, they lift
//   node rig/t_746_film_key.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; return !!c; };
const clear = (bg, bd) => /rgba\(0, 0, 0, 0\)|transparent/.test(bg) && (!bd || bd === 'none');
const violet = (v) => { const m = String(v).match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/); if (!m) return false; const R = +m[1], G = +m[2], B = +m[3], A = m[4] == null ? 1 : +m[4]; return A > 0.02 && B > R && R > G && B - G > 25 && !(R > 240 && G > 235); };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 860 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await p.waitForTimeout(600);
    // ---------------------------------------------------------------- 1. no film
    const f1 = await p.evaluate(() => { modalOpen('<div class="ing-ask"><h3>A sheet</h3><p>Over the page.</p></div>'); const m = document.getElementById('modalRoot'), cs = getComputedStyle(m);
      return { open: cs.display !== 'none', bg: cs.backgroundColor + ' ' + cs.backgroundImage, bd: cs.backdropFilter }; });
    ok(f1.open && clear(f1.bg, f1.bd), '1. a sheet open: the page behind it is not tinted or blurred', f1);
    await p.screenshot({ path: path.join(OUT, 'sheet_no_film.png') });
    await p.evaluate(() => { try { closeModal(); } catch (e) {} });
    const f2 = await p.evaluate(() => { window.__ingSecAsk = true; try { localStorage.removeItem('ing.security.asked.v1'); } catch (e) {} let shown = false; try { shown = IngSecurity.ask(); } catch (e) {}
      const a = document.getElementById('secAsk'); if (!a) return { shown }; const cs = getComputedStyle(a); const r = { shown: true, bg: cs.backgroundColor + ' ' + cs.backgroundImage, bd: cs.backdropFilter }; a.remove(); return r; });
    ok(!f2.shown || clear(f2.bg, f2.bd), '   the Security room\'s ask: no film', f2);
    const f3 = await p.evaluate(async () => { go('fabrica'); await new Promise((r) => setTimeout(r, 1500)); const k = [...document.querySelectorAll('#fb button')].find((x) => /New app/.test(x.textContent) && x.offsetParent); if (k) k.click();
      await new Promise((r) => setTimeout(r, 900)); const w = document.querySelector('#fb .f-sheet-wrap,#fb .hb-wrap,.fd-bwrap'); if (!w) return { none: true }; const cs = getComputedStyle(w); return { bg: cs.backgroundColor + ' ' + cs.backgroundImage, bd: cs.backdropFilter }; });
    ok(f3.none || clear(f3.bg, f3.bd), '   Fabrica\'s New app panel: no film', f3);
    await p.screenshot({ path: path.join(OUT, 'fabrica_no_film.png') });
    await p.keyboard.press('Escape'); await p.evaluate(() => { go('home'); }); await p.waitForTimeout(700);
    // ---------------------------------------------------------------- 2. the profile key
    // 7.48 (r338, her words of 20 November 2026: "please remove the profile toggle from the side navigation bar, instead put it inside of the
    // Status panel on the top bar"): neither the top bar nor the left menu shows a profile key; the Status panel holds Who is using Ingenium
    const k2 = await p.evaluate(() => { const k = document.getElementById('profKey'); return { top: !!document.querySelector('.topbar #profKey'), dockShows: !!(k && k.offsetParent) }; });
    ok(!k2.top && !k2.dockShows, '2. no profile key in the top bar or the left menu', k2);
    await p.click('#statusPill'); await p.waitForTimeout(700);
    const m2 = await p.evaluate(() => { const m = document.querySelector('.pres-menu'), r = m.getBoundingClientRect(), cs = getComputedStyle(m);
      return { heads: [...m.querySelectorAll('.pres-head')].map((x) => x.textContent.trim()), inside: r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth, keys: [...m.querySelectorAll('#r338Lock,#r338Manage')].map((x) => x.textContent.trim()), rows: m.querySelectorAll('.r338-who[data-who]').length }; });
    ok(m2.heads.join('|') === 'Status|Who is using Ingenium' && m2.inside && m2.rows >= 1 && m2.keys.join('|') === 'Lock Ingenium|Manage profiles', '   the Status panel ends with Who is using Ingenium, inside the window', m2);
    await p.screenshot({ path: path.join(OUT, 'profile_in_status.png'), clip: { x: 700, y: 0, width: 660, height: 860 } });
    await p.evaluate(() => { try { closePresenceMenu(); } catch (e) {} });
    // ---------------------------------------------------------------- 3. stage 1's parts, where r333 is
    const has333 = await p.evaluate(() => !!window.IngRepoWork);
    if (has333) {
      await p.evaluate(() => { go('code'); }); await p.waitForTimeout(700); await p.evaluate(() => ccWelcome()); await p.waitForTimeout(800);
      const c0 = await p.evaluate(() => { const c = document.querySelector('#modalBox .cc-start .cc-card'); const cs = getComputedStyle(c); return { top: c.getBoundingClientRect().top, sh: cs.boxShadow !== 'none', flat: cs.boxShadow === 'none' && cs.borderTopStyle === 'dashed' }; });   // 7.47 (r335): flat at rest in the drop zone's dashed edge, at her word
      await p.hover('#modalBox .cc-start .cc-card'); await p.waitForTimeout(500);
      const c1 = await p.evaluate(() => { const c = document.querySelector('#modalBox .cc-start .cc-card'); const cs = getComputedStyle(c); return { top: c.getBoundingClientRect().top, bg: cs.backgroundColor, img: cs.backgroundImage }; });
      ok((c0.sh || c0.flat) && c0.top - c1.top >= 2 && !violet(c1.bg) && !/accent/.test(c1.img), '3. Code\'s start cards: raised, lifting under the pointer, no violet wash', { lift: c0.top - c1.top, bg: c1.bg, img: c1.img.slice(0, 80) });
      await p.screenshot({ path: path.join(OUT, 'code_start.png') });
      await p.evaluate(() => { try { closeModal(); } catch (e) {} go('chat'); document.getElementById('chatNew').click(); }); await p.waitForTimeout(600);
      await p.click('#chatImgBtn'); await p.waitForTimeout(700);
      const q0 = await p.evaluate(() => document.querySelector('#chatPlusMenu .pm-item').getBoundingClientRect().top); await p.hover('#chatPlusMenu .pm-item'); await p.waitForTimeout(450);
      const q1 = await p.evaluate(() => { const it = document.querySelector('#chatPlusMenu .pm-item'), cs = getComputedStyle(it); return { top: it.getBoundingClientRect().top, bg: cs.backgroundColor, img: cs.backgroundImage }; });
      ok(q0 - q1.top >= 1 && !violet(q1.bg), '   Chat\'s + menu rows: lifting under the pointer, no violet wash', { lift: q0 - q1.top, bg: q1.bg });
    } else console.log('NOTE stage 1 (r333) is not in this page: its parts are not checked here');
  } catch (e) { ok(false, 'the run finished', e.message); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
