// Ingenium 7.80: the guided tour, stage 4: an AI of her own, built through the models page's own builder (modules/r379.js). Her request
// (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ... specifically curated
// to showcase each page being used to complete a specific task". Her own AIs must be as they were when the tour ends.
//   node rig/t_780_tour_mentes.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), URL_ = args.find(a => /^https?:\/\//.test(a)), OUT = args.find(a => !/^https?:\/\//.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(3000);
  // one AI of hers, before the tour
  await p.evaluate(() => { state.ownAIs = (state.ownAIs || []).concat([{ id: 'ai-hers', name: 'My own tutor', emoji: '✦', color: '#6a3fb5', purpose: 'Mine', examples: [], lessons: [], habits: {}, files: [] }]); saveState(); });
  const before = await p.evaluate(() => ({ ais: (state.ownAIs || []).map(a => a.id).join(','), chats: (state.chats || []).length }));
  const i = await p.evaluate(() => { try { tour(); } catch (e) {} return ING_TOUR.findIndex(s => s.demo === 'r379Own'); });
  ok(i > 0 && /Your own AIs/.test(await p.evaluate(i => ING_TOUR[i - 1].sub || '', i)), 'the card follows Build your own AI', i);
  await p.evaluate(i => tourJump(i), i); await sleep(3500);
  const mid = await p.evaluate(() => { const b = document.querySelector('.aib-box'); return b ? { title: (b.querySelector('#aibTitle') || {}).textContent, name: (b.querySelector('#aibBody input') || {}).value } : null; });
  ok(mid && /Build your own AI/.test(mid.title || ''), 'the page\'s own builder is open, its steps being filled', mid);
  await p.screenshot({ path: OUT + '/builder.png' });
  for (let k = 0; k < 120; k++) { const done = await p.evaluate(() => (state.ownAIs || []).some(a => a.__tour)); if (done) break; await sleep(500); }
  await sleep(1200);
  const ai = await p.evaluate(() => { const a = (state.ownAIs || []).find(x => x.__tour) || {}; return { name: a.name, emoji: a.emoji, color: a.color, purpose: (a.purpose || '').slice(0, 40), role: a.role, method: (a.method || '').slice(0, 30), tone: a.tone, ex: (a.examples || []).length, page: (document.querySelector('section.section.active') || {}).id, modal: !!(document.getElementById('modalRoot') && document.getElementById('modalRoot').classList.contains('open')), listed: [...document.querySelectorAll('#aiList .ai-name')].map(x => x.textContent) }; });
  ok(ai.name === 'Garden helper' && ai.emoji === '🌿' && ai.color === '#3f8f7a' && /houseplants/.test(ai.purpose) && ai.role && ai.tone === 'Calm and plain' && ai.ex === 1, 'the AI is built step by step: name, symbol, Jade, purpose, how it works, an example', ai);
  ok(ai.page === 'page-models' && !ai.modal && ai.listed.indexOf('Garden helper') >= 0, 'saved through the builder\'s own Save into Your own AIs; no conversation opened, the tour stays on the page', ai);
  await p.screenshot({ path: OUT + '/saved.png' });
  await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); await sleep(1500);
  const after = await p.evaluate(() => ({ ais: (state.ownAIs || []).map(a => a.id).join(','), chats: (state.chats || []).length }));
  ok(after.ais === before.ais && after.chats === before.chats, 'when the tour ends, her own AIs and conversations are as they were', { before, after });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
