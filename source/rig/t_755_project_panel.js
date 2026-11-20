// Ingenium 7.55 · the Project panel with the record's eleven files in it (modules/r345.js puts them there): it scrolls to its own Close
// (Cancel) and Save at its foot, its scroll bar out of view (her rule), as every panel of Ingenium. Her words (20 November 2026): "Leave the
// Project panel's Close and Save buttons below and add the scrolling function and scroll bar to the panel but hide the scroll bar from view
// to abide by my rule and keep the panel consistent with the rest of Ingenium." The panel is the base page's own; nothing of it is changed.
//   1. with the eleven files, the panel is taller than its room: it scrolls, by the wheel as by a person, and no scroll bar takes any room
//   2. Cancel and Save stay at its foot, after the files, and come into view when it is scrolled down
//   3. Cancel closes it, nothing in it saved, and Ingenia, with the folder, is there again; Escape and a press outside close it too
//     node rig/t_755_project_panel.js <master page url with r345>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv[2];
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? P++ : F++; }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForFunction(() => !!(window.state && state.__r345 && Object.keys(state.__r345.files || {}).length), null, { timeout: 60000, polling: 500 }).catch(() => {}); await p.waitForTimeout(1200);
  const fid = await p.evaluate(() => { const f = IngFolders.folders().filter((x) => /^\s*ingenium\b/i.test(x.name))[0]; return f && f.id; });
  const openIt = () => p.evaluate((id) => { go('folders'); const c = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => /Ingenium/.test(x.textContent)); if (c) c.click(); openProject(id); }, fid);
  const isOpen = () => p.evaluate(() => document.getElementById('modalRoot').classList.contains('open'));
  // 1
  await openIt(); await p.waitForTimeout(900);
  const m = await p.evaluate(() => { const bx = document.getElementById('modalBox'), cs = getComputedStyle(bx), sb = document.createElement('div');
    const bl = parseFloat(cs.borderLeftWidth) || 0, br = parseFloat(cs.borderRightWidth) || 0;
    return { files: document.querySelectorAll('#pjFiles .proj-row').length, taller: bx.scrollHeight > bx.clientHeight + 20, overflow: cs.overflowY, bar: Math.round(bx.offsetWidth - bx.clientWidth - bl - br), x: !!document.querySelector('#modalBox .r346-x') }; });
  const r0 = await p.evaluate(() => document.getElementById('modalBox').getBoundingClientRect());
  await p.mouse.move(r0.x + r0.width / 2, r0.y + r0.height / 2); await p.mouse.wheel(0, 900); await p.waitForTimeout(700);
  const top = await p.evaluate(() => document.getElementById('modalBox').scrollTop);
  ok(m.files >= 11 && m.taller && /auto|scroll/.test(m.overflow) && top > 0 && m.bar === 0, 'with the eleven files the panel scrolls, by the wheel as by a person, and no scroll bar takes any room', Object.assign(m, { scrolledTo: top }));
  ok(!m.x, 'nothing of the panel is changed: no key is added to it', m);
  // 2
  await p.mouse.wheel(0, 6000); await p.waitForTimeout(800);
  const foot = await p.evaluate(() => { const bx = document.getElementById('modalBox'), files = document.getElementById('pjFiles'), c = document.getElementById('pjCancel'), s = document.getElementById('pjSave'); const b = bx.getBoundingClientRect();
    const seen = (e) => { const r = e.getBoundingClientRect(); return r.top >= b.top - 1 && r.bottom <= b.bottom + 1; };
    return { after: !!(files.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING) && !!(files.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING), cancel: c.textContent, save: s.textContent, seen: seen(c) && seen(s) }; });
  ok(foot.after && foot.seen, 'Cancel and Save stay at its foot, after the files, and come into view when it is scrolled down', foot);
  // 3
  await p.fill('#pjName', 'CHANGED-NAME not to be kept'); await p.click('#pjCancel'); await p.waitForTimeout(600);
  const after = await p.evaluate((id) => ({ open: document.getElementById('modalRoot').classList.contains('open'), name: (IngFolders.folders().filter((x) => x.id === id)[0] || {}).name, page: (document.querySelector('main.main > .section.active') || {}).id || '' }), fid);
  ok(!after.open && after.name === 'Ingenium' && after.page === 'page-folders', 'Cancel closes it, nothing in it saved, and Ingenia, with the folder, is there again', after);
  await openIt(); await p.waitForTimeout(700); await p.keyboard.press('Escape'); await p.waitForTimeout(500); const esc = await isOpen();
  await openIt(); await p.waitForTimeout(700); await p.mouse.click(12, 840); await p.waitForTimeout(500); const out = await isOpen();
  ok(!esc && !out, 'Escape, and a press outside it, close it too', { escape: esc, outside: out });
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
