// R123: Carpe Diem's five apps in Ingenium, opened as Carpe Diem opens them: full width with the Desk bar, the float key,
// floating windows that move, size, fill and close, each with its tab on the Desk bar (− folds a window away into its tab,
// the tab brings it back; there is no separate dock), a second document, and a window of its own with the work carried
// across, every side button beside it and one shared desk that only the main window writes. Also R123's fix to the
// thought panel: it follows day and night while open.
// node rig/t_desk.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
async function enter(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); }
const stones = (fc) => fc.evaluate(() => [...document.querySelectorAll('button')].filter(x => /^(Abacus|Imago|Scriba|Fontes|Tabula)$/.test(x.textContent.trim()) && x.offsetParent)
  .map(x => { const c = getComputedStyle(x); return x.textContent.trim() + ':' + (/Georgia/.test(c.fontFamily) ? 'serif' : 'sans') + '/' + (c.backgroundImage.indexOf('svg') >= 0 ? 'stone' : 'flat'); }));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const pops = []; ctx.on('page', np => pops.push(np));
  await p.goto(URL_); await enter(p);
  const nav = await p.evaluate(() => ({ p53: window.__ingParts.p53, nav: [...document.querySelectorAll('.nav-btn')].map(b => b.getAttribute('data-page')) }));
  ok(nav.p53 === 'running' && ['tabula', 'abacus', 'slides', 'scriba', 'fontes'].every(k => nav.nav.includes(k)), 'the desk part (p53) runs, and the side list has all five apps', nav.nav.join(','));

  // 1. Tabula opens full width, with the Desk pill and its own Close key
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(5000);
  const t1 = await p.evaluate(() => ({ s: IngDesk.state(), pill: document.getElementById('ing-deskbar').innerText.replace(/\n/g, '|'), top: document.getElementById('ing-deskbar').getBoundingClientRect().top,
    fr: (() => { const f = document.querySelector('#ing-desk iframe.on'); const r = f.getBoundingClientRect(); return [r.width, r.height]; })(), fab: !document.getElementById('fabFloat').hidden, notip: document.getElementById('ing-desk').getAttribute('data-notip') }));
  ok(t1.s.shown && t1.s.active === 'tabula' && t1.pill === 'Desk|Tabula|✕' && t1.top < 12 && t1.fr[0] === 1440 && t1.fr[1] === 900, 'Tabula opens full width with the Desk pill at the top, as in Carpe Diem', JSON.stringify(t1));
  ok(t1.fab && t1.notip === '1', 'the float key stands on the side column while an app is open, and the app is free of Ingenium\'s tooltips', JSON.stringify(t1));
  let fc = await (await p.$('#ing-desk iframe[data-app="tabula"]')).contentFrame();
  const t1s = await stones(fc);
  ok(['Abacus:serif/stone', 'Imago:serif/stone', 'Scriba:serif/stone', 'Fontes:serif/stone'].every(x => t1s.includes(x)), 'Tabula\'s app keys wear Carpe Diem\'s cut stones, in its serif', t1s.join(' '));
  const t1d = await fc.evaluate(() => ({ close: [...document.querySelectorAll('button')].filter(x => x.textContent.trim() === 'Close' && x.offsetParent).length, inj: ['cd-jewel-stones', 'cd-seal-css', 'cd-slate', 'cd-ink-anywhere', 'cd-sign-night-css', 'ing-stone-tags'].filter(id => document.getElementById(id)).length }));
  ok(t1d.close === 1 && t1d.inj === 6, 'it carries its own Close key and Carpe Diem\'s dress (stones, seal, pen, night ink)', JSON.stringify(t1d));
  await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); f.contentWindow.document.querySelectorAll('.ribbon, .rb, [class*=ribbon]').forEach(r => { try { r.scrollLeft = 99999; } catch (e) {} }); });
  await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/tabula-day.png' });
  // night
  await p.evaluate(() => { state.theme = 'night'; saveState(); applyTheme(); }); await p.waitForTimeout(1200);
  const tn = await fc.evaluate(() => ({ dark: document.documentElement.classList.contains('cd-dark') }));
  const tns = await stones(fc);
  ok(tn.dark && tns.includes('Abacus:serif/stone'), 'by night the app takes Carpe Diem\'s night dress, and the stones stay', JSON.stringify({ tn, tns }));
  await p.screenshot({ path: OUT + '/tabula-night.png' });
  await p.evaluate(() => { state.theme = 'day'; saveState(); applyTheme(); }); await p.waitForTimeout(600);

  // 2. Tabula's Abacus key opens Abacus, as Carpe Diem does
  await fc.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Abacus').click()); await p.waitForTimeout(4000);
  const t2 = await p.evaluate(() => ({ s: IngDesk.state(), pill: document.getElementById('ing-deskbar').innerText.replace(/\n/g, '|') }));
  ok(t2.s.active === 'abacus' && t2.s.open.join() === 'abacus' && t2.pill === 'Desk|Abacus|✕', 'Tabula\'s Abacus key opens Abacus in its place', JSON.stringify(t2));
  // Imago, Scriba and Fontes from Tabula's keys and the side list
  for (const [w, key, word] of [['slides', 'Imago', /Imago|slide/i], ['scriba', 'Scriba', /Scriba/], ['fontes', 'Fontes', /Fontes|source/i]]) {
    await p.evaluate((w) => go(w), w); await p.waitForTimeout(4000);
    const f = await (await p.$('#ing-desk iframe[data-app="' + w + '"]')).contentFrame();
    const txt = await f.evaluate(() => (document.body.innerText || '').slice(0, 2000));
    ok(word.test(txt) && (await p.evaluate(() => IngDesk.state().active)) === w, key + ' opens whole, as Carpe Diem carries it', txt.replace(/\s+/g, ' ').slice(0, 80));
    await p.screenshot({ path: OUT + '/' + w + '.png' });
  }
  await p.evaluate(() => { IngDesk.state().open.forEach(w => IngDesk.close(w)); go('tabula'); }); await p.waitForTimeout(4000);
  fc = await (await p.$('#ing-desk iframe[data-app="tabula"]')).contentFrame();
  await fc.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Imago' && x.offsetParent).click()); await p.waitForTimeout(3000);
  ok((await p.evaluate(() => IngDesk.state().active)) === 'slides', 'Tabula\'s Imago key opens Imago', await p.evaluate(() => IngDesk.state().active));
  await p.evaluate(() => { IngDesk.state().open.forEach(w => IngDesk.close(w)); go('tabula'); }); await p.waitForTimeout(3500);
  fc = await (await p.$('#ing-desk iframe[data-app="tabula"]')).contentFrame();
  /* in Tabula, as in Carpe Diem, Scriba is dictation into the page and Fontes is Tabula's own sources */
  await fc.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Fontes' && x.offsetParent).click()); await p.waitForTimeout(900);
  const fo = await fc.evaluate(() => { const m = document.getElementById('modalBack'); return { modal: !!m && m.classList.contains('open'), txt: m ? (document.getElementById('mTitle').textContent + ' | ' + document.getElementById('mBody').textContent).replace(/\s+/g, ' ').slice(0, 80) : '' }; });
  ok(fo.modal && (await p.evaluate(() => IngDesk.state().active)) === 'tabula', 'Tabula\'s Fontes key opens Tabula\'s own sources, as in Carpe Diem', JSON.stringify(fo));
  await fc.evaluate(() => document.getElementById('mClose').click());
  await p.waitForTimeout(400);
  await fc.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Scriba' && x.offsetParent).click()); await p.waitForTimeout(900);
  const sc = await fc.evaluate(() => { const b = document.getElementById('scribaBtn'); return { rec: b.classList.contains('recording'), body: (document.body.innerText.match(/(dictat|microphone|speech|Scriba)[^\n]{0,80}/i) || [''])[0] }; });
  ok((await p.evaluate(() => IngDesk.state().active)) === 'tabula', 'Tabula\'s Scriba key dictates in Tabula, as in Carpe Diem, and does not leave the page', JSON.stringify(sc));
  const dict = await p.evaluate(() => { const o = document.getElementById('scribaDictOverlay'); return !!o && o.style.display !== 'none'; });
  await fc.evaluate(() => { try { closeDictBox(); } catch (e) {} const b = document.getElementById('scribaBtn'); if (b.classList.contains('recording')) b.click(); });
  await p.evaluate(() => { const o = document.getElementById('scribaDictOverlay'); if (o) o.style.display = 'none'; });
  // 3. Desk brings Ingenium back; the pill stays to return
  await p.evaluate(() => [...document.querySelectorAll('#ing-deskbar button')].find(x => x.textContent === 'Desk').click()); await p.waitForTimeout(500);
  const t3 = await p.evaluate(() => ({ s: IngDesk.state(), desk: getComputedStyle(document.getElementById('ing-desk')).display, top: document.getElementById('ing-deskbar').getBoundingClientRect().top, fab: document.getElementById('fabFloat').hidden }));
  ok(!t3.s.shown && t3.desk === 'none' && t3.top >= 46 && t3.fab, 'Desk brings Ingenium back; the pill waits just under the top bar, and the float key steps away', JSON.stringify(t3));
  await p.screenshot({ path: OUT + '/desk.png' });
  await p.evaluate(() => [...document.querySelectorAll('#ing-deskbar button')].find(x => x.getAttribute('data-tab') === 'tabula').click()); await p.waitForTimeout(500);
  ok(await p.evaluate(() => IngDesk.state().shown && IngDesk.state().active === 'tabula'), 'its tab returns to it');
  // a Close from inside the app
  await p.evaluate(() => go('abacus')); await p.waitForTimeout(3500);
  const fa = await (await p.$('#ing-desk iframe[data-app="abacus"]')).contentFrame();
  await fa.evaluate(() => [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Close' && x.offsetParent).click()); await p.waitForTimeout(500);
  ok(await p.evaluate(() => IngDesk.state().open.indexOf('abacus') < 0), 'the app\'s own Close key closes it', JSON.stringify(await p.evaluate(() => IngDesk.state())));

  // 4. the float key: a window that moves, sizes, folds, fills and closes
  await p.evaluate(() => { IngDesk.state().open.forEach(w => IngDesk.close(w)); try { localStorage.removeItem('ing_fw_geo_tabula'); } catch (e) {} go('tabula'); }); await p.waitForTimeout(4000);
  fc = await (await p.$('#ing-desk iframe[data-app="tabula"]')).contentFrame();
  await fc.evaluate(() => { const e = document.getElementById('editor'); e.focus(); e.innerHTML = '<p>The difficulty was the point.</p>'; e.dispatchEvent(new Event('input', { bubbles: true })); });
  await p.waitForTimeout(800);
  await p.click('#fabFloat'); await p.waitForTimeout(4000);
  const f4 = await p.evaluate(() => { const w = document.querySelector('.ing-fw'); const r = w.getBoundingClientRect(); return { s: IngDesk.state(), keys: [...w.querySelectorAll('.ing-fw-keys button')].map(b => b.textContent), r: [r.left, r.top, r.width, r.height].map(Math.round), title: w.querySelector('.ing-fw-title').textContent }; });
  ok(f4.s.windows.join() === 'tabula' && !f4.s.shown && f4.keys.join(' ') === '↗ ＋ − □ ✕' && f4.title === 'Tabula', 'the float key sends the app into a window with Carpe Diem\'s five keys', JSON.stringify(f4));
  const fw = await (await p.$('.ing-fw iframe')).contentFrame();
  const kept = await fw.evaluate(() => (document.getElementById('editor') || {}).innerText || '');
  ok(/difficulty was the point/.test(kept), 'what was written goes with it', kept.slice(0, 60));
  await p.screenshot({ path: OUT + '/tabula-float.png' });
  const bar = await p.evaluate(() => { const r = document.querySelector('.ing-fw .ing-fw-title').getBoundingClientRect(); return { x: r.left + 20, y: r.top + r.height / 2 }; });
  await p.mouse.move(bar.x, bar.y); await p.mouse.down(); await p.mouse.move(bar.x - 160, bar.y + 40, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(200);
  const moved = await p.evaluate(() => { const r = document.querySelector('.ing-fw').getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top)]; });
  ok(Math.abs(moved[0] - (f4.r[0] - 160)) <= 2 && Math.abs(moved[1] - (f4.r[1] + 40)) <= 2, 'it moves by its bar', JSON.stringify({ from: f4.r, to: moved }));
  const we = await p.evaluate(() => { const r = document.querySelector('.ing-fw [data-edge="w"]').getBoundingClientRect(); return { x: r.left + 3, y: r.top + r.height / 2 }; });
  await p.mouse.move(we.x, we.y); await p.mouse.down(); await p.mouse.move(we.x - 60, we.y, { steps: 5 }); await p.mouse.up();
  const gp = await p.evaluate(() => { const r = document.querySelector('.ing-fw .ing-fw-grip').getBoundingClientRect(); return { x: r.left + 10, y: r.top + 10 }; });
  await p.mouse.move(gp.x, gp.y); await p.mouse.down(); await p.mouse.move(gp.x + 40, gp.y - 80, { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(200);
  const sized = await p.evaluate(() => { const r = document.querySelector('.ing-fw').getBoundingClientRect(); return { r: [r.left, r.width, r.height].map(Math.round), saved: JSON.parse(localStorage.getItem('ing_fw_geo_tabula') || 'null') }; });
  ok(Math.abs(sized.r[1] - (f4.r[2] + 100)) <= 3 && Math.abs(sized.r[2] - (f4.r[3] - 80)) <= 3 && sized.saved && sized.saved.w === sized.r[1], 'it sizes from its left edge and its corner, and remembers its place', JSON.stringify(sized));
  // − folds it away into its tab on the Desk bar (the owner asked for no separate dock); the tab brings it back
  const nd = await p.evaluate(() => !document.getElementById('ing-appsdock'));
  await p.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].find(b => b.textContent === '−').click()); await p.waitForTimeout(200);
  const folded = await p.evaluate(() => { const w = document.querySelector('.ing-fw'); const t = document.querySelector('#ing-deskbar [data-tab="tabula"]'); return { f: w.classList.contains('folded'), shown: getComputedStyle(w).display !== 'none', s: IngDesk.state(), tab: t.className, title: t.title }; });
  ok(nd && folded.f && !folded.shown && folded.s.windows.join() === 'tabula' && /folded/.test(folded.tab) && /folded away/.test(folded.title), '− folds the window away into its tab, drawn hollow, and no separate dock stands on the page', JSON.stringify({ nd, folded }));
  await p.screenshot({ path: OUT + '/folded-tab.png' });
  await p.evaluate(() => document.querySelector('#ing-deskbar [data-tab="tabula"]').click()); await p.waitForTimeout(300);
  const d2 = await p.evaluate(() => { const w = document.querySelector('.ing-fw'); return { f: w.classList.contains('folded'), shown: getComputedStyle(w).display !== 'none', front: IngDesk.state().front, tab: document.querySelector('#ing-deskbar [data-tab="tabula"]').className }; });
  ok(!d2.f && d2.shown && d2.front === 'tabula' && !/folded/.test(d2.tab), 'its tab brings the window back', JSON.stringify(d2));
  await p.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].find(b => b.textContent === '□').click()); await p.waitForTimeout(200);
  const full = await p.evaluate(() => { const r = document.querySelector('.ing-fw').getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map(Math.round); });
  await p.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].find(b => b.textContent === '□').click()); await p.waitForTimeout(200);
  ok(full[0] === 6 && full[1] === 46 && full[2] === 1428, 'it fills the screen and back', JSON.stringify({ full }));
  const pill4 = await p.evaluate(() => ({ t: document.getElementById('ing-deskbar').innerText.replace(/\n/g, '|'), on: [...document.querySelectorAll('#ing-deskbar .on')].map(b => b.getAttribute('data-tab')) }));
  ok(pill4.t === 'Desk|Tabula|✕' && pill4.on.join() === 'tabula', 'the pill keeps a tab for the floating window, lit while it is in front', JSON.stringify(pill4));
  // Desk folds the floating windows away; the window's tab brings it back
  await p.evaluate(() => [...document.querySelectorAll('#ing-deskbar button')].find(x => x.getAttribute('data-tab') === '__desk').click()); await p.waitForTimeout(300);
  const dk = await p.evaluate(() => ({ s: IngDesk.state(), on: [...document.querySelectorAll('#ing-deskbar .on')].map(b => b.getAttribute('data-tab')) }));
  await p.evaluate(() => [...document.querySelectorAll('#ing-deskbar button')].find(x => x.getAttribute('data-tab') === 'tabula').click()); await p.waitForTimeout(300);
  const dk2 = await p.evaluate(() => ({ s: IngDesk.state(), shown: getComputedStyle(document.querySelector('.ing-fw')).display !== 'none' }));
  ok(dk.s.folded.join() === 'tabula' && dk.on.join() === '__desk' && !dk2.s.folded.length && dk2.shown && dk2.s.front === 'tabula', 'Desk folds the floating windows away into their tabs, and a window\'s tab brings it back', JSON.stringify({ dk, dk2 }));
  // ＋ a second document
  await p.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].find(b => b.textContent === '＋').click()); await p.waitForTimeout(3500);
  const two = await p.evaluate(() => ({ w: IngDesk.state().windows, inst: (() => { const f = document.querySelector('#ing-fw-tabula-2 iframe'); return f && f.contentWindow.__CD_INSTANCE; })(), t: (document.querySelector('#ing-fw-tabula-2 .ing-fw-title') || {}).textContent }));
  ok(two.w.join() === 'tabula,tabula-2' && two.inst === 2 && two.t === 'Tabula · 2', '＋ opens a second document in its own window, kept apart (Carpe Diem\'s instance 2)', JSON.stringify(two));
  await p.screenshot({ path: OUT + '/two-windows.png' });
  const two2 = await p.evaluate(() => document.getElementById('ing-deskbar').innerText.replace(/\n/g, '|'));
  await p.evaluate(() => document.querySelector('#ing-deskbar [data-tabx="tabula-2"]').click()); await p.waitForTimeout(250);
  const two3 = await p.evaluate(() => ({ w: IngDesk.state().windows, t: document.getElementById('ing-deskbar').innerText.replace(/\n/g, '|') }));
  ok(two2 === 'Desk|Tabula|✕|Tabula (2)|✕' && two3.w.join() === 'tabula' && two3.t === 'Desk|Tabula|✕', 'the second window has its own tab, and its ✕ closes it', JSON.stringify({ two2, two3 }));
  await p.evaluate(() => { if (IngDesk.state().windows.includes('tabula-2')) IngDesk.closeWindow('tabula-2'); });

  // 5. ↗ a window of its own, the work carried across
  await p.evaluate(() => document.querySelector('.ing-fw [data-ing-export]').click()); await p.waitForTimeout(9000);
  const pop = pops[pops.length - 1];
  ok(!!pop && /#ingapp=tabula&tok=/.test(pop.url()), '↗ opens Tabula in a window of its own', pop && pop.url().replace(/^.*#/, '#'));
  if (pop) {
    await pop.setViewportSize({ width: 1180, height: 840 }); await pop.waitForTimeout(2500);
    const ps = await pop.evaluate(() => ({ s: IngDesk.state(), lite: document.documentElement.classList.contains('ing-lite'), title: document.title, rail: getComputedStyle(document.getElementById('fabBell')).display }));
    ok(ps.lite && ps.s.active === 'tabula' && ps.title === 'Tabula · Ingenium' && ps.rail === 'flex', 'that window shows the app, with the side buttons beside it', JSON.stringify(ps));
    const pf = await (await pop.$('#ing-desk iframe[data-app="tabula"]')).contentFrame();
    const ptxt = await pf.evaluate(() => (document.getElementById('editor') || {}).innerText || '');
    ok(/difficulty was the point/.test(ptxt), 'and holds what was written', ptxt.slice(0, 60));
    const before = await p.evaluate(() => localStorage.getItem(Object.keys(localStorage).find(k => /desk|ingenium/i.test(k) && localStorage.getItem(k).length > 1000) || ''));
    await pop.evaluate(() => { state.__liteProbe = 1; saveState(); }); await p.waitForTimeout(300);
    const after = await p.evaluate(() => localStorage.getItem(Object.keys(localStorage).find(k => /desk|ingenium/i.test(k) && localStorage.getItem(k).length > 1000) || ''));
    ok(before === after && !/__liteProbe/.test(after || ''), 'the window of its own never writes Ingenium\'s own desk', String((after || '').length));
    await pop.screenshot({ path: OUT + '/tabula-own-window.png' });
    // every side button stands above the app and works as on the main page; the windows share one desk
    const ids = ['fabBell', 'fabQuiet', 'fabPark', 'fabTheme', 'fabTimer', 'fabNote'];
    const sb = await pop.evaluate((ids) => ids.map(id => { const e = document.getElementById(id); const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return id + ':' + (getComputedStyle(e).display !== 'none' && !!top && e.contains(top) ? 'shown' : 'hidden'); }), ids);
    ok(sb.every(x => /shown$/.test(x)) && await pop.evaluate(() => getComputedStyle(document.getElementById('fabFloat')).display === 'none' && getComputedStyle(document.getElementById('ing-deskbar')).display === 'none'), 'that window carries every side button over the app, as the main page does', sb.join(' '));
    // the bell: a reminder added there is kept by the main window
    await pop.click('#fabBell'); await pop.waitForTimeout(400); await pop.fill('#remIn', 'Return the library books'); await pop.click('#remAdd'); await pop.waitForTimeout(300);
    await pop.screenshot({ path: OUT + '/own-window-bell.png' });
    await pop.click('#remClose'); await p.waitForTimeout(2600);
    const rm = await p.evaluate(() => ({ r: state.reminders.map(x => x.text), saved: (JSON.parse(localStorage.getItem('ingenium_v4') || '{}').reminders || []).map(x => x.text), badge: document.getElementById('bellBadge').textContent }));
    ok(rm.r.includes('Return the library books') && rm.saved.includes('Return the library books'), 'the bell there: the reminder reaches the main window, which keeps it', JSON.stringify(rm));
    // the main window's reminder reaches the window of its own
    await p.evaluate(() => { state.reminders.push({ text: 'Call the bursar' }); saveState(); bellRefresh(); }); await pop.waitForTimeout(2600);
    const rm2 = await pop.evaluate(() => ({ r: state.reminders.map(x => x.text), badge: document.getElementById('bellBadge').textContent }));
    ok(rm2.r.includes('Call the bursar') && rm2.badge === String(rm2.r.length), 'and the main window\'s reminders reach it, the bell\'s count with them', JSON.stringify(rm2));
    // the notes: a note made there is pinned over the app and kept by the main window
    const nn0 = await p.evaluate(() => (state.notes || []).length);
    await pop.evaluate(() => { const n = newStickyNote(); n.text = 'Chapter two: the archive'; saveState(); renderStickyPins(); }); await pop.waitForTimeout(400);
    const pin = await pop.evaluate(() => { const c = document.querySelector('.sticky-note'); if (!c) return null; const r = c.getBoundingClientRect(); const t = document.elementFromPoint(r.left + 20, r.top + r.height / 2); return { over: !!t && c.contains(t) }; });
    await pop.screenshot({ path: OUT + '/own-window-note.png' });
    await p.waitForTimeout(2600);
    const nn1 = await p.evaluate(() => ({ n: (state.notes || []).length, t: ((state.notes || [])[0] || {}).text, pinned: document.querySelectorAll('#notesLayer .sticky-note').length }));
    ok(pin && pin.over && nn1.n === nn0 + 1 && nn1.t === 'Chapter two: the archive' && nn1.pinned >= 1, 'a note made there stands over the app, and the main window pins and keeps it', JSON.stringify({ pin, nn0, nn1 }));
    // the 💭 thought panel (the new one) works there, and the thought reaches the main Inbox
    const pk0 = await p.evaluate(() => (state.parked || []).length);
    await pop.click('#fabPark'); await pop.waitForTimeout(700);
    const cloud = await pop.evaluate(() => { try { return IngInbox.tc.isOpen(); } catch (e) { return false; } });
    await pop.keyboard.type('Write to the press about the proofs'); await pop.waitForTimeout(200);
    await pop.screenshot({ path: OUT + '/own-window-thought.png' });
    await pop.evaluate(() => IngInbox.tc.keep()); await p.waitForTimeout(2800);
    const pk1 = await p.evaluate(() => ({ n: (state.parked || []).length, t: ((state.parked || [])[0] || {}).t }));
    ok(cloud && pk1.n === pk0 + 1 && pk1.t === 'Write to the press about the proofs', 'the thought panel opens there, and what it catches reaches the main Inbox', JSON.stringify({ cloud, pk0, pk1 }));
    // day and night, both ways
    await pop.click('#fabTheme'); await pop.waitForTimeout(2800);
    const th1 = await Promise.all([pop.evaluate(() => document.body.getAttribute('data-theme')), p.evaluate(() => document.body.getAttribute('data-theme'))]);
    await pop.screenshot({ path: OUT + '/own-window-night.png' });
    await p.evaluate(() => toggleTheme()); await p.waitForTimeout(2800);
    const th2 = await Promise.all([pop.evaluate(() => document.body.getAttribute('data-theme')), p.evaluate(() => document.body.getAttribute('data-theme'))]);
    ok(th1.join() === 'night,night' && th2.join() === 'day,day', 'night there turns the main window to night, and the main window\'s day comes back to it', JSON.stringify({ th1, th2 }));
    // the Clepsydra and the leaf open there, over the app
    await pop.click('#fabTimer'); await pop.waitForTimeout(500);
    const clep = await pop.evaluate(() => { const m = document.querySelector('#modalBox.pomo-card, .pomo-card, #clepsydraPanel, [id*=lepsydra]'); if (!m) return null; const r = m.getBoundingClientRect(); const t = document.elementFromPoint(r.left + r.width / 2, r.top + 30); return { id: m.id || m.className, over: !!t && m.contains(t) }; });
    await pop.screenshot({ path: OUT + '/own-window-clepsydra.png' });
    await pop.evaluate(() => { try { closeModalBox(); } catch (e) {} try { closeModal(); } catch (e) {} }); await pop.waitForTimeout(300);
    await pop.click('#fabQuiet'); await pop.waitForTimeout(500);
    const quiet = await pop.evaluate(() => { const q = document.getElementById('quietScreen'); return !!q && getComputedStyle(q).display !== 'none' && q.getBoundingClientRect().width > 0; });
    await pop.keyboard.press('Escape'); await pop.evaluate(() => { try { quietClose(); } catch (e) {} }); await pop.waitForTimeout(300);
    ok(!!clep && clep.over && quiet, 'the Clepsydra and the quiet screen open there over the app', JSON.stringify({ clep, quiet }));
    // Ingenium's own pages open in the main window
    await pop.evaluate(() => go('focus')); await p.waitForTimeout(2600);
    const gf = await p.evaluate(() => document.getElementById('page-focus').classList.contains('active'));
    const gt = await pop.evaluate(() => (document.getElementById('ingToast') || {}).textContent || '');
    ok(gf && /main window/.test(gt), 'a page asked for there opens in the main window, and it says so', JSON.stringify({ gf, gt }));
    // still: the window of its own never writes the saved desk
    const dk0 = await p.evaluate(() => localStorage.getItem('ingenium_v4'));
    await pop.evaluate(() => { state.__liteProbe2 = 1; saveState(); }); await pop.waitForTimeout(600);
    const dk1 = await p.evaluate(() => localStorage.getItem('ingenium_v4'));
    ok(!/__liteProbe/.test(dk1 || ''), 'and the window of its own still never writes the saved desk itself', String((dk1 || '').length));
  }
  const t5 = await p.evaluate(() => IngDesk.state());
  ok(t5.windows.length === 0, 'once the new window holds it, the floating one lets it go', JSON.stringify(t5));

  // 6. where the browser keeps no window, the app stays and the reason is given
  await p.evaluate(() => { go('abacus'); }); await p.waitForTimeout(3000); await p.click('#fabFloat'); await p.waitForTimeout(3000);
  await p.evaluate(() => { window.__openWas = window.open; window.open = () => null; document.querySelector('.ing-fw [data-ing-export]').click(); }); await p.waitForTimeout(11000);
  const t6 = await p.evaluate(() => ({ w: IngDesk.state().windows, t: (document.getElementById('ingToast') || document.querySelector('.toast') || {}).textContent || '' }));
  await p.evaluate(() => { window.open = window.__openWas; });
  ok(t6.w.join() === 'abacus' && /kept no new window/.test(t6.t), 'a blocked window leaves Abacus where it was, and says why', JSON.stringify(t6));

  // 7. the Mac and Windows apps: the app opens the window and carries the work, the page lets go once it is taken
  const t7 = await p.evaluate(() => new Promise(res => { const calls = []; let taken = false;
    window.pywebview = { api: { open_lite: (j) => { calls.push(JSON.parse(j)); setTimeout(() => { taken = true; }, 600); return Promise.resolve({ ok: true }); }, lite_taken: () => Promise.resolve(taken), lite_cancel: () => Promise.resolve(true), big_put: () => 1 } };
    const can = IngDesk.canExport(); IngDesk.exportWindow('abacus');
    setTimeout(() => res({ can, calls, w: IngDesk.state().windows }), 2500); }));
  ok(t7.can && t7.calls.length === 1 && t7.calls[0].which === 'abacus' && /#ingapp=abacus&tok=/.test(t7.calls[0].url) && t7.w.length === 0, 'in the desktop app, ↗ asks the app for the window, hands the work across and lets go once it is taken', JSON.stringify(t7).slice(0, 300));
  await p.evaluate(() => { go('fontes'); }); await p.waitForTimeout(2500); await p.click('#fabFloat'); await p.waitForTimeout(2500);
  const t7b = await p.evaluate(() => new Promise(res => { let cancelled = false;
    window.pywebview = { api: { open_lite: () => Promise.resolve({ ok: false, why: 'safety' }), lite_taken: () => false, lite_cancel: () => { cancelled = true; }, big_put: () => 1 } };
    IngDesk.exportWindow('fontes'); setTimeout(() => res({ w: IngDesk.state().windows, t: (document.getElementById('ingToast') || {}).textContent || '' }), 800); }));
  ok(t7b.w.join() === 'fontes' && /closed unexpectedly last time/.test(t7b.t), 'after a bad ending the app keeps Fontes here, and says why', JSON.stringify(t7b));
  const t7c = await p.evaluate(() => { window.pywebview = { api: { big_put: () => 1 } }; const can = IngDesk.canExport(); delete window.pywebview; return can; });
  ok(t7c === false, 'a desktop app without the window call offers no ↗ at all, rather than a key that fails', t7c);
  await p.evaluate(() => { IngDesk.closeWindow('fontes'); });

  // 8. the thought panel follows day and night while it is open
  await p.keyboard.press('Control+Period'); await p.waitForTimeout(600);
  const n0 = await p.evaluate(() => document.querySelector('.tc-cloud').getAttribute('data-tc-night'));
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(300);
  const n1 = await p.evaluate(() => document.querySelector('.tc-cloud').getAttribute('data-tc-night'));
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(300);
  const n2 = await p.evaluate(() => document.querySelector('.tc-cloud').getAttribute('data-tc-night'));
  ok(n0 === '0' && n1 === '1' && n2 === '0', 'the thought panel turns to night and back to day while it is open', [n0, n1, n2].join(' '));
  await p.keyboard.press('Escape');
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await ctx.close();

  // 9. on a Fire tablet's own app (Android web view) there is no second window: no ↗ in the floating window
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent: 'Mozilla/5.0 (Linux; Android 11; KFTRWI; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0 Safari/537.36' });
  const q = await ctx2.newPage(); await q.goto(URL_); await enter(q);
  await q.evaluate(() => go('tabula')); await q.waitForTimeout(4000); await q.click('#fabFloat'); await q.waitForTimeout(3000);
  const t9 = await q.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].map(b => b.textContent).join(' '));
  ok(t9 === '＋ − □ ✕', 'in the Fire app the floating window has no ↗, since a second window cannot be had there', t9);
  await q.screenshot({ path: OUT + '/fire-float.png' });
  await ctx2.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.message); process.exit(2); });
