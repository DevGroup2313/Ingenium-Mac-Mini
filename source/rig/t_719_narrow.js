// PLAYWRIGHT_BROWSERS_PATH=<a WebKit build for the iPad's part> node rig/t_719_narrow.js <page url> <out dir> [ipad,fire,desk]   (r307: narrow heads stacked as on a phone, the approved preview's heights)
// r307 on the release page: on an iPad (WebKit) and the Fire tablet's screen (Chrome), each head stacked by itself, with the preview's
// heights; at a computer's width, side by side as before; pictures for a look
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, OUT, ONLY] = process.argv.slice(2); let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const PAGES = ['build', 'lector', 'career', 'fabrica', 'focus'];
const WANT = { ipad: { build: 782, lector: 760, career: 783, fabrica: 782, focus: 630 }, fire: { build: 805, lector: 760, career: 783, fabrica: 782, focus: 630 } };  // the heads' own heights in the approved preview (its pictures had 8 px round them)
const DEV = [['ipad', 'webkit', { ...pw.devices['iPad Pro 11'] }], ['fire', 'chromium', { viewport: { width: 800, height: 1280 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true }], ['desk', 'chromium', { viewport: { width: 1440, height: 900 } }]];
(async () => { for (const [dn, eng, opt] of DEV.filter((d) => !ONLY || ONLY.split(',').includes(d[0]))) { const b = await pw[eng].launch(); const p = await (await b.newContext(opt)).newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)));
    await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(3000);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    for (const pg of PAGES) {
      await p.evaluate((pg) => { go(pg); window.scrollTo(0, 0); }, pg); await p.waitForTimeout(dn === 'ipad' && pg === 'build' ? 14000 : 5000);
      const r = await p.evaluate((pg) => { const h = document.querySelector('#page-' + pg + ' .skh'); const o = h.querySelector(':scope > .skh-obj'); const w = h.querySelector('.skh-words'); const b = h.getBoundingClientRect(), ob = o ? o.getBoundingClientRect() : null, wb = w.getBoundingClientRect();
        const cs = getComputedStyle(h), inner = b.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), hint = h.querySelector('.skh-hint'), hb = hint ? hint.getBoundingClientRect() : null;
        return { narrow: h.classList.contains('skh-narrow'), w: Math.round(b.width), h: Math.round(b.height), x: Math.max(0, b.left - 8), y: b.top + scrollY - 8, objBelowWords: ob ? ob.top >= wb.bottom - 2 : null,
          pool: !!(o && o.classList.contains('fc-pool')), off: ob ? Math.round(Math.abs((ob.left + ob.width / 2) - (b.left + b.width / 2))) : null, fill: ob ? +(ob.width / Math.min(inner, 520)).toFixed(2) : null, band: ob && hb ? Math.round(hb.top - ob.bottom) : null }; }, pg);
      if (dn === 'desk') { ok(!r.narrow && r.objBelowWords === false, `desk ${pg}: ${r.w} px wide, side by side as before (narrow ${r.narrow})`); continue; }
      // 7.22, her words (16 November 2026): the stacked objects "skewed to the left ... significantly smaller on the card ... it would look better in the
      // middle of the card": each object (Vesta's pool aside, which spans the head) in the middle, as wide as the head's inside, with no empty band
      // beneath it before the hint (7.19's heights, 782 and 805 for Adamas, 760 Lector, 783 Vocatio, 782 Fabrica, held a 144 px band; no longer asked)
      ok(r.narrow && r.objBelowWords !== false && (r.pool || (r.off <= 3 && r.fill >= 0.97 && r.band !== null && r.band <= 40)), `${dn} ${pg}: ${r.w} px wide, stacked (${r.narrow}), the object below the words (${r.objBelowWords})` + (r.pool ? ', the pool across the head' : `, ${r.off} px from the middle, ${Math.round(r.fill * 100)} per cent of the head's inside, ${r.band} px to the hint`) + `, ${r.h} px tall`);
      await p.screenshot({ path: `${OUT}/${dn}_${pg}.png`, clip: { x: r.x, y: r.y, width: Math.min(r.w + 16, 2000), height: r.h + 16 }, fullPage: true }); }
    ok(errs.filter((e) => !/sandboxed/.test(e)).length === 0, dn + ': no page errors ' + JSON.stringify(errs.filter((e) => !/sandboxed/.test(e)).slice(0, 2)));
    await b.close(); }
  console.log(pass + '/' + (pass + fail)); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
