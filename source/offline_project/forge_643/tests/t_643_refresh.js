// The Forge 643 · the loading page (blocks_early/splash.html) and Refresh (blocks/forge_refresh.html), in Chromium:
// the loading page is painted before the rest is read and lifts once the Forge's door is written; by night it is dark from
// the first look; the Refresh key stands beside Display; Refresh, F5 and Ctrl+R save first and start again; while Fabrica is
// still making something, Refresh asks first; a press on a room not yet opened shows "Painting …" and the note goes after.
//   node tests/t_643_refresh.js http://127.0.0.1:8312/the_forge_643_lean.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 300) : '')); c ? pass++ : fail++; };
async function watchLoad(p) {
  const seen = { before: 0, polls: 0, night: false, pcts: [] }; const t0 = Date.now();
  while (Date.now() - t0 < 90000) {
    let r = null;
    try { r = await p.evaluate(() => { const b = document.getElementById('forge-boot'); if (!b) return null; const d = document.getElementById('cd-door');
      return { gone: b.classList.contains('fb-gone'), door: !!(d && d.getAttribute('data-forge-written') === '1'), night: b.classList.contains('fb-night'),
        pct: +(b.querySelector('.fb-bar').getAttribute('aria-valuenow') || 0), say: document.getElementById('fb-say').textContent }; }); } catch (e) { }
    if (r) { seen.polls++; if (!r.door && !r.gone) seen.before++; if (r.night) seen.night = true; if (r.pct) seen.pcts.push(r.pct); seen.say = r.say; if (r.gone) break; }
    await new Promise(z => setTimeout(z, 40));
  }
  return seen;
}
const saved = p => p.evaluate(() => { try { return JSON.parse(localStorage.getItem('carpe_diem_offline_v1') || '{}').__refreshProbe || null; } catch (e) { return 'err'; } });

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  p.goto(URL_).catch(() => { });
  const s1 = await watchLoad(p);
  ok(s1.before > 0, 'the loading page covers the Forge until its door is written', s1.before + ' of ' + s1.polls);
  ok(/still being painted; nothing has crashed/.test(s1.say), 'it says the page is still being painted', s1.say);
  ok(s1.pcts.every((v, i, a) => !i || v >= a[i - 1]), 'its bar only moves forward', s1.pcts.slice(0, 20));
  const mp = await p.evaluate(() => ({ n: document.scripts.length, m: (document.documentElement.innerHTML.match(/FORGE_BOOT_MAP\*\/(\[[0-9,]*\])/) || [])[1] }));
  const ml = mp.m ? JSON.parse(mp.m).length : -1;
  ok(ml > 20 && Math.abs(ml - mp.n) <= Math.max(3, Math.round(ml * 0.05)), "the bar's map counts the page's scripts as the browser does", { map: ml, scripts: mp.n });
  const key = await p.evaluate(() => { const k = document.getElementById('forge-refresh-btn'); return k && { next: k.nextElementSibling && k.nextElementSibling.id, label: k.getAttribute('aria-label'), vis: !!k.offsetParent }; });
  ok(key && key.next === 'display-btn' && key.label === 'Refresh the Forge', 'the Refresh key stands beside Display, labelled', key);

  // Refresh saves first
  await p.evaluate(() => { state.__refreshProbe = 'r-' + Date.now(); });
  const probe = await p.evaluate(() => state.__refreshProbe);
  await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => { }), p.evaluate(() => document.getElementById('forge-refresh-btn').click())]);
  const s2 = await watchLoad(p);
  ok(await saved(p) === probe, 'Refresh saves first and starts the Forge again', probe);
  ok(/after Refresh/.test(s2.say), 'the loading page says it is starting again after Refresh', s2.say);
  // F5 and Ctrl+R
  await p.evaluate(() => { state.__refreshProbe = 'f5-' + Date.now(); });
  const probe2 = await p.evaluate(() => state.__refreshProbe);
  let navd = false; const nav1 = p.waitForNavigation({ timeout: 15000 }).then(() => navd = true).catch(() => { });
  await p.keyboard.press('F5'); await nav1; await watchLoad(p);
  ok(navd && await saved(p) === probe2, 'F5 saves first and starts again', probe2);
  navd = false; const nav2 = p.waitForNavigation({ timeout: 15000 }).then(() => navd = true).catch(() => { });
  await p.keyboard.press('Control+r'); await nav2; await watchLoad(p);
  ok(navd, 'Ctrl+R starts again the same way');
  // while Fabrica is making something, it asks first
  await p.evaluate(() => { let fb = document.getElementById('fb'); if (!fb) { fb = document.createElement('div'); fb.id = 'fb'; document.body.appendChild(fb); } const t = document.createElement('div'); t.className = 'f-toast'; t.id = 'probe-toast'; fb.appendChild(t); });
  navd = false; const nav3 = p.waitForNavigation({ timeout: 4000 }).then(() => navd = true).catch(() => { });
  await p.evaluate(() => document.getElementById('forge-refresh-btn').click()); await p.waitForTimeout(400);
  const asked = await p.evaluate(() => /Refresh the Forge\?/.test(document.body.innerText) && /Fabrica is still making something/.test(document.body.innerText));
  await p.screenshot({ path: path.join(OUT, 'f643-ask.png') });
  ok(asked, 'while Fabrica is making something, Refresh asks first and says why');
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Keep waiting' && x.offsetParent); if (k) k.click(); });
  await nav3;
  ok(!navd && await p.evaluate(() => !!document.getElementById('probe-toast')), 'Keep waiting leaves the page as it is');
  await p.evaluate(() => document.getElementById('probe-toast').remove());
  // a room not yet opened shows "Painting …" during the press (the door closed first, as the owner would)
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); });
  await p.waitForFunction(() => { const d = document.getElementById('cd-door'); return !d || getComputedStyle(d).display === 'none' || getComputedStyle(d).visibility === 'hidden'; }, null, { timeout: 8000 }).catch(() => { });
  await p.waitForTimeout(600);
  await p.evaluate(() => { window.__pd = []; document.addEventListener('pointerdown', e => window.__pd.push(String(e.target.id || e.target.className || e.target.tagName)), true); });
  const room = await p.evaluate(() => { const cur = document.body.getAttribute('data-froom'); const b = [...document.querySelectorAll('.nav-inner [data-room]')].find(x => x.offsetParent && x.getAttribute('data-room') !== cur && x.getAttribute('data-room') !== 'editor'); return b ? b.getAttribute('data-room') : null; });
  if (room) {
    await p.evaluate(r => { document.querySelector('.nav-inner [data-room="' + r + '"]').addEventListener('click', () => { const t = Date.now(); while (Date.now() - t < 900) { } }, true); }, room);
    const bx = await (await p.$('.nav-inner [data-room="' + room + '"]')).boundingBox();
    await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.mouse.down(); await p.waitForTimeout(260);
    const up = await p.evaluate(() => { const c = document.getElementById('forge-painting'); return c && { on: c.classList.contains('on'), t: c.textContent, op: getComputedStyle(c).opacity }; });
    await p.screenshot({ path: path.join(OUT, 'f643-painting.png') });
    ok(up && up.on && /^Painting /.test(up.t) && +up.op > 0.5, 'a press on a room not yet opened shows "Painting …" during the press', up || await p.evaluate(() => ({ pd: window.__pd, door: !!document.getElementById('cd-door') })));
    await p.mouse.up(); await p.waitForTimeout(2200);
    const after = await p.evaluate(() => ({ on: document.getElementById('forge-painting').classList.contains('on'), room: document.body.getAttribute('data-froom') }));
    ok(!after.on && after.room === room, 'the room opens and the note goes once it is painted', after);
  } else ok(false, 'a room to open was found');
  // a few Refreshes in a row are not taken for failed starts: the work is never set aside
  const held = await p.evaluate(() => ({ note: !!document.getElementById('cd-held-note'), held: Object.keys(localStorage).filter(k => k.indexOf('forge-held:') === 0).length }));
  ok(!held.note && held.held === 0, 'quick Refreshes in a row are never taken for failed starts (nothing set aside)', held);
  // by night
  await p.evaluate(() => { state.theme = 'night'; saveState(); });
  await p.reload().catch(() => { }); const s3 = await watchLoad(p);
  ok(s3.night, 'by night the loading page is dark from the first look');
  await p.evaluate(() => { state.theme = 'light'; saveState(); });
  const mine = errs.filter(e => /forge-boot|fb-|forge-refresh|forgeRefresh|painting|__forgeBoot/.test(e));
  ok(!mine.length, 'no errors from the loading page or Refresh', mine.slice(0, 3));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
