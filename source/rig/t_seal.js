const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const S = process.env.S, O = S + '/shots/seal/';
  const info = await (await fetch('http://127.0.0.1:18999/')).json();
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(({ names }) => { const api = {}; for (const n of names) api[n] = (...a) => fetch('http://127.0.0.1:18999/call/' + n, { method: 'POST', body: JSON.stringify(a) }).then(r => r.json()).then(j => j.v); window.pywebview = { api }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: info.names });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await page.goto(`http://127.0.0.1:${info.port}/ingenium.html?b=seal`);
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await page.waitForTimeout(1500);
  const out = {};
  out.parts = await page.evaluate(() => window.__ingParts && window.__ingParts.p36);
  out.struct = await page.evaluate(() => { const d = IngR104.door(), h = IngR104.head();
    const ids = [...document.querySelectorAll('.isl [id]')].map(n => n.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    const lay = w => w ? [...w.querySelectorAll('.isl-layer')].map(l => l.className.split(' ')[1] + ':' + l.querySelector('svg').children.length) : null;
    return { door: lay(d), head: lay(h), doorS: d && d.style.getPropertyValue('--S'), headS: h && h.style.getPropertyValue('--S'), dupIds: dup.length, oldSvgs: document.querySelectorAll('#introSeal > svg, #brandSealBtn > svg').length,
      doorOpen: !document.getElementById('introDoor').hasAttribute('hidden') }; });
  const clipOf = async (sel, pad) => { const b = await page.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, sel); return { x: b[0] - pad, y: b[1] - pad, width: b[2] + 2 * pad, height: b[3] + 2 * pad }; };
  await page.waitForTimeout(1200);
  const dc = await clipOf('#introSeal', 26);
  for (const [i, t] of [[0, 0], [1, 1750], [2, 1750], [3, 1750]]) { await page.waitForTimeout(t); await page.screenshot({ path: O + 'door_sway' + i + '.png', clip: dc }); }
  // hover upper left, then press
  const c = await page.evaluate(() => { const r = document.querySelector('#introSeal .isl').getBoundingClientRect(); return [r.left, r.top, r.width]; });
  await page.mouse.move(c[0] + c[2] * 0.2, c[1] + c[2] * 0.2, { steps: 5 }); await page.waitForTimeout(600);
  out.hover = await page.evaluate(() => { const w = IngR104.door(); return [w.className, w.style.getPropertyValue('--rx'), w.style.getPropertyValue('--ry')]; });
  await page.screenshot({ path: O + 'door_hover_ul.png', clip: dc });
  await page.mouse.move(c[0] + c[2] * 0.85, c[1] + c[2] * 0.8, { steps: 5 }); await page.waitForTimeout(600);
  await page.screenshot({ path: O + 'door_hover_lr.png', clip: dc });
  await page.mouse.down(); await page.waitForTimeout(250); await page.screenshot({ path: O + 'door_down.png', clip: dc });
  out.down = await page.evaluate(() => IngR104.door().className);
  await page.mouse.up(); await page.waitForTimeout(120);
  out.knock = await page.evaluate(() => document.getElementById('introSeal').className);
  await page.waitForTimeout(900);
  out.doorAfterClick = await page.evaluate(() => !document.getElementById('introDoor').hasAttribute('hidden'));
  out.headRise = await page.evaluate(() => IngR104.head().className);
  await page.mouse.move(600, 600); await page.waitForTimeout(600);
  const hc = await clipOf('#brandSealBtn', 10);
  await page.screenshot({ path: O + 'head.png', clip: hc });
  // night
  await page.evaluate(() => { state.theme = 'night'; applyTheme(); }); await page.waitForTimeout(800);
  await page.screenshot({ path: O + 'head_night.png', clip: hc });
  await page.click('#brandSealBtn'); await page.waitForTimeout(150);
  out.headKnock = await page.evaluate(() => IngR104.head().className);
  await page.waitForTimeout(1300);
  out.doorReopened = await page.evaluate(() => !document.getElementById('introDoor').hasAttribute('hidden'));
  out.doorRise = await page.evaluate(() => [IngR104.door().className, document.getElementById('introSeal').className]);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: O + 'door_night.png', clip: await clipOf('#introSeal', 26) });
  await page.screenshot({ path: O + 'door_night_full.png' });
  // minimal motion
  await page.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await page.waitForTimeout(300);
  out.minimal = await page.evaluate(() => [getComputedStyle(document.querySelector('#introSeal .isl-idle')).animationName, getComputedStyle(document.querySelector('#introSeal .isl-idle')).transform]);
  await page.evaluate(() => { document.body.setAttribute('data-motion', 'full'); state.theme = 'light'; applyTheme(); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: O + 'door_day_full.png' });
  out.errs = errs;
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
