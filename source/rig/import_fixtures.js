// Ingenium 6.2 · sample exports of other assistants, made as each one writes its own (for rig/t_62_import.js).
//   node rig/import_fixtures.js <out folder> [conversations in the large ChatGPT export, default 2000]
// Each is small and made here, from the shapes the assistants' exports use (October 2026): ChatGPT's conversations.json
// (a tree of messages with the branch being followed), Claude's conversations.json and projects.json, Google Takeout's
// My Activity for Gemini, Grok's prod-grok-backend.json, DeepSeek's conversations.json (a tree of fragments), a Le Chat
// JSON, a Microsoft Copilot CSV, a Markdown transcript and OpenAI-style JSON lines; and one large ChatGPT export.
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const OUT = process.argv[2], BIG = +(process.argv[3] || 2000); fs.mkdirSync(OUT, { recursive: true });

// a zip, written by hand: deflated entries, a central directory, and the end record
function crc32(b) { let c, crc = 0xFFFFFFFF; for (let n = 0; n < b.length; n++) { c = (crc ^ b[n]) & 0xFF; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1; crc = (crc >>> 8) ^ c; } return (crc ^ 0xFFFFFFFF) >>> 0; }
function zip(file, entries) {
  const parts = [], cd = []; let off = 0;
  for (const [name, data0] of entries) {
    const data = Buffer.isBuffer(data0) ? data0 : Buffer.from(data0, 'utf8'), comp = zlib.deflateRawSync(data, { level: 6 }), nb = Buffer.from(name, 'utf8'), crc = crc32(data);
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(8, 8); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nb.length, 26);
    parts.push(lh, nb, comp);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(nb.length, 28); ch.writeUInt32LE(off, 42);
    cd.push(ch, nb); off += 30 + nb.length + comp.length;
  }
  const cdb = Buffer.concat(cd), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(cdb.length, 12); end.writeUInt32LE(off, 16);
  fs.writeFileSync(path.join(OUT, file), Buffer.concat([...parts, cdb, end]));
}
const T0 = Date.parse('2025-03-03T10:00:00Z') / 1000;

// ---- ChatGPT: a tree; the first question was edited, so the branch followed is the second; code, a picture, reasoning, a file
function gptNode(id, parent, children, role, content, t, extra) { return { id, parent, children, message: role ? Object.assign({ id, author: { role }, create_time: t, content, metadata: {} }, extra || {}) : null }; }
const g1 = { title: 'Garden planner app', create_time: T0, update_time: T0 + 4000, conversation_id: 'gpt-conv-1', default_model_slug: 'gpt-5', current_node: 'n7', mapping: {
  root: gptNode('root', null, ['sys'], null),
  sys: gptNode('sys', 'root', ['n1a', 'n1b'], 'system', { content_type: 'text', parts: [''] }, T0, { metadata: { is_visually_hidden_from_conversation: true } }),
  n1a: gptNode('n1a', 'sys', ['n2a'], 'user', { content_type: 'text', parts: ['Make me a garden app (FIRST DRAFT, abandoned branch)'] }, T0 + 10),
  n2a: gptNode('n2a', 'n1a', [], 'assistant', { content_type: 'text', parts: ['An abandoned reply'] }, T0 + 20),
  n1b: gptNode('n1b', 'sys', ['n2'], 'user', { content_type: 'multimodal_text', parts: [{ content_type: 'image_asset_pointer', asset_pointer: 'file-service://file-img1' }, 'Make me a garden planner app like this sketch, in one HTML file.'] }, T0 + 30,
    { metadata: { attachments: [{ id: 'file-abc123', name: 'beds.md', mime_type: 'text/markdown', size: 60 }] } }),
  n2: gptNode('n2', 'n1b', ['n3'], 'assistant', { content_type: 'thoughts', thoughts: [{ summary: 'Planning', content: 'A grid of beds, each with a crop.' }] }, T0 + 40),
  n3: gptNode('n3', 'n2', ['n4'], 'assistant', { content_type: 'text', parts: ['Here is garden.html:\n\n```html\n<!doctype html><title>Garden</title><div id="beds"></div>\n```\nOpen it in a browser.'] }, T0 + 50, { metadata: { model_slug: 'gpt-5' } }),
  n4: gptNode('n4', 'n3', ['n5'], 'user', { content_type: 'text', parts: ['Add a watering schedule to garden.html, and keep the tomatoes bed.'] }, T0 + 3000),
  n5: gptNode('n5', 'n4', ['n6'], 'assistant', { content_type: 'code', language: 'python', text: 'print("schedule")' }, T0 + 3010),
  n6: gptNode('n6', 'n5', ['n7'], 'tool', { content_type: 'execution_output', text: 'schedule' }, T0 + 3020, { author: { role: 'tool', name: 'python' } }),
  n7: gptNode('n7', 'n6', [], 'assistant', { content_type: 'text', parts: ['Done: the watering schedule is in garden.html, every Tuesday at 7.'] }, T0 + 4000) } };
const g2 = { title: 'Novel chapter 3', create_time: T0 + 86400, update_time: T0 + 90000, conversation_id: 'gpt-conv-2', gizmo_id: 'g-p-6789abcdef', current_node: 'm2', mapping: {
  m0: gptNode('m0', null, ['m1'], null),
  m1: gptNode('m1', 'm0', ['m2'], 'user', { content_type: 'text', parts: ['Draft chapter 3: the lighthouse keeper finds the letter.'] }, T0 + 86400),
  m2: gptNode('m2', 'm1', [], 'assistant', { content_type: 'text', parts: ['Chapter 3. The letter had waited forty years in the lamp room.'] }, T0 + 90000) } };
zip('chatgpt_export.zip', [['conversations.json', JSON.stringify([g1, g2])], ['user.json', '{"id":"user-1","email":"x@example.com"}'], ['message_feedback.json', '[]'],
  ['file-abc123-beds.md', '# Beds\n- tomatoes\n- basil\n- beans'], ['chat.html', '<html><body><script>var jsonData = ' + JSON.stringify([g1, g2]) + ';\n</script></body></html>']]);

// ---- Claude: two conversations, one in a project; thinking, a tool, an attachment with its text
const c1 = { uuid: 'claude-c1', name: 'Refactor the invoice parser', summary: '', created_at: '2025-05-01T09:00:00Z', updated_at: '2025-05-01T10:30:00Z', project_uuid: 'proj-1', chat_messages: [
  { uuid: 'a', text: '', content: [{ type: 'text', text: 'Please refactor parse_invoice in invoices.py; the totals are wrong for VAT.' }], sender: 'human', created_at: '2025-05-01T09:00:00Z',
    attachments: [{ file_name: 'invoices.py', file_size: 120, file_type: 'text/x-python', extracted_content: 'def parse_invoice(t):\n    return sum(t)  # VAT missing' }], files: [] },
  { uuid: 'b', text: '', content: [{ type: 'thinking', thinking: 'VAT must be applied per line.' }, { type: 'text', text: 'The VAT is now applied per line in parse_invoice.' }], sender: 'assistant', created_at: '2025-05-01T09:01:00Z', attachments: [], files: [] },
  { uuid: 'c', text: 'Now add tests for the zero-rated items.', content: [], sender: 'human', created_at: '2025-05-01T10:29:00Z', attachments: [], files: [] },
  { uuid: 'd', text: '', content: [{ type: 'tool_use', name: 'repl' }, { type: 'tool_result', content: [{ type: 'text', text: '3 passed' }] }, { type: 'text', text: 'Added three tests; all pass.' }], sender: 'assistant', created_at: '2025-05-01T10:30:00Z', attachments: [], files: [] }] };
const c2 = { uuid: 'claude-c2', name: 'Trip to Lisbon', created_at: '2025-06-10T08:00:00Z', updated_at: '2025-06-10T08:05:00Z', chat_messages: [
  { uuid: 'e', text: 'Plan three days in Lisbon in October.', content: [{ type: 'text', text: 'Plan three days in Lisbon in October.' }], sender: 'human', created_at: '2025-06-10T08:00:00Z', attachments: [], files: [] },
  { uuid: 'f', text: 'Day one: Alfama and the castle.', content: [{ type: 'text', text: 'Day one: Alfama and the castle.' }], sender: 'assistant', created_at: '2025-06-10T08:05:00Z', attachments: [], files: [] }] };
const cp = [{ uuid: 'proj-1', name: 'Invoicing service', description: 'The small-business invoicing backend.', prompt_template: 'Always write Python 3.12 with type hints. Use pytest.', created_at: '2025-04-01T00:00:00Z',
  docs: [{ uuid: 'doc1', filename: 'STYLE.md', content: '# Style\nFour spaces. No wildcard imports.', created_at: '2025-04-01T00:00:00Z' }] }];
zip('claude_export.zip', [['conversations.json', JSON.stringify([c1, c2])], ['projects.json', JSON.stringify(cp)], ['users.json', '[{"uuid":"u1"}]']]);

// ---- Gemini (Google Takeout): five prompts; the first three within the hour, the last two the next day
const gem = [['2025-07-01T09:00:00Z', 'Prompted Explain recursion simply', '<p>Recursion is a function calling <b>itself</b>.</p>'],
  ['2025-07-01T09:10:00Z', 'Prompted Show it in Python', '<pre>def f(n):\n    return 1 if n &lt; 2 else n * f(n - 1)</pre>'],
  ['2025-07-01T09:20:00Z', 'Prompted And in JavaScript?', '<p>const f = n =&gt; n &lt; 2 ? 1 : n * f(n - 1);</p>'],
  ['2025-07-02T15:00:00Z', 'Prompted Write a haiku about rain', '<p>Soft rain on the roof</p>'],
  ['2025-07-02T15:05:00Z', 'Prompted Another one about snow', '<p>Snow keeps the garden</p>']]
  .reverse().map(([time, title, html]) => ({ header: 'Gemini Apps', title, time, products: ['Gemini Apps'], activityControls: ['Gemini Apps Activity'], safeHtmlItem: [{ html }] }));
gem.push({ header: 'Gemini Apps', title: 'Used an Extension', time: '2025-07-02T15:06:00Z', products: ['Gemini Apps'] });
zip('gemini_takeout.zip', [['Takeout/My Activity/Gemini Apps/MyActivity.json', JSON.stringify(gem)], ['Takeout/archive_browser.html', '<html></html>']]);

// ---- Grok
zip('grok_export.zip', [['ttl/30d/export_data/abc/prod-grok-backend.json', JSON.stringify({ conversations: [{ conversation: { id: 'grok-1', title: 'Rust lifetimes', create_time: '2025-08-01T12:00:00Z', modify_time: '2025-08-01T12:10:00Z' },
  responses: [{ response: { _id: 'r1', message: 'What does a lifetime annotation mean in Rust?', sender: 'human', create_time: { $date: { $numberLong: String(Date.parse('2025-08-01T12:00:00Z')) } } } },
    { response: { _id: 'r2', message: "It names how long a reference stays valid.", sender: 'ASSISTANT', create_time: '2025-08-01T12:10:00Z', model: 'grok-4' } }] }] })]]);

// ---- DeepSeek: a tree of fragments; the request was edited, the newest branch is followed
zip('deepseek_export.zip', [['conversations.json', JSON.stringify([{ id: 'ds-1', title: 'SQL window functions', inserted_at: '2025-09-01T10:00:00+08:00', updated_at: '2025-09-01T10:02:00+08:00', mapping: {
  root: { id: 'root', parent: null, children: ['1', '3'], message: null },
  1: { id: '1', parent: 'root', children: ['2'], message: { files: [], model: 'deepseek-chat', inserted_at: '2025-09-01T10:00:00+08:00', fragments: [{ type: 'REQUEST', content: 'OLD QUESTION (edited away)' }] } },
  2: { id: '2', parent: '1', children: [], message: { files: [], model: 'deepseek-chat', inserted_at: '2025-09-01T10:00:30+08:00', fragments: [{ type: 'RESPONSE', content: 'old answer' }] } },
  3: { id: '3', parent: 'root', children: ['4'], message: { files: [], model: 'deepseek-reasoner', inserted_at: '2025-09-01T10:01:00+08:00', fragments: [{ type: 'REQUEST', content: 'Explain ROW_NUMBER() OVER (PARTITION BY ...)' }] } },
  4: { id: '4', parent: '3', children: [], message: { files: [], model: 'deepseek-reasoner', inserted_at: '2025-09-01T10:02:00+08:00', fragments: [{ type: 'THINK', content: 'Numbering within groups.' }, { type: 'RESPONSE', content: 'It numbers the rows within each partition.' }] } } } }])]]);

// ---- Le Chat (JSON), Copilot (CSV), a Markdown transcript, JSON lines
fs.writeFileSync(path.join(OUT, 'lechat_export.json'), JSON.stringify([{ id: 'lc-1', title: 'French verbs', createdAt: '2025-10-01T08:00:00Z', messages: [{ role: 'user', content: 'Conjugate aller in the present.', createdAt: '2025-10-01T08:00:00Z' }, { role: 'assistant', content: 'je vais, tu vas, il va, nous allons, vous allez, ils vont', createdAt: '2025-10-01T08:00:05Z' }] }]));
fs.writeFileSync(path.join(OUT, 'copilot_activity.csv'), 'Conversation,Time,Author,Message\n"Budget sheet",2025-10-02T10:00:00Z,user,"Make a monthly budget table, with ""rent"" first"\n"Budget sheet",2025-10-02T10:00:09Z,Copilot,"| Item | Amount |\n| rent | 900 |"\n"Poem",2025-10-03T11:00:00Z,user,Write a short poem\n"Poem",2025-10-03T11:00:05Z,Copilot,The sea is wide\n');
fs.writeFileSync(path.join(OUT, 'perplexity_thread.md'), '# Best telescope for a beginner\n\n**User:** Which telescope should a beginner buy?\n\n**Assistant:** A 130 mm Dobsonian is a good start.\nIt is simple to use.\n\n**User:** And for photographs?\n\n**Assistant:** An equatorial mount helps.\n');
fs.writeFileSync(path.join(OUT, 'messages.jsonl'), ['{"role":"system","content":"You are terse."}', '{"role":"user","content":"Capital of Peru?"}', '{"role":"assistant","content":[{"type":"text","text":"Lima."}]}'].join('\n'));

// ---- a large ChatGPT export: many conversations of many messages, and one long one whose early part holds a word asked about later
const words = 'garden water tomato basil invoice report chapter planet violin harbour engine lantern meadow orbit pixel'.split(' ');
function para(i, n) { let s = ''; for (let k = 0; k < n; k++) s += words[(i * 7 + k * 3) % words.length] + (k % 12 === 11 ? '. ' : ' '); return s; }
const big = [];
for (let c = 0; c < BIG; c++) {
  const map = { r: { id: 'r', parent: null, children: ['u0'], message: null } }; let prev = 'r';
  const n = c === 0 ? 400 : 30;
  for (let m = 0; m < n; m++) { const id = (m % 2 ? 'a' : 'u') + m, role = m % 2 ? 'assistant' : 'user';
    let text = (role === 'user' ? 'Question ' + m + ': ' : 'Answer ' + m + ': ') + para(c + m, 120);
    if (c === 0 && m === 6) text = 'Remember this: the secret harbour code is ZEBRA-4471. ' + text;
    map[id] = { id, parent: prev, children: [], message: { id, author: { role }, create_time: T0 + c * 3600 + m * 60, content: { content_type: 'text', parts: [text] }, metadata: {} } };
    map[prev].children = [id]; prev = id; }
  big.push({ title: c === 0 ? 'The long project' : 'Conversation ' + c, create_time: T0 + c * 3600, update_time: T0 + c * 3600 + n * 60, conversation_id: 'big-' + c, current_node: prev, mapping: map });
}
zip('chatgpt_big.zip', [['conversations.json', JSON.stringify(big)]]);
for (const f of fs.readdirSync(OUT)) console.log(f.padEnd(26), fs.statSync(path.join(OUT, f)).size);
