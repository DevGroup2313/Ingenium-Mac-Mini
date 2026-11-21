// The Author Studio, raised (modules/r353.js, held for her preview): pictures of the running studio, the master edition, an invented
// copy holding nothing of hers. The studio as it is (7.62) once, for comparison, then each room raised, by day and by night, and a tile
// under the pointer. compose_pics.py gives each its number, title and sentence, one file each, at full size.
//   node previews/author_raised/capture_pics.js <page url without r353> <page url with r353> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [BEFORE, AFTER, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function open(b, url) {
  const ctx = await b.newContext({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    const st = document.createElement('style'); st.textContent = '#ingToast,.ing-toast{display:none!important}'; document.head.appendChild(st); go('author'); });
  await sleep(2500); return { p, ctx, errs };
}
const room = async (p, name) => { await p.evaluate((n) => { const k = [...document.querySelectorAll('#ingAuthor .au-room')].find((x) => x.textContent.trim().indexOf(n) === 0); if (k) k.click(); }, name);
  await p.mouse.move(1350, 890); await sleep(1600); };
const theme = (p, t) => p.evaluate((t) => { state.theme = t; applyTheme(); }, t);
const shot = async (p, key) => { await p.evaluate(() => { const a = document.activeElement; if (a && a.blur) a.blur(); }); await sleep(400); await p.screenshot({ path: path.join(OUT, key + '.png') }); console.log('shot', key); };
(async () => {
  const b = await pw.chromium.launch();
  let o = await open(b, BEFORE); await room(o.p, 'The Editor'); await shot(o.p, '01-editor-before'); await o.ctx.close();
  o = await open(b, AFTER); const p = o.p;
  // two invented rewrites, so Words and the Change log have rows to show (a fresh copy, nothing of hers)
  await p.evaluate(() => { IngAuthor.words.set('Break it down', 'Take it apart', 'all'); IngAuthor.words.set('Bring in your work', 'Bring your work in', 'all'); }); await sleep(600);
  await room(p, 'The Editor'); await shot(p, '02-editor');
  const k = await p.$('#ingAuthor .au-kind:nth-child(4)'); const bx = await k.boundingBox(); await p.mouse.move(bx.x + bx.width * 0.8, bx.y + bx.height * 0.25, { steps: 8 }); await sleep(700); await shot(p, '03-editor-pointer');
  await room(p, 'Words'); await shot(p, '04-words');
  await room(p, 'Names'); await shot(p, '05-names');
  await room(p, 'Look'); await shot(p, '06-look');
  await room(p, 'Additions'); await shot(p, '07-additions');
  await room(p, 'Change log'); await shot(p, '08-change-log');
  await theme(p, 'night'); await room(p, 'The Editor'); await shot(p, '09-editor-night');
  await room(p, 'Look'); await shot(p, '10-look-night');
  console.log('errors', JSON.stringify(o.errs));
  await b.close();
})().catch((e) => { console.log('stopped: ' + (e && e.stack || e)); process.exit(1); });
