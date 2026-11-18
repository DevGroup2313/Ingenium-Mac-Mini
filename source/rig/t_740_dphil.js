// Ingenium 7.40: your DPhil plan in Vocatio (modules/r323.js; her approved preview, source/previews/dphil_plan).
//   node rig/t_740_dphil.js <page url> <out folder>
// Checks: in Your counsellor, 4. Where you could go, her own profile shows the plan's card (days left, lean, next step); Open the plan
// shows the sheet with three tabs; Two ways opens on three rows, 4 more rows shows the other four; a lean is kept; The weeks opens on the
// next three steps, All 7 steps shows all; a tick is the goal's step in Goals and plan (one record), and the next step moves on; What was
// checked folds each source; Escape closes; another profile shows no card; night colours; a phone's screen; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(300000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngDPhil && window.IngCounsel, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('career'); });
  await p.waitForTimeout(1200);
  await p.evaluate(() => { IngCareer.state().ui.room = 'mentor'; IngCounsel.go('go'); }); await p.waitForTimeout(1200);
  const c0 = await p.evaluate(() => { const c = document.getElementById('dpCard'); const w = document.getElementById('csWork'); return c ? { text: c.textContent, inStage: !!(w && w.contains(c)), vis: !!c.offsetParent } : null; });
  ok(c0 && c0.inStage && c0.vis && /Your DPhil plan/.test(c0.text) && /days to 7 January/.test(c0.text) && /Leaning: Not decided/.test(c0.text) && /Next: Choose a way/.test(c0.text), 'Where you could go shows the plan\'s card: days left, the lean, the next step', c0);
  await p.click('#dpOpen'); await p.waitForTimeout(500);
  const s0 = await p.evaluate(() => { const d = document.querySelector('.dp'); if (!d) return null; return { tabs: [...d.querySelectorAll('.dp-tab')].map(t => t.textContent), sel: (d.querySelector('.dp-tab[aria-selected=true]') || {}).textContent,
    rows: [...d.querySelectorAll('.dp-cmp > .lab')].filter(x => x.offsetParent).map(x => x.textContent), goal: (IngCareer.state().goals || []).filter(g => g.dphil).map(g => g.steps.length) }; });
  ok(s0 && s0.tabs.length === 3 && s0.sel === 'Two ways' && s0.rows.join('|') === 'How long|Your full-time remote job|Funding named by the OII', 'the plan opens on Two ways, with its three deciding rows', s0);
  ok(s0 && s0.goal.length === 1 && s0.goal[0] === 7, 'its seven steps are one goal in Goals and plan', s0 && s0.goal);
  await p.locator('.dp .dp-key', { hasText: '4 more rows' }).click(); await p.waitForTimeout(200);
  const r7 = await p.evaluate(() => [...document.querySelectorAll('.dp-cmp > .lab')].filter(x => x.offsetParent).length);
  ok(r7 === 7, '4 more rows shows all seven', r7);
  await p.locator('.dp .dp-key', { hasText: 'Part-time, with my job' }).click(); await p.waitForTimeout(200);
  const ln = await p.evaluate(() => ({ lean: IngCareer.state().dphil.lean, mark: (document.querySelector('.dp-cmp > .hd.lean .nm') || {}).textContent }));
  ok(ln.lean === 'pt' && ln.mark === 'Part-time, beside a full-time job', 'a lean is kept, and marks its way', ln);
  await p.locator('.dp-tab', { hasText: 'The weeks' }).click(); await p.waitForTimeout(200);
  const w0 = await p.evaluate(() => [...document.querySelectorAll('.dp-step .dp-what')].map(x => x.firstChild.textContent));
  ok(w0.length === 3 && /^Choose a way/.test(w0[0]), 'The weeks opens on the next three steps', w0);
  await p.locator('.dp-step').first().click(); await p.waitForTimeout(200);
  const t1 = await p.evaluate(() => { const g = IngCareer.state().goals.filter(x => x.dphil)[0]; return { done: g.steps.filter(s => s.done).map(s => s.text), first: [...document.querySelectorAll('.dp-step .dp-what')].map(x => x.firstChild.textContent)[0], now: (document.querySelector('.dp-when.now') || {}).textContent, tab: (document.querySelector('.dp-tab[aria-selected=true] .n') || {}).textContent }; });
  ok(t1.done.length === 1 && /^Choose a way/.test(t1.done[0]) && /^Ask your referees/.test(t1.first) && /^Next/.test(t1.now) && t1.tab === '1 of 7', 'a tick is the goal\'s step too, and the next step moves on', t1);
  await p.locator('.dp .dp-key', { hasText: 'All 7 steps' }).click(); await p.waitForTimeout(200);
  ok(await p.evaluate(() => document.querySelectorAll('.dp-step').length) === 7, 'All 7 steps shows all of them');
  await p.locator('.dp-tab', { hasText: 'What was checked' }).click(); await p.waitForTimeout(200);
  const f0 = await p.evaluate(() => ({ n: document.querySelectorAll('.dp-s').length, open: document.querySelectorAll('.dp-s[open]').length }));
  ok(f0.n === 3 && f0.open === 0, 'What was checked folds each source', f0);
  await p.screenshot({ path: OUT + '/dphil_facts.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const c1 = await p.evaluate(() => ({ closed: !document.querySelector('.dp'), card: (document.getElementById('dpCard') || {}).textContent }));
  ok(c1.closed && /Leaning: Part-time, with my job/.test(c1.card) && /Next: Ask your referees/.test(c1.card), 'Escape closes it, and the card shows the lean and the next step', c1);
  await p.screenshot({ path: OUT + '/dphil_card.png' });
  // night, and a phone
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngDPhil.open(); }); await p.waitForTimeout(400);
  const nt = await p.evaluate(() => getComputedStyle(document.querySelector('.dp')).backgroundColor);
  ok(nt === 'rgb(32, 26, 43)', 'by night the plan takes the night colours', nt);
  await p.screenshot({ path: OUT + '/dphil_night.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(400);
  const ph = await p.evaluate(() => { const r = document.querySelector('.dp').getBoundingClientRect(); return { l: Math.round(r.left), r: Math.round(r.right), vw: innerWidth, sx: document.documentElement.scrollWidth }; });
  ok(ph.l >= 16 && ph.r <= ph.vw - 16 && ph.sx <= ph.vw, 'on a phone the plan fits the screen', ph);
  await p.evaluate(() => IngDPhil.close());
  // another profile: no card
  const other = await p.evaluate(async () => { const w = ms => new Promise(r => setTimeout(r, ms)); const S = IngCareer.state(); S.profile.isMe = false; S.ui.room = 'mentor'; IngCareer.render(); await w(300); IngCounsel.go('go'); await w(600);
    const has = !!document.getElementById('dpCard'); S.profile.isMe = true; IngCareer.render(); return has; });
  ok(other === false, 'another person\'s profile shows no DPhil card', other);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
