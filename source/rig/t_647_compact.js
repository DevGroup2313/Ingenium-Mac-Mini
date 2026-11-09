// node rig/t_647_compact.js <Ingenium page url> <out dir>
// Context and compacting, slash commands, connectors in Code's + menu (Ingenium 6.47; modules/r245.js, r195.js, r219.js). Her words (6 November
// 2026): "I want for Ingenium's sessions to be automatically compacted like they are on Claude's code chats, the same for the regular chats. I
// want the option to have it compacted automatically or to click and compact it myself if I choose to ... I also want the option to add
// connectors and slash commands in the coding chats in Ingenium."
// A stand-in model on this device (Engine.adapter) answers each reply, and each request for a summary (its standing instructions begin "You
// compact a long conversation") with a summary that keeps an invented fact when the part it reads holds it. The conversations are invented.
// Checks: the memory key opens Context (its parts, Automatic, Compact now); Compact now: the summary is written from the earlier part, the
// newest messages stay, the boundary is marked, a line with the summary stands there, every message stays on the page; the next request carries
// the summary in that part's place and not its words; Automatic compacts before a send when the conversation would fill more than 85
// percent, and does not when it is off; /compact with what to keep in focus; the slash list (filter, arrows, Escape) and commands (/context,
// /effort, /think, /clear, /help); the + menus (Chat, and Code: Add files or photos, Slash commands, Add connectors first); Code's session
// column (Compact now, Automatic); no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  if (process.env.INJECT) { const src = fs.readFileSync(process.env.INJECT, 'utf8'); const css = (src.match(/<style[^>]*>([\s\S]*?)<\/style>/) || [])[1] || ''; const js = (src.match(/<script>([\s\S]*?)<\/script>/) || [])[1] || '';
    await p.addStyleTag({ content: css }); await p.addScriptTag({ content: js }); await p.waitForTimeout(300); }  // trying the module on a page built without it
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => {
    state.models = state.models || []; if (!state.models.some(m => m.id === 'cmp-test')) state.models.push({ id: 'cmp-test', customName: 'Compactor (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 8192, paramB: 4 });
    state.activeModelId = 'cmp-test'; Engine.modelId = 'cmp-test'; Engine.status = 'ready'; state.chatSource = 'local'; if (state.cloud) state.cloud.on = false; state.thinking = false; state.webSearch = false; state.research = false; state.compactAuto = true;
    window.__jobs = [];
    Engine.adapter = { hasImageInput: false, abort() {}, generate(job) { const msgs = job.messages || []; const sys = String((msgs[0] || {}).content || ''); const last = String((msgs[msgs.length - 1] || {}).content || '');
      const isSum = /^You compact a long conversation/.test(sys);
      window.__jobs.push({ sum: isSum, last: last.slice(-12000), first: String((msgs.find(m => m.role === 'user') || {}).content || '').slice(0, 3000), n: msgs.length, all: JSON.stringify(msgs).length });
      const out = isSum ? ('SUMMARY-OK. The conversation is about invented harbour questions.' + (/harbour code is 7731/.test(last) || /harbour code is 7731/.test(sys) ? ' The harbour code is 7731.' : '') + ' Open task: answer the newest question.') : 'Reply from the stand-in.';
      job.onToken && job.onToken(out); return Promise.resolve({ text: out, stats: {} }); } };
    const c = document.getElementById('ctlCtx'); if (c) { c.value = '8192'; c.dispatchEvent(new Event('input', { bubbles: true })); }
    go('chat'); });
  await p.waitForTimeout(400);
  const fresh = async (pairs, len, fact) => { await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(250);
    await p.evaluate(({ pairs, len, fact }) => { const c = curChat(); for (let i = 0; i < pairs; i++) { c.messages.push({ role: 'me', text: 'Invented question ' + i + '. ' + (i === 0 && fact ? 'Please note: the harbour code is 7731. ' : '') + 'tide '.repeat(len) }); c.messages.push({ role: 'bot', text: 'Invented answer ' + i + '. ' + 'harbour '.repeat(len) }); } saveState(); renderChat(); }, { pairs, len, fact });
    await p.evaluate(() => { const t = document.getElementById('ctlTokens'); if (t) t.value = '1024'; }); };
  const send = async (text) => { const n0 = await p.evaluate(() => window.__jobs.length); await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
    await p.waitForFunction(() => { const m = curMsgs(); const x = m[m.length - 1]; return x && x.role === 'bot' && !x.live; }, null, { timeout: 60000 }).catch(() => {}); await p.waitForTimeout(300);
    return p.evaluate((n0) => window.__jobs.slice(n0), n0); };
  // 1. the memory key opens Context
  await fresh(4, 40, false);
  await p.click('#ingMemPill'); await p.waitForTimeout(300);
  const c1 = await p.evaluate(() => { const pop = document.getElementById('cmpPop'); const ctl = document.getElementById('chatCtlBtn');
    return { open: !!pop && !pop.hidden, text: pop ? pop.innerText : '', auto: !!(pop && pop.querySelector('.cmp-auto input:checked')), go: !!document.getElementById('cmpGo'), controls: ctl ? ctl.getAttribute('aria-expanded') : null }; });
  await p.screenshot({ path: OUT + '/1_context.png' });
  ok(c1.open && /Context/.test(c1.text) && /Instructions/.test(c1.text) && /The conversation/.test(c1.text) && /Room kept for the reply/.test(c1.text) && /of the model's memory/.test(c1.text) && c1.auto && c1.go && c1.controls !== 'true',
    'the memory key opens Context: the share used, part by part, Automatic (on) and Compact now (not Controls any more)', c1);
  await p.keyboard.press('Escape');
  // 2. Compact now
  await fresh(16, 300, true);
  const n2 = await p.evaluate(() => curMsgs().length);
  const j0 = await p.evaluate(() => window.__jobs.length);
  await p.evaluate(() => IngCompact.open()); await p.waitForTimeout(200);
  await p.click('#cmpGo'); await p.waitForFunction(() => !!document.querySelector('#chatScroll .cmp-div'), null, { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(300);
  const c2 = await p.evaluate((j0) => { const c = curChat(), ms = c.messages; const bi = ms.findIndex(m => m.compactStart); const jobs = window.__jobs.slice(j0);
    const div = document.querySelector('#chatScroll .cmp-div'); const nodes = document.querySelectorAll('#chatScroll .msg').length;
    return { sumJobs: jobs.filter(j => j.sum).length, sawFact: jobs.some(j => j.sum && /harbour code is 7731/.test(j.last)), summary: c.summary || '', bi, win: bi >= 0 && !!ms[bi].winStart, kept: ms.length - bi, total: ms.length,
      div: div ? div.innerText : '', divBefore: div && div.nextElementSibling ? div.nextElementSibling.innerText.slice(0, 40) : '', nodes, rec: (c.compacts || []).slice(-1)[0] || null }; }, j0);
  await p.screenshot({ path: OUT + '/2_compacted.png' });
  ok(c2.sumJobs >= 1 && c2.sawFact && /SUMMARY-OK/.test(c2.summary) && /7731/.test(c2.summary), 'Compact now asks the model for a summary of the earlier part (in rounds that fit its memory), and keeps it', { sumJobs: c2.sumJobs, summary: c2.summary.slice(0, 160) });
  ok(c2.bi > 0 && c2.win && c2.kept >= 2 && c2.kept <= 12 && c2.total === n2 && c2.rec && c2.rec.n === c2.bi && c2.rec.auto === false && c2.rec.after < c2.rec.before, 'the newest messages stay as they are, the boundary is marked, every message is kept, and the compaction is recorded (by her, fewer tokens after)', { bi: c2.bi, kept: c2.kept, total: c2.total, n2, rec: c2.rec });
  ok(/Compacted/.test(c2.div) && /earlier messages? summarised/.test(c2.div) && /Invented question/.test(c2.divBefore) && c2.nodes >= n2, 'a line marks where it was compacted, with the summary to read, and every message is still on the page', { div: c2.div.slice(0, 200), next: c2.divBefore, nodes: c2.nodes, n2 });
  // 3. the next message: the summary in the earlier part's place
  const j3 = await send('What was the code again?');
  const chat3 = j3.filter(j => !j.sum).slice(-1)[0] || {};
  ok(/A summary of it so far: SUMMARY-OK/.test(chat3.last) && /were compacted/.test(chat3.last) && /^Invented question 1[0-9]\./.test(chat3.first) && /What was the code again\?/.test(chat3.last), 'the next request starts at the newest messages kept, with the summary in the earlier part\'s place (said to be compacted; passages that bear on the new message may follow), and the new message', { first: (chat3.first || '').slice(0, 200), lastHead: (chat3.last || '').slice(0, 400) });
  // 4. Automatic: before a send, when the conversation would fill more than 85 percent
  await fresh(10, 420, true);
  const pre4 = await p.evaluate(() => { const P = IngCompact.parts(); return { pc: P.pc, want: IngCompact.wantAuto() }; });
  const j4 = await send('One more invented question.');
  const order4 = j4.map(j => j.sum ? 'S' : 'C').join('');
  const rec4 = await p.evaluate(() => (curChat().compacts || []).slice(-1)[0] || null);
  ok(pre4.want && /^S+C$/.test(order4) && rec4 && rec4.auto === true, 'Automatic: a message that would fill more than 85 percent compacts first, by itself, then the reply comes', { pre4, order4, rec4 });
  // and off
  await p.evaluate(() => { state.compactAuto = false; saveState(); });
  await fresh(10, 420, false);
  const j5 = await send('Another invented question.');
  ok(j5.length >= 1 && j5.every(j => !j.sum), 'with Automatic off, nothing is compacted before the send (the oldest messages leave the memory as before)', j5.map(j => j.sum));
  await p.evaluate(() => { state.compactAuto = true; saveState(); });
  // 5. /compact with what to keep in focus, typed in the message box
  await fresh(8, 300, true);
  const j6a = await p.evaluate(() => window.__jobs.length);
  await p.fill('#chatInput', '/compact the harbour code'); await p.press('#chatInput', 'Enter');
  await p.waitForFunction(() => !!document.querySelector('#chatScroll .cmp-div'), null, { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(300);
  const c6 = await p.evaluate((j) => ({ jobs: window.__jobs.slice(j).filter(x => x.sum).map(x => /Keep in focus above all: the harbour code/.test(x.last)), input: document.getElementById('chatInput').value, sent: curMsgs().some(m => m.role === 'me' && /^\/compact/.test(m.text || '')), focus: ((curChat().compacts || []).slice(-1)[0] || {}).focus }), j6a);
  ok(c6.jobs.length >= 1 && c6.jobs.every(Boolean) && c6.input === '' && !c6.sent && c6.focus === 'the harbour code', '/compact with words after it compacts with them kept in focus, and is not sent as a message', c6);
  // 6. the slash list
  await p.fill('#chatInput', ''); await p.click('#chatInput'); await p.keyboard.type('/');
  await p.waitForTimeout(150);
  const s1 = await p.evaluate(() => { const m = document.getElementById('slMenu'); return { open: !!m && !m.hidden, items: m ? [...m.querySelectorAll('.sl-item b')].map(x => x.textContent) : [] }; });
  await p.screenshot({ path: OUT + '/3_slash.png' });
  ok(s1.open && ['/compact', '/context', '/clear', '/model', '/connect', '/connectors', '/effort', '/think', '/fast', '/research', '/web', '/remember', '/help'].every(c => s1.items.includes(c)), '"/" in the message box opens the list of commands', s1.items);
  await p.keyboard.type('ef'); await p.waitForTimeout(100);
  const s2 = await p.evaluate(() => [...document.querySelectorAll('#slMenu .sl-item b')].map(x => x.textContent));
  await p.keyboard.press('Escape'); await p.waitForTimeout(100);
  const s3 = await p.evaluate(() => document.getElementById('slMenu').hidden);
  ok(s2.length === 1 && s2[0] === '/effort' && s3, 'typing narrows it (/ef: /effort), and Escape closes it', { s2, s3 });
  await p.fill('#chatInput', '/effort extra'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(200);
  await p.fill('#chatInput', '/think deep'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(200);
  const s4 = await p.evaluate(() => ({ eff: (document.getElementById('ctlEffort') || {}).value, len: state.thinkLen, th: state.thinking }));
  await p.fill('#chatInput', '/think off'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(200);
  const s5 = await p.evaluate(() => state.thinking);
  ok(s4.eff === '4' && s4.len === 'deep' && s4.th === true && s5 === false, '/effort extra, /think deep and /think off set them', { s4, s5 });
  const id0 = await p.evaluate(() => curChat().id);
  await p.fill('#chatInput', '/clear'); await p.click('#chatSend'); await p.waitForTimeout(300);
  const s6 = await p.evaluate(() => ({ id: curChat().id, n: curMsgs().length }));
  ok(s6.id !== id0 && s6.n === 0, '/clear, sent with the send key, starts a new conversation', { id0, s6 });
  await p.fill('#chatInput', '/context'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(200);
  const s7 = await p.evaluate(() => { const pop = document.getElementById('cmpPop'); return !!pop && !pop.hidden; });
  await p.keyboard.press('Escape');
  await p.fill('#chatInput', '/help'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(200);
  const s8 = await p.evaluate(() => { const r = document.getElementById('modalRoot'); const t = (document.getElementById('modalBox') || {}).innerText || ''; return { open: r.classList.contains('open'), t: t.slice(0, 200) }; });
  await p.evaluate(() => closeModal());
  ok(s7 && s8.open && /Slash commands/.test(s8.t), '/context opens Context, and /help lists what each command does', { s7, s8 });
  // 7. the + menus
  await p.click('#chatImgBtn'); await p.waitForTimeout(200);
  const m1 = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].map(x => (x.querySelector('.pm-txt') || x).childNodes[0].textContent.trim()).slice(0, 3));
  await p.keyboard.press('Escape'); await p.evaluate(() => { try { closePlus(); } catch (e) {} });
  await p.evaluate(() => go('code')); await p.waitForTimeout(600);
  await p.evaluate(() => { const b = document.getElementById('chatImgBtn'); if (b) b.click(); }); await p.waitForTimeout(250);
  const m2 = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].map(x => (x.querySelector('.pm-txt') || x).childNodes[0].textContent.trim()).slice(0, 3));
  await p.screenshot({ path: OUT + '/4_code_plus.png' });
  await p.evaluate(() => { try { closePlus(); } catch (e) {} });
  ok(m1[0] === 'Add files or photos' && m1[1] === 'Slash commands' && m2[0] === 'Add files or photos' && m2[1] === 'Slash commands' && m2[2] === 'Add connectors', 'the + menu has Slash commands; Code\'s opens with Add files or photos, Slash commands and Add connectors', { chat: m1, code: m2 });
  // Code: /plan and /session are in its list
  await p.fill('#chatInput', ''); await p.click('#chatInput'); await p.keyboard.type('/');
  await p.waitForTimeout(150);
  const s9 = await p.evaluate(() => [...document.querySelectorAll('#slMenu .sl-item b')].map(x => x.textContent));
  await p.keyboard.press('Escape');
  ok(s9.includes('/plan') && s9.includes('/session') && s9.includes('/compact'), 'in Code the list adds /plan and /session', s9);
  // 8. Code's session column
  await p.evaluate(() => { const k = document.getElementById('ccpSessKey'); if (k) k.click(); }); await p.waitForTimeout(500);
  const k8 = await p.evaluate(() => { const s = document.querySelector('#ccPanel section[data-sec="context"]'); const k = s && s.querySelector('.cmp-keys'); return { sec: !!s, keys: k ? k.innerText : '' }; });
  ok(k8.sec && /Compact now/.test(k8.keys) && /Automatic/.test(k8.keys), 'Code\'s session column has Compact now and Automatic beside its Context bar', k8);
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
