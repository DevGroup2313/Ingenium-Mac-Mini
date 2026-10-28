// node rig/t_681_ribbon.js <Ingenium page url, a Forge page url, or a Tabula page url> [screenshot.png]
// 6.8.1: Tabula's ribbon in Chromium's engine (Windows, the Fire tablet), pressed as a person presses it: the same cases as
// rig/t_681_ribbon_wk.py runs in Safari's. Each thing the ribbon gives must land at the first press, on selected words and on
// the words typed next, and still be there a few seconds later. apps/tabula_ribbon_patch.py.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2], SHOT = process.argv[3];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
const WORD = (W) => { const ed = document.getElementById('editor'), tw = document.createTreeWalker(ed, 4); let n, m; while ((n = tw.nextNode())) { m = new RegExp('\\b' + W + '\\b').exec(n.nodeValue); if (m) return [ed, n, m]; } return [ed, null, null]; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  let fr = p, FH = null;
  if (/forge/i.test(URL)) { ({ fr, fh: FH } = await require('./in_forge.js')(p, URL, 'tabula', '#editor')); }
  else if ((await p.goto(URL), /ingenium/i.test(URL))) {
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(800); await p.evaluate(() => go('tabula'));
    await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return !!f.contentWindow.document.getElementById('editor') && f.contentWindow.document.readyState === 'complete'; } catch (e) { return false; } }, null, { timeout: 120000 });
    await p.waitForTimeout(2000); FH = await p.$('#ing-desk iframe[data-app="tabula"]'); fr = await FH.contentFrame();
  } else { await p.waitForSelector('#editor'); await p.waitForTimeout(1500); }
  await fr.evaluate(() => { window.__fe = []; window.addEventListener('error', e => window.__fe.push(String(e.message))); });
  await fr.click('#editor'); await p.keyboard.type('Alpha beta gamma delta epsilon zeta theta iota kappa lambda omicron sigma. ');
  await p.waitForTimeout(400);
  const st = w => fr.evaluate(([W, src]) => { const [ed, n, m] = eval(src)(W); if (!m) return null; const e = n.parentElement, c = getComputedStyle(e); let bg = '';
    for (let x = e; x && x !== ed; x = x.parentElement) { const v = getComputedStyle(x).backgroundColor; if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') { bg = v; break; } }
    return { color: c.color, size: c.fontSize, weight: c.fontWeight, style: c.fontStyle, family: c.fontFamily.split(',')[0].replace(/"/g, ''), bg }; }, [w, '(' + WORD + ')']);
  const base = await st('Alpha'); const px = v => parseFloat(v.size);
  const pick = async w => { await fr.evaluate(([W, src]) => { const [ed, n, m] = eval(src)(W); const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + W.length); const b = r.getBoundingClientRect(); window.__pt = [b.left + b.width / 2, b.top + b.height / 2]; }, [w, '(' + WORD + ')']);
    const fb = FH ? await FH.boundingBox() : { x: 0, y: 0 }; const pt = await fr.evaluate(() => window.__pt);
    await p.mouse.dblclick(fb.x + pt[0], fb.y + pt[1]); await p.waitForTimeout(250); };
  const press = async (css, i = 0) => { await (await fr.$$(css))[i].click(); await p.waitForTimeout(300); };
  const choose = async (sel, value) => { await fr.click(sel); await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    const v = await fr.evaluate(([s, val]) => { const f = document.querySelector(s); const o = [...f.options].find(o => o.value === val || o.text === val); return o.value; }, [sel, value]);
    await fr.selectOption(sel, v); await p.waitForTimeout(300); };
  const atEnd = async () => { await fr.click('#editor'); await p.keyboard.press('Control+End'); await p.waitForTimeout(200); };
  const typed = async w => { await p.keyboard.type(w + ' '); await p.waitForTimeout(300); };
  const later = [];
  const check = async (what, w, test) => { const v = await st(w); ok(v && test(v), what, JSON.stringify(v)); later.push([what, w, test]); };
  await pick('beta'); await press('#foreGalBtn'); await press('#cdForeGal .pal button', 3);
  await check('the colour palette colours the selected word', 'beta', v => v.color !== base.color);
  await pick('gamma'); await press('#hiliteGalBtn'); await press('#cdHilGal .pal button', 2);
  await check('the highlight palette marks the selected word', 'gamma', v => !!v.bg);
  await pick('delta'); await choose('#sizeSel', '18');
  await check('18 from the size list makes the selected word 18 points (24 pixels)', 'delta', v => v.size === '24px');
  await pick('epsilon'); await choose('#fontSel', 'Georgia, serif');
  await check('the font list sets the selected word', 'epsilon', v => v.family === 'Georgia');
  await pick('zeta'); await press('.ribbon [data-cmd="bold"]');
  await check('bold bolds the selected word', 'zeta', v => +v.weight >= 600);
  await pick('theta'); await choose('#sizeSel', '14'); await press('#foreGalBtn'); await press('#cdForeGal .pal button', 4);
  await check('a size and then a colour, without selecting again, both land', 'theta', v => Math.abs(px(v) - 56 / 3) < .01 && v.color !== base.color);
  await pick('iota'); const g0 = px(await st('iota')); await press('#growFont'); await press('#growFont');
  await check('Grow Font, pressed twice, grows the word twice', 'iota', v => Math.abs(px(v) - (g0 + 4)) < .1);
  await pick('kappa'); await press('#shrinkFont'); await press('#shrinkFont');
  await check('Shrink Font, pressed twice, shrinks the word twice', 'kappa', v => Math.abs(px(v) - (px(base) - 4)) < .1);
  await atEnd(); await press('#foreGalBtn'); await press('#cdForeGal .pal button', 3); await typed('crimson');
  await check('a colour chosen with nothing selected reaches the words typed next', 'crimson', v => v.color !== base.color);
  await press('#foreGalBtn'); await press('#cdForeGal .gal-foot', 0); await typed('plain');
  await check("Automatic, then typing: the words are in the page's own ink", 'plain', v => v.color === base.color);
  await press('#hiliteGalBtn'); await press('#cdHilGal .pal button', 2); await typed('marked');
  await check('a highlight chosen with nothing selected reaches the words typed next', 'marked', v => !!v.bg);
  await press('#hiliteGalBtn'); await press('#cdHilGal .gal-foot', 0); await typed('bare');
  await check('No colour, then typing: the words have no highlight', 'bare', v => !v.bg);
  await press('#hiliteGalBtn'); await press('#cdHilGal .pal button', 4); await press('.ribbon [data-cmd="bold"]'); await typed('boldmark');
  await press('#hiliteGalBtn'); await press('#cdHilGal .gal-foot', 0); await typed('boldbare');
  await check('bold in a highlight, then No colour: the next words are bold, without the highlight', 'boldbare', v => !v.bg && +v.weight >= 600);
  await press('#foreGalBtn'); await press('#cdForeGal .pal button', 6); await typed('tinted');
  await press('#foreGalBtn'); await press('#cdForeGal .gal-foot', 0); await typed('inked');
  await check("bold in a colour, then Automatic: the next words are bold, in the page's own ink", 'inked', v => v.color === base.color && +v.weight >= 600);
  await press('.ribbon [data-cmd="bold"]');
  await choose('#sizeSel', '18'); await typed('large'); await typed('larger');
  await check('18 chosen with nothing selected: the next word is 18 points', 'large', v => v.size === '24px');
  await check('and so is the word after it', 'larger', v => v.size === '24px');
  await choose('#sizeSel', '14'); await press('.ribbon [data-cmd="italic"]'); await typed('slanted');
  await check('a size, then italic, then typing: the words take both', 'slanted', v => Math.abs(px(v) - 56 / 3) < .01 && v.style === 'italic');
  await press('.ribbon [data-cmd="italic"]');
  await choose('#sizeSel', '12'); await typed('normal');
  await check('12 chosen after it: the words go back to 12 points', 'normal', v => v.size === '16px');
  await choose('#fontSel', 'Georgia, serif'); await typed('georgian');
  await check('a font chosen with nothing selected reaches the words typed next', 'georgian', v => v.family === 'Georgia');
  await press('.ribbon [data-cmd="bold"]'); await typed('heavy');
  await check('bold pressed with nothing selected reaches the words typed next', 'heavy', v => +v.weight >= 600);
  await p.waitForTimeout(4000);
  for (const [what, w, test] of later) { const v = await st(w); ok(v && test(v), what + ', and is still there 4 seconds later', JSON.stringify(v)); }
  const v = await st('lambda'); ok(v && v.color === base.color && v.size === base.size && !v.bg, 'a word never chosen is as it was', JSON.stringify(v));
  const fe = await fr.evaluate(() => window.__fe); ok(!errs.length && !fe.length, 'no errors', errs.concat(fe).slice(0, 3).join(' | '));
  if (SHOT) await p.screenshot({ path: SHOT });
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
