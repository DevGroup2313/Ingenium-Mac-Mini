// node rig/t_797_health.js <page url> [<modules/r398.js> inject]
// Ingenium 7.97 (modules/r398.js, corrected): Mentes, Health: each model's card and each reading rest flat (the pale card ground and a
// hairline, as Your models' cards rest), and under the pointer the white face fades in, the raised shadow comes up and it rises 3 pixels;
// by day and by night. (rig/t_795_lift_awake.js's part (1) expected the raised look at rest, which she refused.) Two pretend models.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  if (process.argv[4] === 'inject') { const css = fs.readFileSync(process.argv[3], 'utf8').match(/<style id="r398-css">([\s\S]*?)<\/style>/)[1]; await p.evaluate((css) => { document.getElementById('r398-css').textContent = css; }, css); }
  await p.evaluate(() => { const t = Date.now(); state.models.push({ id: 'pv-a', name: 'Qwen3.5 9B', fileName: 'Qwen3.5-9B-Q4_K_M.gguf', fileState: 'ready', params: 9, added: t }, { id: 'pv-b', name: 'LFM2.5 1.2B Instruct', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', fileState: 'ready', params: 1.2, added: t }); go('models'); });
  await sleep(2500); await p.evaluate(() => { try { renderHealth(); } catch (e) {} }); await sleep(800);
  for (const theme of ['day', 'night']) {
    await p.evaluate((n) => { if (n) document.body.setAttribute('data-theme', 'night'); else document.body.removeAttribute('data-theme'); const h = document.getElementById('healthBox'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -20); }, theme === 'night');
    for (const [sel, name] of [['#healthBox .hm-list .hm-row', "each model's card"], ['#healthBox .hl-rows .hl-row', 'a reading']]) {
      const rd = () => p.evaluate((s) => { const e = document.querySelector(s), c = getComputedStyle(e), bf = getComputedStyle(e, '::before'); return { sh: c.boxShadow, tr: c.transform, face: bf.opacity, n: document.querySelectorAll(s).length }; }, sel);
      await p.mouse.move(2, 2); await sleep(700); const rest = await rd();
      ok(rest.n >= 1 && /^rgba?\([^)]*\) 0px 0px 0px 1px inset$/.test(rest.sh) && rest.tr === 'none' && rest.face === '0', theme + ': ' + name + ' rests flat (a hairline, no shadow, not raised)', rest);
      const box = await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(20, r.height / 2) }; }, sel);
      await p.mouse.move(box.x, box.y); await sleep(800); const hov = await rd();
      ok(/matrix\(1, 0, 0, 1, 0, -3\)/.test(hov.tr) && (hov.sh.match(/rgba?\(/g) || []).length >= 3 && hov.face === '1', theme + ': under the pointer ' + name + ' pops out (white face, raised shadow, 3 pixels up)', hov);
    }
  }
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
