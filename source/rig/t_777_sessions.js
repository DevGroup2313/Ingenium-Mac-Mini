// Ingenium 7.77: Code's list is of sessions, Chat's of conversations (modules/r375.js).
// Her answer (24 November 2026): "I approve of your recommendations for the naming question" (Conversations for Chat, Sessions for Code).
//   node rig/t_777_sessions.js <Ingenium page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv.slice(2).filter(a => /^https?:\/\//.test(a))[0];
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const words = () => p.evaluate(() => { const s = document.getElementById('ccSide'), sb = document.getElementById('ccSideBtn');
    return { list: s && s.getAttribute('aria-label'), search: s && (s.querySelector('.cc-search') || {}).placeholder, hide: s && (s.querySelector('.cc-hide') || { getAttribute: () => null }).getAttribute('aria-label'), key: sb && sb.title, nw: s && (s.querySelector('.cc-new') || {}).textContent }; });
  await p.evaluate(() => go('chat')); await sleep(1500);
  const c = await words();
  ok(c.list === 'Conversations' && c.search === 'Search conversations' && /conversations/.test(c.key || ''), 'Chat keeps Conversations', c);
  await p.evaluate(() => go('code')); await sleep(1800);
  const k = await words();
  ok(k.list === 'Sessions' && (k.search === undefined || k.search === 'Search sessions') && k.hide === 'Hide the list of sessions' && k.key === 'Show the list of sessions', 'Code says Sessions: the list, its search (when shown), its hide key and the ☰ key', k);
  // the name asked when renaming a Code session
  const asked = await p.evaluate(() => new Promise(res => { const o = window.__ingPromptSeen = []; const real = window.ingPrompt;
    try { ingPrompt({ title: 'Name this conversation', value: 'x', yes: 'Rename' }); } catch (e) {} setTimeout(() => { const d = [...document.querySelectorAll('h3,h2,.dlg-title,.modal-title')].map(x => x.textContent).filter(t => /Name this/.test(t)); try { closeModal(); } catch (e) {} res(d); }, 400); }));
  ok(asked.some(t => /Name this session/.test(t)), 'renaming on Code asks to name the session', asked);
  await p.evaluate(() => go('chat')); await sleep(1200);
  const c2 = await words();
  ok(c2.list === 'Conversations' && c2.search === 'Search conversations', 'back on Chat, Conversations again', c2);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
