// node rig/t_646_think.js <Ingenium page url> <out dir>
// A model thinks briefly and answers; sources when she asks; titles shown twice gone (Ingenium 6.46; modules/r241.js, r236.js,
// r188.js, thoughts/permit_core.html, build_page.py 6.46; What's new's key is 6.45's r230). Her words (6 November 2026): "The models inside of the
// chats of Ingenium spend more time debating the prompts and saying "Wait" and rechecking everytime and it takes ages for them to stop
// "Thinking" and reply"; "I also don't want sources and citations provided to me with every reply inside of the app, I only want them
// provided when I ask for them"; "The "Side bar" title is repeated twice inside of the Author Studio ... There is a couple more of that
// occurence around the app"; "my clicks feels slightly heavy".
// A model on this device is stood in at the engine's adapter: it thinks without end (in its reasoning channel, or in <think> written
// into its answer, or going round in circles with "Wait") until it is stopped, and answers when asked to without thinking.
// Checks: the thinking is stopped at the length set beside Thinking, and the answer comes in the same reply, the notes passed on and the
// thoughts saying why; a model going round in circles is stopped early; a <think> written into the answer is closed and the answer kept
// apart; a short, simple message is answered without thinking, a question that needs reasoning thinks within the length; the controls
// (How long it thinks, Only when it helps) beside Thinking, kept; the standing instructions ask to think once and decide; with the web's
// sources, the model is told not to cite unless asked and the sources fold under a key, and both open when she asks; the Author
// Studio's Side bar, Settings' licence card and the Career Studio's Today no longer repeat a title; What's new's key reads the newest
// version from the first entry; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  // the stand-in: window.__mode is 'channel', 'loop' or 'tag'
  await p.evaluate(() => {
    state.models = state.models || []; if (!state.models.some(m => m.id === 'think-test')) state.models.push({ id: 'think-test', customName: 'Thinker (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 32768, paramB: 4 });
    state.activeModelId = 'think-test'; Engine.modelId = 'think-test'; Engine.status = 'ready'; state.chatSource = 'local'; if (state.cloud) state.cloud.on = false; state.thinking = true; state.webSearch = false; state.research = false;
    window.__jobs = []; window.__mode = 'channel';
    Engine.adapter = { hasImageInput: false, _ab: false, abort: function () { this._ab = true; }, generate: function (job) { const self = this; self._ab = false; const prm = job.params || {};
      window.__jobs.push({ thinking: !!prm.thinking, budget: prm.thinking_budget || 0, last: String(((job.messages || []).slice(-1)[0] || {}).content || '').slice(-9000) });
      if (!prm.thinking) { const out = 'The answer, at once.'; job.onToken && job.onToken(out); return Promise.resolve({ text: out, stats: {} }); }
      return new Promise((res) => { let n = 0, acc = ''; const mode = window.__mode;
        if (mode === 'tag') { job.onToken && job.onToken('<think>'); acc = '<think>'; }
        (function step() { if (self._ab) return res({ text: acc, stats: {} }); n++;
          const piece = mode === 'loop' ? ' Wait, let me check that again. ' : ' Step ' + n + ' considers another part of the question with fresh detail number ' + (n * 7) + '.';
          if (mode === 'tag') { acc += piece; job.onToken && job.onToken(piece); } else job.onThink && job.onThink(piece);
          if (n > 3000) return res({ text: acc, stats: {} }); setTimeout(step, 1); })(); }); } };
    try { IngAgent.setWay('auto'); } catch (e) {} go('chat'); });
  await p.waitForTimeout(400);
  const send = async (text) => { await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(250);
    const n0 = await p.evaluate(() => window.__jobs.length); await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const x = m[m.length - 1]; return x && x.role === 'bot' && !x.live; }, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(250);
    return p.evaluate((n0) => { const m = curMsgs(), x = m[m.length - 1] || {}; return { text: String(x.text || ''), think: String(x.think || x.thinkTag || ''), jobs: window.__jobs.slice(n0) }; }, n0); };
  // 1. stopped at its length, the answer in the same reply
  const r1 = await send('Explain why a harbour has two tides a day.');
  ok(r1.jobs.length === 2 && r1.jobs[0].thinking && r1.jobs[0].budget > 0 && r1.jobs[0].budget <= 1400 && !r1.jobs[1].thinking, 'a question that needs reasoning thinks, within the length set (Brief), and is then asked without thinking', r1.jobs.map(j => [j.thinking, j.budget]));
  ok(/The answer, at once\./.test(r1.text) && /stopped the thinking here, at the length set/.test(r1.think) && r1.think.length < 4000 && /Your notes from thinking/.test(r1.jobs[1].last), 'the thinking stops at its length, the thoughts say why, the notes go on, and the answer comes in the same reply', { text: r1.text.slice(0, 120), thinkLen: r1.think.length, tail: r1.think.slice(-160) });
  // 2. round in circles: stopped early
  await p.evaluate(() => { window.__mode = 'loop'; });
  const r2 = await send('Analyse which of two routes is shorter.');
  ok(/going over the same ground/.test(r2.think) && r2.think.length < 1600 && /The answer, at once\./.test(r2.text), 'a model going round in circles ("Wait, let me check that again") is stopped early, and answers', { thinkLen: r2.think.length, tail: r2.think.slice(-140) });
  // 3. <think> written into the answer: closed, the answer kept apart
  await p.evaluate(() => { window.__mode = 'tag'; });
  const r3 = await send('Compare two ways to keep a tide table.');
  ok(/The answer, at once\./.test(r3.text) && !/<\/?think>/.test(r3.text) && !/Step \d+ considers/.test(r3.text) && /Step 1 considers/.test(r3.think), 'thoughts written into the answer are closed and kept apart from it', { text: r3.text.slice(0, 160), think: r3.think.slice(0, 80) });
  // 4. only when it helps
  await p.evaluate(() => { window.__mode = 'channel'; });
  const r4 = await send('Say hello.');
  ok(r4.jobs.length === 1 && !r4.jobs[0].thinking && /The answer, at once\./.test(r4.text) && !r4.think, 'a short, simple message is answered at once, without thinking', r4.jobs);
  // 5. the controls
  const ctl = await p.evaluate(() => { const s = document.getElementById('thinkLen'), a = document.getElementById('thinkAuto'); return { opts: s ? [...s.options].map(o => o.value) : null, val: s && s.value, auto: a && a.checked, inMenu: !!(s && s.closest('#effortMenu')) }; });
  ok(ctl.opts && ctl.opts.join() === 'brief,standard,deep,open' && ctl.val === 'brief' && ctl.auto === true && ctl.inMenu, 'beside Thinking: How long it thinks (Brief by default) and Only when it helps (on)', ctl);
  await p.evaluate(() => { const s = document.getElementById('thinkLen'); s.value = 'deep'; s.dispatchEvent(new Event('change')); const a = document.getElementById('thinkAuto'); a.checked = false; a.dispatchEvent(new Event('change')); });
  const kept = await p.evaluate(() => ({ len: state.thinkLen, auto: state.thinkAuto }));
  ok(kept.len === 'deep' && kept.auto === false, 'both are kept', kept);
  const r5 = await send('Say hello again.');
  ok(r5.jobs[0] && r5.jobs[0].thinking && r5.jobs[0].budget > 1400, 'with Only when it helps off and Deep chosen, even a short message thinks, for longer', r5.jobs.map(j => [j.thinking, j.budget]));
  await p.evaluate(() => { const s = document.getElementById('thinkLen'); s.value = 'brief'; s.dispatchEvent(new Event('change')); const a = document.getElementById('thinkAuto'); a.checked = true; a.dispatchEvent(new Event('change')); });
  // 6. the standing instructions
  const sys = await p.evaluate(() => { let s = ''; try { s = chatSystemPrompt(40000); } catch (e) {} return { decisive: /think briefly and decisively/.test(s), noCheck: !/check your work/.test(s) }; });
  ok(sys.decisive && sys.noCheck, 'the standing instructions ask a model to think once and decide, and no longer to "check your work"', sys);
  // 7. sources when she asks
  const cite = await p.evaluate(() => ({ quiet: ingCiteRule({ text: 'What is a spring tide?' }, 0), asked: ingCiteRule({ text: 'What is a spring tide? Give me your sources.' }, 0) }));
  ok(/Do not put numbers, citations or a list of sources/.test(cite.quiet) && /Cite them by number/.test(cite.asked), 'with the web\'s sources, the model is told not to cite unless she asks, and to cite when she does', cite);
  const fold = await p.evaluate(() => { const c = curChat(); const me1 = { role: 'me', text: 'What is a spring tide?', at: Date.now() }, bot1 = { role: 'bot', text: 'A spring tide is a large tide.', sources: [{ title: 'Tides, a primer', url: 'https://example.org/tides' }], at: Date.now() };
    const me2 = { role: 'me', text: 'What is a neap tide? Cite your sources.', at: Date.now() }, bot2 = { role: 'bot', text: 'A neap tide is a small tide [1].', sources: [{ title: 'Tides, a primer', url: 'https://example.org/tides' }], at: Date.now() };
    curMsgs().push(me1, bot1, me2, bot2); renderChat();
    const boxes = [...document.querySelectorAll('#chatMessages .msg-sources, .msg .msg-sources')]; return boxes.map(x => ({ folded: !!x.closest('details.msg-src-fold'), open: !!(x.closest('details') && x.closest('details').open) })); });
  ok(fold.length >= 2 && fold[fold.length - 2].folded && !fold[fold.length - 2].open && !fold[fold.length - 1].folded, 'the sources wait behind a Sources key under a reply she did not ask them for, and show under one she did', fold);
  // 8. repeated titles
  const au = await p.evaluate(async () => { const k = [...document.querySelectorAll('.topbar button, header button')].find(x => /^Studio$/.test(x.textContent.trim())); if (!k) return null; k.click(); await new Promise(r => setTimeout(r, 600));
    const r = document.querySelector('#ingAuthor .au-room[data-room="side"]'); if (r) r.click(); await new Promise(r => setTimeout(r, 400));
    const hs = [...document.querySelectorAll('#ingAuthor .au-pane h2, #ingAuthor .au-pane h3')].filter(x => x.offsetParent).map(x => x.textContent.trim()); try { document.querySelector('#ingAuthor .au-keys .prim, #ingAuthor button.prim').click(); } catch (e) {} return hs; });
  ok(au && au.filter(t => /side bar/i.test(t)).length === 1, 'the Author Studio\'s Side bar room names itself once', au);
  const lic = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 500)); try { IngRooms.open('settings', 'own'); } catch (e) {} await new Promise(r => setTimeout(r, 600));
    const c = document.getElementById('ingPermitCard') || document.querySelector('.pc-card'); if (!c) return null; return [...c.querySelectorAll('h2,h3')].filter(x => x.offsetParent || true).map(x => x.textContent.trim()); });
  ok(lic && lic.filter(t => /^ownership,? licen[cs]e and permissions$/i.test(t)).length === 1, 'the licence card names itself once (its document no longer repeats the heading)', lic);
  const today = await p.evaluate(() => { go('career'); const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; S.ui.show = 'work'; IngCareer.render(); return [...document.querySelectorAll('#cs .c-pn-h h2')].map(x => x.textContent.trim()); });
  ok(today.filter(t => t === 'Today').length === 1 && today.indexOf('Your day') >= 0, 'the Career Studio\'s Today is not named twice: the panel beside the list is Your day', today);
  // 9. What's new's key: the newest version from the first entry
  const wn = await p.evaluate(() => { go('guide'); const k = document.querySelector('#gdNewKey .gd-ver'); const first = document.querySelector('#wnGuide .wn-list li b'); return { key: k && k.textContent, first: first && first.textContent.trim() }; });
  ok(wn.key && wn.key === wn.first, 'What\'s new\'s key reads the newest version from the list\'s first entry', wn);
  await p.screenshot({ path: OUT + '/chat.png' });
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
