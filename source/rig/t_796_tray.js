// node rig/t_796_tray.js <page url>
// Ingenium 7.96: the chat's list of what Ingenium remembered (r271's tray) has a Close key. Closed, it stays away for that chat however
// often it is drawn again; a later answer that brings a memory it has not shown brings it back; another chat still shows its own list.
// Memoria names Fabrica only where the copy has it (r396). Invented memories only.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2];
if (!URL_) { console.log('usage: node rig/t_796_tray.js <page url>'); process.exit(2); }
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  try {
    await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngChatMemory, null, { timeout: 300000 });
    for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
    await p.evaluate(() => { const s = IngChatMemory.state(); s.on = true; s.items = s.items || [];
      s.items.push({ id: 'mA', text: 'Tide Clock is built offline first', at: Date.now() }, { id: 'mB', text: 'Every card lifts under the pointer', at: Date.now() });
      window.__msgs = [{ role: 'user', content: 'Where do we stand?' }, { role: 'bot', content: 'Here is where it stands.', mem: ['mA'] }];
      window.curMsgs = () => window.__msgs; state.activeChat = 'chat-one'; go('chat'); IngChatMemory.paint(); });
    await sleep(900);
    let t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && t.shown && t.ids.indexOf('mA') >= 0, 'the list shows the memory that went with the answer', t);
    const hasKey = await p.evaluate(() => { const k = document.querySelector('#memTray .mt-close'); return k ? { text: k.textContent.trim(), label: k.getAttribute('aria-label'), raised: getComputedStyle(k).boxShadow !== 'none' } : null; });
    ok(hasKey && hasKey.text === 'Close' && hasKey.raised, 'it has a raised Close key', hasKey);
    await p.click('#memTray .mt-close'); await sleep(900);
    t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && !t.shown, 'Close puts it away', t);
    await p.evaluate(() => { IngChatMemory.paint(); }); await sleep(400);
    t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && !t.shown, 'drawn again, it stays away for this chat', t);
    await p.evaluate(() => { window.__msgs = window.__msgs.concat([{ role: 'user', content: 'And the cards?' }, { role: 'bot', content: 'They lift.', mem: ['mA'] }]); IngChatMemory.paint(); }); await sleep(400);
    t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && !t.shown, 'an answer that brings only what it has shown keeps it away', t);
    await p.evaluate(() => { window.__msgs = window.__msgs.concat([{ role: 'user', content: 'And the lift?' }, { role: 'bot', content: 'Three pixels, with a spring.', mem: ['mA', 'mB'] }]); IngChatMemory.paint(); }); await sleep(600);
    t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && t.shown && t.ids.indexOf('mB') >= 0, 'an answer that brings a memory it has not shown brings it back', t);
    await p.click('#memTray .mt-close'); await sleep(900);
    await p.evaluate(() => { state.activeChat = 'chat-two'; window.__msgs = [{ role: 'user', content: 'Hello' }, { role: 'bot', content: 'Hello.', mem: ['mA'] }]; IngChatMemory.paint(); }); await sleep(600);
    t = await p.evaluate(() => IngChatMemory.tray());
    ok(t && t.shown, 'another chat still shows its own list', t);
    const fab = await p.evaluate(() => { const m = document.querySelector('.mm-says'); return { fab: !!document.getElementById('page-fabrica'), says: m ? m.textContent : null }; });
    ok(!fab.says || (fab.fab ? /Fabrica/.test(fab.says) : !/Fabrica/.test(fab.says)), "Memoria's line names Fabrica only where this copy has it", fab);
    ok(errs.length === 0, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 500)); }
  finally { await b.close(); }
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
