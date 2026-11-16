// node rig/t_718_orb_flat.js <page url> <out dir> [webkit|chromium]   (one orb's face drawn flat and large: its own drawing against r306's wrapper)
// one orb's face drawn flat and large (no 3D), the original drawing against the wrapper (CSS cutout and mask), the drift at the same place
const pw = require('/opt/node-tools/node_modules/playwright');
const [U, OUT, eng] = process.argv.slice(2);
(async () => { const b = await pw[eng || 'webkit'].launch(); const p = await (await b.newContext({ viewport: { width: 1100, height: 700 }, deviceScaleFactor: 2 })).newPage();
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(3000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('home'); });
  await p.waitForTimeout(2500);
  for (const th of ['day', 'night']) {
    await p.evaluate((th) => { state.theme = th; applyTheme(); }, th); await p.waitForTimeout(600);
    await p.evaluate(() => { const old = document.getElementById('orbtest'); if (old) old.remove();
      const oxo = document.querySelector('#page-home .oxo.oxs'), cs = getComputedStyle(oxo), svg = oxo.querySelector('.oxo-drift').ownerSVGElement;
      const box = document.createElement('div'); box.id = 'orbtest'; box.style.cssText = 'position:fixed;left:0;top:0;width:1100px;height:700px;z-index:99999;display:flex;align-items:center;justify-content:space-around;background:' + getComputedStyle(document.body).backgroundColor;
      ['--c0', '--c1', '--c2', '--c3', '--c4', '--csh', '--ct1', '--ct2', '--ce1', '--ce2', '--cr0', '--cr1', '--cr2'].forEach((v) => box.style.setProperty(v, cs.getPropertyValue(v)));
      const W = 480, R = W * 40 / 120, X = -37 * W / 120;
      const a = svg.cloneNode(true); a.removeAttribute('class'); a.style.cssText = `width:${W}px;height:${W}px;display:block;overflow:visible`;
      [...a.querySelectorAll('[id]')].forEach((n) => { const id = n.id; n.id = 'ta' + id; a.querySelectorAll('*').forEach((m) => [...m.attributes].forEach((t) => { if (t.value.includes('url(#' + id + ')')) m.setAttribute(t.name, t.value.split('url(#' + id + ')').join('url(#ta' + id + ')')); })); });
      const ad = a.querySelector('.oxo-drift'); ad.removeAttribute('class'); ad.setAttribute('transform', 'translate(-37 0)');
      const wrap = document.createElement('span'); wrap.style.cssText = `position:relative;display:block;width:${W}px;height:${W}px;clip-path:circle(${R}px at 50% 50%);-webkit-clip-path:circle(${R}px at 50% 50%);-webkit-mask-image:radial-gradient(circle ${R}px at 50% 50%,#000 0,#000 ${R * .72}px,rgba(0,0,0,.3333) ${R}px);mask-image:radial-gradient(circle ${R}px at 50% 50%,#000 0,#000 ${R * .72}px,rgba(0,0,0,.3333) ${R}px)`;
      const c = svg.cloneNode(true); c.removeAttribute('class'); c.style.cssText = `position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;display:block;translate:${X}px 0`;
      [...c.querySelectorAll('[id]')].forEach((n) => { const id = n.id; n.id = 'tc' + id; c.querySelectorAll('*').forEach((m) => [...m.attributes].forEach((t) => { if (t.value.includes('url(#' + id + ')')) m.setAttribute(t.name, t.value.split('url(#' + id + ')').join('url(#tc' + id + ')')); })); });
      const g = c.querySelector('g[clip-path]'); g.removeAttribute('clip-path'); g.removeAttribute('mask'); c.querySelector('.oxo-drift').removeAttribute('class');
      wrap.appendChild(c); box.appendChild(a); box.appendChild(wrap); document.body.appendChild(box); });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/flat_${eng || 'webkit'}_${th}_a.png`, clip: { x: (1100 / 2 - 480) / 2 - 10 + 0, y: 100, width: 500, height: 500 } }).catch(() => {});
    const rects = await p.evaluate(() => [...document.querySelectorAll('#orbtest > *')].map((e) => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; }));
    await p.screenshot({ path: `${OUT}/flat_${eng || 'webkit'}_${th}_orig.png`, clip: rects[0] }); await p.screenshot({ path: `${OUT}/flat_${eng || 'webkit'}_${th}_gc.png`, clip: rects[1] }); }
  await b.close(); })().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(2); });
