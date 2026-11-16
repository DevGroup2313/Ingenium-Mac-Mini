// PLAYWRIGHT_BROWSERS_PATH=<a WebKit build> node rig/t_718_seal_heads.js <page url>   (r306 on the heads' seals: taken in hand, turning, a press handed back and taken up again)
// r306 on the heads' seals (WebKit): each taken in hand and moving; a press plays its flourish with the parts handed back to their own
// drawing, and they are taken up again after; no page errors
const pw = require('/opt/node-tools/node_modules/playwright');
const [U] = process.argv.slice(2); let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else fail++; console.log((c ? 'ok   ' : 'FAIL ') + m); };
const HEADS = [['home', '#hxSeal .isl'], ['blend', '.bx-seat .isl'], ['career', '.sk-seal .isl'], ['chat', '#brandSealBtn .isl']];
(async () => { const b = await pw.webkit.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(3000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  for (const [pg, sel] of HEADS) {
    await p.evaluate((pg) => { go(pg); window.scrollTo(0, 0); }, pg); await p.waitForTimeout(3500);
    const st = () => p.evaluate((sel) => IngSealGC.state(sel), sel);
    let s = await st(); const parts = ['ring', 'star', 'heart'].filter((k) => s[k]);
    ok(s.applied && parts.every((k) => s[k].moving >= 1), pg + ': its seal taken in hand: ' + JSON.stringify(s));
    const ang = () => p.evaluate((sel) => { const w = document.querySelector(sel); const g = (q) => { const e = w.querySelector(q); return e ? getComputedStyle(e).rotate : null; }; return [g('.isl-ring > svg'), g('.isl-star > svg')]; }, sel);
    const a1 = await ang(); await p.waitForTimeout(600); const a2 = await ang(); ok(a1[1] !== a2[1] || a1[0] !== a2[0], pg + ': it turns (' + a1.join(' ') + ' -> ' + a2.join(' ') + ')');
    const nsh = await p.evaluate((sel) => document.querySelectorAll(sel + ' .isl-star > svg.isl-gc-sh').length, sel);
    const want = await p.evaluate((sel) => [...document.querySelectorAll(sel)].map((w) => { const s = w.querySelector('.isl-star > svg'); s.classList.remove('isl-gcb'); const n = (getComputedStyle(s).filter.match(/drop-shadow/g) || []).length; s.classList.add('isl-gcb'); return n + 1; }).reduce((a, b) => a + b, 0), sel);
    ok(nsh === want, pg + ': the engine\'s shadows as layers, as many as its style and light ask, before any press (' + nsh + ' of ' + want + ')');
    if (pg !== 'chat') {
      const key = await p.evaluate((sel) => { const w = document.querySelector(sel); const k = w.closest('button,[role="button"]'); if (!k) return null; k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      if (!key) { ok(false, pg + ': no key round the seal'); continue; }
      await p.waitForTimeout(400); await p.mouse.click(key.x, key.y); await p.waitForTimeout(250);
      s = await st(); const handed = ['ring', 'star', 'heart'].some((k) => s[k] && s[k].flourish > 0);
      const flr = await p.evaluate((sel) => document.querySelector(sel).closest('button,[role="button"],.hx-seal,.bx-sealbox') && document.querySelector(sel + ' .isl-star > svg').getAnimations().filter((a) => !a.__gc).length, sel);
      ok(handed || !flr, pg + ': a press plays its flourish with the parts handed back (' + JSON.stringify(['ring', 'star', 'heart'].map((k) => s[k] && s[k].flourish)) + ', flourish animations on the engine: ' + flr + ')');
      await p.waitForTimeout(3200); s = await st(); ok(['ring', 'star', 'heart'].every((k) => !s[k] || (s[k].flourish === 0 && s[k].moving >= 1)), pg + ': and taken up again after: ' + JSON.stringify(s));
      const nsh2 = await p.evaluate((sel) => document.querySelectorAll(sel + ' .isl-star > svg.isl-gc-sh').length, sel); ok(nsh2 === nsh, pg + ': its shadows back (' + nsh2 + ')');
    }
  }
  ok(errs.filter((e) => !/sandboxed|audio device|ResizeObserver loop/.test(e)).length === 0, 'no page errors but those 7.17 shows too: no speaker, ResizeObserver (' + errs.filter((e) => !/sandboxed|audio device|ResizeObserver loop/.test(e)).slice(0, 2).join(' | ') + ')');
  console.log(pass + '/' + (pass + fail)); await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
