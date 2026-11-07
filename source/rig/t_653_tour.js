// node rig/t_653_tour.js <out dir> master=<url> [full=<url>] [gift=<url>] [demo=<url>]
// Ingenium 6.53 (7 November 2026), in Chromium. (Who answers follows Effort, beside the model, which follows Choosing the model.) Her words (7 November 2026): "Please make sure that the guided tour and its
// demonstrations are also updated as well as the Guide page to reflect the latest pages and sections as well as updates recently made
// to Ingenium, they should all be properly updated to reflect the latest version of Ingenium, the same for all of the different
// editions of Ingeniums and its demos." (modules/r250.js)
//   in every edition given:
//   - the tour has the new cards, each after the card that shows that part of the page: Who answers, from any page (every level),
//     Connect a service, Context and compacting, How long it thinks; the master edition also The Offline Project, made from your apps
//     (and an edition without the Offline Project does not);
//   - each new card's ring is on the page once its card is shown (the tour is run to it);
//   - the Guide has the topics (Models and services, Context and compacting, Thinking and sources; the Offline Project in the master
//     edition), each filed in one of the Guide's rooms;
//   - Help's Chat page lists Choose who answers, the memory key and the slash commands;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const OUT = args[0]; fs.mkdirSync(OUT, { recursive: true });
const ED = {}; args.slice(1).forEach(a => { const m = /^(master|full|gift|demo)=(.+)$/.exec(a); if (m) ED[m[1]] = m[2]; });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const NEW = ['Who answers, from any page', 'Connect a service', 'Context and compacting', 'How long it thinks, and sources when you ask'];
const AFTER = { 'Who answers, from any page': 'Effort, beside the model', 'Connect a service': 'Who answers, from any page', 'Context and compacting': 'Controls', 'How long it thinks, and sources when you ask': 'Reading its thinking', 'The Offline Project, made from your apps': 'Fabrica' };
(async () => {
  const b = await pw.chromium.launch();
  for (const [ed, url] of Object.entries(ED)) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(3200);
    const info = await p.evaluate(() => { const bare = t => String(t || '').replace(/^[^A-Za-z]+/, '').trim();
      return { titles: ING_TOUR.map(s => bare(s.t)), offline: !!(window.IngOffline && typeof window.IngOffline === 'object'), who: (ING_TOUR.find(s => bare(s.t) === 'Who answers, from any page') || {}).levels || null }; });
    const want = NEW.concat(info.offline ? ['The Offline Project, made from your apps'] : []);
    const placed = want.map(t => { const i = info.titles.indexOf(t); return [t, i >= 0 && info.titles[i - 1] === AFTER[t]]; });
    ok(placed.every(x => x[1]), ed + ': the tour has the new cards, each after the card that shows that part of the page', placed);
    ok(info.offline ? true : info.titles.indexOf('The Offline Project, made from your apps') < 0, ed + ': the Offline Project\'s card only where the edition carries it (' + (info.offline ? 'carried' : 'not carried') + ')');
    ok(Array.isArray(info.who) && info.who.join() === 'new,some,expert', ed + ': Who answers is shown at every level', info.who);
    // each new card's ring is there once its card is shown
    const rings = [];
    for (const t of want) {
      const r = await p.evaluate((t) => { const bare = s => String(s || '').replace(/^[^A-Za-z]+/, '').trim(); const s = ING_TOUR.find(x => bare(x.t) === t); try { s.go(); } catch (e) { return { t, err: e.message }; } return { t }; }, t);
      await p.waitForTimeout(1200);
      const there = await p.evaluate((t) => { const bare = s => String(s || '').replace(/^[^A-Za-z]+/, '').trim(); const s = ING_TOUR.find(x => bare(x.t) === t); const rs = Array.isArray(s.ring) ? s.ring : [s.ring];
        return rs.some(q => { const e = document.querySelector(q); return !!(e && e.getBoundingClientRect().width > 0); }); }, t);
      rings.push([t, there, r.err || '']);
    }
    ok(rings.every(x => x[1]), ed + ': each new card rings an element that is on the page when its card is shown', rings);
    // the Guide
    await p.evaluate(() => go('guide')); await p.waitForTimeout(1200);
    const g = await p.evaluate(() => { const ids = ['whoGuide', 'ctxGuide', 'thinkGuide', 'opGuide'];
      return ids.map(id => { const c = document.getElementById(id); const room = c ? (c.closest('.rm-panel') || {}).getAttribute && c.closest('.rm-panel').getAttribute('data-room') : null; return [id, !!c, room || null]; }); });
    const gWant = g.filter(x => x[0] !== 'opGuide' || info.offline);
    ok(gWant.every(x => x[1] && x[2]), ed + ': the Guide has the new topics, each filed in a room', g);
    ok(info.offline || !g.find(x => x[0] === 'opGuide')[1], ed + ': no Offline Project topic where the edition does not carry it');
    // Help
    const h = await p.evaluate(() => { const P = window.IngHelp && IngHelp.pages; return P && P.chat ? P.chat.dos.map(d => d[0]) : null; });
    ok(h && ['Choose who answers, from any page', 'See and free the model\'s memory', 'Use a slash command'].every(x => h.indexOf(x) >= 0), ed + ': Help\'s Chat page lists Choose who answers, the memory key and the slash commands', h);
    await p.screenshot({ path: OUT + '/' + ed + '_guide.png' });
    ok(errs.length === 0, ed + ': no errors on the page', errs);
    await ctx.close();
  }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
