// The record of Ingenium's security, profiles and design (modules/r345.js) in Ingenium's folder on the Ingenia page, as pictures of the
// running app: the folder, then its files. A fresh copy (no person's data); the pictures stay out of the repository.
//   node previews/record/capture_pics.js <test page url with r345> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 })).newPage();
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(2200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForFunction(() => !!(window.state && state.__r345 && Object.keys(state.__r345.files || {}).length), null, { timeout: 60000, polling: 500 }); await p.waitForTimeout(1500);
  // the ring is drawn around what can be seen of the part: clipped to its scrolling box and to the window
  const ring = (sel, pad) => p.evaluate(([sel, pad]) => { document.querySelectorAll('.pv-ring').forEach((x) => x.remove()); const el = document.querySelector(sel); if (!el) return false; const q = el.getBoundingClientRect(), d = document.createElement('div'); d.className = 'pv-ring';
    let box = { left: 0, top: 0, right: innerWidth, bottom: innerHeight }; for (let a = el.parentElement; a; a = a.parentElement) { const cs = getComputedStyle(a); if (/(auto|scroll|hidden)/.test(cs.overflowY) && a.scrollHeight > a.clientHeight + 2) { const ar = a.getBoundingClientRect(); box = { left: Math.max(box.left, ar.left), top: Math.max(box.top, ar.top), right: Math.min(box.right, ar.right), bottom: Math.min(box.bottom, ar.bottom) }; } }
    const r = { left: Math.max(q.left - pad, box.left + 3), top: Math.max(q.top - 2, box.top + 3), width: 0, height: 0 }; r.width = Math.min(q.right + pad, box.right - 3) - r.left; r.height = Math.min(q.bottom + 2, box.bottom - 3) - r.top;   /* sideways room only: above and below are the card's own words */
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #6a3fb5;border-radius:14px;box-shadow:0 0 0 4px rgba(106,63,181,.18);left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px'; document.body.appendChild(d); return true; }, [sel, pad || 6]);
  const shot = async (n) => { await p.waitForTimeout(600); await p.screenshot({ path: OUT + '/' + n + '.png' }); await p.evaluate(() => document.querySelectorAll('.pv-ring').forEach((x) => x.remove())); console.log('shot', n); };
  // 1. Ingenium's folder on the Ingenia page: its files go with its conversations
  const fid = await p.evaluate(() => { const f = IngFolders.folders().filter((x) => /^\s*ingenium\b/i.test(x.name))[0]; return f && f.id; });
  await p.evaluate((id) => { go('folders'); try { IngFolders.paint(); } catch (e) {} const c = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => /Ingenium/.test(x.textContent)); if (c) c.click(); }, fid); await p.waitForTimeout(1500);
  const line = await p.evaluate(async () => { const el = [...document.querySelectorAll('#page-folders p')].find((x) => /files? go with its conversations/.test(x.textContent)); if (!el) return null; el.id = 'pvFiles';
    for (let a = el.parentElement; a; a = a.parentElement) { if (a.scrollHeight > a.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(a).overflowY)) { const ar = a.getBoundingClientRect(), er = el.getBoundingClientRect(); a.scrollTop += er.top - ar.top - a.clientHeight * 0.45; break; } }
    if (el.getBoundingClientRect().top > innerHeight - 80) { document.scrollingElement.scrollTop += el.getBoundingClientRect().top - innerHeight * 0.45; } await new Promise((r) => setTimeout(r, 500)); return el.textContent + ' @' + Math.round(el.getBoundingClientRect().top); });
  console.log('line', line); await p.waitForTimeout(700); await ring('#pvFiles', 8); await shot('1-folder');
  // 2. its files, opened from Its files and instructions
  await p.evaluate((id) => { try { openProject(id); } catch (e) {} }, fid); await p.waitForTimeout(1500);
  const box = await p.evaluate(() => { const all = [...document.querySelectorAll('body *')].filter((x) => x.offsetParent && /Ingenium record 00 · Read me first/.test(x.textContent) && x.children.length > 3); const el = all.length ? all[all.length - 1] : null; if (!el) return null; el.id = el.id || 'pvList'; return el.id; });
  console.log('list', box); if (box) await ring('#' + box, 10); await shot('2-its-files');
  // 3. its close key, at its top-right corner (modules/r346.js)
  await p.evaluate(() => { document.getElementById('modalBox').scrollTop = 0; }); await p.waitForTimeout(500);
  await ring('#modalBox .r346-x', 8); await shot('3-close-key');
  // 4. the panel scrolled to its foot: its own Cancel and Save, no scroll bar in view, the close key still at its corner
  await p.evaluate(() => { const bx = document.getElementById('modalBox'); bx.scrollTop = bx.scrollHeight; }); await p.waitForTimeout(700);
  await p.evaluate(() => { const c = document.getElementById('pjCancel'); if (c && c.parentElement) c.parentElement.id = c.parentElement.id || 'pvFoot'; });
  await ring('#pvFoot', 10); await shot('4-panel-foot');
  await b.close();
})();
