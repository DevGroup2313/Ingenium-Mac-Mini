// node rig/t_636_focus.js <Ingenium page url> <out dir>
// Ingenium 6.36 (6 November 2026): Focus in four parts (modules/r235.js): Today, Work, Calm, Supports, one at a time under four raised
// cards that are the tabs, each saying what stands in its part now. Measured on 6.35 at 1440 x 900 the page was 2,351 pixels tall
// (3,856 on a phone). Invented task, steps and thought only. Checks:
//   - four card-tabs in a tablist, Today first and shown, its three cards in sight and the others not; each tab says something true
//   - pressing Work, Calm, Supports shows each part's own cards; the arrow keys, Home and End move between the tabs
//   - the part chosen is kept after a reload; what each part's line says
//   - the page's height, part by part, at 1440 x 900 and on a phone, against 6.35's 2,351 and 3,856
//   - the tabs say what is true now: the step in front of you, the focus timer counting, a thought in the Inbox, a support turned off
//   - Now's "Steps, below" says where Steps is now, and its key goes there with the cursor in the task's box
//   - a card in a hidden part opens its part when it is scrolled to, focused, or ringed by the guided tour (its Focus pages)
//   - the Calm look stops every movement here; no page errors; every part ran
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const PARTS = { today: ['fxNowCard', 'fxTodayHost', 'fxRoutinesHost'], work: ['fxStepsCard', 'fxTimeCard', 'fxParkCard'], calm: ['fxCalmCard', 'fxWordsCard'], supports: ['fxSupportsHost'] };
const ALL = Object.values(PARTS).flat();
const seen = (p) => p.evaluate((ALL) => { const o = {}; ALL.forEach(id => { const e = document.getElementById(id); o[id] = !!(e && e.getClientRects().length && getComputedStyle(e).display !== 'none'); }); return o; }, ALL);
const tabs = (p) => p.evaluate(() => [...document.querySelectorAll('#page-focus .fxp-bar [role=tab]')].map(t => ({ part: t.getAttribute('data-part'), name: (t.querySelector('.fxp-name') || {}).textContent, stat: (t.querySelector('.fxp-stat') || {}).textContent, sel: t.getAttribute('aria-selected'), tabIndex: t.tabIndex })));
const height = (p) => p.evaluate(() => Math.round(document.getElementById('page-focus').scrollHeight));
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true && window.IngFocusParts, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => go('focus')); await p.waitForTimeout(1200); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. the card-tabs, Today first
  const t0 = await tabs(p), s0 = await seen(p);
  ok(t0.length === 4 && t0.map(t => t.name).join(',') === 'Today,Work,Calm,Supports' && t0[0].sel === 'true' && t0.filter(t => t.sel === 'true').length === 1 && t0[0].tabIndex === 0 && t0[1].tabIndex === -1,
    'four card-tabs in a tablist: Today, Work, Calm, Supports; Today chosen at first (one tab stop)', t0);
  ok(PARTS.today.every(id => s0[id]) && [...PARTS.work, ...PARTS.calm, ...PARTS.supports].every(id => !s0[id]), 'Today shows Now, what today asks of you and the routines; no other card', s0);
  ok(t0.every(t => t.stat && t.stat.length > 5) && /Nothing planned yet|A good moment for: /.test(t0[0].stat) && /Steps, a timer and the Inbox/.test(t0[1].stat) && /^Calm look (on|off) · text (smaller|standard|larger|largest)$/.test(t0[2].stat) && /^\d+ of \d+ on$/.test(t0[3].stat),
    'each tab says what stands in its part now (Today, Work, Calm, Supports)', t0.map(t => t.stat));
  await p.screenshot({ path: OUT + '/636_today.png' });
  // 2. each part
  const h = { today: await height(p) }, saysAll = {};
  for (const k of ['work', 'calm', 'supports']) {
    await p.click('#fxpT-' + k); await p.waitForTimeout(700);
    const s = await seen(p), others = Object.keys(PARTS).filter(x => x !== k).flatMap(x => PARTS[x]);
    saysAll[k] = await p.evaluate(() => document.getElementById('fxpSays').textContent);
    ok(PARTS[k].every(id => s[id]) && others.every(id => !s[id]) && (await tabs(p)).find(t => t.part === k).sel === 'true', 'pressing ' + k + ' shows its own cards and only those', s);
    h[k] = await height(p); await p.screenshot({ path: OUT + '/636_' + k + '.png' }); }
  ok(/small steps/.test(saysAll.work) && /quieter screen/.test(saysAll.calm) && /own switch/.test(saysAll.supports), 'each part has a line saying what it holds', saysAll);
  const max = Math.max(...Object.values(h));
  ok(max < 1300 && max < 2351 * 0.6, 'at 1440 x 900 each part is far shorter than the whole page was (6.35: 2,351 pixels): ' + JSON.stringify(h), h);
  // 3. the keys, and the part kept
  await p.focus('#fxpT-supports'); await p.keyboard.press('Home'); await p.waitForTimeout(200);
  const kh = await p.evaluate(() => [document.activeElement.id, document.querySelector('#fxpT-today').getAttribute('aria-selected')]);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  const ka = await p.evaluate(() => [document.activeElement.id, document.querySelector('#fxpT-calm').getAttribute('aria-selected')]);
  await p.keyboard.press('End'); await p.waitForTimeout(200); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  const ke = await p.evaluate(() => [document.activeElement.id, document.querySelector('#fxpT-today').getAttribute('aria-selected')]);
  ok(kh[0] === 'fxpT-today' && kh[1] === 'true' && ka[0] === 'fxpT-calm' && ka[1] === 'true' && ke[0] === 'fxpT-today' && ke[1] === 'true', 'Home, the arrows and End move between the tabs and show each part (the right arrow wraps round)', { kh, ka, ke });
  await p.click('#fxpT-work'); await p.waitForTimeout(300);
  const kept0 = await p.evaluate(() => localStorage.getItem('ing.focus.part.v1'));
  await p.reload(); await boot(p);
  const kept = await p.evaluate(() => document.getElementById('page-focus').getAttribute('data-fxp')), s1 = await seen(p);
  ok(kept0 === 'work' && kept === 'work' && PARTS.work.every(id => s1[id]), 'the part chosen is kept after a reload (Work)', { kept0, kept });
  // 4. on a phone
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  const hp = {}; for (const k of Object.keys(PARTS)) { await p.click('#fxpT-' + k); await p.waitForTimeout(500); hp[k] = await height(p); }
  const cols = await p.evaluate(() => getComputedStyle(document.querySelector('#page-focus .fxp-bar')).gridTemplateColumns.split(' ').length);
  const over = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  await p.click('#fxpT-today'); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/636_phone_today.png' });
  ok(Math.max(...Object.values(hp)) < 3856 * 0.6 && cols === 2 && !over, 'on a phone (390 wide) the tabs stand two by two, nothing spills sideways, and each part is far shorter than the page was (6.35: 3,856): ' + JSON.stringify(hp), { hp, cols, over });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(400);
  // 5. Now, with no task: where Steps is now
  await p.click('#fxpT-today'); await p.waitForTimeout(400);
  const now = await p.evaluate(() => { const t = [...document.querySelectorAll('#fxNow .fx-txt')].map(x => x.textContent).find(x => /^No task yet/.test(x)); const k = document.querySelector('#fxNow [data-fxp-go]'); return { t, k: k && k.textContent }; });
  await p.click('#fxNow [data-fxp-go]'); await p.waitForTimeout(500);
  const went = await p.evaluate(() => ({ part: document.getElementById('page-focus').getAttribute('data-fxp'), focus: document.activeElement && document.activeElement.closest && !!document.activeElement.closest('#fxSteps') }));
  ok(now.t === 'No task yet. Steps, in Work, turns a task into small steps.' && now.k === 'Go to Steps' && went.part === 'work' && went.focus, 'Now says where Steps is now (in Work, no longer "below"), and Go to Steps opens Work with the cursor in the task\'s box', { now, went });
  // 6. the tabs say what is true now
  await p.click('#fxpT-calm'); await p.waitForTimeout(300);
  await p.evaluate(() => { taskNew('Write the invented harbour report', ['Open the notes', 'Write the first line', 'Read it aloud']); state.parked = (state.parked || []).concat([{ id: 'p636', t: 'An invented thought to come back to', at: Date.now() }]); saveState(); fxRender(); });
  await p.waitForTimeout(1300); const t1 = await tabs(p);
  ok(/^Step 1 of 3: Open the notes$/.test(t1[0].stat) && /^Next: Open the notes · 1 thought in the Inbox$/.test(t1[1].stat), 'with a task and a thought: Today says the step in front of you, Work the next step and the thought in the Inbox', t1.map(t => t.stat));
  await p.evaluate(() => { if (!pomo.running) pomoToggleRun(); }); await p.waitForTimeout(2300); const t2 = await tabs(p);
  await p.evaluate(() => { if (pomo.running) pomoToggleRun(); }); await p.waitForTimeout(1300); const t3 = await tabs(p);
  ok(/^Focus: \d+:\d\d left · 1 thought in the Inbox$/.test(t2[1].stat) && /^Paused: \d+:\d\d left/.test(t3[1].stat), 'the focus timer is seen counting on Work\'s tab, and paused', [t2[1].stat, t3[1].stat]);
  await p.click('#fxpT-supports'); await p.waitForTimeout(400);
  const before = (await tabs(p))[3].stat;
  await p.evaluate(() => { const row = [...document.querySelectorAll('#fxSupportsHost .sc-sw')].find(r => r.querySelector('.seg-btn') && r.querySelector('.seg-btn').getAttribute('aria-pressed') === 'true'); row.querySelectorAll('.seg-btn')[1].click(); });
  await p.waitForTimeout(1300); const after = (await tabs(p))[3].stat;
  const n0 = +/^(\d+) of/.exec(before)[1], n1 = +/^(\d+) of/.exec(after)[1];
  ok(n1 === n0 - 1, 'turning a support off is counted at once on its tab (' + before + ', then ' + after + ')', { before, after });
  await p.evaluate(() => { const row = [...document.querySelectorAll('#fxSupportsHost .sc-sw')].find(r => r.querySelectorAll('.seg-btn')[1] && r.querySelectorAll('.seg-btn')[1].getAttribute('aria-pressed') === 'true' && !/Calm look/.test(r.textContent)); if (row) row.querySelector('.seg-btn').click(); });
  // 7. a card in a hidden part opens its part
  await p.click('#fxpT-today'); await p.waitForTimeout(300);
  await p.evaluate(() => document.getElementById('fxCalmCard').scrollIntoView()); await p.waitForTimeout(300);
  const r1 = await p.evaluate(() => document.getElementById('page-focus').getAttribute('data-fxp'));
  await p.evaluate(() => document.getElementById('fxParkIn').focus()); await p.waitForTimeout(300);
  const r2 = await p.evaluate(() => [document.getElementById('page-focus').getAttribute('data-fxp'), document.activeElement.id]);
  const r3 = await p.evaluate(() => { const st = (window.ING_TOUR || []).find(s => s && s.ring === '#fxSupportsHost') || (window.ING_TOUR || []).find(s => s && /#fxCalmCard/.test(String(s.ring))); if (!st) return 'no step'; IngFocusParts.show('today'); st.go(); return [String(st.ring), document.getElementById('page-focus').getAttribute('data-fxp')]; });
  const r4 = await p.evaluate(() => { if (typeof tourRing !== 'function') return 'no ring'; IngFocusParts.show('today'); try { tourRing('#fxTimeCard'); } catch (e) {} const k = document.getElementById('page-focus').getAttribute('data-fxp'); try { if (typeof tourEnd === 'function') tourEnd(); } catch (e) {} return k; });
  ok(r1 === 'calm' && r2[0] === 'work' && r2[1] === 'fxParkIn' && Array.isArray(r3) && r3[1] === ({ '#fxSupportsHost': 'supports', '#fxCalmCard': 'calm' })[r3[0]] && (r4 === 'work' || r4 === 'no ring'),
    'a card in a hidden part opens its part: scrolled to (Calm), focused (the Inbox, in Work), a guided tour page turned to (' + (r3 && r3[0]) + '), ringed by the tour (Time)', { r1, r2, r3, r4 });
  // 8. the Calm look stops the movement here
  const anim = await p.evaluate(() => { document.body.setAttribute('data-calm', '1'); const t = getComputedStyle(document.querySelector('#fxpT-work')).animationName; document.body.setAttribute('data-calm', '0'); const u = getComputedStyle(document.querySelector('#fxpT-work')).animationName; return [t, u]; });
  ok(anim[0] === 'none' && anim[1] === 'fxpRise', 'the Calm look stops the cards\' movement (and without it they rise in)', anim);
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
