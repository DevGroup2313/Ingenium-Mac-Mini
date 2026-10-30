// node rig/t_692_keys.js <Ingenium page url> <out dir>
// Ingenium 6.9 (30 October 2026), in Chromium. The owner's words: "The "On" button for the Sounds feature and the "Ingenium"
// button on the Chat panel look really flat compared to the rest of the buttons on the display panel, please make the fix so
// that they match the rest of the other pressed buttons inside of the Display panel." And: "I want a better example for
// Ingenium's chat tour because the current one kind of reads a little weird when it shows the "Thinking" box."
//   - in the Display panel, the chosen Sound key (On or Off) and the chosen Chat look key have the same background, border and
//     shadow as the chosen Theme key (Day), by day and by night (modules/r192.js);
//   - the Settings page's Sound keys keep the raised look too;
//   - the tour's example conversation is the research proposal one, its thinking in the first person, and the tour's
//     "Reading its thinking" step opens the thinking under "Thought for 4 seconds"; the example leaves with the tour;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const look = (sel) => p.evaluate((sel) => { const e = document.querySelector(sel); if (!e || !e.offsetParent) return null; const cs = getComputedStyle(e);
    return { bg: cs.backgroundImage, bc: cs.borderTopColor, sh: cs.boxShadow, color: cs.color, text: e.textContent.trim() }; }, sel);
  const same = (a, b) => a && b && a.bg === b.bg && a.bc === b.bc && a.sh === b.sh && a.color === b.color;
  for (const theme of ['day', 'night']) {
    await p.evaluate((t) => { document.body.setAttribute('data-theme', t); }, theme);
    const isOpen = () => p.evaluate(() => { const e = document.getElementById('displayPanel'); return !!(e && !e.hidden && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 100); });
    if (!(await isOpen())) { await p.evaluate(() => { const b = document.getElementById('displayBtn'); if (b) b.click(); }); await p.waitForTimeout(700); }
    const open = await isOpen();
    ok(open, theme + ': the Display panel opens');
    const day = await look('#dpTheme .seg-btn.on'), snd = await look('#dpSndOn .seg-btn[aria-pressed="true"]'), chat = await look('#dpChat .seg-btn[aria-pressed="true"]');
    ok(day && snd && chat, theme + ': the chosen Theme, Sound and Chat keys are on the panel', JSON.stringify([!!day, !!snd, !!chat]));
    ok(same(day, snd), theme + ': the chosen Sound key (' + (snd && snd.text) + ') looks exactly as the chosen Theme key (' + (day && day.text) + ')', JSON.stringify({ day, snd }));
    ok(same(day, chat), theme + ': the chosen Chat look key (' + (chat && chat.text) + ') looks exactly as the chosen Theme key', JSON.stringify({ day, chat }));
    ok(day && /0px 2px 0px 0px/.test(day.sh) && !/0px 0px 0px 1px inset|inset 0px 0px 0px 1px/.test(snd.sh), theme + ': it is the raised key (a dark wall under it), not the flat ring', snd && snd.sh);
    if (theme === 'day') { await p.screenshot({ path: OUT + '/display_day.png', clip: { x: 1100, y: 40, width: 340, height: 900 } }); }
    else { await p.screenshot({ path: OUT + '/display_night.png', clip: { x: 1100, y: 40, width: 340, height: 900 } }); }
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    if (await isOpen()) { await p.evaluate(() => { const b = document.getElementById('displayBtn'); if (b) b.click(); }); await p.waitForTimeout(400); }
  }
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); });
  // the Settings page's Sound keys are raised too
  await p.evaluate(() => go('settings')); await p.waitForTimeout(900);
  const set = await look('#setSndOn .seg-btn[aria-pressed="true"]');
  ok(set && /0px 2px 0px 0px/.test(set.sh), 'Settings, Sound: the chosen key is raised', set && set.sh);
  // the tour's example
  const texts = await p.evaluate(() => ({ q: TOUR_Q, a: TOUR_A, t: TOUR_THINK }));
  ok(/PhD application is due in three weeks/.test(texts.q), 'the tour asks about planning a research proposal', texts.q);
  ok(/^Three weeks is enough for a proposal/.test(texts.t) && /\bI will\b/.test(texts.t) && !/\bThey are\b/.test(texts.t), 'its thinking is in the first person, weighing the weeks', texts.t);
  ok(/Week one, the ground/.test(texts.a) && /Week three, the readers/.test(texts.a) && /programme’s word limit/.test(texts.a), 'its reply has three dated steps', texts.a);
  await p.evaluate(() => { tourDemoRun('openThink'); }); await p.waitForTimeout(1600);
  const tb = await p.evaluate(() => { const box = document.querySelector('#chatScroll .think-box'); if (!box) return null; const body = box.querySelector('.think-body');
    return { open: box.classList.contains('open'), label: box.querySelector('.think-label').textContent, body: body ? body.textContent : '', reply: (document.querySelector('#chatScroll .msg.bot, #chatScroll .msg') || {}).textContent || '' }; });
  ok(tb && tb.open && tb.label === 'Thought for 4 seconds', 'the tour opens the thinking under "Thought for 4 seconds"', JSON.stringify(tb && { open: tb.open, label: tb.label }));
  ok(tb && tb.body === texts.t, 'what it shows is the new thinking, whole', tb && tb.body.slice(0, 120));
  const title = await p.evaluate(() => (curChat() || {}).title);
  ok(title === 'Example from the tour', 'the example is its own conversation, "Example from the tour"', title);
  await p.evaluate(() => { tourDemoClear(); }); await p.waitForTimeout(300);
  const left = await p.evaluate(() => (state.chats || []).some(c => c.__tour));
  ok(!left, 'cleared, the example leaves with the tour');
  ok(errs.length === 0, 'no errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
