// R133: a conversation started from another page is the one the Chat page shows, and the conversation that was open
// before keeps its own messages: Decode a message, Draft a reply, a chat with one's own AI, a blend carried on in the chat.
// node rig/t_open_chat.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
async function enter(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); }

(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_); await enter(p); await p.waitForTimeout(600);
  await p.evaluate(() => { if (document.getElementById('grBox')) closeModal(); });
  // an earlier conversation, open on the Chat page
  await p.evaluate(() => { const c = { id: 'cEarlier', title: 'Earlier talk', messages: [{ role: 'me', text: 'Kept as it was', at: Date.now() - 60000 }, { role: 'bot', text: 'Yes.', at: Date.now() - 59000, done: Date.now() - 59000 }] };
    state.chats.push(c); state.activeChat = c.id; ccState().activeChat = c.id; saveState(); go('chat'); });
  await p.waitForTimeout(200);
  const shown = () => p.evaluate(() => { const c = curChat(); const e = (state.chats || []).find(x => x.id === 'cEarlier');
    return { id: c.id, title: c.title, first: (c.messages[0] || {}).text || '', cc: ccState().activeChat, earlier: e ? e.messages.length : -1,
      head: [...document.querySelectorAll('.cc-title,#chatTitle,.chat-title')].map(x => x.textContent).join(' ') }; });
  let s = await shown();
  ok(s.id === 'cEarlier' && s.earlier === 2, 'the earlier conversation is open', JSON.stringify(s));

  // Decode a message
  await p.evaluate(() => go('focus')); await p.click('#fxWords >> text=Decode a message'); await p.waitForTimeout(100);
  await p.fill('#sdMsg', 'Per my last email, the figures are still missing.'); await p.fill('#sdCtx', 'from my manager'); await p.click('#sdGo'); await p.waitForTimeout(300);
  s = await shown();
  ok(s.title === 'Decoding a message' && /Per my last email/.test(s.first) && s.cc === s.id, 'Decode a message opens a conversation of its own on the Chat page', JSON.stringify(s));
  ok(s.earlier === 2, 'the conversation open before keeps its two messages', s.earlier);
  await p.waitForFunction(() => { const ms = curMsgs(); return ms.length > 1 && !ms[ms.length - 1].live; }, null, { timeout: 30000 }).catch(() => {});
  const decodeId = s.id;

  // Draft a reply
  await p.evaluate(() => go('focus')); await p.click('#fxWords >> text=Draft a reply'); await p.waitForTimeout(100);
  await p.fill('#srWant', 'yes to Thursday, but I need to leave by four'); await p.click('#srGo'); await p.waitForTimeout(300);
  s = await shown();
  ok(s.title === 'Drafting a reply' && /yes to Thursday/.test(s.first) && s.id !== decodeId && s.cc === s.id, 'Draft a reply opens a conversation of its own', JSON.stringify(s));
  await p.waitForFunction(() => { const ms = curMsgs(); return ms.length > 1 && !ms[ms.length - 1].live; }, null, { timeout: 30000 }).catch(() => {});

  // a chat with one's own AI
  await p.evaluate(() => { go('models'); aiStartChat({ id: 'aiTest', name: 'Garden helper', emoji: '🌿' }); });
  await p.waitForTimeout(300);
  s = await shown();
  ok(s.title === 'Garden helper' && s.cc === s.id && s.first === '', 'a chat with one\'s own AI opens on that conversation', JSON.stringify(s));
  const aiChat = await p.evaluate(() => curChat().aiId);
  ok(aiChat === 'aiTest', 'and it is that AI\'s conversation', aiChat);

  // a blend carried on in the chat
  await p.evaluate(() => { go('blend'); const at = Date.now(); blToChat({ task: 'Compare two openings', at, done: at, strategy: '', answers: [{ name: 'A' }, { name: 'B' }], final: { text: 'The second opening is clearer.' } }); });
  await p.waitForTimeout(300);
  s = await shown();
  ok(/^Blend: Compare two openings/.test(s.title) && s.first === 'Compare two openings' && s.cc === s.id, 'a blend carried on in the chat opens on it', JSON.stringify(s));

  // after leaving the Chat page and coming back, the last conversation shown is still the one shown
  await p.evaluate(() => go('settings')); await p.waitForTimeout(100); await p.evaluate(() => go('chat')); await p.waitForTimeout(200);
  const back = await shown();
  ok(back.id === s.id, 'coming back to the Chat page shows the same conversation', back.title);
  const earlier = await p.evaluate(() => (state.chats || []).find(x => x.id === 'cEarlier').messages.map(m => m.text).join(' | '));
  ok(earlier === 'Kept as it was | Yes.', 'the earlier conversation is untouched at the end', earlier);
  await p.screenshot({ path: path.join(OUT, 'open_chat.png') });
  ok(!errs.length, 'no page errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
