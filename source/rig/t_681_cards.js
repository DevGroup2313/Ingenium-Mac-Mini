// node rig/t_681_cards.js <page url> <out dir>
// 6.8.1: the cards that pop up are raised (r184), by day and by night, and arrive with a small spring; the note at the foot of
// the page ("Saved", and the other short notes) stays flat, as the owner asked: "The "Saved. Your documents is kept on this
// device." cards can be exempted from the 3D look and remain flat."
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  const look = sel => p.evaluate(s => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e);
    return { shadow: c.boxShadow, bgimg: c.backgroundImage, anim: c.animationName, border: c.borderTopColor + ' ' + c.borderTopWidth }; }, sel);
  for (const theme of ['day', 'night']) {
    await p.evaluate(t => { document.body.setAttribute('data-theme', t); }, theme);
    await p.evaluate(() => ingToast('Saved. Your document is kept on this device.')); await p.waitForTimeout(600);
    const t = await look('#ingToast');
    ok(t && !/inset/.test(t.shadow) && t.bgimg === 'none', 'by ' + theme + ', the note at the foot of the page is flat (no raised face, no lit edges)', JSON.stringify(t));
    ok(t && t.anim === 'none', 'by ' + theme + ', it arrives without the spring', JSON.stringify(t));
    await p.screenshot({ path: path.join(OUT, 'note-' + theme + '.png'), clip: { x: 320, y: 820, width: 800, height: 130 } });
    const r = await p.evaluate(() => { const style = document.getElementById('r184-css'); return style ? style.textContent : ''; });
    ok(/#modalBox/.test(r) && /\.tour-card/.test(r) && !/#ingToast/.test(r), 'the dialogs and the tour card are still raised; the foot note is not among them');
  }
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); });
  // a dialog, raised as before
  await p.evaluate(() => { document.getElementById('modalBox').innerHTML = '<h3>A card</h3><p>Raised, as the thought card is.</p>'; openModal(); });
  await p.waitForTimeout(700);
  const m = await look('#modalBox');
  ok(m && /inset/.test(m.shadow), 'a dialog is raised (lit edges and a fallen shadow)', JSON.stringify(m));
  await p.screenshot({ path: path.join(OUT, 'dialog-day.png') });
  ok(!errs.length, 'no errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
