// Connectors (Ingenium 6.14, modules/r220.js, and the working loop's part in modules/r190.js). Her words (3 November 2026): "I want
// connectors added"; (4 November) "I want full parity with Claude's Code chat ... and so much more".
// Every service is a stand-in, answered in the page by window.fetch: two MCP servers speaking Streamable HTTP (JSON-RPC over POST,
// answered as JSON or as server-sent events, with the session a server keeps), and Anthropic's Messages API for one conversation in
// which Claude asks to use a connector's tool. The people, notes and tokens are invented. Nothing goes online.
//   node rig/t_614_connectors.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };

const STAND = () => { if (window.top !== window) return;
  const M = window.__mcp = { calls: [], sess: 0, expireOnce: false, notes: ['The budget for the hall is 4,000.', 'Ask Ada about the budget in March.'], anth: [] };
  const sysText = (s) => Array.isArray(s) ? s.map(b => (b && b.text) || '').join('\n') : String(s || '');
  const of = window.fetch.bind(window);
  const json = (code, body, h) => Promise.resolve(new Response(body == null ? null : JSON.stringify(body), { status: code, headers: Object.assign({ 'Content-Type': 'application/json' }, h || {}) }));
  const sse = (obj, h) => Promise.resolve(new Response('event: message\ndata: ' + JSON.stringify(obj) + '\n\n', { status: 200, headers: Object.assign({ 'Content-Type': 'text/event-stream' }, h || {}) }));
  const TOOLS1 = [{ name: 'search_notes', title: 'Search notes', description: 'Search the notes for words.\nReturns the matching notes.', inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'the words to find' } }, required: ['query'] }, annotations: { readOnlyHint: true } }];
  const TOOLS2 = [{ name: 'add_note', description: 'Add a note.', inputSchema: { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' } }, required: ['title'] }, annotations: { readOnlyHint: false } }];
  function mcp(url, init, secure) {
    const h = init.headers || {}, body = JSON.parse(init.body || '{}'), sid = h['Mcp-Session-Id'] || '';
    M.calls.push({ url, method: body.method, sid, accept: h['Accept'] || '', proto: h['MCP-Protocol-Version'] || '', auth: h['Authorization'] || '', params: body.params || null });
    if (secure && h['Authorization'] !== 'Bearer tok-secret') return json(401, { error: 'invalid_token', error_description: 'A token is required' }, { 'WWW-Authenticate': 'Bearer' });
    if (!/text\/event-stream/.test(h['Accept'] || '') || !/application\/json/.test(h['Accept'] || '')) return json(406, { jsonrpc: '2.0', error: { code: -32000, message: 'Not Acceptable' } });
    if (body.method === 'initialize') { M.sess++; return json(200, { jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: secure ? 'Invented Vault' : 'Invented Notes', version: '1.2.0' } } }, { 'Mcp-Session-Id': 'sess-' + M.sess }); }
    if (sid !== 'sess-' + M.sess) return json(400, { jsonrpc: '2.0', error: { code: -32000, message: 'Bad Request: No valid session ID provided' } });
    if (M.expireOnce && body.method === 'tools/call') { M.expireOnce = false; M.sess++; return json(404, { jsonrpc: '2.0', error: { code: -32001, message: 'Session not found' } }); }
    if (body.method === 'notifications/initialized') return Promise.resolve(new Response(null, { status: 202 }));
    if (body.method === 'tools/list') return json(200, { jsonrpc: '2.0', id: body.id, result: body.params && body.params.cursor === 'p2' ? { tools: secure ? [] : TOOLS2 } : { tools: secure ? [{ name: 'open_vault', description: 'Reads the vault.', inputSchema: { type: 'object', properties: {} }, annotations: { readOnlyHint: true } }] : TOOLS1, nextCursor: secure ? undefined : 'p2' } });
    if (body.method === 'tools/call') { const a = body.params.arguments || {};
      if (body.params.name === 'search_notes') { const q = String(a.query || '').toLowerCase(); const hits = M.notes.filter(n => n.toLowerCase().indexOf(q) >= 0); return sse({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: hits.length ? 'Found ' + hits.length + ' notes:\n' + hits.join('\n') : 'No note matches.' }] } }); }
      if (body.params.name === 'add_note') { M.notes.push(String(a.title) + ': ' + String(a.body || '')); return json(200, { jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: 'Added the note “' + a.title + '”.' }] } }); }
      return json(200, { jsonrpc: '2.0', id: body.id, error: { code: -32602, message: 'Unknown tool' } }); }
    return json(200, { jsonrpc: '2.0', id: body.id, error: { code: -32601, message: 'Method not found' } });
  }
  function anthropic(init) { const body = JSON.parse(init.body || '{}'); const msgs = body.messages || []; M.anth.push({ tools: (body.tools || []).map(t => t.name), system: sysText(body.system).slice(0, 6000), n: msgs.length });
    const last = msgs[msgs.length - 1], hasResult = Array.isArray(last && last.content) && last.content.some(b => b.type === 'tool_result');
    const ev = []; const e = (t, d) => { d.type = t; ev.push('event: ' + t + '\ndata: ' + JSON.stringify(d) + '\n\n'); };
    e('message_start', { message: { id: 'm', model: body.model, role: 'assistant', content: [], usage: { input_tokens: 10, output_tokens: 0 } } });
    const tname = (body.tools || []).map(t => t.name).find(n => /search_notes$/.test(n));
    if (!hasResult && tname) { e('content_block_start', { index: 0, content_block: { type: 'text', text: '' } }); e('content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'I will look in your notes.' } }); e('content_block_stop', { index: 0 });
      e('content_block_start', { index: 1, content_block: { type: 'tool_use', id: 'toolu_1', name: tname, input: {} } }); e('content_block_delta', { index: 1, delta: { type: 'input_json_delta', partial_json: '{"query": "budget"}' } }); e('content_block_stop', { index: 1 });
      e('message_delta', { delta: { stop_reason: 'tool_use' }, usage: { output_tokens: 20 } }); }
    else { const res = hasResult ? JSON.stringify(last.content.filter(b => b.type === 'tool_result')[0].content) : ''; M.lastResult = res;
      e('content_block_start', { index: 0, content_block: { type: 'text', text: '' } }); e('content_block_delta', { index: 0, delta: { type: 'text_delta', text: hasResult ? 'Your notes mention the budget twice: 4,000 for the hall, and a question for Ada in March.' : 'Hello.' } }); e('content_block_stop', { index: 0 });
      e('message_delta', { delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 20 } }); }
    e('message_stop', {});
    return Promise.resolve(new Response(ev.join(''), { status: 200, headers: { 'Content-Type': 'text/event-stream' } })); }
  window.fetch = function (url, init) { url = String(url); init = init || {};
    if (url === 'https://mcp.invented.test/mcp') return mcp(url, init, false);
    if (url === 'https://secure.invented.test/mcp') return mcp(url, init, true);
    if (/^https:\/\/api\.anthropic\.com\/v1\/messages/.test(url)) return anthropic(init);
    if (/^https:\/\/api\.anthropic\.com\/v1\/models/.test(url)) return json(200, { data: [{ type: 'model', id: 'claude-opus-5-5', display_name: 'Claude Opus 5.5', max_input_tokens: 1000000, max_tokens: 128000 }], has_more: false });
    return of(url, init); };
};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 980 } }); await ctx.addInitScript(STAND); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });

  /* 1. Settings: the card, and adding a connector by its address */
  await p.evaluate(() => { state.connectors = []; saveState(); go('settings'); }); await p.waitForTimeout(500);
  let card = await p.evaluate(() => { const c = document.getElementById('cnCard'); return c ? c.innerText.replace(/\s+/g, ' ') : ''; });
  ok(/Connectors/.test(card) && /servers that speak MCP/.test(card) && /No connector yet/.test(card), 'Settings has a Connectors card, saying what a connector is', card);
  await p.evaluate(() => IngConnectors.sheet()); await p.waitForTimeout(200);
  await p.fill('#cnName', 'Invented Notes'); await p.fill('#cnUrl', 'http://mcp.invented.test/mcp'); await p.click('#cnGo'); await p.waitForTimeout(200);
  ok(/Use https:\/\//.test(await p.evaluate(() => document.getElementById('cnSay').textContent)), 'an address on the internet without https is refused, before anything is sent');
  await p.fill('#cnUrl', 'https://mcp.invented.test/mcp'); await p.click('#cnGo');
  await p.waitForFunction(() => /Connected/.test((document.getElementById('cnSay') || {}).textContent || ''), null, { timeout: 10000 }).catch(() => {});
  let say = await p.evaluate(() => ({ say: document.getElementById('cnSay').textContent, tools: [...document.querySelectorAll('#cnTools li')].map(x => x.innerText.replace(/\s+/g, ' ')) }));
  ok(/Connected to Invented Notes: 2 tools, 1 that only read/.test(say.say) && say.tools.length === 2 && /search_notes\s*only reads/.test(say.tools[0]) && /add_note\s*changes something: asks first/.test(say.tools[1]),
    'connected: the server named, both pages of its tools listed, each saying whether it only reads or asks first', say);
  let calls = await p.evaluate(() => window.__mcp.calls.map(c => c.method + '|' + (c.sid || '-') + '|' + (c.proto || '-')));
  ok(calls[0] === 'initialize|-|-' && calls[1] === 'notifications/initialized|sess-1|2025-06-18' && calls.filter(c => /^tools\/list\|sess-1\|2025-06-18$/.test(c)).length === 2, 'MCP as the specification says: initialize, initialized, then the session and the version on every request', calls);
  await p.evaluate(() => closeModal());
  card = await p.evaluate(() => { const c = document.getElementById('cnCard'); try { if (window.IngRooms && IngRooms.reveal) IngRooms.reveal(c); } catch (e) {} return c.innerText.replace(/\s+/g, ' '); });
  ok(/Invented Notes\s*mcp\.invented\.test · 2 tools \(1 only read\)/.test(card), 'the card lists it', card);

  /* 2. the tools, offered to the model in a plain conversation (no files), and only there where it is on */
  const T = await p.evaluate(async () => { const c = { id: 'cC' + Date.now(), title: 'Notes chat', messages: [] }; state.chats.push(c); IngConnectors.toolName && null; IngBlend && null;
    if (window.IngBlend && IngBlend.openConv) IngBlend.openConv(c); else { state.activeChat = c.id; go('chat'); }
    const ws = await IngAgent.wsFor({}); window.__ws = ws;
    return { only: !!(ws && ws.connectorsOnly), files: ws && ws.files.length, tools: IngAgent.toolsFor(false, { ws }).map(t => t.name), ro: IngAgent.toolsFor(true, { ws }).map(t => t.name) }; });
  ok(T.only && T.files === 0 && T.tools.join(',') === 'mcp_invented_notes_search_notes,mcp_invented_notes_add_note' && T.ro.join(',') === 'mcp_invented_notes_search_notes', 'a conversation with no files gets the connector\'s tools, and only those', T);

  /* 3. a tool that only reads runs at once; its answer came as a stream */
  const r1 = await p.evaluate(async () => { const r = await IngAgent.exec(window.__ws, 'mcp_invented_notes_search_notes', { query: 'budget' }, {}); return { text: r.text, step: r.step }; });
  ok(/Found 2 notes/.test(r1.text) && /Ask Ada/.test(r1.text) && /Used Search notes \(Invented Notes\)/.test(r1.step.t) && !(await p.evaluate(() => !!document.querySelector('.ing-ask'))), 'a tool that only reads runs at once (its answer sent as server-sent events), and is a step under the reply', r1);

  /* 4. a tool that changes something waits for her: Not now, Allow once, Always allow it */
  const ask = (choice) => p.evaluate(async (choice) => { const pr = IngAgent.exec(window.__ws, 'mcp_invented_notes_add_note', { title: 'Hall', body: 'Book it for May' }, {});
    await new Promise(r => setTimeout(r, 250)); const box = document.querySelector('.ing-ask'); const q = box ? box.innerText.replace(/\s+/g, ' ') : '';
    if (box) [...box.querySelectorAll('.btn')].find(x => x.textContent === choice).click(); const r = await pr; return { q, text: r.text, step: r.step && r.step.t }; }, choice);
  let a1 = await ask('Not now');
  ok(/Let the model use “add_note” \(Invented Notes\)\?/.test(a1.q) && /It can change something/.test(a1.q) && /"title":"Hall"/.test(a1.q) && /did not allow/.test(a1.text) && await p.evaluate(() => window.__mcp.notes.length === 2), 'a tool that changes something asks first, with what it would send; Not now sends nothing', a1);
  a1 = await ask('Allow once');
  ok(/Added the note “Hall”/.test(a1.text) && await p.evaluate(() => window.__mcp.notes.length === 3), 'Allow once: it runs', a1);
  a1 = await ask('Allow once');
  ok(/Let the model use/.test(a1.q), 'and asks again the next time', a1.q);
  a1 = await ask('Always allow it');
  await p.waitForTimeout(400);
  const a2 = await p.evaluate(async () => { const r = await IngAgent.exec(window.__ws, 'mcp_invented_notes_add_note', { title: 'Again' }, {}); return { asked: [...document.querySelectorAll('.ing-ask')].some(x => /Again/.test(x.innerText)), text: r.text }; });
  ok(/Added/.test(a1.text) && !a2.asked && /Added the note “Again”/.test(a2.text), 'Always allow it: from then on it runs without asking', { a1, a2 });

  /* 5. a server that forgot the session: a new one, once, and the call goes through */
  await p.evaluate(() => { window.__mcp.expireOnce = true; window.__mcp.calls = []; });
  const r2 = await p.evaluate(async () => (await IngAgent.exec(window.__ws, 'mcp_invented_notes_search_notes', { query: 'hall' }, {})).text);
  calls = await p.evaluate(() => window.__mcp.calls.map(c => c.method + '|' + (c.sid || '-')));
  ok(/Found/.test(r2) && calls.length === 4 && calls[0] === 'tools/call|sess-1' && calls[1] === 'initialize|-' && /^notifications\/initialized\|sess-[2-9]$/.test(calls[2]) && calls[3] === 'tools/call|' + calls[2].split('|')[1], 'a forgotten session (404) is started again once, with the new session, and the call goes through', calls);

  /* 6. the whole path in a chat: Claude asks for the tool, Ingenium runs it, Claude answers from it */
  await p.evaluate(() => { state.cloud = { provider: 'anthropic', base: 'https://api.anthropic.com', key: 'sk-ant-invented', model: 'claude-opus-5-5', on: true, models: ['claude-opus-5-5'] }; state.chatSource = 'cloud'; saveState(); try { paintChatTop(); } catch (e) {} });
  await p.fill('#chatInput', 'What do my notes say about the budget?'); await p.evaluate(() => sendChat());
  await p.waitForFunction(() => { const ms = curMsgs(), l = ms[ms.length - 1]; return l && l.role === 'bot' && !l.live && l.text; }, null, { timeout: 30000 }).catch(() => {});
  const ch = await p.evaluate(() => { const ms = curMsgs(), l = ms[ms.length - 1]; return { text: l.text, steps: (l.steps || []).map(s => s.t), anth: window.__mcp.anth.map(x => ({ tools: x.tools, n: x.n, sys: /connectors/.test(x.system) })), res: window.__mcp.lastResult || '' }; });
  ok(/mention the budget twice/.test(ch.text) && ch.steps.some(s => /Used Search notes \(Invented Notes\)/.test(s)) && ch.anth.length === 2 && ch.anth[0].tools.join(',') === 'mcp_invented_notes_search_notes,mcp_invented_notes_add_note' && /Found 2 notes/.test(ch.res) && ch.anth[0].sys,
    'in a chat: Claude is offered the connector\'s tools (and no file tools), asks for one, gets its answer, and replies from it; the step shows under the reply', ch);
  await p.screenshot({ path: OUT + '/cn_chat.png' });

  /* 7. off in this conversation, from the + menu: the tools are not offered, and the conversation is plain again */
  await p.evaluate(() => { try { openPlus ? null : null; } catch (e) {} paintPlus(); }); await p.waitForTimeout(100);
  const pm = await p.evaluate(() => { const m = document.getElementById('chatPlusMenu'); const it = m && m.querySelector('.pm-item[data-k="connectors"]'); return it ? it.innerText.replace(/\s+/g, ' ') : ''; });
  ok(/Connectors\s*1 on in this conversation/.test(pm), 'the + menu has Connectors, saying how many are on here', pm);
  await p.evaluate(() => paintPlus('connectors')); await p.waitForTimeout(100);
  const sub = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].map(x => x.innerText.replace(/\s+/g, ' ')));
  ok(sub.some(x => /Invented Notes\s*2 tools · on here/.test(x)) && sub.some(x => /Add a connector/.test(x)), 'its own list: each connector with a switch for this conversation, and Add a connector', sub);
  await p.evaluate(() => { [...document.querySelectorAll('#chatPlusMenu .pm-item')].find(x => /Invented Notes/.test(x.innerText)).click(); });
  const off = await p.evaluate(async () => { const ws = await IngAgent.wsFor({}); return { ws: ws, other: (state.chats.find(c => c.id !== curChat().id && !ccIsCode(c)) || {}).id || '', on: IngConnectors.activeFor(curChat()) }; });
  ok(off.ws === null && off.on === false, 'switched off here: this conversation is a plain one again (no tools, no loop)', off);
  const fresh = await p.evaluate(() => IngConnectors.activeFor({ id: 'new', messages: [] }));
  ok(fresh === true, 'other conversations keep it on (its switch in Settings says on in conversations)', fresh);

  /* 8. a server that needs a token: refused without one, connected with it */
  const sec = await p.evaluate(async () => { let e1 = ''; try { await IngConnectors.add({ name: 'Vault', url: 'https://secure.invented.test/mcp' }); } catch (e) { e1 = e.message; }
    const c = await IngConnectors.add({ name: 'Vault', url: 'https://secure.invented.test/mcp', token: 'tok-secret' }); return { e1, ok: c.ok, tools: c.tools.map(t => t.name), auth: window.__mcp.calls.filter(x => /secure/.test(x.url)).map(x => x.auth ? 'tok' : '-').join('') }; });
  ok(/needs a sign-in/.test(sec.e1) && sec.ok && sec.tools.join(',') === 'open_vault' && /^-+(tok)+$/.test(sec.auth), 'a server that needs a token says so; with the token it connects, and the token goes only to it', sec);
  const leak = await p.evaluate(() => window.__mcp.calls.filter(x => /mcp\.invented/.test(x.url) && /tok-secret/.test(x.auth)).length);
  ok(leak === 0, 'the token is never sent to another connector', leak);

  /* 9. the Code session's column shows them, with a switch for the session */
  await p.evaluate(() => { go('code'); try { closeModal(); } catch (e) {} IngR215.PANEL.session = true; IngR215.paintPanel(); }); await p.waitForTimeout(600);
  const col = await p.evaluate(() => { const s = document.querySelector('#ccPanel section[data-sec="connectors"]'); return s ? { t: s.innerText.replace(/\s+/g, ' '), sw: s.querySelectorAll('.cn-sw').length } : null; });
  ok(col && /Connectors/.test(col.t) && /Invented Notes · 2 tools/.test(col.t) && /Vault · 1 tools/.test(col.t) && col.sw === 2, 'the Code session\'s column lists the connectors, each with a switch for the session', col);
  await p.screenshot({ path: OUT + '/cn_code.png' });

  /* 10. removing one: its tools go, and nothing changes on the server */
  const before = await p.evaluate(() => window.__mcp.calls.length);
  const rm = await p.evaluate(() => { const v = IngConnectors.list().find(c => c.name === 'Vault'); IngConnectors.remove(v.id); return { n: IngConnectors.list().length, tools: IngAgent.toolsFor(false, { ws: { connectorsOnly: true, files: [] } }).map(t => t.name).filter(n => /vault/.test(n)) }; });
  ok(rm.n === 1 && !rm.tools.length && await p.evaluate((n) => window.__mcp.calls.length === n, before), 'removed: its tools are no longer offered, and nothing is sent to the server', rm);

  /* 11. a phone: the card fits */
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => go('settings')); await p.waitForTimeout(400);
  const ph = await p.evaluate(() => { const W = document.documentElement.clientWidth, c = document.getElementById('cnCard'); if (!c) return { none: 1 }; try { if (window.IngRooms && IngRooms.reveal) IngRooms.reveal(c); } catch (e) {} const bad = [...c.querySelectorAll('*')].filter(x => { const r = x.getBoundingClientRect(); return r.width && r.right > W + 1; }).map(x => x.className || x.tagName); return { W, bad }; });
  ok(!ph.none && !ph.bad.length, 'on a phone, the Connectors card fits the screen', ph);

  await p.setViewportSize({ width: 1500, height: 980 }); await p.evaluate(() => go('guide')); await p.waitForTimeout(400);
  const gd = await p.evaluate(() => { const g = document.getElementById('cnGuide'); return g ? [...g.querySelectorAll('dt')].map(x => x.textContent) : null; });
  ok(gd && gd.join('|') === 'What one is|Adding one|Where it works|Your yes|What it cannot do yet', 'the Guide explains connectors, and what they cannot do yet', gd);
  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
