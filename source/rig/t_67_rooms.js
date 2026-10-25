// Ingenium 6.7 · Settings, Models and Blend in rooms (module r173, part p94), in Chromium:
// each page has a row of room tabs (the WAI-ARIA tabs pattern: arrows, Home and End), only the chosen room's cards show,
// every card is in exactly one room and none is lost, the rooms are short, the room chosen is remembered after a reload,
// Find a setting finds a setting in any room and opens it, anything that scrolls to or focuses a card in a closed room
// opens that room (IngRooms.reveal, scrollIntoView, focus, the tour's ring, Help's Show me), the Studio is one press away,
// Blend runs a whole blend in its steps with a stand-in model, a phone keeps every tab whole and in reach with no
// sideways scroll, axe-core finds nothing on any room by day and night, desk and phone, and nothing throws.
//   node rig/t_67_rooms.js http://127.0.0.1:8164/ingenium.html <out folder> <axe.min.js> [before=<url of the same page built without r173>]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3] || 'shots', AXE = process.argv[4];
const BEFORE = (process.argv.find(a => /^before=/.test(a)) || '').replace(/^before=/, '');
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const PAGES = ['settings', 'models', 'blend'];
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' };

async function open(b, opts, url) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {}));
  const p = await ctx.newPage(); p.__errs = [];
  if (opts && opts.isMobile) { const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: { top: 59, bottom: 34, left: 0, right: 0 } }).catch(() => { }); }
  p.on('pageerror', e => p.__errs.push((e.message || '') + ' ' + (e.stack || '').slice(0, 300)));
  p.on('console', m => { if (m.type() === 'error' || /Ingenium rooms/.test(m.text())) p.__errs.push('console: ' + m.text().slice(0, 300)); });
  await enter(p, url || URL_);
  return { ctx, p };
}
async function enter(p, url) {
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
}
async function theme(p, t) { await p.evaluate(t => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(400); }
async function go(p, pg, ms = 900) { await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(ms); }
async function room(p, pg, k) { const r = await p.evaluate(([pg, k]) => { const t = document.getElementById('rmT-' + pg + '-' + k); if (!t || t.hidden) return false; t.click(); return true; }, [pg, k]); await p.waitForTimeout(450); return r; }
const shot = (p, name) => p.screenshot({ path: path.join(OUT, name + '.png') }).catch(() => { });
// the cards of a page as a person sees them: every card or headed block that is a child of the page or of one of its rooms
const cardsOf = (p, pg) => p.evaluate(pg => { const s = document.getElementById('page-' + pg); if (!s) return null; const out = [];
  const isCard = e => e.nodeType === 1 && !/^(H1|STYLE|SCRIPT|TEMPLATE|INPUT)$/.test(e.tagName) && !/(^|\s)rm-(bar|panel|hint|roomh|steps|stepnav)(\s|$)/.test(e.className || '') && !e.classList.contains('page-title') && !e.classList.contains('lede') && (e.classList.contains('card') || !!e.querySelector('h2,h3'));
  const name = c => c.id || ((c.querySelector('h2,h3,b') || {}).textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
  [...s.children].forEach(c => { if (c.classList.contains('rm-panel')) [...c.children].forEach(k => { if (isCard(k)) out.push({ n: name(k), room: c.getAttribute('data-room') }); }); else if (isCard(c)) out.push({ n: name(c), room: null }); });
  return out; }, pg);
async function axeRun(p) {
  if (!AXE) return null;
  await p.waitForFunction(() => !document.getAnimations || document.getAnimations().every(a => a.playState !== 'running' || (a.effect && a.effect.getTiming && a.effect.getTiming().iterations === Infinity)), null, { timeout: 4000 }).catch(() => { });
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  return p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ id: v.id, n: v.nodes.length, eg: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' ' + (n.failureSummary || '').slice(0, 160)) })); });
}

(async () => {
  const pageText = await (await fetch(URL_)).text();
  ok(/<style id="r173-css">/.test(pageText) && /__ingParts\["p94"\]="running"/.test(pageText), 'the rooms module (r173, part p94) is in the built page');
  const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r173.js'), 'utf8');
  ok(!/\b(claude|gpt|gemini|llama|qwen|mistral|anthropic|openai|deepseek|phi-?\d)\b/i.test(src), 'no model is named anywhere in the module');
  const shown = src.match(/"[^"]{12,}"/g).filter(s => / /.test(s) && !/[{}<>=;]|\\u|^"\s|\.\w+\(/.test(s));
  ok(!shown.some(s => /—|–| - /.test(s)), 'no dash used as punctuation in the words on screen', shown.filter(s => /—|–| - /.test(s)));
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    // ---------------- before: the cards of each page as 6.6 had them (the same page built without r173) ----------------
    let before = null;
    if (BEFORE) { const o = await open(b, null, BEFORE); before = {};
      for (const pg of PAGES) { await go(o.p, pg, 1200); before[pg] = await cardsOf(o.p, pg); }
      before.H = {}; for (const pg of PAGES) { await go(o.p, pg, 900); before.H[pg] = await o.p.evaluate(pg => document.getElementById('page-' + pg).scrollHeight, pg); }
      await o.ctx.close(); console.log('NOTE before r173: ' + PAGES.map(pg => pg + ' ' + before[pg].length + ' cards, ' + before.H[pg] + ' px').join('; ')); }

    let { ctx, p } = await open(b);
    ok(await p.evaluate(() => window.__ingParts.p94 === 'running' && !!window.IngRooms), 'the part runs to its end and IngRooms is there');

    // ---------------- 1 · a tablist with named tabs and their panels, on each page ----------------
    for (const pg of PAGES) {
      await go(p, pg);
      const t = await p.evaluate(pg => { const tl = document.querySelector('#page-' + pg + ' [role=tablist]'); if (!tl) return null;
        const tabs = [...tl.querySelectorAll('[role=tab]')].filter(x => !x.hidden);
        return { label: tl.getAttribute('aria-label'), names: tabs.map(x => x.textContent.trim()), sel: tabs.filter(x => x.getAttribute('aria-selected') === 'true').length,
          roving: tabs.filter(x => x.tabIndex === 0).length, panels: tabs.map(x => { const pnl = document.getElementById(x.getAttribute('aria-controls')); return !!pnl && pnl.getAttribute('role') === 'tabpanel' && (pnl.getAttribute('aria-labelledby') === x.id || x.getAttribute('aria-selected') !== 'true'); }),
          icons: tabs.every(x => !!x.querySelector('svg[aria-hidden=true]')), says: (document.getElementById('rmSays-' + pg) || {}).textContent }; }, pg);
      ok(t && t.label && t.names.length >= (pg === 'blend' ? 2 : 4) && t.names.every(n => n.length > 1 && n.split(' ').length <= 3) && t.icons, pg + ': a row of named room tabs, each with an icon and a name of one or two words', t && t.names);
      ok(t && t.sel === 1 && t.roving === 1 && t.panels.every(Boolean), pg + ': one tab chosen, one in the Tab order, and each tab controls a tabpanel labelled by it', t);
      ok(t && t.says && t.says.length > 20 && !/—|–| - /.test(t.says), pg + ': a plain line under the tabs says what the room holds', t && t.says);
    }
    await shot(p, 'rooms-settings-desk-day');

    // ---------------- 2 · the arrow keys, Home and End ----------------
    await go(p, 'models');
    await p.evaluate(() => document.querySelector('#rmTabs-models [aria-selected=true]').focus());
    const seq = [];
    for (const k of ['ArrowRight', 'ArrowRight', 'End', 'Home', 'ArrowLeft']) { await p.keyboard.press(k); await p.waitForTimeout(150);
      seq.push(await p.evaluate(() => { const a = document.activeElement; return a && a.getAttribute('role') === 'tab' && a.getAttribute('aria-selected') === 'true' ? a.getAttribute('data-room') : 'lost'; })); }
    const vis = await p.evaluate(() => IngRooms.rooms('models').filter(r => r.shown).map(r => r.key));
    ok(seq.join(',') === [vis[1], vis[2], vis[vis.length - 1], vis[0], vis[vis.length - 1]].join(','), 'Right moves to the next room, End to the last, Home to the first, Left from the first wraps to the last; focus follows', seq.join(' > '));
    const panelShown = await p.evaluate(() => { const c = IngRooms.current('models'); return [...document.querySelectorAll('#page-models .rm-panel')].filter(x => !x.hidden).map(x => x.getAttribute('data-room')).join(',') === c; });
    ok(panelShown, 'only the chosen room\'s panel shows');

    // ---------------- 3 · every card in exactly one room; none lost; none doubled ----------------
    for (const pg of ['settings', 'models']) {
      await go(p, pg, 1200);
      const cs = await cardsOf(p, pg);
      const loose = cs.filter(c => !c.room), names = cs.map(c => c.n), dup = names.filter((n, i) => names.indexOf(n) !== i);
      const ids = await p.evaluate(pg => [...document.querySelectorAll('#page-' + pg + ' [id]')].map(e => e.id).filter((id, i, a) => a.indexOf(id) !== i), pg);
      ok(cs.length >= (pg === 'settings' ? 12 : 8) && loose.length === 0 && dup.length === 0 && ids.length === 0, pg + ': ' + cs.length + ' cards, each in exactly one room, none left outside, no id twice', { loose, dup, ids });
      if (before) { const lost = before[pg].map(c => c.n).filter(n => !names.includes(n)), extra = names.filter(n => !before[pg].map(c => c.n).includes(n));
        ok(lost.length === 0 && extra.length === 0 && before[pg].length === cs.length, pg + ': the same ' + before[pg].length + ' cards as before the rooms, by id or heading, none lost or added', { lost, extra }); }
    }
    const blendParts = await p.evaluate(() => ['blPresets', 'blendPick', 'blendStrats', 'blendTask', 'blendRun', 'blendNote', 'blendOut', 'blendEarlier'].map(id => document.querySelectorAll('#' + id).length));
    ok(blendParts.every(n => n === 1), 'Blend keeps each of its parts once (ready-made blends, the models, the ways, the question, Run, the note, the answers, earlier blends)', blendParts);

    // ---------------- 4 · short rooms ----------------
    const heights = {};
    for (const pg of ['settings', 'models']) { await go(p, pg); heights[pg] = {};
      for (const r of await p.evaluate(pg => IngRooms.rooms(pg).filter(x => x.shown).map(x => x.key), pg)) { await room(p, pg, r);
        heights[pg][r] = await p.evaluate(([pg, r]) => Math.round(document.getElementById('rmP-' + pg + '-' + r).getBoundingClientRect().height), [pg, r]); } }
    const tallS = Math.max(...Object.values(heights.settings)), tallM = Math.max(...Object.values(heights.models));
    ok(tallS < 2400, 'the tallest Settings room on a desk is under 2,400 pixels', heights.settings);
    ok(tallM < 3200, 'the tallest Models room on a desk is under 3,200 pixels', heights.models);
    const opened = {};
    for (const pg of PAGES) { await p.evaluate(() => { try { localStorage.removeItem('ing.rooms.v1'); } catch (e) { } }); }
    for (const pg of PAGES) { await go(p, pg); const first = await p.evaluate(pg => IngRooms.rooms(pg).filter(r => r.shown)[0].key, pg); await room(p, pg, first); opened[pg] = await p.evaluate(pg => document.getElementById('page-' + pg).scrollHeight, pg); }
    const old = before ? before.H : { settings: 6558, models: 6278, blend: 2117 };
    ok(opened.settings < old.settings * 0.5 && opened.models < old.models * 0.5 && opened.blend < old.blend * 0.75, 'each page opens in well under its old height', { now: opened, before: old });

    // ---------------- 5 · the room chosen is remembered after a reload ----------------
    await go(p, 'settings'); await room(p, 'settings', 'data'); await go(p, 'models'); await room(p, 'models', 'studio'); await go(p, 'blend'); await room(p, 'blend', 'ready');
    await enter(p, URL_);
    const kept = {}; for (const pg of PAGES) { await go(p, pg); kept[pg] = await p.evaluate(pg => IngRooms.current(pg), pg); }
    ok(kept.settings === 'data' && kept.models === 'studio' && kept.blend === 'ready', 'after a reload each page opens on the room last chosen there', kept);
    const fine = await p.evaluate(() => { const o = Storage.prototype.getItem; Storage.prototype.getItem = function () { throw new Error('blocked'); }; let ok = true; try { IngRooms.rooms('settings'); } catch (e) { ok = false; } Storage.prototype.getItem = o; return ok; });
    ok(fine, 'without storage the rooms still work (what is kept is only a convenience)');

    // ---------------- 6 · Find a setting ----------------
    await go(p, 'settings'); await room(p, 'settings', 'everyday');
    const want = { backup: 'data', theme: 'everyday', licence: 'own', storage: 'data', password: 'data', dark: 'everyday', sound: null, voice: null };
    for (const [w, r] of Object.entries(want)) {
      await p.fill('#rmFind', ''); await p.type('#rmFind', w, { delay: 15 }); await p.waitForTimeout(350);
      const hits = await p.evaluate(() => [...document.querySelectorAll('#rmFindOut .rm-hit')].map(h => h.textContent));
      if (r) {
        await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
        const at = await p.evaluate(() => { const f = document.querySelector('.rm-flash'); const r = f && f.getBoundingClientRect(); return { room: IngRooms.current('settings'), flash: !!f, inView: !!r && r.height > 0 && r.top < innerHeight && r.bottom > 0, focus: document.activeElement && document.activeElement.tagName }; });
        ok(hits.length > 0 && at.room === r && at.flash && at.inView, 'Find a setting: "' + w + '" finds ' + hits.length + ', and choosing the first opens ' + r + ', brings it into view and lights it', { first: hits[0], at });
        if (w === 'backup') await shot(p, 'rooms-settings-find');
      } else ok(hits.length > 0, 'Find a setting finds words inside cards too: "' + w + '"', hits.slice(0, 3));
    }
    await p.fill('#rmFind', 'zzqx'); await p.waitForTimeout(350);
    ok(await p.evaluate(() => /Nothing found/.test(document.getElementById('rmFindOut').textContent) && /Nothing found/.test(document.getElementById('rmFindSay').textContent)), 'a word that matches nothing says so, aloud too');
    await p.focus('#rmFind'); await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    ok(await p.evaluate(() => document.getElementById('rmFind').value === '' && document.getElementById('rmFindOut').hidden), 'Escape clears the box and closes the list');

    // ---------------- 7 · reaching a card in a closed room ----------------
    await room(p, 'settings', 'everyday');
    const rv = await p.evaluate(() => { const r1 = IngRooms.reveal(document.getElementById('stxCard')); const a = IngRooms.current('settings');
      document.querySelector('#rmT-settings-everyday').click(); document.getElementById('ingPermitCard').scrollIntoView(); const b = IngRooms.current('settings');
      document.querySelector('#rmT-settings-everyday').click(); const inp = document.querySelector('#personaCard input, #personaCard textarea'); if (inp) inp.focus(); const c = IngRooms.current('settings');
      return { r1, a, b, c, roomOf: IngRooms.roomOf(document.getElementById('bkCard')), seen: document.getElementById('ingPermitCard').getBoundingClientRect().height > 0 }; });
    ok(rv.r1 === 'data' && rv.a === 'data', 'IngRooms.reveal on Storage opens Your data', rv);
    ok(rv.b === 'own', 'a plain scrollIntoView() on the licence card, from Everyday, opens Ownership', rv);
    ok(rv.c === 'ai' && rv.roomOf === 'data', 'focus() on a box in Your Ingenium opens Models and AI; roomOf names a card\'s room', rv);
    const storage = await p.evaluate(async () => { document.querySelector('#rmT-settings-everyday').click(); IngStore.open(); await new Promise(r => setTimeout(r, 900)); return { room: IngRooms.current('settings'), page: document.querySelector('.section.active').id }; });
    ok(storage.room === 'data' && storage.page === 'page-settings', "Storage's own Open Storage (go to Settings, then scroll) lands in Your data", storage);
    // the tour rings a card in another room
    const tour = await p.evaluate(async () => { go('models'); document.querySelector('#rmT-models-yours').click(); const i = ING_TOUR.findIndex(s => s.ring === '#trainCard'); tourJump(i);
      await new Promise(r => setTimeout(r, 1800)); const n = document.querySelector('.tour-ring'); const out = { i, room: IngRooms.current('models'), ring: n && n.id, seen: !!n && n.getBoundingClientRect().height > 0 };
      try { tourEnd(); } catch (e) { } const o = document.getElementById('ingTour'); if (o) o.remove(); return out; });
    ok(tour.i >= 0 && tour.room === 'studio' && tour.ring === 'trainCard' && tour.seen, "the guided tour's Train from zero card opens the Studio and rings the card", tour);
    // Help's Show me
    const help = await p.evaluate(async () => { go('models'); document.querySelector('#rmT-models-yours').click(); IngHelp.open('models'); await new Promise(r => setTimeout(r, 400));
      const bs = [...document.querySelectorAll('#ihPanel button')].filter(b => b.querySelector('.ih-show')); const k = bs.find(b => /Your own AIs|Build your own AI/i.test(b.getAttribute('aria-label') || ''));
      const st = bs.find(b => /train your own model/i.test(b.getAttribute('aria-label') || ''));
      if (k) k.click(); await new Promise(r => setTimeout(r, 700)); const a = { room: IngRooms.current('models'), ring: !!document.querySelector('#aiCard.ih-ring') };
      document.querySelector('#rmT-models-yours').click(); IngHelp.open('models'); await new Promise(r => setTimeout(r, 300));
      const st2 = [...document.querySelectorAll('#ihPanel button')].find(b => /train your own model/i.test(b.getAttribute('aria-label') || ''));
      if (st2) st2.click(); await new Promise(r => setTimeout(r, 700)); const c = { room: IngRooms.current('models'), ring: !!document.querySelector('#trainCard.ih-ring') };
      try { IngHelp.close(); } catch (e) { } return { found: !!k, studioKey: !!st, a, c }; });
    ok(help.found && help.a.room === 'studio' && help.a.ring, "Help's Show me for Your own AIs opens the Studio and rings the card", help);
    ok(help.studioKey && help.c.room === 'studio' && help.c.ring, "Help on Models now points to the Studio: its Show me opens it and rings Train a small model", help);

    // ---------------- 8 · the Studio ----------------
    await go(p, 'models'); await room(p, 'models', 'yours');
    const hint = await p.evaluate(() => { const k = document.getElementById('rmStudioKey'); const r = k && k.getBoundingClientRect(); return { text: k && k.textContent.trim(), line: (document.getElementById('rmStudioHint') || {}).textContent, top: r && Math.round(r.top) }; });
    await p.click('#rmStudioKey'); await p.waitForTimeout(500);
    const studio = await p.evaluate(() => { const vis = id => { const e = document.getElementById(id); return !!e && e.getBoundingClientRect().height > 0; };
      return { room: IngRooms.current('models'), train: vis('trainCard'), ai: vis('aiCard'), conv: vis('convCard'), tab: document.getElementById('rmT-models-studio').textContent.trim(), focus: document.activeElement && document.activeElement.id }; });
    ok(hint.text === 'Open the Studio' && /Studio/.test(hint.line) && hint.top < 260, 'beside the Models page\'s opening line, a plain line and a raised key: Open the Studio, in the first screen', hint);
    ok(studio.room === 'studio' && studio.train && studio.ai && studio.conv && studio.tab === 'Studio', 'the key opens the Studio: Train a small model, Your own AIs and Convert a model', studio);
    await shot(p, 'rooms-models-studio-desk-day');

    // ---------------- 9 · Support folds, one group open at a time ----------------
    await go(p, 'settings'); await room(p, 'settings', 'calm');
    const fold = await p.evaluate(async () => { const keys = () => [...document.querySelectorAll('#supRows .rm-fold')]; const st = () => keys().map(k => k.getAttribute('aria-expanded')).join(',');
      const a = st(); keys()[1].click(); await new Promise(r => setTimeout(r, 120)); const b = st(); const h = Math.round(document.getElementById('supCard').getBoundingClientRect().height);
      keys()[1].click(); await new Promise(r => setTimeout(r, 120)); const c = st(); keys()[0].click(); await new Promise(r => setTimeout(r, 120));
      const gs = [...document.querySelectorAll('#supRows .sup-group')], g = gs[gs.length - 1], shut = !!g && g.classList.contains('rm-shut'); if (g) g.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 120));
      return { n: keys().length, a, b, c, h, wasShut: shut, lastOpen: !!g && !g.classList.contains('rm-shut') }; });
    ok(fold.n >= 3 && fold.a.split(',').filter(x => x === 'true').length === 1 && fold.b.split(',').indexOf('true') === 1 && fold.b.split(',').filter(x => x === 'true').length === 1, "Support's groups fold: one open at a time, a press opens another and closes the first", fold);
    ok(fold.c.indexOf('true') < 0 && fold.wasShut && fold.lastOpen && fold.h < 900, 'the open group can be closed too; scrolling to a closed group opens it; Support is now short', fold);

    // ---------------- 10 · every setting at once, for those who prefer one long page ----------------
    const all = await p.evaluate(async () => { document.getElementById('rmAll-settings').click(); await new Promise(r => setTimeout(r, 200));
      const shownP = [...document.querySelectorAll('#page-settings .rm-panel')].filter(x => !x.hidden).length, H = document.getElementById('page-settings').scrollHeight, tabs = document.getElementById('rmTabs-settings').hidden;
      return { shownP, H, tabs, label: document.getElementById('rmAll-settings').textContent.trim() }; });
    await shot(p, 'rooms-settings-all');
    await enter(p, URL_); await go(p, 'settings');
    const allKept = await p.evaluate(() => IngRooms.all());
    await p.evaluate(() => document.getElementById('rmAll-settings').click()); await p.waitForTimeout(200);
    const allOff = await p.evaluate(() => ({ all: IngRooms.all(), shownP: [...document.querySelectorAll('#page-settings .rm-panel')].filter(x => !x.hidden).length }));
    ok(all.shownP >= 5 && all.tabs && all.H > 4000 && all.label === 'Show the settings in rooms' && allKept && !allOff.all && allOff.shownP === 1, '"Show every setting at once" shows them all under room headings, is remembered, and the key brings the rooms back', { all, allKept, allOff });

    // ---------------- 11 · a card that comes later goes to its room ----------------
    const late = await p.evaluate(async () => { const pg = document.getElementById('page-settings');
      const s = document.createElement('div'); s.className = 'card'; s.id = 'rmTestSound'; s.innerHTML = '<h2 class="sec">Sound</h2><p>Test.</p>'; pg.appendChild(s);
      const z = document.createElement('div'); z.className = 'card'; z.id = 'rmTestZebra'; z.innerHTML = '<h2 class="sec">Zebra crossings</h2><p>Test.</p>'; pg.appendChild(z);
      await new Promise(r => setTimeout(r, 120)); const a = { sound: IngRooms.roomOf(s), zebra: IngRooms.roomOf(z), more: !document.getElementById('rmT-settings-more').hidden };
      s.remove(); z.remove(); await new Promise(r => setTimeout(r, 120)); go('home'); go('settings'); a.moreAfter = !document.getElementById('rmT-settings-more').hidden; return a; });
    ok(late.sound === 'everyday' && late.zebra === 'more' && late.more && !late.moreAfter, 'a card added later is filed by its heading (Sound to Everyday); one nobody named goes to More, shown only while it holds something', late);

    // ---------------- 12 · Blend: rooms, the steps, a whole blend with a stand-in model ----------------
    await p.evaluate(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^hs_/.test(m.id));
      [['hs_velox', 'lfm2.5-1.2b-instruct', 'Velox copy'], ['hs_scriba', 'qwen3.5-2b', 'Scriba copy'], ['hs_magister', 'qwen3.5-9b', 'Magister copy'], ['hs_faber', 'mellum2.1-12b-thinking', 'Faber copy']].forEach(x => {
        state.models.push({ id: x[0], customName: x[2], fileState: 'ready', fileName: L[x[1]].file, sizeBytes: L[x[1]].size, paramB: L[x[1]].params, stored: true, shellStored: true, type: 'GGUF', color: '#6a3fb5' }); });
      blCanRun = () => true; saveState(); });
    await go(p, 'blend', 1000); await room(p, 'blend', 'new');
    const steps = await p.evaluate(async () => { const out = {}; const vis = id => { const e = document.getElementById(id); return !!e && e.getBoundingClientRect().height > 0; };
      IngRooms.step(1); out.s1 = { pick: vis('blendPick'), strats: vis('blendStrats'), task: vis('blendTask'), presets: vis('blPresets'), out: vis('blendOut'), cur: (document.querySelector('.rm-step[aria-current=step]') || {}).textContent };
      document.querySelector('.rm-stepnav .rm-next').click(); await new Promise(r => setTimeout(r, 150)); out.s2 = { strats: vis('blendStrats'), pick: vis('blendPick'), focus: document.activeElement && document.activeElement.textContent.trim().slice(0, 40) };
      document.querySelector('.rm-stepnav .rm-next').click(); await new Promise(r => setTimeout(r, 150)); out.s3 = { task: vis('blendTask'), run: vis('blendRun'), strats: vis('blendStrats'), nextHidden: document.querySelector('.rm-stepnav .rm-next').hidden };
      document.querySelector('.rm-stepnav .rm-back').click(); await new Promise(r => setTimeout(r, 150)); out.back = IngRooms.step(); return out; });
    ok(steps.s1.pick && !steps.s1.strats && !steps.s1.task && !steps.s1.presets && steps.s1.out && /Choose/.test(steps.s1.cur), 'a new blend shows one step at a time beside the answers: first, choose the models', steps.s1);
    ok(steps.s2.strats && !steps.s2.pick && /How to bring/.test(steps.s2.focus) && steps.s3.task && steps.s3.run && !steps.s3.strats && steps.s3.nextHidden && steps.back === 2, 'Next goes to how they work together (focus on its heading), then to the question with Run; Back goes back', steps);
    await shot(p, 'rooms-blend-steps');
    await room(p, 'blend', 'ready');
    const ready = await p.evaluate(() => { const vis = e => !!e && e.getBoundingClientRect().height > 0; return { presets: document.querySelectorAll('#blPresets .bl-preset').length, shown: vis(document.getElementById('blPresets')), task: vis(document.getElementById('blendTask')), out: vis(document.getElementById('blendOut')) }; });
    ok(ready.presets === 5 && ready.shown && !ready.task && !ready.out, 'Ready-made shows the five ready-made blends alone, wide', ready);
    await shot(p, 'rooms-blend-ready');
    await p.evaluate(() => { [...document.querySelectorAll('#blPresets .bl-preset')].find(c => /Second opinion/.test(c.textContent)).querySelector('.btn').click(); }); await p.waitForTimeout(500);
    const used = await p.evaluate(() => ({ room: IngRooms.current('blend'), step: IngRooms.step(), focus: document.activeElement && document.activeElement.id, ids: blState().ids.join(','), strategy: blState().strategy }));
    ok(used.room === 'new' && used.step === 3 && used.focus === 'blendTask' && used.ids === 'hs_scriba,hs_magister' && used.strategy === 'judge', 'Use this blend sets the models and the way, and lands on the question, ready to write', used);
    const run = await p.evaluate(async () => { window.__asked = [];
      blAsk = function (r, a, m, messages, into) { const u = messages[messages.length - 1].content; window.__asked.push({ model: m.customName, judge: /You are the judge/.test(u) });
        let text; if (/You are the judge/.test(u)) text = 'Answer 1: accuracy 3/5, completeness 2/5, clarity 4/5. Reason: it leaves out the second cause.\nAnswer 2: accuracy 5/5, completeness 4/5, clarity 4/5. Reason: both causes are given and supported.\nTHE ANSWER:\nThe tides rise and fall because of the Moon\'s gravity and, to a lesser degree, the Sun\'s.';
        else text = m.id === 'hs_scriba' ? 'The tides come from the Moon.' : 'The tides come from the Moon and the Sun together.';
        a.state = 'done'; a.text = text; a.ms = 900; into.text = text; return Promise.resolve(text); };
      document.getElementById('blendTask').value = 'Why are there tides?'; document.getElementById('blendRun').click();
      for (let i = 0; i < 100 && BL.run; i++) await new Promise(r => setTimeout(r, 100));
      const o = document.getElementById('blendOut'), r = o.getBoundingClientRect();
      return { asked: window.__asked.length, cards: [...o.querySelectorAll('.bl-card')].map(c => (c.querySelector('.bl-card-h b') || {}).textContent), seen: r.height > 0 && r.width > 0, room: IngRooms.current('blend'), done: [...document.querySelectorAll('.rm-step.rm-done')].map(s => s.textContent.trim()) }; });
    ok(run.asked === 3 && run.cards.includes('The judged answer') && run.seen && run.room === 'new', 'Run blend, from the steps: both models answer, the judge decides, and the answers show beside the steps', run);
    await p.evaluate(() => IngRooms.step(4)); await p.waitForTimeout(500);
    ok(await p.evaluate(() => { const o = document.getElementById('blendOut'); return document.activeElement === o && o.getBoundingClientRect().top < innerHeight; }), 'step 4, Answers, brings the answers into view and moves focus to them');
    await shot(p, 'rooms-blend-answers');
    // a second run makes Earlier blends appear, with its own room
    await p.evaluate(async () => { document.getElementById('blendTask').value = 'Why is the sea salty?'; blendRun(); for (let i = 0; i < 100 && BL.run; i++) await new Promise(r => setTimeout(r, 100)); }); await p.waitForTimeout(400);
    const earl = await p.evaluate(async () => { const t = document.getElementById('rmT-blend-earlier'); if (!t || t.hidden) return { shown: false };
      t.click(); await new Promise(r => setTimeout(r, 200)); const d = document.getElementById('blendEarlier'); const ks = d.querySelectorAll('.bl-earl');
      if (ks[1]) ks[1].click(); await new Promise(r => setTimeout(r, 300));
      return { shown: true, open: d.open, items: ks.length, q: (document.querySelector('#blendOut .bl-q') || {}).textContent, outSeen: document.getElementById('blendOut').getBoundingClientRect().height > 0, room: IngRooms.current('blend') }; });
    ok(earl.shown && earl.open && earl.items >= 2 && /tides/.test(earl.q || '') && earl.outSeen && earl.room === 'earlier', 'Earlier blends gets its room once there is one; pressing one shows its answers beside the list', earl);
    // a house kept from the blend: Your houses
    await room(p, 'blend', 'new'); await p.evaluate(() => IngRooms.step(3)); await p.waitForTimeout(200);
    const hb = await p.evaluate(() => !document.getElementById('rmT-blend-houses').hidden);
    await p.click('#blendSave'); await p.waitForTimeout(300); await p.fill('#bhName', 'Tide judges'); await p.click('#bhOk'); await p.waitForTimeout(500);
    const houses = await p.evaluate(async () => { const t = document.getElementById('rmT-blend-houses'); if (!t || t.hidden) return { after: false }; t.click(); await new Promise(r => setTimeout(r, 200));
      const h = document.getElementById('bhBox'); return { after: true, open: h.open, seen: h.getBoundingClientRect().height > 0, text: h.textContent.slice(0, 80), task: document.getElementById('blendTask').getBoundingClientRect().height > 0 }; });
    ok(!hb && houses.after && houses.open && houses.seen && /Tide judges/.test(houses.text) && !houses.task, 'Save as a house (from the question step): Your houses gets its room, and shows the house alone', { hb, houses });
    await shot(p, 'rooms-blend-houses');
    ok(p.__errs.length === 0, 'no page errors on the desk', p.__errs);

    // ---------------- 13 · axe-core on every room, by day and night ----------------
    if (AXE) {
      const found = [];
      for (const th of ['day', 'night']) { await theme(p, th);
        for (const pg of PAGES) { await go(p, pg);
          for (const r of await p.evaluate(pg => IngRooms.rooms(pg).filter(x => x.shown).map(x => x.key), pg)) { await room(p, pg, r);
            const v = await axeRun(p); if (v && v.length) found.push({ at: 'desk/' + th + '/' + pg + '/' + r, v }); }
          await shot(p, 'rooms-' + pg + '-desk-' + th); } }
      ok(found.length === 0, 'axe-core finds nothing on any room of the three pages on a desk, by day and night', found);
    } else console.log('NOTE no axe.min.js given: axe-core not run');
    await ctx.close();

    // ---------------- 14 · a phone ----------------
    ({ ctx, p } = await open(b, PHONE));
    const ph = {}; const found = [];
    for (const th of ['day', 'night']) { await theme(p, th);
      for (const pg of PAGES) { await go(p, pg, 1000);
        const m = await p.evaluate(pg => { const tabs = [...document.querySelectorAll('#rmTabs-' + pg + ' [role=tab]')].filter(t => !t.hidden);
          return { n: tabs.length, small: tabs.filter(t => t.getBoundingClientRect().height < 44).length, out: tabs.filter(t => { const r = t.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth; }).length,
            cut: tabs.filter(t => t.scrollWidth > t.clientWidth + 1).length, sw: document.documentElement.scrollWidth, vw: innerWidth,
            keys: [...document.querySelectorAll('#page-' + pg + ' :is(.rm-key, .rm-allkey, .rm-step, .rm-stepnav button)')].filter(k => { const h = k.getBoundingClientRect().height; return h > 0 && h < 44; }).map(k => k.textContent.trim().slice(0, 30)) }; }, pg);
        ph[th + '/' + pg] = m;
        await shot(p, 'rooms-' + pg + '-phone-' + th);
        if (AXE) for (const r of await p.evaluate(pg => IngRooms.rooms(pg).filter(x => x.shown).map(x => x.key), pg)) { await room(p, pg, r);
          const v = await axeRun(p); if (v && v.length) found.push({ at: 'phone/' + th + '/' + pg + '/' + r, v }); } } }
    ok(Object.entries(ph).every(([k, m]) => m.n >= (/blend/.test(k) ? 2 : 4) && m.small === 0 && m.out === 0 && m.cut === 0 && m.keys.length === 0), 'on a phone every tab is whole, inside the screen and at least 44 pixels high, and so is every other key of the rooms (Open the Studio, every setting at once, the steps, Back and Next)', ph);
    if (AXE) ok(found.length === 0, 'axe-core finds nothing on any room of the three pages on a phone, by day and night', found);
    await go(p, 'settings'); await room(p, 'settings', 'everyday');
    await p.fill('#rmFind', 'backup'); await p.waitForTimeout(400); await shot(p, 'rooms-settings-phone-find');
    await p.fill('#rmFind', ''); await p.waitForTimeout(200);
    const widths = {};
    for (const w of [320, 360, 390, 430]) { await p.setViewportSize({ width: w, height: 844 }); await p.waitForTimeout(250);
      for (const pg of PAGES) { await go(p, pg, 500); for (const r of await p.evaluate(pg => IngRooms.rooms(pg).filter(x => x.shown).map(x => x.key), pg)) { await room(p, pg, r);
        const sw = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (sw > 0) widths[w + '/' + pg + '/' + r] = sw; } } }
    ok(Object.keys(widths).length === 0, 'no sideways scroll on any room at 320, 360, 390 and 430 pixels', widths);
    const notch = await p.evaluate(() => { const r = document.getElementById('rmTabs-settings').getBoundingClientRect(); go('settings'); window.scrollTo(0, 0); const t = document.querySelector('.topbar'); return { tabsTop: Math.round(document.getElementById('rmTabs-settings').getBoundingClientRect().top), bar: t ? Math.round(t.getBoundingClientRect().bottom) : 0 }; });
    ok(notch.tabsTop >= notch.bar, 'with the notch\'s insets, the tabs sit below the top bar, never under it', notch);
    ok(p.__errs.length === 0, 'no page errors on the phone', p.__errs);
    await ctx.close();
  } catch (e) { ok(false, 'crashed: ' + (e && e.stack || e)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
