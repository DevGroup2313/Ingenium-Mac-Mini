// node rig/t_637_author.js <Ingenium page url (master)> <out dir>
// Ingenium 6.37 (6 November 2026): the Author Studio, the room behind the rooms (modules/r236.js). Her words: "I want to actually be
// able to make edits and changes to Ingenium." Invented words and names only. Checks, in one profile:
//   - Settings' Author Studio room is a door: Open the Author Studio, Edit words on the page; the Workshop's old cards are not there
//   - the studio over the whole window: its top bar (All changes kept, Show Ingenium beside, Export all, Import all, Reset all, Close)
//     and its rail of rooms; the Editor's four kinds, each opening its room
//   - Words: pressing words on a page (the studio docked beside Ingenium) opens the editor; kept, the page shows the new words; on
//     that page only, or everywhere when chosen; the same words in a chat message are never changed; after a reload still in place;
//     found by Find words; restored
//   - Names: Ingenium's name, a page's name in the side bar, its title and its first line
//   - Look: a ready look and an accent colour change Ingenium's colours at once (day and night); fonts and depth
//   - Change log: every change listed, each undoable; Export all writes them to one file, Import all reads it back, Reset all
//     returns Ingenium to how it was built and Undo brings it back
//   - Checks and additions holds the Workshop whole (Check Ingenium, Errors, Your layers); go("workshop") opens the studio; Esc closes
//   - no page errors; every part ran
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true && window.IngAuthor, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
const ledeOf = (p, page) => p.evaluate((page) => (document.querySelector('#page-' + page + ' > .lede') || {}).textContent, page);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. the door in Settings
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'author'); }); await p.waitForTimeout(800);
  const door = await p.evaluate(() => { const st = document.getElementById('wsStudio'); const d = st && st.querySelector('.au-door'); const vis = (sel) => { const e = st && st.querySelector(sel); return !!(e && e.getClientRects().length && getComputedStyle(e).display !== 'none'); };
    return { door: !!d && d.getClientRects().length > 0, keys: d ? [...d.querySelectorAll('button')].map(x => x.textContent.trim()) : [], oldBanner: vis(':scope > .as-banner'), oldBody: vis('#wsBody') }; });
  await p.screenshot({ path: OUT + '/637_door.png' });
  ok(door.door && door.keys.join('|') === 'Open the Author Studio|Edit words on the page' && !door.oldBanner && !door.oldBody, 'Settings\' Author Studio room is a door to the studio; the Workshop\'s cards are no longer laid out there', door);
  // 2. the studio
  await p.click('#auOpenKey'); await p.waitForTimeout(700);
  const st = await p.evaluate(() => { const r = document.getElementById('ingAuthor'), rc = r.getBoundingClientRect();
    return { open: !r.hidden, full: Math.round(rc.width) === innerWidth && Math.round(rc.height) === innerHeight, top: [...r.querySelectorAll('.au-top button')].map(x => x.textContent.trim()), kept: document.getElementById('auKept').textContent,
      rooms: [...r.querySelectorAll('.au-room')].map(x => x.querySelector('span').textContent), h: document.getElementById('auH').textContent, kinds: [...r.querySelectorAll('.au-kind b')].map(x => x.textContent) }; });
  await p.screenshot({ path: OUT + '/637_studio.png' });
  ok(st.open && st.full && st.top.join('|') === 'Show Ingenium beside|Export all|Import all|Reset all|Close' && /^All changes kept/.test(st.kept), 'the studio covers the window with its own top bar: All changes kept, Show Ingenium beside, Export all, Import all, Reset all, Close', st);
  // 6.43: the Side bar room (the studio's second stage, rig/t_643_side.js) joins the rail after Names, and the Editor's kinds
  ok(st.rooms.join('|') === 'The Editor|Words|Names|Side bar|Look|Checks and additions|Change log' && st.h === 'The Editor' && st.kinds.length === 5, 'its rail of rooms, and the Editor asking what is being changed (five kinds, with the side bar since 6.43)', { rooms: st.rooms, kinds: st.kinds });
  /* the fourth kind since 6.43 (Its side bar is the third) */ await p.click('.au-kind:nth-child(4)'); await p.waitForTimeout(300); const k3 = await p.evaluate(() => document.getElementById('auH').textContent);
  ok(k3 === 'Look', 'a kind pressed opens its room (The way it looks: Look)', k3);
  // 3. words: pressed on the page
  await p.evaluate(() => { IngAuthor.close(); go('focus'); }); await p.waitForTimeout(600);
  const LEDE0 = await ledeOf(p, 'focus');
  await p.evaluate(() => { IngAuthor.open('words'); IngAuthor.pick(true); }); await p.waitForTimeout(500);
  const docked = await p.evaluate(() => ({ dock: document.getElementById('ingAuthor').classList.contains('au-dock'), bar: !document.getElementById('auPickBar').hidden, w: Math.round(document.getElementById('ingAuthor').getBoundingClientRect().width) }));
  const box = await p.evaluate(() => { const e = document.querySelector('#page-focus > .lede'); const r = e.getBoundingClientRect(); return { x: r.left + 30, y: r.top + r.height / 2 }; });
  await p.mouse.move(box.x, box.y); await p.waitForTimeout(150); await p.mouse.click(box.x, box.y); await p.waitForTimeout(400);
  const pop = await p.evaluate(() => { const q = document.getElementById('auPop'); return { open: !q.hidden, orig: (q.querySelector('.orig') || {}).textContent, where: (q.querySelector('.au-note') || {}).textContent, page: document.getElementById('page-focus').classList.contains('active') }; });
  ok(docked.dock && docked.bar && docked.w <= 520 && pop.open && pop.orig === LEDE0 && /Focus/.test(pop.where) && pop.page, 'Edit words on the page docks the studio beside Ingenium; pressing a sentence opens it to be rewritten (the press does nothing else)', { docked, pop });
  const NEW = 'An invented first line, written in the Author Studio.';
  await p.fill('#auPopText', NEW); await p.click('#auPop .k .btn.primary'); await p.waitForTimeout(500);
  const w1 = await ledeOf(p, 'focus');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok(w1 === NEW, 'kept, the page shows the new words at once', w1);
  // the same words elsewhere: on that page only, unless chosen everywhere; never in a chat message
  const TWIN = await p.evaluate(() => { const h = document.querySelector('#fxStepsCard h2.sec'); return h && h.textContent.trim(); });
  await p.evaluate((t) => { IngAuthor.words.set(t, 'Small steps', 'page-focus'); }, TWIN); await p.waitForTimeout(300);
  const scope1 = await p.evaluate((t) => ({ focus: document.querySelector('#fxStepsCard h2.sec').textContent.trim(), home: [...document.querySelectorAll('#page-home *')].some(e => e.childNodes.length === 1 && e.textContent.trim() === 'Small steps') }), TWIN);
  /* her own message that happens to hold the very words rewritten everywhere */
  await p.evaluate((L) => { go('chat'); curMsgs().push({ role: 'me', text: L }); saveState(); IngAuthor.words.set(L, 'An invented first line, written in the Author Studio.', 'all'); try { renderChat(); } catch (e) {} }, LEDE0); await p.waitForTimeout(900);
  const chatSafe = await p.evaluate(() => { const m = [...document.querySelectorAll('#chatScroll .msg')].map(x => x.textContent); return { n: m.length, kept: m.some(t => /Support that fits how you work/.test(t)), changed: m.some(t => /An invented first line/.test(t)) }; });
  ok(scope1.focus === 'Small steps' && !scope1.home && chatSafe.n > 0 && chatSafe.kept && !chatSafe.changed, 'a rewrite is made on its page only (Steps on Focus), and even one made everywhere never changes her own words in a chat message', { scope1, chatSafe });
  // after a reload
  await p.reload(); await boot(p); await p.evaluate(() => go('focus')); await p.waitForTimeout(1200);
  const re = await p.evaluate(() => ({ lede: (document.querySelector('#page-focus > .lede') || {}).textContent, steps: document.querySelector('#fxStepsCard h2.sec').textContent.trim(), n: IngAuthor.words.list().length }));
  ok(re.lede === NEW && re.steps === 'Small steps' && re.n >= 2, 'after a reload the rewrites are in place as Ingenium starts', re);
  // found by Find words, then restored
  await p.evaluate(() => IngAuthor.open('words')); await p.waitForTimeout(300); await p.fill('#auFind', 'Break it down'); await p.waitForTimeout(700);
  const found = await p.evaluate(() => [...document.querySelectorAll('#auHits .au-row')].map(r => r.textContent.trim()).slice(0, 5));
  const yours = await p.evaluate(() => [...document.querySelectorAll('#auYours .au-row')].map(r => r.querySelector('.where').textContent + ': ' + r.querySelector('.to').textContent));
  await p.evaluate(() => { const r = [...document.querySelectorAll('#auYours .au-row')].find(x => /Small steps/.test(x.textContent)); [...r.querySelectorAll('button')].find(b => b.textContent === 'Restore').click(); }); await p.waitForTimeout(400);
  const back = await p.evaluate(() => document.querySelector('#fxStepsCard h2.sec').textContent.trim());
  ok(found.some(t => /Focus/.test(t) && /Break it down/.test(t)) && yours.some(t => /Focus: Small steps/.test(t)) && back === 'Steps', 'Find words finds a key on Focus; Your words lists each rewrite with its page; Restore brings back the built words', { found, yours, back });
  // 4. names
  await p.evaluate(() => IngAuthor.room('names')); await p.waitForTimeout(300);
  await p.fill('#auAppName', 'Lumen'); await p.dispatchEvent('#auAppName', 'change');
  const navIn = await p.$('input[data-page="focus"][data-field="nav"]'); await navIn.fill('Steady'); await navIn.dispatchEvent('change');
  const titIn = await p.$('input[data-page="focus"][data-field="title"]'); await titIn.fill('Steady work'); await titIn.dispatchEvent('change'); await p.waitForTimeout(400);
  const nm = await p.evaluate(() => ({ app: ingAppName(), nav: document.querySelector('nav.dock .nav-btn[data-page="focus"]').textContent.trim(), title: document.querySelector('#page-focus > .page-title').textContent.trim() }));
  ok(nm.app === 'Lumen' && nm.nav === 'Steady' && nm.title === 'Steady work', 'Names: Ingenium\'s own name, a page\'s name in the side bar and its title', nm);
  // 5. look
  const look0 = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  await p.evaluate(() => IngAuthor.room('look')); await p.waitForTimeout(300);
  await p.evaluate(() => [...document.querySelectorAll('#ingAuthor .au-swatch')].find(b => /Carpe Diem blue/.test(b.textContent)).click()); await p.waitForTimeout(300);
  const look1 = await p.evaluate(() => { const r = getComputedStyle(document.documentElement); const night = (() => { document.body.setAttribute('data-theme', 'night'); const v = getComputedStyle(document.body).getPropertyValue('--accent').trim(); document.body.setAttribute('data-theme', 'day'); return v; })(); return { accent: r.getPropertyValue('--accent').trim(), deep: r.getPropertyValue('--accent-deep').trim(), night }; });
  await p.selectOption('#auF-serif', 'garamond'); await p.selectOption('#auDepth', 'deep'); await p.waitForTimeout(300);
  const look2 = await p.evaluate(() => ({ serif: getComputedStyle(document.documentElement).getPropertyValue('--serif').trim(), h1: getComputedStyle(document.querySelector('#page-focus > .page-title')).fontFamily, pop: getComputedStyle(document.documentElement).getPropertyValue('--pop').trim() }));
  await p.screenshot({ path: OUT + '/637_look.png' });
  ok(look0 === '#6a3fb5' && look1.accent === '#1f5f9e' && look1.deep !== '#4e2c8a' && look1.night && look1.night !== '#b79ce6' && /Garamond/.test(look2.serif) && /Garamond/.test(look2.h1) && /0 3\.5px 0/.test(look2.pop),
    'Look: a ready look recolours Ingenium at once, day and night; the headings\' font and the depth change too', { look0, look1, look2 });
  // 6. the change log, undo, export, import, reset
  await p.evaluate(() => IngAuthor.room('log')); await p.waitForTimeout(300);
  const lg = await p.evaluate(() => [...document.querySelectorAll('#auRoom .au-row')].map(r => r.querySelector('.w > div').textContent));
  await p.evaluate(() => [...document.querySelectorAll('#auRoom .au-keys button')].find(b => b.textContent === 'Undo the last change').click()); await p.waitForTimeout(300);
  const u1 = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--pop').trim());
  await p.evaluate(() => { const r = [...document.querySelectorAll('#auRoom .au-row')].find(x => /side bar name of Focus/.test(x.textContent) && x.querySelector('button')); r.querySelector('button').click(); }); await p.waitForTimeout(300);
  const u2 = await p.evaluate(() => document.querySelector('nav.dock .nav-btn[data-page="focus"]').textContent.trim());
  ok(lg.length >= 7 && lg.some(t => /Rewrote/.test(t)) && lg.some(t => /Named Ingenium “Lumen”/.test(t)) && lg.some(t => /Chose a look: Carpe Diem blue/.test(t)) && !/0 3\.5px 0/.test(u1) && u2 === 'Focus',
    'the change log lists every change; Undo the last takes back the depth, and Undo on an earlier one brings back Focus\'s own name', { lg: lg.slice(0, 10), u1, u2 });
  const exported = await p.evaluate(() => { let got = null; const o = window.saveFileNative; window.saveFileNative = (n, m, t) => { got = { n, m, t }; return Promise.resolve('test'); }; IngAuthor.exportAll(); window.saveFileNative = o; return got; });
  const data = JSON.parse(exported.t);
  ok(/^Ingenium author studio \d{4}-\d\d-\d\d\.json$/.test(exported.n) && data.kind === 'ingenium-author' && data.author.words.length >= 1 && data.author.look.accent === '#1f5f9e' && data.appName === 'Lumen', 'Export all writes every change (words, names, look, the app\'s name, the layers) to one file', { n: exported.n, words: data.author.words.length, look: data.author.look });
  await p.evaluate(() => [...document.querySelectorAll('#ingAuthor .au-top button')].find(b => b.textContent === 'Reset all').click()); await p.waitForTimeout(500);
  await p.evaluate(() => { const b = [...document.querySelectorAll('.ing-dlg-root button, button')].reverse().find(x => x.offsetParent && /^Reset all$/.test(x.textContent.trim()) && !x.closest('#ingAuthor')); if (b) b.click(); }); await p.waitForTimeout(600);
  const rs = await p.evaluate(() => ({ n: IngAuthor.words.list().length, accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(), app: ingAppName(), lede: document.querySelector('#page-focus > .lede').textContent, title: document.querySelector('#page-focus > .page-title').textContent.trim(), count: IngAuthor.count() }));
  ok(rs.n === 0 && rs.accent === '#6a3fb5' && rs.app === 'Ingenium' && rs.lede === LEDE0 && rs.title === 'Focus' && rs.count === 0, 'Reset all returns Ingenium to how it was built: words, names, colour and its own name', rs);
  const imp = await p.evaluate((t) => IngAuthor.importText(t), exported.t); await p.waitForTimeout(500);
  const ri = await p.evaluate(() => ({ n: IngAuthor.words.list().length, accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(), app: ingAppName(), lede: document.querySelector('#page-focus > .lede').textContent }));
  ok(imp === true && ri.n >= 1 && ri.accent === '#1f5f9e' && ri.app === 'Lumen' && ri.lede === NEW, 'Import all reads the file back: the words, the look and the name are in place again', ri);
  // 7. checks and additions, go("workshop"), Esc
  await p.evaluate(() => IngAuthor.room('checks')); await p.waitForTimeout(700);
  const ch = await p.evaluate(() => { const b = document.getElementById('wsBody'); return { inStudio: !!(b && b.closest('#ingAuthor')), heads: b ? [...b.querySelectorAll('h2,h3')].map(h => h.textContent.trim()) : [], keys: b ? [...b.querySelectorAll('button')].map(x => x.textContent.trim()).slice(0, 6) : [] }; });
  ok(ch.inStudio && ch.heads.includes('Check Ingenium') && ch.heads.includes('Errors since it started') && ch.heads.includes('Your layers') && ch.keys.includes('Run the check'), 'Checks and additions holds the Workshop whole: Check Ingenium, its errors, your layers', ch);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  const esc = await p.evaluate(() => document.getElementById('ingAuthor').hidden);
  await p.evaluate(() => go('workshop')); await p.waitForTimeout(500);
  const gw = await p.evaluate(() => !document.getElementById('ingAuthor').hidden);
  const topKey = await p.evaluate(() => { IngAuthor.close(); const k = document.getElementById('auTopKey'); return !!(k && k.offsetParent); });
  ok(esc && gw && topKey, 'Esc closes the studio; go("workshop") opens it; a Studio key in the top bar', { esc, gw, topKey });
  // leave Ingenium as it was built
  await p.evaluate(() => { const a = state.author; a.words = []; a.names = {}; a.look = {}; IngAuthor.names.app(''); IngAuthor.applyAll(); saveState(); });
  const parts = await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running'));
  ok(parts.length === 0, 'every part of the page ran to its end', parts);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
