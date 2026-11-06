// node rig/t_643_side.js <Ingenium page url> <out dir>
// Ingenium 6.43 (6 November 2026): the Author Studio's second stage, the Side bar room (modules/r236.js; the master edition). As
// Carpe Diem's Author Studio has it: the order of the pages in each group of the side bar, and which pages it shows. Checks:
//   - the rail and the Editor offer the Side bar; the room lists each group with its pages, Up, Down and Shown; Home and Settings
//     cannot be hidden
//   - Focus moved up in its group: the side bar's order changes, and is kept; Lector hidden: its key leaves the side bar, the page
//     still opens
//   - after a reload both are still so
//   - each change is in the change log with Undo; Undo brings back the order and the key
//   - the built order key gives everything back; Reset all clears it; Export all carries it and Import all brings it back
//   - the top bar: Display, Studio, About, Help (her note: About back before Help, the Studio key before About)
//   - the room is in the app's scale; no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(3200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
const navOrder = (p) => p.evaluate(() => [...document.querySelectorAll('nav.dock .nav-btn[data-page]')].map(b => b.getAttribute('data-page') + (getComputedStyle(b).display === 'none' ? '(hidden)' : '')));
const studioGroup = (o) => o.slice(0, o.indexOf('build') >= 0 ? o.indexOf('build') : o.length);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  const o0 = await navOrder(p);
  // 0. the top bar: Display, Studio, About, Help
  const bar = await p.evaluate(() => { const ids = ['displayBtn', 'auTopKey', 'aboutBtn']; const help = [...document.querySelectorAll('button')].find(b => /^Help/.test(b.textContent.trim()) && b.offsetParent && b.getBoundingClientRect().top < 60);
    const els = ids.map(id => document.getElementById(id)).concat([help]); if (els.some(e => !e)) return { missing: ids.filter(id => !document.getElementById(id)).concat(help ? [] : ['help']) };
    const xs = els.map(e => Math.round(e.getBoundingClientRect().left)); return { xs, order: els.map(e => e.id || 'help'), adjacent: els[1].nextElementSibling === els[2] }; });
  ok(bar.xs && bar.xs[0] < bar.xs[1] && bar.xs[1] < bar.xs[2] && bar.xs[2] < bar.xs[3] && bar.adjacent, 'the top bar reads Display, Studio, About, Help (the Studio key right before About)', bar);
  await p.screenshot({ path: OUT + '/top_bar.png', clip: { x: 700, y: 0, width: 740, height: 44 } });
  // 1. the room
  await p.evaluate(() => IngAuthor.open('side')); await p.waitForTimeout(500);
  const room = await p.evaluate(() => { const r = document.getElementById('auRoom'); const rows = [...r.querySelectorAll('.au-srow')];
    const cs = (e) => e ? getComputedStyle(e) : {};
    return { rail: !!document.getElementById('auR-side'), groups: [...r.querySelectorAll('.au-sgh')].map(h => h.textContent), rows: rows.map(x => x.getAttribute('data-page')),
      homeLocked: (() => { const x = rows.find(y => y.getAttribute('data-page') === 'home'); return !!x && x.querySelector('input').disabled; })(),
      settingsLocked: (() => { const x = rows.find(y => y.getAttribute('data-page') === 'settings'); return !!x && x.querySelector('input').disabled; })(),
      h3: cs(r.querySelector('.au-card h3')).fontSize, keys: [...r.querySelectorAll('button')].map(k => parseFloat(cs(k).fontSize)), rowFs: cs(rows[0]).fontSize,
      editor: (() => { IngAuthor.room('editor'); const t = [...document.querySelectorAll('#auRoom .au-kind b')].map(x => x.textContent); IngAuthor.room('side'); return t; })() }; });
  ok(room.rail && room.groups.includes('Studio') && room.groups.includes('Learn') && room.rows.includes('focus') && room.rows.includes('lector') && room.editor.includes('Its side bar'),
    'the rail and the Editor offer the Side bar; the room lists each group with its pages', room);
  ok(room.homeLocked && room.settingsLocked, 'Home and Settings cannot be hidden', [room.homeLocked, room.settingsLocked]);
  ok(room.h3 === '16.5px' && room.keys.every(f => f <= 13) && room.rowFs === '13px', 'the room is in the app\'s scale (16.5px heading, 13px rows, small keys)', room);
  // 2. Focus up, Lector hidden
  const sg0 = studioGroup(o0); const fi = sg0.indexOf('focus');
  await p.evaluate(() => { const li = [...document.querySelectorAll('#auRoom .au-srow')].find(x => x.getAttribute('data-page') === 'focus'); [...li.querySelectorAll('button')].find(k => k.textContent === 'Up').click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { const li = [...document.querySelectorAll('#auRoom .au-srow')].find(x => x.getAttribute('data-page') === 'lector'); const cb = li.querySelector('input'); cb.checked = false; cb.dispatchEvent(new Event('change')); }); await p.waitForTimeout(400);
  const o1 = await navOrder(p), sg1 = studioGroup(o1);
  ok(sg1.indexOf('focus') === fi - 1 && sg1[fi] === sg0[fi - 1], 'Focus moved up one place in the side bar\'s Studio group', [sg0, sg1]);
  ok(o1.includes('lector(hidden)') && !o1.includes('home(hidden)'), 'Lector\'s key left the side bar', o1);
  const opens = await p.evaluate(() => { IngAuthor.close(); go('lector'); return (document.querySelector('.section.active') || {}).id; });
  ok(opens === 'page-lector', 'a hidden page still opens (from Home, Help or the tour)', opens);
  // 3. a reload
  await p.reload(); await boot(p);
  const o2 = await navOrder(p);
  ok(JSON.stringify(o2) === JSON.stringify(o1), 'after a reload the order and the hidden key are as they were left', [o1, o2]);
  // 4. the change log and Undo
  const logs = await p.evaluate(() => IngAuthor.log().filter(e => e.kind === 'side').map(e => e.label));
  ok(logs.length === 2 && /Hid Lector/.test(logs[0]) && /Moved Focus up/.test(logs[1]), 'each change is in the change log', logs);
  await p.evaluate(() => { const e = IngAuthor.log().find(x => !x.undone); IngAuthor.undo(e && e.id); }); await p.waitForTimeout(300);
  const o3 = await navOrder(p);
  ok(!o3.includes('lector(hidden)') && JSON.stringify(studioGroup(o3)) === JSON.stringify(sg1.map(x => x.replace('(hidden)', ''))), 'Undo shows Lector again and keeps the order', o3);
  await p.evaluate(() => { const e = IngAuthor.log().find(x => !x.undone); IngAuthor.undo(e && e.id); }); await p.waitForTimeout(300);
  const o4 = await navOrder(p);
  ok(JSON.stringify(o4) === JSON.stringify(o0), 'a second Undo gives back the built order', [o0, o4]);
  // 5. built order key, Reset all, Export and Import
  await p.evaluate(() => { IngAuthor.open('side'); const li = [...document.querySelectorAll('#auRoom .au-srow')].find(x => x.getAttribute('data-page') === 'blend'); const cb = li.querySelector('input'); cb.checked = false; cb.dispatchEvent(new Event('change')); }); await p.waitForTimeout(300);
  const exported = await p.evaluate(() => JSON.parse(IngAuthor.exportAll()));
  ok(exported.author && exported.author.side && (exported.author.side.hidden || []).includes('blend'), 'Export all carries the side bar', exported.author && exported.author.side);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#auRoom button')].find(x => /built with, every page shown/.test(x.textContent)); k.click(); }); await p.waitForTimeout(300);
  const o5 = await navOrder(p);
  ok(JSON.stringify(o5) === JSON.stringify(o0), 'the built order key gives everything back', o5);
  await p.evaluate((d) => IngAuthor.importText(JSON.stringify(d)), exported); await p.waitForTimeout(300);
  ok((await navOrder(p)).includes('blend(hidden)'), 'Import all brings the side bar back');
  await p.evaluate(() => { const s = state.author; s.side = s.side || {}; });
  await p.evaluate(() => IngAuthor.resetAll()); await p.waitForTimeout(500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('.ing-dlg-root button, button')].reverse().find(x => x.offsetParent && /^Reset all$/.test(x.textContent.trim()) && !x.closest('#ingAuthor')); if (k) k.click(); }); await p.waitForTimeout(600);
  const o6 = await navOrder(p), side6 = await p.evaluate(() => JSON.stringify(state.author.side || {}));
  ok(JSON.stringify(o6) === JSON.stringify(o0) && side6 === '{}', 'Reset all gives the side bar back as it was built', [o6, side6]);
  await p.screenshot({ path: OUT + '/side_room.png' });
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
