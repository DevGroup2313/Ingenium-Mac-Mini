// node rig/t_681_imago.js <Ingenium page url> [screenshot.png]
// 6.8.1: Imago's ribbon inside Ingenium, pressed as a person presses it (real presses of the pointer and keys, in Chromium;
// rig/t_681_imago_wk.py runs the same in Safari's engine): words chosen with a double-click in a slide's text, each key and
// list once; the words typed after choosing a colour, a size or bold with nothing selected; Grow and Shrink twice; and all
// of it still there after moving to another slide and back, and after Imago is opened again.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2], SHOT = process.argv[3];
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
const WORD = (W) => { const f = document.querySelector('#slide .s-sub'); const tw = document.createTreeWalker(f, 4); let n, m; while ((n = tw.nextNode())) { m = new RegExp('\\b' + W + '\\b').exec(n.nodeValue); if (m) return [f, n, m]; } return [f, null, null]; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  let fr, fb;
  async function open() {
    await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    await p.waitForTimeout(800); await p.evaluate(() => go('slides'));
    await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="slides"]'); try { return !!f.contentWindow.document.querySelector('#slide .s-sub'); } catch (e) { return false; } }, null, { timeout: 120000 });
    await p.waitForTimeout(1500); const fh = await p.$('#ing-desk iframe[data-app="slides"]'); fr = await fh.contentFrame(); fb = await fh.boundingBox();
    await fr.evaluate(() => { window.__fe = []; window.addEventListener('error', e => window.__fe.push(String(e.message))); });
  }
  await open();
  const src = '(' + WORD + ')';
  const st = w => fr.evaluate(([W, s]) => { const [f, n, m] = eval(s)(W); if (!m) return null; const e = n.parentElement, c = getComputedStyle(e); let bg = '';
    for (let x = e; x && x !== f.parentElement; x = x.parentElement) { const v = getComputedStyle(x).backgroundColor; if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') { bg = v; break; } if (x === f) break; }
    return { color: c.color, size: parseFloat(c.fontSize), weight: +c.fontWeight, style: c.fontStyle, deco: c.textDecorationLine, family: c.fontFamily.split(',')[0].replace(/["']/g, ''), bg }; }, [w, src]);
  const pick = async w => { const pt = await fr.evaluate(([W, s]) => { const [f, n, m] = eval(s)(W); const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + W.length); const b = r.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, [w, src]);
    await p.mouse.dblclick(fb.x + pt[0], fb.y + pt[1]); await p.waitForTimeout(250);
    if ((await fr.evaluate(() => String(getSelection()).trim())) !== w && !pick.again) { pick.again = 1; await p.waitForTimeout(400); await pick(w); pick.again = 0; } };
  const key = async title => { const ok2 = await fr.evaluate(t => { const e = [...document.querySelectorAll('#ribHome button')].find(e => e.offsetParent && (e.title === t || e.title.indexOf(t) === 0)); return !!e; }, title);
    if (!ok2) throw new Error('no key ' + title); const bb = await fr.evaluate(t => { const e = [...document.querySelectorAll('#ribHome button')].find(e => e.offsetParent && (e.title === t || e.title.indexOf(t) === 0)); const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, title);
    await p.mouse.click(fb.x + bb[0], fb.y + bb[1]); await p.waitForTimeout(250); };
  const list = async (first, label) => { const i = await fr.evaluate(([f, l]) => { const s = [...document.querySelectorAll('#ribHome select')].find(s => s.options[0] && s.options[0].text === f); s.setAttribute('data-t681', '1'); return [...s.options].findIndex(o => o.text === l); }, [first, label]);
    await fr.selectOption('#ribHome select[data-t681="1"]', { index: i }); await fr.evaluate(() => document.querySelector('#ribHome select[data-t681="1"]').removeAttribute('data-t681')); await p.waitForTimeout(250); };
  const typed = async w => { await p.keyboard.type(w + ' '); await p.waitForTimeout(250); };
  // the subtitle box, with words to format
  const sub = await fr.evaluate(() => { const r = document.querySelector('#slide .s-sub').getBoundingClientRect(); return [r.left + 20, r.top + r.height / 2]; });
  await p.mouse.click(fb.x + sub[0], fb.y + sub[1]); await p.waitForTimeout(200);
  await p.keyboard.type('Alpha beta gamma delta epsilon zeta theta iota kappa lambda omicron sigma. '); await p.waitForTimeout(300);
  const base = await st('Alpha');
  const later = []; const check = async (what, w, test) => { const v = await st(w); ok(v && test(v), what, JSON.stringify(v)); later.push([what, w, test]); };
  await pick('beta'); await key('Bold'); await check('Bold bolds the selected word', 'beta', v => v.weight >= 600);
  await pick('gamma'); await key('Italic'); await check('Italic', 'gamma', v => v.style === 'italic');
  await pick('delta'); await key('Underline'); await check('Underline', 'delta', v => /underline/.test(v.deco));
  await pick('epsilon'); await key('Strikethrough'); await check('Strikethrough', 'epsilon', v => /line-through/.test(v.deco));
  await pick('zeta'); await key('#6E1F2E'); await check('a text colour colours the selected word', 'zeta', v => v.color === 'rgb(110, 31, 46)');
  await pick('theta'); await key('#F4E3B2'); await check('a highlight marks the selected word', 'theta', v => v.bg === 'rgb(244, 227, 178)');
  await pick('iota'); await list('Size', '24 pt'); await check('24 pt makes the selected word half again its size', 'iota', v => Math.abs(v.size - base.size * 1.5) < 1);
  await pick('kappa'); await list('Default', 'Serif (Georgia)'); await check('the font list sets the selected word', 'kappa', v => v.family === 'Georgia');
  await pick('lambda'); await key('Grow the selected text'); await key('Grow the selected text'); const g = (await st('lambda')).size;
  ok(g > base.size * 1.3, 'Grow, pressed twice, grows the word twice', base.size + ' -> ' + g);
  await pick('omicron'); await key('Shrink the selected text'); await key('Shrink the selected text'); const sh = (await st('omicron')).size;
  ok(sh < base.size * 0.75, 'Shrink, pressed twice, shrinks the word twice', base.size + ' -> ' + sh);
  // Change case, pressed three times on the same word: Title, CAPITALS, small letters, as in Word
  await pick('sigma'); const cs = [];
  for (let k = 0; k < 3; k++) { await key('Change the case'); cs.push(await fr.evaluate(() => document.querySelector('#slide .s-sub').textContent.match(/\b(sigma|Sigma|SIGMA)\b/)[0])); }
  ok(cs.join() === 'Sigma,SIGMA,sigma', 'Change case, pressed three times, goes Title, CAPITALS, small letters', cs.join());
  // nothing selected, then typing
  await p.keyboard.press('End'); await p.keyboard.press('Control+End'); await p.waitForTimeout(150);
  await key('#2F4F3A'); await typed('green'); await check('a colour chosen with nothing selected reaches the words typed next', 'green', v => v.color === 'rgb(47, 79, 58)');
  await list('Size', '24 pt'); await typed('large'); await check('24 pt chosen with nothing selected: the next word is half again its size', 'large', v => Math.abs(v.size - base.size * 1.5) < 1);
  await list('Size', '16 pt'); await key('Bold'); await typed('heavy'); await check('bold pressed with nothing selected reaches the words typed next', 'heavy', v => v.weight >= 600);
  if (SHOT) await p.screenshot({ path: SHOT });
  // another slide and back
  await fr.evaluate(() => { const e = [...document.querySelectorAll('#ribHome button')].find(e => e.offsetParent && /^Add a slide/.test(e.title)); e.click(); }); await p.waitForTimeout(700);
  const th = await fr.evaluate(() => { const t = document.querySelectorAll('#thumbs .thumb')[0]; const r = t.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.click(fb.x + th[0], fb.y + th[1]); await p.waitForTimeout(700);
  ok(await fr.evaluate(() => !!document.querySelector('#slide .s-sub')), 'back on the first slide, from its thumbnail');
  for (const [what, w, test] of later) { const v = await st(w); ok(v && test(v), what + ', and is still there after another slide', JSON.stringify(v)); }
  const fe = await fr.evaluate(() => window.__fe); ok(!errs.length && !fe.length, 'no errors', errs.concat(fe).slice(0, 3).join(' | '));
  await p.waitForTimeout(1500); await open();
  for (const [what, w, test] of later) { const v = await st(w); ok(v && test(v), what + ', and is still there when Imago is opened again', JSON.stringify(v)); }
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
