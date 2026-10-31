// node rig/t_694_import.js <Ingenium page url> <out dir> <url of the folder import_fixtures.js wrote>
// Ingenium 6.9.1 (30 October 2026), in Chromium. The owner's words: "I want to be able to import my exported data from other
// chats into the app and continue working on my projects smoothly. It needs to be a smooth handoff from any frontier provider."
// What 6.9.1 adds to the import (build/thoughts/chat_import_core.html, modules/r160.js), each checked here:
//   - Claude Code's session files (.jsonl) are read: one conversation a session, named by its summary, its thinking kept,
//     the tools it used and what they answered under the reply, its folder in a note; meta and system lines left out;
//   - a transcript headed by Perplexity (or Kimi, Poe, ...) splits into turns; "Q:" and "A:" are speakers;
//   - a note that is no conversation, and a JSON of another shape, are named as left aside, and the dialog offers a paste;
//   - a conversation pasted in (Settings, and the list's key) is read, listed and brought in;
//   - the first reply after a conversation is carried over tells the model where it came from, once;
//   - the 28 checks of t_62_import.js still pass (run it too); no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, FIX] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
async function boot(ctx) {
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400); return p;
}
const read = (p, names) => p.evaluate(async ({ FIX, names }) => {
  const files = []; for (const n of names) { const b = await (await fetch(FIX + '/' + n)).blob(); files.push(new File([b], n, { type: /\.zip$/.test(n) ? 'application/zip' : '' })); }
  const f = await IngImport.read(files); window.__found = f;
  return { source: f.source, n: f.conversations.length, skipped: f.skipped, convs: f.conversations.map(c => ({ id: c.id, title: c.title, src: c.source, model: c.model, created: c.created, updated: c.updated, notes: c.notes || [],
    msgs: c.messages.map(m => ({ r: m.role, t: m.text.slice(0, 400), think: (m.think || '').slice(0, 120) })) })) };
}, { FIX, names });
const fakeModel = (p) => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some(m => m.id === 'imp-test')) state.models.push({ id: 'imp-test', customName: 'Faber (test)', fileState: 'ready', sizeBytes: 1 });
  state.activeModelId = 'imp-test'; Engine.modelId = 'imp-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  window.__sent = []; Engine.generate = function (o) { window.__sent.push(o.messages.map(m => ({ role: m.role, content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) })));
    try { o.onToken && o.onToken('Carrying on from where we were.'); } catch (e) { } return Promise.resolve(); };
});
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1380, height: 900 } });
  let p = await boot(ctx);
  // ---- Claude Code ----
  let r = await read(p, ['claude_code_session.jsonl']);
  const s1 = r.convs.find(c => c.title === 'Footnotes in Tabula fixed'), s2 = r.convs.find(c => /Rename the Workshop/.test(c.title));
  ok(r.source === 'Claude Code' && r.n === 2 && s1 && s2, 'a Claude Code session file: two sessions, from Claude Code, the first named by its summary', [r.source, r.n, r.convs.map(c => c.title)]);
  ok(s1 && s1.msgs.length === 2 && s1.msgs[0].r === 'user' && /footnotes in Tabula vanish/.test(s1.msgs[0].t) && s1.msgs[1].r === 'assistant', 'its turns: her request, then one reply gathered from the lines of the session', s1 && s1.msgs);
  ok(s1 && /autosave probably/.test(s1.msgs[1].think) && /\[used Read: apps\/tabula\.html\]/.test(s1.msgs[1].t) && /\[the tool answered\]\nfunction autosave/.test(s1.msgs[1].t) && /keeps only the main text/.test(s1.msgs[1].t), 'the reply keeps its thinking, the tool it used, what the tool answered, and its words', s1 && s1.msgs[1]);
  ok(s1 && s1.model === 'claude-opus-5-5' && s1.created > 1.7e12 && s1.updated > s1.created && /working in \/home\/user\/Ingenium on branch main/.test(s1.notes.join(' ')), 'the model, the dates, and a note of the folder and branch it worked in', s1 && [s1.model, s1.created, s1.updated, s1.notes]);
  ok(s2 && s2.msgs.length === 2 && s2.model === 'claude-sonnet-5-5' && !r.convs.some(c => c.msgs.some(m => /command-name|a system line/.test(m.t))), 'the second session whole; the meta and system lines left out', s2 && s2.msgs);
  // ---- transcripts with other heads ----
  r = await read(p, ['perplexity_headed.md']);
  ok(r.n === 1 && r.convs[0].msgs.length === 4 && r.convs[0].msgs[1].r === 'assistant' && /Dobsonian/.test(r.convs[0].msgs[1].t) && r.convs[0].src === 'Perplexity', 'a transcript headed "## User" and "## Perplexity" splits into four turns', r.convs[0] && r.convs[0].msgs);
  r = await read(p, ['qa.txt']);
  ok(r.n === 1 && r.convs[0].msgs.length === 4 && r.convs[0].msgs[3].r === 'assistant' && /Nineteen lines/.test(r.convs[0].msgs[3].t), '"Q:" and "A:" are speakers', r.convs[0] && r.convs[0].msgs);
  // ---- what is no conversation is named ----
  r = await read(p, ['unlabelled.txt']);
  ok(r.n === 0 && r.skipped.includes('unlabelled.txt'), 'a note that is no conversation is left aside, by name (and "A quick note:" is no speaker)', r);
  r = await read(p, ['unknown_shape.json']);
  ok(r.n === 0 && r.skipped.includes('unknown_shape.json'), 'a JSON of another shape is left aside, by name', r);
  r = await read(p, ['messages.jsonl']);
  ok(r.n === 1 && r.convs[0].msgs.length === 2, 'JSON lines of role and content still read as before', r);
  // ---- the paste path, as a person does it ----
  await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
  const keys = await p.evaluate(() => [...document.querySelectorAll('#ingImportCard button')].map(b => b.textContent.trim()));
  ok(keys.includes('Choose your export…') && keys.includes('Paste a transcript…'), 'Settings: beside Choose your export, Paste a transcript', keys);
  await p.evaluate(() => [...document.querySelectorAll('#ingImportCard button')].find(b => b.textContent.trim() === 'Paste a transcript…').click()); await p.waitForTimeout(500);
  await p.fill('#modalBox textarea.imp-paste', 'Some notes I took on Tuesday.\nNothing here is a conversation.\n');
  await p.evaluate(() => [...document.querySelectorAll('#modalBox button')].find(b => b.textContent.trim() === 'Read it').click()); await p.waitForTimeout(1200);
  let dlg = await p.evaluate(() => ({ text: document.querySelector('#modalBox').textContent, keys: [...document.querySelectorAll('#modalBox button')].map(b => b.textContent.trim()) }));
  ok(/Nothing that looks like a conversation/.test(dlg.text) && /Left aside, not read as conversations: pasted-transcript\.md/.test(dlg.text) && dlg.keys.includes('Paste a transcript instead') && dlg.keys.includes('Close'), 'pasted notes: nothing found, the paste named as left aside, and a way on', dlg);
  await p.evaluate(() => [...document.querySelectorAll('#modalBox button')].find(b => b.textContent.trim() === 'Paste a transcript instead').click()); await p.waitForTimeout(500);
  await p.fill('#modalBox textarea.imp-paste', '# Villanelles\n\nUser: What is a villanelle?\n\nClaude: A poem of nineteen lines with two refrains, as in Dylan Thomas\'s "Do not go gentle into that good night".\n\nUser: Who else wrote one?\n\nClaude: Elizabeth Bishop, "One Art".\n');
  await p.evaluate(() => [...document.querySelectorAll('#modalBox button')].find(b => b.textContent.trim() === 'Read it').click()); await p.waitForTimeout(1200);
  dlg = await p.evaluate(() => ({ h: document.querySelector('#modalBox h3').textContent, sum: document.querySelector('#modalBox .imp-sum').textContent, keys: [...document.querySelectorAll('#modalBox button')].map(b => b.textContent.trim()) }));
  ok(/Bring your chats from/.test(dlg.h) && /1 conversation, 4 messages/.test(dlg.sum) && dlg.keys.includes('Bring all'), 'a pasted conversation: read, one conversation of four messages', dlg);
  await p.evaluate(() => [...document.querySelectorAll('#modalBox button')].find(b => b.textContent.trim() === 'Bring all').click()); await p.waitForTimeout(1500);
  const got = await p.evaluate(() => { const c = (state.chats || []).find(x => x.imported && x.title === 'Villanelles'); return c ? { from: c.imported.from, count: c.imported.count, brief: c.imported.brief } : null; });
  ok(got && got.count === 4 && /villanelle/i.test(got.brief), 'it is in the list, carried over, with its brief', got);
  // ---- the first reply tells the model where it came from, once ----
  await fakeModel(p);
  const told = await p.evaluate(async () => { const c = (state.chats || []).find(x => x.imported && x.title === 'Villanelles'); state.activeChat = c.id; renderChat();
    for (let i = 0; i < 50 && curMsgs().length < 4; i++) await new Promise(r => setTimeout(r, 100));
    document.getElementById('chatInput').value = 'And a sestina?'; sendChat(); for (let i = 0; i < 60 && !(window.__sent && window.__sent.length); i++) await new Promise(r => setTimeout(r, 100));
    await new Promise(r => setTimeout(r, 800));
    document.getElementById('chatInput').value = 'And a ghazal?'; sendChat(); for (let i = 0; i < 60 && !(window.__sent && window.__sent.length > 1); i++) await new Promise(r => setTimeout(r, 100));
    return { first: JSON.stringify(window.__sent[0] || []), second: JSON.stringify(window.__sent[1] || []), told: c.imported.told }; });
  const once = (s) => (s.match(/carried over from Claude/g) || []).length;
  ok(once(told.first) === 1 && /What is a villanelle/.test(told.first) && /sestina/.test(told.first), 'the first reply: the model is told once that the conversation was carried over (from Claude, named in the transcript), with its brief, and reads its turns', told.first.slice(0, 900));
  ok(once(told.second) === 1 && told.told != null && /ghazal/.test(told.second), 'the second reply: the note stays on the first message and is not added again', told.second.slice(0, 300));
  // ---- the list's keys ----
  await p.evaluate(() => go('chat')); await p.waitForTimeout(600);
  const side = await p.evaluate(() => [...document.querySelectorAll('.cc-import, .cc-import-paste')].map(b => b.textContent.trim()));
  ok(side.some(t => /Bring chats from another assistant/.test(t)) && side.some(t => /Paste a conversation/.test(t)), 'under the list of conversations: bring an export, or paste a conversation', side);
  ok(p.__errs.length === 0, 'no errors on the page', p.__errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
