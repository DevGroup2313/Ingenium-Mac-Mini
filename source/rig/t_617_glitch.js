// Looking for "the chat inside of the panel keeps on glitching back and forth" (her words, 4 November 2026). A Code session set up as
// in her pictures (a long message of hers, the Plan and session column open, a connected model's name beside the effort key), and the
// Chat page with a long conversation while a reply is written. At each window size the layout is watched while nothing changes: any
// size, place or class that changes more than twice in that time is a glitch, and is reported with what changed. Invented text only.
//   node rig/t_617_glitch.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 2000))); c ? pass++ : fail++; };
const LONG = Array.from({ length: 9 }, (_, i) => 'Paragraph ' + (i + 1) + ': I want the invented garden planner to keep every bed, every plant and every date in one place, to remind me when to water and when to plant, and to work on my phone as well as on my computer, with clear words and no clutter, one step at a time.').join('\n\n');
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  /* what is watched: the boxes of the chat, its composer, the column and the stage, and the classes that say how each is laid out */
  await p.evaluate(() => { window.__snap = function () { const r = (q) => { const e = document.querySelector(q); if (!e) return '-'; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)].join(','); };
      const cl = (q, names) => { const e = document.querySelector(q); return e ? names.filter(n => e.classList.contains(n)).join('+') : '-'; };
      const s = document.getElementById('chatScroll');
      return { card: r('#page-chat .chat-card'), comp: r('#page-chat .composer'), bar: r('#page-chat .composer-bar'), col: r('#ccPanel'), stage: r('#csFrameWrap'), scroll: r('#chatScroll'), side: r('#ccSide'),
        body: cl('body', ['ccp-on', 'ccp-over', 'cs-on', 'nav-collapsed', 'cc-side-open']), compc: cl('#page-chat .composer', ['cb-tight', 'cb-wrap']), cardc: cl('#page-chat .chat-card', ['r215-tight']),
        top: s ? Math.round(s.scrollTop) : -1 }; }; });
  const watch = async (label, ms) => { const L = await p.evaluate(async (ms) => { const out = []; const t0 = performance.now(); while (performance.now() - t0 < ms) { out.push(window.__snap()); await new Promise(r => setTimeout(r, 40)); } return out; }, ms || 900);
    const flips = {}; Object.keys(L[0]).forEach(k => { let n = 0; for (let i = 1; i < L.length; i++) if (L[i][k] !== L[i - 1][k]) n++; if (n > 2) flips[k] = { changes: n, values: [...new Set(L.map(x => x[k]))].slice(0, 4) }; });
    return { label, flips }; };

  /* 1. the Code session of her pictures */
  await p.evaluate(async (LONG) => { state.cloud = Object.assign(state.cloud || {}, { provider: 'anthropic', base: 'https://api.anthropic.com', key: 'sk-ant-invented', model: 'claude-fable-5-1', on: true, models: ['claude-fable-5-1'] }); state.chatSource = 'cloud';
    go('code'); try { closeModal(); } catch (e) {} const c = curChat(); c.title = 'First invented session';
    c.messages = [{ role: 'me', text: LONG, at: Date.now() - 60000 }, { role: 'bot', text: 'I will plan it first.', at: Date.now() - 50000, done: Date.now() - 40000, plan: { tasks: Array.from({ length: 6 }, (_, i) => ({ t: 'Task ' + (i + 1), s: i < 2 ? 'done' : i === 2 ? 'doing' : 'todo' })), at: Date.now() } }];
    renderChat(); IngR215.panel('plan', true); IngR215.panel('session', true); }, LONG);
  await p.waitForTimeout(800);
  const found = [];
  for (const h of [1000, 1250]) for (let w = 1000; w <= 1720; w += 40) { await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(350); const r = await watch('code ' + w + 'x' + h, 800); if (Object.keys(r.flips).length) found.push(r); }
  ok(!found.length, 'Code, as in her pictures: at no window size does the layout change back and forth while nothing happens', found.slice(0, 6));
  await p.setViewportSize({ width: 1440, height: 1000 }); await p.waitForTimeout(300); await p.screenshot({ path: OUT + '/code.png' });

  /* 2. the same, with the stage (the preview) open beside it */
  await p.evaluate(async () => { const pr = await ccMakeProject('Invented garden', [{ name: 'index.html', text: '<!doctype html><title>Garden</title><p>fern</p>' }], 'index.html'); const c = curChat(); c.projectId = pr.id; ccShowPreview(pr); });
  await p.waitForTimeout(900);
  const found2 = [];
  for (let w = 1000; w <= 1720; w += 40) { await p.setViewportSize({ width: w, height: 1000 }); await p.waitForTimeout(350); const r = await watch('code+stage ' + w, 800); if (Object.keys(r.flips).length) found2.push(r); }
  ok(!found2.length, 'Code with its preview open: no size changes back and forth', found2.slice(0, 6));

  /* 3. the Chat page, a long conversation, while a reply is written */
  await p.setViewportSize({ width: 1440, height: 1000 }); await p.waitForTimeout(200);
  await p.evaluate(async (LONG) => { go('chat'); const c = curChat(); c.messages = []; for (let i = 0; i < 16; i++) c.messages.push({ role: i % 2 ? 'bot' : 'me', text: (i % 2 ? 'An invented answer. ' : '') + LONG.slice(0, 300 + i * 40), at: Date.now() - (20 - i) * 1000, done: Date.now() });
    renderChat(); const s = document.getElementById('chatScroll'); s.scrollTop = s.scrollHeight; }, LONG);
  await p.waitForTimeout(500);
  const stream = await p.evaluate(async (LONG) => { const c = curChat(), bot = { role: 'bot', text: '', live: true, at: Date.now() }; c.messages.push({ role: 'me', text: 'Plan my invented garden.', at: Date.now() }, bot); window.liveBot = bot; try { liveBot = bot; } catch (e) {}
    renderChat(); const s = document.getElementById('chatScroll'); s.scrollTop = s.scrollHeight; const words = LONG.split(' '); const tops = []; let ups = 0, last = -1, flips = 0, dir = 0;
    for (let i = 0; i < 220; i++) { bot.text += words[i % words.length] + (i % 25 === 24 ? '\n\n' : ' '); try { renderChat(); } catch (e) {} await new Promise(r => setTimeout(r, 16));
      const t = s.scrollTop, far = s.scrollHeight - s.clientHeight - t; tops.push(Math.round(far)); if (last >= 0) { const d = Math.sign(t - last); if (d < 0) ups++; if (d && dir && d !== dir) flips++; if (d) dir = d; } last = t; }
    delete bot.live; window.liveBot = null; try { liveBot = null; } catch (e) {} renderChat();
    return { ups, flips, farMax: Math.max.apply(null, tops), farEnd: tops[tops.length - 1] }; }, LONG);
  ok(stream.ups === 0 && stream.flips === 0 && stream.farMax <= 120, 'while a reply is written at the foot of a long conversation, the view follows it down and never jumps back up', stream);
  const found3 = [];
  for (let w = 1000; w <= 1720; w += 60) { await p.setViewportSize({ width: w, height: 1000 }); await p.waitForTimeout(350); const r = await watch('chat ' + w, 700); if (Object.keys(r.flips).length) found3.push(r); }
  ok(!found3.length, 'the Chat page: no size changes back and forth while nothing happens', found3.slice(0, 6));
  /* 4. having scrolled up to read, a reply written below leaves her where she is */
  const stay = await p.evaluate(async () => { const c = curChat(), bot = { role: 'bot', text: '', live: true, at: Date.now() }; c.messages.push({ role: 'me', text: 'And the paths?', at: Date.now() }, bot); window.liveBot = bot; try { liveBot = bot; } catch (e) {}
    renderChat(); const s = document.getElementById('chatScroll'); s.scrollTop = 200; await new Promise(r => setTimeout(r, 60)); const t0 = s.scrollTop; let moved = 0;
    for (let i = 0; i < 120; i++) { bot.text += 'word '; try { renderChat(); } catch (e) {} await new Promise(r => setTimeout(r, 16)); if (Math.abs(s.scrollTop - t0) > 2) moved++; }
    delete bot.live; window.liveBot = null; try { liveBot = null; } catch (e) {} renderChat(); return { t0, moved }; });
  ok(stay.moved === 0, 'having scrolled up to read, she stays where she is while the reply is written below', stay);

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
