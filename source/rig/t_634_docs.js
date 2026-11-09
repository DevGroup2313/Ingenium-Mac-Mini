// node rig/t_634_docs.js <Ingenium page url> <out dir>
// Documents in a chat, added the way she adds them (Ingenium 6.34, 6 November 2026). Her words (4 November 2026): "The documents uploaded
// inside of the chats of Ingenium are not clickable or offer a preview when you hover over it, the HTML single file is clickable but not
// the documents, please fix that." modules/r216.js (6.11.1) made a document in a message a key that opens, with its first lines on hover,
// and rig/t_6111_popups.js checks it on a message written into the desk. This test takes the whole road: real files made here (Word
// documents, a PDF, plain text, Markdown, a long transcript), chosen in the chat's own file picker, read by the page, and sent to a model
// on the device. The model is stood in at the engine's adapter, under every part that wraps the engine, so the working loop
// (modules/r190.js) runs as it does for her; the stand-in is scripted to answer, to read with the tools, and to try to change a Word file.
// Found with it (6.34): every file of 1,500 characters or more was left to the tools, and the tools could not read a Word document, so a
// model on the device never saw a long Word file; and a question about documents was framed as work on code.
// Checks:
//   - the files are read and staged with their words (the Word documents' paragraphs and the PDF's text too);
//   - files that fit are sent whole, a long Word document among them, under the reader's note (not the engineer's);
//   - a file too long to sit with the rest is left to the tools, the largest only, and the model reads it through them;
//   - a Word document can be read with the tools and is never changed as text: the model is told so, and no file is changed;
//   - a conversation with code keeps the engineer's note;
//   - each document is a key that opens, shows its first lines on hover and on focus, opens with Enter, still opens after a reload,
//     and opens with a tap on a phone; no page errors.
// Every word in the files is invented.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
// ---- the files, made here ----
const F = path.join(OUT, 'files'); fs.mkdirSync(F, { recursive: true });
const P = (n) => path.join(F, n);
const TXT = P('Reading notes.txt'), MD = P('Outline.md'), LONG = P('Long transcript.md'), DOCX = P('Chapter three.docx'), PDF = P('Pipe rolls.pdf'), JS = P('tally.js');
fs.writeFileSync(TXT, 'DOC-MARK-TXT The tally stick was a notched record of a debt.\nIt was split in two, and each party kept a half.\n');
fs.writeFileSync(MD, '# DOC-MARK-MD Outline\n\n- The Exchequer and its table\n- The tally and its halves\n');
fs.writeFileSync(LONG, 'DOC-MARK-LONG The clerk read the roll aloud.\n' + 'Each sheriff answered for the farm of his county.\n'.repeat(1700) + 'DOC-MARK-LONG-END\n');
fs.writeFileSync(JS, 'function tally(n) {\n  return n + 1;\n}\n');
const PARAS = ['DOC-MARK-DOCX Chapter three: the Exchequer at work.'].concat(Array.from({ length: 12 }, (_, i) => 'Paragraph ' + (i + 1) + ': twice a year each sheriff came before the barons of the Exchequer, and the counters moved on the chequered cloth while the clerks wrote the roll.')).concat(['DOC-MARK-DOCX-END The chapter ends with the roll sewn into the pipe.']);
cp.execFileSync('python3', ['-I', '-c', `
import sys, zipfile, json
p, paras = sys.argv[1], json.loads(sys.argv[2])
ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'
rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
body = ''.join('<w:p><w:r><w:t>%s</w:t></w:r></w:p>' % t for t in paras)
doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + '</w:body></w:document>'
with zipfile.ZipFile(p, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml', ct); z.writestr('_rels/.rels', rels); z.writestr('word/document.xml', doc)
`, DOCX, JSON.stringify(PARAS)]);
cp.execFileSync('python3', ['-I', '-c', `
import sys
p = sys.argv[1]
content = b"BT /F1 14 Tf 72 720 Td (DOC-MARK-PDF The pipe rolls record what the sheriffs paid.) Tj 0 -22 Td (The first that survives is from 1130.) Tj ET"
objs = [b"<< /Type /Catalog /Pages 2 0 R >>", b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        b"<< /Length %d >>\\nstream\\n" % len(content) + content + b"\\nendstream", b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]
out = b"%PDF-1.4\\n"; offs = []
for i, o in enumerate(objs, 1):
    offs.append(len(out)); out += b"%d 0 obj\\n" % i + o + b"\\nendobj\\n"
x = len(out)
out += b"xref\\n0 %d\\n0000000000 65535 f \\n" % (len(objs) + 1) + b"".join(b"%010d 00000 n \\n" % o for o in offs)
out += b"trailer\\n<< /Size %d /Root 1 0 R >>\\nstartxref\\n%d\\n%%%%EOF\\n" % (len(objs) + 1, x)
open(p, 'wb').write(out)
`, PDF]);
const FIRST = [['Chapter three.docx', 'DOC-MARK-DOCX', /DOC-MARK-DOCX-END/], ['Pipe rolls.pdf', 'DOC-MARK-PDF', /first that survives is from 1130/],
  ['Reading notes.txt', 'DOC-MARK-TXT', /split in two/], ['Outline.md', 'DOC-MARK-MD', /tally and its halves/]];
const ALL = FIRST.concat([['Long transcript.md', 'DOC-MARK-LONG', /DOC-MARK-LONG-END/]]);
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const enter = async (p) => { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(400); };
// a model on the device, stood in at the engine's adapter: every part that wraps the engine (the working loop among them) runs as it does
// for her. window.__call, when set, is the one tool call it makes before it answers from the tool's result.
const standIn = (p) => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some(m => m.id === 'doc-test')) state.models.push({ id: 'doc-test', customName: 'Faber (test)', fileState: 'ready', sizeBytes: 1, effort: 3, tokens: 1024, ctx: 32768 });
  state.activeModelId = 'doc-test'; Engine.modelId = 'doc-test'; Engine.status = 'ready'; state.chatSource = 'local'; if (state.cloud) state.cloud.on = false;
  try { document.getElementById('ctlCtx').value = '32768'; } catch (e) {}
  window.__sent = []; window.__call = null;
  Engine.adapter = { hasImageInput: false, abort: function () {}, generate: function (job) {
    const msgs = job.messages || [], all = msgs.map(m => String(m.content || '')).join('\n\n'); window.__sent.push(all);
    const last = String((msgs[msgs.length - 1] || {}).content || ''); let out;
    if (/<tool_response>/.test(last)) out = 'From the documents: ' + last.replace(/<\/?tool_response>/g, '').trim().slice(0, 400);
    else if (window.__call) out = '<tool_call>\n' + JSON.stringify(window.__call) + '\n</tool_call>';
    else out = 'They are notes on the Exchequer.';
    try { job.onToken && job.onToken(out); } catch (e) {}
    return Promise.resolve({ text: out, stats: {} }); } };
  try { IngAgent.setWay('auto'); } catch (e) {} });
const sendWith = async (p, files, text, call) => {
  if (files.length) { const n0 = await p.evaluate(() => (window.stagedFiles || []).length); await p.setInputFiles('#chatAnyFile', files);
    await p.waitForFunction((n) => window.stagedFiles && stagedFiles.length >= n, n0 + files.length, { timeout: 90000 }).catch(() => {}); }
  await p.evaluate((call) => { window.__call = call; window.__sent = []; }, call || null);
  const m0 = await p.evaluate(() => curMsgs().length);
  await p.fill('#chatInput', text); await p.evaluate(() => sendChat());
  await p.waitForFunction((m0) => { const m = curMsgs(); const l = m[m.length - 1]; return m.length >= m0 + 2 && l && l.role === 'bot' && !l.live && (typeof liveBot === 'undefined' || !liveBot); }, m0, { timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(500);
  return p.evaluate(() => { const m = curMsgs(), b = m[m.length - 1] || {}; return { sent: window.__sent.slice(), reply: String(b.text || ''), steps: (b.steps || []).map(s => s.t), edits: (b.edits || []).length }; });
};
const chipSel = '#page-chat .msg-files .msg-file';
const chipIndex = (p, name) => p.evaluate(([sel, name]) => [...document.querySelectorAll(sel)].findIndex(x => x.textContent.indexOf(name) >= 0), [chipSel, name]);
const peekText = (p) => p.evaluate(() => { const e = document.getElementById('r216Peek'); return e && !e.hidden ? e.innerText : null; });
const side = (p) => p.evaluate(() => ({ kind: window.csCur && csCur.kind, name: window.csCur && csCur.name, md: (window.csCur && csCur.md || '').slice(0, 200000), on: document.body.classList.contains('cs-on') }));
const closeSide = (p) => p.evaluate(() => { try { if (typeof csClose === 'function') csClose(); } catch (e) {} });
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(900); await enter(p); await standIn(p);
  await p.evaluate(() => { state.motion = 'minimal'; go('chat'); const c = curChat(); c.messages = []; saveState(); try { renderChat(); } catch (e) {} });
  // 1. four documents, chosen in the chat's own picker, read and staged
  await p.setInputFiles('#chatAnyFile', [DOCX, PDF, TXT, MD]);
  await p.waitForFunction(() => window.stagedFiles && stagedFiles.length >= 4, null, { timeout: 90000 }).catch(() => {});
  const staged = await p.evaluate((F) => (window.stagedFiles || []).map(f => ({ name: f.name, chars: f.chars, has: F.some(x => stagedText(f).indexOf(x[1]) >= 0) })), FIRST);
  ok(staged.length === 4 && staged.every(x => x.has && x.chars > 20), 'four documents are read and wait with the next message, each with its words (the Word document\'s paragraphs and the PDF\'s text too)', staged);
  await p.evaluate(() => { window.stagedFiles.length = 0; try { paintChips(); } catch (e) {} });
  // 2. sent: all four fit, so all four go whole, under the reader's note
  const r1 = await sendWith(p, [DOCX, PDF, TXT, MD], 'What do these say?');
  const s1 = r1.sent[0] || '';
  ok(r1.sent.length >= 1 && FIRST.every(x => s1.indexOf(x[1]) >= 0) && /DOC-MARK-DOCX-END/.test(s1) && !/read them with the tools/.test(s1), 'files that fit are sent whole, the long Word document to its last paragraph', { n: r1.sent.length, has: FIRST.map(x => s1.indexOf(x[1]) >= 0), end: /DOC-MARK-DOCX-END/.test(s1), slim: /read them with the tools/.test(s1) });
  ok(/You are reading the person's documents with tools/.test(s1) && !/careful senior engineer/.test(s1) && /Documents: [^\n]*"Chapter three\.docx"/.test(s1) && /A Word document can be read here but not changed/.test(s1),
    'the model is told it reads documents (not that it works on code), with the Word document among the files its tools can read', { reader: /reading the person's documents/.test(s1), engineer: /senior engineer/.test(s1) });
  fs.writeFileSync(OUT + '/sent-1.txt', s1);
  // 3. a long transcript: with room enough it comes as the page's overview, and the model reads the rest through the tools
  const docsChatPre = await p.evaluate(() => curChat().id);
  const r2 = await sendWith(p, [LONG], 'And what does the transcript say at its start?', { name: 'read', arguments: { file: 'Long transcript.md', start_line: 1, end_line: 3 } });
  const s2 = r2.sent[0] || ''; fs.writeFileSync(OUT + '/sent-2.txt', s2);
  ok(/<file name="Long transcript\.md">\n\[A long file: its opening and passages from across it/.test(s2) && /DOC-MARK-DOCX-END/.test(s2) && !/too long to sit here/.test(s2),
    'with room enough, a long transcript comes as the page\'s overview of it (its opening, and passages from across it), and nothing is left out for the tools', { overview: /Long transcript\.md">\n\[A long file/.test(s2), docx: /DOC-MARK-DOCX-END/.test(s2), slim: /too long to sit here/.test(s2), size: s2.length });
  ok(r2.sent.length >= 2 && /DOC-MARK-LONG The clerk read the roll aloud/.test(r2.reply) && r2.steps.some(t => /^Read Long transcript\.md, lines 1/.test(t)), 'the model reads it through the tools, and its answer rests on the lines it read', { n: r2.sent.length, reply: r2.reply.slice(0, 160), steps: r2.steps });
  // 3b. a small memory (8K): the whole request would crowd it, so the largest file is left to the tools; the Word document's opening stays
  //     (at 4K the page has already made every file an overview under 1,500 characters, and those always stay)
  const small = await p.evaluate(() => { const c = { id: 'c-small-' + Date.now().toString(36), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; saveState(); try { renderChat(); } catch (e) {}
    const m = state.models.find(x => x.id === 'doc-test'); m.ctx = 8192; document.getElementById('ctlCtx').value = '8192'; return c.id; });
  const r2b = await sendWith(p, [DOCX, LONG, TXT], 'What does the transcript say at its start?', { name: 'read', arguments: { file: 'Long transcript.md', start_line: 1, end_line: 2 } });
  const s2b = r2b.sent[0] || ''; fs.writeFileSync(OUT + '/sent-small.txt', s2b);
  ok(/<file name="Long transcript\.md">\n\[[\d,]+ lines, [\d,]+ characters: too long to sit here with the rest, so read them with the tools \(search, read\)\]/.test(s2b) && /DOC-MARK-DOCX Chapter three/.test(s2b) && /DOC-MARK-TXT/.test(s2b),
    'with a small memory (8K) the largest file is left to the tools, and the others stay (the Word document\'s opening, the notes)', { slim: /too long to sit here/.test(s2b), docx: /DOC-MARK-DOCX Chapter three/.test(s2b), txt: /DOC-MARK-TXT/.test(s2b), size: s2b.length });
  ok(/DOC-MARK-LONG The clerk read the roll aloud/.test(r2b.reply), 'and the model reads it through the tools there too', { reply: r2b.reply.slice(0, 160), steps: r2b.steps });
  await p.evaluate((id) => { const m = state.models.find(x => x.id === 'doc-test'); m.ctx = 32768; document.getElementById('ctlCtx').value = '32768'; state.activeChat = id; saveState(); try { renderChat(); } catch (e) {} }, docsChatPre);
  // 4. a Word document is read with the tools, and never changed as text
  const r3 = await sendWith(p, [], 'What is the first line of chapter three?', { name: 'read', arguments: { file: 'Chapter three.docx', start_line: 1, end_line: 2 } });
  ok(/DOC-MARK-DOCX Chapter three/.test(r3.reply), 'the tools read a Word document', { reply: r3.reply.slice(0, 160), steps: r3.steps });
  const r4 = await sendWith(p, [], 'Change the title of chapter three.', { name: 'edit', arguments: { file: 'Chapter three.docx', old_text: 'Chapter three: the Exchequer at work.', new_text: 'Chapter three: the Exchequer.' } });
  ok(/a Word document is read here, not changed/.test(r4.reply) && /as a document to keep/.test(r4.reply) && r4.edits === 0 && r4.steps.some(t => /^Could not change Chapter three\.docx/.test(t)), 'a change to a Word document is refused plainly, with the way to give it (a new document), and no file is changed', { reply: r4.reply.slice(0, 260), steps: r4.steps, edits: r4.edits });
  // 5. code keeps the engineer's note
  const docsChat = await p.evaluate(() => curChat().id);
  await p.evaluate(() => { const c = { id: 'c-code-' + Date.now().toString(36), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; saveState(); try { renderChat(); } catch (e) {} });
  const r5 = await sendWith(p, [JS], 'Why does tally add one?');
  ok(/careful senior engineer/.test(r5.sent[0] || '') && !/reading the person's documents/.test(r5.sent[0] || ''), 'a conversation with code keeps the engineer\'s note', { engineer: /senior engineer/.test(r5.sent[0] || '') });
  await p.evaluate((id) => { state.activeChat = id; saveState(); try { renderChat(); } catch (e) {} }, docsChat);
  await p.waitForTimeout(600);
  // 6. each document is a key that opens, with its first lines on hover
  const chips = await p.evaluate((sel) => [...document.querySelectorAll(sel)].map(x => ({ tag: x.tagName, t: x.textContent.trim(), label: x.getAttribute('aria-label') })), chipSel);
  ok(chips.length === 5 && chips.every(x => x.tag === 'BUTTON' && /▸ Open/.test(x.t) && /^Open .+ beside the chat$/.test(x.label || '')), 'each of the five documents is a key that says it opens (as an HTML page is)', chips);
  const peeks = [];
  for (const [name, mark] of ALL) {
    const i = await chipIndex(p, name); if (i < 0) { peeks.push({ name, ok: false }); continue; }
    await p.locator(chipSel).nth(i).scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.hover(chipSel + ' >> nth=' + i); await p.waitForTimeout(800);
    const t = await peekText(p); const good = !!t && t.indexOf(name) >= 0 && t.indexOf(mark) >= 0 && /press to open it/.test(t) && /\d+ words?/.test(t); peeks.push(good ? { name, ok: true } : { name, ok: false, t: t && t.slice(0, 160) });
    await p.mouse.move(5, 5); await p.waitForTimeout(150);
  }
  ok(peeks.every(x => x.ok), 'hovering each shows its name, its size and words, and its first lines', peeks);
  const i0 = await chipIndex(p, 'Chapter three.docx'); if (i0 >= 0) { await p.hover(chipSel + ' >> nth=' + i0); await p.waitForTimeout(800); await p.screenshot({ path: OUT + '/doc-peek.png' }); await p.mouse.move(5, 5); }
  const opened = [];
  for (const [name, mark, rest] of ALL) {
    const i = await chipIndex(p, name); if (i < 0) { opened.push({ name, found: false }); continue; }
    await p.click(chipSel + ' >> nth=' + i); await p.waitForTimeout(900);
    const s = await side(p); opened.push({ name, kind: s.kind, same: s.name === name, on: s.on, words: s.md.indexOf(mark) >= 0 && rest.test(s.md) });
    if (name === 'Pipe rolls.pdf') await p.screenshot({ path: OUT + '/doc-open-pdf.png' });
    await closeSide(p); await p.waitForTimeout(300);
  }
  ok(opened.every(x => x.kind === 'doc' && x.same && x.on && x.words), 'pressing each opens it beside the chat with its words: the Word document\'s paragraphs, the PDF\'s text, the long file from the store of long texts', opened);
  // 7. the keyboard
  const kb = await p.evaluate((sel) => { const k = [...document.querySelectorAll(sel)].find(x => x.textContent.indexOf('Reading notes.txt') >= 0); if (!k) return false; k.focus(); return document.activeElement === k; }, chipSel);
  await p.waitForTimeout(700); const kt = await peekText(p); await p.keyboard.press('Enter'); await p.waitForTimeout(900); const ks = await side(p);
  ok(kb && kt && /DOC-MARK-TXT/.test(kt) && ks.name === 'Reading notes.txt' && ks.on, 'the keyboard reaches them: focus shows the first lines, Enter opens the file', { kb, kt: kt && kt.slice(0, 80), name: ks.name });
  await closeSide(p);
  // 8. after a reload
  const cid = await p.evaluate(() => (curChat() || {}).id);
  await p.reload(); await waitBoot(p); await p.waitForTimeout(1200); await enter(p);
  await p.evaluate((cid) => { go('chat'); state.activeChat = cid; try { renderChat(); } catch (e) {} }, cid); await p.waitForTimeout(700);
  const n1 = await p.evaluate((sel) => [...document.querySelectorAll(sel)].filter(x => x.tagName === 'BUTTON').length, chipSel);
  const il = await chipIndex(p, 'Long transcript.md'); if (il >= 0) { await p.click(chipSel + ' >> nth=' + il); await p.waitForTimeout(1200); }
  const sl = await side(p);
  ok(n1 === 5 && sl.name === 'Long transcript.md' && /DOC-MARK-LONG-END/.test(sl.md), 'after a reload the five are keys still, and the long one opens whole from the store', { n1, name: sl.name });
  await closeSide(p);
  // 9. a phone: a tap opens one
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }); const q = await ph.newPage(); const errsQ = []; q.on('pageerror', e => errsQ.push(e.message.slice(0, 300)));
  await q.goto(URL_); await waitBoot(q); await q.waitForTimeout(900); await enter(q); await standIn(q);
  await q.evaluate(() => { state.motion = 'minimal'; go('chat'); const c = curChat(); c.messages = []; saveState(); try { renderChat(); } catch (e) {} });
  await sendWith(q, [DOCX, TXT], 'And these?');
  const iq = await chipIndex(q, 'Chapter three.docx'); if (iq >= 0) { await q.tap(chipSel + ' >> nth=' + iq); await q.waitForTimeout(1000); }
  const sq = await side(q); await q.screenshot({ path: OUT + '/doc-phone.png' });
  ok(sq.name === 'Chapter three.docx' && sq.on && /DOC-MARK-DOCX/.test(sq.md), 'on a phone a tap opens the document', { iq, name: sq.name, on: sq.on });
  ok(errs.length === 0 && errsQ.length === 0, 'no script errors on the page', errs.concat(errsQ).join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
