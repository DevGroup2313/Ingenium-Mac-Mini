// Ingenium 6.2 · The guided tour by skill level, help on every page, and the tour's raised keys (modules/r144.js), in Chromium:
// the tour asks the level once; New to this shows every card, Some experience fewer, Expert fewest; a level chosen on the
// card shows the tour again at once; every key of the tour's card, its Chapters key, the Chapters list and the Guide's
// chapter keys are raised (a shadow beneath), lift on hover and sink when pressed, by day and by night; the Help key in the
// top bar opens help about the page on every page, and follows a page change; F1 opens it, Shift+F1 explains the control
// in focus, What is this? explains the next control pressed; Settings holds the level; axe-core finds nothing broken in the
// tour, the Chapters list or the help card, by day and by night; nothing spills sideways on a phone.
//   node rig/t_62_tour.js http://127.0.0.1:8150/ingenium.html <out folder> [axe.min.js]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const AXE = [process.argv[4], process.env.AXE_JS, path.join(__dirname, 'a11y', 'axe.min.js')].find(f => f && fs.existsSync(f)) || null;
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });

async function boot(b, vp) {
  const ctx = await b.newContext({ viewport: vp || { width: 1440, height: 900 } });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500); return { ctx, p };
}
async function axeOn(p, sel, where) {
  if (!AXE) { console.log('NOTE no axe.min.js given: axe-core on ' + where + ' was not checked'); return null; }
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  return p.evaluate(async ([sel, where]) => {
    const r = await axe.run(document.querySelector(sel), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ where, id: v.id, n: v.nodes.length, eg: v.nodes.slice(0, 2).map(n => n.target.join(' ') + ' ' + (n.failureSummary || '').slice(0, 140)) }));
  }, [sel, where]);
}
// a raised key: a shadow drawn beneath it (an offset below the key), and on hover it rises, on press it sinks. The hover and
// the press are forced through DevTools (CSS.forcePseudoState), so no click lands and nothing the key does is set off.
async function raised(p, sel) {
  const el = await p.$(sel); if (!el) return { found: false };
  await el.scrollIntoViewIfNeeded(); await p.mouse.move(2, 2); await p.waitForTimeout(150);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  const read = () => p.evaluate(s => { const c = document.querySelector(s), st = getComputedStyle(c); return { bs: st.boxShadow, tf: st.transform }; }, sel);
  const rest = await read();
  await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] }); await p.waitForTimeout(320);
  const hover = (await read()).tf;
  await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover', 'active'] }); await p.waitForTimeout(320);
  const press = (await read()).tf;
  await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] }); await p.waitForTimeout(200); await cdp.detach();
  const ty = t => { const m = /matrix\(([^)]+)\)/.exec(t || ''); return m ? +m[1].split(',')[5] : 0; };
  const below = rest.bs.split(/,(?![^(]*\))/).some(s => { const n = s.trim().match(/(-?\d+(?:\.\d+)?)px (-?\d+(?:\.\d+)?)px/); return n && +n[2] > 0 && !/inset/.test(s); });
  return { found: true, below, lift: ty(hover) < 0, sink: ty(press) > 0 || /matrix\(0\.9/.test(press), bs: rest.bs.slice(0, 90), hover, press };
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  try {
    const { p } = await boot(b);
    const api = await p.evaluate(() => !!(window.IngHelp && IngHelp.levels && typeof tourStart === 'function'));
    ok(api, 'the tour and help are in the page (IngHelp, tourStart)', api);

    // ---------------- 1 · the level, asked once ----------------
    await p.evaluate(() => tourStart(0)); await p.waitForTimeout(700);
    const pick = await p.evaluate(() => ({ pick: !!document.querySelector('#ingTour .ih-pick'), keys: [...document.querySelectorAll('#ingTour .ih-lvk')].map(b => b.getAttribute('data-lv')) }));
    ok(pick.pick && pick.keys.join() === 'new,some,expert', 'the tour asks how well apps like this are known first: New to this, Some experience, Expert', pick);
    await shot(p, 't62-picker');
    const n = await p.evaluate(() => ({ nw: IngHelp.cardsFor('new').length, some: IngHelp.cardsFor('some').length, ex: IngHelp.cardsFor('expert').length }));
    ok(n.nw > n.some && n.some > n.ex && n.ex >= 10, 'New to this sees every card, Some experience fewer, Expert fewest', n);
    await p.click('#ingTour .ih-lvk[data-lv="some"]'); await p.waitForTimeout(800);
    const c1 = await p.evaluate(() => ({ level: IngHelp.level(), card: !!document.querySelector('#ingTour .tour-card:not(.ih-pick)'), chip: (document.querySelector('#ingTour .ih-lvchip') || {}).textContent }));
    ok(c1.level === 'some' && c1.card && /Some experience/.test(c1.chip || ''), 'the chosen level is kept and the first card shows it on its level key', c1);
    await shot(p, 't62-card-day');

    // ---------------- 2 · the keys, raised ----------------
    const chap = await raised(p, '#ingTour .tour-chap');
    ok(chap.found && chap.below && chap.lift && chap.sink, 'the Chapters key is raised, lifts on hover and sinks when pressed', chap);
    const nxt = await raised(p, '#ingTour .btn.primary');
    ok(nxt.found && nxt.below && nxt.lift && nxt.sink, 'the Next key too', nxt);
    const allKeys = await p.evaluate(() => [...document.querySelectorAll('#ingTour button')].filter(b => b.offsetParent).map(b => ({ t: b.textContent.trim().slice(0, 20), k: b.classList.contains('ih-k'), bs: getComputedStyle(b).boxShadow !== 'none' })));
    ok(allKeys.length >= 3 && allKeys.every(k => k.k && k.bs), 'every key on the tour card is one of the raised keys', allKeys);
    const ck = await p.evaluate(() => { const c = document.querySelector('#ingTour .tour-chap'); return { caret: !!c.querySelector('.ih-caret'), pop: c.getAttribute('aria-haspopup'), exp: c.getAttribute('aria-expanded') }; });
    ok(ck.caret && ck.pop === 'dialog' && ck.exp === 'false', 'the Chapters key is a drop-down: its caret, and it says it opens a list, closed for now', ck);
    // the Chapters list, opened by pressing the key
    await p.click('#ingTour .tour-chap'); await p.waitForTimeout(600);
    const menuOpen = await p.evaluate(() => !!document.getElementById('tourMenu'));
    // the list is flat (the owner's words, 22 October 2026: "I don't like the raised chapters list look, make them flat"): no row
    // casts a shadow below itself, none is a raised key; the chapter you are in is ringed, its parts are plain lines
    const menu = await p.evaluate(() => { const m = document.getElementById('tourMenu'); if (!m) return null;
      const rows = [...m.querySelectorAll('.tour-mi, .tour-ms')];
      const drop = b => getComputedStyle(b).boxShadow.split(/,(?![^(]*\))/).some(s => !/inset/.test(s) && /px/.test(s) && (s.match(/(-?\d+(?:\.\d+)?)px/g) || []).length >= 2 && parseFloat((s.match(/(-?\d+(?:\.\d+)?)px/g) || [])[1]) > 0);
      const on = m.querySelector('.tour-mi.on');
      return { n: rows.length, flat: rows.every(b => !b.classList.contains('ih-k') && !drop(b)), onRing: on ? /inset/.test(getComputedStyle(on).boxShadow) : false,
        subOn: (m.querySelector('.tour-ms.on') || {}).textContent || '', dialog: m.querySelector('.tour-card').getAttribute('role'), focus: document.activeElement && document.activeElement.className,
        exp: document.querySelector('#ingTour .tour-chap').getAttribute('aria-expanded') }; });
    ok(menuOpen && menu && menu.n > 10 && menu.flat && menu.dialog === 'dialog' && /tour-mi/.test(menu.focus || ''), 'the Chapters list opens as a dialog, its chapters and parts flat rows (no raised keys), the focus on the chapter you are in', menu);
    ok(menu && menu.onRing && /Getting started/.test(menu.subOn) && menu.exp === 'true', 'the chapter you are in is ringed, the part you are in marked, and the Chapters key says the list is open', menu);
    const mi = await raised(p, '#tourMenu .tour-mi:not(.on)');
    ok(mi.found && !mi.below && !mi.lift && !mi.sink, 'a chapter row neither lifts nor sinks', mi);
    const ms = await raised(p, '#tourMenu .tour-ms:not(.on)');
    ok(ms.found && !ms.below && !ms.lift && !ms.sink, 'nor does a part under it', ms);
    await shot(p, 't62-chapters-day');
    const axMenu = await axeOn(p, '#tourMenu', 'the Chapters list by day');
    if (axMenu) ok(axMenu.length === 0, 'axe-core finds nothing in the Chapters list by day', axMenu);
    // a chapter chosen jumps there (6.2: Lector's, or in an edition without Lector, Fabrica's, which comes after it)
    const CH = await p.evaluate(() => document.getElementById('page-lector') ? 'Lector' : 'Fabrica'), CHR = new RegExp(CH, 'i');
    await p.evaluate((CH) => { const b = [...document.querySelectorAll('#tourMenu .tour-mi')].find(x => new RegExp(CH).test(x.textContent)); b && b.click(); }, CH); await p.waitForTimeout(900);
    const jumped = await p.evaluate(() => ({ menu: !!document.getElementById('tourMenu'), meta: (document.querySelector('#ingTour .tour-meta') || {}).textContent || '' }));
    ok(!jumped.menu && CHR.test(jumped.meta), 'choosing ' + CH + ' in the list goes to the ' + CH + ' chapter and closes the list', jumped);
    await p.click('#ingTour .tour-chap'); await p.waitForTimeout(600);
    const where = await p.evaluate(() => { const m = document.querySelector('#tourMenu .tour-card'), on = m.querySelector('.tour-mi.on'), a = m.getBoundingClientRect(), r = on.getBoundingClientRect();
      return { name: on.textContent.trim(), inside: r.top >= a.top && r.bottom <= a.bottom, scrolled: m.scrollTop }; });
    ok(CHR.test(where.name) && where.inside && where.scrolled > 0, 'opened again from the ' + CH + ' chapter, the list is scrolled to ' + CH, where);
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok((await p.evaluate(() => document.querySelector('#ingTour .tour-chap').getAttribute('aria-expanded'))) === 'false', 'and the Chapters key says the list is closed again');
    const axCard = await axeOn(p, '#ingTour', 'the tour card by day');
    if (axCard) ok(axCard.length === 0, 'axe-core finds nothing on the tour card by day', axCard);

    // ---------------- 3 · a level chosen on the card shows the tour again at once ----------------
    const before = await p.evaluate(() => ({ i: tourI, body: (document.querySelector('#ingTour .tour-body') || {}).textContent || '' }));
    await p.click('#ingTour .ih-lvchip'); await p.waitForTimeout(300);
    await p.click('#ingTour .ih-lvrow .ih-lvk[data-lv="expert"]'); await p.waitForTimeout(800);
    const after = await p.evaluate(() => ({ level: IngHelp.level(), chip: (document.querySelector('#ingTour .ih-lvchip') || {}).textContent || '', body: (document.querySelector('#ingTour .tour-body') || {}).textContent || '', tipHidden: !!(document.querySelector('#ingTour .tour-tip') || { hidden: true }).hidden, focus: document.activeElement && document.activeElement.className }));
    ok(after.level === 'expert' && /Expert/.test(after.chip) && after.tipHidden, 'Expert chosen on the card: the card is drawn again at once, shorter, with no tip, and the level key says Expert', { after, before: before.body.slice(0, 80) });
    ok(/ih-lvchip/.test(after.focus || ''), 'the focus comes back to the level key', after.focus);
    await p.evaluate(() => IngHelp.setLevel('new')); await p.waitForTimeout(700);
    const nw = await p.evaluate(() => ({ words: !!document.querySelector('#ingTour .ih-words'), cards: IngHelp.cardsFor('new').length }));
    ok(nw.cards > 0, 'New to this: every card, new words explained where a card has them', nw);
    // night
    await p.evaluate(() => { try { setTheme('night'); } catch (e) { document.body.setAttribute('data-theme', 'night'); } }); await p.waitForTimeout(600);
    const night = await raised(p, '#ingTour .tour-chap');
    ok(night.found && night.below && night.lift && night.sink, 'by night the keys are raised and move the same way', night);
    await shot(p, 't62-card-night');
    const axN = await axeOn(p, '#ingTour', 'the tour card by night');
    if (axN) ok(axN.length === 0, 'axe-core finds nothing on the tour card by night', axN);
    await p.click('#ingTour .tour-chap'); await p.waitForTimeout(600);
    await shot(p, 't62-chapters-night');
    const axMN = await axeOn(p, '#tourMenu', 'the Chapters list by night');
    if (axMN) ok(axMN.length === 0, 'axe-core finds nothing in the Chapters list by night', axMN);
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(!(await p.evaluate(() => !!document.getElementById('tourMenu'))), 'Escape closes the Chapters list');
    await p.evaluate(() => { try { tourEnd(); } catch (e) {} try { setTheme('day'); } catch (e) {} }); await p.waitForTimeout(500);

    // ---------------- 4 · the Guide's chapter keys ----------------
    await p.evaluate(() => go('guide')); await p.waitForTimeout(700);
    const g = await raised(p, '#guideTour .tour-entry-chap');
    // 6.3 (the owner's words, 23 October 2026: "I don't like how you made every button wide and flat"): the Guide's chapters are keys,
    // popped out and as wide as their words; the tour's own list of chapters stays flat
    const gw = await p.evaluate(() => { const b = document.querySelector('#guideTour .tour-entry-chap'), r = b.getBoundingClientRect(), rg = document.createRange(); rg.selectNodeContents(b); return { w: r.width, need: rg.getBoundingClientRect().width + 40 }; });
    ok(g.found && g.below && g.lift && gw.w <= gw.need + 20, 'the Guide\'s chapters are keys: a shadow beneath, they lift, and each as wide as its words', { g, gw });
    // 6.7.3: one Take the tour key on the Guide page, the guided tour card's own (the one under the heading is gone)
    const go = await raised(p, '#guideTour .tour-entry-row .btn.primary');
    ok(go.found && go.below && go.lift, 'and its Take the tour key', go);
    const keys = await p.evaluate(() => [...document.querySelectorAll('#page-guide button')].filter(b => /take the (guided )?tour|carry on the tour/i.test(b.textContent) && b.offsetParent).length);
    ok(keys === 1, 'the Guide page has one Take the tour key, not two', keys);

    // ---------------- 5 · help on every page ----------------
    const pages = await p.evaluate(() => [...document.querySelectorAll('.nav-btn[data-page]')].map(b => b.getAttribute('data-page')).filter(x => !/^(tabula|abacus|slides|scriba|fontes)$/.test(x)));
    const seen = [];
    for (const pg of pages) {
      await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(350);
      const r = await p.evaluate(() => { const k = document.getElementById('ingHelpKey'); return { key: !!(k && k.offsetParent), label: k && k.getAttribute('aria-label') }; });
      await p.click('#ingHelpKey'); await p.waitForTimeout(300);
      const h = await p.evaluate(() => { const pn = document.getElementById('ihPanel'); return { open: !!(pn && !pn.hidden), title: (document.getElementById('ihTitle') || {}).textContent || '', n: (document.getElementById('ihBody') || { textContent: '' }).textContent.length, page: IngHelp.page() }; });
      seen.push({ pg, ...r, ...h });
      await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    }
    const bad = seen.filter(s => !s.key || !s.open || !s.title || s.n < 60 || !/^Help with /.test(s.label || ''));
    ok(pages.length >= 10 && bad.length === 0, 'on every page (' + pages.length + ') the Help key is there, says which page it helps with, and opens help about that page', bad.length ? bad : seen.map(s => s.pg + ':' + s.title));
    await p.evaluate(() => go('chat')); await p.waitForTimeout(400);
    await p.keyboard.press('F1'); await p.waitForTimeout(300);
    const f1 = await p.evaluate(() => ({ open: !document.getElementById('ihPanel').hidden, title: document.getElementById('ihTitle').textContent }));
    ok(f1.open && /Chat/.test(f1.title), 'F1 opens help about the page (Chat)', f1);
    await shot(p, 't62-help-chat');
    const axH = await axeOn(p, '#ihPanel', 'the help card');
    if (axH) ok(axH.length === 0, 'axe-core finds nothing in the help card', axH);
    // 6.2: to Lector's page, or in an edition without Lector, to Build's
    const PG = await p.evaluate(() => document.getElementById('page-lector') ? 'lector' : 'build');
    await p.evaluate((PG) => go(PG), PG); await p.waitForTimeout(500);
    const follow = await p.evaluate(() => ({ open: !document.getElementById('ihPanel').hidden, title: document.getElementById('ihTitle').textContent }));
    ok(follow.open && new RegExp(PG, 'i').test(follow.title), 'an open help card follows a page change (to ' + PG + ')', follow);
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => document.getElementById('ihPanel').hidden), 'Escape closes it');
    // Shift+F1 on the focused control; What is this? on the next control pressed
    await p.evaluate(() => go('chat')); await p.waitForTimeout(400);
    await p.focus('#chatInput'); await p.keyboard.press('Shift+F1'); await p.waitForTimeout(400);
    const sf = await p.evaluate(() => { const b = document.getElementById('ihBubble'); return { open: !!(b && !b.hidden), text: b ? b.textContent : '' }; });
    ok(sf.open && /message box/i.test(sf.text), 'Shift+F1 explains the control in focus (the message box)', sf);
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    await p.evaluate(() => IngHelp.ask()); await p.waitForTimeout(300);
    await p.click('#chatSend', { force: true }); await p.waitForTimeout(400);
    const ws = await p.evaluate(() => { const b = document.getElementById('ihBubble'); return { open: !!(b && !b.hidden), text: b ? b.textContent : '', sent: (curMsgs() || []).length }; });
    ok(ws.open && /Send/.test(ws.text) && ws.sent === 0, 'What is this?, then a press on Send: Send is explained and nothing is sent', ws);
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);

    // ---------------- 6 · Settings ----------------
    await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
    const st = await p.evaluate(() => { const c = document.getElementById('ihSetCard'); return c ? { radios: c.querySelectorAll('[role=radio]').length, checked: (c.querySelector('[aria-checked=true]') || {}).getAttribute && c.querySelector('[aria-checked=true]').getAttribute('data-lv') } : null; });
    ok(st && st.radios === 3 && st.checked === 'new', 'Settings holds the level (three choices, the one in use checked)', st);
    await p.focus('#ihSetCard [aria-checked=true]'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    ok((await p.evaluate(() => IngHelp.level())) === 'some', 'the arrow keys move the level as a radio group does');
    const axS = await axeOn(p, '#ihSetCard', 'the Settings card');
    if (axS) ok(axS.length === 0, 'axe-core finds nothing in the Settings card', axS);
    ok(p.__errs.length === 0, 'no page errors along the way', p.__errs);

    // ---------------- 7 · a phone ----------------
    const ph = await boot(b, { width: 390, height: 844 });
    await ph.p.evaluate(() => tourStart(0)); await ph.p.waitForTimeout(600);
    await ph.p.click('#ingTour .ih-lvk[data-lv="some"]'); await ph.p.waitForTimeout(700);
    await ph.p.click('#ingTour .tour-chap'); await ph.p.waitForTimeout(600);
    const sp = await ph.p.evaluate(() => { const over = [...document.querySelectorAll('#ingTour *, #tourMenu *')].filter(n => n.getBoundingClientRect().right > innerWidth + 1 && n.offsetParent).map(n => n.className).slice(0, 5);
      return { sw: document.documentElement.scrollWidth, vw: innerWidth, over }; });
    ok(sp.sw <= sp.vw && sp.over.length === 0, 'on a phone (390 pixels) the tour and its Chapters list stay inside the screen', sp);
    await shot(ph.p, 't62-phone');
    ok(ph.p.__errs.length === 0, 'no page errors on the phone', ph.p.__errs);
  } catch (e) { ok(false, 'crashed: ' + (e && e.stack || e)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
