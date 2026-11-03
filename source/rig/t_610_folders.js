// Folders: a folder for each of her apps (Ingenium 6.10, modules/r208.js). Her words (3 November 2026): "I want folders built in that
// classifies every app that I have been working on and will build in the future. I want the folders to document how I like to work
// ... so that ... the models don't have to start over from 0 everytime and need to load up everything from memory or reread all of
// the context again and drain tokens", and "I want a safe way to move my data from Claude and Ollama to Ingenium". Her answers:
// start from the apps in her profile; bring in Claude's chats, Claude Code on her Mac and on the web, and Ollama.
// A stand-in for Anthropic's Messages API (page.route) writes the notes; a stand-in for the app's bridge holds Claude Code sessions.
// The person and the apps are invented (Ada; Quill, Abacist and Lantern).
//   node rig/t_610_folders.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const BASE = new URL(URL_).origin + '/mockanthropic';
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
let NOTES = ['SUMMARY:', 'Quill is a writing app that works offline. The footnotes now survive a save; the export to Word keeps them too.', 'DECISION: Footnotes are saved with the main text, because the autosave lost them.',
  'DECISION: Word export keeps footnotes, at her request.', 'OPEN: Check the export of long tables.', 'HOW: "one step at a time"', 'HOW: plan first, then build, then check'].join('\n');
let sent = [];
const cc = (o) => JSON.stringify(o);
const SESS = [cc({ type: 'summary', summary: 'Quill footnotes kept on save', leafUuid: 'u2' }),
  cc({ type: 'user', sessionId: 's1', uuid: 'u1', parentUuid: null, timestamp: '2026-10-20T10:00:00Z', cwd: '/Users/ada/Quill', message: { role: 'user', content: 'In Quill the footnotes vanish after a save. Fix it, one step at a time.' } }),
  cc({ type: 'assistant', sessionId: 's1', uuid: 'u2', parentUuid: 'u1', timestamp: '2026-10-20T10:00:09Z', message: { role: 'assistant', model: 'claude-opus-5-5', content: [{ type: 'text', text: 'Quill\'s autosave keeps only the main text. I will save the footnotes with it.' }] } })].join('\n') + '\n';
const SESS2 = [cc({ type: 'user', sessionId: 's2', uuid: 'v1', parentUuid: null, timestamp: '2026-10-22T09:00:00Z', cwd: '/Users/ada/Lantern', message: { role: 'user', content: 'Lantern: make the reading room darker at night.' } }),
  cc({ type: 'assistant', sessionId: 's2', uuid: 'v2', parentUuid: 'v1', timestamp: '2026-10-22T09:00:05Z', message: { role: 'assistant', model: 'claude-sonnet-5-5', content: [{ type: 'text', text: 'Lantern now dims its reading room after sunset.' }] } })].join('\n') + '\n';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.route('**/mockanthropic/**', (route) => { const bd = JSON.parse(route.request().postData() || '{}'); sent.push(bd);
    route.fulfill({ status: 200, contentType: 'text/event-stream', body: ev({ type: 'message_start', message: { model: 'claude-fable-5-1', usage: { input_tokens: 1 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: NOTES } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' }) }); });
  /* the app's bridge, standing in: two Claude Code sessions on "this computer", read in pieces */
  await p.addInitScript(([s1, s2]) => { const FILES = { 'Users-ada-Quill/s1.jsonl': s1, 'Users-ada-Lantern/s2.jsonl': s2 }; window.__reads = [];
    window.pywebview = { api: { claude_sessions: () => Promise.resolve({ ok: true, files: Object.keys(FILES).map((k, i) => ({ rel: k, name: k, size: new TextEncoder().encode(FILES[k]).length, mtime: 1800000000000 - i })) }),
      claude_session_read: (rel, off, len) => { window.__reads.push(rel); const all = new TextEncoder().encode(FILES[rel] || ''); const piece = all.slice(off, off + Math.min(len, 120)); let cut = piece.length; if (off + cut < all.length) { const k = piece.lastIndexOf(10); if (k >= 0) cut = k + 1; }
        return Promise.resolve({ ok: true, text: new TextDecoder().decode(piece.slice(0, cut)), length: cut, size: all.length, more: off + cut < all.length }); } } }; }, [SESS, SESS2]);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  await p.evaluate((BASE) => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); };
    state.cloud = { on: false, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 1000000, out: 128000 } } }; saveState(); lxSetCloud(true);
    go('career'); const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.profile.name = 'Ada';
    s.profile.items = [{ id: 'i1', sec: 'project', title: 'Designer and Builder', place: 'Quill', from: '2026', to: 'present', text: '', src: 'me', at: Date.now() },
      { id: 'i2', sec: 'project', title: 'Founder', place: 'Abacist and Lantern', from: 'May 2026', to: 'present', text: '', src: 'me', at: Date.now() },
      { id: 'i3', sec: 'post', title: 'Archivist', place: 'The Museum', from: '2020', to: '2022', text: '', src: 'me', at: Date.now() }];
    state.chats = (state.chats || []).filter((c) => c.messages && c.messages.length);
    state.chats.push({ id: 'c_q1', title: 'Quill: tables in the export', made: Date.now() - 864e5, messages: [{ role: 'me', text: 'Quill exports tables badly to Word.' }, { role: 'bot', text: 'Quill needs a table writer.' }] });
    state.chats.push({ id: 'c_x1', title: 'A recipe for bread', made: Date.now() - 864e5, messages: [{ role: 'me', text: 'How long should dough rise?' }, { role: 'bot', text: 'About an hour.' }] });
    saveState(); go('folders'); }, BASE);
  await p.waitForTimeout(600);
  const text = () => p.evaluate(() => (document.getElementById('page-folders') || {}).innerText || '');
  const toasts = () => p.evaluate(() => window.__toasts.join(' | '));
  const F = () => p.evaluate(() => IngFolders.folders().map((f) => ({ id: f.id, name: f.name, words: f.app.words, n: (state.chats || []).filter((c) => c.projectId === f.id).length, brief: f.app.brief, dec: f.app.decisions, open: f.app.open, sugg: f.app.sugg, how: f.app.how })));
  const press = (re, scope) => p.evaluate(({ src, scope }) => { const r = new RegExp(src); const k = [...document.querySelectorAll((scope || '#page-folders') + ' button')].find((x) => x.offsetParent && !x.disabled && r.test(x.textContent.trim())); if (k) { k.click(); return true; } return false; }, { src: re.source, scope });
  // 1. a page of its own, in the menu beside Chat and Code; its apps start from her profile
  const nav = await p.evaluate(() => { const b = document.querySelector('.nav-btn[data-page="folders"]'); return b ? { text: b.textContent.trim(), after: b.previousElementSibling && b.previousElementSibling.getAttribute('data-page') } : null; });
  let t = await text();
  ok(nav && nav.text === 'Folders' && nav.after === 'code', '1. Folders has its key in the menu, after Code', nav);
  ok(/Your apps/.test(t) && /Quill\s*In your profile: Designer and Builder/.test(t) && /Abacist\s*In your profile: Founder/.test(t) && /Lantern\s*In your profile: Founder/.test(t) && !/The Museum/.test(t), '1. the apps her profile names are offered, each with where it was found; a post is not an app', t.slice(0, 400));
  await p.screenshot({ path: OUT + '/apps.png' });
  // untick one, add one, make them
  await p.evaluate(() => { const l = [...document.querySelectorAll('#page-folders .fld-pick label')].find((x) => /Abacist/.test(x.textContent)); l.querySelector('input').click(); });
  await p.fill('#page-folders .fld-more', 'Ledger'); await press(/^Add it$/); await press(/^Make these folders$/); await p.waitForTimeout(500);
  let fs1 = await F();
  ok(fs1.map((f) => f.name).join('|') === 'Quill|Lantern|Ledger', '1. made: the ticked apps and the one added; the one unticked has no folder', fs1.map((f) => f.name));
  ok(fs1[0].n === 1 && /1 conversation sorted: Quill 1\./.test(await toasts()), '1. a conversation already here that names Quill is sorted into its folder; one that names no app stays unsorted', { quill: fs1[0].n, toasts: await toasts() });
  t = await text();
  ok(/Not sorted yet \(1\)/.test(t) && /A recipe for bread/.test(t), '1. the conversation that names no app waits under Not sorted yet', (t.match(/Not sorted yet[^\n]*/) || [''])[0]);
  // 2. Claude Code's sessions on this computer: one press, read in pieces through the bridge, then sorted
  await press(/^Read the sessions on this computer$/); await p.waitForSelector('#modalBox .imp-dlg button', { timeout: 20000 }); await p.waitForTimeout(300);
  const reads = await p.evaluate(() => window.__reads.length);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#modalBox button')].find((x) => x.textContent.trim() === 'Bring all'); k.click(); }); await p.waitForTimeout(1200);
  fs1 = await F(); const where = await p.evaluate(() => (state.chats || []).filter((c) => c.imported).map((c) => ({ t: c.title, f: (IngFolders.folders().filter((f) => f.id === c.projectId)[0] || {}).name })));
  ok(reads > 2 && where.length === 2 && where.some((x) => /Quill/.test(x.t) && x.f === 'Quill') && where.some((x) => /Lantern/.test(x.f || '')), '2. Claude Code\'s sessions on this computer are read in pieces, brought in, and each sorted by its folder\'s words', { reads, where });
  ok(await p.evaluate(() => document.getElementById('page-folders').classList.contains('active')), '2. brought in from Folders, the page stays on Folders');
  // 3. a folder: where we left off, brought up to date from the conversations not read yet, each read once
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => /Quill/.test(x.textContent)); k.click(); }); await p.waitForTimeout(400);
  t = await text();
  ok(/Where we left off/.test(t) && /No summary yet/.test(t) && /Bring it up to date \(2\)/.test(t), '3. a folder opens on Where we left off: no summary yet, 2 conversations to read', (t.match(/Bring it up to date[^\n]*/) || [''])[0]);
  sent = [];
  await press(/^Bring it up to date/); for (let i = 0; i < 60; i++) { const busy = await p.evaluate(() => IngFolders.run.busy); if (!busy) break; await p.waitForTimeout(250); }
  fs1 = await F(); const q = fs1.find((f) => f.name === 'Quill'); const req = sent[0] || {}, u0 = JSON.stringify(req.messages || []);
  ok(q.brief.indexOf('Quill is a writing app') === 0 && q.dec.length === 2 && q.open.length === 1 && q.sugg.length === 2, '3. the summary, the decisions, what is open, and how she likes to work as seen in the conversations, kept', q);
  ok(sent.length === 1 && /NEW CONVERSATIONS/.test(u0) && /tables in the export/.test(u0) && /footnotes vanish/.test(u0) && !/bread/.test(u0) && /never a version, a date, a decision/.test(String(req.system || '')), '3. the model reads the folder\'s two conversations, nothing else, and is told never to invent', { calls: sent.length });
  t = await text();
  ok(/Up to date/.test(t) && /Every conversation in this folder is read/.test(t) && /Brought up to date .* with Claude Fable 5\.1/.test(t), '3. then it says every conversation is read, when, and with which model', (t.match(/Brought up to date[^\n]*/) || [''])[0]);
  await p.screenshot({ path: OUT + '/folder.png', fullPage: false });
  // 4. how she likes to work: a suggestion kept; her own words for the folder and for every app
  await press(/^Keep$/); await p.waitForTimeout(300);
  await p.evaluate(() => { const t = document.getElementById('fldHowAll'); }); fs1 = await F();
  ok(/one step at a time/.test(fs1.find((f) => f.name === 'Quill').how), '4. a way of working seen in the conversations, kept, joins How I work on Quill', fs1.find((f) => f.name === 'Quill').how);
  // 5. a conversation in the folder starts from its notes, short; never every conversation before it
  await p.evaluate(() => { IngFolders.folders()[0]; }); await p.evaluate(() => { const g = state.folders; g.how = 'Plain words, no jargon. Never invent a source.'; saveState(); });
  await press(/^Start a conversation in this folder$/); await p.waitForTimeout(600);
  const sp = await p.evaluate(() => ({ pid: curChat().projectId, prompt: chatSystemPrompt(40000) }));
  ok(sp.pid === fs1.find((f) => f.name === 'Quill').id && /THIS CONVERSATION IS IN MY FOLDER FOR QUILL/.test(sp.prompt) && /How I work, on every app \(in my own words\):\nPlain words, no jargon/.test(sp.prompt) && /Where we left off on Quill/.test(sp.prompt) && /Decisions so far on Quill:\n- Footnotes are saved/.test(sp.prompt) && /Open next on Quill:\n- Check the export of long tables/.test(sp.prompt),
    '5. a new conversation in the folder carries its notes: how she works, everywhere and here, where things stand, the decisions, what is open', sp.prompt.slice(-600));
  ok(!/tables in the export|footnotes vanish/.test(sp.prompt) && sp.prompt.length < 40000, '5. and not the earlier conversations themselves: their summary only', sp.prompt.length);
  // 6. a new conversation later: only it is read, with the summary so far
  await p.evaluate(() => { const c = curChat(); c.messages = [{ role: 'me', text: 'Quill should number its figures.' }, { role: 'bot', text: 'Figures are numbered now.' }]; c.title = 'Quill: figure numbers'; c.made = Date.now(); saveState(); go('folders'); });
  await p.waitForTimeout(400); t = await text();
  ok(/1 conversation not read yet/.test(t) && /Bring it up to date \(1\)/.test(t), '6. a new conversation in the folder: one not read yet', (t.match(/\d+ conversations? not read yet/) || [''])[0]);
  sent = []; NOTES = NOTES.replace('Check the export of long tables.', 'Check the export of long tables.\nOPEN: Number the tables too.');
  await press(/^Bring it up to date/); for (let i = 0; i < 60; i++) { const busy = await p.evaluate(() => IngFolders.run.busy); if (!busy) break; await p.waitForTimeout(250); }
  const u1 = JSON.stringify((sent[0] || {}).messages || []);
  ok(sent.length === 1 && /figure numbers/.test(u1) && !/footnotes vanish/.test(u1) && /THE SUMMARY SO FAR:\\nQuill is a writing app/.test(u1), '6. only the new conversation is read, with the summary so far: nothing is read twice', { calls: sent.length });
  // 7. moved by hand
  await p.evaluate(() => { const sel = [...document.querySelectorAll('#page-folders .fld-list select')][0]; const opt = [...sel.options].find((o) => o.textContent === 'Ledger'); sel.value = opt.value; sel.dispatchEvent(new Event('change')); });
  await p.waitForTimeout(300); fs1 = await F();
  ok(fs1.find((f) => f.name === 'Ledger').n === 1, '7. a conversation moved by hand goes to the folder she chose', fs1.map((f) => [f.name, f.n]));
  // 8. Ollama: a Modelfile's instructions become a way of working
  await p.evaluate(() => { IngFolders.paint(); state.folders.ui.open = null; saveState(); IngFolders.paint(); });
  await p.waitForTimeout(300); await press(/^Paste a Modelfile$/); await p.waitForSelector('#fldOlText', { timeout: 5000 });
  await p.fill('#fldOlText', '# Modelfile generated by "ollama show"\nFROM llama3.1:8b\nPARAMETER temperature 0.3\nPARAMETER num_ctx 8192\nSYSTEM """You help me build Quill. Plan first, then build, then check. Plain words."""\n');
  await p.fill('#fldOlName', 'Quill helper'); await p.click('#fldOlGo'); await p.waitForTimeout(300);
  const sk = await p.evaluate(() => (state.skills || []).filter((s) => s.from === 'ollama').map((s) => ({ n: s.name, i: s.instructions })));
  ok(sk.length === 1 && sk[0].n === 'Quill helper' && /^You help me build Quill\. Plan first, then build, then check\. Plain words\./.test(sk[0].i) && /temperature 0\.3; num_ctx 8192/.test(sk[0].i), '8. an Ollama model\'s Modelfile: its instructions kept as a way of working, its settings noted', sk);
  // 9. a folder for a new app at any time; the page scrolls and ends with the colophon
  await press(/^\+ A folder for another app$/); await p.fill('#fldAddName', 'Compass'); await p.press('#fldAddName', 'Enter'); await p.waitForTimeout(300);
  fs1 = await F();
  ok(fs1.some((f) => f.name === 'Compass'), '9. a folder for a new app, made in place', fs1.map((f) => f.name));
  const foot = await p.evaluate(() => { const c = document.getElementById('ingColophon'); return c && c.getAttribute('data-on'); });
  ok(foot === '1', '9. the page ends with Ingenium\'s colophon, as the pages that scroll do', foot);
  await p.screenshot({ path: OUT + '/folders.png', fullPage: true });
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
