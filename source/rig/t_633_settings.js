// Settings without the long scroll (Ingenium 6.33, modules/r234.js). Her words (5 November 2026): "The "Your data" tab page of the
// Settings page needs to be redesigned and reorganised because its still a lot of scrolling on all of its tabs."
//   node rig/t_633_settings.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1500))); c ? pass++ : fail++; };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('settings'); });
  await p.waitForTimeout(900);
  const vis = id => p.evaluate(id => { const e = document.getElementById(id); return !!(e && e.offsetParent !== null && e.getBoundingClientRect().height > 0); }, id);

  /* 1. Your data: four sections, one at a time, each about a window tall (6.28: 2,792, and 3,281 with Moving open) */
  await p.evaluate(() => IngRooms.open('settings', 'data', false)); await p.waitForTimeout(900);
  const d0 = await p.evaluate(() => ({ tabs: [...document.querySelectorAll('#rmP-settings-data .dx-tab')].filter(t => !t.hidden).map(t => t.textContent.trim()), cur: IngSettingsParts.show('data'),
    says: (document.getElementById('dxSays-data') || {}).textContent || '' }));
  ok(d0.tabs.join('|') === 'Bring in|Back up and move|Storage|Sign-in and reset' && d0.cur === 'in' && /brought in/.test(d0.says), 'Your data has four sections, opening on Bring in, with its line', d0);
  const DH = {}, DV = {};
  for (const [k, ids] of [['in', ['ingImportCard']], ['backup', ['bkCard']], ['storage', ['stxCard']], ['lock', ['ingLockCard']]]) {
    await p.click('#dxT-data-' + k); await p.waitForTimeout(500);
    if (k === 'backup') { await p.click('#bkTab-move'); await p.waitForTimeout(400); }
    DH[k] = await p.evaluate(() => document.scrollingElement.scrollHeight);
    DV[k] = await p.evaluate(() => [...document.querySelectorAll('#rmP-settings-data > .card')].filter(c => c.offsetParent !== null).map(c => c.id || ((c.querySelector('h2') || {}).textContent || '').trim()));
  }
  ok(DV.in.join() === 'ingImportCard' && DV.backup.join() === 'bkCard' && DV.storage.join() === 'stxCard' && DV.lock.join() === 'ingLockCard,Data on this device', 'each section shows its own cards: Sign-in and reset holds the sign-in and the one-file backup with Reset everything', DV);
  ok(Object.values(DH).every(h => h <= 1750), 'each section of Your data is at most 1,750 pixels tall at 1440 by 900, Moving open included (it was 3,281)', DH);

  /* 2. Backup's Moving two by two; Storage in two columns with the library below */
  await p.click('#dxT-data-backup'); await p.waitForTimeout(300); await p.click('#bkTab-move'); await p.waitForTimeout(300);
  const mv = await p.evaluate(() => { const ol = document.getElementById('bkSteps'), li = [...ol.children]; const r = li.map(x => x.getBoundingClientRect()); return { cols: getComputedStyle(ol).gridTemplateColumns.split(' ').length, rows: new Set(r.map(x => Math.round(x.top))).size, n: li.length }; });
  ok(mv.n === 4 && mv.cols === 2 && mv.rows === 2, 'Moving shows its four steps two by two', mv);
  await p.click('#dxT-data-storage'); await p.waitForTimeout(400);
  const st = await p.evaluate(() => { const cols = document.querySelector('#stxCard .dx-cols'); if (!cols) return null; const L = cols.children[0], R = cols.children[1], lib = [...document.querySelectorAll('#stxCard h3.stx-h')].find(h => /library/i.test(h.textContent));
    return { n: getComputedStyle(cols).gridTemplateColumns.split(' ').length, left: !!(L.querySelector('.stx-gauge') && L.querySelector('#stxLimit') && L.querySelector('#stxAuto')), right: !!R.querySelector('#stxKinds'),
      side: Math.round(R.getBoundingClientRect().left - L.getBoundingClientRect().right), below: lib ? Math.round(lib.getBoundingClientRect().top - cols.getBoundingClientRect().bottom) : -999 }; });
  ok(st && st.n === 2 && st.left && st.right && st.side > 10 && st.below >= 0, 'Storage: the gauge, your limit and old copies beside what takes the room; the app library under both', st);
  const lim = await p.evaluate(async () => { const n = () => document.getElementById('stxLimitNote').textContent; const before = n(); const i = document.getElementById('stxLimit'); i.value = '2'; i.dispatchEvent(new Event('change', { bubbles: true })); await new Promise(r => setTimeout(r, 300));
    const set = n(); document.getElementById('stxLimitClear').click(); await new Promise(r => setTimeout(r, 300)); return { before, set, after: n(), value: document.getElementById('stxLimit').value }; });
  ok(/Without one of your own/.test(lim.before) && /Warnings come at 80/.test(lim.set) && !/Without one of your own/.test(lim.set) && /Without one of your own/.test(lim.after) && lim.value === '',
    'the limit still works where it now stands (set to 2 MB, then cleared)', lim);
  await p.screenshot({ path: OUT + '/storage.png' });

  /* 3. Models and AI: four sections the same way (6.28: 2,945 pixels) */
  await p.evaluate(() => IngRooms.open('settings', 'ai', false)); await p.waitForTimeout(800);
  const a0 = await p.evaluate(() => [...document.querySelectorAll('#rmP-settings-ai .dx-tab')].filter(t => !t.hidden).map(t => t.textContent.trim()));
  ok(a0.join('|') === 'Your Ingenium|Connections|Search and eyes|Your devices', 'Models and AI has four sections', a0);
  const AH = {}, AV = {};
  for (const k of ['you', 'conn', 'search', 'devices']) { await p.click('#dxT-ai-' + k); await p.waitForTimeout(450); AH[k] = await p.evaluate(() => document.scrollingElement.scrollHeight);
    AV[k] = await p.evaluate(() => [...document.querySelectorAll('#rmP-settings-ai > .card')].filter(c => c.offsetParent !== null).map(c => c.id || ((c.querySelector('h2') || {}).textContent || '').trim().slice(0, 22))); }
  ok(AV.you.join() === 'personaCard' && AV.conn.indexOf('cnCard') >= 0 && AV.conn.some(x => /^Connect a cloud/.test(x)) && AV.search.indexOf('ingEyesCard') >= 0 && AV.search.some(x => /^Web search/.test(x)) && AV.devices.join() === 'linkCard',
    'each section holds its own cards', AV);
  ok(Object.values(AH).every(h => h <= 1650), 'each section of Models and AI is at most 1,650 pixels tall', AH);
  const kept = await p.evaluate(() => JSON.parse(localStorage.getItem('ing.settings.parts.v1') || '{}'));
  ok(kept.ai === 'devices' && kept.data === 'storage', 'the section chosen last is kept, room by room', kept);

  /* 4. Find a setting, and a setting reached from elsewhere, open the section that holds it */
  await p.click('#dxT-ai-you'); await p.waitForTimeout(300);
  await p.fill('#rmFind', 'connector'); await p.waitForTimeout(400); await p.press('#rmFind', 'Enter'); await p.waitForTimeout(900);
  const f1 = await p.evaluate(() => ({ room: IngRooms.current('settings'), sec: IngSettingsParts.show('ai'), cn: document.getElementById('cnCard').offsetParent !== null }));
  ok(f1.room === 'ai' && f1.sec === 'conn' && f1.cn, 'Find a setting ("connector") opens Models and AI at Connections', f1);
  const rv = await p.evaluate(async () => { IngSettingsParts.show('data', 'in'); IngRooms.open('settings', 'everyday', false); await new Promise(r => setTimeout(r, 300)); IngRooms.reveal(document.getElementById('stxLimit'), {}); await new Promise(r => setTimeout(r, 600));
    return { room: IngRooms.current('settings'), sec: IngSettingsParts.show('data'), vis: document.getElementById('stxLimit').offsetParent !== null }; });
  ok(rv.room === 'data' && rv.sec === 'storage' && rv.vis, 'a setting reached from elsewhere (the limit) opens Your data at Storage', rv);

  /* 5. Show every setting at once: one long page, every card, no sections */
  await p.click('#rmAll-settings'); await p.waitForTimeout(600);
  const all = await p.evaluate(() => ({ bars: [...document.querySelectorAll('#page-settings .dx-bar')].filter(x => x.offsetParent !== null).length, cards: ['ingImportCard', 'bkCard', 'stxCard', 'ingLockCard', 'personaCard', 'cnCard', 'linkCard'].every(id => document.getElementById(id).offsetParent !== null), h: document.scrollingElement.scrollHeight }));
  await p.click('#rmAll-settings'); await p.waitForTimeout(500);
  ok(all.bars === 0 && all.cards && all.h > 6000, 'Show every setting at once still shows everything, with no sections', all);

  /* 6. Everyday's cards in two columns on a wide window, one on a narrower one */
  await p.evaluate(() => IngRooms.open('settings', 'everyday', false)); await p.waitForTimeout(500);
  const ev = await p.evaluate(() => { const pn = document.getElementById('rmP-settings-everyday'); const xs = new Set([...pn.children].filter(c => c.classList.contains('card') && c.offsetParent).map(c => Math.round(c.getBoundingClientRect().left))); return { cols: getComputedStyle(pn).columnCount, lefts: xs.size, h: document.scrollingElement.scrollHeight }; });
  ok(ev.cols === '2' && ev.lefts === 2 && ev.h < 1615, 'Everyday shows its cards in two columns (shorter than 1,615 pixels)', ev);
  await p.screenshot({ path: OUT + '/everyday.png' });

  /* 7. by night, and on a phone */
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngRooms.open('settings', 'data', false); }); await p.waitForTimeout(500);
  const nt = await p.evaluate(() => getComputedStyle(document.querySelector('#rmP-settings-data .dx-tab[aria-selected="true"]')).color);
  await p.screenshot({ path: OUT + '/data_night.png' }); await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  ok(nt === 'rgb(255, 255, 255)', 'by night the chosen section reads white on amethyst', nt);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600);
  const ph = await p.evaluate(async () => { IngRooms.open('settings', 'data', false); await new Promise(r => setTimeout(r, 400)); IngSettingsParts.show('data', 'storage'); await new Promise(r => setTimeout(r, 400));
    const bar = document.querySelector('#rmP-settings-data .dx-bar').getBoundingClientRect(); const cols = document.querySelector('#stxCard .dx-cols');
    return { over: document.scrollingElement.scrollWidth - innerWidth, bar: Math.round(bar.right) <= innerWidth + 1, one: cols ? getComputedStyle(cols).gridTemplateColumns.split(' ').length : 0 }; });
  await p.screenshot({ path: OUT + '/phone.png' });
  ok(ph.over <= 1 && ph.bar && ph.one === 1, 'on a phone the sections fit the screen and Storage stacks in one column', ph);

  ok(errs.length === 0, 'no error on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
