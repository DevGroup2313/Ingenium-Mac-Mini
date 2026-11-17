// Pictures of the diamond's colours on a test page: the head with its key, the panel open, several colours by day and night, Settings' card
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [U, OUT, DSF] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: +DSF || 1 }); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200))); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 200)); });
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('build'); window.__tFix = 3.2; });
  await p.waitForTimeout(4000);
  const headShot = async (name) => { await p.evaluate(() => { window.scrollTo(0, 0); const h = document.querySelector('#page-build > .skh'); if (h) h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await p.waitForTimeout(1800);
    const r = await p.evaluate(() => { const h = document.querySelector('#page-build > .skh').getBoundingClientRect(); return { x: Math.max(0, h.left - 8), y: Math.max(0, h.top - 8), width: Math.min(innerWidth, h.width + 16), height: Math.min(innerHeight - Math.max(0, h.top - 8), h.height + 16) }; });
    await p.screenshot({ path: path.join(OUT, name + '.png'), clip: r }); };
  const st = await p.evaluate(() => ({ diamond: window.IngDiamond && IngDiamond.state(), colours: !!window.IngDiamondColours, key: !!document.getElementById('bdColours'), part: window.__ingParts.p314 }));
  console.log('state', JSON.stringify(st));
  await headShot('01_head_key_day');
  await p.evaluate(() => IngDiamondColours.open()); await p.waitForTimeout(800); await headShot('02_panel_by_hour_day');
  const steps = [['03_own_ruby_deep_day', { look: 'own', stone: '#c8143c', depth: 0.9 }], ['04_own_emerald_band_sapphire_day', { look: 'own', stone: '#1f9d63', depth: 0.7, band: '#2f5bd3' }],
    ['05_own_aqua_faint_day', { look: 'own', stone: '#2fb7c7', depth: 0.3, band: null }], ['06_look_lavender_day', { look: 'lavender', band: null }], ['07_look_night_day', { look: 'night' }]];
  for (const [n, ch] of steps) { await p.evaluate(c => IngDiamondColours.set(c), ch); await p.waitForTimeout(1500); await headShot(n); }
  await p.evaluate(() => { IngDiamondColours.set({ look: 'own', stone: '#e8649a', depth: 0.75, band: '#e8962a' }); state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(2200); await headShot('08_own_rose_band_amber_night');
  await p.evaluate(() => { IngDiamondColours.close(); }); await p.waitForTimeout(600); await headShot('09_rose_night_closed');
  await p.evaluate(() => { IngDiamondColours.reset(); state.theme = 'day'; applyTheme(); go('settings'); IngRooms.open('settings', 'everyday'); }); await p.waitForTimeout(1500);
  const card = await p.evaluate(() => { const c = document.getElementById('dmcCard'); if (!c) return null; const t = c.closest('.st-tile') || c; const r0 = c.closest('.rm-panel');
    try { if (window.IngSettingsRaised) IngSettingsRaised.open(c); } catch (e) {} c.scrollIntoView({ block: 'center' }); return { room: r0 && r0.getAttribute('data-room'), tile: (c.className || '') }; });
  console.log('card', JSON.stringify(card)); await p.waitForTimeout(1200);
  const cr = await p.evaluate(() => { const r = document.getElementById('dmcCard').getBoundingClientRect(); return { x: Math.max(0, r.left - 10), y: Math.max(0, r.top - 10), width: r.width + 20, height: Math.min(innerHeight - Math.max(0, r.top - 10), r.height + 20) }; });
  await p.screenshot({ path: path.join(OUT, '10_settings_card_day.png'), clip: cr });
  const after = await p.evaluate(() => ({ err: window.IngDiamond && IngDiamond.state().err, saved: (typeof state !== 'undefined' && state.diamond) || null }));
  console.log('after', JSON.stringify(after)); console.log('errors', JSON.stringify(errs)); await b.close();
})();
