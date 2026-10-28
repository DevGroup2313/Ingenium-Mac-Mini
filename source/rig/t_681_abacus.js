// node rig/t_681_abacus.js <Abacus page url, an Ingenium page url, or a Forge page url> [screenshot.png]
// 6.8.1: Abacus's ribbon, pressed as a person presses it (real presses of the pointer and keys, in Chromium; the same cases
// run in Safari's engine through rig/t_681_abacus_wk.py): each control on a cell and on a range chosen by dragging, as Excel
// does; numbers formatted; rows inserted and deleted with their formatting; Undo and Redo; all of it still there after the
// page is opened again. Its look as well: one row of sheet tabs, nothing written over the keys at its foot.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2], SHOT = process.argv[3];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  let fr = p, FH = null; const IN_ING = /ingenium/i.test(URL), IN_FORGE = /forge/i.test(URL);
  async function open() {
    if (IN_FORGE) ({ fr, fh: FH } = await require('./in_forge.js')(p, URL, 'abacus', '#grid td[data-ref]'));
    else await p.goto(URL);
    if (IN_FORGE) {}
    else if (IN_ING) {
      await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
      await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
      await p.waitForTimeout(800); await p.evaluate(() => go('abacus'));
      await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { return !!f.contentWindow.document.querySelector('#grid td[data-ref]'); } catch (e) { return false; } }, null, { timeout: 120000 });
      fr = await (await p.$('#ing-desk iframe[data-app="abacus"]')).contentFrame();
    } else { await p.waitForSelector('#grid td[data-ref]'); fr = p; }
    await p.waitForTimeout(1500);
    await fr.evaluate(() => { window.__fe = []; window.addEventListener('error', e => window.__fe.push(String(e.message))); });
  }
  await open();
  // a cell's box from Playwright is already measured on the whole window, through the frame (653: adding the frame's place
  // again put every drag one row low inside the Forge, whose frame stands 42 pixels down)
  const at = async r => { const bb = await (await fr.$('#grid td[data-ref="' + r + '"]')).boundingBox(); return [bb.x + bb.width / 2, bb.y + bb.height / 2]; };
  const cell = async r => { const a = await at(r); await p.mouse.click(a[0], a[1]); await p.waitForTimeout(150); };
  const range = async (a, z) => { const A = await at(a), Z = await at(z); await p.mouse.move(A[0], A[1]); await p.mouse.down(); await p.mouse.move(Z[0], Z[1], { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(200); };
  const press = async sel => { await fr.click(sel); await p.waitForTimeout(250); };
  const look = refs => fr.evaluate(refs => refs.map(r => { const td = document.querySelector('#grid td[data-ref="' + r + '"]'); const c = getComputedStyle(td);
    return { r, text: td.textContent, w: c.fontWeight, i: c.fontStyle, u: c.textDecorationLine, a: c.textAlign, fg: c.color, bg: c.backgroundColor, ff: c.fontFamily.split(',')[0].replace(/"/g, ''), fs: c.fontSize, ws: c.whiteSpace, pl: c.paddingLeft, bt: c.borderTopStyle, bb: c.borderBottomStyle, span: td.colSpan || 1, hidden: getComputedStyle(td).display === 'none' }; }), refs);
  const R = ['A2', 'A3', 'A4', 'B2', 'B3', 'B4'];
  const all = (v, f) => v.every(f);
  const base = (await look(['C6']))[0];
  // the font group, on a range
  await range('A2', 'B4'); await press('#bItalic'); let v = await look(R); ok(all(v, x => x.i === 'italic'), 'Italic reaches every cell of a range', JSON.stringify(v.map(x => x.i)));
  await press('#bUnder'); v = await look(R); ok(all(v, x => /underline/.test(x.u)), 'Underline reaches every cell of a range', JSON.stringify(v.map(x => x.u)));
  await press('#bBold'); v = await look(R); ok(all(v, x => +x.w >= 600), 'Bold reaches every cell of a range', JSON.stringify(v.map(x => x.w)));
  await fr.fill('#abFg', '#c0392b'); await p.waitForTimeout(250); v = await look(R); ok(all(v, x => x.fg === 'rgb(192, 57, 43)'), 'the font colour reaches every cell of a range', JSON.stringify(v.map(x => x.fg)));
  await fr.fill('#abBg', '#f4e3b2'); await p.waitForTimeout(250); v = await look(R); ok(all(v, x => x.bg === 'rgb(244, 227, 178)'), 'the fill colour reaches every cell of a range', JSON.stringify(v.map(x => x.bg)));
  const fonts = await fr.evaluate(() => [...document.getElementById('abFontName').options].map(o => o.value).filter(Boolean));
  const georgia = fonts.find(f => /georgia/i.test(f)) || fonts[1];
  await fr.selectOption('#abFontName', georgia); await p.waitForTimeout(250); v = await look(R); ok(all(v, x => x.ff.toLowerCase() === georgia.split(',')[0].replace(/["']/g, '').toLowerCase()), 'the font list sets every cell of a range', georgia + ' ' + JSON.stringify(v.map(x => x.ff)));
  const sizes = await fr.evaluate(() => [...document.getElementById('abFontSize').options].map(o => o.value).filter(Boolean));
  const s18 = sizes.find(s => +s === 18) || sizes[sizes.length - 2];
  await fr.selectOption('#abFontSize', s18); await p.waitForTimeout(250); v = await look(R); ok(all(v, x => x.fs === v[0].fs) && v[0].fs !== base.fs, 'the size list sets every cell of a range', s18 + ' ' + JSON.stringify(v.map(x => x.fs)));
  // grow and shrink, pressed twice
  await cell('C2'); const g0 = parseFloat((await look(['C2']))[0].fs); await press('#abGrow'); await press('#abGrow'); const g2 = parseFloat((await look(['C2']))[0].fs);
  ok(g2 > g0 && g2 - g0 >= 2, 'Grow the text, pressed twice, grows the cell twice', g0 + ' -> ' + g2);
  await press('#abShrink'); await press('#abShrink'); const g4 = parseFloat((await look(['C2']))[0].fs); ok(g4 < g2 && g2 - g4 >= 2, 'Shrink the text, pressed twice, shrinks it twice', g0 + ' -> ' + g2 + ' -> ' + g4);
  // alignment, wrap, indent
  await range('A2', 'B4'); await press('#alCenter'); v = await look(R); ok(all(v, x => x.a === 'center'), 'Center reaches every cell of a range', JSON.stringify(v.map(x => x.a)));
  await press('#alRight'); v = await look(R); ok(all(v, x => x.a === 'right'), 'Right reaches every cell of a range', JSON.stringify(v.map(x => x.a)));
  await press('#abWrap'); v = await look(R); ok(all(v, x => x.ws === 'normal'), 'Wrap reaches every cell of a range', JSON.stringify(v.map(x => x.ws)));
  await cell('A6'); const p0 = parseFloat((await look(['A6']))[0].pl); await press('#abIndent'); await press('#abIndent'); const p2 = parseFloat((await look(['A6']))[0].pl);
  ok(p2 > p0, 'Increase the indent, twice, moves the text in twice', p0 + ' -> ' + p2);
  await press('#abOutdent'); await press('#abOutdent'); ok(Math.abs(parseFloat((await look(['A6']))[0].pl) - p0) < .5, 'Decrease the indent brings it back');
  // numbers
  await range('C2', 'C4'); await press('#abCur'); v = await look(['C2', 'C3', 'C4']); ok(all(v, x => /\$\s?\d/.test(x.text) && /\.\d\d$/.test(x.text)), 'Currency formats every number of a range', JSON.stringify(v.map(x => x.text)));
  await press('#abDec'); v = await look(['C2', 'C3', 'C4']); ok(v.map(x => x.text).join() === '$12.000,$1.500,$4.000', 'Add a decimal place adds one to every number of a range, still in currency', JSON.stringify(v.map(x => x.text)));
  await press('#abInc'); await press('#abInc'); v = await look(['C2', 'C3', 'C4']); ok(v.map(x => x.text).join() === '$12.0,$1.5,$4.0', 'Remove a decimal place takes one away each time, still in currency', JSON.stringify(v.map(x => x.text)));
  await press('#abInc'); await press('#abInc'); v = await look(['C2', 'C3', 'C4']); ok(v.map(x => x.text).join() === '$12,$2,$4', 'and stops at none', JSON.stringify(v.map(x => x.text)));
  await press('#abPct'); v = await look(['C2', 'C3', 'C4']); ok(all(v, x => /%$/.test(x.text)), 'Percent formats every number of a range', JSON.stringify(v.map(x => x.text)));
  await fr.selectOption('#numFmt', ''); await p.waitForTimeout(250); v = await look(['C2', 'C3', 'C4']); ok(v.map(x => x.text).join() === '12,1.5,4', 'General gives the numbers back as typed', JSON.stringify(v.map(x => x.text)));
  // borders and cell styles
  const tile = name => fr.evaluate(n => { const e = [...document.querySelectorAll('#xgBorders .xg-tile')].find(e => e.title === n); if (e) { e.click(); return true; } return false; }, name);
  await range('A2', 'B4'); await press('#borderBtn'); await tile('None'); await range('A2', 'B4'); await press('#borderBtn'); const allB = await tile('All');
  await p.waitForTimeout(250); v = await look(R); const bs = await fr.evaluate(refs => refs.map(r => { const st = (window.__abx.sty()[r] || {}); return [st.bt || '', st.bb || '', st.bl || '', st.br || ''].map(x => x ? 1 : 0).join(''); }), R);
  ok(allB && bs.every(x => x === '1111'), 'All borders draws a border round every cell of a range', JSON.stringify(bs));
  await range('A2', 'B4'); await press('#borderBtn'); await tile('None'); await range('A2', 'B4'); await press('#borderBtn'); await tile('Thick'); await p.waitForTimeout(200);
  const th = await fr.evaluate(refs => refs.map(r => { const st = (window.__abx.sty()[r] || {}); return r + ':' + [st.bt || '', st.bb || '', st.bl || '', st.br || ''].map(x => x ? 1 : 0).join(''); }), R);
  ok(th.join() === 'A2:1010,A3:0010,A4:0110,B2:1001,B3:0001,B4:0101', 'Thick draws round the outline of a range, not every cell', JSON.stringify(th));
  await range('A2', 'B4'); await press('#borderBtn'); await tile('None'); await p.waitForTimeout(200);
  const no = await fr.evaluate(refs => refs.every(r => { const st = (window.__abx.sty()[r] || {}); return !st.bt && !st.bb && !st.bl && !st.br; }), R); ok(no, 'None takes the borders off every cell of a range');
  await range('E2', 'F3'); await press('#cellStyleBtn'); const good = await fr.evaluate(() => { const e = [...document.querySelectorAll('.xg-pop.open .xg-tile, .xg-pop .xg-tile')].find(e => e.offsetParent && /Good/.test(e.textContent)); if (e) { e.click(); return true; } return false; });
  await p.waitForTimeout(200); v = await look(['E2', 'E3', 'F2', 'F3']); ok(good && all(v, x => x.bg === 'rgb(198, 239, 206)'), 'a cell style (Good) reaches every cell of a range', JSON.stringify(v.map(x => x.bg)));
  // a drag across cells, after one already made, still selects the range (not the text inside it)
  await range('A2', 'B4'); await range('A2', 'B4'); const rr = await fr.evaluate(() => window.__abGetSelRefs().length); ok(rr === 6, 'a second drag across the same cells selects them again', rr);
  // merge
  await range('A2', 'B4'); await press('#abWrap'); v = await look(R); ok(all(v, x => x.ws !== 'normal'), 'Wrap again unwraps every cell of a range', JSON.stringify(v.map(x => x.ws)));
  await range('A9', 'B9'); await press('#abMerge');
  v = await look(['A9', 'B9']); ok(v[0].span === 2 && v[1].hidden, 'Merge makes the range one cell', JSON.stringify(v.map(x => [x.span, x.hidden])));
  await cell('A9'); await press('#abMerge'); v = await look(['A9', 'B9']); ok(v[0].span === 1 && !v[1].hidden, 'Merge again unmerges it', JSON.stringify(v.map(x => [x.span, x.hidden])));
  // undo and redo of formatting
  await cell('C3'); await press('#bBold'); const ub = (await look(['C3']))[0].w; await press('#bUndo'); const ua = (await look(['C3']))[0].w; await press('#bRedo'); const ur = (await look(['C3']))[0].w;
  ok(+ub >= 600 && +ua < 600 && +ur >= 600, 'Undo takes Bold back, Redo gives it again', [ub, ua, ur].join(' -> '));
  // rows: the formatting moves with its cells
  await cell('A3'); await press('#abInsertRow'); v = await look(['A3', 'A4']); ok(v[0].text === '' && v[1].text === 'Pens' && +v[1].w >= 600 && v[1].i === 'italic', 'a row inserted above moves the cells below down, with their formatting', JSON.stringify(v.map(x => [x.text, x.w, x.i])));
  await cell('A3'); await press('#abDeleteRow'); v = await look(['A3']); ok(v[0].text === 'Pens' && +v[0].w >= 600, 'deleting the row brings them back, with their formatting', JSON.stringify(v.map(x => [x.text, x.w])));
  // its look
  const tabs = await fr.evaluate(() => [...document.querySelectorAll('.sheet-tab,.ab-sheet-tab,[class*="sheet-tab"]')].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return [e.textContent.trim(), Math.round(r.top)]; }));
  const rows = new Set(tabs.map(t => t[1])).size; ok(rows <= 1, 'one row of sheet tabs, not two', JSON.stringify(tabs));
  const overlap = await fr.evaluate(() => { const els = [...document.querySelectorAll('.status,#status,.tabs-bottom *,button')].filter(e => e.offsetParent && e.getBoundingClientRect().top > window.innerHeight - 90);
    const hits = []; for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) { const a = els[i], c = els[j]; if (a.contains(c) || c.contains(a)) continue; const A = a.getBoundingClientRect(), C = c.getBoundingClientRect();
      if (A.width && C.width && A.left < C.right - 1 && C.left < A.right - 1 && A.top < C.bottom - 1 && C.top < A.bottom - 1 && (a.textContent.trim() && c.textContent.trim())) hits.push([a.textContent.trim().slice(0, 20), c.textContent.trim().slice(0, 20)]); } return hits; });
  ok(!overlap.length, 'nothing at its foot is written over anything else', JSON.stringify(overlap));
  if (SHOT) await p.screenshot({ path: SHOT });
  // kept: open the page again
  await p.waitForTimeout(2500); await fr.evaluate(() => { try { if (window.__abacusFlush) window.__abacusFlush(); } catch (e) {} });
  const fe = await fr.evaluate(() => window.__fe); ok(!errs.length && !fe.length, 'no errors', errs.concat(fe).slice(0, 3).join(' | '));
  const memo = await fr.evaluate(() => ['A3', 'B3'].map(r => r + '=' + (window.__abx.data()[r] || '') + ' ' + JSON.stringify(window.__abx.sty()[r] || {})).join(' | '));
  await open(); v = await look(R);
  const after = await fr.evaluate(() => ['A3', 'B3'].map(r => r + '=' + (window.__abx.data()[r] || '') + ' ' + JSON.stringify(window.__abx.sty()[r] || {})).join(' | '));
  if (process.env.AB_TRACE) console.log('before opening again: ' + memo + '\nafter: ' + after);
  ok(all(v, x => +x.w >= 600 && x.i === 'italic' && x.fg === 'rgb(192, 57, 43)' && x.bg === 'rgb(244, 227, 178)' && x.a === 'right'), 'opened again, the range keeps its bold, italic, colours and alignment', JSON.stringify(v.map(x => [x.w, x.i, x.fg, x.bg, x.a])));
  // kept at once: a change, and Abacus opened again straight away
  await cell('E9'); await press('#bBold'); await press('#bItalic'); await open(); v = await look(['E9']);
  ok(+v[0].w >= 600 && v[0].i === 'italic', 'a change made just before Abacus is closed is there when it is opened again', JSON.stringify(v));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
