// Ingenium 6.7 · every drop-down in Ingenium's own dress (module r172, part p93), in Chromium. The owner's words (25 October
// 2026): "the drop down menu to choose the model on the Lector page is ineligible on dark mode" and "I want the drop down menus
// all over the app, especially on the Settings page reformatted to fit Ingenium's colour palette and design instead of the pale
// grey colour that they have that makes them ineligible on dark mode." It checks:
//   - every select a person can see on Settings, Focus, Build and Lector's page (and on every other page) is dressed: a field
//     with the role combobox stands in its place, named from the select's label, and the select itself stays in the page unseen;
//   - by night and by day the closed field and the open list are opaque, and every line in them reads at 4.5:1 or better
//     (computed from the colours the browser paints, any see-through layer laid over what is under it);
//   - choosing Day in Theme through the list turns the page to day; choosing a model in Lector's chooser sets it and sends change;
//   - the keys: Down opens, the arrows move, Enter chooses, Escape keeps the value, letters jump, Tab chooses and moves on, Home
//     and End, groups shown as headings, a line turned off skipped;
//   - a value set by code, options rebuilt by code, a select turned off or hidden by code: the field follows;
//   - a label pressed gives the field the focus; Playwright's selectOption still works on the select;
//   - on a phone with a notch the list is a sheet from the foot of the screen, inside the screen and its safe areas, with its title,
//     a Close key, large lines, the page dimmed and the focus kept inside;
//   - axe-core finds nothing on Settings and Lector's page, by day and by night, on a desk and a phone, the list open and closed;
//   - no page errors.
//   node rig/t_67_select.js http://127.0.0.1:8161/ingenium.html <out folder> [axe.min.js]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const AXE = [process.argv[4], process.env.AXE_JS, path.join(__dirname, 'a11y', 'axe.min.js')].find(f => f && fs.existsSync(f)) || null;
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' };
const INSETS = { top: 59, bottom: 34, left: 0, right: 0 };

async function open(b, opts, insets) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {}));
  const p = await ctx.newPage(); p.__errs = [];
  if (insets) { const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets }); }
  p.on('pageerror', e => p.__errs.push((e.message || '') + ' ' + String(e.stack || '').split('\n').slice(0, 3).join(' | ')));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
  return { ctx, p };
}
const theme = async (p, t) => { await p.evaluate(t => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(500); };
const page = async (p, pg, ms = 900) => { await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(ms); };
async function seedModels(p) {
  await p.evaluate(() => {
    state.models = (state.models || []).filter(m => !/^m-(small|big)$/.test(m.id)).concat([
      { id: 'm-small', name: 'Small model', customName: 'Small model', fileState: 'ready', size: 1e9, sizeBytes: 1e9, ctx: 16384 },
      { id: 'm-big', name: 'Big model', customName: 'Big model', fileState: 'ready', size: 5e9, sizeBytes: 5e9, ctx: 32768 }]);
    saveState();
  });
}

// ---- the colours as painted, in the page: what is under a box laid in, and the contrast of two colours (WCAG 2.1) ----
const COLOUR_FNS = `
  window.__c67 = (function(){
    function rgba(s){ var m=String(s||'').match(/rgba?\\(([^)]+)\\)/); if(!m) return null; var p=m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; }
    function over(t,b){ var a=t.a+b.a*(1-t.a); if(a<=0) return {r:0,g:0,b:0,a:0}; return {r:(t.r*t.a+b.r*b.a*(1-t.a))/a,g:(t.g*t.a+b.g*b.a*(1-t.a))/a,b:(t.b*t.a+b.b*b.a*(1-t.a))/a,a:a}; }
    function lum(c){ function ch(v){ v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4); } return 0.2126*ch(c.r)+0.7152*ch(c.g)+0.0722*ch(c.b); }
    function ratio(a,b){ var x=lum(a),y=lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
    function under(el, page){ var acc={r:0,g:0,b:0,a:0}; for(var e=el;e&&e.nodeType===1;e=e.parentElement){ var c=rgba(getComputedStyle(e).backgroundColor); if(c&&c.a>0){ acc=over(acc,c); if(acc.a>=0.999) return acc; } } return over(acc,page); }
    function pageBg(){ return document.body.getAttribute('data-theme')==='night'? {r:22,g:19,b:28,a:1} : {r:245,g:243,b:247,a:1}; }
    function grads(el){ var s=getComputedStyle(el).backgroundImage||'', out=[], re=/rgba?\\([^)]+\\)/g, m; while((m=re.exec(s))) out.push(rgba(m[0])); return out; }
    function judge(el, textEl){ var bgEl=getComputedStyle(el), own=rgba(bgEl.backgroundColor)||{a:0}, base=under(el,pageBg()), fg=rgba(getComputedStyle(textEl||el).color);
      var r=[ratio(over(fg,base),base)]; grads(el).forEach(function(g){ var gb=over(g,base); r.push(ratio(over(fg,gb),gb)); });
      return {own:+own.a.toFixed(3), min:+Math.min.apply(null,r).toFixed(2), fg:getComputedStyle(textEl||el).color, bg:bgEl.backgroundColor}; }
    return {judge:judge, rgba:rgba};
  })();`;
async function colours(p) { await p.evaluate(COLOUR_FNS); }
// every visible field in the section shown, judged closed
const judgeFields = p => p.evaluate(() => [...document.querySelectorAll('.r172-cb')].filter(c => { const pg = c.closest('section[id^="page-"]'); return c.offsetParent && c.getClientRects().length && (!pg || pg.classList.contains('active')); })
  .map(c => Object.assign({ id: c.id, name: c.getAttribute('aria-label') || c.getAttribute('aria-labelledby') }, window.__c67.judge(c, c.querySelector('r172-v')))));
// the open list: its card and every line in it
const judgeList = p => p.evaluate(() => { const L = document.querySelector('.r172-list'); if (!L) return null; const card = L.closest('.r172-sheet') || L;
  const lines = [...L.querySelectorAll('.r172-opt,.r172-gl')].map(o => Object.assign({ t: o.textContent.trim().slice(0, 30), act: o.classList.contains('r172-act'), dis: o.getAttribute('aria-disabled') === 'true' }, window.__c67.judge(o)));
  const extra = [...card.querySelectorAll('.r172-title,.r172-close')].map(o => Object.assign({ t: o.textContent.trim() }, window.__c67.judge(o)));
  return { card: window.__c67.judge(card), lines, extra }; });
// the selects a person could see that are left as the system draws them
const missed = p => p.evaluate(() => [...document.querySelectorAll('select')].filter(s => { const r = s.getBoundingClientRect(); return !s.__r172 && !s.multiple && !(s.size > 1) && r.width > 2 && r.height > 2 && getComputedStyle(s).visibility !== 'hidden'; })
  .map(s => s.id || s.className || (s.getAttribute('aria-label') || '') || s.outerHTML.slice(0, 80)));
const dressed = p => p.evaluate(() => [...document.querySelectorAll('select')].filter(s => s.__r172 && s.__r172.combo.offsetParent && s.__r172.combo.getClientRects().length).map(s => s.id || s.__r172.combo.getAttribute('aria-label') || s.__r172.combo.getAttribute('aria-labelledby')));
const state67 = (p, sel) => p.evaluate(sel => { const s = document.querySelector(sel), c = s && s.__r172 && s.__r172.combo; if (!c) return null; const L = document.querySelector('.r172-list');
  const act = document.getElementById(c.getAttribute('aria-activedescendant') || (L && L.getAttribute('aria-activedescendant')) || '-');
  return { value: s.value, text: c.textContent.trim(), expanded: c.getAttribute('aria-expanded'), focus: document.activeElement === c ? 'combo' : (L && L.contains(document.activeElement) ? 'list' : (document.activeElement && (document.activeElement.className || document.activeElement.tagName))),
    act: act ? act.textContent.trim() : null, open: !!L, controls: c.getAttribute('aria-controls'), listId: L && L.id }; }, sel);

async function axe(p, where) {
  if (!AXE) return null;
  await p.waitForFunction(() => !document.getAnimations || document.getAnimations().every(a => a.playState !== 'running' || (a.effect && a.effect.getTiming && a.effect.getTiming().iterations === Infinity)), null, { timeout: 4000 }).catch(() => { });
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  return p.evaluate(async (where) => {
    const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ where, id: v.id, n: v.nodes.length, nodes: v.nodes.slice(0, 4).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').slice(0, 200)) }));
  }, where);
}
// a part of the page still being laid out (Lector's brief measures the apps first): wait until the field stands still
async function settle(p, sel) { await p.evaluate(async sel => { let last = '', same = 0; const t0 = Date.now();
  while (same < 3 && Date.now() - t0 < 8000) { await new Promise(r => setTimeout(r, 200)); const e = document.querySelector(sel); const r = e && e.getBoundingClientRect(); const k = r ? [r.left, r.top, r.width, r.height].map(Math.round).join() : '';
    if (k && k === last) same++; else { same = 0; last = k; } if (e && same === 1) e.scrollIntoView({ block: 'center' }); } }, sel); }
async function shown(p, sel) { await p.evaluate(sel => { const e = document.querySelector(sel); if (e) e.scrollIntoView({ block: 'center' }); }, sel); await p.waitForTimeout(250); }

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const allAxe = [];
  try {
    // ================= a desk, by night =================
    let { ctx, p } = await open(b);
    const LX = await p.evaluate(() => !!document.getElementById('page-lector'));
    const ED = await p.evaluate(() => typeof ING_EDITION !== 'undefined' ? ING_EDITION : 'master');
    if (!LX) console.log('NOTE the ' + ED + ' edition has no Lector page: its checks are left out');
    const s0 = await p.evaluate(() => ({ part: (window.__ingParts || {}).p93, api: !!window.IngSelect, css: !!document.getElementById('r172-css') }));
    ok(s0.part === 'running' && s0.api && s0.css, 'the module runs to its end (part p93) and gives window.IngSelect', s0);
    await theme(p, 'night'); await colours(p);
    const cs = await p.evaluate(() => ({ html: getComputedStyle(document.documentElement).colorScheme, body: getComputedStyle(document.body).colorScheme }));
    ok(/dark/.test(cs.html) && /dark/.test(cs.body), 'by night the whole page says it is dark (html and body), so a list the system draws is dark too', cs);

    // ---- every select a person can see is dressed ----
    const want = { settings: ['setTheme', 'setMotion', 'psLength', 'psTone', 'psThink', 'cxProvider'], focus: [], build: [] };
    if (LX) want.lector = ['l7HowModel'];
    if (LX) await seedModels(p);
    for (const pg of Object.keys(want)) {
      await page(p, pg, pg === 'lector' ? 1600 : 900);
      const d = await dressed(p), m = await missed(p);
      ok(d.length >= Math.max(1, want[pg].length) && want[pg].every(id => d.includes(id)) && m.length === 0, `${pg}: every select a person can see is dressed (${d.length} dressed, ${m.length} left as the system draws them)`, { dressed: d, missed: m });
    }
    for (const pg of ['home', 'chat', 'code', 'models', 'blend', 'fabrica', 'guide']) await page(p, pg, 700);
    const total = await p.evaluate(() => ({ all: document.querySelectorAll('select').length, dressed: IngSelect.count(), plain: [...document.querySelectorAll('select')].filter(s => !s.__r172).map(s => (s.id || s.className) + (s.multiple ? ' (several lines)' : '')),
      ids: [...document.querySelectorAll('select')].filter(s => s.__r172).map(s => s.id || s.getAttribute('aria-label') || s.__r172.combo.getAttribute('aria-label') || s.className.replace('r172-native', '').trim() || '?') }));
    ok(total.dressed >= 12 && total.plain.length === 0, 'every select in the page so far has its field (a list of several lines would stay as it is)', total);
    await page(p, 'settings');
    const hidden = await p.evaluate(() => { const s = document.getElementById('setTheme'), c = getComputedStyle(s), r = s.getBoundingClientRect();
      return { pos: c.position, op: c.opacity, pe: c.pointerEvents, disp: c.display, vis: c.visibility, w: r.width, h: r.height, ah: s.getAttribute('aria-hidden'), ti: s.getAttribute('tabindex'), next: s.nextElementSibling && s.nextElementSibling.getAttribute('role') }; });
    ok(hidden.pos === 'absolute' && hidden.op === '0' && hidden.pe === 'none' && hidden.disp !== 'none' && hidden.vis !== 'hidden' && hidden.w >= 1 && hidden.h >= 1 && hidden.ah === 'true' && hidden.ti === '-1' && hidden.next === 'combobox',
      'the select itself stays in the page, unseen but not removed (absolute, see-through, no pointer, laid over its field, aria-hidden, out of the tab order), its field right after it', hidden);

    // ---- by night, closed: opaque and readable ----
    await page(p, 'settings');
    let J = await judgeFields(p);
    ok(J.length >= 8 && J.every(j => j.own === 1 && j.min >= 4.5), `by night every field on Settings is opaque and its words read at 4.5:1 or better (${J.length} fields, lowest ${Math.min(...J.map(j => j.min))}:1)`, J.filter(j => j.own !== 1 || j.min < 4.5).concat(J.slice(0, 2)));
    const look = await p.evaluate(() => { const c = document.getElementById('setTheme-dd'), s = getComputedStyle(c), ch = getComputedStyle(c.querySelector('r172-c'));
      return { radius: s.borderTopLeftRadius, bg: s.backgroundColor, shadow: s.boxShadow !== 'none', chev: ch.borderRightColor, accent: getComputedStyle(document.body).getPropertyValue('--accent').trim(), solid: getComputedStyle(document.body).getPropertyValue('--cl-solid').trim() }; });
    ok(look.radius === '12px' && look.shadow && look.bg === 'rgb(36, 29, 49)' && look.chev === 'rgb(183, 156, 230)', 'the field wears the palette: the deep plum card by night, rounded as the cards, raised, a violet chevron', look);

    // ---- by night, open: the Theme list ----
    await shown(p, '#setTheme-dd'); await p.click('#setTheme-dd'); await p.waitForTimeout(350);
    let st = await state67(p, '#setTheme'), L = await judgeList(p);
    ok(st.open && st.expanded === 'true' && st.controls === st.listId && st.focus === 'combo' && st.act === 'Night', 'pressed, Theme opens its list: expanded, the list named in aria-controls, the focus kept on the field, the chosen line lit', st);
    ok(L && L.card.own === 1 && L.lines.every(l => l.min >= 4.5), `by night the open list is an opaque card and every line reads at 4.5:1 or better (lowest ${L && Math.min(...L.lines.map(l => l.min))}:1, the lit line ${L && (L.lines.find(l => l.act) || {}).min}:1)`, L);
    const aria = await p.evaluate(() => { const L = document.querySelector('.r172-list'); return { role: L.getAttribute('role'), name: L.getAttribute('aria-labelledby') || L.getAttribute('aria-label'), opts: [...L.querySelectorAll('[role=option]')].map(o => o.textContent.trim() + ':' + o.getAttribute('aria-selected')), tick: getComputedStyle(L.querySelector('[aria-selected=true]'), '::after').borderRightColor,
      combo: (() => { const c = document.getElementById('setTheme-dd'); return { name: c.getAttribute('aria-labelledby') || c.getAttribute('aria-label'), has: c.getAttribute('aria-haspopup') }; })() }; });
    ok(aria.role === 'listbox' && aria.name === 'Theme' && aria.opts.join() === 'Day:false,Follow the system:false,Night:true' && aria.combo.name === 'Theme' && aria.combo.has === 'listbox' && aria.tick === 'rgb(183, 156, 230)',
      'the list and its lines carry their roles: a listbox named Theme, options with aria-selected, the chosen one ticked in violet', aria);
    const box = await p.evaluate(() => { const r = document.querySelector('.r172-list').getBoundingClientRect(), c = document.getElementById('setTheme-dd').getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, ctop: c.top, cbottom: c.bottom, vh: innerHeight, vw: innerWidth }; });
    ok(box.top >= box.cbottom && box.bottom <= box.vh && box.left >= 0 && box.right <= box.vw, 'the list opens under its field and inside the window', box);
    await shot(p, 'desk-night-settings-theme-open');
    if (AXE) allAxe.push(...await axe(p, 'desk/night/settings/open'));
    // choose Day with the pointer: the page turns to day
    await p.click('.r172-list [role=option]:has-text("Day")'); await p.waitForTimeout(600);
    st = await state67(p, '#setTheme');
    const th = await p.evaluate(() => ({ theme: document.body.getAttribute('data-theme'), state: state.theme }));
    ok(th.theme === 'day' && st.value === 'day' && st.text === 'Day' && !st.open && st.focus === 'combo', 'choosing Day in the list turns the page to day, the select holds day, the list closes and the focus is back on the field', { th, st });
    // and back to Night with the keys
    await p.keyboard.press('ArrowDown'); await p.waitForTimeout(150); await p.keyboard.press('End'); await p.waitForTimeout(100); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
    const th2 = await p.evaluate(() => document.body.getAttribute('data-theme'));
    ok(th2 === 'night' && (await state67(p, '#setTheme')).value === 'night', 'and Down, End, Enter bring the night back', th2);

    // ---- the help still finds the drop-downs: its list of controls, its ring, What is this? ----
    await p.evaluate(() => { const k = document.getElementById('ingHelpKey'); if (k) k.click(); }); await p.waitForTimeout(600);
    const help = await p.evaluate(() => { const d = document.querySelector('.ih-ctls'); return d ? [...d.querySelectorAll('.ih-ctl button')].map(b => b.textContent.trim()) : null; });
    ok(help && ['Theme', 'Motion', 'A cloud or server model'].every(n => help.includes(n)), 'the help\'s list of the controls on Settings still holds Theme, Motion and A cloud or server model', help);
    await p.evaluate(() => { const d = document.querySelector('.ih-ctls'); if (d) d.open = true; const b = [...document.querySelectorAll('.ih-ctl button')].find(b => b.textContent.trim() === 'Theme'); if (b) b.click(); }); await p.waitForTimeout(250);
    const ring = await p.evaluate(() => { const f = document.getElementById('setTheme-dd'), s = document.getElementById('setTheme'), a = f.getBoundingClientRect(), b = s.getBoundingClientRect();
      return { field: f.classList.contains('ih-ring'), outline: getComputedStyle(f).outlineStyle, over: Math.abs(a.left - b.left) < 1 && Math.abs(a.top - b.top) < 1 && Math.abs(a.width - b.width) < 1 && Math.abs(a.height - b.height) < 1 }; });
    ok(ring.field && ring.outline !== 'none' && ring.over, 'pressed there, the ring shows round the field (the unseen select lies exactly over it)', ring);
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    await p.evaluate(() => { const k = document.getElementById('ingHelpKey'); if (k) k.click(); }); await p.waitForTimeout(500);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => /^What is this\?$/.test(b.textContent.trim()) && b.offsetParent); if (b) b.click(); }); await p.waitForTimeout(300);
    await shown(p, '#setTheme-dd');
    const tb = await p.evaluate(() => { const r = document.getElementById('setTheme-dd').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.mouse.move(tb.x - 30, tb.y); await p.waitForTimeout(60); await p.mouse.click(tb.x, tb.y); await p.waitForTimeout(400);
    const bub = await p.evaluate(() => { const b = document.getElementById('ihBubble'); return b && !b.hidden ? b.innerText.replace(/\s+/g, ' ') : null; });
    const opened = await p.evaluate(() => !!document.querySelector('.r172-list'));
    ok(bub && /Theme/.test(bub) && /Day, night, or follow the system/.test(bub) && !opened, 'What is this? pressed on the Theme field gives the help\'s own words for it (and opens nothing)', bub);
    await p.evaluate(() => { const b = document.getElementById('ihBubble'); const c = b && [...b.querySelectorAll('button')].find(x => x.textContent.trim() === 'Close'); if (c) c.click(); }); await p.waitForTimeout(200);

    // ---- the keys, on Answers ----
    const k0 = await state67(p, '#psLength');
    await p.evaluate(() => { window.__chg = []; document.addEventListener('change', e => { if (e.target && e.target.id) window.__chg.push(e.target.id + '=' + e.target.value); }, true); document.addEventListener('input', e => { if (e.target && e.target.tagName === 'SELECT') window.__chg.push('input:' + e.target.id); }, true); });
    await shown(p, '#psLength-dd');
    await p.click('label.field:has(#psLength) > span'); await p.waitForTimeout(150);
    let k = await state67(p, '#psLength');
    ok(k.focus === 'combo' && !k.open, 'pressing the label (Answers) gives its field the focus', k);
    await p.keyboard.press('ArrowDown'); await p.waitForTimeout(150); k = await state67(p, '#psLength');
    ok(k.open && k.expanded === 'true' && k.act === k0.text, 'Down opens the list on the chosen line', k);
    await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80); k = await state67(p, '#psLength');
    const moved = k.act;
    ok(moved && moved !== k0.text && k.value === k0.value, 'Down moves the light to the next line; the value waits for a choice', k);
    await p.keyboard.press('Escape'); await p.waitForTimeout(120); k = await state67(p, '#psLength');
    ok(!k.open && k.expanded === 'false' && k.value === k0.value && k.focus === 'combo' && !(await p.evaluate(() => window.__chg.length)), 'Escape closes the list, keeps the value, sends nothing and leaves the focus on the field', k);
    await p.keyboard.press('ArrowDown'); await p.keyboard.press('Home'); await p.waitForTimeout(80); k = await state67(p, '#psLength');
    ok(k.act === 'Short and to the point', 'Home lights the first line', k.act);
    await p.keyboard.press('End'); await p.waitForTimeout(80); k = await state67(p, '#psLength');
    ok(/^Thorough/.test(k.act), 'End lights the last line', k.act);
    await p.keyboard.press('c'); await p.waitForTimeout(80); k = await state67(p, '#psLength');
    ok(/^Complete/.test(k.act), 'a letter typed lights the line that begins with it (c: Complete)', k.act);
    await p.waitForTimeout(900); await p.keyboard.press('s'); await p.waitForTimeout(100); await p.keyboard.press('Enter'); await p.waitForTimeout(200); k = await state67(p, '#psLength');
    const chg = await p.evaluate(() => window.__chg.slice());
    ok(k.value === 'brief' && k.text === 'Short and to the point' && !k.open && chg.includes('psLength=brief') && chg.includes('input:psLength'), 'Enter chooses the lit line: the select holds it, input and change are sent, the field shows it', { k, chg });
    const saved = await p.evaluate(() => (state.persona || {}).length);
    ok(saved === 'brief', 'and the page\'s own handler ran: the choice is kept in the settings (Answers: brief)', saved);
    // type-ahead while closed opens, Space chooses
    await p.keyboard.press('t'); await p.waitForTimeout(120); k = await state67(p, '#psLength');
    ok(k.open && /^Thorough/.test(k.act), 'a letter typed on the closed field opens the list at the line that begins with it', k);
    await p.waitForTimeout(900); await p.keyboard.press(' '); await p.waitForTimeout(150); k = await state67(p, '#psLength');
    ok(k.value === 'thorough' && !k.open, 'Space chooses the lit line', k);
    // Tab chooses and moves on
    await shown(p, '#psTone-dd'); await p.focus('#psTone-dd'); const t0 = await state67(p, '#psTone');
    await p.keyboard.press('ArrowDown'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80); const tAct = (await state67(p, '#psTone')).act;
    await p.keyboard.press('Tab'); await p.waitForTimeout(200); const t1 = await state67(p, '#psTone');
    const nextIs = await p.evaluate(() => document.activeElement && (document.activeElement.id || document.activeElement.className));
    ok(t1.text === tAct && t1.value !== t0.value && !t1.open && t1.focus !== 'combo', 'Tab chooses the lit line and moves on to the next control', { before: t0.value, after: t1.value, lit: tAct, focus: nextIs });
    // a click outside closes and keeps the value
    await shown(p, '#psThink-dd'); const th0 = await state67(p, '#psThink'); await p.click('#psThink-dd'); await p.waitForTimeout(200);
    await p.mouse.click(5, 450); await p.waitForTimeout(200); const th1 = await state67(p, '#psThink');
    ok(th0.open === false && !th1.open && th1.value === th0.value, 'a press outside the list closes it and keeps the value', th1);

    // ---- code that sets the select: the field follows ----
    const script = await p.evaluate(async () => {
      const m = document.getElementById('setMotion'), was = m.value, c = m.__r172.combo, out = {};
      m.value = 'minimal'; out.value = c.textContent.trim();
      m.selectedIndex = 0; out.index = c.textContent.trim();
      m.options[1].selected = true; await new Promise(r => setTimeout(r, 1300)); out.optSel = c.textContent.trim();
      m.value = was; out.back = c.textContent.trim(); return out; });
    ok(script.value === 'Minimal' && script.index === 'Full' && script.optSel === 'Calm', 'a value or an index set by code shows in the field at once, an option chosen by code within a second', script);
    await p.selectOption('#setMotion', 'full'); await p.waitForTimeout(400);
    const so = await p.evaluate(() => ({ v: document.getElementById('setMotion').value, t: document.getElementById('setMotion-dd').textContent.trim(), m: document.body.getAttribute('data-motion') }));
    ok(so.v === 'full' && so.t === 'Full' && so.m === 'full', 'Playwright\'s selectOption still sets the select, the page\'s handler runs (Motion: Full) and the field follows', so);
    // a select made later, its options rebuilt, groups, a line turned off, turned off, hidden
    await p.evaluate(() => { const card = document.getElementById('setTheme').closest('.card'), w = document.createElement('div');
      w.id = 't67Box'; w.innerHTML = '<label for="t67Sel" id="t67Lab">Test colour</label><select id="t67Sel"><option value="r">Red</option><option value="g">Green</option></select>'; card.appendChild(w);
      window.__t67 = []; document.getElementById('t67Sel').addEventListener('change', e => window.__t67.push(e.target.value)); });
    await p.waitForTimeout(100);
    let t = await p.evaluate(() => { const s = document.getElementById('t67Sel'), c = s.__r172 && s.__r172.combo; return c && { text: c.textContent.trim(), name: c.getAttribute('aria-labelledby'), role: c.getAttribute('role'), id: c.id, dup: document.querySelectorAll('[id="t67Sel"]').length }; });
    ok(t && t.text === 'Red' && t.name === 't67Lab' && t.role === 'combobox' && t.id === 't67Sel-dd' && t.dup === 1, 'a select added later is dressed at once, named by its label for= (aria-labelledby), with an id of its own', t);
    await shown(p, '#t67Lab'); await p.click('#t67Lab'); await p.waitForTimeout(120);
    ok((await state67(p, '#t67Sel')).focus === 'combo', 'pressing a label for= gives its field the focus', await state67(p, '#t67Sel'));
    await p.evaluate(() => { document.getElementById('t67Sel').innerHTML = '<option value="a">Amber</option><option value="b" selected>Blue</option>'; }); await p.waitForTimeout(80);
    ok((await state67(p, '#t67Sel')).text === 'Blue', 'options rebuilt by code (innerHTML) show in the field', await state67(p, '#t67Sel'));
    await p.evaluate(() => { document.getElementById('t67Sel').innerHTML = '<optgroup label="Warm"><option value="r">Red</option><option value="o" disabled>Orange</option><option value="y">Yellow</option></optgroup><optgroup label="Cool"><option value="b" selected>Blue</option><option value="v">Violet</option></optgroup>'; }); await p.waitForTimeout(80);
    await p.focus('#t67Sel-dd'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(150);
    const grp = await p.evaluate(() => { const L = document.querySelector('.r172-list'); return { groups: [...L.querySelectorAll('[role=group]')].map(g => { const id = g.getAttribute('aria-labelledby'), l = document.getElementById(id); return l && l.textContent + ':' + g.querySelectorAll('[role=option]').length; }), off: [...L.querySelectorAll('[aria-disabled=true]')].map(o => o.textContent) }; });
    ok(grp.groups.join() === 'Warm:3,Cool:2' && grp.off.join() === 'Orange', 'groups show as headings that name their lines (role group), a line turned off is marked so', grp);
    if (AXE) allAxe.push(...await axe(p, 'desk/night/settings/groups-open'));
    await p.keyboard.press('Home'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80);
    ok((await state67(p, '#t67Sel')).act === 'Yellow', 'the arrows step over a line turned off (Red, then Yellow)', (await state67(p, '#t67Sel')).act);
    await p.click('.r172-list [role=option]:has-text("Orange")', { force: true }); await p.waitForTimeout(150);
    let off = await state67(p, '#t67Sel');
    ok(off.value === 'b' && off.open, 'a line turned off cannot be chosen with the pointer either', off);
    await p.click('.r172-list [role=option]:has-text("Violet")'); await p.waitForTimeout(150);
    off = await state67(p, '#t67Sel');
    ok(off.value === 'v' && off.text === 'Violet' && (await p.evaluate(() => window.__t67.join())) === 'v', 'a line pressed is chosen: the select holds it and change is sent once', { off, chg: await p.evaluate(() => window.__t67) });
    await p.evaluate(() => { document.getElementById('t67Sel').disabled = true; }); await p.waitForTimeout(80);
    let dis = await p.evaluate(() => { const c = document.getElementById('t67Sel-dd'); return { ad: c.getAttribute('aria-disabled'), ti: c.getAttribute('tabindex') }; });
    await p.click('#t67Sel-dd', { force: true }); await p.waitForTimeout(120);
    ok(dis.ad === 'true' && dis.ti === '-1' && !(await state67(p, '#t67Sel')).open, 'a select turned off by code: its field is turned off too (aria-disabled, out of the tab order) and does not open', dis);
    await p.evaluate(() => { const s = document.getElementById('t67Sel'); s.disabled = false; s.style.display = 'none'; }); await p.waitForTimeout(80);
    const hid = await p.evaluate(() => { const c = document.getElementById('t67Sel-dd'); return { hidden: c.hidden, shown: !!c.getClientRects().length }; });
    await p.evaluate(() => { document.getElementById('t67Sel').style.display = ''; }); await p.waitForTimeout(80);
    const back = await p.evaluate(() => !!document.getElementById('t67Sel-dd').getClientRects().length);
    ok(hid.hidden && !hid.shown && back, 'a select hidden by code hides its field, and shown again shows it', { hid, back });
    await p.evaluate(() => { document.getElementById('t67Box').remove(); }); await p.waitForTimeout(80);
    ok(!(await p.evaluate(() => !!document.getElementById('t67Sel-dd'))), 'taken out of the page, its field goes with it', true);
    // a select replaced by another (the page drawn again) with its field: no second field is left behind
    const rep = await p.evaluate(async () => { const s = document.getElementById('psThink'), n = s.cloneNode(true); n.removeAttribute('aria-hidden'); n.removeAttribute('tabindex'); n.className = ''; s.replaceWith(n);
      await new Promise(r => setTimeout(r, 60)); const box = n.parentNode; return { fields: box.querySelectorAll('.r172-cb').length, mine: !!(n.__r172 && n.nextElementSibling === n.__r172.combo) }; });
    ok(rep.fields === 1 && rep.mine, 'a select the page replaces gets a field of its own and the old field goes: never two', rep);

    // ---- by day ----
    await theme(p, 'day'); await page(p, 'settings');
    J = await judgeFields(p);
    ok(J.length >= 8 && J.every(j => j.own === 1 && j.min >= 4.5), `by day every field on Settings is opaque and reads at 4.5:1 or better (${J.length} fields, lowest ${Math.min(...J.map(j => j.min))}:1)`, J.filter(j => j.own !== 1 || j.min < 4.5).concat(J.slice(0, 1)));
    await shown(p, '#cxProvider-dd'); await p.click('#cxProvider-dd'); await p.waitForTimeout(300);
    L = await judgeList(p);
    ok(L && L.card.own === 1 && L.lines.length >= 8 && L.lines.every(l => l.min >= 4.5), `by day the open list (Provider, ${L && L.lines.length} lines) is an opaque card and reads at 4.5:1 or better (lowest ${L && Math.min(...L.lines.map(l => l.min))}:1)`, L && L.lines.filter(l => l.min < 4.5));
    const scroll = await p.evaluate(() => { const L = document.querySelector('.r172-list'); return { sh: L.scrollHeight, ch: L.clientHeight, oy: getComputedStyle(L).overflowY, bottom: L.getBoundingClientRect().bottom, vh: innerHeight }; });
    ok(scroll.oy === 'auto' && scroll.bottom <= scroll.vh, 'a long list keeps inside the window and scrolls on its own', scroll);
    await shot(p, 'desk-day-settings-provider-open');
    if (AXE) allAxe.push(...await axe(p, 'desk/day/settings/open'));
    await p.keyboard.press('Escape');
    if (AXE) allAxe.push(...await axe(p, 'desk/day/settings/closed'));
    // flipped above when there is no room below
    await p.evaluate(() => { const c = document.getElementById('setMotion-dd'), r = c.getBoundingClientRect(); window.scrollBy(0, r.bottom - innerHeight + 8); const sc = document.querySelector('.main') || document.scrollingElement; if (c.getBoundingClientRect().bottom < innerHeight - 60) { let e = c.parentElement; while (e && e.scrollHeight <= e.clientHeight) e = e.parentElement; if (e) e.scrollTop += c.getBoundingClientRect().bottom - innerHeight + 8; } });
    await p.waitForTimeout(250); await p.click('#setMotion-dd'); await p.waitForTimeout(250);
    const flip = await p.evaluate(() => { const L = document.querySelector('.r172-list').getBoundingClientRect(), c = document.getElementById('setMotion-dd').getBoundingClientRect(); return { lt: L.top, lb: L.bottom, ct: c.top, cb: c.bottom, vh: innerHeight }; });
    ok(flip.cb > flip.vh - 120 ? (flip.lb <= flip.ct + 1 && flip.lt >= 0) : (flip.lt >= flip.cb - 1 && flip.lb <= flip.vh), 'at the foot of the window the list opens above its field, inside the window', flip);
    await p.keyboard.press('Escape');

    // ---- Lector's model chooser ----
    if (LX) {
      await theme(p, 'night'); await page(p, 'lector', 1600);
      await shown(p, '#l7HowModel-dd'); await settle(p, '#l7HowModel-dd');
      J = await judgeFields(p);
      const lj = J.find(j => j.id === 'l7HowModel-dd');
      ok(lj && lj.own === 1 && lj.min >= 4.5, 'by night the model chooser on Lector\'s page is opaque and reads well when closed', lj);
      await p.evaluate(() => { window.__lx = []; document.addEventListener('change', e => { if (e.target.id === 'l7HowModel') window.__lx.push(e.target.value); }, true); });
      await p.click('#l7HowModel-dd'); await p.waitForTimeout(350);
      L = await judgeList(p);
      ok(L && L.card.own === 1 && L.lines.length === 3 && L.lines.every(l => l.min >= 4.5), `by night its open list is opaque and every model reads at 4.5:1 or better (lowest ${L && Math.min(...L.lines.map(l => l.min))}:1)`, L);
      const lb = await p.evaluate(() => { const r = document.querySelector('.r172-list').getBoundingClientRect(); return { top: r.top, bottom: r.bottom, vh: innerHeight }; });
      ok(lb.top >= 0 && lb.bottom <= lb.vh, 'and it stays inside the window', lb);
      await shot(p, 'desk-night-lector-model-open');
      if (AXE) allAxe.push(...await axe(p, 'desk/night/lector/open'));
      await p.click('.r172-list [role=option]:has-text("Big model")'); await p.waitForTimeout(600);
      const lx = await p.evaluate(() => ({ v: document.getElementById('l7HowModel').value, t: document.getElementById('l7HowModel-dd').textContent.trim(), chg: window.__lx.slice(), brief: typeof lxState === 'function' ? lxState().brief.modelId : null, focus: document.activeElement && document.activeElement.id }));
      ok(lx.v === 'm-big' && /Big model/.test(lx.t) && lx.chg.join() === 'm-big' && lx.brief === 'm-big', 'choosing Big model sets the chooser, sends change once, and the brief takes it', lx);
      ok(lx.focus === 'l7HowModel-dd', 'the brief is drawn again on a choice, and the focus comes back to the new chooser\'s field', lx.focus);
      if (AXE) allAxe.push(...await axe(p, 'desk/night/lector/closed'));
      await theme(p, 'day'); await page(p, 'lector', 1200); await shown(p, '#l7HowModel-dd');
      await p.click('#l7HowModel-dd'); await p.waitForTimeout(300); L = await judgeList(p);
      ok(L && L.card.own === 1 && L.lines.every(l => l.min >= 4.5), 'by day the model list is opaque and reads well too', L && L.lines.map(l => l.min));
      await shot(p, 'desk-day-lector-model-open');
      if (AXE) allAxe.push(...await axe(p, 'desk/day/lector/open'));
      await p.keyboard.press('Escape'); await p.waitForTimeout(100);
      if (AXE) allAxe.push(...await axe(p, 'desk/day/lector/closed'));
    }
    await theme(p, 'night'); await page(p, 'settings');
    if (AXE) allAxe.push(...await axe(p, 'desk/night/settings/closed'));
    // Minimal motion: the list opens without moving
    await p.evaluate(() => { const m = document.getElementById('setMotion'); m.value = 'minimal'; m.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(300);
    await shown(p, '#setTheme-dd'); await p.click('#setTheme-dd'); await p.waitForTimeout(30);
    const mot = await p.evaluate(() => ({ m: document.body.getAttribute('data-motion'), anim: getComputedStyle(document.querySelector('.r172-list')).animationName }));
    ok(mot.m === 'minimal' && mot.anim === 'none', 'with Minimal motion the list opens without moving', mot);
    await p.keyboard.press('Escape');
    ok(p.__errs.length === 0, 'no page errors on the desk', p.__errs.slice(0, 5));
    await ctx.close();

    // ================= a phone with a notch =================
    ({ ctx, p } = await open(b, PHONE, INSETS));
    await theme(p, 'night'); await colours(p);
    await page(p, 'settings');
    const ins = await p.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)'; document.body.appendChild(d); const c = getComputedStyle(d), r = { t: c.paddingTop, b: c.paddingBottom }; d.remove(); return r; });
    ok(ins.t === '59px' && ins.b === '34px', 'the phone is set with a notch: safe areas of 59 pixels above and 34 below', ins);
    const ph = await p.evaluate(() => [...document.querySelectorAll('.r172-cb')].filter(c => { const pg = c.closest('section[id^="page-"]'); return c.offsetParent && (!pg || pg.classList.contains('active')); }).map(c => Math.round(c.getBoundingClientRect().height)));
    ok(ph.length >= 8 && ph.every(h => h >= 44), 'on a phone every field is at least 44 pixels tall, for a finger', ph);
    await shown(p, '#setTheme-dd'); await p.tap('#setTheme-dd'); await p.waitForTimeout(450);
    const sh = await p.evaluate(() => { const s = document.querySelector('.r172-sheet'); if (!s) return null; const r = s.getBoundingClientRect(), L = s.querySelector('.r172-list'), opts = [...L.querySelectorAll('[role=option]')], last = opts[opts.length - 1].getBoundingClientRect(), cl = s.querySelector('.r172-close').getBoundingClientRect(), scrim = document.querySelector('.r172-scrim');
      return { role: s.getAttribute('role'), modal: s.getAttribute('aria-modal'), title: s.querySelector('.r172-title').textContent, named: document.getElementById(s.getAttribute('aria-labelledby')) === s.querySelector('.r172-title'),
        top: r.top, bottom: r.bottom, left: r.left, right: r.right, padB: getComputedStyle(s).paddingBottom, lastBottom: last.bottom, rows: opts.map(o => Math.round(o.getBoundingClientRect().height)), close: [Math.round(cl.width), Math.round(cl.height)], closeText: s.querySelector('.r172-close').textContent,
        scrim: !!scrim && getComputedStyle(scrim).backgroundColor, focus: s.contains(document.activeElement) ? document.activeElement.getAttribute('role') : (document.activeElement && document.activeElement.className), vh: innerHeight, vw: innerWidth }; });
    ok(sh && sh.role === 'dialog' && sh.modal === 'true' && sh.title === 'Theme' && sh.named && sh.closeText === 'Close' && sh.close[1] >= 44 && sh.close[0] >= 44, 'on a phone the list is a sheet: a dialog titled with the select\'s label (Theme), with a Close key large enough for a finger', sh);
    ok(sh && sh.top >= 59 && sh.bottom <= sh.vh + 0.5 && sh.left >= 0 && sh.right <= sh.vw && sh.lastBottom <= sh.vh - 34 && parseFloat(sh.padB) >= 34, 'the sheet stays inside the screen: below the notch, and its last line above the home bar', sh);
    ok(sh && sh.rows.every(h => h >= 48) && /rgba\(0, 0, 0, 0\.5/.test(sh.scrim) && sh.focus === 'listbox', 'its lines are at least 48 pixels tall, the page behind is dimmed, and the focus is in the list', sh && { rows: sh.rows, scrim: sh.scrim, focus: sh.focus });
    L = await judgeList(p);
    ok(L && L.card.own === 1 && L.lines.every(l => l.min >= 4.5) && L.extra.every(x => x.min >= 4.5), 'by night the sheet is opaque and its title, lines and Close key read at 4.5:1 or better', L && { card: L.card, lines: L.lines.map(l => l.min), extra: L.extra.map(x => x.t + ' ' + x.min) });
    await shot(p, 'phone-night-settings-theme-sheet');
    if (AXE) allAxe.push(...await axe(p, 'phone/night/settings/open'));
    await p.keyboard.press('Tab'); await p.waitForTimeout(80); const f1 = await p.evaluate(() => document.activeElement.className);
    await p.keyboard.press('Tab'); await p.waitForTimeout(80); const f2 = await p.evaluate(() => document.activeElement.getAttribute('role'));
    await p.keyboard.press('Shift+Tab'); await p.waitForTimeout(80); const f3 = await p.evaluate(() => document.activeElement.className);
    ok(/r172-close/.test(f1) && f2 === 'listbox' && /r172-close/.test(f3), 'Tab keeps the focus inside the sheet (the list and Close, round again)', { f1, f2, f3 });
    await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    let ps = await state67(p, '#setTheme');
    ok(!ps.open && ps.focus === 'combo' && !(await p.evaluate(() => !!document.querySelector('.r172-scrim'))), 'Escape closes the sheet, the dimming goes and the focus is back on the field', ps);
    await p.tap('#setTheme-dd'); await p.waitForTimeout(400); await p.tap('.r172-sheet .r172-close'); await p.waitForTimeout(200);
    ok(!(await state67(p, '#setTheme')).open, 'Close closes it', await state67(p, '#setTheme'));
    await p.tap('#setTheme-dd'); await p.waitForTimeout(400); await p.tap('.r172-sheet [role=option]:has-text("Day")'); await p.waitForTimeout(600);
    ps = await state67(p, '#setTheme');
    ok(ps.value === 'day' && !ps.open && (await p.evaluate(() => document.body.getAttribute('data-theme'))) === 'day', 'a line tapped in the sheet is chosen: Day, and the page turns to day', ps);
    await colours(p); await shown(p, '#psTone-dd'); await p.tap('#psTone-dd'); await p.waitForTimeout(400);
    L = await judgeList(p);
    ok(L && L.card.own === 1 && L.lines.every(l => l.min >= 4.5) && L.extra.every(x => x.min >= 4.5), 'by day the sheet is opaque and reads well too', L && L.lines.map(l => l.min));
    await shot(p, 'phone-day-settings-tone-sheet');
    if (AXE) allAxe.push(...await axe(p, 'phone/day/settings/open'));
    await p.tap('.r172-scrim', { position: { x: 30, y: 120 } }); await p.waitForTimeout(200);
    ok(!(await state67(p, '#psTone')).open, 'a tap on the dimmed page closes the sheet', true);
    if (AXE) allAxe.push(...await axe(p, 'phone/day/settings/closed'));
    await theme(p, 'night'); await page(p, 'settings');
    if (AXE) allAxe.push(...await axe(p, 'phone/night/settings/closed'));
    // a phone on its side is wider than 520 pixels: the list opens under its field, still with lines for a finger
    await p.setViewportSize({ width: 844, height: 390 }); await p.waitForTimeout(500);
    await shown(p, '#setTheme-dd'); await p.tap('#setTheme-dd'); await p.waitForTimeout(400);
    const land = await p.evaluate(() => { const L = document.querySelector('.r172-list'); if (!L) return null; const r = L.getBoundingClientRect();
      return { sheet: !!L.closest('.r172-sheet'), rows: [...L.querySelectorAll('[role=option]')].map(o => Math.round(o.getBoundingClientRect().height)), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), vw: innerWidth, vh: innerHeight }; });
    ok(land && !land.sheet && land.rows.length === 3 && land.rows.every(h => h >= 48) && land.top >= 0 && land.bottom <= land.vh && land.left >= 0 && land.right <= land.vw,
      'a phone on its side (wider than 520 pixels) opens the list under or above its field, inside the screen, its lines at least 48 pixels tall', land);
    await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
    if (LX) {
      await seedModels(p); await page(p, 'lector', 1600);
      await p.evaluate(() => { const t = [...document.querySelectorAll('button,[role=tab]')].find(x => /^The brief$/.test(x.textContent.trim()) && x.offsetParent); if (t) t.click(); }); await p.waitForTimeout(500);
      await shown(p, '#l7HowModel-dd'); await settle(p, '#l7HowModel-dd'); await p.tap('#l7HowModel-dd'); await p.waitForTimeout(450);
      const ls = await p.evaluate(() => { const s = document.querySelector('.r172-sheet'); if (!s) return null; const r = s.getBoundingClientRect(); return { title: s.querySelector('.r172-title').textContent, top: r.top, bottom: r.bottom, vh: innerHeight, n: s.querySelectorAll('[role=option]').length }; });
      ok(ls && ls.title === 'Read and written by' && ls.n === 3 && ls.top >= 59 && ls.bottom <= ls.vh + 0.5, 'on a phone the model chooser opens as a sheet titled with its label, inside the screen', ls);
      L = await judgeList(p);
      ok(L && L.card.own === 1 && L.lines.every(l => l.min >= 4.5), 'by night every model in it reads at 4.5:1 or better', L && L.lines.map(l => l.min));
      await shot(p, 'phone-night-lector-model-sheet');
      if (AXE) allAxe.push(...await axe(p, 'phone/night/lector/open'));
      await p.tap('.r172-sheet [role=option]:has-text("Small model")'); await p.waitForTimeout(600);
      ok((await p.evaluate(() => document.getElementById('l7HowModel').value)) === 'm-small', 'and a model tapped there is chosen', await p.evaluate(() => document.getElementById('l7HowModel').value));
      if (AXE) allAxe.push(...await axe(p, 'phone/night/lector/closed'));
      await theme(p, 'day'); await page(p, 'lector', 1000);
      await p.evaluate(() => { const t = [...document.querySelectorAll('button,[role=tab]')].find(x => /^The brief$/.test(x.textContent.trim()) && x.offsetParent); if (t) t.click(); }); await p.waitForTimeout(400);
      await shown(p, '#l7HowModel-dd'); await settle(p, '#l7HowModel-dd'); await p.tap('#l7HowModel-dd'); await p.waitForTimeout(400);
      if (AXE) allAxe.push(...await axe(p, 'phone/day/lector/open'));
      await p.keyboard.press('Escape'); await p.waitForTimeout(100);
      if (AXE) allAxe.push(...await axe(p, 'phone/day/lector/closed'));
    }
    ok(p.__errs.length === 0, 'no page errors on the phone', p.__errs.slice(0, 5));
    await ctx.close();

    // ================= every other page, the five apps the Desk opens among them (a window of its own) =================
    ({ ctx, p } = await open(b));
    const sweep = {};
    for (const pg of ['home', 'chat', 'code', 'models', 'blend', 'fabrica', 'tabula', 'abacus', 'slides', 'scriba', 'fontes', 'guide']) {
      await page(p, pg, 700); const m = await missed(p), d = await dressed(p); if (m.length) sweep[pg] = m; if (d.length) sweep[pg + '·dressed'] = d.length;
    }
    ok(!Object.keys(sweep).some(k => !/·dressed$/.test(k)), 'on every other page no select a person can see is left as the system draws it', sweep);
    ok(p.__errs.length === 0, 'no page errors on the other pages', p.__errs.slice(0, 5));
    await ctx.close();

    if (AXE) {
      const where = [...new Set(allAxe.map(v => v.where))];
      fs.writeFileSync(path.join(OUT, 'axe_67.json'), JSON.stringify(allAxe, null, 1));
      ok(allAxe.length === 0, `axe-core finds nothing on Settings${LX ? ' and Lector\'s page' : ''}, by day and by night, desk and phone, the list open and closed`, allAxe.slice(0, 6));
    } else console.log('NOTE axe-core not given: its checks are left out');
  } catch (e) { ok(false, 'the test ran to its end', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
