// R118: Tabula and Abacus, whole. Her own single-page apps ride inside the page and open in a frame on their pages;
// Ingenium hosts them: saves their files, follows their theme, hands them a document or a table, opens one from the other.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p49 === 'running' && parts.p48 === 'running', 'the apps part (p49) runs', JSON.stringify({ p48: parts.p48, p49: parts.p49 }));

  // 1. the apps ride inside the page, whole
  const ride = await p.evaluate(() => { const t = IngApps2.decode('ing-app-tabula'), a = IngApps2.decode('ing-app-abacus'); return { t: t ? t.length : 0, a: a ? a.length : 0, tt: t && (t.match(/<title>(.*?)<\/title>/) || [])[1], at: a && (a.match(/<title>(.*?)<\/title>/) || [])[1], prepped: /__CD_NOCLOSE=1/.test(IngApps2.prep('tabula')) && /cd-theme-apply/.test(IngApps2.prep('abacus')) && /__ingImportCSV=/.test(IngApps2.prep('abacus')) && /kind:"carpe-save"/.test(IngApps2.prep('abacus')) && /html\.cd-dark/.test(IngApps2.prep('abacus')) }; });
  ok(ride.t > 600000 && ride.a > 300000 && ride.tt === 'Tabula preview' && ride.at === 'Abacus preview', 'the whole Tabula (over 600 KB) and Abacus (over 300 KB) are inside the page, decoded intact', JSON.stringify(ride));
  ok(ride.prepped, 'each is prepared for its host: no Close key, the theme bridge, Carpe Diem\'s night dress, and Abacus saving through the host', String(ride.prepped));

  // 2. the small tablet's page is handed over once; the whole Tabula opens with it
  await p.evaluate(() => { try { ['tabula_incoming', 'tabula_autosave', 'tabula_docs', 'abacus_auto_v1_en', 'abacus_book_v1'].forEach(k => localStorage.removeItem(k)); } catch (e) {}
    state.tabulaDoc = { title: 'My lite page', body: '<p>Words from the small tablet, kept.</p>' }; state.abacus = { cols: 6, rows: 8, cells: {} };
    for (const [k, v] of [['0:0', 'Item'], ['0:1', 'Qty'], ['1:0', 'Pens'], ['1:1', '3'], ['2:0', 'Ink'], ['2:1', '=B2*2']]) state.abacus.cells[k] = v; saveState(); go('tabula'); });
  await p.waitForSelector('#ing-desk iframe[data-app="tabula"]'); await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return !!(f.contentWindow.document.getElementById('editor') && f.contentWindow.document.getElementById('editor').innerText.length); } catch (e) { return false; } }, null, { timeout: 30000 }); await p.waitForTimeout(800);
  const tab = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; return { text: d.getElementById('editor').innerText.slice(0, 120), title: (d.getElementById('docTitle') || {}).value, incoming: localStorage.getItem('tabula_incoming'), handed: state.tabulaDoc.handed, dark: d.documentElement.classList.contains('cd-dark'), h: f.getBoundingClientRect().height, lede: document.querySelector('#page-tabula .lede').textContent.slice(0, 40), hero: getComputedStyle(document.querySelector('#page-tabula .hero')).display }; });
  ok(/Words from the small tablet, kept/.test(tab.text) && tab.title === 'My lite page', 'the whole Tabula opens with the small tablet\'s page and its title', JSON.stringify({ text: tab.text, title: tab.title }));
  ok(tab.incoming === null && !!tab.handed && tab.h > 500 && !tab.dark && /whole/.test(tab.lede), 'the handover is taken once and cleared; the frame is tall; by day the app is light; the page says it is whole', JSON.stringify({ incoming: tab.incoming, handed: !!tab.handed, h: Math.round(tab.h), dark: tab.dark, hero: tab.hero }));
  await p.screenshot({ path: OUT + '/apps-tabula.png' });
  // night follows
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); });
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return f.contentWindow.document.documentElement.classList.contains('cd-dark'); } catch (e) { return false; } }, null, { timeout: 5000 }).then(() => ok(true, 'Ingenium\'s night reaches the app at once (cd-dark)'), () => ok(false, 'Ingenium\'s night reaches the app at once (cd-dark)'));
  await p.evaluate(() => { state.theme = 'light'; applyTheme(); }); await p.waitForTimeout(400);

  // 3. Lector's document goes the same way, each time
  /* R123: Tabula is already open on the Desk, so Lector's document goes into it as Carpe Diem sends one to a running
     Tabula: added to the page under its title, and no second Tabula is built on the old hidden page */
  await p.evaluate(() => { state.tabulaDoc = { title: '', body: '' }; saveState(); lxToTabula('From Lector', '## Dossier\n\nA paragraph written by Lector.'); });
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return /paragraph written by Lector/.test(f.contentWindow.document.getElementById('editor').innerText); } catch (e) { return false; } }, null, { timeout: 30000 }).then(() => ok(true, 'a document opened from Lector arrives in the whole Tabula'), () => ok(false, 'a document opened from Lector arrives in the whole Tabula'));
  const t2 = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const hs = [...f.contentWindow.document.querySelectorAll('#editor h2')].map(h => h.textContent); return { hs, hidden: !!document.getElementById('ingApp-tabula'), frames: document.querySelectorAll('iframe[data-app="tabula"]').length, page: IngDesk.state().active }; });
  ok(t2.hs.includes('From Lector') && !t2.hidden && t2.frames === 1 && t2.page === 'tabula', 'with its title, in the one Tabula on the Desk (none built on the hidden page)', JSON.stringify(t2));

  // 4. Abacus: the small grid's cells go over once (formulas as their values), and a table sent from elsewhere replaces the book
  await p.evaluate(() => go('abacus'));
  await p.waitForSelector('#ing-desk iframe[data-app="abacus"]'); await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { const w = f.contentWindow; const bk = w.__ingBook && w.__ingBook(); return bk && bk.data.A1 === 'Item' && bk.data.B3 === '6'; } catch (e) { return false; } }, null, { timeout: 30000 }).then(() => ok(true, 'the whole Abacus opens with the small grid\'s cells'), () => ok(false, 'the whole Abacus opens with the small grid\'s cells'));
  const ab = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); const w = f.contentWindow; const bk = w.__ingBook(); return { b2: bk.data.B2, b3: bk.data.B3, a3: bk.data.A3, title: bk.title, handed: state.abacus.handed, cells: w.document.querySelectorAll('td').length, importCSV: typeof w.__ingImportCSV }; });
  ok(ab.b2 === '3' && ab.b3 === '6' && ab.a3 === 'Ink' && ab.title === 'From the small grid' && ab.handed === true && ab.cells > 50, 'its figures are there, a formula as its value, under a title; the grid is drawn', JSON.stringify(ab));
  await p.evaluate(() => { abacusImportCsv('Name,Mark\nAda,9\nGrace,8\n'); const h = document.getElementById('abacusHost'); h.innerHTML = ''; go._abacusBuilt = false; go('abacus'); });
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { const w = f.contentWindow; const bk = w.__ingBook && w.__ingBook(); return bk && bk.data.A1 === 'Name' && bk.data.B3 === '8'; } catch (e) { return false; } }, null, { timeout: 30000 }).then(() => ok(true, 'a table sent to Abacus from elsewhere (as a reply\'s sheet is) fills the whole app'), () => ok(false, 'a table sent to Abacus from elsewhere fills the whole app'));
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(700);
  await p.screenshot({ path: OUT + '/apps-abacus-night.png' });
  await p.evaluate(() => { state.theme = 'light'; applyTheme(); });

  // 4b. prepared as Carpe Diem prepares it: the old bottom bar hidden, a second sheet added with +, the frame reaching the window's foot
  const cdp = await p.evaluate(async () => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'), w = f.contentWindow, d = w.document; const tb = d.querySelector('.tabs-bottom');
    const sheets = () => [...d.querySelectorAll('.ab-sheet')].filter(e => /^Sheet \d+$/.test(e.textContent.trim())).length; const before = sheets(); const add = [...d.querySelectorAll('button')].find(b => b.title === 'Add a sheet'); if (add) add.click(); await new Promise(r => setTimeout(r, 600));
    const after = sheets(); const r = f.getBoundingClientRect(); return { oldBarHidden: !tb || w.getComputedStyle(tb).display === 'none', addTitle: !!add, before, after, bottomGap: Math.round(innerHeight - r.bottom) }; });
  ok(cdp.oldBarHidden && cdp.addTitle && cdp.after === cdp.before + 1, "Abacus is prepared as Carpe Diem prepares it: its old bottom bar hidden, and Add a sheet adds a sheet", JSON.stringify(cdp));
  ok(cdp.bottomGap >= 0 && cdp.bottomGap <= 40, 'the frame reaches the foot of the window, so the status line is in view', String(cdp.bottomGap));
  await p.evaluate(() => go('tabula')); await p.waitForTimeout(1500);
  const tfold = await p.evaluate(() => { const d = document.querySelector('#ing-desk iframe[data-app="tabula"]').contentWindow.document; return { fold: !!d.getElementById('cd-802-foldbar'), pages: !!d.getElementById('cd-realpages'), fab: (() => { const e = d.querySelector('.sticky-fab'); return !e || getComputedStyle(e).display === 'none'; })() }; });
  ok(tfold.fold && tfold.pages && tfold.fab, "Tabula is prepared as Carpe Diem prepares it: its fold bar, its real pages, no second notes key", JSON.stringify(tfold));
  await p.evaluate(() => go('abacus')); await p.waitForTimeout(600);

  // 5. the host's duties: a file the app makes is saved by Ingenium; the app's keys open one another
  const saved = await p.evaluate(async () => { window.__saved = null; saveFileNative = function (name, mime, data) { window.__saved = { name, mime, text: new TextDecoder().decode(data) }; };
    const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); f.contentWindow.__ingSaveFile('test.csv', 'text/csv', 'a,b\n1,2'); await new Promise(r => setTimeout(r, 400)); return window.__saved; });
  ok(saved && saved.name === 'test.csv' && saved.mime === 'text/csv' && saved.text === 'a,b\n1,2', 'Abacus hands a file to Ingenium, which saves it on the device', JSON.stringify(saved));
  const opened = await p.evaluate(async () => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); f.contentWindow.eval("parent.postMessage({kind:'carpe-open',which:'tabula'},'*')"); await new Promise(r => setTimeout(r, 500)); const s = IngDesk.state(); return s.shown && s.active === 'tabula' ? 'tabula on the Desk' : JSON.stringify(s); });
  ok(opened === 'tabula on the Desk', 'Abacus\'s Tabula key opens Tabula on the Desk', opened);
  const bar = await p.evaluate(() => [...document.querySelectorAll('#tabulaHost .ing-app-bar button')].map(b => b.textContent));
  /* R123: the old page bar (whose "Open in its own window" key the browser blocked) is gone; the float key and ↗ take its place */
  ok(bar.length === 0 && await p.evaluate(() => !!document.getElementById('fabFloat')), 'the old bar above the app is gone, and the float key takes its place', bar.join(','));

  // 6. the export carries the apps' own stores; the tour's words are updated
  await p.evaluate(() => { try { localStorage.setItem('tabula_autosave', JSON.stringify({ html: '<p>kept</p>' })); localStorage.setItem('abacus_auto_v1_en', JSON.stringify({ t: 'Book', data: { A1: 'x' } })); } catch (e) {} window.__saved = null; saveFileNative = function (name, mime, data) { const u8 = data instanceof Uint8Array ? data : new Uint8Array(data); const names = []; for (let i = 0; i + 46 <= u8.length; i++) { if (u8[i] === 0x50 && u8[i + 1] === 0x4b && u8[i + 2] === 1 && u8[i + 3] === 2) { const n = u8[i + 28] | (u8[i + 29] << 8); names.push(new TextDecoder().decode(u8.subarray(i + 46, i + 46 + n))); } } window.__saved = { name, names }; }; go('settings'); openExport(); });
  await p.waitForTimeout(700);
  await p.evaluate(() => { ['exChats', 'exChatsJson', 'exNotes', 'exDocs', 'exSources', 'exSettings', 'exLector', 'exFabrica'].forEach(id => { const c = document.getElementById(id); if (c) c.checked = false; }); document.getElementById('exApps').checked = true; document.getElementById('exGo').click(); });
  await p.waitForFunction(() => !!window.__saved, null, { timeout: 30000 });
  const ex = await p.evaluate(() => window.__saved);
  ok(ex && ex.names.includes('apps/tabula-store.json') && ex.names.includes('apps/abacus-store.json'), 'the export carries Tabula\'s and Abacus\'s own stores', JSON.stringify(ex && ex.names));
  const tour = await p.evaluate(() => (ING_TOUR.find(s => s.sub === 'Tabula and Abacus') || {}).b);
  ok(/whole/.test(tour || '') && /window of its own/.test(tour || ''), 'the tour describes the whole apps', (tour || '').slice(0, 80));

  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
