// R131 and R132: a Claude export brought into Ingenium (read by shape, kept in the larger store, listed, continued as a
// chat, drawn on in chats but not sent to a connection, made into a personal AI, written as training data, handed to the
// trainer), and the desk kept in the larger store when the small one refuses it, then brought back on the next start.
// node rig/t_claude.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
async function enter(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); }

// a made-up export in the shape Claude's exports are known to take (Anthropic does not document it): conversations with
// chat_messages (sender, text, content blocks, attachments), projects with docs and a prompt template, and the account
const conv = [
  { uuid: 'aaaa-1111', name: 'Zephyrine cartography', created_at: '2026-05-02T10:00:00Z', updated_at: '2026-05-03T10:00:00Z', project_uuid: 'pppp-1',
    chat_messages: [
      { uuid: 'm1', sender: 'human', text: 'Help me plan the chapter on zephyrine cartography in the Baltic ports, with the archive list.', created_at: '2026-05-02T10:00:00Z',
        attachments: [{ file_name: 'archives.txt', file_size: 40, file_type: 'txt', extracted_content: 'Riga harbour charts, 1784; Tallinn customs ledgers.' }], files: [] },
      { uuid: 'm2', sender: 'assistant', text: 'Zephyrine cartography in the Baltic ports can be organised in three movements: the harbour charts of Riga (1784), the customs ledgers of Tallinn, and the pilot books. Begin with the charts, since they date the trade routes, then use the ledgers to show who moved the goods, and close with the pilot books as evidence of practice. ' + 'Each source asks for its own care: the charts for their scale and their makers, the ledgers for their gaps and their clerks, the pilot books for the sailors who wrote in them. '.repeat(10), created_at: '2026-05-02T10:01:00Z' }] },
  { uuid: 'bbbb-2222', name: '', created_at: '2026-06-01T09:00:00Z', updated_at: '2026-06-01T09:30:00Z',
    chat_messages: [
      { uuid: 'm3', sender: 'human', text: '', content: [{ type: 'text', text: 'What is the best way to cite a letter held in a private collection in Chicago style?' }] },
      { uuid: 'm4', sender: 'assistant', text: 'ignored when content has text', content: [{ type: 'thinking', thinking: 'secret reasoning' }, { type: 'text', text: 'In Chicago style, a letter in a private collection is cited with the writer, the recipient, the date, and the words "private collection of" followed by the owner, for example: Jane Doe to John Roe, 4 March 1911, private collection of Ann Smith.' }, { type: 'tool_use', name: 'web_search', input: {} }] }] },
  { uuid: 'cccc-3333', name: 'Short note', created_at: '2026-04-01T09:00:00Z', updated_at: '2026-04-01T09:00:00Z',
    chat_messages: [{ uuid: 'm5', sender: 'human', text: 'Remember the word marzipan-lantern for later.' }] },
];
const projects = [{ uuid: 'pppp-1', name: 'Baltic thesis', description: 'A DPhil on Baltic trade', prompt_template: 'Write in British English and cite in Chicago style.', is_private: true,
  docs: [{ uuid: 'd1', filename: 'outline.md', content: '# Outline\n1. Charts\n2. Ledgers\n3. Pilot books', created_at: '2026-05-01T00:00:00Z' }] }];
const users = [{ uuid: 'u1', full_name: 'Test Person', email_address: 'nobody@example.org', verified_phone_number: null }];
const dir = path.join(OUT, 'export'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'conversations.json'), JSON.stringify(conv));
fs.writeFileSync(path.join(dir, 'projects.json'), JSON.stringify(projects));
fs.writeFileSync(path.join(dir, 'users.json'), JSON.stringify(users));
fs.writeFileSync(path.join(dir, 'README.txt'), 'not conversation text');
const ZIP = path.join(OUT, 'claude-export.zip');
cp.execFileSync('python3', ['-I', '-c', 'import sys,zipfile,os\nd,z=sys.argv[1],sys.argv[2]\nwith zipfile.ZipFile(z,"w",zipfile.ZIP_DEFLATED) as f:\n  [f.write(os.path.join(d,n),n) for n in sorted(os.listdir(d))]', dir, ZIP]);

(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await enter(p);
  ok(await p.evaluate(() => window.__ingParts.p55 === 'running' && window.__ingParts.p56 === 'running' && typeof IngClaude === 'object' && typeof window.__deskOverflow === 'function'), 'both parts are in the page (p55 From Claude, p56 room to grow)');

  // the + key offers From Claude
  await p.evaluate(() => go('chat')); await p.waitForTimeout(800);
  await p.evaluate(() => document.getElementById('chatImgBtn').click()); await p.waitForTimeout(300);
  const plus = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].map(x => x.textContent.trim().slice(0, 40)));
  ok(plus.some(t => /^From Claude/.test(t)) && plus.findIndex(t => /^From Claude/.test(t)) === plus.findIndex(t => /Add from GitHub/.test(t)) + 1, 'the + key in Chat offers From Claude, after Add from GitHub', plus.join(' | '));
  await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].find(x => /^From Claude/.test(x.textContent.trim())).click()); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !!document.querySelector('#modalBox .cl-panel #clDrop') && /Settings, then Privacy, then Export data/.test(document.querySelector('#modalBox').innerText)), 'the panel opens, with how to get the export (Settings, Privacy, Export data)');
  await p.screenshot({ path: path.join(OUT, 'panel_empty.png') });

  // bring it in
  await p.setInputFiles('#clIn', ZIP); await p.waitForFunction(() => /Brought in|could not/.test((document.getElementById('clSay') || {}).textContent || ''), null, { timeout: 30000 });
  const say = await p.evaluate(() => document.getElementById('clSay').textContent);
  ok(/Brought in 3 conversations \(3 new, 0 updated; 5 messages\), and 1 project/.test(say), 'the zip is read: 3 conversations, 5 messages, 1 project', say);
  ok(/users\.json: your account's own details, which are not read/.test(say) && /README\.txt/.test(say), 'the account file is named and not read; a file that is not conversation text is named as left aside', say);
  const kept = await p.evaluate(() => { const pj = (state.projects || []).filter(x => x.fromClaude === 'pppp-1')[0]; const desk = localStorage.getItem(KEY) || '';
    return { n: state.claude && state.claude.n, pj: pj ? { name: pj.name, ins: pj.instructions, files: pj.files.map(f => f.name + ':' + f.text.length) } : null, inDesk: /harbour charts of Riga/.test(desk), deskHasN: /"claude":\{/.test(desk) }; });
  ok(kept.n === 3 && kept.pj && kept.pj.name === 'Baltic thesis' && /British English/.test(kept.pj.ins) && /About this project: A DPhil on Baltic trade/.test(kept.pj.ins) && kept.pj.files[0] === 'outline.md:45', 'the Claude project becomes an Ingenium project with its instructions and documents', JSON.stringify(kept));
  ok(!kept.inDesk && kept.deskHasN, 'the conversations are kept in the larger store, not in the desk (the desk only counts them)', JSON.stringify(kept));
  const rows = await p.evaluate(() => [...document.querySelectorAll('#clList .cl-row')].map(r => r.innerText.replace(/\n/g, ' | ')));
  ok(rows.length === 3 && /What is the best way to cite a letter/.test(rows[0]) && /Zephyrine cartography/.test(rows[1]), 'the list shows each conversation, newest first; one without a name takes its first words', rows.join(' || '));
  await p.screenshot({ path: path.join(OUT, 'panel_full.png') });

  // continue one here
  await p.evaluate(() => [...document.querySelectorAll('#clList .cl-row')].find(r => /Zephyrine/.test(r.innerText)).querySelector('button').click()); await p.waitForTimeout(1200);
  const ch = await p.evaluate(() => { const c = curChat(); return { title: c.title, from: c.fromClaude, proj: c.projectId && (state.projects.filter(x => x.id === c.projectId)[0] || {}).name, n: c.messages.length,
    roles: c.messages.map(m => m.role + (m.preview ? '*' : '')).join(','), files: (c.messages[0].files || []).map(f => f.name).join(','), att: /Riga harbour charts/.test(c.messages[0].attach || ''), modal: document.getElementById('modalRoot').classList.contains('show') || getComputedStyle(document.getElementById('modalRoot')).display !== 'none' }; });
  ok(ch.title === 'Zephyrine cartography' && ch.from === 'cl_aaaa-1111' && ch.proj === 'Baltic thesis' && ch.roles === 'me,bot,bot*' && ch.files === 'archives.txt' && ch.att, 'Continue here opens it as an Ingenium conversation, in its project, with its file', JSON.stringify(ch));
  await p.screenshot({ path: path.join(OUT, 'chat_continued.png') });
  const again = await p.evaluate(() => IngClaude.open('cl_aaaa-1111').then(() => state.chats.filter(c => c.fromClaude === 'cl_aaaa-1111').length));
  ok(again === 1, 'opening it again goes to the same conversation, not a copy', again);

  // the history drawn on
  const ps = await p.evaluate(() => IngClaude.passages('zephyrine cartography harbour charts', 3000));
  ok(/From the person's earlier conversations with Claude/.test(ps) && /<passage chat="Zephyrine cartography" date="2026-05-03">/.test(ps) && /harbour charts of Riga/.test(ps), 'the passages that match a message are found across the history, named by conversation and date', ps.slice(0, 260));
  const prep = await p.evaluate(() => { state.chatSource = 'local'; return chatPrepare({ text: 'Tell me again how to cite a letter in a private collection' }, { live: false }).then(r => (r && r.context) || ''); });
  ok(/private collection of Ann Smith/.test(prep) && !/secret reasoning/.test(prep), 'each message to a model on this device brings the matching passages (and never Claude\'s hidden reasoning)', prep.slice(0, 200));
  const cloud = await p.evaluate(() => { state.chatSource = 'cloud'; return chatPrepare({ text: 'Tell me again how to cite a letter in a private collection' }, { live: false }).then(r => { state.chatSource = 'local'; return (r && r.context) || ''; }); });
  ok(!/private collection of Ann Smith/.test(cloud), 'nothing from the history goes to a connection while "Also for a connection" is off', cloud.slice(0, 120));
  const off = await p.evaluate(() => { state.claude.use = false; return chatPrepare({ text: 'cite a letter in a private collection' }, { live: false }).then(r => { state.claude.use = true; return (r && r.context) || ''; }); });
  ok(!/Ann Smith/.test(off), 'with "Draw on my Claude history" off, nothing is added', off.slice(0, 120));

  // a personal AI from it
  const ai = await p.evaluate(() => IngClaude.makeAI().then(a => ({ name: a.name, ex: a.examples.length, q0: a.examples[0] && a.examples[0].q.slice(0, 30), files: a.files.map(f => f.name), list: /Zephyrine cartography \(2 messages\)/.test(a.files[0].text), proj: /Baltic thesis[\s\S]*British English/.test((a.files[1] || {}).text || ''), n: state.ownAIs.filter(x => x.fromClaude).length })));
  ok(ai.name === 'From my Claude work' && ai.ex === 2 && ai.files.length === 2 && ai.list && ai.proj && ai.n === 1, 'a personal AI is made from it: examples of how the owner works, the list of conversations, the projects\' instructions', JSON.stringify(ai));

  // training data
  const jl = await p.evaluate(() => IngClaude.jsonl());
  const lines = jl.trim().split('\n').map(l => JSON.parse(l));
  ok(lines.length === 2 && lines.every(l => l.messages[0].role === 'user' && l.messages.every((m, i) => m.role === (i % 2 ? 'assistant' : 'user'))) && /archives\.txt/.test(lines.map(l => JSON.stringify(l)).join('')), 'the training data is one conversation a line, user and assistant in turn, files included; a conversation with no reply is left out', jl.slice(0, 160));
  const tx = await p.evaluate(() => IngClaude.plain());
  ok(/^# What is the best way/.test(tx) && /### Me\n/.test(tx) && /### Claude\n/.test(tx), 'the plain text for the trainer is the dialogue, newest first', tx.slice(0, 80));
  const noTrain = await p.evaluate(() => IngClaude.train().then(() => 'opened', e => e.message));
  ok(/Mac or Windows/.test(noTrain), 'in a browser, training says it runs in the computer apps', noTrain);
  const tr = await p.evaluate(() => { window.trainApi = function () { return { train_available: () => ({ trainer: true, cores: 4 }), train_status: () => ({ state: 'idle' }), train_start: () => ({ ok: true, id: 't' }), train_cancel: () => ({}) }; };
    return IngClaude.train().then(() => new Promise(r => setTimeout(r, 400))).then(() => { const box = document.getElementById('modalBox'); const ta = box.querySelector('textarea'); return { title: (box.querySelector('#trTitle') || {}).textContent, has: !!ta && /### Me/.test(ta.value), name: (box.querySelector('input[type=text]') || {}).value }; }); });
  ok(/step 2/.test(tr.title || '') && tr.has, 'on a computer the trainer opens on its text step with the history already given', JSON.stringify(tr));
  await p.screenshot({ path: path.join(OUT, 'trainer.png') });
  await p.evaluate(() => closeModal());

  // a newer export again: updates, no second project
  const re = await p.evaluate(async (b64) => { const u = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const f = new File([u], 'claude-export.zip', { type: 'application/zip' });
    const r = await IngClaude.importFiles([f]); return { r, pj: state.projects.filter(x => x.fromClaude === 'pppp-1').length }; }, fs.readFileSync(ZIP).toString('base64'));
  ok(re.r.fresh === 0 && re.r.updated === 3 && re.r.projAdded === 0 && re.pj === 1, 'the same export again updates what is there, with no second project', JSON.stringify(re));

  // R132: Settings shows the room; a desk the small store refuses goes to the larger one and comes back on the next start
  // 6.7: Settings is in rooms (r173); Data on this device is in Your data, so that room is opened first, as a person would
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForTimeout(900);
  const room = await p.evaluate(() => ({ t: (document.getElementById('r132Sum') || {}).textContent || '', key: !!document.getElementById('clSetKey'), w: (document.getElementById('r132Fill') || {}).style ? document.getElementById('r132Fill').style.width : '' }));
  ok(/Ingenium uses .* here; the browser offers it about/.test(room.t) && /small store/.test(room.t) && room.key, 'Settings, Data on this device, says how much room Ingenium uses and offers, and has the key to bring in Claude data', JSON.stringify(room));
  await p.locator('#r132Room').scrollIntoViewIfNeeded(); await p.screenshot({ path: path.join(OUT, 'settings_room.png') });
  const full = await p.evaluate(() => new Promise(res => { const real = Storage.prototype.setItem; window.__realSet = real;
    Storage.prototype.setItem = function (k, v) { if (this === localStorage && k === KEY) { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; } return real.call(this, k, v); };
    state.appName = 'Overflow test'; saveState(); setTimeout(() => window.__r132.get().then(r => res({ lsOk: r && r.lsOk, has: !!(r && r.raw && /Overflow test/.test(r.raw)), toast: (document.getElementById('ingToast') || {}).textContent || '', ls: /Overflow test/.test(localStorage.getItem(KEY) || '') })), 900); }));
  ok(full.lsOk === false && full.has && !full.ls && /small store \(about 5 MB\) is full, so your desk is now kept in this device's larger store/.test(full.toast), 'a desk the small store refuses is kept in the larger store, and the person is told nothing is lost', JSON.stringify(full));
  await p.reload(); await enter(p); await p.waitForTimeout(1500);
  const back = await p.evaluate(() => window.__r132.get().then(r => ({ name: state.appName, ls: /Overflow test/.test(localStorage.getItem(KEY) || ''), rec: r && r.lsOk, raw: r && r.raw === null, toast: (document.getElementById('ingToast') || {}).textContent || '' })));
  ok(back.name === 'Overflow test' && back.ls && back.rec === true && back.raw, 'on the next start the newer desk comes back from the larger store; once the small store takes it again, the larger store lets its copy go', JSON.stringify(back));
  const conv2 = await p.evaluate(() => IngClaude.list().then(l => l.length));
  ok(conv2 === 3, 'the Claude history is still there after the restart', conv2);
  await p.evaluate(() => IngClaude.forget()); ok(await p.evaluate(() => IngClaude.list().then(l => l.length === 0 && !state.claude.n)), 'the history can be removed from the device');
  const tour = await p.evaluate(() => ING_TOUR.filter(c => (c.chap === 'Chat' && c.sub === 'Choosing and adding' && /From Claude, under the \+ key/.test(c.b)) || (c.chap === 'Settings' && c.sub === 'Your data' && /kept in its larger store/.test(c.b))).length);
  ok(tour === 2, 'the tour says so, on the chat card and the data card (no card added)', tour);
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.stack); process.exit(2); });
