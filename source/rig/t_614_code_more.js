// Code, closer still to Claude's sessions (Ingenium 6.14, modules/r221.js): @ points the model at files; each session's state in the
// Code list; links on the steps that pushed or opened a pull request. Her words (4 November 2026): "I still want full parity with
// Claude's Code chat ... I want you to close that gap and give me full parity". The app and its files are invented.
//   node rig/t_614_code_more.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 980 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(async () => { const pr = await ccMakeProject('Invented garden', [{ name: 'index.html', text: '<!doctype html><title>Garden</title><script src="js/plants.js"></script>' }, { name: 'js/plants.js', text: 'var plants=["fern","ivy"];\n' }, { name: 'css/garden.css', text: 'body{margin:0}\n' }, { name: 'README.md', text: '# Garden\n' }], 'index.html');
    go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr); });
  await p.waitForTimeout(500);

  /* 1. @ lists the app's files as she types, and puts @path in the message */
  await p.click('#chatInput'); await p.fill('#chatInput', 'Look at @pla'); await p.waitForTimeout(150);
  let m = await p.evaluate(() => { const x = document.getElementById('atmMenu'); return x && !x.hidden ? [...x.querySelectorAll('.atm-opt')].map(o => o.firstChild.textContent) : []; });
  ok(m.length >= 1 && m[0] === 'js/plants.js', 'typing @pla lists js/plants.js first', m);
  await p.press('#chatInput', 'Enter'); await p.waitForTimeout(100);
  let v = await p.evaluate(() => ({ v: document.getElementById('chatInput').value, sent: curMsgs().length }));
  ok(v.v === 'Look at @js/plants.js ' && v.sent === 0, 'Enter puts @js/plants.js in the message, and sends nothing', v);
  await p.type('#chatInput', 'and @'); await p.waitForTimeout(150);
  m = await p.evaluate(() => [...document.querySelectorAll('#atmMenu .atm-opt')].map(o => o.firstChild.textContent));
  ok(m.length === 4, 'a bare @ lists every file of the app', m);
  await p.type('#chatInput', 'gard'); await p.waitForTimeout(120); await p.press('#chatInput', 'ArrowDown'); await p.press('#chatInput', 'Tab'); await p.waitForTimeout(100);
  v = await p.evaluate(() => document.getElementById('chatInput').value);
  ok(/@css\/garden\.css $/.test(v) || /@index\.html $/.test(v), 'arrows move through the list and Tab takes the choice', v);
  await p.press('#chatInput', 'Escape');

  /* 2. the model is told to read the files she pointed at */
  const sys = await p.evaluate(() => { const c = curChat(); c.messages.push({ role: 'me', text: 'Why does @js/plants.js hold only two plants? See also @README.md.', at: Date.now() }); const s = chatSystemPrompt(20000); c.messages.pop(); return s; });
  ok(/she points at these files with @: js\/plants\.js, README\.md\. Read them \(with the read tool\) before you answer/.test(sys), 'the model is told which files she pointed at, and to read them first', sys.slice(-300));
  const none = await p.evaluate(() => { const c = curChat(); c.messages.push({ role: 'me', text: 'Write to me@example.com about @nosuchfile.js', at: Date.now() }); const s = chatSystemPrompt(20000); c.messages.pop(); return /points at/.test(s); });
  ok(!none, 'an e-mail address or a name that is no file of the app is not taken as pointing', none);

  /* 3. each session's state in the Code list */
  const st = await p.evaluate(async () => { const c = curChat(); const bot = { role: 'bot', text: '', live: true }; c.messages.push({ role: 'me', text: 'x' }, bot); window.liveBot = bot; try { liveBot = bot; } catch (e) {}
    IngAtMention.paintStates(); ccPaintSide(); await new Promise(r => setTimeout(r, 50)); const a = [...document.querySelectorAll('.cc-sessions .cc-row .cc-st')].map(x => x.textContent);
    Object.defineProperty(bot, 'ask', { value: { done: false }, configurable: true, writable: true, enumerable: false }); ccPaintSide(); const b2 = [...document.querySelectorAll('.cc-sessions .cc-row .cc-st')].map(x => x.textContent);
    window.liveBot = null; try { liveBot = null; } catch (e) {} delete bot.live; bot.text = 'done';
    const pr = ccProj(); pr.gh = { full: 'invented-dev/garden', owner: 'invented-dev', repo: 'garden', branch: 'main', base: { commit: 'c0' }, map: {}, pr: { number: 9, state: 'merged', url: 'https://github.com/invented-dev/garden/pull/9' } };
    ccPaintSide(); const c3 = [...document.querySelectorAll('.cc-sessions .cc-row .cc-st')].map(x => x.textContent + '|' + x.className); delete pr.gh; ccPaintSide(); return { a, b2, c3 }; });
  ok(st.a.join() === 'working' && st.b2.join() === 'waits for you' && st.c3.join() === 'PR #9 merged|cc-st ok', 'the list says each session\'s state: working, waits for you, and its pull request', st);

  /* 4. a step that pushed or opened a pull request carries its link (only to GitHub) */
  const ln = await p.evaluate(() => { const c = curChat(); c.messages.push({ role: 'bot', text: 'Pushed and opened.', at: Date.now(), done: Date.now(), steps: [{ i: '↑', t: 'Pushed 1 file to ingenium/garden (abc1234)', url: 'https://github.com/invented-dev/garden/commit/abc1234', linkText: 'the commit' }, { i: '⇄', t: 'Opened pull request #9', url: 'https://github.com/invented-dev/garden/pull/9', linkText: 'the pull request' }, { i: '•', t: 'Looked elsewhere', url: 'https://evil.invalid/x' }] });
    renderChat(); const lis = [...document.querySelectorAll('#page-chat .msg .ag-steps li')].slice(-3); return lis.map(li => { const a = li.querySelector('a.stp-link'); return a ? a.textContent + '>' + a.href + '|' + a.target + '|' + a.rel : '-'; }); });
  ok(ln[0] === 'the commit>https://github.com/invented-dev/garden/commit/abc1234|_blank|noopener noreferrer' && ln[1] === 'the pull request>https://github.com/invented-dev/garden/pull/9|_blank|noopener noreferrer' && ln[2] === '-', 'the push and the pull request are links; a step pointing anywhere but GitHub gets none', ln);
  await p.screenshot({ path: OUT + '/code_more.png' });

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
