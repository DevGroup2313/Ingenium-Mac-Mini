// node rig/t_807_custodia_struck.js <page url> [picture folder]
// Ingenium 8.07 (modules/r408.js): Custodia's seal struck into its dial. Her words (28 November 2026): "I also want you to sink in the logo
// button in the middle of the dial, I want it to look more built-in and not as a last minute addition"; then, of the live preview's four
// settings: "I prefer the Struck look for the Custodia dial, please add it to the app and push it everywhere."
// By day and by night: the seal's disc gives way to the dial's face; no shadow beneath it, no coin edge, no seat; the engraved ring stays;
// its ring, star and heart show; the whole seal is still the key, and a press plays a flourish. No sign-in; nothing of anyone's is read.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
(async () => {
  const OUT = process.argv[3] || path.join(require('os').tmpdir(), 't807'); fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  await p.evaluate(() => go('custodia')); await sleep(3000);
  for (const th of ['day', 'night']) {
    await p.evaluate((th) => document.body.setAttribute('data-theme', th), th); await sleep(1200);
    const s = await p.evaluate(() => { const sb = document.querySelector('#cuHead .cu-sealbox'); if (!sb) return null; const q = (c) => sb.querySelector('.isl ' + c); const cs = (e) => e ? getComputedStyle(e) : null;
      const bef = getComputedStyle(sb, '::before'), aft = getComputedStyle(sb, '::after');
      return { back: cs(q('.isl-back')).opacity, cast: cs(q('.isl-cast')).display, edge: cs(q('.isl-edge')).display, ring: cs(q('.isl-ring')).opacity, star: cs(q('.isl-star')).opacity, heart: cs(q('.isl-heart')).opacity,
        before: bef.content !== 'none' && bef.boxShadow !== 'none', after: aft.content === 'none' || aft.content === 'normal' || aft.display === 'none' || aft.boxShadow === 'none' }; });
    ok(s && +s.back === 0 && s.cast === 'none' && s.edge === 'none', th + ': the seal\'s disc gives way to the dial\'s face; no shadow beneath it, no coin edge', s);
    ok(s && s.before && s.after, th + ': the engraved ring stays round it, and no seat is drawn', s);
    ok(s && +s.ring === 1 && +s.star === 1 && +s.heart === 1, th + ': its ring, star and heart show, struck in the dial', s);
    const r = await p.evaluate(() => { const e = document.querySelector('#cuHead .cu-sealbox'); e.scrollIntoView({ block: 'center' }); const q = e.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; });
    await sleep(500); const pad = r.w * 0.9;
    await p.screenshot({ path: path.join(OUT, 'struck_' + th + '.png'), clip: { x: r.x - pad, y: r.y - pad, width: r.w + 2 * pad, height: r.h + 2 * pad } });
  }
  // the whole seal is the key: its edge answers as its middle does
  const hits = await p.evaluate(() => { const e = document.querySelector('#cuHead .cu-sealbox'); const q = e.getBoundingClientRect(), cx = q.left + q.width / 2, cy = q.top + q.height / 2, R = q.width * 0.42;
    return [[0, 0], [R, 0], [-R, 0], [0, R], [0, -R]].map(([dx, dy]) => { const t = document.elementFromPoint(cx + dx, cy + dy); return !!(t && t.closest && t.closest('.cu-sealbox .r175-seal')); }); });
  ok(hits.every(Boolean), 'the whole seal is still the key, to its edge', hits);
  const before = await p.evaluate(() => document.querySelector('#cuHead .cu-sealbox .r175-seal').getAttribute('data-flourish') || '');
  await p.evaluate(() => document.querySelector('#cuHead .cu-sealbox .r175-seal').click()); await sleep(350);
  const fl = await p.evaluate(() => { const k = document.querySelector('#cuHead .cu-sealbox .r175-seal'); return { f: k.getAttribute('data-flourish') || '', anims: document.getAnimations().filter((a) => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('.cu-sealbox')).length }; });
  ok(fl.f !== before || fl.anims > 0, 'a press plays one of Home\'s flourishes', fl);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
