// Ingenium 7.27: Adamas in two tabs, its code and its page given the window's height (modules/r311.js, r173.js CONF.build, r292.js). Her words
// (17 November 2026): "I just want Adamas code panel and its live preview panel to be restored to their original sides and not be compacted and
// squished in. I am not interested in changing its look for a new design"; "I want you to split the Adamas page into tabs and have the download
// as an app feature be in a different tab".
// Checks, at 1280 by 800 (then 1000 by 625):
//   - two tabs under Adamas's head, Your page and Download as an app, Your page chosen first; the head is above them and in no tab;
//   - Your page holds the work card (the code, the preview, Ask a model); the build kits are out of sight;
//   - the code and its page side by side with the widths they have had since 3.4 (at 1280: 395 and 536, the code 42 per cent);
//   - their row reaches the foot of the window: at least the window's height less 150 points (480 before);
//   - Download as an app shows the kits and hides the work card; each kit's name and file name are parted; the choice names Your page;
//   - the tab chosen is kept when the page is opened again; picking the kits' choice from elsewhere (as Chat's Make it an app does) opens it;
//   - the diamond is still mounted in the head; no page error.
//   node rig/t_727_adamas.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d))); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch(); const errs = [];
  for (const [w, h] of [[1280, 800], [1000, 625]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    const open = async () => { await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('build'); }); await p.waitForTimeout(2500); };
    await open();
    const st = () => p.evaluate(() => { const pg = document.getElementById('page-build'), R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
      const head = pg.querySelector(':scope > .skh'), bar = pg.querySelector(':scope > .rm-bar'), ed = document.getElementById('editorPane');
      return { tabs: [...pg.querySelectorAll('.rm-tab')].filter(t => !t.hidden).map(t => t.textContent.trim()), cur: (pg.querySelector('.rm-tab[aria-selected="true"]') || {}).textContent,
        head: R(head), headInPanel: !!(head && head.closest('.rm-panel')), bar: R(bar), work: !!(ed && ed.offsetParent), workRoom: ed ? (ed.closest('.rm-panel') || {}).getAttribute && ed.closest('.rm-panel').getAttribute('data-room') : null,
        ship: !!document.getElementById('shipCard').offsetParent, shipRoom: (document.getElementById('shipCard').closest('.rm-panel') || { getAttribute: () => null }).getAttribute('data-room'),
        editor: R(ed), preview: R(document.getElementById('previewPane')), grid: R(document.querySelector('#page-build .build-grid')), says: (pg.querySelector('.rm-says') || {}).textContent,
        diamond: !!(head && head.querySelector('canvas.bd-cv')), choice: (document.querySelector('input[name="kitWhat"][value="editor"]').parentNode.querySelector('b') || {}).textContent }; });
    const s = await st();
    ok(s.tabs.join('|') === 'Your page|Download as an app' && s.cur === 'Your page' && s.head && s.bar && s.head.y < s.bar.y && !s.headInPanel, w + ': two tabs under Adamas\'s head, Your page chosen first, the head in no tab', { tabs: s.tabs, cur: s.cur, head: s.head && s.head.y, bar: s.bar && s.bar.y });
    ok(s.work && s.workRoom === 'page' && !s.ship && s.shipRoom === 'apps', w + ': Your page holds the code and its page; the build kits are out of sight, in their own tab', { work: s.work, workRoom: s.workRoom, ship: s.ship, shipRoom: s.shipRoom });
    const want = w === 1280 ? [395, 536] : [280, 376];
    ok(s.editor && Math.abs(s.editor.w - want[0]) <= 2 && Math.abs(s.preview.w - want[1]) <= 2 && s.editor.y === s.preview.y && s.editor.x < s.preview.x, w + ': the code and its page side by side, with the widths they have had since 3.4', { editor: s.editor, preview: s.preview, want });
    ok(s.grid && s.grid.h >= Math.max(480, h - 150) - 1, w + ': their row reaches the foot of the window (at least ' + Math.max(480, h - 150) + ' points; 480 before)', s.grid);
    ok(s.diamond, w + ': the diamond is still in the head');
    if (w === 1280) { await p.evaluate(() => { const b = document.querySelector('#page-build .rm-bar'); window.scrollTo(0, b.getBoundingClientRect().top + scrollY - 60); }); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/your_page.png' }); }
    await p.click('#page-build .rm-tab[data-room="apps"]'); await p.waitForTimeout(700);
    const a = await st();
    const gap = await p.evaluate(() => { const r = [...document.querySelectorAll('#shipCard .ship-row')].find(x => x.offsetParent); if (!r) return null; const n = r.querySelector('.ship-name').getBoundingClientRect(), z = r.querySelector('.ship-zip').getBoundingClientRect(); return Math.round(z.left - n.right); });
    ok(a.ship && !a.work && a.cur === 'Download as an app' && /Build kits/.test(a.says || ''), w + ': Download as an app shows the kits and hides the work card', { ship: a.ship, work: a.work, says: a.says });
    ok(gap != null && gap >= 4, w + ': each kit\'s name and file name are parted', gap);
    ok(a.choice === 'The app in Your page', w + ': the kits\' choice names the tab the editor is in', a.choice);
    if (w === 1280) { await p.evaluate(() => { const b = document.querySelector('#page-build .rm-bar'); window.scrollTo(0, b.getBoundingClientRect().top + scrollY - 60); }); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/download.png' });
      await open(); const k = await st(); ok(k.cur === 'Download as an app' && k.ship, 'the tab chosen is kept when the page is opened again', k.cur);
      await p.click('#page-build .rm-tab[data-room="page"]'); await p.waitForTimeout(500);
      await p.evaluate(() => { go('chat'); }); await p.waitForTimeout(800);
      await p.evaluate(() => { const r = document.querySelector('input[name="kitWhat"][value="editor"]'); r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); go('build'); }); await p.waitForTimeout(1200);
      const c = await st(); ok(c.cur === 'Download as an app' && c.ship, 'picking the kits\' choice from elsewhere (as Chat\'s Make it an app does) opens Adamas on the kits\' tab', c.cur); }
    await ctx.close(); }
  ok(!errs.length, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); })();
