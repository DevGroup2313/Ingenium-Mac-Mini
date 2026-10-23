// Ingenium 6.2 · chats carried over from other assistants (modules/r160.js) and a long memory (modules/r159.js), in Chromium.
// The owner's words (23 October 2026): "I want to be able to import my exported data from other chats into the app and continue
// working on my projects smoothly. It needs to be a smooth handoff from any frontier provider." Checks, with the sample exports
// rig/import_fixtures.js makes:
//   - each export is read as it came (the zip, or the file): ChatGPT (the branch that was followed, its code, its reasoning, its
//     attached text file, its project), Claude (its project with instructions and documents, thinking, tools, attachments),
//     Gemini Takeout (prompts gathered into conversations by time), Grok, DeepSeek (the newest branch), Le Chat, Copilot's CSV,
//     a Markdown transcript, JSON lines;
//   - brought in: listed with their own dates and a mark, found by their first words, kept out of the desk until opened; a
//     second import of the same export brings nothing twice;
//   - opened: its messages, and the brief at its top; continued: the model reads it, and it becomes one of hers (kept after a
//     reload); not continued, it stays in the store after a reload and opens again;
//   - from Settings, as a person does it: the file is chosen, the dialog shows what was found, Bring all;
//   - a large export (2,000 conversations, 64 MB of JSON) is read while Ingenium keeps answering;
//   - a long conversation and a small memory: the newest message carries the brief and the earlier passage it asks about;
//   - a connected model is given its own window; Ollama is told how much to keep;
//   - no page errors.
//   node rig/t_62_import.js http://127.0.0.1:8150/ingenium.html <out folder> <fixtures url folder, e.g. http://127.0.0.1:8150/imp>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, FIX] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };

async function boot(ctx) {
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400); return p;
}
const read = (p, names) => p.evaluate(async ({ FIX, names }) => {
  const files = []; for (const n of names) { const b = await (await fetch(FIX + '/' + n)).blob(); files.push(new File([b], n, { type: /\.zip$/.test(n) ? 'application/zip' : '' })); }
  const t0 = Date.now(); const f = await IngImport.read(files); window.__found = f;
  return { ms: Date.now() - t0, source: f.source, n: f.conversations.length, projects: f.projects.map(p => ({ name: p.name, inst: p.instructions, files: p.files.map(x => x.name + ':' + x.text.length) })),
    convs: f.conversations.map(c => ({ id: c.id, title: c.title, src: c.source, project: c.project, model: c.model, created: c.created, updated: c.updated,
      msgs: c.messages.map(m => ({ r: m.role, t: m.text.slice(0, 160), think: (m.think || '').slice(0, 60), files: (m.files || []).map(x => x.name + (x.text ? ':' + x.text.length : '')) })) })), skipped: f.skipped };
}, { FIX, names });
const fakeModel = (p, ctx) => p.evaluate(ctx => {
  state.models = state.models || []; if (!state.models.some(m => m.id === 'imp-test')) state.models.push({ id: 'imp-test', customName: 'Faber (test)', fileState: 'ready', sizeBytes: 1 });
  state.activeModelId = 'imp-test'; Engine.modelId = 'imp-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  if (ctx) { document.getElementById('ctlCtx').value = String(ctx); }
  window.__sent = []; Engine.generate = function (o) { window.__sent.push(o.messages.map(m => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) })));
    try { o.onToken && o.onToken('Carrying on from where we were.'); } catch (e) { } return Promise.resolve(); };
}, ctx);
async function ping(p, n = 5) { let worst = 0; for (let i = 0; i < n; i++) { const t = Date.now(); await p.evaluate(() => 1); worst = Math.max(worst, Date.now() - t); await p.waitForTimeout(100); } return worst; }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let p = await boot(ctx);
  try {
    ok(await p.evaluate(() => !!(window.IngImport && window.IngMemory && IngBig.cold)), 'the import and the long memory are in the page');

    // ---- ChatGPT ----
    let r = await read(p, ['chatgpt_export.zip']);
    const g1 = r.convs.find(c => c.id === 'gpt-conv-1'), g2 = r.convs.find(c => c.id === 'gpt-conv-2');
    ok(r.source === 'ChatGPT' && r.n === 2 && g1 && g2, 'ChatGPT: the zip is read, two conversations', [r.source, r.n, r.ms + ' ms']);
    ok(g1 && !g1.msgs.some(m => /abandoned/.test(m.t)) && /garden planner/.test(g1.msgs[0].t) && /\[a picture\]/.test(g1.msgs[0].t), 'ChatGPT: the branch that was followed, not the edited-away one; the picture named', g1 && g1.msgs.map(m => m.r + ': ' + m.t.slice(0, 50)));
    ok(g1 && g1.msgs[0].files.some(f => /^beds\.md:\d+/.test(f)), 'ChatGPT: the attached text file is read from the zip', g1 && g1.msgs[0].files);
    ok(g1 && g1.msgs.length === 4 && /A grid of beds/.test(g1.msgs[1].think) && /```html/.test(g1.msgs[1].t) && /```python/.test(g1.msgs[3].t) && /output/.test(g1.msgs[3].t) && /Tuesday at 7/.test(g1.msgs[3].t),
      'ChatGPT: its reasoning, its code, the code\'s output and the reply, as one turn each', g1 && g1.msgs);
    ok(g1 && g1.model === 'gpt-5' && g1.created > 1.7e12 && g2 && g2.project === 'g-p-6789abcdef', 'ChatGPT: its model, its dates, its project', [g1 && g1.model, g1 && g1.created, g2 && g2.project]);
    const mg = await p.evaluate(() => IngImport.apply(window.__found, {}));
    ok(mg.chats === 2 && mg.projects === 1 && mg.messages === 6, 'ChatGPT: brought in, its project made', mg);
    r = await read(p, ['chatgpt_export.zip']); const again = await p.evaluate(() => IngImport.apply(window.__found, {}));
    ok(again.chats === 0 && again.again === 2, 'the same export brought in again: nothing twice', again);
    const desk = await p.evaluate(() => { const s = JSON.stringify(state); const cs = state.chats.filter(c => c.imported); return { n: cs.length, inDesk: /Open it in a browser/.test(s), listed: cs.every(c => c.id && c.imported.ref && c.imported.brief) }; });
    ok(desk.n === 2 && !desk.inDesk && desk.listed, 'their words wait in the store, not on the desk; each has its brief', desk);
    await p.evaluate(() => go('chat')); await p.waitForTimeout(500);
    const list = await p.evaluate(() => { const rows = [...document.querySelectorAll('.cc-list .cc-row')]; return rows.map(r => r.textContent.slice(0, 80)); });
    ok(list.some(t => /Garden planner app/.test(t) && /ChatGPT/.test(t)) && list.some(t => /Novel chapter 3/.test(t)), 'listed with the others, marked with where they came from', list.slice(0, 6));
    const found = await p.evaluate(() => { CC.q = 'lighthouse keeper'; const l = document.querySelector('.cc-list'); ccPaintList(l); const t = [...l.querySelectorAll('.cc-row')].map(r => r.textContent); CC.q = ''; ccPaintList(l); return t; });
    ok(found.some(t => /Novel chapter 3/.test(t)), 'found by its first words before it is opened', found);
    // opened
    await p.evaluate(() => { const c = state.chats.find(c => c.imported && c.imported.id === 'gpt-conv-1'); state.activeChat = c.id; renderChat(); });
    await p.waitForFunction(() => curMsgs().length === 4, null, { timeout: 15000 }).catch(() => { });
    const op = await p.evaluate(() => ({ n: curMsgs().length, card: (document.querySelector('#chatScroll .imp-card') || {}).textContent || '', bubbles: document.querySelectorAll('#chatScroll .msg').length }));
    ok(op.n === 4 && /Carried over/.test(op.card) && /From ChatGPT/.test(op.card) && /4 messages/.test(op.card) && /garden\.html/.test(op.card) && op.bubbles >= 4, 'opened: its messages, and the brief at its top (where it began, where it ended, its files)', op);
    await p.screenshot({ path: path.join(OUT, 'imported-open.png') });
    // continued
    await fakeModel(p, 32768);
    await p.fill('#chatInput', 'Carry on: add a frost warning to garden.html'); await p.evaluate(() => sendChat());
    await p.waitForFunction(() => window.__sent.length > 0, null, { timeout: 60000 }).catch(() => { });
    const sent = await p.evaluate(() => window.__sent[0] || []);
    const allText = sent.map(m => m.content).join('\n');
    ok(/garden planner app/.test(allText) && /Tuesday at 7/.test(allText) && /frost warning/.test(allText) && /beds\.md/.test(allText), 'continued: the model reads the conversation carried over, its file with it, and the new request', sent.map(m => m.role + ':' + m.content.slice(0, 60)));
    await p.waitForTimeout(800);
    const ad = await p.evaluate(() => { const c = curChat(); return { adopted: !!c.imported.adopted, inDesk: /frost warning/.test(JSON.stringify(state)) && /garden planner app/.test(JSON.stringify(state)), n: c.messages.length }; });
    ok(ad.adopted && ad.inDesk && ad.n === 6, 'continued, it becomes one of hers: kept on the desk like any other', ad);

    // ---- Claude ----
    r = await read(p, ['claude_export.zip']);
    const k1 = r.convs.find(c => c.id === 'claude-c1');
    ok(r.source === 'Claude' && r.n === 2 && r.projects.length === 1 && /Python 3\.12/.test(r.projects[0].inst) && /invoicing backend/.test(r.projects[0].inst) && r.projects[0].files[0].startsWith('STYLE.md:'),
      'Claude: two conversations, and its project with its instructions and documents', [r.n, r.projects]);
    ok(k1 && k1.project === 'proj-1' && k1.msgs.length === 4 && /VAT must be applied/.test(k1.msgs[1].think) && k1.msgs[0].files[0].startsWith('invoices.py:') && /\[used repl\]/.test(k1.msgs[3].t) && /3 passed/.test(k1.msgs[3].t) && k1.msgs[2].t === 'Now add tests for the zero-rated items.',
      'Claude: thinking, the attached file\'s text, tools and their answers, a message written as plain text', k1 && k1.msgs);
    const mc = await p.evaluate(() => IngImport.apply(window.__found, {}));
    const pj = await p.evaluate(() => { const p = state.projects.find(x => x.imported && x.imported.key === 'proj-1'); const c = state.chats.find(c => c.imported && c.imported.id === 'claude-c1'); return p && c ? { name: p.name, inst: p.instructions, files: p.files.length, linked: c.projectId === p.id } : null; });
    ok(mc.chats === 2 && pj && pj.name === 'Invoicing service' && pj.files === 1 && pj.linked, 'Claude: its project is an Ingenium project, and its conversation belongs to it', pj);

    // ---- the others ----
    const cases = [['gemini_takeout.zip', 'Gemini', 2, c => c.msgs.length === 6 && /```/.test(c.msgs[3].t) && /Explain recursion/.test(c.msgs[0].t)],
      ['grok_export.zip', 'Grok', 1, c => c.msgs.length === 2 && c.msgs[1].r === 'assistant' && c.model === 'grok-4' && c.created > 1.7e12],
      ['deepseek_export.zip', 'DeepSeek', 1, c => c.msgs.length === 2 && !/OLD QUESTION/.test(c.msgs[0].t) && /Numbering within groups/.test(c.msgs[1].think)],
      ['lechat_export.json', 'Le Chat', 1, c => c.msgs.length === 2 && /nous allons/.test(c.msgs[1].t)],
      ['copilot_activity.csv', 'Copilot', 2, c => c.msgs.length === 2 && /"rent" first/.test(c.msgs[0].t)],
      ['perplexity_thread.md', 'Perplexity', 1, c => c.msgs.length === 4 && c.title === 'Best telescope for a beginner' && /Dobsonian/.test(c.msgs[1].t) && /simple to use/.test(c.msgs[1].t)],
      ['messages.jsonl', '', 1, c => c.msgs.length === 2 && c.msgs[1].t === 'Lima.']];
    for (const [f, src, n, test] of cases) {
      r = await read(p, [f]); const c = r.convs.find(x => /Explain recursion|Budget sheet/.test(x.title)) || r.convs[0];
      ok(r.n === n && (!src || r.convs.every(x => x.src === src)) && c && test(c), f + ': ' + (src || 'a transcript in JSON lines') + ', ' + n + ' conversation' + (n === 1 ? '' : 's') + ', read as it should be', [r.n, r.convs.map(x => [x.src, x.title, x.msgs.map(m => m.r[0] + ':' + m.t.slice(0, 40))])]);
    }
    // ---- a reload: carried over and continued stays; carried over and not opened opens again ----
    await p.evaluate(() => saveState()); await p.waitForTimeout(1500);
    await p.close(); p = await boot(ctx);
    const rl = await p.evaluate(async () => { const a = state.chats.find(c => c.imported && c.imported.id === 'gpt-conv-1'), z = state.chats.find(c => c.imported && c.imported.id === 'claude-c2');
      const an = a ? a.messages.length : -1; state.activeChat = z.id; renderChat(); for (let i = 0; i < 50 && curMsgs().length < 2; i++) await new Promise(r => setTimeout(r, 100));
      return { continued: an, other: curMsgs().length, card: !!document.querySelector('#chatScroll .imp-card') }; });
    ok(rl.continued === 6 && rl.other === 2 && rl.card, 'after a reload: the continued one keeps its messages, one not yet opened opens from the store', rl);

    // ---- from Settings, as a person does it ----
    await p.evaluate(() => go('settings')); await p.waitForTimeout(500);
    const card = await p.evaluate(() => { const c = document.getElementById('ingImportCard'); return c ? c.textContent.slice(0, 2000) : null; });
    ok(card && /Bring your chats from other assistants/.test(card) && /ChatGPT/.test(card) && /carried over/.test(card), 'Settings: the card, and what was carried over from where', card);
    fs.writeFileSync(path.join(OUT, 'grok.zip'), Buffer.from(await p.evaluate(async FIX => { const b = await (await fetch(FIX + '/grok_export.zip')).arrayBuffer(); return [...new Uint8Array(b)]; }, FIX)));
    const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => [...document.querySelectorAll('#ingImportCard button')].find(b => /Choose your export/.test(b.textContent)).click())]);
    await fc.setFiles(path.join(OUT, 'grok.zip'));
    await p.waitForFunction(() => /Bring your chats from Grok/.test((document.querySelector('.imp-dlg h3') || {}).textContent || ''), null, { timeout: 30000 }).catch(() => { });
    const dlg = await p.evaluate(() => { const d = document.querySelector('.imp-dlg'); return d ? { h: d.querySelector('h3').textContent, sum: d.querySelector('.imp-sum').textContent, rows: d.querySelectorAll('.imp-c').length } : null; });
    await p.screenshot({ path: path.join(OUT, 'import-dialog.png') });
    ok(dlg && /1 conversation, 2 messages/.test(dlg.sum) && dlg.rows === 1, 'the dialog says what was found', dlg);
    await p.evaluate(() => [...document.querySelectorAll('.imp-dlg button')].find(b => b.textContent === 'Bring all').click());
    await p.waitForFunction(() => state.chats.some(c => c.imported && c.imported.from === 'Grok'), null, { timeout: 20000 }).catch(() => { });
    ok(await p.evaluate(() => state.chats.some(c => c.imported && c.imported.from === 'Grok')), 'Bring all: it is in the list');

    // ---- a large export ----
    let worst = 0; const t0 = Date.now();
    const bigP = p.evaluate(async FIX => { const b = await (await fetch(FIX + '/chatgpt_big.zip')).blob(); const f = await IngImport.read([new File([b], 'chatgpt_big.zip', { type: 'application/zip' })]); window.__found = f;
      return { n: f.conversations.length, convs: f.conversations.filter(c => c.title === 'The long project').map(c => ({ title: c.title, msgs: c.messages.map(() => 0) })) }; }, FIX);
    while (true) { const done = await Promise.race([bigP.then(() => true), new Promise(r => setTimeout(() => r(false), 400))]); if (done) break; const t = Date.now(); await p.evaluate(() => 1); worst = Math.max(worst, Date.now() - t); }
    r = await bigP;
    ok(r.n === 2000 && r.convs.find(c => c.title === 'The long project').msgs.length === 400, 'a large export (2,000 conversations, 64 MB of JSON) is read in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s, Ingenium answering within ' + worst + ' ms all along', [r.n, worst]);
    const t1 = Date.now(); const mb = await p.evaluate(() => IngImport.apply(window.__found, {}));
    const pg = await ping(p), held = await p.evaluate(() => IngBig.held());
    ok(mb.chats === 2000 && pg < 1000 && held.chars < 50e6, 'brought in in ' + ((Date.now() - t1) / 1000).toFixed(1) + ' s; the store holds ' + (held.chars / 1e6).toFixed(1) + ' million characters in memory, the rest on the disk', [mb, held, pg]);

    // ---- a long conversation and a small memory ----
    await fakeModel(p, 8192);
    await p.evaluate(() => { go('chat'); const c = state.chats.find(c => c.imported && c.imported.id === 'big-0'); state.activeChat = c.id; ccState().activeChat = c.id; renderChat(); });
    await p.waitForFunction(() => curMsgs().length === 400, null, { timeout: 30000 }).catch(() => { });
    await p.fill('#chatInput', 'What was the secret harbour code I gave you at the start?'); await p.evaluate(() => sendChat());
    await p.waitForFunction(() => window.__sent.length > 0, null, { timeout: 60000 }).catch(() => { });
    const ls = await p.evaluate(() => { const m = window.__sent[0] || []; const last = [...m].reverse().find(x => x.role === 'user') || {}; const all = m.reduce((a, x) => a + x.content.length, 0);
      return { msgs: m.length, all, last: last.content || '', budget: chatBudget() }; });
    ok(/\[Earlier in this conversation\]/.test(ls.last) && /earlier messages/.test(ls.last) && /ZEBRA-4471/.test(ls.last) && /carried over from ChatGPT/.test(ls.last) && ls.all <= ls.budget * 1.05,
      'a long conversation and a small memory: the newest message carries the brief and the earlier passage it asks about, within the memory', { msgs: ls.msgs, all: ls.all, budget: ls.budget, head: ls.last.slice(0, 300) });

    // ---- the memory a model is given ----
    const win = await p.evaluate(() => { const o = JSON.stringify(state.cloud || {}); state.cloud = { provider: 'anthropic', model: 'claude-opus-5-5', on: true }; const a = ingCloudWindow();
      state.cloud.provider = 'gemini'; state.cloud.model = 'gemini-3-pro'; const g = ingCloudWindow(); state.cloud.provider = 'ollama-local'; state.cloud.model = 'qwen3'; const ol = ingCloudWindow(); state.cloud.window = 131072; const ol2 = ingCloudWindow();
      state.cloud = JSON.parse(o); const m = { id: 'x', fileState: 'ready', shellStored: true, ctxLen: 262144 }; return { a, g, ol, ol2, desk: ingCtxMax(m), page: ingCtxMax({ id: 'y' }), reply: ingReplyMax(m) }; });
    ok(win.a === 200000 && win.g === 1000000 && win.ol === 32768 && win.ol2 === 131072 && win.desk === 262144 && win.page === 32768 && win.reply === 131072,
      'a connected model is given its own window (Claude 200K, Gemini 1M; a server at home 32K, or what is chosen); a model on this computer trained for 256K given 256K, a reply up to 128K (6.3)', win);
    const ol = await p.evaluate(() => /num_ctx:typeof ingCloudWindow/.test(String(cloudChat)));
    ok(ol, 'Ollama is told how much to keep (num_ctx)');
    ok(!p.__errs.length, 'no page errors', p.__errs.slice(0, 5));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
