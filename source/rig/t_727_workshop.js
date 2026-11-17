// Ingenium 7.27: one workshop (modules/r312.js; r112 exports Fabrica's Open it in Code). Her words (16 November 2026): "I want to be able to
// send the apps that I am working on straight from Ingeniun's chat or coding to Fabrica or Adamas so that I can commit and ship it as an app.
// ... I also want to be able to connect to Fabrica's repositories as well and have it built into Ingenium." An invented app, Harbour Garden.
// Checks:
//   - Chat's app card has Keep in Fabrica right after Make it an app, with Fabrica's mark;
//   - pressed: a sheet asks where (a new app, named from the page's title, chosen when Fabrica has no app of that name) and what this version
//     is; Keep it makes the app in Fabrica with the page as its first version; the sheet then offers Ship it, Open in Fabrica, Make it an app;
//   - pressed again for a changed page: the app of the same name is chosen, and Keep it makes a second version holding the change;
//   - Ship it opens Fabrica on that app, in its Ship part;
//   - Code's start window has From Fabrica after From GitHub; it lists Fabrica's apps and opens one as a project linked to it;
//   - the Code session has Keep in Fabrica and Make it an app among its keys; a change made in Code, kept, is the app's third version,
//     the linked app chosen in the sheet;
//   - Make it an app opens the page in Adamas, linked back to Fabrica (Adamas's own Keep in Fabrica shows);
//   - Chat's + menu has One of your apps in Fabrica; its list has Harbour Garden; pressed, its page goes with the next message;
//   - no page error.
//   node rig/t_727_workshop.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAGE = (t, h) => '<!doctype html><html><head><meta charset="utf-8"><title>Harbour Garden</title></head><body><h1>' + h + '</h1><p>' + t + '</p></body></html>';
(async () => { const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('chat'); });
  await sleep(1200);
  const repo = () => p.evaluate(async () => { const r = (await IngRepo.list()).find(x => x.name === 'Harbour Garden'); if (!r) return null; const log = await IngRepo.log(r.id, { max: 20 }); const t = await IngRepo.readText(r.id, 'index.html'); return { id: r.id, versions: log.length, titles: log.map(c => c.title), text: t }; });
  // 1. Chat's card
  const card = async (html) => p.evaluate((html) => { const host = document.createElement('div'); host.id = 't728host'; document.getElementById('t728host') && document.getElementById('t728host').remove(); document.body.appendChild(host);
      const row = mkAppActs({ role: 'bot', text: '' }, html); host.appendChild(row); const ks = [...row.children].map(x => x.textContent.trim()); return ks; }, html);
  const ks = await card(PAGE('First page.', 'Harbour Garden'));
  ok(ks.indexOf('Keep in Fabrica') === ks.indexOf('Make it an app') + 1, 'Chat\'s app card has Keep in Fabrica right after Make it an app', ks);
  const mark = await p.evaluate(() => (window.MK_LK || {})['Keep in Fabrica']); ok(mark === 'fab', 'it wears Fabrica\'s mark', mark);
  await p.evaluate(() => { [...document.querySelectorAll('#t728host button')].find(x => x.textContent.trim() === 'Keep in Fabrica').click(); }); await sleep(1200);
  const sh = await p.evaluate(() => { const s = document.getElementById('r312Sheet'); if (!s) return null; const on = s.querySelector('.cc-prow[aria-pressed="true"]');
    return { title: s.querySelector('h3').textContent, chosen: on && on.textContent, name: s.querySelector('#r312Name').value, nameShown: !s.querySelector('#r312Name').hidden, msg: s.querySelector('#r312Msg').value, go: s.querySelector('#r312Go').textContent }; });
  ok(sh && sh.title === 'Keep it in Fabrica' && /A new app in Fabrica/.test(sh.chosen || '') && sh.name === 'Harbour Garden' && sh.nameShown && /Made in Chat/.test(sh.msg), 'pressed, a sheet asks where (a new app, named from the page\'s title) and what this version is', sh);
  await p.click('#r312Go'); await sleep(2500);
  const d1 = await p.evaluate(() => { const s = document.getElementById('r312Sheet'); return s ? { title: s.querySelector('h3').textContent, keys: [...s.querySelectorAll('.ing-ask-keys button')].map(x => x.textContent), says: s.querySelector('p').textContent } : null; });
  const r1 = await repo();
  ok(r1 && r1.versions === 1 && /First page/.test(r1.text || '') && d1 && d1.title === 'Kept in Fabrica' && ['Ship it', 'Open in Fabrica', 'Make it an app'].every(k => d1.keys.indexOf(k) >= 0), 'Keep it makes the app in Fabrica with the page as its first version; then Ship it, Open in Fabrica, Make it an app', { repo: r1 && { versions: r1.versions, titles: r1.titles }, sheet: d1 });
  await p.evaluate(() => { closeModal(); });
  await card(PAGE('Second page, with a change.', 'Harbour Garden'));
  await p.evaluate(() => { [...document.querySelectorAll('#t728host button')].find(x => x.textContent.trim() === 'Keep in Fabrica').click(); }); await sleep(1200);
  const sh2 = await p.evaluate(() => { const s = document.getElementById('r312Sheet'); const on = s && s.querySelector('.cc-prow[aria-pressed="true"]'); return { chosen: on && on.textContent, nameShown: s && !s.querySelector('#r312Name').hidden, go: s && s.querySelector('#r312Go').textContent }; });
  await p.click('#r312Go'); await sleep(2500); const r2 = await repo();
  ok(/A new version of Harbour Garden/.test(sh2.chosen || '') && !sh2.nameShown && r2 && r2.versions === 2 && /Second page/.test(r2.text || ''), 'again, for a changed page: the app of that name is chosen, and Keep it makes a second version holding the change', { sheet: sh2, versions: r2 && r2.versions });
  await p.evaluate(() => { [...document.querySelectorAll('#r312Sheet .ing-ask-keys button')].find(x => x.textContent === 'Ship it').click(); }); await sleep(4500);
  const fb = await p.evaluate(() => { const H = window.fbHubHost, sel = H && H.FBS().sel; const part = document.getElementById('fbPart_ship'); return { page: document.querySelector('section.section.active') && document.querySelector('section.section.active').id, sel, part: part && part.getAttribute('aria-selected'), rec: null }; });
  ok(fb.page === 'page-fabrica' && fb.sel === r2.id && fb.part === 'true', 'Ship it opens Fabrica on that app, in its Ship part', fb);
  await p.screenshot({ path: OUT + '/fabrica_ship.png' });
  // 2. Code's start window and session
  await p.evaluate(() => { go('chat'); }); await sleep(800);
  const cards = await p.evaluate(() => { ccWelcome(); const st = document.querySelector('#modalBox .cc-start'); return st ? [...st.querySelectorAll('.cc-card')].map(c => c.getAttribute('data-a')) : null; });
  ok(cards && cards.indexOf('fabrica') === cards.indexOf('github') + 1, 'Code\'s start window has From Fabrica after From GitHub', cards);
  await p.evaluate(() => { document.querySelector('#modalBox .cc-card[data-a="fabrica"]').click(); }); await sleep(1500);
  const list = await p.evaluate(() => [...document.querySelectorAll('#r312Apps .cc-prow b')].map(x => x.textContent));
  ok(list.indexOf('Harbour Garden') >= 0, 'it lists Fabrica\'s apps', list);
  await p.evaluate(() => { [...document.querySelectorAll('#r312Apps .cc-prow')].find(x => x.querySelector('b').textContent === 'Harbour Garden').click(); }); await sleep(4000);
  const cs = await p.evaluate(() => { const pr = ccProj(), H = window.fbHubHost, f = H.FBS(); const cb = document.getElementById('ccCodeBar');
    return { pr: pr && pr.name, linked: pr && f.linksBack && f.linksBack[pr.id], keys: cb ? [...cb.querySelectorAll('button')].map(x => x.textContent.trim()) : null }; });
  ok(cs.pr === 'Harbour Garden' && cs.linked === r2.id, 'it opens the app as a project in Code, linked to it', cs);
  ok(cs.keys && cs.keys.indexOf('Keep in Fabrica') >= 0 && cs.keys.indexOf('Make it an app') >= 0, 'the Code session has Keep in Fabrica and Make it an app among its keys', cs.keys);
  await p.evaluate(async () => { const pr = ccProj(); await ccLoadAll(pr); const f = pr.files.find(x => x.name === 'index.html'); await ccPut(f, f.text.replace('Second page, with a change.', 'Third page, changed in Code.')); });
  await p.evaluate(() => { [...document.querySelectorAll('#ccCodeBar button')].find(x => x.textContent.trim() === 'Keep in Fabrica').click(); }); await sleep(1500);
  const sh3 = await p.evaluate(() => { const s = document.getElementById('r312Sheet'); const on = s && s.querySelector('.cc-prow[aria-pressed="true"]'); return { chosen: on && on.textContent, msg: s && s.querySelector('#r312Msg').value }; });
  await p.click('#r312Go'); await sleep(3000); const r3 = await repo();
  ok(/A new version of Harbour Garden/.test(sh3.chosen || '') && /Linked to this work/.test(sh3.chosen || '') && r3 && r3.versions === 3 && /Third page, changed in Code/.test(r3.text || ''), 'a change made in Code, kept, is the app\'s third version (the linked app chosen)', { sheet: sh3, versions: r3 && r3.versions });
  await p.evaluate(() => { closeModal(); }); await sleep(300);
  await p.evaluate(() => { [...document.querySelectorAll('#ccCodeBar button')].find(x => x.textContent.trim() === 'Make it an app').click(); }); await sleep(3000);
  const ad = await p.evaluate(() => { const d = state.buildDoc || {}, k = document.getElementById('bdKeepSmall'); return { page: document.querySelector('section.section.active').id, text: /Third page/.test(document.getElementById('codeEditor').value), repo: d.repo, keep: !!(k && !k.hidden) }; });
  ok(ad.page === 'page-build' && ad.text && ad.repo === r3.id && ad.keep, 'Make it an app opens the page in Adamas, linked back to Fabrica (its own Keep in Fabrica shows)', ad);
  // 3. Chat's + menu
  await p.evaluate(() => { go('chat'); }); await sleep(800);
  const pm = await p.evaluate(() => { const m = document.getElementById('chatPlusMenu'); paintPlus(); const it = [...m.querySelectorAll('.pm-item')].find(x => /One of your apps in Fabrica/.test(x.textContent)); return !!it; });
  ok(pm, 'Chat\'s + menu has One of your apps in Fabrica');
  await p.evaluate(() => { paintPlus('fabrica'); }); await sleep(1200);
  const pl = await p.evaluate(() => [...document.querySelectorAll('#chatPlusMenu .pm-item')].map(x => x.textContent.trim().slice(0, 40)));
  const n0 = await p.evaluate(() => stagedFiles.length);
  await p.evaluate(() => { [...document.querySelectorAll('#chatPlusMenu .pm-item')].find(x => /Harbour Garden/.test(x.textContent)).click(); }); await sleep(1500);
  const st = await p.evaluate(() => stagedFiles.map(f => f.name));
  ok(pl.some(x => /Harbour Garden/.test(x)) && st.length === n0 + 1 && st[st.length - 1] === 'index.html', 'its list has Harbour Garden; pressed, its page goes with the next message', { list: pl, staged: st });
  ok(!errs.length, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); })();
