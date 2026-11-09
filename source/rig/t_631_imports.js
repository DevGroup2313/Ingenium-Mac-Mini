// Ingenium 6.31 (6 November 2026): Folders brings in work from every assistant the shared import reads, and LM Studio's chats too
// (thoughts/chat_import_core.html, modules/r160.js, modules/r208.js). Her request: Folders should bring in work from ChatGPT, DeepSeek,
// LM Studio and the other assistants, not only from Claude and Ollama. LM Studio does not describe its chat files; the files here are
// invented in the shape the reader expects (messages, each with versions and the one chosen), with invented words.
//   node rig/t_631_imports.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const LM = { name: 'Planning the Example App release', createdAt: 1762300000000, systemPrompt: 'Answer briefly.', lastUsedModel: { identifier: 'example-model-7b' },
  messages: [
    { versions: [{ type: 'singleStep', role: 'user', content: [{ type: 'text', text: 'How should the Example App release be planned?' }] }], currentlySelected: 0 },
    { versions: [{ type: 'singleStep', role: 'assistant', content: [{ type: 'text', text: 'FIRST DRAFT, not chosen.' }] },
      { type: 'multiStep', role: 'assistant', steps: [{ type: 'contentBlock', content: [{ type: 'text', text: 'Plan it in three steps: build, check, ship.' }] }] }], currentlySelected: 1 },
    { versions: [{ type: 'singleStep', role: 'user', content: [{ type: 'text', text: 'Thank you.' }] }], currentlySelected: 0 } ] };
const GPT = [{ title: 'A ChatGPT chat about Example App', create_time: 1762200000, update_time: 1762200100, current_node: 'n3', conversation_id: 'g1',
  mapping: { n1: { id: 'n1', message: null, parent: null, children: ['n2'] },
    n2: { id: 'n2', message: { author: { role: 'user' }, content: { content_type: 'text', parts: ['Name three colours.'] }, create_time: 1762200000 }, parent: 'n1', children: ['n3'] },
    n3: { id: 'n3', message: { author: { role: 'assistant' }, content: { content_type: 'text', parts: ['Red, green and blue.'] }, create_time: 1762200050 }, parent: 'n2', children: [] } } }];
const PLAIN = { title: 'A plain transcript', messages: [{ role: 'user', content: 'Hello there.' }, { role: 'assistant', content: 'Hello.' }] };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngImport && window.IngFolders, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  // 1. Folders names every assistant it can bring in, with one key
  const card = await p.evaluate(() => { go('folders'); try { state.folders.ui.open = null; IngFolders.paint(); } catch (e) {} const ways = [...document.querySelectorAll('#page-folders .fld-way')].map(w => ({ t: (w.querySelector('b') || {}).textContent || '', keys: [...w.querySelectorAll('button')].map(x => x.textContent.trim()) })); return ways; });
  const many = card.find(w => /ChatGPT/.test(w.t) && /DeepSeek/.test(w.t) && /LM Studio/.test(w.t));
  ok(!!many && many.keys.includes('Bring in an export'), 'Folders\' Bring in your work names ChatGPT, Gemini, Grok, DeepSeek, Le Chat, Copilot and LM Studio, with Bring in an export', card.map(w => w.t));
  await p.locator('#page-folders .fld-way').first().screenshot({ path: OUT + '/631_way.png' }).catch(() => {});
  // 2. an LM Studio chat file is read as LM Studio's: the chosen version, the steps, the system prompt, the model, the title
  const r = await p.evaluate(([LM, GPT, PLAIN]) => { const f = (o, n) => new File([JSON.stringify(o)], n, { type: 'application/json' });
    return IngImport.read([f(LM, '1762300000000.conversation.json'), f(GPT, 'conversations.json'), f(PLAIN, 'plain.json')], function () {}).then(found => { window.__found = found;
      return found.conversations.map(c => ({ title: c.title, source: c.source, model: c.model, n: c.messages.length, texts: c.messages.map(m => m.role + ':' + m.text), notes: c.notes })); }); }, [LM, GPT, PLAIN]);
  const lm = r.find(c => c.source === 'LM Studio'), gpt = r.find(c => c.source === 'ChatGPT'), pl = r.find(c => /plain/i.test(c.title));
  ok(!!lm && lm.title === 'Planning the Example App release' && lm.model === 'example-model-7b', 'an LM Studio chat file is recognised as LM Studio\'s, with its title and model', lm || r);
  ok(!!lm && lm.n === 3 && /Plan it in three steps/.test(lm.texts[1]) && !lm.texts.join(' ').includes('FIRST DRAFT'), 'the version chosen is read (a reply made again keeps only the one chosen), its words taken from its steps', lm && lm.texts);
  ok(!!lm && (lm.notes || []).some(t => /Answer briefly/.test(t)), 'its system prompt is kept as a note, not as a message', lm && lm.notes);
  ok(!!gpt && gpt.n === 2 && /Red, green and blue/.test(gpt.texts[1]), 'a ChatGPT export is still read as ChatGPT\'s', gpt || r);
  ok(!!pl && pl.n === 2, 'a plain list of messages is still read', pl || r);
  // 3. brought in, it joins the conversations and is sorted into the folder whose words it carries
  const put = await p.evaluate(() => { const f = IngFolders.make('Example App');
    return Promise.resolve(IngImport.apply(window.__found, {})).then(made => { IngFolders.sortAll(); saveState();
      const c = (state.chats || []).find(x => x.imported && x.imported.from === 'LM Studio'); return { made, folder: f.id, chat: c ? { title: c.title, projectId: c.projectId, from: c.imported.from } : null }; }); });
  ok(put.chat && put.chat.from === 'LM Studio' && put.chat.projectId === put.folder, 'brought in, the LM Studio chat joins your conversations, marked as from LM Studio, and is sorted into the Example App folder', put);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
