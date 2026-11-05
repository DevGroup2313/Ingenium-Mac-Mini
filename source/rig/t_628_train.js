// The Train room in parts (Ingenium 6.28, modules/r232.js). Her words (5 November 2026): "The cards on the Train tab inside of the
// Models page is really stiff and not animated or clickable, please fix that. There is also a lot of scrolling on that page, it should
// have a redesign that has some tabs and sections to better show the page and not have me endlessly scrolling".
//   node rig/t_628_train.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1500))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('models'); });
  await p.waitForTimeout(700); await p.evaluate(() => { IngRooms.open('models', 'studio'); IngStudio.open('train', true); }); await p.waitForTimeout(1200);

  /* 1. three parts, one at a time, each about a window tall (6.27: the room was 3,400 pixels) */
  const P = await p.evaluate(() => ({ tabs: [...document.querySelectorAll('#stP-train .tn-tab')].map(t => t.textContent.trim()), sel: (document.querySelector('#stP-train .tn-tab[aria-selected="true"]') || {}).textContent }));
  ok(P.tabs.join('|') === 'Overview|Workbench|Trainer' && P.sel, 'the Train room has three parts: Overview, Workbench and Trainer', P);
  const H = {}, V = {};
  for (const k of ['overview', 'workbench', 'trainer']) { await p.click('#tnT-' + k); await p.waitForTimeout(600);
    H[k] = await p.evaluate(() => document.scrollingElement.scrollHeight);
    V[k] = await p.evaluate(() => ['ingTruthCard', 'ingLabCard', 'trainCard'].filter(id => { const c = document.getElementById(id); return c && c.offsetParent !== null; })); }
  ok(V.overview.join() === 'ingTruthCard' && V.workbench.join() === 'ingLabCard' && V.trainer.join() === 'trainCard', 'each part shows its own card alone', V);
  ok(Object.values(H).every(h => h <= 1750), 'each part is at most 1,750 pixels tall at 1440 by 900 (the room was 3,400)', H);
  const kept = await p.evaluate(() => localStorage.getItem('ing.train.part.v1'));
  ok(kept === 'trainer', 'the part chosen last is kept on this device', kept);

  /* 2. the Overview's four cards are tiles that open */
  await p.click('#tnT-overview'); await p.waitForTimeout(600);
  const T = await p.evaluate(() => [...document.querySelectorAll('#ingTruthBands > .tr-band')].map(li => ({ k: li.getAttribute('data-band'), tile: li.classList.contains('tn-tile'), role: li.getAttribute('role'), exp: li.getAttribute('aria-expanded'),
    sum: (li.querySelector('.tn-sum') || {}).textContent || '', p: [...li.querySelectorAll('p')].filter(x => x.offsetParent).length, chev: !!li.querySelector('.tn-chev svg'), anim: getComputedStyle(li).animationName })));
  ok(T.length === 4 && T.every(t => t.tile && t.role === 'button' && t.exp === 'false' && t.sum.length > 15 && t.p === 0 && t.chev && t.anim === 'tnRise'), 'the four cards are folded tiles: a chip, a title, a first sentence and a key to open them; they rise in', T);
  const before = await p.evaluate(() => getComputedStyle(document.querySelector('#ingTruthBands > [data-band="lora"]')).transform);
  const bx = await p.evaluate(() => { const r = document.querySelector('#ingTruthBands > [data-band="lora"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + 20 }; });
  await p.mouse.move(bx.x, bx.y); await p.waitForTimeout(450); const lifted = await p.evaluate(() => getComputedStyle(document.querySelector('#ingTruthBands > [data-band="lora"]')).transform); await p.mouse.move(5, 5);
  ok(/matrix\(1, 0, 0, 1, 0, -[1-3]/.test(lifted) && lifted !== before, 'a card lifts under the pointer', { before, lifted });
  await p.click('#ingTruthBands > [data-band="frontier"]'); await p.waitForTimeout(500);
  const o1 = await p.evaluate(() => { const li = document.querySelector('#ingTruthBands > [data-band="frontier"]'), r = li.getBoundingClientRect(); return { exp: li.getAttribute('aria-expanded'), p: [...li.querySelectorAll('p')].filter(x => x.offsetParent).length, w: Math.round(r.width), cw: Math.round(document.getElementById('ingTruthBands').getBoundingClientRect().width) }; });
  ok(o1.exp === 'true' && o1.p === 2 && o1.w >= o1.cw - 2, 'pressed, a card opens across the card with all it says', o1);
  await p.focus('#ingTruthBands > [data-band="small"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  const o2 = await p.evaluate(() => ({ small: document.querySelector('#ingTruthBands > [data-band="small"]').getAttribute('aria-expanded'), frontier: document.querySelector('#ingTruthBands > [data-band="frontier"]').getAttribute('aria-expanded') }));
  ok(o2.small === 'true' && o2.frontier === 'false', 'from the keyboard too, and the card open before folds', o2);
  await p.screenshot({ path: OUT + '/overview.png' });

  /* 3. the workbench: one step at a time, for every tool */
  await p.click('#tnT-workbench'); await p.waitForTimeout(600);
  const W = await p.evaluate(async () => { const out = []; for (const t of [...document.querySelectorAll('#ingLabCard .lb-tab')]) { t.click(); await new Promise(r => setTimeout(r, 350));
    const pn = [...document.querySelectorAll('#labPanels > .lb-panel')].find(x => !x.hidden); const steps = [...pn.querySelectorAll(':scope > .tn-steps .tn-step')].map(s => s.textContent.replace(/^\d+/, '').trim());
    const shown = [...pn.querySelectorAll(':scope > .lb-sec')].filter(s => s.offsetParent !== null).length; out.push({ tool: t.textContent.trim(), steps, shown, cur: (pn.querySelector('.tn-step[aria-current="step"]') || {}).textContent }); }
    document.querySelector('#ingLabCard .lb-tab').click(); return out; });
  ok(W.length === 4 && W.every(w => w.steps.length === 5 && w.shown === 1 && w.cur), 'each of the four tools shows its five steps as a row, and one step at a time', W);
  ok(W[0].steps.join('|') === 'Your text|How big|Learn|Try it|Keep it', 'Write like my text: Your text, How big, Learn, Try it, Keep it', W[0].steps);
  await p.click('#labP-chars .tn-step[data-step="2"]'); await p.waitForTimeout(400);
  const s3 = await p.evaluate(() => { const on = document.querySelector('#labP-chars > .lb-sec.tn-on'); return { h: on.querySelector('h3').textContent, back: (on.querySelector('.tn-back') || {}).textContent, next: (on.querySelector('.tn-next') || {}).textContent }; });
  ok(/^3\. Learn/.test(s3.h) && /How big/.test(s3.back) && /Next: Try it/.test(s3.next), 'a step\'s key opens it, with Back and Next naming the steps either side', s3);
  await p.click('#labP-chars > .lb-sec.tn-on .tn-next'); await p.waitForTimeout(400);
  ok(/^4\. Try it/.test(await p.evaluate(() => document.querySelector('#labP-chars > .lb-sec.tn-on h3').textContent)), 'Next goes on to Try it');

  /* 4. a real lesson keeps running whichever step is shown */
  await p.click('#labP-chars .tn-step[data-step="0"]'); await p.waitForTimeout(300);
  const sample = await p.evaluate(() => { const k = [...document.querySelectorAll('#labP-chars > .lb-sec.tn-on button')].find(x => /sample/i.test(x.textContent)); if (k) k.click(); return !!k; });
  await p.click('#labP-chars .tn-step[data-step="2"]'); await p.waitForTimeout(300);
  const started = await p.evaluate(() => { const k = [...document.querySelectorAll('#labP-chars > .lb-sec.tn-on button')].find(x => /^Start the lesson/.test(x.textContent.trim())); if (k) k.click(); return !!k; });
  await p.waitForFunction(() => window.IngLab && IngLab.current().running, null, { timeout: 120000 }).catch(() => {});
  await p.click('#labP-chars .tn-step[data-step="3"]'); await p.waitForTimeout(2500);
  const run = await p.evaluate(() => ({ running: IngLab.current().running, step: (document.querySelector('#labP-chars .tn-step[aria-current="step"]') || {}).textContent }));
  await p.evaluate(() => IngLab.stopAll()); await p.waitForTimeout(800);
  ok(sample && started && run.running === 'chars' && /Try it/.test(run.step), 'a lesson started in Learn keeps running while Try it is shown (a tiny model trained in the page)', { sample, started, run });

  /* 5. reached from elsewhere: the workbench opened by another page, and a part of the Trainer revealed */
  await p.click('#tnT-overview'); await p.waitForTimeout(300);
  const lab = await p.evaluate(async () => { go('chat'); await new Promise(r => setTimeout(r, 300)); IngLab.open('notes'); await new Promise(r => setTimeout(r, 900)); return { part: IngTrain.part(), tool: IngLab.current().kind, vis: document.getElementById('ingLabCard').offsetParent !== null }; });
  ok(lab.part === 'workbench' && lab.tool === 'notes' && lab.vis, 'the workbench opened from another page opens the Workbench part', lab);
  const rv = await p.evaluate(async () => { const el = document.querySelector('#trainCard button, #trainCard p'); IngRooms.reveal(el, {}); await new Promise(r => setTimeout(r, 500)); return { part: IngTrain.part(), vis: document.getElementById('trainCard').offsetParent !== null }; });
  ok(rv.part === 'trainer' && rv.vis, 'a part of the Trainer reached from elsewhere opens the Trainer part', rv);

  /* 6. by night, with motion set to minimal, and on a phone */
  const still = await p.evaluate(async () => { document.body.setAttribute('data-motion', 'minimal'); IngTrain.part('overview'); await new Promise(r => setTimeout(r, 300)); const li = document.querySelector('#ingTruthBands > .tr-band'); const a = getComputedStyle(li).animationName; document.body.removeAttribute('data-motion'); return a; });
  ok(still === 'none', 'with motion set to minimal, nothing moves', still);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(400);
  const nt = await p.evaluate(() => ({ tab: getComputedStyle(document.querySelector('#stP-train .tn-tab[aria-selected="true"]')).color, chip: getComputedStyle(document.querySelector('#ingTruthBands .tr-tag')).color }));
  await p.screenshot({ path: OUT + '/night.png' }); await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  ok(nt.tab === 'rgb(255, 255, 255)', 'by night the chosen part reads white on amethyst', nt);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600);
  const ph = await p.evaluate(async () => { IngTrain.part('workbench'); await new Promise(r => setTimeout(r, 500)); return { over: document.scrollingElement.scrollWidth - innerWidth, bar: Math.round(document.querySelector('#stP-train .tn-bar').getBoundingClientRect().right) <= innerWidth, steps: Math.round(document.querySelector('#labP-chars .tn-steps').getBoundingClientRect().right) <= innerWidth + 1 }; });
  await p.screenshot({ path: OUT + '/phone.png' });
  ok(ph.over <= 1 && ph.bar && ph.steps, 'on a phone the parts and the steps fit the screen', ph);

  ok(errs.length === 0, 'no error on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
