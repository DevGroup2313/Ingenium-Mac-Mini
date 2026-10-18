// R129: Tabula keeps its raised pages and its 3D notes key when it stands alone, and a host draws its pages as before.
// The owner's words: "Why does Tabula look flat and have this small gap between the pages, please restore Tabula's look."
// "This is a big regression even on Schedae button."
// Usage: node t_tabula_look.js <R129 Tabula page> <R128 Tabula page> <outdir> [<Carpe Diem page carrying R129>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [NEW, OLD, OUT, HOST] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
const PARAS = () => { let h = ''; for (let i = 0; i < 14; i++) h += '<p>Paragraph ' + (i + 1) + '. ' + 'The argument turns on what the evidence can bear, and on what a careful reader would accept as shown rather than assumed. '.repeat(5) + '</p>'; return h; };
// what the pages look like: the cards, the gaps between them, the band of the flat sheet, the notes key
const LOOK = () => {
  const paper = document.getElementById('editor').closest('.paper'), cards = [...document.querySelectorAll('#cd-pages .cd-page')].filter(c => c.style.display !== 'none');
  const gaps = []; for (let i = 1; i < cards.length; i++) gaps.push(Math.round(cards[i].getBoundingClientRect().top - cards[i - 1].getBoundingClientRect().bottom));
  const sep = document.querySelector('#pageguides .pg-sep'), band = sep ? getComputedStyle(sep, '::after') : null;
  const k = document.getElementById('stickyBtn'), kc = k && getComputedStyle(k), kb = k && getComputedStyle(k, '::before'), svg = k && k.querySelector('svg');
  return { real: !!(paper && paper.classList.contains('cd-realpaper')), cards: cards.length, seps: document.querySelectorAll('#pageguides .pg-sep').length, gaps,
    shadow: cards[0] ? (getComputedStyle(cards[0]).boxShadow.match(/rgba?\(/g) || []).length : 0, band: band ? band.display + ' ' + band.height : null,
    styles: document.querySelectorAll('#cd-realpages-style').length,
    key: k ? { disp: kc.display, bg: kc.backgroundColor, sh: kc.boxShadow, glyph: kb.content, anim: kb.animationName, svg: svg ? getComputedStyle(svg).display : null } : null };
};
(async () => {
  const b = await pw.chromium.launch();
  const open = async (url, tag) => {
    const p = await b.newPage({ viewport: { width: 1280, height: 860 } }); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto(url, { timeout: 120000 }); await p.waitForFunction(() => !!document.getElementById('editor'), null, { timeout: 60000 }); await p.waitForTimeout(1500);
    await p.evaluate((h) => { const e = document.getElementById('editor'); e.innerHTML = h; e.dispatchEvent(new Event('input', { bubbles: true })); }, PARAS());
    await p.waitForTimeout(4500);
    const look = await p.evaluate(LOOK);
    await p.evaluate(() => { const s = document.querySelector('#pageguides .pg-sep'); if (s) s.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(700);
    await p.screenshot({ path: OUT + '/' + tag + '-pages.png' });
    const kr = await p.evaluate(() => { const k = document.getElementById('stickyBtn'); if (!k) return null; const r = k.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    if (kr && kr.w) await p.screenshot({ path: OUT + '/' + tag + '-key.png', clip: { x: Math.max(0, kr.x - 40), y: Math.max(0, kr.y - 40), width: kr.w + 80, height: kr.h + 80 } });
    return { p, look, errs, kr };
  };

  // 1. before: the bare page was the flat sheet (the picture the owner saw)
  const o = await open(OLD, 'r128-alone');
  ok(!o.look.real && o.look.cards === 0 && /^block 9px/.test(o.look.band || '') && o.look.key && /rgb\(42, 38, 34\)/.test(o.look.key.bg), 'before: Tabula alone drew one flat sheet with a thin band at each break, and a flat dark notes disc', JSON.stringify(o.look));
  await o.p.close();

  // 2. after: Tabula alone draws a raised card for each page, with the hosts' wide gap
  const n = await open(NEW, 'r129-alone');
  ok(n.look.real && n.look.seps >= 3 && n.look.cards === n.look.seps + 1, 'alone, it now draws a card for each page', JSON.stringify({ real: n.look.real, cards: n.look.cards, seps: n.look.seps }));
  ok(n.look.gaps.length >= 3 && n.look.gaps.every(g => g >= 70 && g <= 90), 'with a wide gap between the pages (about 80 px, as in every host)', JSON.stringify(n.look.gaps));
  ok(n.look.shadow >= 6 && n.look.band === 'none 9px' && n.look.styles === 1, 'each card raised by its layered shadow, the thin band gone, and the layer drawn once', JSON.stringify({ shadow: n.look.shadow, band: n.look.band, styles: n.look.styles }));
  const k = n.look.key;
  ok(k && k.disp === 'flex' && k.bg === 'rgba(0, 0, 0, 0)' && k.sh === 'none' && k.svg === 'none' && /\u{1F5D2}/u.test(k.glyph) && k.anim === 'tabKeyBreathe', 'its notes key wears the hosts\' Schedae look: the notepad, raised, breathing', JSON.stringify(k));
  // the key lifts under the pointer and settles when pressed
  await n.p.mouse.move(n.kr.x + n.kr.w / 2, n.kr.y + n.kr.h / 2); await n.p.waitForTimeout(400);
  const hov = await n.p.evaluate(() => getComputedStyle(document.getElementById('stickyBtn')).transform);
  await n.p.mouse.down(); await n.p.waitForTimeout(200);
  const prs = await n.p.evaluate(() => getComputedStyle(document.getElementById('stickyBtn')).transform); await n.p.mouse.up();
  const ty = (m) => { const v = (m.match(/matrix\(([^)]+)\)/) || [, '1,0,0,1,0,0'])[1].split(',').map(Number); return { s: v[0], y: v[5] }; };
  ok(ty(hov).y < -1 && ty(hov).s > 1.02 && ty(prs).y > 0 && ty(prs).s < 1, 'the key lifts under the pointer and settles when pressed', JSON.stringify({ hover: ty(hov), press: ty(prs) }));
  // the pages follow the writing: a new page appears whole, and the cards still line up with the breaks
  await n.p.evaluate(() => { const e = document.getElementById('editor'); e.insertAdjacentHTML('beforeend', e.innerHTML); e.dispatchEvent(new Event('input', { bubbles: true })); });
  await n.p.waitForTimeout(4500);
  const more = await n.p.evaluate(LOOK);
  ok(more.cards === more.seps + 1 && more.seps > n.look.seps && more.gaps.every(g => g >= 70 && g <= 90), 'as the text grows, each new page gets its card and its gap', JSON.stringify({ cards: more.cards, seps: more.seps }));
  // night: the cards turn dark with the sheet
  await n.p.evaluate(() => { document.documentElement.classList.add('cd-dark'); document.body.style.background = '#14171c'; window.postMessage({ kind: 'cd-theme-apply' }, '*'); });
  await n.p.waitForTimeout(2200);
  const night = await n.p.evaluate(() => { const w = document.getElementById('cd-pages'); const c = document.querySelector('#cd-pages .cd-page'); return { night: w && w.classList.contains('cd-night'), bg: c && getComputedStyle(c).backgroundColor }; });
  ok(night.night && night.bg === 'rgb(49, 55, 63)', 'by night the cards turn dark, as in every host', JSON.stringify(night));
  await n.p.evaluate(() => { const s = document.querySelector('#pageguides .pg-sep'); if (s) s.scrollIntoView({ block: 'center' }); }); await n.p.waitForTimeout(500);
  await n.p.screenshot({ path: OUT + '/r129-alone-night.png' });
  ok(n.errs.length === 0 && o.errs.length === 0, 'no page errors', JSON.stringify(n.errs.concat(o.errs).slice(0, 3)));
  await n.p.close();

  // 3. in a host: Carpe Diem's own copy of the layer stands aside, and its pages look as before
  if (HOST) {
    const p = await b.newPage({ viewport: { width: 1280, height: 860 } }); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto(HOST, { timeout: 120000 }); await p.waitForTimeout(6000);
    await p.click('text=Start fresh', { timeout: 4000 }).catch(() => {}); await p.waitForTimeout(1200);
    await p.evaluate(() => { try { if (document.getElementById('cd-door')) cdCloseDoor(); } catch (e) {} }); await p.waitForTimeout(500);
    await p.evaluate(() => openTextInTabula('Pages', 'x')); await p.waitForTimeout(6000);
    const fr = await (await p.$('#frame-tabula')).contentFrame();
    await fr.evaluate((h) => { const e = document.getElementById('editor'); e.innerHTML = h; e.dispatchEvent(new Event('input', { bubbles: true })); }, PARAS());
    await p.waitForTimeout(4500);
    const h = await fr.evaluate(LOOK);
    const both = await fr.evaluate(() => ({ own: !!document.getElementById('tab-realpages'), host: !!document.getElementById('cd-realpages') }));
    ok(both.own && both.host && h.styles === 1 && h.real && h.cards === h.seps + 1 && h.gaps.every(g => g >= 70 && g <= 90), 'in Carpe Diem both copies are on the page, one draws, and the pages look as before', JSON.stringify({ both, styles: h.styles, cards: h.cards, seps: h.seps, gaps: h.gaps }));
    ok(h.key && h.key.disp === 'none', 'Carpe Diem still hides Tabula\'s own notes key and shows its Schedae key', JSON.stringify(h.key && h.key.disp));
    await fr.evaluate(() => { const s = document.querySelector('#pageguides .pg-sep'); if (s) s.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(600);
    await p.screenshot({ path: OUT + '/r129-in-carpe-diem.png' });
    ok(errs.length === 0, 'no page errors in Carpe Diem', JSON.stringify(errs.slice(0, 3)));
    await p.close();
  }
  await b.close();
  console.log(`RESULT ${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
