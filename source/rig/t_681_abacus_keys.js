// node rig/t_681_abacus_keys.js <Ingenium page url>
// 6.8.1: Abacus's grid answers the keys Excel's does, pressed as a person presses them (real presses of the pointer and keys,
// in Chromium): a cell chosen is replaced by what is typed, even after a second press; a double press or F2 edits it in place; Escape
// gives back what was there; the arrows go from cell to cell and, with Shift, widen the selection; Shift+Enter goes up;
// Cut, Copy and Paste take every cell selected, from the keys and from the ribbon, with their look and their formulas (whose
// references follow them), and columns copied in another program arrive in columns. All of it still there when Abacus is
// opened again. apps/abacus_ribbon_patch.py.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, permissions: ['clipboard-read', 'clipboard-write'] }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  let fr, fb;
  async function open() {
    await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(800); await p.evaluate(() => go('abacus'));
    await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { return !!f.contentWindow.document.querySelector('#grid td[data-ref="A1"]'); } catch (e) { return false; } }, null, { timeout: 120000 });
    await p.waitForTimeout(1500); const fh = await p.$('#ing-desk iframe[data-app="abacus"]'); fr = await fh.contentFrame(); fb = await fh.boundingBox();
    await fr.evaluate(() => { window.__fe = []; window.addEventListener('error', e => window.__fe.push(String(e.message))); });
  }
  await open();
  const at = async r => { const q = await fr.evaluate(r => { const e = document.querySelector('#grid td[data-ref="' + r + '"]'); e.scrollIntoView({ block: 'nearest' }); const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, r); return [fb.x + q[0], fb.y + q[1]]; };
  const click = async (r, n) => { const q = await at(r); await p.mouse.click(q[0], q[1], { clickCount: n || 1 }); await p.waitForTimeout(150); };
  const key = async k => { await p.keyboard.press(k); await p.waitForTimeout(120); };
  const type = async t => { await p.keyboard.type(t); await p.waitForTimeout(120); };
  const range = async (a, z) => { const A = await at(a), Z = await at(z); await p.mouse.move(A[0], A[1]); await p.mouse.down(); await p.mouse.move(Z[0], Z[1], { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(200); };
  const raw = r => fr.evaluate(r => { const v = window.__abx.data()[r]; return v == null ? '' : String(v); }, r);
  const shown = r => fr.evaluate(r => document.querySelector('#grid td[data-ref="' + r + '"]').textContent, r);
  const here = () => fr.evaluate(() => { const a = document.activeElement; return a && a.getAttribute ? a.getAttribute('data-ref') : null; });
  const chosen = () => fr.evaluate(() => (window.__abGetSelRefs() || []).slice().sort().join(','));
  // a number, a number, a formula; Enter goes down, an arrow ends the typing and goes on
  await click('A10'); await type('5'); await key('Enter'); ok(await here() === 'A11', 'Enter goes down a row', await here());
  await type('7'); await key('ArrowRight'); ok(await raw('A11') === '7' && await here() === 'B11', 'an arrow ends the typing, keeps it, and goes to the next cell', (await raw('A11')) + ' ' + (await here()));
  await type('=A10+A11'); await key('Enter'); ok(await shown('B11') === '12', 'a formula typed and kept', await shown('B11'));
  // what is typed in a cell chosen takes its place
  await click('A10'); await type('9'); await key('Enter'); ok(await raw('A10') === '9', 'typing in a chosen cell replaces what was there (it was added to it)', await raw('A10'));
  ok(await shown('B11') === '16', 'and the formula follows', await shown('B11'));
  // F2, a double press and a second press edit in place
  await click('A10'); await key('F2'); await type('1'); await key('Enter'); ok(await raw('A10') === '91', 'F2 edits the cell in place, the caret at its end', await raw('A10'));
  await click('A10', 2); await key('End'); await type('2'); await key('Enter'); ok(await raw('A10') === '912', 'a double press edits it in place', await raw('A10'));
  await click('A11'); await p.waitForTimeout(400); await click('A11'); await type('8'); await key('Enter'); ok(await raw('A11') === '8', 'a second press leaves the cell chosen, as in Excel: typing still replaces it', await raw('A11'));
  await click('A11'); await type('7'); await key('Enter');
  // Escape gives back what was there
  await click('A10'); await type('abc'); await key('Escape'); ok(await shown('A10') === '912', 'Escape gives back what was in the cell', await shown('A10'));
  await key('Enter'); ok(await raw('A10') === '912', 'and nothing typed is kept', await raw('A10'));
  // the arrows, Shift+Enter
  await click('C10'); await key('ArrowDown'); await key('ArrowDown'); await key('ArrowRight'); ok(await here() === 'D12', 'the arrows go from cell to cell', await here());
  await key('ArrowUp'); await key('Shift+Enter'); ok(await here() === 'D10', 'Shift+Enter goes up a row', await here());
  await click('A1'); await key('ArrowUp'); await key('ArrowLeft'); ok(await here() === 'A1', 'at the edge of the sheet the arrows stay', await here());
  // Shift and the arrows widen the selection
  await click('A10'); await key('Shift+ArrowDown'); await key('Shift+ArrowRight'); ok(await chosen() === 'A10,A11,B10,B11', 'Shift and the arrows widen the selection', await chosen());
  await key('ArrowDown'); ok(await chosen() === 'A11', 'and an arrow alone lets it go', await chosen());
  // Copy and Paste with the keys: values, look, formulas whose references follow
  await click('A10'); await fr.click('#bBold'); await p.waitForTimeout(200);
  await range('A10', 'B11'); await key('Control+c');
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e));
  ok(clip.replace(/\r/g, '') === '912\t\n7\t919', 'Ctrl+C puts the range on the clipboard as columns, as shown', JSON.stringify(clip));
  await click('D14'); await key('Control+v');
  ok([await raw('D14'), await raw('D15'), await raw('E15')].join('|') === '912|7|=D14+D15', 'Ctrl+V puts the range down from the cell chosen, its formula following it', [await raw('D14'), await raw('D15'), await raw('E15')].join('|'));
  ok(await shown('E15') === '919', 'and the formula is worked out there', await shown('E15'));
  ok(await fr.evaluate(() => +getComputedStyle(document.querySelector('#grid td[data-ref="D14"]')).fontWeight >= 600), 'the look comes with the cells (bold)');
  // $ keeps a column or a row fixed, as in Excel
  await click('H10'); await type('=$A$10+A$11+A11'); await key('Enter'); await click('H10'); await key('Control+c'); await click('I12'); await key('Control+v');
  ok(await raw('I12') === '=$A$10+B$11+B13', 'a reference with $ stays fixed where the $ is; the rest follows', await raw('I12'));
  // the ribbon's Copy and Paste on a range
  await range('A10', 'B11'); await fr.click('#abCopy'); await p.waitForTimeout(150); await click('G14'); await fr.click('#abPaste'); await p.waitForTimeout(200);
  ok([await raw('G14'), await raw('G15'), await raw('H15')].join('|') === '912|7|=G14+G15', "the ribbon's Copy and Paste take the whole range", [await raw('G14'), await raw('G15'), await raw('H15')].join('|'));
  // one cell copied onto a range fills it
  await click('A11'); await key('Control+c'); await range('C17', 'D18'); await key('Control+v');
  ok([await raw('C17'), await raw('D17'), await raw('C18'), await raw('D18')].join('|') === '7|7|7|7', 'one cell pasted onto a range fills every cell of it', [await raw('C17'), await raw('D17'), await raw('C18'), await raw('D18')].join('|'));
  // columns copied in another program
  await p.evaluate(() => navigator.clipboard.writeText('north\t1\nsouth\t2'));
  await click('F17'); await key('Control+v');
  ok([await raw('F17'), await raw('G17'), await raw('F18'), await raw('G18')].join('|') === 'north|1|south|2', 'columns copied in another program arrive in columns', [await raw('F17'), await raw('G17'), await raw('F18'), await raw('G18')].join('|'));
  // Cut, then Paste; Delete
  await click('G14'); await key('Control+x'); ok(await raw('G14') === '' && await shown('G14') === '', 'Ctrl+X takes the cell away', await raw('G14'));
  await click('I14'); await key('Control+v'); ok(await raw('I14') === '912', 'and Ctrl+V puts it down', await raw('I14'));
  await click('I14'); await key('Delete'); await key('Enter'); ok(await raw('I14') === '', 'Delete empties the chosen cell', await raw('I14'));
  // still there when Abacus is opened again
  await p.waitForTimeout(1200); await open();
  const kept = [await raw('A10'), await raw('B11'), await raw('E15'), await raw('F17'), await raw('C18')].join('|');
  ok(kept === '912|=A10+A11|=D14+D15|north|7', 'all of it is still there when Abacus is opened again', kept);
  const fe = await fr.evaluate(() => window.__fe); ok(!errs.length && !fe.length, 'no errors', errs.concat(fe).slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
