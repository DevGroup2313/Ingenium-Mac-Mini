// Ingenium 7.46: none of her apps in any edition but the master, and none in another person's profile.
// Her words (19 November 2026): "Ingenium is still built into the app library for the full edition, this is unacceptable. I do not want any
// of my apps built-in any editions outside of the master edition. Ingenium itself is not exempt from that ... They should be starting the
// app fresh as a new user and none of my apps (Ingenium included) should be coming up on there unless I upload them on there. If they
// aren't me then Ingenium or any of them should [not] show up on the "Your apps" section in Fabrica. For some reason Carpe Diem and
// Inkwell are showing up on the Folders page in the "Your apps" section, the same for the chat pages and any other pages with that issue".
//   node rig/t_746_no_apps.js <page url> <out folder> [guest|owner]
// On the full, gift or demo edition's page; with "guest", on the master page in another person's profile (R331); with "owner", on the
// master page in her own profile, as the control (her apps are there, and the same work brought in names them).
//   1. a fresh start keeps nothing in the app library, Ingenium itself included, and no list names an app of hers: Home, the chat's +
//      menu, Code's start window, Folders, Fabrica, Lector; no page's own words name one either
//   2. work brought in from her master copy (a CV naming her apps, Lector's readings of them, the library's copies of them, Lakay's
//      included) brings none of her apps into any list
//   3. a page the person adds is listed, whatever app it is ("unless I upload them on there"), where the edition has an app library
//   4. 7.52 (her answer, 20 November 2026: "Yes for the mini app question"): none of the Desk's five apps (Tabula, Abacus, Imago, Scriba,
//      Fontes): no key, no Home tile, no route, no key that sends to one, no word naming one; in her own profile, all of them
// Invented apps only (Tide Clock); no one's data.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, MODE] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const GUEST = MODE === 'guest', OWNER = MODE === 'owner';
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const HERS = /Carpe Diem|The Forge|\bthe Forge\b|Inkwell|Lakay|Offline Project/;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 860 } });
  if (GUEST) await ctx.addInitScript(() => { try { localStorage.setItem('ingenium_profiles', JSON.stringify({ list: [{ id: 'pguest1', name: 'Guest', pw: 'none', t: 1 }], cur: 'pguest1' })); } catch (e) {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  const boot = async () => {
    await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await p.waitForTimeout(600);
  };
  // what every list shows, and what each page says
  const look = async (pages) => p.evaluate(async (pages) => {
    const HERS = /Carpe Diem|The Forge|\bthe Forge\b|Inkwell|Lakay|Offline Project/; const r = { said: {} };
    const visible = (root) => { const out = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) { const e = n.parentElement; if (!e || !e.offsetParent || e.closest('.msg,textarea,input,pre,code')) continue; const t = n.nodeValue.trim(); if (t && HERS.test(t)) out.push(t.slice(0, 160)); } return out; };
    try { r.edition = ING_EDITION; } catch (e) {}
    try { r.libKeys = typeof LIB_KEYS !== 'undefined' ? LIB_KEYS.slice() : null; } catch (e) {}
    try { r.libApps = (window.libApps ? libApps() : []).map((m) => (m.title || m.key)); } catch (e) { r.libApps = 'err ' + e.message; }
    try { r.kept = Object.keys(((window.libState && libState()) || {}).apps || {}); } catch (e) {}
    try { r.builtin = !!(window.IngBuiltin && IngBuiltin.meta); } catch (e) {}
    try { r.offer = IngFolders.profileApps().map((x) => x.name); } catch (e) { r.offer = 'err ' + e.message; }
    for (const pg of pages) { try { go(pg); } catch (e) { continue; } await new Promise((s) => setTimeout(s, 1700));
      const sec = document.querySelector('section.section.active'); if (sec) r.said[pg] = visible(sec); }
    // Lector: its Your apps list (.l-apps); its readings and documents are the person's own work, and stay (7.45: work brought in stays)
    try { go('lector'); await new Promise((s) => setTimeout(s, 1200)); const L = document.querySelector('#page-lector .l-apps') || document.querySelector('#page-lector');
      r.lector = L && L.offsetParent ? visible(L) : null; r.lectorWhere = L ? (L.matches('.l-apps') ? 'Your apps' : 'the page') : null; } catch (e) {}
    try { go('chat'); document.getElementById('chatNew').click(); await new Promise((s) => setTimeout(s, 600)); document.getElementById('chatImgBtn').click(); await new Promise((s) => setTimeout(s, 700));
      const m = document.getElementById('chatPlusMenu'); r.plus = m ? visible(m) : []; const it = [...(m ? m.querySelectorAll('.pm-item') : [])].find((x) => /One of your apps$/.test((x.querySelector('.pm-txt b,.pm-txt') || x).textContent.split('\n')[0].trim()) || /^One of your apps/.test(x.textContent.trim()));
      r.plusApps = it ? it.textContent.replace(/\s+/g, ' ').trim() : null; document.body.click(); } catch (e) { r.plus = 'err ' + e.message; }
    try { go('code'); await new Promise((s) => setTimeout(s, 600)); ccWelcome(); await new Promise((s) => setTimeout(s, 800)); const m = document.getElementById('modalBox'); r.code = m ? visible(m) : []; try { closeModal(); } catch (e) {} } catch (e) { r.code = 'err ' + e.message; }
    return r; }, pages);
  const PAGES = ['home', 'chat', 'folders', 'fabrica', 'build', 'career', 'blend', 'models', 'focus', 'settings', 'guide'];
  try {
    // ---------------------------------------------------------------- 1. a fresh start
    await p.goto(URL_); await boot(p); await p.waitForTimeout(14000);  // r120 keeps the built-in apps nine seconds after the start, when idle
    const f = await look(PAGES);
    if (OWNER) {
      ok(f.edition === 'master' && f.builtin && f.libKeys.length >= 4, 'control: her own profile of the master: her apps are built in', { ed: f.edition, builtin: f.builtin, keys: f.libKeys });
    } else {
      ok(f.edition !== 'master', '1. this page is not her own: edition ' + f.edition + (GUEST ? ' (another person\'s profile on the master)' : ''), f.edition);
      ok(!f.builtin && f.kept.length === 0 && (f.libApps.length === 0), '   a fresh start keeps nothing in the app library, Ingenium itself included', { builtin: f.builtin, kept: f.kept, libApps: f.libApps });
      ok(Array.isArray(f.libKeys) ? f.libKeys.length === 0 || !f.libKeys.some((k) => /^(cd|forge|inkwell|ingenium|lakay)$/.test(k)) : true, '   the library knows no app of hers by name', f.libKeys);
      ok(Array.isArray(f.offer) && f.offer.length === 0, '   Folders, Your apps: nothing offered', f.offer);
      const named = Object.entries(f.said).filter(([k, v]) => v.length);
      ok(named.length === 0, '   no page names an app of hers (' + PAGES.join(', ') + ')', named);
      ok(!f.lector || f.lector.length === 0, '   Lector lists no app of hers (' + f.lectorWhere + ')', f.lector);
      ok(Array.isArray(f.plus) && f.plus.length === 0, '   the chat\'s + menu names no app of hers', { plus: f.plus, row: f.plusApps });
      ok(Array.isArray(f.code) && f.code.length === 0, '   Code\'s start window names no app of hers', f.code);
    }
    await p.screenshot({ path: path.join(OUT, 'fresh.png') });
    // ---------------------------------------------------------------- 2. work brought in from her master copy
    await p.evaluate(() => {
      state.career = state.career && typeof state.career === 'object' ? state.career : {};
      const id = 'pBR'; state.career.people = (state.career.people || []).filter((x) => x.id !== id);
      state.career.people.push({ id, name: 'Brought in', profile: { items: [{ id: 'i1', sec: 'project', title: 'The apps I build', place: 'Carpe Diem, Inkwell and Tide Clock', from: '2025' }] } }); state.career.cur = id;
      state.lector = state.lector && Array.isArray(state.lector.runs) ? state.lector : { runs: [], active: null };
      state.lector.runs.push({ id: 'lr1', kind: 'app', name: 'Carpe Diem', at: 1 }, { id: 'lr2', kind: 'app', name: 'Inkwell', at: 2 });
      state.appLib = state.appLib && state.appLib.apps ? state.appLib : { apps: {} };
      const A = state.appLib.apps; const m = (t, v, src) => ({ title: t, version: v, build: '', date: '', size: 10, sha256: 'x', name: t + '.html', source: src, ref: 'ref-' + t.replace(/\W/g, ''), at: 1 });
      A.cd = m('Carpe Diem', '1091', 'built in'); A.inkwell = m('Inkwell', '7.52', 'built in'); A.forge = m('The Forge', '656', 'built in'); A.lakay = m('Lakay', '14', 'built in'); A.ingenium = m('Ingenium', '7.45', 'this copy');
      saveState(); });
    await p.reload(); await boot(p);
    const c = await look(['home', 'folders', 'fabrica']);
    if (OWNER) {
      ok(c.offer.indexOf('Carpe Diem') >= 0 && c.offer.indexOf('Inkwell') >= 0, 'control: in her own profile the same work brought in offers her apps in Folders (so the work below is read)', c.offer);
    } else {
      ok(c.libApps.length === 0, '2. work brought in from the master (the library\'s copies of Carpe Diem, Inkwell, The Forge, Lakay and Ingenium): none listed', c.libApps);
      ok(Array.isArray(c.offer) && !c.offer.some((n) => HERS.test(n) || /^Ingenium$/.test(n)), '   Folders, Your apps: none of hers offered from a CV or from Lector\'s readings', c.offer);
      const named = Object.entries(c.said).filter(([k, v]) => v.length);
      ok(named.length === 0, '   Home, Folders and Fabrica name none of them', named);
      ok(!c.lector || c.lector.length === 0, '   Lector\'s Your apps lists none of them (its readings are the person\'s own work and stay)', c.lector);
      ok(Array.isArray(c.plus) && c.plus.length === 0, '   the chat\'s + menu names none of them', { plus: c.plus, row: c.plusApps });
    }
    await p.screenshot({ path: path.join(OUT, 'brought_in.png') });
    // ---------------------------------------------------------------- 3. a page the person adds is listed
    const lib = await p.evaluate(() => typeof window.libFromPage === 'function' && typeof libOn === 'function' && libOn());
    if (!OWNER && lib) {
      const added = await p.evaluate(async () => { const page = (t) => new TextEncoder().encode('<!doctype html><html><head><title>' + t + '</title></head><body><h1>' + t + '</h1></body></html>');
        const r1 = await libFromPage(page('Tide Clock'), 'tide-clock.html'); const r2 = await libFromPage(page('Carpe Diem'), 'carpe-diem.html');
        return { r1, r2, apps: libApps().map((m) => m.title || m.key), offer: IngFolders.profileApps().map((x) => x.name + ' (' + x.why + ')') }; });
      ok(added.apps.indexOf('Tide Clock') >= 0, '3. a page the person adds (Tide Clock) is listed in the app library', added);
      ok(added.apps.some((n) => /Carpe Diem/.test(n)), '   and a page of one of her apps, added by the person, is listed as any other app ("unless I upload them on there")', added.apps);
      ok(added.offer.some((x) => /^Tide Clock \(In your app library\)$/.test(x)), '   Folders, Your apps offers what was added here', added.offer);
    } else if (!OWNER) console.log('NOTE this edition has no app library (the gift and demo editions): nothing to add');
    // ---------------------------------------------------------------- 4. the Desk's five apps (7.52, her answer: "Yes for the mini app question")
    const d = await p.evaluate(async () => {
      const DESK = ['tabula', 'abacus', 'slides', 'scriba', 'fontes'], r = { said: {} };
      const NAMES = /\b(Tabula|Abacus|Imago)\b|Scriba for recordings|Scriba \(recordings|Scriba's own speech models|\(Scriba's,|Fontes for sources|Fontes \(sources\) are/;
      const visible = (root) => { const out = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode())) { const e = n.parentElement; if (!e || !e.offsetParent || e.closest('.msg,textarea,input,pre,code')) continue; const t = n.nodeValue.trim(); if (t && NAMES.test(t)) out.push(t.slice(0, 160)); } return out; };
      r.keys = [...document.querySelectorAll('.nav-btn[data-page]')].map((b) => b.getAttribute('data-page')).filter((x) => DESK.indexOf(x) >= 0);
      r.group = [...document.querySelectorAll('.grp-label')].map((g) => g.textContent.trim()).filter((t) => /^apps$/i.test(t));
      try { go('home'); } catch (e) {} await new Promise((s) => setTimeout(s, 1200));
      r.tiles = [...document.querySelectorAll('.hx-app[data-app]')].map((b) => b.getAttribute('data-app')).filter((x) => DESK.indexOf(x) >= 0);
      r.head = (document.getElementById('hxAppsH') || {}).textContent || null;
      // where each of the five apps' routes leads: Home, where the Desk is not (r231); the apps open in frames of their own where it is
      r.routes = DESK.filter((x) => { try { go(x); const a = document.querySelector('section.section.active'); return !(a && a.id === 'page-home'); } catch (e) { return false; } });
      for (const pg of ['home', 'chat', 'folders', 'blend', 'build', 'lector', 'career', 'fabrica', 'focus', 'settings', 'guide']) { try { go(pg); } catch (e) { continue; } await new Promise((s) => setTimeout(s, 1400));
        const sec = document.querySelector('section.section.active'); if (sec && sec.id === 'page-' + pg) r.said[pg] = visible(sec); }
      r.sendKeys = [...document.querySelectorAll('button')].filter((b) => b.offsetParent && /^(?:📝\s*)?(?:Send to Tabula|To Tabula|My Tabula page|Open in Tabula)$/.test(b.textContent.trim())).map((b) => b.textContent.trim());
      r.tip = [...document.querySelectorAll('.tip')].some((t) => /Tabula is the writing tablet/.test(t.textContent));
      try { go('home'); } catch (e) {}
      return r; });
    if (OWNER) {
      ok(d.keys.indexOf('tabula') >= 0 && d.keys.indexOf('abacus') >= 0 && d.tiles.length === 5 && d.head === 'Your apps' && d.tip, 'control: in her own profile the Desk is all there: its keys in the side bar, the five apps on Home under Your apps, the Guide\'s tip on them', { keys: d.keys, tiles: d.tiles, head: d.head, tip: d.tip });
    } else {
      ok(d.keys.length === 0 && d.group.length === 0, '4. the Desk (7.52): no key to any of its five apps in the side bar, and no Apps group', { keys: d.keys, group: d.group });
      ok(d.tiles.length === 0 && d.head === 'Your instruments', '   Home shows the instruments alone, under Your instruments', { tiles: d.tiles, head: d.head });
      ok(d.routes.length === 0, '   each of the five apps\' routes leads Home', d.routes);
      const named = Object.entries(d.said).filter(([k, v]) => v.length);
      ok(named.length === 0 && !d.tip, '   no page, nor the Guide\'s tip, names Tabula, Abacus, Imago, or Scriba and Fontes as apps', { named, tip: d.tip });
      ok(d.sendKeys.length === 0, '   no key sends anything to one of them (Send to Tabula, To Tabula, My Tabula page, Open in Tabula)', d.sendKeys);
    }
  } catch (e) { ok(false, 'the run finished', e.message); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 5));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
