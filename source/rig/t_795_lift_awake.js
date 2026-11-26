// node rig/t_795_lift_awake.js <page url> <out folder>
// Ingenium 7.95: (1) Mentes, Health: each model's card (.hm-row) and the four readings (.hl-row) are raised at rest and rise under the
// pointer, by day and by night; Minimal motion keeps them still (modules/r398.js). (2) The screen stays on: while Ingenium works the page
// asks the app it runs in (a stand-in for the computer apps' keep_awake, the Fire app's and the iPhone app's keepAwake), renews it, and
// lets it go when the work ends (modules/r256.js). (3) Her rule is in How I work, once (r327, u795). Two pretend models, in this test only.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3];
if (!URL_ || !OUT) { console.log('usage: node rig/t_795_lift_awake.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function open(b, init) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 200))); if (init) await p.addInitScript(init);
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(1000); }
  return { ctx, p, errs };
}
(async () => {
  const b = await pw.chromium.launch();
  try {
    // ---------- (1) Health ----------
    const { ctx, p, errs } = await open(b);
    await p.evaluate(() => { const t = Date.now();
      state.models.push({ id: 'pv-a', name: 'Qwen3.5 9B', customName: 'Magister', fileName: 'Qwen3.5-9B-Q4_K_M.gguf', fileState: 'ready', params: 9, added: t },
                        { id: 'pv-b', name: 'LFM2.5 1.2B Instruct', customName: 'Velox', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', fileState: 'ready', params: 1.2, added: t });
      go('models'); });
    await sleep(2500); await p.evaluate(() => { try { renderHealth(); } catch (e) {} });
    await sleep(800);
    for (const theme of ['day', 'night']) {
      await p.evaluate((n) => { try { if (n) document.body.setAttribute('data-theme', 'night'); } catch (e) {} const h = document.getElementById('healthBox'); h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -20); }, theme === 'night');
      await sleep(900);
      for (const [sel, name] of [['#healthBox .hm-list .hm-row', "each model's card"], ['#healthBox .hl-rows .hl-row', 'a reading']]) {
        const rest = await p.evaluate((sel) => { const e = document.querySelector(sel); const cs = getComputedStyle(e); return { sh: cs.boxShadow, tr: cs.transform, n: document.querySelectorAll(sel).length }; }, sel);
        ok(rest.n >= 1 && rest.sh !== 'none' && !/^rgba\(34, 26, 46, 0\.06\) 0px 0px 0px 1px inset$/.test(rest.sh) && (rest.sh.match(/rgba?\(/g) || []).length >= 3, theme + ': ' + name + ' is raised at rest (the raised shadow, not a hairline)', rest);
        const box = await p.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        await p.mouse.move(box.x, box.y); await sleep(700);
        const hov = await p.evaluate((sel) => { const e = document.querySelector(sel); const cs = getComputedStyle(e); return { sh: cs.boxShadow, tr: cs.transform }; }, sel);
        ok(/matrix\(1, 0, 0, 1, 0, -3\)/.test(hov.tr) && hov.sh !== rest.sh, theme + ': ' + name + ' rises 3 pixels under the pointer, its shadow deepening', hov);
        if (theme === 'day' && name === "each model's card") await p.screenshot({ path: path.join(OUT, 'health_hover_day.png'), clip: { x: 220, y: 0, width: 1220, height: 700 } });
        if (theme === 'night' && name === "each model's card") await p.screenshot({ path: path.join(OUT, 'health_hover_night.png'), clip: { x: 220, y: 0, width: 1220, height: 700 } });
        await p.mouse.move(5, 5); await sleep(500);
      }
    }
    await p.evaluate(() => { document.body.removeAttribute('data-theme'); document.body.setAttribute('data-motion', 'minimal'); });
    const box = await p.evaluate(() => { const r = document.querySelector('#healthBox .hm-list .hm-row').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.mouse.move(box.x, box.y); await sleep(600);
    const still = await p.evaluate(() => getComputedStyle(document.querySelector('#healthBox .hm-list .hm-row')).transform);
    ok(still === 'none', 'Minimal motion keeps a card still under the pointer', still);
    // ---------- (3) her rule ----------
    const rule = await p.evaluate(() => { try { const w = window.IngWays && IngWays.list ? IngWays.list() : (state.ways && state.ways.list) || []; return w.map((x) => x.t || x).filter((t) => /No flat, motionless cards/.test(t)).length; } catch (e) { return -1; } });
    ok(rule === 1, 'her rule is in How I work, once: No flat, motionless cards ... in every app', rule);
    ok(errs.length === 0, 'no page error (Health)', errs);
    await ctx.close();
    // ---------- (2) the screen stays on: each app it may run in ----------
    for (const [kind, init] of [
      ['the computer apps (keep_awake)', () => { window.__calls = []; window.pywebview = { api: { keep_awake: (on, screen) => { window.__calls.push([!!on, !!screen]); return Promise.resolve({ ok: true }); } } }; }],
      ['the Fire app (keepAwake)', () => { window.__calls = []; window.IngeniumNative = { call: (j) => { const o = JSON.parse(j); if (o.method === 'keepAwake') window.__calls.push([!!o.args.on, true]); } }; }],
      ['the iPhone app (keepAwake)', () => { window.__calls = []; window.webkit = { messageHandlers: { ingenium: { postMessage: (j) => { const o = JSON.parse(j); if (o.method === 'keepAwake') window.__calls.push([!!o.args.on, true]); } } } }; }]]) {
      const o = await open(b, init);
      const can = await o.p.evaluate(() => !!(window.IngAwake && IngAwake.can() && IngAwake.native()));
      ok(can, kind + ': the page sees the app it runs in', can);
      await o.p.evaluate(() => { try { Engine.setStatus('busy'); } catch (e) { Engine.status = 'busy'; } }); await sleep(2200);
      const a = await o.p.evaluate(() => window.__calls.slice());
      ok(a.length >= 1 && a[a.length - 1][0] === true, kind + ': asked to keep awake while a reply is written', a);
      await o.p.evaluate(() => { try { Engine.setStatus('ready'); } catch (e) { Engine.status = 'ready'; } }); await sleep(2200);
      const z = await o.p.evaluate(() => window.__calls.slice());
      ok(z.length >= 2 && z[z.length - 1][0] === false, kind + ': let go when the work ends', z);
      if (kind.startsWith('the computer')) {
        const sw = await o.p.evaluate(() => { go('settings'); const i = document.getElementById('awakeOn'); return i ? !i.disabled : null; });
        ok(sw === true, kind + ': the switch Keep the screen on while Ingenium works is no longer disabled', sw);
      }
      ok(o.errs.length === 0, kind + ': no page error', o.errs); await o.ctx.close();
    }
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 600)); }
  finally { await b.close(); }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
