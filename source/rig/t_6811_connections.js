// node rig/t_6811_connections.js <Ingenium page url> <mock server url> <out dir>
// Every connection at hand (modules/r191.js), in Chromium. The owner's words (28 October 2026): "I want to be able to run any
// of Claude's models like Sonnet, Haiku, Opus and Fable as well as Ollama's models and Kimi K3 on Ingenium's own chat rooms."
//   - each connection set up is kept; the model menu lists the models of all of them, by service, Claude's by their names
//     (Claude Opus 5.5 for claude-opus-5-5), the one in use first;
//   - choosing a model of another service switches to that service at once, with its own address and key;
//   - each conversation keeps the model that last answered it, and going back to it brings that model back, and says so;
//   - Settings lists the connections kept, with Use and Forget; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, MOCK, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  ok(await p.evaluate(() => !!(window.IngConnections && window.paintModelMenu.__r191 && window.sendRec.__r191)), 'the module is in place');
  // she sets up Ollama, then Kimi, then Claude, one after another, as in Settings
  await p.evaluate(base => {
    const set = c => { state.cloud = Object.assign({ on: true }, c); state.chatSource = 'cloud'; saveState(); };
    set({ provider: 'ollama-local', base: base, key: '', model: 'qwen3:8b', models: ['qwen3:8b', 'llama3.2:3b'] });
    set({ provider: 'moonshot', base: base, key: 'kimi-key', model: 'kimi-k2', models: ['kimi-k2', 'kimi-k2-thinking'] });
    set({ provider: 'anthropic', base: base, key: 'claude-key', model: 'claude-opus-5-5', models: ['claude-fable-5-1', 'claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'] });
    go('chat'); const c = { id: 'cA' + Date.now().toString(36), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; renderChat(); }, MOCK);
  const kept = await p.evaluate(() => IngConnections.kept().map(k => [k.provider, k.key, k.models.length]));
  ok(kept.length === 3 && kept[0][0] === 'anthropic' && kept.some(k => k[0] === 'moonshot' && k[1] === 'kimi-key') && kept.some(k => k[0] === 'ollama-local'), 'each connection she sets up is kept, key and model list', JSON.stringify(kept));
  await p.click('#chatModelBtn'); await p.waitForTimeout(300);
  const menu = await p.evaluate(() => { const m = document.getElementById('chatModelMenu'), box = m.querySelector('[data-r191]');
    return { heads: [...box.querySelectorAll('.chat-menu-head')].map(h => h.textContent), names: [...box.querySelectorAll('.menu-btn')].map(x => x.innerText.replace(/\s+/g, ' ').trim()), first: m.firstElementChild === box,
      dup: [...m.querySelectorAll('.chat-menu-head')].filter(h => /^Connection: /.test(h.textContent)).length }; });
  ok(menu.first && menu.dup === 0 && JSON.stringify(menu.heads) === JSON.stringify(['Claude (Anthropic) · in use', 'Kimi (Moonshot AI)', 'Ollama on this computer']),
    'the model menu lists every connection by service, the one in use first, with no second list of it', JSON.stringify(menu));
  ok(menu.names[0] === 'Claude Opus 5.5 answering now' && menu.names.includes('Claude Fable 5.1') && menu.names.includes('Claude Sonnet 5.5') && menu.names.includes('Claude Haiku 5.5') && menu.names.includes('kimi-k2') && menu.names.includes('qwen3:8b'),
    "Claude's models by their names (Fable, Opus, Sonnet, Haiku), the others as their service names them", JSON.stringify(menu.names));
  await p.screenshot({ path: OUT + '/model-menu.png' });
  await p.click('#chatModelMenu [data-r191] .menu-btn[title="kimi-k2"]'); await p.waitForTimeout(300);
  const now = await p.evaluate(() => ({ p: state.cloud.provider, m: state.cloud.model, k: state.cloud.key, src: state.chatSource, list: state.cloud.models }));
  ok(now.p === 'moonshot' && now.m === 'kimi-k2' && now.k === 'kimi-key' && now.src === 'cloud' && now.list.length === 2, 'choosing a model of another service switches to it at once, with its own key', JSON.stringify(now));
  // conversation A answered by Kimi; conversation B by Claude Sonnet; back to A brings Kimi back
  await p.evaluate(() => { const i = document.getElementById('chatInput'); i.value = 'Hello Kimi.'; sendChat(); });
  await p.waitForFunction(() => !liveBot, null, { timeout: 60000 }); await p.waitForTimeout(300);
  const A = await p.evaluate(() => ({ id: curChat().id, cx: curChat().cx, last: curMsgs()[curMsgs().length - 1].text }));
  await p.evaluate(() => { const c = { id: 'cB' + Date.now().toString(36), title: 'New conversation', messages: [] }; state.chats.push(c); state.activeChat = c.id; renderChat(); });
  await p.click('#chatModelBtn'); await p.waitForTimeout(250); await p.click('#chatModelMenu [data-r191] .menu-btn[title="claude-sonnet-5-5"]'); await p.waitForTimeout(250);
  await p.evaluate(() => { const i = document.getElementById('chatInput'); i.value = 'Hello Claude.'; sendChat(); });
  await p.waitForFunction(() => !liveBot, null, { timeout: 60000 }); await p.waitForTimeout(300);
  const B = await p.evaluate(() => ({ id: curChat().id, cx: curChat().cx, p: state.cloud.provider, m: state.cloud.model, key: document.getElementById('chatModelName').textContent }));
  ok(B.key === 'Claude Sonnet 5.5', 'the key beside the send arrow names the model as the menu does', B.key);
  await p.evaluate(id => { state.activeChat = id; renderChat(); }, A.id); await p.waitForTimeout(400);
  const back = await p.evaluate(() => ({ p: state.cloud.provider, m: state.cloud.model, k: state.cloud.key, toast: [...document.querySelectorAll('#ingToast,[class*="toast"]')].map(t => t.textContent).join(' | ') }));
  ok(A.cx && A.cx.model === 'kimi-k2' && B.p === 'anthropic' && B.m === 'claude-sonnet-5-5' && back.p === 'moonshot' && back.m === 'kimi-k2' && back.k === 'kimi-key',
    'each conversation keeps the model that last answered it: back in the first, Kimi answers again', JSON.stringify({ A, B, back }));
  ok(/goes on with kimi-k2, as before/.test(back.toast), 'and Ingenium says so', back.toast);
  // Settings: the connections kept, with Use and Forget
  await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
  const rows = await p.evaluate(() => [...document.querySelectorAll('#cxKept .cxk-row')].map(r => [...r.children].map(c => c.textContent.trim()).join(' ')));
  ok(rows.length === 3 && rows.some(r => /^Kimi \(Moonshot AI\) 2 models · last chosen: kimi-k2 in use Use Forget$/.test(r)), 'Settings lists the connections kept, each with Use and Forget', JSON.stringify(rows));
  await p.evaluate(() => document.getElementById('cxKept').scrollIntoView({ block: 'center' })); await p.waitForTimeout(200); await p.screenshot({ path: OUT + '/settings-kept.png' });
  await p.evaluate(() => { const r = [...document.querySelectorAll('#cxKept .cxk-row')].find(x => /Ollama/.test(x.textContent)); [...r.querySelectorAll('button')].find(b => b.textContent === 'Forget').click(); });
  await p.waitForTimeout(300);
  ok(await p.evaluate(() => IngConnections.kept().length === 2 && !IngConnections.kept().some(k => k.provider === 'ollama-local') && document.querySelectorAll('#cxKept .cxk-row').length === 2), 'Forget removes one from this device');
  ok(errs.length === 0, 'no page errors', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
