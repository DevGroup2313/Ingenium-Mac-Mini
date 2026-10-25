// Ingenium 6.7.1 · only the master edition can rename the app (editions.py, _fixed_name). The owner: "I only want the master
// version of the app that only I possess on my devices to have that feature and functionality on the Settings page, nowhere
// else." Checks, in Chromium, by the edition the page says it is:
//   master   Settings has the Name card; a name typed there shows in the top bar and on Home at once, and comes back to
//            Ingenium when the field is emptied; Help lists the field;
//   others   (full, gift, demo) Settings has no Name card and no field for it, with every setting shown; Find a setting finds
//            no way to rename; Help lists no Name field; with a name an older copy kept, the top bar, Home and every part
//            still say Ingenium, and the kept value is left as it was (shown nowhere);
//   all      no page errors.
//   node rig/t_671_name.js <url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 500) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  // an older copy kept another name
  await p.addInitScript(() => { try { const k = 'ingenium_v4'; const s = JSON.parse(localStorage.getItem(k) || '{}'); if (!s.appName) { s.appName = 'Forest Studio'; localStorage.setItem(k, JSON.stringify(s)); } } catch (e) { } });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  const ed = await p.evaluate(() => typeof ING_EDITION === 'string' ? ING_EDITION : '?');
  console.log('NOTE the edition: ' + ed);
  await p.evaluate(() => { go('settings'); if (window.IngRooms && IngRooms.all) IngRooms.all(true); }); await p.waitForTimeout(600);
  const s1 = await p.evaluate(() => ({ field: !!document.getElementById('setAppName'), card: [...document.querySelectorAll('#page-settings h2')].map(h => h.textContent.trim()).filter(t => /^name$/i.test(t)).length,
    words: /What this app is called/.test(document.getElementById('page-settings').textContent) }));
  // (Help's What is this? keeps a line for each control it can explain: IngHelp.map, from modules/r144.js)
  const help = await p.evaluate(() => { try { return JSON.stringify((window.IngHelp && IngHelp.map) || []); } catch (e) { return ''; } });
  if (!help || help.length < 100) ok(false, 'Help\'s list of controls is there to look in', help.length);
  if (ed === 'master') {
    ok(s1.field && s1.card === 1 && s1.words, 'the master edition: Settings has the Name card and its field', s1);
    const typed = await p.evaluate(async () => { const f = document.getElementById('setAppName'); f.value = 'Forest Studio'; f.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 200)); const a = { bar: document.getElementById('brandName').textContent, home: (document.getElementById('homeTitle') || {}).textContent, kept: state.appName };
      f.value = ''; f.dispatchEvent(new Event('input', { bubbles: true })); await new Promise(r => setTimeout(r, 200));
      return { a, back: document.getElementById('brandName').textContent }; });
    ok(typed.a.bar === 'FOREST STUDIO' && (!typed.a.home || typed.a.home === 'Forest Studio') && typed.a.kept === 'Forest Studio' && typed.back === 'INGENIUM',
      'the master edition: a name typed there shows in the top bar and on Home at once, and Ingenium comes back when the field is emptied', typed);
    ok(/#setAppName/.test(help), 'the master edition: Help lists the Name field', help.length);
  } else {
    ok(!s1.field && !s1.card && !s1.words, 'the ' + ed + ' edition: Settings has no Name card and no field to rename the app, with every setting shown', s1);
    const find = await p.evaluate(() => window.IngRooms && IngRooms.find ? IngRooms.find('rename').concat(IngRooms.find('app name')).map(h => h.title) : []);
    ok(!find.some(t => /name/i.test(t)), 'the ' + ed + ' edition: Find a setting finds no way to rename', find);
    ok(!/#setAppName|The app's name/.test(help), 'the ' + ed + ' edition: Help lists no Name field', help.length);
    const look = await p.evaluate(() => ({ kept: state.appName, bar: (document.getElementById('brandName') || {}).textContent, home: (document.getElementById('homeTitle') || {}).textContent, ask: typeof ingAppName === 'function' ? ingAppName() : '?' }));
    ok(look.bar === 'INGENIUM' && (!look.home || look.home === 'Ingenium') && look.ask === 'Ingenium', 'the ' + ed + ' edition: with a name an older copy kept, the top bar, Home and every part say Ingenium', look);
    ok(look.kept === 'Forest Studio', 'the ' + ed + ' edition: the kept value is left as it was (shown nowhere)', look.kept);
  }
  ok(!errs.length, 'no page errors', errs.slice(0, 3));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); process.exit(2); });
