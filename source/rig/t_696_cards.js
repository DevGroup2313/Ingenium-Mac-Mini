// node rig/t_696_cards.js <Ingenium page url> <out dir>
// Ingenium 6.9.1 (31 October 2026), in Chromium. The owner's words: "The close button from the About panel is a different
// shade of purple from the rest of the app, please fix it. Also, I don't love the look of the "Where you were" card, please
// fix it." (modules/r196.js)
//   - About's Close key has the very look of the page's own primary key (its gradient, its gold ring, its lift), by day and by night;
//   - so do the primary keys of the Help panel and of the support notes;
//   - "Where you were": its lines carry drawn marks (no type glyph, no dotted circle), the title sits on a rule, the primary
//     key is the app's own, Not now is a raised ghost key, the card is no wider than its words, and it arrives with the spring;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(1000);
  const look = (sel) => p.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const cs = getComputedStyle(e); return { bg: cs.backgroundImage, sh: cs.boxShadow, color: cs.color, bc: cs.borderTopColor, text: e.textContent.trim(), shown: !!(e.getClientRects().length) }; }, sel);
  for (const theme of ['day', 'night']) {
    await p.evaluate((t) => document.body.setAttribute('data-theme', t), theme); await p.waitForTimeout(300);
    // a reference: the page's own primary key on Home
    await p.evaluate(() => go('home')); await p.waitForTimeout(400);
    const ref = await p.evaluate(() => { let e = [...document.querySelectorAll('.btn.primary')].find(x => x.getClientRects().length && !x.closest('#modalBox,#ihPanel,#displayPanel,#supNotice,.tour-card,#custodiaOverlay'));
      let made = null; if (!e) { made = document.createElement('button'); made.className = 'btn primary'; made.textContent = 'A key of the page'; document.querySelector('main.main').appendChild(made); e = made; }
      const cs = getComputedStyle(e); const r = { bg: cs.backgroundImage, sh: cs.boxShadow, color: cs.color, text: e.textContent.trim() }; if (made) made.remove(); return r; });
    ok(ref && /linear-gradient/.test(ref.bg), theme + ': a primary key of the page itself was found to compare with (' + (ref && ref.text) + ')', ref);
    // About
    await p.evaluate(() => { const k = document.getElementById('aboutBtn') || [...document.querySelectorAll('button')].find(x => /^About$/.test(x.textContent.trim()) && x.getClientRects().length); if (k) k.click(); }); await p.waitForTimeout(900);
    const close = await look('#modalBox #aClose');
    ok(close && close.shown && close.bg === ref.bg && close.sh === ref.sh && close.color === ref.color, theme + ": About's Close has the very look of the page's primary key (gradient, gold ring, shadow)", { close, ref });
    await p.screenshot({ path: OUT + '/about_' + theme + '.png' });
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    // "Where you were"
    await p.evaluate(() => { document.querySelectorAll('#supNotice .sup-note').forEach(n => n.remove()); state.parked = state.parked || []; if (!state.parked.some(x => x.__t696)) state.parked.unshift({ id: 'park-t696', t: 'Reread the 1536 letter', at: Date.now(), __t696: true }); supResume(true); }); await p.waitForTimeout(800);
    const card = await p.evaluate(() => { const n = document.getElementById('supResumeNote'); if (!n) return null; const cs = getComputedStyle(n), r = n.getBoundingClientRect();
      const icons = [...n.querySelectorAll('.fx-ico')].map(i => ({ svg: !!i.querySelector('svg'), text: i.textContent.trim(), mark: i.getAttribute('data-mark'), bg: getComputedStyle(i).backgroundImage }));
      const keys = [...n.querySelectorAll('.sup-note-acts .btn')].map(k => { const c = getComputedStyle(k); return { t: k.textContent.trim(), primary: k.classList.contains('primary'), bg: c.backgroundImage, sh: c.boxShadow }; });
      const title = n.querySelector('.sup-note-title'); const tc = title && getComputedStyle(title);
      return { w: Math.round(r.width), anim: cs.animationName, icons, keys, title: title && title.textContent, rule: tc && tc.borderBottomWidth, font: tc && tc.fontFamily.slice(0, 20) }; });
    ok(card && card.icons.length >= 1 && card.icons.every(i => i.svg && !i.text && /linear-gradient/.test(i.bg)), theme + ': "Where you were": each line carries a drawn mark on an amethyst disc, no type glyph', card && card.icons);
    ok(card && card.keys.some(k => !k.primary && /Not now/.test(k.t) && /linear-gradient/.test(k.bg)), theme + ': Not now is a raised ghost key, not a flat outline', card && card.keys);
    ok(card && card.w <= 440 && card.w < 1000 && card.anim === 'rcIn' && /^(0\.5|1)px$/.test(card.rule) && /Georgia|serif|Gelasio|Iowan/i.test(card.font || ''), theme + ': the card is no wider than its words, arrives with the spring, its title in the serif on a fine rule', card && { w: card.w, anim: card.anim, rule: card.rule, font: card.font });
    await p.screenshot({ path: OUT + '/where_' + theme + '.png', clip: { x: 0, y: 650, width: 640, height: 300 } });
    await p.evaluate(() => { document.querySelectorAll('#supNotice .sup-note').forEach(n => n.remove()); state.parked = (state.parked || []).filter(x => !x.__t696); });
  }
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  ok(errs.length === 0, 'no errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
