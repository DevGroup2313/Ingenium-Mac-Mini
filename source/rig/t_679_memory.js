// Memory from her chats (Ingenium 6.79, modules/r271.js, on top of R92's store). Her words (11 November 2026): "I want Ingenium to build
// memory from its chats and not have to start from zero with every new chat"; "I approve of the preview, please push it everywhere".
// Invented memories, an invented person and an invented model (Velox); the engine is a stand-in that answers at once; nothing is downloaded.
// Checks:
//   - a new chat: the tray says what Ingenium remembers; a message: only the memories that fit go to the model, with how she likes answers;
//     the tray shows them, the answer says Used N memories; Not for this chat leaves one out of the next message;
//   - a connected service gets none unless she turns that on;
//   - Remember under an answer keeps it at once (Kept in Memory), as under her own messages;
//   - the Memory room (Settings, Your data, Memory): counts, Keep, Not this, Edit turning the card over, Forget and Undo, Forget everything asked
//     on the page; the chat's + menu opens it;
//   - Learn from my chats: the model on this device notes what is worth keeping; it waits for her; it gives way when she types, and a message
//     she sends meanwhile goes as soon as the engine is free;
//   - by night, on a phone, left alone (nothing rewritten), and no page error.
//   node rig/t_679_memory.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_679_memory.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; });
  // 6.80: ING_OLD_WEBVIEW=1 runs every check on a page without Element.replaceChildren, as the Android 11 web view (Chrome 83)
  if (process.env.ING_OLD_WEBVIEW) await p.addInitScript(() => { [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(o => { try { delete o.replaceChildren; } catch (e) {} }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme();
    const day = (d) => new Date(2026, 10, d, 10).getTime();
    state.memory = { on: true, learn: true, ask: true, cloud: false, items: [
      { id: 'm1', text: 'You are building Lantern, a reading app for iPad, in SwiftUI.', at: day(9), how: 'key', g: 'project', chat: "Lantern's first screen" },
      { id: 'm2', text: 'Lantern keeps its library offline, with no account.', at: day(10), how: 'key', g: 'project', chat: "Lantern's data" },
      { id: 'm3', text: 'You like short answers in British spelling, with one example.', at: day(4), how: 'asked' },
      { id: 'm4', text: 'You prefer plain words to technical terms.', at: day(4), how: 'asked' },
      { id: 'm5', text: 'Your essay on soil carbon is due on Friday 13 November.', at: day(10), how: 'key', chat: 'Soil essay plan' },
      { id: 'm6', text: "You chose Cormorant for Lantern's headings.", at: day(8), how: 'typed' }],
      waiting: [{ id: 'm7', text: 'You read most in the evening, so Lantern should have a night theme.', at: day(11), how: 'noted', g: 'project', chat: "Lantern's settings" },
        { id: 'm8', text: 'Your tutor for the soil essay is Dr Okafor.', at: day(10), how: 'noted', g: 'date', chat: 'Soil essay plan' }], skip: {}, noted: {}, no: [] };
    state.models = [{ id: 'mv', customName: 'Velox', fileName: 'velox.gguf', color: '#7458c6', sizeBytes: 0.7e9, paramB: 1.2, type: 'GGUF', fileState: 'ready', ctx: 8192 }];
    state.activeModelId = 'mv'; try { saveState(); } catch (e) {}
    window.__gen = []; window.__reply = 'Your essay on soil carbon is due on Friday 13 November. Plan the draft for the day before.';
    Engine.adapter = { abort() { window.__aborted = (window.__aborted || 0) + 1; if (window.__rej) { const r = window.__rej; window.__rej = null; r(new Error('stopped')); } } };
    Engine.modelId = 'mv'; Engine.setStatus('ready');
    Engine.generate = function (job) { window.__gen.push(job.messages.map(m => m.role + ': ' + m.content).join('\n---\n')); (window.__sys = window.__sys || []).push(job.messages.filter(m => m.role === 'system').map(m => m.content).join('\n')); const reply = window.__reply;
      return new Promise((res, rej) => { window.__rej = rej; setTimeout(() => { if (window.__rej !== rej) return; window.__rej = null; job.onToken(reply); res({ text: reply }); }, window.__slow || 60); }); };
    go('chat'); document.getElementById('chatNew').click(); renderChat(); });
  await p.waitForTimeout(900);
  // 1. a new chat: the tray says what Ingenium remembers
  const t0 = await p.evaluate(() => IngChatMemory.tray());
  ok(t0 && t0.shown && /Ingenium remembers 6 things/.test(t0.name), 'a new chat: the tray above it says what Ingenium remembers', t0);
  await p.screenshot({ path: OUT + '/1_new_chat.png' });
  // 2. a message: only the memories that fit go to the model, with how she likes answers
  const send = async (t) => { await p.evaluate(t => { const i = document.getElementById('chatInput'); i.value = t; sendChat(); }, t); await p.waitForTimeout(900); };
  await send('When is my essay due?');
  const s1 = await p.evaluate(() => { const g = window.__gen[window.__gen.length - 1] || ''; const msgs = curMsgs(), bot = msgs[msgs.length - 1];
    return { essay: /soil carbon is due on Friday 13 November/.test(g), way: /short answers in British spelling/.test(g), plain: /plain words/.test(g), lantern: /keeps its library offline/.test(g), mem: bot.mem, text: bot.text.slice(0, 60), tray: IngChatMemory.tray(),
      used: [...document.querySelectorAll('#chatScroll .msg.bot .mt-used')].map(x => x.textContent.trim()) }; });
  ok(s1.essay && s1.way && s1.plain && !s1.lantern, 'a message: the memory that fits it goes to the model, with how she likes answers, and nothing else', s1);
  ok(s1.tray.open && s1.tray.ids.indexOf('m5') >= 0 && /remembered 3 things for this chat/.test(s1.tray.name), 'the tray shows the memories that went with it', s1.tray);
  ok(s1.used.join() === 'Used 3 memories', 'the answer says Used 3 memories', s1.used);
  await p.screenshot({ path: OUT + '/2_answer.png' });
  // Used N memories lights them in the tray
  await p.click('#chatScroll .msg.bot .mt-used'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.querySelectorAll('#memTrayList .mt-tok.mt-lit').length === 3), 'pressing Used 3 memories lights them in the tray');
  // 3. Not for this chat: left out of the next message
  await p.click('#memTrayList .mt-tok[data-mid="m5"] .mr-key'); await p.waitForTimeout(900);
  const s2 = await p.evaluate(() => ({ tray: IngChatMemory.tray(), skip: state.memory.skip[state.activeChat] }));
  await send('Is the essay due this week?');
  const s3 = await p.evaluate(() => ({ essay: /soil carbon is due/.test(window.__sys[window.__sys.length - 1] || ''), lay: (window.__sys[window.__sys.length - 1] || '').split('What you know about the person')[1], text: curMsgs()[curMsgs().length - 1].text.slice(0, 50) }));
  ok(s2.tray.ids.indexOf('m5') < 0 && (s2.skip || []).indexOf('m5') >= 0 && !s3.essay, 'Not for this chat: the memory leaves the tray and does not go with the next message', { s2, s3 });
  // 4. a connected service: none, unless she turns that on
  const cl = await p.evaluate(() => { const keep = window.chatSource, kc = state.cloud; window.chatSource = () => 'cloud'; state.cloud = { on: true, provider: 'demo' };
    curMsgs().push({ role: 'me', text: 'What font did I choose for Lantern?' }); const bot = { role: 'bot', text: '', live: true }; curMsgs().push(bot);
    const off = memLayer(8000), offMark = bot.memOff; delete bot.mem; delete bot.memOff; state.memory.cloud = true; const on = memLayer(8000);
    state.memory.cloud = false; curMsgs().splice(-2, 2); window.chatSource = keep; state.cloud = kc; renderChat(); return { off, offMark, on: on.slice(0, 400) }; });
  ok(cl.off === '' && cl.offMark === 1 && /Cormorant/.test(cl.on), 'a connected service gets no memory unless she turns that on; then the ones that fit go', cl);
  // 5. Remember under an answer keeps it at once
  const n0 = await p.evaluate(() => state.memory.items.length);
  await p.evaluate(() => { const r = [...document.querySelectorAll('#chatScroll .msg.bot [data-mem]')]; r[0].click(); }); await p.waitForTimeout(1300);
  const rm = await p.evaluate(() => { const it = state.memory.items[0], k = document.querySelector('#chatScroll .msg.bot [data-mem]'); return { n: state.memory.items.length, text: it.text, how: it.how, g: it.g, kept: k && k.classList.contains('mt-kept'), title: k && k.title }; });
  ok(rm.n === n0 + 1 && rm.how === 'key' && /due on Friday 13 November/.test(rm.text) && rm.kept && /Kept in Memory/.test(rm.title), 'Remember under an answer keeps it at once, and the key says Kept in Memory', rm);
  // 6. the Memory room, opened as the chat's + menu opens it
  await p.evaluate(() => memOpen()); await p.waitForTimeout(1200);
  const r0 = await p.evaluate(() => { const c = document.getElementById('memRoomCard'), tab = document.getElementById('dxT-data-memory');
    return { shown: !!(c && c.offsetParent), tab: tab && tab.getAttribute('aria-selected'), kept: (document.querySelector('#memCoinKept b') || {}).textContent, wait: (document.querySelector('#memCoinWait b') || {}).textContent,
      groups: [...c.querySelectorAll('.mr-ghead')].map(h => h.textContent.trim()), cards: c.querySelectorAll('.mr-mem').length }; });
  ok(r0.shown && r0.tab === 'true' && r0.kept === '7' && r0.wait === '2' && r0.groups.some(g => /Waiting for you/.test(g)) && r0.groups.some(g => /Your projects/.test(g)) && r0.cards === 9,
    'the chat\'s + menu opens Memory: Settings, Your data, its own tab, with the counts and the groups', r0);
  await p.screenshot({ path: OUT + '/3_room.png' });
  // raised, not flat
  const flat = await p.evaluate(() => ['#memRoomCard', '#memRoomCard .mr-sw', '#memRoomCard .mr-mem .mr-face', '#memRoomCard .mr-how', '#memRoomCard .mr-step', '#memRoomCard .mr-count', '#memRoomCard .mr-key'].filter(s => { const e = document.querySelector(s); return !e || !/0px [2-6]px 0px/.test(getComputedStyle(e).boxShadow); }));
  ok(flat.length === 0, 'every card, switch, step and key in the room stands raised on an edge', flat);
  const mb = await (await p.$('#memRoomCard .mr-mem:not(.mr-wait)')).boundingBox();
  await p.mouse.move(mb.x + mb.width * .5, mb.y + mb.height * .5); await p.mouse.move(mb.x + mb.width * .9, mb.y + mb.height * .2, { steps: 4 }); await p.waitForTimeout(600);
  const ln = await p.evaluate(() => { const e = document.querySelector('#memRoomCard .mr-mem:not(.mr-wait)'); return { cls: e.className, lx: e.style.getPropertyValue('--lx'), tf: getComputedStyle(e).transform.slice(0, 40) }; });
  ok(/mr-ph/.test(ln.cls) && parseFloat(ln.lx) > 1 && /matrix3d/.test(ln.tf), 'a memory card leans toward the pointer and lifts', ln);
  await p.mouse.move(5, 300);
  // Keep, Not this
  await p.click('#memRoomCard .mr-mem.mr-wait[data-mid="m7"] .mr-key.mr-primary'); await p.waitForTimeout(1000);
  const kp = await p.evaluate(() => ({ kept: document.querySelector('#memCoinKept b').textContent, wait: document.querySelector('#memCoinWait b').textContent, inItems: state.memory.items.some(x => x.id === 'm7'), stillWaiting: state.memory.waiting.some(x => x.id === 'm7') }));
  ok(kp.kept === '8' && kp.wait === '1' && kp.inItems && !kp.stillWaiting, 'Keep carries a waiting memory into its group', kp);
  await p.click('#memRoomCard .mr-mem.mr-wait[data-mid="m8"] .mr-key:not(.mr-primary)'); await p.waitForTimeout(1000);
  const nt = await p.evaluate(() => ({ waiting: state.memory.waiting.length, no: state.memory.no.length, hidden: document.getElementById('memCountWait').hidden }));
  ok(nt.waiting === 0 && nt.no === 1 && nt.hidden, 'Not this: it goes, and Ingenium will not note it again', nt);
  // Edit turns the card over
  await p.click('#memRoomCard .mr-mem[data-mid="m4"] .mr-front .mr-key'); await p.waitForTimeout(800);
  const ed = await p.evaluate(() => { const m = document.querySelector('#memRoomCard .mr-mem[data-mid="m4"]'); return { editing: m.classList.contains('mr-editing'), focus: document.activeElement && document.activeElement.id, tf: getComputedStyle(m.querySelector('.mr-flip')).transform.slice(0, 30) }; });
  await p.screenshot({ path: OUT + '/4_edit.png' });
  await p.keyboard.type('You prefer plain words, and a short summary first.'); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
  const ed2 = await p.evaluate(() => ({ text: state.memory.items.find(x => x.id === 'm4').text, editing: document.querySelector('#memRoomCard .mr-mem[data-mid="m4"]').classList.contains('mr-editing') }));
  ok(ed.editing && ed.focus === 'memEdit-m4' && /matrix3d/.test(ed.tf) && !ed2.editing && /short summary first/.test(ed2.text), 'Edit turns the card over to write on its back; Enter saves it', { ed, ed2 });
  // Forget, and Undo
  await p.click('#memRoomCard .mr-mem[data-mid="m6"] .mr-front .mr-key:nth-of-type(2)'); await p.waitForTimeout(1000);
  const fg = await p.evaluate(() => ({ gone: !state.memory.items.some(x => x.id === 'm6'), undo: !!document.querySelector('#memRoomCard .mr-undo') }));
  await p.click('#memRoomCard .mr-undo .mr-key'); await p.waitForTimeout(800);
  ok(fg.gone && fg.undo && await p.evaluate(() => state.memory.items.some(x => x.id === 'm6')), 'Forget: the card falls away, and Undo brings it back', fg);
  // 7. Learn from my chats
  await p.evaluate(() => { go('chat'); document.getElementById('chatNew').click(); renderChat(); }); await p.waitForTimeout(500);
  await send('I am writing a field guide to urban moths for the town library. Can you suggest headings?');
  await p.evaluate(() => { window.__reply = 'PROJECT: You are writing a field guide to urban moths for the town library.\nWAY: You prefer answers with headings.\nYOU: You like the town library.'; window.__gen = []; state.memory.no = []; });
  await p.evaluate(() => IngChatMemory.noteNow()); await p.waitForTimeout(500);
  const ln1 = await p.evaluate(() => ({ asked: (window.__gen[0] || '').slice(0, 200), conv: /Person: I am writing a field guide/.test(window.__gen[0] || ''), waiting: state.memory.waiting.map(x => x.text + '|' + x.how + '|' + x.g), status: Engine.status, tray: IngChatMemory.tray() }));
  ok(ln1.conv && ln1.waiting.length === 3 && /^You are writing a field guide to urban moths.*\|noted\|project$/.test(ln1.waiting[0]) && ln1.status === 'ready', 'Learn from my chats: the model on this device notes what is worth keeping, and it waits for her', ln1);
  // it gives way when she types, and her message goes once the engine is free
  await p.evaluate(() => { window.__reply = 'NONE'; window.__slow = 4000; state.memory.noted = {}; window.__gen = []; });
  const g0 = await p.evaluate(() => { IngChatMemory.noteNow(); return { noting: IngChatMemory.noting(), status: Engine.status }; });
  await p.click('#chatInput'); await p.keyboard.type('And a title?'); await p.waitForTimeout(300);
  const g1 = await p.evaluate(() => ({ noting: IngChatMemory.noting(), status: Engine.status, aborted: window.__aborted || 0 }));
  await p.evaluate(() => { window.__slow = 60; window.__reply = 'Moths of the Lamplit Town.'; });
  await p.keyboard.press('Enter'); await p.waitForTimeout(1200);
  const g2 = await p.evaluate(() => { const ms = curMsgs(); return { last: ms.slice(-2).map(x => x.role + ':' + x.text.slice(0, 30)), status: Engine.status }; });
  ok(g0.noting && g0.status === 'busy' && !g1.noting && g1.status === 'ready' && g1.aborted >= 1 && g2.last[0] === 'me:And a title?' && /Lamplit/.test(g2.last[1]),
    'it gives way the moment she types, and her message is answered as usual', { g0, g1, g2 });
  // 8. Forget everything asks on the page
  await p.evaluate(() => memOpen()); await p.waitForTimeout(900);
  await p.click('#memRoomCard .mr-forget > .mr-key'); await p.waitForTimeout(700);
  await p.screenshot({ path: OUT + '/5_confirm.png' });
  await p.click('#memRoomCard .mr-confirm .mr-key.mr-primary'); await p.waitForTimeout(1600);
  ok(await p.evaluate(() => state.memory.items.length === 0 && state.memory.waiting.length === 0 && !document.querySelector('#memRoomCard .mr-mem') && document.querySelector('#memCoinKept b').textContent === '0'),
    'Forget everything asks on the page, then every card falls away');
  // 9. by night
  await p.evaluate(() => { state.memory.items.push({ id: 'n1', text: 'You are building Lantern, a reading app for iPad.', at: Date.now(), how: 'typed', g: 'project' }); IngChatMemory.paint(); state.theme = 'night'; applyTheme(); });
  await p.waitForTimeout(900);
  const nb = await p.evaluate(() => getComputedStyle(document.querySelector('#memRoomCard .mr-face')).backgroundImage);
  ok(/rgb\(43, 35, 57\)/.test(nb), 'by night the cards take the night colours', nb);
  await p.screenshot({ path: OUT + '/6_night.png' });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(1500);
  // 10. left alone, nothing on the page is rewritten
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const g = document.getElementById('page-settings'), mo = new MutationObserver(ms => { ms.forEach(m => { if (!(m.target.closest && m.target.closest('#healthBox'))) n++; }); });
    mo.observe(g, { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 3000); }));
  ok(still === 0, 'left alone, nothing in the Memory room is rewritten', still);
  ok(errs.length === 0, 'no page error', errs);
  // 11. a phone
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); const q = await ph.newPage();
  const qerr = []; q.on('pageerror', e => qerr.push(e.message.slice(0, 200)));
  await q.goto(URL_); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await q.waitForTimeout(700);
  await q.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.memory = { on: true, learn: true, ask: true, cloud: false, items: [{ id: 'p1', text: 'You are building Lantern, a reading app for iPad, in SwiftUI.', at: Date.now(), how: 'typed', g: 'project' }], waiting: [{ id: 'p2', text: 'Your tutor for the soil essay is Dr Okafor.', at: Date.now(), how: 'noted', g: 'date' }], skip: {}, noted: {}, no: [] };
    memOpen(); });
  await q.waitForTimeout(1500);
  const qw = await q.evaluate(() => { const c = document.getElementById('memRoomCard').getBoundingClientRect(); return { doc: document.documentElement.scrollWidth, right: Math.round(c.right) }; });
  ok(qw.doc <= 390 && qw.right <= 390, 'a phone: the Memory room fits the screen', qw);
  await q.screenshot({ path: OUT + '/7_phone.png' });
  ok(qerr.length === 0, 'a phone: no page error', qerr);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
