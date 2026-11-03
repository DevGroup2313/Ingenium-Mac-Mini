// Sources only when they belong to the reply (Ingenium 6.9.4, modules/r207.js and the R207 edits). Her words (3 November 2026): "The
// scholarly sources all nonsense and keep on showing up with every reply, I want that removed, I only want real and accurate sources
// and only when they pertain to the reply do I want them cited and provided."
// No index or search engine is reached: the indexes and the web search answer from records written here.
//   node rig/t_694_sources.js http://127.0.0.1:8150/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const origin = new URL(URL_).origin, BASE = origin + '/mockanthropic';
let reply = 'Per the second source [2], yes.', failMode = false;
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/mockanthropic/**', (route) => { const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
    if (failMode) return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ type: 'error', error: { type: 'api_error', message: 'Internal server error' } }) });
    route.fulfill({ status: 200, contentType: 'text/event-stream', body: ev({ type: 'message_start', message: { model: 'x', usage: { input_tokens: 1 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: reply } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' }) }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  // 1. the switch: off until it is switched on; on stays on
  const sw = await p.evaluate(() => { const keep = state.search; state.search = {}; const a = schOn(); state.search = { scholar: false }; const b2 = schOn(); state.search = { scholar: true }; const c = schOn(); state.search = keep || {}; delete state.search.scholar; return { fresh: a, off: b2, on: c }; });
  ok(sw.fresh === false && sw.off === false && sw.on === true, '1. Scholarly sources first is off until it is switched on, and stays on once switched on', sw);
  // 2. relevance: a record is kept only when half of the question's words are in it, and one at least in its title
  const rel = await p.evaluate(async () => {
    const A = { kind: 'scholarly', index: 'OpenAlex', title: 'Cultural capital and educational inequality in France', abstract: 'Bourdieu on cultural capital and inequality in schools.', authors: ['P. Author'], year: 2020, venueType: 'journal', type: 'article', doi: '10.1000/a' };
    const B = { kind: 'scholarly', index: 'OpenAlex', title: 'Deep learning for image segmentation', abstract: 'An educational dataset of cultural heritage images with capital letters.', authors: ['Q. Author'], year: 2021, venueType: 'journal', type: 'article', doi: '10.1000/b' };
    const C = { kind: 'scholarly', index: 'Crossref', title: 'Capital markets in 2020', abstract: 'Finance.', authors: ['R. Author'], year: 2020, venueType: 'journal', type: 'article', doi: '10.1000/c' };
    const keep = { oa: window.schOpenAlex, cr: window.schCrossref, ep: window.schEuropePMC, ax: window.schArxiv };
    window.schOpenAlex = () => Promise.resolve([Object.assign({}, A), Object.assign({}, B)]); window.schCrossref = () => Promise.resolve([Object.assign({}, C)]);
    window.schEuropePMC = () => Promise.resolve([]); window.schArxiv = () => Promise.resolve([]);
    let out; try { out = await scholarSearch('Bourdieu cultural capital educational inequality', 5); } finally { window.schOpenAlex = keep.oa; window.schCrossref = keep.cr; window.schEuropePMC = keep.ep; window.schArxiv = keep.ax; }
    return out.map((x) => x.title);
  });
  ok(rel.length === 1 && /Cultural capital/.test(rel[0]), '2. only the record about the question is kept (a paper on images whose abstract happens to hold the words, and one on capital markets, are left out)', rel);
  // 3. the list under a reply: only the sources it cites, under the numbers it gives them
  const mk = (n, vet) => Array.from({ length: n }, (_, i) => { const x = { kind: vet ? 'scholarly' : 'web', title: 'Source number ' + (i + 1), url: 'https://example.org/' + (i + 1), authors: ['A. Writer'], year: 2020, venueType: 'journal', type: 'article', doi: vet ? '10.1000/s' + (i + 1) : '', index: 'OpenAlex' }; if (vet) schVet(x); else x.snippet = 's'; return x; });
  const shown = async (text, n, vet, live) => p.evaluate(({ text, n, vet, live, mkS }) => {
    const mk = new Function('n', 'vet', 'return (' + mkS + ')(n, vet);');
    go('chat'); try { $('chatNew').click(); } catch (e) {}
    const ms = curMsgs(); ms.push({ role: 'me', text: 'a question', at: Date.now() }); const bot = { role: 'bot', text: text, at: Date.now(), sources: mk(n, vet) }; if (live) bot.live = true; ms.push(bot); renderChat();
    const d = chatNodeOf.get(bot); if (!d) return { none: true };
    const box = d.querySelector('.msg-sources'); if (!box) return { box: false };
    const lis = [...box.querySelectorAll('ol > li')];
    return { box: !box.hidden && box.offsetParent !== null, visible: lis.filter((li) => !li.hidden && li.offsetParent !== null).map((li) => li.value), total: lis.length,
      keep: ([...box.querySelectorAll('button')].find((x) => /^Keep/.test(x.textContent.trim())) || {}).textContent || '' };
  }, { text, n, vet, live, mkS: mk.toString() });
  let s3 = await shown('Two points. First [2]. Then [4, 5]. In code, `arr[1]` and\n```js\nconst x = list[3];\n```\nare not citations.', 5, true);
  ok(s3.box && JSON.stringify(s3.visible) === '[2,4,5]' && s3.total === 5, '3. the References list shows only the sources the reply cites (2, 4 and 5), each under its own number; numbers inside code are not citations', s3);
  ok(/^Keep these in my sources$/.test(s3.keep), '3. the key under it keeps those cited ("Keep these in my sources")', s3.keep);
  const copied = await p.evaluate(() => { let got = ''; const keep = window.csCopyText; window.csCopyText = (t) => { got = t; }; try { const ms = curMsgs(); const bot = ms[ms.length - 1]; const d = chatNodeOf.get(bot); [...d.querySelectorAll('.msg-sources button')].find((x) => /Copy the references/.test(x.textContent)).click(); } finally { window.csCopyText = keep; } return got; });
  ok(/^\[2\] /.test(copied) && /\n\[4\] /.test(copied) && /\n\[5\] /.test(copied) && !/\[1\]|\[3\]/.test(copied), '3. Copy the references copies only those cited', copied);
  let s4 = await shown('An answer that cites nothing.', 4, true);
  ok(s4.box === false, '4. a reply that cites no source shows no list', s4);
  let s5 = await shown('As shown [1–3].', 6, true);
  ok(s5.box && JSON.stringify(s5.visible) === '[1,2,3]', '5. a range of sources ([1–3]) shows each of them', s5);
  let s6 = await shown('From the web [3].', 4, false);
  ok(s6.box && JSON.stringify(s6.visible) === '[3]', '6. web search sources too: only the one cited', s6);
  let s7 = await shown('Still writing [1]', 3, true, true);
  ok(s7.box === false, '7. while a reply is still being written, no list is shown', s7);
  // 8. end to end: Web search on, Scholarly sources first left as it is (off): no scholarly search; the reply lists what it cites
  const e2e = await p.evaluate(async (BASE) => {
    go('chat'); try { $('chatNew').click(); } catch (e) {}
    state.cloud = { on: true, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 1000000, out: 128000 } } };
    state.chatSource = 'cloud'; state.webSearch = true; state.research = false; state.thinking = false; state.search = state.search || {}; delete state.search.scholar;
    window.__schCalls = 0; const keepS = window.scholarSearch, keepW = window.webSearch;
    window.scholarSearch = function () { window.__schCalls++; return Promise.resolve([]); };
    window.webSearch = function () { return Promise.resolve([{ title: 'First page', url: 'https://example.org/1', snippet: 'one' }, { title: 'Second page', url: 'https://example.org/2', snippet: 'two' }, { title: 'Third page', url: 'https://example.org/3', snippet: 'three' }]); };
    try { saveState(); } catch (e) {}
    $('chatInput').value = 'Is the second page right?'; sendChat();
    const t0 = Date.now(); let bot = null;
    while (Date.now() - t0 < 30000) { const ms = curMsgs(); const l = ms[ms.length - 1]; if (l && l.role === 'bot' && !l.live && l.text) { bot = l; break; } await new Promise((r) => setTimeout(r, 100)); }
    window.scholarSearch = keepS; window.webSearch = keepW;
    if (!bot) return { timeout: true };
    const d = chatNodeOf.get(bot), box = d && d.querySelector('.msg-sources');
    return { schCalls: window.__schCalls, text: bot.text, n: (bot.sources || []).length, visible: box ? [...box.querySelectorAll('ol > li')].filter((li) => !li.hidden && li.offsetParent !== null).map((li) => li.textContent.trim().slice(0, 40)) : null };
  }, BASE);
  ok(e2e.schCalls === 0 && e2e.n === 3 && e2e.visible && e2e.visible.length === 1 && /Second page/.test(e2e.visible[0]), '8. with Web search on, no scholarly search is made unless switched on, and the reply lists only the page it cites', e2e);
  await p.screenshot({ path: OUT + '/sources_reply.png' }).catch(() => {});
  // 9. Ingenium's own notice is never a document card (her screenshot of 3 November 2026), a real document still is
  const nd = await p.evaluate(() => { go('chat'); try { $('chatNew').click(); } catch (e) {}
    const ms = curMsgs(), note = '(This reply was cut off before it began: Ingenium was closed or reloaded while it was being written. Try again writes it anew.)';
    ms.push({ role: 'me', text: 'Please write me a Word document about my plans.', at: Date.now(), want: { kind: 'doc', fmt: 'docx' } });
    const bot = { role: 'bot', text: note, at: Date.now(), r1: 1, doc: { title: note.slice(0, 60), md: note } }; ms.push(bot);
    ms.push({ role: 'me', text: 'And another Word document please.', at: Date.now() });
    const real = { role: 'bot', text: '<document title="Plans">\n# Plans\n\nA plan with enough words in it to be a real document for the person who asked for one today.\n</document>', at: Date.now(), r1: 1 }; ms.push(real);
    renderChat(); const d = chatNodeOf.get(bot), d2 = chatNodeOf.get(real);
    return { notice: !!(d && d.querySelector('[class*="mk-card"]')), real: !!(d2 && d2.querySelector('[class*="mk-card"]')),
      fn: [r1Notice(note), r1Notice('(The connection failed: HTTP 429.)'), r1Notice('A normal reply (with brackets) in it.'), r1Notice('(First paragraph.)\n\n(Second paragraph.)')] }; });
  ok(!nd.notice && nd.real && JSON.stringify(nd.fn) === '[true,true,false,false]', '9. a notice kept with a document from before is shown as a notice, not a document card; a real document still has its card', nd);
  // 10. a fresh reply to a document request that fails is not made a document
  failMode = true;
  const fr = await p.evaluate(async () => { go('chat'); try { $('chatNew').click(); } catch (e) {} window.ingLimitWaitScale = 0.01; state.webSearch = false;
    $('chatInput').value = 'Write me a Word document about bees.'; sendChat();
    const t0 = Date.now(); let bot = null;
    while (Date.now() - t0 < 30000) { const ms = curMsgs(); const l = ms[ms.length - 1]; if (l && l.role === 'bot' && !l.live && l.text) { bot = l; break; } await new Promise((r) => setTimeout(r, 100)); }
    await new Promise((r) => setTimeout(r, 1500));
    if (!bot) return { timeout: true }; const d = chatNodeOf.get(bot);
    return { text: bot.text.slice(0, 160), doc: !!bot.doc, card: !!(d && d.querySelector('[class*="mk-card"]')) }; });
  failMode = false;
  ok(fr.text && /^\(The connection failed/.test(fr.text) && !fr.doc && !fr.card, '10. a reply to a document request that failed says so, and is not made a document', fr);
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
