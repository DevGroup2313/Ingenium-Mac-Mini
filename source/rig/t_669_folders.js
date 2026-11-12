// Folders as a drawer of her apps (Ingenium 6.69, modules/r263.js). Her words (10 November 2026): "The Folders page needs its own
// design and not just be a replica of the Blend page and Home page." "Also, I want the apps icon logos on their folders please." On
// the live preview: "I like this new look, please fix the stretched icons and push it everywhere. I really like this new design."
// And: "I want the apps seals to switch to their dark mode look when the app is on Dark mode instead of keeping their light mode look."
//   - the part runs; Folders' own title and lede stand in the head beside a drawer of folders, the one used last in front;
//   - an app of The Offline Project carries its own seal (r140), by day and by night as the Display is; any other app its own logo, and
//     one with no logo anywhere a quiet disc, never a letter (6.83, modules/r277.js); on Your apps each logo as Lector's (6.85, r279.js);
//   - pointing at a folder lifts it and names it; pressing it opens the folder as a spread (cover on the left, papers on the right);
//   - in the folder every control still works (rename, decisions, back); the index cards carry their seals; a new folder joins the
//     drawer; the build library is a book, the ways envelopes with orbs, How I work a ruled sheet that still keeps her words;
//   - cards lean and lift; left alone nothing is rewritten; below 760 pixels the drawer in its phone layout (6.71), below 260 pixels
//     Folders as it was; no page error.
// The person and the apps are invented (Ada; Quill, Lantern and Ledger), with Ingenium itself for its seal.
//   node rig/t_669_folders.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_669_folders.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme();
    ['Lantern', 'Ingenium', 'Quill'].forEach(n => IngFolders.make(n));
    const f = IngFolders.folders(), q = f.filter(x => x.name === 'Quill')[0];
    state.chats = (state.chats || []).filter(c => !/^t669/.test(c.id));
    state.chats.push({ id: 't669_c1', title: 'Quill: tables in the export', made: Date.now() - 3600e3, projectId: q.id, messages: [{ role: 'me', text: 'Quill exports tables badly to Word.' }, { role: 'bot', text: 'Quill needs a table writer.' }] });
    q.app.decisions = ['Footnotes are saved with the main text.', 'Word export keeps footnotes.']; q.app.open = ['Check the export of long tables.'];
    state.folders = state.folders || { how: '', ui: {} }; state.folders.ui = state.folders.ui || {}; state.folders.ui.open = null; saveState(); go('folders'); }); await p.waitForTimeout(1500);
  const st = () => p.evaluate(() => window.IngFoldersLook && IngFoldersLook.state());

  // 1. the head and the drawer
  const s1 = await p.evaluate(() => { const pg = document.getElementById('page-folders'), w = pg.querySelector('.fd-words');
    return { part: window.__ingParts && window.__ingParts.p263, st: IngFoldersLook.state(), on: pg.classList.contains('fd-on'),
      title: !!(w && w.querySelector(':scope > .page-title')), lede: !!(w && w.querySelector(':scope > .lede')),
      titleFont: w ? getComputedStyle(w.querySelector('.page-title')).fontFamily : '', keys: [...pg.querySelectorAll('.fd-keys .btn')].map(k => k.textContent.trim()) }; });
  ok(s1.part === 'running' && s1.st && s1.st.on && s1.on, 'the new look runs on Folders', s1);
  ok(s1.title && s1.lede && /Cormorant/.test(s1.titleFont), "Folders' own title and lede stand in the head, the title in Ingenium's Cormorant", s1);
  ok(s1.keys.join('|') === 'A folder for another app|Bring in your work', 'the head has its two keys', s1.keys);
  ok(s1.st.files.length === 3 && s1.st.files[2] === 'Quill', 'the drawer holds a folder for each app, the one used last in front', s1.st.files);
  ok(/3 folders/.test(s1.st.label), 'the drawer front says how many folders', s1.st.label);
  // 2. the seals, by day
  const s2 = await p.evaluate(() => { const ing = [...document.querySelectorAll('#page-folders .fd-file')].find(b => /Ingenium/.test(b.getAttribute('aria-label')));
    const im = ing && ing.querySelector('.fd-front .fd-seal'), q = [...document.querySelectorAll('#page-folders .fd-file')].find(b => /^Quill/.test(b.getAttribute('aria-label')));
    return { key: im && im.getAttribute('data-fd-seal'), day: !!im && im.src === IngSeal.url(['ingenium'], { night: false }), loaded: !!im && im.complete && im.naturalWidth > 0,
      coin: q ? !!q.querySelector('.fd-front .fd-coin') : null, disc: q ? !!q.querySelector('.fd-front .ing-logo-wait') : null, name: q ? q.querySelector('.fd-ft b').textContent : null, tab: !!(ing && ing.querySelector('.fd-tab .fd-seal')) }; });
  ok(s2.key === 'ingenium' && s2.day && s2.loaded && s2.tab, "Ingenium's folder carries Ingenium's own seal by day, on its tab and its front", s2);
  ok(s2.coin === false && s2.disc && s2.name === 'Quill', 'an app with no logo anywhere has a quiet disc, never a letter (6.83)', s2);
  await p.screenshot({ path: OUT + '/day_home.png' });
  // 3. pointing at a folder lifts it and names it
  const fb = await p.evaluate(() => { const b = [...document.querySelectorAll('#page-folders .fd-file')].find(x => /^Lantern/.test(x.getAttribute('aria-label'))); const r = b.querySelector('.fd-tab').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(fb.x, fb.y); await p.waitForTimeout(700);
  const s3 = await p.evaluate(() => ({ st: IngFoldersLook.state(), hint: document.querySelector('#page-folders .fd-hint').textContent, up: document.querySelectorAll('#page-folders .fd-file.fd-up').length }));
  ok(s3.st.held === 'Lantern' && s3.up === 1 && /^Lantern: 0 conversations/.test(s3.hint), 'pointing at a folder lifts it out and names it', s3);
  await (await p.$('#page-folders .fd-head')).screenshot({ path: OUT + '/day_lift.png' });
  await p.mouse.move(5, 450); await p.waitForTimeout(500);
  const s3b = await st(); ok(s3b.held === null, 'leaving it lowers it again', s3b.held);
  // 4. the catalogue, the book, the envelopes and the sheet
  const s4 = await p.evaluate(() => { const pg = document.getElementById('page-folders');
    const cards = [...pg.querySelectorAll('.fld-card:not(.fld-new)')].map(c => ({ name: c.querySelector('.fld-name').textContent.trim(), seal: !!c.querySelector('.fd-ls,.fd-lscrest,.fd-seal'), disc: !!c.querySelector('.ing-logo-wait'), coin: !!c.querySelector('.fd-coin') }));
    const ways = pg.querySelectorAll('.fld-way').length, envs = pg.querySelectorAll('.fld-way.fd-env > .fdo').length;
    return { cards, book: !!pg.querySelector('.fd-libcard .fd-book'), ways, envs, sheet: !!pg.querySelector('.fd-sheet > #fldHowAll'), wm: !!pg.querySelector('.fd-sheet > .fd-wm'),
      svgHidden: getComputedStyle(pg.querySelector('.fld-card .fld-name > svg')).display === 'none' }; });
  ok(s4.cards.length === 3 && s4.cards.find(c => c.name === 'Ingenium').seal && s4.cards.find(c => c.name === 'Quill').disc && !s4.cards.some(c => c.coin) && s4.svgHidden, 'each folder is an index card with its logo, or a quiet disc', s4.cards);
  ok(s4.book, 'the build library is a bound book', s4);
  ok(s4.ways >= 5 && s4.envs === s4.ways, 'every way of bringing work in is an envelope with its orb', s4);
  ok(s4.sheet && s4.wm, 'How I work is a ruled sheet with the seal in its corner', s4);
  await p.evaluate(() => { const t = document.getElementById('fldHowAll'); t.value = '- One step at a time.'; t.dispatchEvent(new Event('change', { bubbles: true })); }); await p.waitForTimeout(200);
  ok(await p.evaluate(() => state.folders.how === '- One step at a time.'), 'the sheet still keeps her words');
  const cb = await (await p.$$('#page-folders .fld-card'))[0].boundingBox(); await p.mouse.move(cb.x + cb.width * .7, cb.y + cb.height * .3); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !!document.querySelector('#page-folders .fld-card.fd-pop.fd-ph')), 'a card leans and lifts under the pointer');
  await p.mouse.move(5, 450);
  await p.evaluate(() => { document.querySelector('#page-folders .fd-libcard').scrollIntoView(); }); await p.waitForTimeout(400); await p.screenshot({ path: OUT + '/day_home2.png' });
  // 5. pressing a folder opens it as a spread
  await p.evaluate(() => { document.getElementById('page-folders').scrollIntoView(); }); await p.waitForTimeout(300);
  const fq = await p.evaluate(() => { const b = [...document.querySelectorAll('#page-folders .fd-file')].find(x => /^Quill/.test(x.getAttribute('aria-label'))); const r = b.querySelector('.fd-front').getBoundingClientRect(); return { x: r.left + 60, y: r.top + 30 }; });
  await p.mouse.click(fq.x, fq.y); await p.waitForTimeout(1200);
  const s5 = await p.evaluate(() => { const pg = document.getElementById('page-folders'), L = pg.querySelector('.fd-spread > .fd-left'), R = pg.querySelector('.fd-spread > .fd-right');
    const h = el => el ? [...el.querySelectorAll(':scope > .card > h2')].map(x => x.textContent.trim()) : [];
    return { open: state.folders.ui.open, st: IngFoldersLook.state(), leftHead: !!(L && L.querySelector(':scope > .fld-h .fd-oh h2')), leftSeal: !!(L && L.querySelector('.fd-oh .ing-logo-wait')),
      left: h(L), right: h(R), convOrbs: pg.querySelectorAll('.fd-right li.fd-conv > .fdo').length, crumb: !!pg.querySelector('#fldBody > .fld-crumb'),
      start: !!(L && [...L.querySelectorAll('.fld-h .btn')].find(k => /^Start a conversation/.test(k.textContent))) }; });
  ok(s5.st.spread && s5.st.inside && s5.crumb, 'pressing a folder opens it as a spread, under its path', s5);
  ok(s5.leftHead && s5.leftSeal && s5.start && s5.left.join('|') === 'Where we left off|How I work on Quill', 'the cover on the left: its seal, name, keys, where we left off and how I work', s5);
  ok(/^Decisions, and what is open\|Conversations \(1\)/.test(s5.right.join('|')) && s5.right.indexOf('The words that mark it') >= 0, 'its papers on the right: decisions, conversations, the words', s5.right);
  ok(s5.convOrbs === 1, 'each conversation has its own orb', s5.convOrbs);
  await p.screenshot({ path: OUT + '/day_folder.png' });
  // 6. the folder's own controls still work
  await p.evaluate(() => { const li = [...document.querySelectorAll('#page-folders .fd-right .fld-list li')].find(x => /Word export/.test(x.textContent)); li.querySelector('.btn').click(); }); await p.waitForTimeout(400);
  const s6 = await p.evaluate(() => { const q = IngFolders.folders().filter(x => x.name === 'Quill')[0]; return { dec: q.app.decisions, spread: !!document.querySelector('#page-folders .fd-spread'), anim: !!document.querySelector('#page-folders .fd-spread.fd-anim') }; });
  ok(s6.dec.length === 1 && s6.spread && !s6.anim, 'removing a decision works, and the spread does not swing open again', s6);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders .fld-h .btn')].find(x => x.textContent.trim() === 'Rename'); k.click(); }); await p.waitForTimeout(300);
  await p.fill('#fldRename', 'Quill Two'); await p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders .fld-h .btn')].find(x => x.textContent.trim() === 'Keep the name'); k.click(); }); await p.waitForTimeout(500);
  const s6b = await p.evaluate(() => ({ h: (document.querySelector('#page-folders .fd-oh h2') || {}).textContent, st: IngFoldersLook.state() }));
  ok(s6b.h === 'Quill Two' && s6b.st.files.indexOf('Quill Two') >= 0, 'renaming works, and the drawer follows', s6b);
  await p.evaluate(() => document.querySelector('#page-folders .fld-crumbk').click()); await p.waitForTimeout(500);
  const s6c = await st(); ok(!s6c.inside && !s6c.spread, 'the path takes her back to all her folders', s6c);
  // 7. a folder for another app joins the drawer
  await p.evaluate(() => document.getElementById('fdNewKey').click()); await p.waitForTimeout(500);
  const foc = await p.evaluate(() => document.activeElement && document.activeElement.id); ok(foc === 'fldAddName', "the head's key opens the new folder's name", foc);
  await p.fill('#fldAddName', 'Ledger'); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
  const s7 = await st(); ok(s7.files.length === 4 && s7.files.indexOf('Ledger') >= 0 && /4 folders/.test(s7.label), 'the new folder stands in the drawer', s7);
  // 8. left alone, nothing is rewritten
  await p.mouse.move(5, 450); await p.waitForTimeout(800);
  const muts = await p.evaluate(() => new Promise(res => { let n = 0; const mo = new MutationObserver(r => { n += r.length; }); mo.observe(document.getElementById('page-folders'), { subtree: true, childList: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 3000); }));
  ok(muts === 0, 'left alone, nothing on Folders is rewritten', muts);
  // 9. by night: the seals take their night look
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(700);
  const s9 = await p.evaluate(() => { const ims = [...document.querySelectorAll('#page-folders .fd-seal[data-fd-seal="ingenium"]')];
    return { n: ims.length, night: ims.every(i => i.src === IngSeal.url(['ingenium'], { night: true })), loaded: ims.every(i => i.complete && i.naturalWidth > 0), desk: getComputedStyle(document.querySelector('#page-folders .fd-head')).backgroundImage.slice(0, 60) }; });
  ok(s9.n >= 3 && s9.night && s9.loaded, "by night every Ingenium seal on Folders takes its night look", s9);
  await p.screenshot({ path: OUT + '/night_home.png' });
  await p.evaluate(() => { const b = [...document.querySelectorAll('#page-folders .fd-file')].find(x => /^Ingenium/.test(x.getAttribute('aria-label'))); b.click(); }); await p.waitForTimeout(1200);
  const s9b = await p.evaluate(() => { const im = document.querySelector('#page-folders .fd-oh .fd-seal'); return { key: im && im.getAttribute('data-fd-seal'), night: !!im && im.src === IngSeal.url(['ingenium'], { night: true }) }; });
  ok(s9b.key === 'ingenium' && s9b.night, "Ingenium's opened folder shows its seal by night", s9b);
  await p.screenshot({ path: OUT + '/night_folder.png' });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await p.waitForTimeout(500);
  const s9c = await p.evaluate(() => { const im = document.querySelector('#page-folders .fd-oh .fd-seal'); return !!im && im.src === IngSeal.url(['ingenium'], { night: false }); });
  ok(s9c, 'back to day, the seal takes its day look again');
  await p.evaluate(() => document.querySelector('#page-folders .fld-crumbk').click()); await p.waitForTimeout(400);
  // 10. below 760 pixels the drawer in its phone layout (6.71); below 260 pixels Folders is as it was; wide again, the drawer comes back
  await p.setViewportSize({ width: 700, height: 900 }); await p.waitForTimeout(900);
  const s10p = await p.evaluate(() => { const pg = document.getElementById('page-folders'); return { on: pg.classList.contains('fd-on'), phone: pg.classList.contains('fd-phone'), files: IngFoldersLook.state().files.length }; });
  ok(s10p.on && s10p.phone && s10p.files === 4, 'below 760 pixels the drawer takes its phone layout', s10p);
  await p.setViewportSize({ width: 250, height: 900 }); await p.waitForTimeout(900);
  const s10 = await p.evaluate(() => { const pg = document.getElementById('page-folders'); return { on: pg.classList.contains('fd-on'), head: !!pg.querySelector('.fd-head'), title: !!pg.querySelector(':scope > .page-title'),
    lede: !!pg.querySelector(':scope > .lede'), cards: pg.querySelectorAll('.fld-card').length, seals: pg.querySelectorAll('.fld-card .fd-seal,.fld-card .fd-coin,.fld-card .fd-ls').length }; });
  ok(!s10.on && !s10.head && s10.title && s10.lede && s10.cards === 5 && s10.seals === 0, 'below 260 pixels Folders is as it was', s10);
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(900);
  const s10b = await st(); ok(s10b.on && s10b.files.length === 4, 'wide again, the drawer comes back', s10b);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); process.exit(1); });
