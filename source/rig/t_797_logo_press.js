// node rig/t_797_logo_press.js <page url> <modules/r402.js> <out folder> [inject]
// Ingenium 7.97 and 7.98 (modules/r402.js): on an Ingenia folder's page, the app's logo sinks while held (7.98: nothing drawn around it), springs back, and plays a
// flourish, a different one at each press; Ingenium's own seal plays the seal key's set on its own layers; Minimal motion keeps only the press.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const src = fs.readFileSync(process.argv[3], 'utf8'); const css = src.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1]; const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];
  const OUT = process.argv[4]; fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  if (process.argv[5] === 'inject') await p.evaluate(([css, js]) => { const s = document.createElement('style'); s.id = 'r402-css'; s.textContent = css; document.body.appendChild(s); (0, eval)(js); }, [css, js]);
  await p.evaluate(() => go('folders')); await sleep(1800);
  for (const app of ['Carpe Diem', 'Ingenium']) {
    await p.evaluate(() => { go('folders'); const b = [...document.querySelectorAll('#page-folders button, #page-folders a, #page-folders [role=button]')].find((x) => x.offsetParent && /^Ingenia$/.test(x.textContent.trim())); if (b) b.click(); }); await sleep(1200);
    await p.evaluate((n) => { const c = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => x.textContent.trim().startsWith(n)); c.click(); }, app); await sleep(2000);
    const box = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); k.scrollIntoView({ block: 'center' }); const r = k.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, l: r.left, t: r.top }; });
    await sleep(500); const clip = { x: box.l - 40, y: box.t - 40, width: box.w + 80, height: box.h + 80 };
    const tag = app.replace(' ', '');
    await p.mouse.move(box.x, box.y); await sleep(500);
    await p.screenshot({ path: path.join(OUT, tag + '_1_rest.png'), clip });
    await p.mouse.down(); await sleep(250);
    const down = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); const c = getComputedStyle(k), w = getComputedStyle(k, '::before'); return { tr: c.translate, sc: c.scale, around: w.content, ring: !!k.querySelector(':scope > .r402-ring') }; });
    ok(parseFloat(down.sc) <= 0.91 && parseFloat(down.tr.split(' ')[1] || down.tr) > 5 && down.around === 'none' && !down.ring, app + ': held, it sinks (lower, smaller), and nothing is drawn around it (no recess, no ring)', down);
    await p.screenshot({ path: path.join(OUT, tag + '_2_held.png'), clip });
    await p.mouse.up(); await sleep(140);
    const fl = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); return { n: k.getAttribute('data-r402'), cls: k.className, anim: getComputedStyle(k).animationName }; });
    ok(!!fl.n && /r402/.test(fl.anim + fl.cls), app + ': let go, it springs back and plays a flourish (' + fl.n + ')', fl);
    await p.screenshot({ path: path.join(OUT, tag + '_3_flourish.png'), clip });
    const seen = new Set([fl.n]);
    for (let i = 0; i < 7; i++) { await sleep(1100); await p.mouse.down(); await sleep(60); await p.mouse.up(); await sleep(120); seen.add(await p.evaluate(() => document.querySelector('#page-folders .ig-ls.ig-key').getAttribute('data-r402'))); }
    ok(seen.size >= 3, app + ': presses in a row play different flourishes', [...seen]);
    if (app === 'Ingenium') { const set = await p.evaluate(() => IngAppKeyPress.sets.ingenium); ok(set.indexOf('star') >= 0 && set.indexOf('stone') >= 0 && set.indexOf('ringp') >= 0, "Ingenium's own seal plays the seal key's set: its star, its ring, its heart stone", set); }
    await sleep(1200); await p.mouse.down(); await sleep(800); await p.mouse.up(); await sleep(120);
    ok((await p.evaluate(() => document.querySelector('#page-folders .ig-ls.ig-key').getAttribute('data-r402'))) === 'big', app + ': a press held over half a second gives the full spin with a glow');
    await sleep(1400);
  }
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await sleep(200);
  const m = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); const r = IngAppKeyPress.play(k, false); return { r, anim: getComputedStyle(k).animationName }; });
  ok(m.r === null, 'Minimal motion: no flourish (the press and its sound stay)', m);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
